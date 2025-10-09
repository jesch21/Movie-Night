// high-or-low-scripts.js
// Title-matching + dedupe of letterboxd pools + buffered image loader + normalized star display

// ---------------- Supabase init (keep your keys) ----------------
const SUPABASE_URL = "https://vvknjdudbteivvqzglcv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2a25qZHVkYnRlaXZ2cXpnbGN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4MjEwODAsImV4cCI6MjA3MjM5NzA4MH0.RUabonop6t3H_KhXkm0UuvO_VlGJvCeNPSCYJ5KUNRU";
const supabase = window.supabase && window.supabase.createClient ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

// ---------------- Game state ----------------
let moviesListAll = [];
let moviesListByOrder = {};
let moviesListByTitle = {};
let sourcePools = {};
let currentSourceKey = null;
let leftMovie = null;
let rightMovie = null;
let score = 0;

const LETTERBOXD_TABLES = [
  "Alex-Letterboxd",
  "Ayub-Letterboxd",
  "Caleb-Letterboxd",
  "Joe-Letterboxd",
  "John-Letterboxd",
  "Landon-Letterboxd",
  "Trevor-Letterboxd"
];
const SOURCE_KEYS = ["IMDB", ...LETTERBOXD_TABLES];

const SOURCE_LABELS = Object.assign(
  { IMDB: "IMDB" },
  LETTERBOXD_TABLES.reduce((acc, t) => {
    const owner = t.split('-')[0];
    acc[t] = `${owner}'s Letterboxd`;
    return acc;
  }, {})
);

// DOM elements
const startButton = document.getElementById('startButton');
const instructionsSection = document.getElementById('instructions');
const gameContainer = document.getElementById('gameContainer');
const gameOverSection = document.getElementById('gameOver');
const restartButton = document.getElementById('restartButton');
const scoreDisplay = document.getElementById('scoreDisplay');
const leftTitleEl = document.getElementById('leftTitle');
const rightTitleEl = document.getElementById('rightTitle');
const leftYearEl = document.getElementById('leftYear');
const rightYearEl = document.getElementById('rightYear');
const leftImgEl = document.getElementById('leftImg');
const rightImgEl = document.getElementById('rightImg');
const btnHigher = document.getElementById('btnHigher');
const btnLower = document.getElementById('btnLower');
const finalScoreEl = document.getElementById('finalScore');
const roundInfo = document.getElementById('roundInfo');

const ratingsActionRow = document.getElementById('ratingsActionRow');
const leftRatingDisplay = document.getElementById('leftRatingDisplay');
const rightRatingDisplay = document.getElementById('rightRatingDisplay');
const nextButton = document.getElementById('nextButton');

const sourceLabelEl = document.getElementById('sourceLabel');

