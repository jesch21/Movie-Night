// high-or-low-scripts.js
// Title-matching + dedupe + buffered image loader + guaranteed non-text placeholder
// Includes fix: when a movie "stays", leftMovie is updated to the entry from the new source's pool
// Includes fix: fallback poster is a neutral SVG (no "Poster unavailable" text)

// ---------------- Supabase init (keep your keys) ----------------
const SUPABASE_URL = "https://vvknjdudbteivvqzglcv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2a25qZHVkYnRlaXZ2cXpnbGN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4MjEwODAsImV4cCI6MjA3MjM5NzA4MH0.RUabonop6t3H_KhXkm0UuvO_VlGJvCeNPSCYJ5KUNRU";
const supabase = window.supabase && window.supabase.createClient ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;
// expose single client so other scripts (leaderboard) can reuse it and avoid multiple GoTrueClient instances
window.hlSupabase = window.hlSupabase || supabase;


// ---------------- Game state ----------------
let moviesListAll = [];
let moviesListByOrder = {};
let moviesListByTitle = {};
let sourcePools = {};
let currentSourceKey = null;
let leftMovie = null;
let rightMovie = null;
let score = 0;

// sources
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
const SOURCE_LABELS = Object.assign({ IMDB: "IMDB" }, LETTERBOXD_TABLES.reduce((acc, t) => { acc[t] = `${t.split('-')[0]}'s Letterboxd`; return acc; }, {}));

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

// ---------------- Guaranteed non-text placeholder ----------------
// Neutral poster (no "unavailable" wording). Always loads (data URI).
const FALLBACK_SVG_DATA_URI = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600" viewBox="0 0 400 600">
     <defs>
       <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
         <stop offset="0%" stop-color="#2a2a2a"/>
         <stop offset="100%" stop-color="#111"/>
       </linearGradient>
     </defs>
     <rect width="100%" height="100%" fill="url(#g)"/>
     <g transform="translate(20,20)">
       <rect width="360" height="520" rx="12" ry="12" fill="#1a1a1a" stroke="#2f2f2f" />
       <!-- subtle film-stripe -->
       <rect x="12" y="12" width="336" height="80" rx="8" ry="8" fill="#0f0f0f" opacity="0.08"/>
     </g>
  </svg>`
);
// Use the neutral data-uri as our placeholder (guaranteed to exist)
const PLACEHOLDER_SRC = FALLBACK_SVG_DATA_URI;

// ---------------- Helpers ----------------
function pickRandomFromArray(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function shuffleArray(arr){ for(let i=arr.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]];} return arr; }
function safeString(v){ return typeof v==='string' ? v.trim() : (v===null||typeof v==='undefined' ? '' : String(v)); }
function normalizeTitle(t){ return safeString(t).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim(); }
function parseStarsValue(starsRaw){ if(!starsRaw&&starsRaw!==0) return NaN; const s=safeString(starsRaw).split('/')[0].trim().replace(',', '.'); return parseFloat(s); }
function parseImdbRating(v){ if(v===null||typeof v==='undefined') return NaN; const s=safeString(v).replace(',', '.'); return parseFloat(s); }
function normalizeOrderKey(o){ const n=Number(o); return !Number.isNaN(n) ? (Number.isInteger(n) ? String(n) : String(n)) : safeString(o); }
function getPublicImageUrl(imagePath){ if(!imagePath||!supabase) return null; try{ const p = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath; const res = supabase.storage.from('slideshowImages').getPublicUrl(p); if(res&&res.data) return res.data.publicUrl||res.data.publicURL||null; }catch(e){ console.warn('getPublicImageUrl error', e); } return null; }

// ---------------- Load moviesList and indexes ----------------
async function loadMoviesListAll(){
  try{
    if(!supabase){ console.warn('Supabase client unavailable.'); moviesListAll=[]; moviesListByOrder={}; moviesListByTitle={}; return false; }
    const { data, error } = await supabase.from('moviesList').select('*');
    if(error){ console.error('Supabase moviesList error', error); return false; }
    moviesListAll = Array.isArray(data)?data:[];
    moviesListByOrder = {};
    moviesListByTitle = {};
    moviesListAll.forEach(row=>{
      if(!row||typeof row!=='object') return;
      if(row['order']!=null) moviesListByOrder[normalizeOrderKey(row['order'])]=row;
      const t = row.title||row.Movie||'';
      const tk = normalizeTitle(t);
      if(tk){
        if(!moviesListByTitle[tk]) moviesListByTitle[tk]=row;
        else console.warn('Duplicate moviesList normalized title (keeping first):', tk, 'title:', t);
      }
    });
    return true;
  }catch(e){ console.error('loadMoviesListAll error', e); return false; }
}

// ---------------- Build IMDB pool ----------------
function buildImdbPoolFromMoviesList(){
  const pool=[];
  for(const row of moviesListAll){
    const imdbNum = parseImdbRating(row['imdb-rating']);
    const hasStars = (row['stars']!==null && row['stars']!==undefined && row['stars']!=='') || (row['Stars']!==null && row['Stars']!==undefined && row['Stars']!=='');
    if(Number.isFinite(imdbNum) && hasStars && row['order']!=null){
      const key = normalizeOrderKey(row['order']);
      const starsRaw = row['stars']||row['Stars']||null;
      const starsValue = parseStarsValue(starsRaw);
      const imagePath = row.image||null;
      const imageUrl = getPublicImageUrl(imagePath);
      pool.push({
        order: row['order'],
        orderKey: key,
        title: row.title||row.Movie||'',
        imdbRating: imdbNum,
        starsRaw,
        starsValue,
        starsRawNormalized: starsRaw ? String(starsRaw).split(/\s*[;,|]\s*/)[0].trim() : null,
        imagePath,
        imageUrl,
        sourceKey: 'IMDB'
      });
    }
  }
  return pool;
}

// ---------------- Fetch letterboxd pool (dedupe by title) ----------------
async function fetchAndBuildLetterboxdPool(tableName){
  let data=null;
  try{
    const res = await supabase.from(tableName).select('"order", Movie, Stars');
    if(res.error) throw res.error;
    data = res.data;
  }catch(e1){
    try{
      const res2 = await supabase.from(`"${tableName}"`).select('"order", Movie, Stars');
      if(res2.error) throw res2.error;
      data = res2.data;
    }catch(e2){
      console.error(`Error fetching ${tableName}`, e1||e2);
      return [];
    }
  }
  if(!Array.isArray(data)) return [];
  const seen = {};
  const pool = [];
  for(const row of data){
    const orderVal = (row && (row['order'] ?? row.order));
    const title = row.Movie || row.movie || '';
    const starsRaw = row.Stars || row.stars || '';
    const starsValue = parseStarsValue(starsRaw);
    if(!Number.isFinite(starsValue)) continue;
    const tkey = normalizeTitle(title);
    if(!tkey) continue;
    if(seen[tkey]) { console.warn(`Duplicate in ${tableName} for "${title}" — skipping duplicate.`); continue; }
    seen[tkey]=true;
    const mlRow = moviesListByTitle[tkey] || null;
    const imagePath = mlRow ? (mlRow.image||null) : null;
    const imageUrl = getPublicImageUrl(imagePath);
    let starsRawNormalized = null;
    if(starsRaw){
      starsRawNormalized = String(starsRaw).split(/\s*[;,|]\s*/)[0].trim();
      if(!starsRawNormalized.includes('/')){
        const v = parseStarsValue(starsRawNormalized);
        if(Number.isFinite(v)) starsRawNormalized = `${v}/5`;
      }
    }
    pool.push({
      order: orderVal,
      orderKey: String(orderVal),
      title: title||'',
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

async function ensureSourcePool(sourceKey){
  if(sourcePools[sourceKey]) return sourcePools[sourceKey];
  if(sourceKey === 'IMDB'){ const pool = buildImdbPoolFromMoviesList(); sourcePools[sourceKey] = pool; return pool; }
  const pool = await fetchAndBuildLetterboxdPool(sourceKey);
  sourcePools[sourceKey] = pool;
  return pool;
}

// ---------------- Selection logic ----------------
function pickTwoDistinctFromPool(pool){
  if(!Array.isArray(pool) || pool.length < 2) return null;
  let leftIndex = Math.floor(Math.random() * pool.length);
  let rightIndex;
  do{ rightIndex = Math.floor(Math.random() * pool.length); } while(rightIndex === leftIndex);
  return { left: pool[leftIndex], right: pool[rightIndex] };
}

async function chooseInitialSourceAndPair(){
  const keys = shuffleArray(Array.from(SOURCE_KEYS));
  for(const key of keys){
    const pool = await ensureSourcePool(key);
    if(Array.isArray(pool) && pool.length >= 2){
      currentSourceKey = key;
      const pair = pickTwoDistinctFromPool(pool);
      return { sourceKey: key, pair };
    }
  }
  return null;
}

// Pick a new source that contains the staying movie (staying identified by title)
async function pickNewSourceContainingStayingMovie(stayingTitle){
  const otherKeys = shuffleArray(SOURCE_KEYS.filter(k => k !== currentSourceKey));
  const wantNorm = normalizeTitle(stayingTitle || '');
  for(const key of otherKeys){
    const pool = await ensureSourcePool(key);
    if(!Array.isArray(pool) || pool.length === 0) continue;
    const foundIndex = pool.findIndex(m => {
      if(m.matchedMovieListTitle && normalizeTitle(m.matchedMovieListTitle) === wantNorm) return true;
      if(m.title && normalizeTitle(m.title) === wantNorm) return true;
      return false;
    });
    if(foundIndex >= 0){
      const candidates = pool.filter((m,i)=> i !== foundIndex);
      if(candidates.length === 0) continue;
      currentSourceKey = key;
      const right = pickRandomFromArray(candidates);
      return { sourceKey: key, newRight: right, pool };
    }
  }
  // fallback reuse current source: find same-title entry and pick another
  const currentPool = await ensureSourcePool(currentSourceKey);
  if(Array.isArray(currentPool) && currentPool.length >= 1){
    const foundIndex = currentPool.findIndex(m => normalizeTitle(m.title) === wantNorm || (m.matchedMovieListTitle && normalizeTitle(m.matchedMovieListTitle) === wantNorm));
    const candidates = currentPool.filter((m,i) => i !== foundIndex);
    if(candidates.length > 0){
      const right = pickRandomFromArray(candidates);
      return { sourceKey: currentSourceKey, newRight: right, pool: currentPool };
    }
  }
  return null;
}

// ---------------- Buffered safe image assignment (no-text fallback) ----------------
function makePosterId(sourceKey, title){ return `${String(sourceKey ?? 'unknown')}::${normalizeTitle(title ?? '')}`; }
function applyPlaceholderToImg(imgEl){
  if(!imgEl) return;
  imgEl.src = PLACEHOLDER_SRC; // guaranteed to exist (data URI)
  // keep alt as the movie title if present; do not set "unavailable" text
  if(!imgEl.alt) imgEl.alt = 'Poster';
  imgEl.dataset.currentPosterId = 'placeholder';
}
function setImgSrcSafely(imgEl, url, sourceKey, titleForId, debugTitle){
  if(!imgEl) return;
  const id = makePosterId(sourceKey, titleForId);
  imgEl.dataset.intendedPosterId = id;
  if(!url){ applyPlaceholderToImg(imgEl); console.warn('No poster URL for', debugTitle||id); return; }
  const loader = new Image();
  loader.crossOrigin = 'anonymous';
  loader.onload = () => {
    if(imgEl.dataset.intendedPosterId === id){
      imgEl.src = url;
      imgEl.dataset.currentPosterId = id;
      if(!imgEl.alt) imgEl.alt = debugTitle || 'Poster';
      console.info('Safe image applied ->', imgEl.id, url, 'for id', id, 'title:', debugTitle);
    } else {
      console.warn('Loaded image ignored (id mismatch) ->', url, 'for', id, 'img now intends', imgEl.dataset.intendedPosterId);
    }
  };
  loader.onerror = () => { console.warn('Safe loader failed ->', url, 'for', id); applyPlaceholderToImg(imgEl); };
  loader.src = url;
}

// ---------------- Leaderboard submission helpers ----------------

/**
 * Submit a final score for `player` to the highorlow-leaderboard table.
 * Uses existing `supabase` client (anon key in browser). Returns { data, error }.
 */
async function submitScoreToLeaderboard(player, score) {
  if (!supabase) {
    console.warn('Supabase client unavailable — cannot submit score.');
    return { data: null, error: new Error('Supabase client unavailable') };
  }
  if (!player) {
    console.warn('No player selected — skipping submit.');
    return { data: null, error: new Error('No player selected') };
  }
  try {
    const payload = { player: player, score: Math.floor(Number(score) || 0) };
    const { data, error } = await supabase
      .from('highorlow-leaderboard')
      .insert([payload])
      .select(); // select to get inserted row back (if allowed)
    return { data, error };
  } catch (err) {
    console.error('submitScoreToLeaderboard unexpected error', err);
    return { data: null, error: err };
  }
}


// ---------------- Rendering & UI ----------------
function renderMoviesAndSource(){
  const label = SOURCE_LABELS[currentSourceKey] || currentSourceKey || 'Unknown';
  if(sourceLabelEl){ sourceLabelEl.textContent = `Source: ${label}`; sourceLabelEl.style.display = 'block'; }
  leftTitleEl.textContent = leftMovie ? leftMovie.title : '';
  rightTitleEl.textContent = rightMovie ? rightMovie.title : '';
  if(leftYearEl) leftYearEl.textContent = '';
  if(rightYearEl) rightYearEl.textContent = '';
  if(leftMovie){
    const leftSource = leftMovie.sourceKey || currentSourceKey || 'IMDB';
    const leftTitle = leftMovie.title || leftMovie.matchedMovieListTitle || '';
    const leftUrl = leftMovie.imageUrl || (leftMovie.imagePath? getPublicImageUrl(leftMovie.imagePath) : null) || null;
    setImgSrcSafely(leftImgEl, leftUrl, leftSource, leftTitle, leftMovie.title);
    if(leftImgEl) leftImgEl.alt = leftMovie.title || 'Poster';
  } else { applyPlaceholderToImg(leftImgEl); if(leftImgEl) leftImgEl.alt = 'Poster'; }
  if(rightMovie){
    const rightSource = rightMovie.sourceKey || currentSourceKey || 'IMDB';
    const rightTitle = rightMovie.title || rightMovie.matchedMovieListTitle || '';
    const rightUrl = rightMovie.imageUrl || (rightMovie.imagePath? getPublicImageUrl(rightMovie.imagePath) : null) || null;
    setImgSrcSafely(rightImgEl, rightUrl, rightSource, rightTitle, rightMovie.title);
    if(rightImgEl) rightImgEl.alt = rightMovie.title || 'Poster';
  } else { applyPlaceholderToImg(rightImgEl); if(rightImgEl) rightImgEl.alt = 'Poster'; }
  roundInfo.textContent = `Right movie rating vs Left movie rating — guess if RIGHT is higher or lower.`;
}

// ---------------- Rating evaluation ----------------
function evaluateGuessAgainstCurrentSource(guessHigher){
  const leftVal = (currentSourceKey === 'IMDB') ? parseFloat(leftMovie.imdbRating) : Number(leftMovie.starsValue);
  const rightVal = (currentSourceKey === 'IMDB') ? parseFloat(rightMovie.imdbRating) : Number(rightMovie.starsValue);
  if(!Number.isFinite(leftVal) || !Number.isFinite(rightVal)) return { correct:false, leftVal, rightVal };
  if(Math.abs(leftVal-rightVal) < 1e-9) return { correct:true, leftVal, rightVal };
  const rightIsHigher = rightVal > leftVal;
  const correct = (guessHigher && rightIsHigher) || (!guessHigher && !rightIsHigher);
  return { correct, leftVal, rightVal };
}

// ---------------- Ratings & UI ----------------
function setChoiceButtonsEnabled(enabled){
  btnHigher.disabled = !enabled; btnLower.disabled = !enabled;
  btnHigher.setAttribute('aria-pressed', String(!enabled)); btnLower.setAttribute('aria-pressed', String(!enabled));
  if(!enabled){ btnHigher.style.opacity='0.6'; btnLower.style.opacity='0.6'; btnHigher.style.cursor='default'; btnLower.style.cursor='default'; }
  else { btnHigher.style.opacity=''; btnLower.style.opacity=''; btnHigher.style.cursor=''; btnLower.style.cursor=''; }
}
function formatImdb(v){ if(!Number.isFinite(v)) return 'N/A'; return (Math.round(v*10)/10).toFixed(1); }
function showRatingsAndAction({ correct, leftRating, rightRating }){
  if(currentSourceKey === 'IMDB'){
    leftRatingDisplay.textContent = (Number.isFinite(leftRating) ? `Rating: ${formatImdb(leftRating)}` : 'Rating: N/A');
    rightRatingDisplay.textContent = (Number.isFinite(rightRating) ? `Rating: ${formatImdb(rightRating)}` : 'Rating: N/A');
  } else {
    leftRatingDisplay.textContent = leftMovie && leftMovie.starsRawNormalized ? `Rating: ${leftMovie.starsRawNormalized}` : (Number.isFinite(leftRating) ? `Rating: ${leftRating}/5` : 'Rating: N/A');
    rightRatingDisplay.textContent = rightMovie && rightMovie.starsRawNormalized ? `Rating: ${rightMovie.starsRawNormalized}` : (Number.isFinite(rightRating) ? `Rating: ${rightRating}/5` : 'Rating: N/A');
  }
  if(correct){ nextButton.textContent='Next'; nextButton.onclick = handleNextClick; } else { nextButton.textContent='See my Score'; nextButton.onclick = handleSeeScoreClick; }
  if(ratingsActionRow) ratingsActionRow.style.display='flex';
  nextButton.style.display='inline-block';
  // preload extras
  try{ const pool = sourcePools[currentSourceKey] || []; for(let i=0;i<Math.min(2,pool.length);i++){ const u = pool[i].imageUrl || (pool[i].imagePath? getPublicImageUrl(pool[i].imagePath):null); if(u){ const p = new Image(); p.src = u; } } }catch(e){}
}
function hideRatingsAndAction(){ if(ratingsActionRow) ratingsActionRow.style.display='none'; leftRatingDisplay.textContent=''; rightRatingDisplay.textContent=''; nextButton.style.display='none'; nextButton.onclick = null; }

// ---------------- Poster handlers ----------------
function attachPosterErrorHandlers(){
  if(leftImgEl) leftImgEl.addEventListener('error', ()=>{ console.warn('Left img failed ->', leftImgEl.src); applyPlaceholderToImg(leftImgEl); });
  if(rightImgEl) rightImgEl.addEventListener('error', ()=>{ console.warn('Right img failed ->', rightImgEl.src); applyPlaceholderToImg(rightImgEl); });
}
function instrumentPosterLoads(){ [leftImgEl, rightImgEl].forEach(img => { if(!img) return; img.addEventListener('load', ()=> console.info('Image loaded OK ->', img.id, img.src, 'intended:', img.dataset.intendedPosterId, 'current:', img.dataset.currentPosterId)); img.addEventListener('error', ()=> console.error('Image load error ->', img.id, img.src)); }); }

// ---------------- Handlers ----------------
async function handleStartClick(){
  instructionsSection.style.display='none'; gameOverSection.style.display='none'; gameContainer.style.display='block';
  if(sourceLabelEl) sourceLabelEl.style.display='none';
  hideRatingsAndAction(); setChoiceButtonsEnabled(true);
  score = 0; updateScoreDisplay();
  const ok = await loadMoviesListAll();
  if(!ok){ roundInfo.textContent='Error loading movies. See console.'; return; }
  sourcePools = {};
  const initial = await chooseInitialSourceAndPair();
  if(!initial || !initial.pair){ roundInfo.textContent='No valid source with enough movies.'; return; }
  currentSourceKey = initial.sourceKey;
  leftMovie = initial.pair.left; rightMovie = initial.pair.right;
  // debug dump to console
  try{ Object.keys(sourcePools).forEach(k=>{ const pool = sourcePools[k]||[]; console.group(`Pool: ${k}`); console.table(pool.map(x=>({ title:x.title, order:x.order, matched:x.matchedMovieListTitle||null, stars:x.starsRaw, starsNorm:x.starsRawNormalized||null, hasImage:!!x.imageUrl }))); console.groupEnd(); }); }catch(e){}
  renderMoviesAndSource();
}
function updateScoreDisplay(){ scoreDisplay.textContent = `Score: ${score}`; }
async function showGameOver(){
  hideRatingsAndAction();
  gameContainer.style.display='none';
  gameOverSection.style.display='block';
  finalScoreEl.textContent = `You earned ${score} ${score===1?'point':'points'}.`;

  // Clear previous submit status message
  const submitStatusEl = document.getElementById('submitStatus');
  if(submitStatusEl) submitStatusEl.textContent = 'Submitting score...';

  // Determine selected player (read from select on page)
  const playerSelectEl = document.getElementById('playerSelect');
  const playerName = playerSelectEl ? (playerSelectEl.value || '') : '';

  // Submit (do not block UI; await to show result but UI is visible)
  try {
    const { data, error } = await submitScoreToLeaderboard(playerName, score);
    if(error){
      console.warn('Leaderboard insert error', error);
      if(submitStatusEl) submitStatusEl.innerHTML = `<span style="color:#ffb3b3">Failed to submit score: ${error.message || String(error)}</span>`;
    } else {
      // success — show a short confirmation with inserted id if available
      const insertedId = (Array.isArray(data) && data[0] && data[0].id) ? data[0].id : null;
      const msg = insertedId ? `Score submitted (id ${insertedId}).` : 'Score submitted.';
      if(submitStatusEl) submitStatusEl.innerHTML = `<span style="color:#c8ffcf">${msg}</span>`;
    }
  } catch (err) {
    console.error('Error while submitting score', err);
    if(submitStatusEl) submitStatusEl.innerHTML = `<span style="color:#ffb3b3">Unexpected submission error.</span>`;
  }

  // Re-enable player select so a new player can be chosen if they restart
  if(playerSelectEl) playerSelectEl.disabled = false;
}


function handleHigherClick(){ if(!leftMovie || !rightMovie) return; setChoiceButtonsEnabled(false); const { correct, leftVal, rightVal } = evaluateGuessAgainstCurrentSource(true); if(correct){ score+=1; updateScoreDisplay(); roundInfo.textContent='Correct — the ratings are shown below. Click Next.'; showRatingsAndAction({ correct:true, leftRating:leftVal, rightRating:rightVal }); } else { roundInfo.textContent='Incorrect — the ratings are shown below. Click See my Score.'; showRatingsAndAction({ correct:false, leftRating:leftVal, rightRating:rightVal }); } }
function handleLowerClick(){ if(!leftMovie || !rightMovie) return; setChoiceButtonsEnabled(false); const { correct, leftVal, rightVal } = evaluateGuessAgainstCurrentSource(false); if(correct){ score+=1; updateScoreDisplay(); roundInfo.textContent='Correct — the ratings are shown below. Click Next.'; showRatingsAndAction({ correct:true, leftRating:leftVal, rightRating:rightVal }); } else { roundInfo.textContent='Incorrect — the ratings are shown below. Click See my Score.'; showRatingsAndAction({ correct:false, leftRating:leftVal, rightRating:rightVal }); } }

async function handleNextClick(){
  hideRatingsAndAction();
  // RIGHT movie stays — but update leftMovie to the ENTRY representing that movie in the NEW source's pool
  const stayingOld = rightMovie;
  // find a new source that contains the staying movie (caller uses title matching)
  const pick = await pickNewSourceContainingStayingMovie(stayingOld.title || stayingOld.matchedMovieListTitle || '');
  if(!pick){
    // fallback: reuse current source pool and pick a new right (and update left from that pool if possible)
    const pool = await ensureSourcePool(currentSourceKey);
    // try to find staying entry inside current pool by normalized title
    const wantNorm = normalizeTitle(stayingOld.title || stayingOld.matchedMovieListTitle || '');
    const stayingEntry = pool ? pool.find(m => (m.matchedMovieListTitle && normalizeTitle(m.matchedMovieListTitle) === wantNorm) || normalizeTitle(m.title) === wantNorm) : null;
    if(stayingEntry){
      leftMovie = stayingEntry; // <-- crucial: update leftMovie to pool entry so its starsValue reflects current source
      // pick new right
      const candidates = pool.filter(m => m !== stayingEntry);
      if(candidates.length === 0){ showGameOver(); return; }
      rightMovie = pickRandomFromArray(candidates);
    } else {
      // worst-case: couldn't find staying in current pool (shouldn't happen), keep prior staying but pick new right
      leftMovie = stayingOld;
      const candidates = pool || [];
      const filtered = candidates.filter(m => normalizeTitle(m.title) !== normalizeTitle(stayingOld.title || ''));
      if(filtered.length === 0){ showGameOver(); return; }
      rightMovie = pickRandomFromArray(filtered);
    }
  } else {
    // pick contains { sourceKey, newRight, pool }
    currentSourceKey = pick.sourceKey;
    const pool = pick.pool || [];
    const wantNorm = normalizeTitle(stayingOld.title || stayingOld.matchedMovieListTitle || '');
    // find the staying movie inside the chosen pool
    const stayingEntry = pool.find(m => (m.matchedMovieListTitle && normalizeTitle(m.matchedMovieListTitle) === wantNorm) || normalizeTitle(m.title) === wantNorm) || null;
    if(stayingEntry){
      leftMovie = stayingEntry; // <-- crucial fix: update left movie's rating to this source's entry
    } else {
      // fallback: leftMovie becomes the matchedMovieListTitle entry if available, otherwise use stayingOld
      leftMovie = stayingEntry || stayingOld;
    }
    rightMovie = pick.newRight;
  }

  renderMoviesAndSource();
  setChoiceButtonsEnabled(true);
}

function handleSeeScoreClick(){ hideRatingsAndAction(); showGameOver(); }
function handleRestartClick(){
  gameOverSection.style.display='none'; instructionsSection.style.display=''; gameContainer.style.display='none';
  roundInfo.textContent=''; score=0; updateScoreDisplay(); hideRatingsAndAction(); setChoiceButtonsEnabled(true);
  if(sourceLabelEl) sourceLabelEl.style.display='none';
}

// ---------------- Wire up events ----------------
document.addEventListener('DOMContentLoaded', ()=>{
    // --- Player select & leaderboard button wiring ---
  const playerSelectEl = document.getElementById('playerSelect');
  const leaderboardButtonInitEl = document.getElementById('leaderboardButtonInit');
  const leaderboardButtonGameOverEl = document.getElementById('leaderboardButtonGameOver');

  // Enable / disable Start button depending on selection
  if (playerSelectEl && startButton) {
    // ensure start disabled until a valid name chosen (HTML starts disabled)
    playerSelectEl.addEventListener('change', () => {
      startButton.disabled = !playerSelectEl.value;
    });
  }

  // Navigate to leaderboard page when either button clicked
  if (leaderboardButtonInitEl) leaderboardButtonInitEl.addEventListener('click', () => { location.href = 'leaderboard.html'; });
  if (leaderboardButtonGameOverEl) leaderboardButtonGameOverEl.addEventListener('click', () => { location.href = 'leaderboard.html'; });

  // When the game starts, lock the player selection to prevent mid-game changes
  startButton.addEventListener('click', () => {
    if (playerSelectEl) playerSelectEl.disabled = true;
  });

  // When restart is clicked, re-enable the select (restart handler already clears state)
  restartButton.addEventListener('click', () => {
    if (playerSelectEl) playerSelectEl.disabled = false;
  });

  
  if(!startButton || !btnHigher || !btnLower || !restartButton){ console.error('Missing required DOM elements.'); return; }
  // initial guaranteed placeholder (data URI) so no file:// fallback ever used
  if(leftImgEl){ leftImgEl.loading='lazy'; leftImgEl.decoding='async'; leftImgEl.crossOrigin='anonymous'; if(!leftImgEl.src) leftImgEl.src = PLACEHOLDER_SRC; }
  if(rightImgEl){ rightImgEl.loading='lazy'; rightImgEl.decoding='async'; rightImgEl.crossOrigin='anonymous'; if(!rightImgEl.src) rightImgEl.src = PLACEHOLDER_SRC; }
  attachPosterErrorHandlers(); instrumentPosterLoads();
  startButton.addEventListener('click', handleStartClick);
  btnHigher.addEventListener('click', handleHigherClick);
  btnLower.addEventListener('click', handleLowerClick);
  restartButton.addEventListener('click', handleRestartClick);
  hideRatingsAndAction();
  if(sourceLabelEl) sourceLabelEl.style.display='none';

  // keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    const active = document.activeElement;
    if(active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) return;
    if(e.key.toLowerCase() === 'h' || e.key === 'ArrowUp'){ if(!btnHigher.disabled) btnHigher.click(); }
    else if(e.key.toLowerCase() === 'l' || e.key === 'ArrowDown'){ if(!btnLower.disabled) btnLower.click(); }
    else if(e.key === 'Enter'){ if(nextButton && nextButton.style.display !== 'none') nextButton.click(); else if(restartButton && gameOverSection.style.display !== 'none') restartButton.click(); }
  });
});