// Placeholder + fallback
const PLACEHOLDER_SRC = new URL('../assets/images/poster-placeholder.png', window.location.href).href;
const FALLBACK_SVG_DATA_URI = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600" viewBox="0 0 400 600">
     <rect width="100%" height="100%" fill="#222" />
     <text x="50%" y="50%" fill="#F2F5EA" font-size="20" font-family="sans-serif" dominant-baseline="middle" text-anchor="middle">
       Poster unavailable
     </text>
   </svg>`
);

// ---------- Helpers ----------
function pickRandomFromArray(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function shuffleArray(arr) { for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; } return arr; }
function safeString(v) { return typeof v === 'string' ? v.trim() : (v === null || typeof v === 'undefined' ? '' : String(v)); }
function normalizeTitle(t) { return safeString(t).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim(); }
function parseStarsValue(starsRaw) {
  if (!starsRaw && starsRaw !== 0) return NaN;
  const s = safeString(starsRaw).split('/')[0].trim().replace(',', '.');
  return parseFloat(s);
}
function parseImdbRating(v) {
  if (v === null || typeof v === 'undefined') return NaN;
  const s = safeString(v).replace(',', '.');
  return parseFloat(s);
}
function normalizeOrderKey(o) {
  const n = Number(o);
  if (!Number.isNaN(n)) return Number.isInteger(n) ? String(n) : String(n);
  return safeString(o);
}
function getPublicImageUrl(imagePath) {
  if (!imagePath || !supabase) return null;
  try {
    const normalizedPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    const res = supabase.storage.from('slideshowImages').getPublicUrl(normalizedPath);
    if (res && res.data) return res.data.publicUrl || res.data.publicURL || null;
  } catch (err) { console.warn("Error getting public URL for image:", imagePath, err); }
  return null;
}

// ---------- Load moviesList and index by title ----------
async function loadMoviesListAll() {
  try {
    if (!supabase) {
      console.warn('Supabase client unavailable.');
      moviesListAll = [];
      moviesListByOrder = {};
      moviesListByTitle = {};
      return false;
    }
    const { data, error } = await supabase.from('moviesList').select('*');
    if (error) { console.error("Supabase error fetching moviesList:", error); return false; }
    moviesListAll = Array.isArray(data) ? data : [];
    moviesListByOrder = {};
    moviesListByTitle = {};
    moviesListAll.forEach(row => {
      if (!row || typeof row !== 'object') return;
      if (row['order'] != null) moviesListByOrder[normalizeOrderKey(row['order'])] = row;
      const t = row.title || row.Movie || '';
      const tk = normalizeTitle(t);
      if (tk) {
        if (moviesListByTitle[tk]) {
          // If duplicates exist in moviesList itself, log them (you may want to fix DB)
          console.warn('Duplicate moviesList title normalized key:', tk, '-- keeping first entry. Duplicate title:', t);
        } else {
          moviesListByTitle[tk] = row;
        }
      }
    });
    return true;
  } catch (err) {
    console.error("Error loading moviesList:", err);
    return false;
  }
}

// ---------- Build IMDB pool ----------
function buildImdbPoolFromMoviesList() {
  const pool = [];
  for (const row of moviesListAll) {
    const imdbNum = parseImdbRating(row['imdb-rating']);
    const hasStars = (row['stars'] !== null && row['stars'] !== undefined && row['stars'] !== '') ||
                     (row['Stars'] !== null && row['Stars'] !== undefined && row['Stars'] !== '');
    if (Number.isFinite(imdbNum) && hasStars && row['order'] != null) {
      const key = normalizeOrderKey(row['order']);
      const starsRaw = row['stars'] || row['Stars'] || null;
      const starsValue = parseStarsValue(starsRaw);
      const imagePath = row.image || null;
      const imageUrl = getPublicImageUrl(imagePath);
      pool.push({
        order: row['order'],
        orderKey: key,
        title: row.title || row.Movie || '',
        imdbRating: imdbNum,
        starsRaw,
        starsValue,
        starsRawNormalized: starsRaw ? (String(starsRaw).split(',')[0].trim()) : null,
        imagePath,
        imageUrl,
        sourceKey: 'IMDB'
      });
    }
  }
  return pool;
}

// ---------- Fetch letterboxd pool with dedupe by normalized title ----------
async function fetchAndBuildLetterboxdPool(tableName) {
  let data = null;
  let err1 = null;
  try {
    const res = await supabase.from(tableName).select('"order", Movie, Stars');
    if (res.error) throw res.error;
    data = res.data;
  } catch (e1) {
    err1 = e1;
    try {
      const res2 = await supabase.from(`"${tableName}"`).select('"order", Movie, Stars');
      if (res2.error) throw res2.error;
      data = res2.data;
    } catch (err2) {
      console.error(`Error fetching letterboxd table ${tableName}:`, err1 || err2);
      return [];
    }
  }
  if (!Array.isArray(data)) return [];

  const seen = {}; // map normalizedTitle -> true (dedupe)
  const pool = [];
  for (const row of data) {
    const orderVal = (row && (row['order'] ?? row.order));
    const title = row.Movie || row.movie || '';
    const starsRaw = row.Stars || row.stars || '';
    const starsValue = parseStarsValue(starsRaw);
    if (!Number.isFinite(starsValue)) continue; // require valid stars

    const tkey = normalizeTitle(title);
    if (!tkey) continue;

    if (seen[tkey]) {
      // Duplicate entry for same title in the letterboxd table — log it and skip
      console.warn(`Duplicate letterboxd row in ${tableName} for title "${title}" (normalized: ${tkey}) — skipping duplicate.`);
      continue;
    }
    seen[tkey] = true;

    // match to moviesList by normalized title (if present)
    const mlRow = moviesListByTitle[tkey] || null;
    const imagePath = mlRow ? (mlRow.image || null) : null;
    const imageUrl = getPublicImageUrl(imagePath);

    // normalized stars string: prefer exact given format, but pick first sensible text if there are separators
    let starsRawNormalized = null;
    if (starsRaw) {
      // if there are commas/semicolons/pipes (often multiple values), take the first segment
      starsRawNormalized = String(starsRaw).split(/\s*[;,|]\s*/)[0].trim();
      // if it's like "4.5/5" keep as-is; otherwise if numeric only, format as "X/5"
      if (!starsRawNormalized.includes('/')) {
        const v = parseStarsValue(starsRawNormalized);
        if (Number.isFinite(v)) starsRawNormalized = `${v}/5`;
      }
    }

    pool.push({
      order: orderVal,
      orderKey: String(orderVal),
      title: title || '',
      imdbRating: mlRow ? parseImdbRating(mlRow['imdb-rating']) : NaN,
      starsRaw,
      starsValue,
      starsRawNormalized,
      imagePath,
      imageUrl,
      sourceKey: tableName,
      matchedMovieListTitle: mlRow ? (mlRow.title || mlRow.Movie || '') : null
    });
  }

  return pool;
}

async function ensureSourcePool(sourceKey) {
  if (sourcePools[sourceKey]) return sourcePools[sourceKey];
  if (sourceKey === 'IMDB') {
    const pool = buildImdbPoolFromMoviesList();
    sourcePools[sourceKey] = pool;
    return pool;
  } else {
    const pool = await fetchAndBuildLetterboxdPool(sourceKey);
    sourcePools[sourceKey] = pool;
    return pool;
  }
}

// ---------- Game selection logic ----------
function pickTwoDistinctFromPool(pool) {
  if (!Array.isArray(pool) || pool.length < 2) return null;
  let leftIndex = Math.floor(Math.random() * pool.length);
  let rightIndex;
  do { rightIndex = Math.floor(Math.random() * pool.length); } while (rightIndex === leftIndex);
  return { left: pool[leftIndex], right: pool[rightIndex] };
}

async function chooseInitialSourceAndPair() {
  const keys = shuffleArray(Array.from(SOURCE_KEYS));
  for (const key of keys) {
    const pool = await ensureSourcePool(key);
    if (Array.isArray(pool) && pool.length >= 2) {
      currentSourceKey = key;
      const pair = pickTwoDistinctFromPool(pool);
      return { sourceKey: key, pair };
    }
  }
  return null;
}

async function pickNewSourceContainingStayingMovie(stayingTitleOrMatchedTitle) {
  const otherKeys = shuffleArray(SOURCE_KEYS.filter(k => k !== currentSourceKey));
  for (const key of otherKeys) {
    const pool = await ensureSourcePool(key);
    if (!Array.isArray(pool) || pool.length === 0) continue;
    const foundIndex = pool.findIndex(m => {
      if (m.matchedMovieListTitle && stayingTitleOrMatchedTitle && String(m.matchedMovieListTitle) === String(stayingTitleOrMatchedTitle)) return true;
      if (m.title && stayingTitleOrMatchedTitle) return normalizeTitle(m.title) === normalizeTitle(stayingTitleOrMatchedTitle);
      return false;
    });
    if (foundIndex >= 0) {
      const candidates = pool.filter((m, i) => i !== foundIndex);
      if (candidates.length === 0) continue;
      currentSourceKey = key;
      const right = pickRandomFromArray(candidates);
      return { sourceKey: key, newRight: right, pool };
    }
  }

  const currentPool = await ensureSourcePool(currentSourceKey);
  if (Array.isArray(currentPool) && currentPool.length >= 1) {
    const candidates = currentPool.filter(m => normalizeTitle(m.title) !== normalizeTitle(stayingTitleOrMatchedTitle));
    if (candidates.length > 0) {
      const right = pickRandomFromArray(candidates);
      return { sourceKey: currentSourceKey, newRight: right, pool: currentPool };
    }
  }
  return null;
}

// ---------- Buffered safe image assignment ----------
function makePosterId(sourceKey, title) {
  return `${String(sourceKey ?? 'unknown')}::${normalizeTitle(title ?? '')}`;
}
function applyPlaceholderToImg(imgEl) {
  if (!imgEl) return;
  if (imgEl.src !== PLACEHOLDER_SRC) {
    imgEl.src = PLACEHOLDER_SRC;
    console.info('Applied placeholder to', imgEl.id);
  } else {
    imgEl.src = FALLBACK_SVG_DATA_URI;
    console.info('Applied fallback SVG to', imgEl.id);
  }
  imgEl.dataset.currentPosterId = 'placeholder';
}
function setImgSrcSafely(imgEl, url, sourceKey, titleForId, debugTitle) {
  if (!imgEl) return;
  const id = makePosterId(sourceKey, titleForId);
  imgEl.dataset.intendedPosterId = id;
  if (!url) { applyPlaceholderToImg(imgEl); console.warn('No poster URL for', debugTitle || id); return; }
  const loader = new Image();
  loader.crossOrigin = 'anonymous';
  loader.onload = () => {
    if (imgEl.dataset.intendedPosterId === id) {
      imgEl.src = url;
      imgEl.dataset.currentPosterId = id;
      console.info('Safe image applied ->', imgEl.id, url, 'for id', id, 'title:', debugTitle);
    } else {
      console.warn('Loaded image ignored (id mismatch) ->', url, 'for', id, 'img now intends', imgEl.dataset.intendedPosterId);
    }
  };
  loader.onerror = () => { console.warn('Safe loader failed ->', url, 'for', id); applyPlaceholderToImg(imgEl); };
  loader.src = url;
}

// ---------- Rendering & UI ----------
function renderMoviesAndSource() {
  const label = SOURCE_LABELS[currentSourceKey] || currentSourceKey || 'Unknown';
  if (sourceLabelEl) { sourceLabelEl.textContent = `Source: ${label}`; sourceLabelEl.style.display = 'block'; }

  leftTitleEl.textContent = leftMovie ? leftMovie.title : '';
  rightTitleEl.textContent = rightMovie ? rightMovie.title : '';

  if (leftYearEl) leftYearEl.textContent = '';
  if (rightYearEl) rightYearEl.textContent = '';

  if (leftMovie) {
    const leftSource = leftMovie.sourceKey || currentSourceKey || 'IMDB';
    const leftTitle = leftMovie.title || leftMovie.matchedMovieListTitle || '';
    const leftUrl = leftMovie.imageUrl || (leftMovie.imagePath ? getPublicImageUrl(leftMovie.imagePath) : null) || null;
    setImgSrcSafely(leftImgEl, leftUrl, leftSource, leftTitle, leftMovie.title);
    if (leftImgEl) leftImgEl.alt = `${leftMovie.title} poster`;
  } else { applyPlaceholderToImg(leftImgEl); if (leftImgEl) leftImgEl.alt = 'poster placeholder'; }

  if (rightMovie) {
    const rightSource = rightMovie.sourceKey || currentSourceKey || 'IMDB';
    const rightTitle = rightMovie.title || rightMovie.matchedMovieListTitle || '';
    const rightUrl = rightMovie.imageUrl || (rightMovie.imagePath ? getPublicImageUrl(rightMovie.imagePath) : null) || null;
    setImgSrcSafely(rightImgEl, rightUrl, rightSource, rightTitle, rightMovie.title);
    if (rightImgEl) rightImgEl.alt = `${rightMovie.title} poster`;
  } else { applyPlaceholderToImg(rightImgEl); if (rightImgEl) rightImgEl.alt = 'poster placeholder'; }

  roundInfo.textContent = `Right movie rating vs Left movie rating — guess if RIGHT is higher or lower.`;
}

// ---------- Compare & evaluate ----------
function evaluateGuessAgainstCurrentSource(guessHigher) {
  const leftVal = (currentSourceKey === 'IMDB') ? parseFloat(leftMovie.imdbRating) : Number(leftMovie.starsValue);
  const rightVal = (currentSourceKey === 'IMDB') ? parseFloat(rightMovie.imdbRating) : Number(rightMovie.starsValue);
  if (!Number.isFinite(leftVal) || !Number.isFinite(rightVal)) return { correct: false, leftVal, rightVal };
  if (Math.abs(leftVal - rightVal) < 1e-9) return { correct: true, leftVal, rightVal };
  const rightIsHigher = rightVal > leftVal;
  const correct = (guessHigher && rightIsHigher) || (!guessHigher && !rightIsHigher);
  return { correct, leftVal, rightVal };
}

// ---------- Ratings UI ----------
function setChoiceButtonsEnabled(enabled) {
  btnHigher.disabled = !enabled;
  btnLower.disabled = !enabled;
  btnHigher.setAttribute('aria-pressed', String(!enabled));
  btnLower.setAttribute('aria-pressed', String(!enabled));
  if (!enabled) { btnHigher.style.opacity = '0.6'; btnLower.style.opacity = '0.6'; btnHigher.style.cursor = 'default'; btnLower.style.cursor = 'default'; }
  else { btnHigher.style.opacity = ''; btnLower.style.opacity = ''; btnHigher.style.cursor = ''; btnLower.style.cursor = ''; }
}
function formatImdb(v) { if (!Number.isFinite(v)) return 'N/A'; return (Math.round(v * 10) / 10).toFixed(1); }
function showRatingsAndAction({ correct, leftRating, rightRating }) {
  if (currentSourceKey === 'IMDB') {
    leftRatingDisplay.textContent = (Number.isFinite(leftRating) ? `Rating: ${formatImdb(leftRating)}` : 'Rating: N/A');
    rightRatingDisplay.textContent = (Number.isFinite(rightRating) ? `Rating: ${formatImdb(rightRating)}` : 'Rating: N/A');
  } else {
    // show normalized single-star string
    leftRatingDisplay.textContent = leftMovie && leftMovie.starsRawNormalized ? `Rating: ${leftMovie.starsRawNormalized}` : (Number.isFinite(leftRating) ? `Rating: ${leftRating}/5` : 'Rating: N/A');
    rightRatingDisplay.textContent = rightMovie && rightMovie.starsRawNormalized ? `Rating: ${rightMovie.starsRawNormalized}` : (Number.isFinite(rightRating) ? `Rating: ${rightRating}/5` : 'Rating: N/A');
  }

  if (correct) { nextButton.textContent = 'Next'; nextButton.onclick = handleNextClick; }
  else { nextButton.textContent = 'See my Score'; nextButton.onclick = handleSeeScoreClick; }

  if (ratingsActionRow) ratingsActionRow.style.display = 'flex';
  nextButton.style.display = 'inline-block';

  try {
    const pool = sourcePools[currentSourceKey] || [];
    for (let i = 0; i < Math.min(2, pool.length); i++) {
      const url = pool[i].imageUrl || (pool[i].imagePath ? getPublicImageUrl(pool[i].imagePath) : null);
      if (url) { const p = new Image(); p.src = url; }
    }
  } catch (e) {}
}
function hideRatingsAndAction() {
  if (ratingsActionRow) ratingsActionRow.style.display = 'none';
  leftRatingDisplay.textContent = '';
  rightRatingDisplay.textContent = '';
  nextButton.style.display = 'none';
  nextButton.onclick = null;
}

// ---------- Poster instrumentation ----------
function attachPosterErrorHandlers() {
  if (leftImgEl) leftImgEl.addEventListener('error', () => { console.warn('Failed to load left poster ->', leftImgEl.src); if (leftImgEl.src !== PLACEHOLDER_SRC) { leftImgEl.src = PLACEHOLDER_SRC; return; } leftImgEl.src = FALLBACK_SVG_DATA_URI; leftImgEl.alt = 'Poster unavailable'; });
  if (rightImgEl) rightImgEl.addEventListener('error', () => { console.warn('Failed to load right poster ->', rightImgEl.src); if (rightImgEl.src !== PLACEHOLDER_SRC) { rightImgEl.src = PLACEHOLDER_SRC; return; } rightImgEl.src = FALLBACK_SVG_DATA_URI; rightImgEl.alt = 'Poster unavailable'; });
}
function instrumentPosterLoads() {
  [leftImgEl, rightImgEl].forEach(img => {
    if (!img) return;
    img.addEventListener('load', () => console.info('Image loaded OK ->', img.id, img.src, 'intendedPosterId:', img.dataset.intendedPosterId, 'currentPosterId:', img.dataset.currentPosterId));
    img.addEventListener('error', () => console.error('Image load error ->', img.id, img.src));
  });
}

// ---------- Handlers ----------
async function handleStartClick() {
  instructionsSection.style.display = 'none';
  gameOverSection.style.display = 'none';
  gameContainer.style.display = 'block';
  if (sourceLabelEl) sourceLabelEl.style.display = 'none';
  hideRatingsAndAction();
  setChoiceButtonsEnabled(true);
  score = 0; updateScoreDisplay();

  const ok = await loadMoviesListAll();
  if (!ok) { roundInfo.textContent = 'Error loading movies. See console for details.'; return; }

  sourcePools = {};
  const initial = await chooseInitialSourceAndPair();
  if (!initial || !initial.pair) { roundInfo.textContent = 'No valid source with enough movies available.'; return; }
  currentSourceKey = initial.sourceKey;
  leftMovie = initial.pair.left;
  rightMovie = initial.pair.right;

  // dump pools for debugging
  try {
    Object.keys(sourcePools).forEach(k => {
      const pool = sourcePools[k] || [];
      console.group(`Pool: ${k}`);
      console.table(pool.map(x => ({ title: x.title, order: x.order, matchedMovieListTitle: x.matchedMovieListTitle || null, starsRaw: x.starsRaw, starsRawNormalized: x.starsRawNormalized || null, hasImageUrl: !!x.imageUrl })));
      console.groupEnd();
    });
  } catch (e) {}

  renderMoviesAndSource();
}
function updateScoreDisplay() { scoreDisplay.textContent = `Score: ${score}`; }
function showGameOver() { hideRatingsAndAction(); gameContainer.style.display = 'none'; gameOverSection.style.display = 'block'; finalScoreEl.textContent = `You earned ${score} ${score === 1 ? 'point' : 'points'}.`; }

function handleHigherClick() {
  if (!leftMovie || !rightMovie) return;
  setChoiceButtonsEnabled(false);
  const { correct, leftVal, rightVal } = evaluateGuessAgainstCurrentSource(true);
  if (correct) { score += 1; updateScoreDisplay(); roundInfo.textContent = 'Correct — the ratings are shown below. Click Next to continue.'; showRatingsAndAction({ correct: true, leftRating: leftVal, rightRating: rightVal }); }
  else { roundInfo.textContent = 'Incorrect — the ratings are shown below. Click "See my Score" to view your result.'; showRatingsAndAction({ correct: false, leftRating: leftVal, rightRating: rightVal }); }
}
function handleLowerClick() {
  if (!leftMovie || !rightMovie) return;
  setChoiceButtonsEnabled(false);
  const { correct, leftVal, rightVal } = evaluateGuessAgainstCurrentSource(false);
  if (correct) { score += 1; updateScoreDisplay(); roundInfo.textContent = 'Correct — the ratings are shown below. Click Next to continue.'; showRatingsAndAction({ correct: true, leftRating: leftVal, rightRating: rightVal }); }
  else { roundInfo.textContent = 'Incorrect — the ratings are shown below. Click "See my Score" to view your result.'; showRatingsAndAction({ correct: false, leftRating: leftVal, rightRating: rightVal }); }
}

async function handleNextClick() {
  hideRatingsAndAction();
  const staying = rightMovie;
  leftMovie = staying;
  const pick = await pickNewSourceContainingStayingMovie(staying.title || staying.matchedMovieListTitle || '');
  if (!pick) {
    const pool = await ensureSourcePool(currentSourceKey);
    const candidates = pool ? pool.filter(m => normalizeTitle(m.title) !== normalizeTitle(staying.title || staying.matchedMovieListTitle || '')) : [];
    if (candidates.length === 0) { showGameOver(); return; }
    rightMovie = pickRandomFromArray(candidates);
  } else { currentSourceKey = pick.sourceKey; rightMovie = pick.newRight; }
  renderMoviesAndSource(); setChoiceButtonsEnabled(true);
}
function handleSeeScoreClick() { hideRatingsAndAction(); showGameOver(); }
function handleRestartClick() {
  gameOverSection.style.display = 'none';
  instructionsSection.style.display = '';
  gameContainer.style.display = 'none';
  roundInfo.textContent = '';
  score = 0; updateScoreDisplay();
  hideRatingsAndAction(); setChoiceButtonsEnabled(true);
  if (sourceLabelEl) sourceLabelEl.style.display = 'none';
}

// ---------- Boot & wiring ----------
document.addEventListener('DOMContentLoaded', () => {
  if (!startButton || !btnHigher || !btnLower || !restartButton) { console.error("Missing required DOM elements."); return; }
  if (leftImgEl) { leftImgEl.loading = 'lazy'; leftImgEl.decoding = 'async'; leftImgEl.crossOrigin = 'anonymous'; if (!leftImgEl.src) leftImgEl.src = PLACEHOLDER_SRC; }
  if (rightImgEl) { rightImgEl.loading = 'lazy'; rightImgEl.decoding = 'async'; rightImgEl.crossOrigin = 'anonymous'; if (!rightImgEl.src) rightImgEl.src = PLACEHOLDER_SRC; }
  attachPosterErrorHandlers(); instrumentPosterLoads();
  startButton.addEventListener('click', handleStartClick);
  btnHigher.addEventListener('click', handleHigherClick);
  btnLower.addEventListener('click', handleLowerClick);
  restartButton.addEventListener('click', handleRestartClick);
  hideRatingsAndAction();
  if (sourceLabelEl) sourceLabelEl.style.display = 'none';
  document.addEventListener('keydown', (e) => {
    const active = document.activeElement;
    if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) return;
    if (e.key.toLowerCase() === 'h' || e.key === 'ArrowUp') if (!btnHigher.disabled) btnHigher.click();
    else if (e.key.toLowerCase() === 'l' || e.key === 'ArrowDown') if (!btnLower.disabled) btnLower.click();
    else if (e.key === 'Enter') { if (nextButton && nextButton.style.display !== 'none') nextButton.click(); else if (restartButton && gameOverSection.style.display !== 'none') restartButton.click(); }
  });
});
