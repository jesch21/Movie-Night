// high-or-low-scripts.js
// High-or-Low game (updated: added LETTERBOXD_POP source and stricter movie selection by date + stars)

// ---------------- Supabase init (keep your keys) ----------------
const SUPABASE_URL = "https://vvknjdudbteivvqzglcv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2a25qZHVkYnRlaXZ2cXpnbGN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4MjEwODAsImV4cCI6MjA3MjM5NzA4MH0.RUabonop6t3H_KhXkm0UuvO_VlGJvCeNPSCYJ5KUNRU";
// reuse or create a single client to avoid multiple GoTrueClient warnings
const supabase = window.hlSupabase || (window.supabase && window.supabase.createClient ? (window.hlSupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)) : null);

// ---------------- Game state ----------------
let moviesListAll = [];
let moviesListByOrder = {};
let moviesListByTitle = {};
let sourcePools = {};
let currentSourceKey = null;
let leftMovie = null;
let rightMovie = null;
let score = 0;

// sources (added LETTERBOXD_POP for populace LB rating)
const LETTERBOXD_TABLES = [
  "Alex-Letterboxd",
  "Ayub-Letterboxd",
  "Caleb-Letterboxd",
  "Joe-Letterboxd",
  "John-Letterboxd",
  "Landon-Letterboxd",
  "Trevor-Letterboxd"
];
const SOURCE_KEYS = ["IMDB", "LETTERBOXD_POP", ...LETTERBOXD_TABLES];
const SOURCE_LABELS = Object.assign(
  { IMDB: "IMDB", LETTERBOXD_POP: "Letterboxd (populace)" },
  LETTERBOXD_TABLES.reduce((acc, t) => { acc[t] = `${t.split('-')[0]}'s Letterboxd`; return acc; }, {})
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
const leftCardEl = document.getElementById('leftCard');
const rightCardEl = document.getElementById('rightCard');
const btnHigher = document.getElementById('btnHigher'); // kept but hidden
const btnLower = document.getElementById('btnLower');   // kept but hidden
const finalScoreEl = document.getElementById('finalScore');
const roundInfo = document.getElementById('roundInfo');
const ratingsActionRow = document.getElementById('ratingsActionRow');
const leftRatingDisplay = document.getElementById('leftRatingDisplay');
const rightRatingDisplay = document.getElementById('rightRatingDisplay');
const nextButton = document.getElementById('nextButton');
const sourceLabelEl = document.getElementById('sourceLabel');

// ---------------- Placeholder & helpers ----------------
const FALLBACK_SVG_DATA_URI = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600" viewBox="0 0 400 600">
     <defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
       <stop offset="0%" stop-color="#2a2a2a"/><stop offset="100%" stop-color="#111"/>
     </linearGradient></defs>
     <rect width="100%" height="100%" fill="url(#g)"/>
     <g transform="translate(20,20)">
       <rect width="360" height="520" rx="12" ry="12" fill="#1a1a1a" stroke="#2f2f2f" />
       <rect x="12" y="12" width="336" height="80" rx="8" ry="8" fill="#0f0f0f" opacity="0.08"/>
     </g>
  </svg>`
);
const PLACEHOLDER_SRC = FALLBACK_SVG_DATA_URI;

function pickRandomFromArray(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function shuffleArray(arr){ for(let i=arr.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]];} return arr; }
function safeString(v){ return typeof v==='string' ? v.trim() : (v===null||typeof v==='undefined' ? '' : String(v)); }
function normalizeTitle(t){ return safeString(t).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim(); }
function parseStarsValue(starsRaw){ if(!starsRaw&&starsRaw!==0) return NaN; const s=safeString(starsRaw).split('/')[0].trim().replace(',', '.'); return parseFloat(s); }
function parseImdbRating(v){ if(v===null||typeof v==='undefined') return NaN; const s=safeString(v).replace(',', '.'); return parseFloat(s); }
function parseLetterboxdPopRating(v){ if(v===null||typeof v==='undefined') return NaN; const s=safeString(v).replace(',', '.'); return parseFloat(s); }
function normalizeOrderKey(o){ const n=Number(o); return !Number.isNaN(n) ? (Number.isInteger(n) ? String(n) : String(n)) : safeString(o); }
function getPublicImageUrl(imagePath){ if(!imagePath||!supabase) return null; try{ const p = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath; const res = supabase.storage.from('slideshowImages').getPublicUrl(p); if(res&&res.data) return res.data.publicUrl||res.data.publicURL||null; }catch(e){ console.warn('getPublicImageUrl error', e); } return null; }

// NEW helper: get first image value out of array-or-string
function getFirstImageValue(imgField){
  if(Array.isArray(imgField)){
    return imgField.length > 0 ? imgField[0] : null;
  }
  if(typeof imgField === 'string' && imgField.trim().length > 0) return imgField.trim();
  return null;
}

// ---------------- Date helper: robustly extract a Date from a row ----------------
function getDateFromRow(row){
  if(!row || typeof row !== 'object') return null;
  // check several common date field names (user said there is a "date" variable)
  const candidates = ['date','releaseDate','release_date','released','released_at','releaseAt','releaseYear','year'];
  for(const key of candidates){
    if(key in row && row[key] != null){
      const val = row[key];
      if(typeof val === 'string' || typeof val === 'number'){
        // If it's a 4-digit year, treat as Jan 1 of that year
        const s = String(val).trim();
        if(/^\d{4}$/.test(s)){
          return new Date(Number(s), 0, 1);
        }
        // Try parsing ISO-ish date or timestamp
        const t = Date.parse(s);
        if(!Number.isNaN(t)) return new Date(t);
        // try numeric timestamp
        const n = Number(val);
        if(!Number.isNaN(n)){
          // treat as ms if large, otherwise as year handled above
          if(n > 1e10) return new Date(n); // probably ms since epoch
          // fallback: try as days? not worth guessing — skip
        }
      } else if(val instanceof Date) {
        return val;
      }
    }
  }
  return null;
}

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

// ---------------- Determine the 'next upcoming' movie (closest date > now) ----------------
function findNextUpcomingMovie(){
  const now = new Date();
  let best = null;
  let bestTime = Infinity;
  for(const r of moviesListAll){
    const d = getDateFromRow(r);
    if(!d) continue;
    const t = d.getTime();
    if(t > now.getTime() && t < bestTime){
      bestTime = t; best = r;
    }
  }
  if(best) {
    try { console.info('Next upcoming movie chosen for inclusion:', best.title || best.Movie || best); } catch(e){}
  }
  return best;
}

// ---------------- Build IMDB pool ----------------
function buildImdbPoolFromMoviesList(){
  const pool=[];
  const nextUpcoming = findNextUpcomingMovie();
  for(const row of moviesListAll){
    const imdbNum = parseImdbRating(row['imdb-rating']);
    const hasStars = (row['stars']!==null && row['stars']!==undefined && row['stars']!=='') || (row['Stars']!==null && row['Stars']!==undefined && row['Stars']!=='');
    // require stars and a finite imdb rating
    if(!hasStars || !Number.isFinite(imdbNum)) continue;
    // date check: either watched (date <= now) or it's the single next upcoming
    const d = getDateFromRow(row);
    const now = new Date();
    const isWatched = d ? (d.getTime() <= now.getTime()) : false;
    const isNext = (nextUpcoming && ( (nextUpcoming.title && row.title && nextUpcoming.title === row.title) || (nextUpcoming.Movie && row.Movie && nextUpcoming.Movie === row.Movie) || (getFirstImageValue(nextUpcoming.image) && getFirstImageValue(row.image) && getFirstImageValue(nextUpcoming.image) === getFirstImageValue(row.image)) )) || (nextUpcoming && nextUpcoming === row);
    if(!isWatched && !isNext) continue;
    // require order non-null (prefer existing order) OR allow next upcoming even if no order
    if(row['order'] == null && !isNext) continue;

    const key = normalizeOrderKey(row['order']);
    const starsRaw = row['stars']||row['Stars']||null;
    const starsValue = parseStarsValue(starsRaw);
    const imagePath = getFirstImageValue(row.image) || null;
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
  return pool;
}

// ---------------- Build Letterboxd-pop (populace) pool (same logic as IMDB) ----------------
function buildLetterboxdPopPoolFromMoviesList(){
  const pool=[];
  const nextUpcoming = findNextUpcomingMovie();
  for(const row of moviesListAll){
    const lbNum = parseLetterboxdPopRating(row['letterboxd-rating']);
    const hasStars = (row['stars']!==null && row['stars']!==undefined && row['stars']!=='') || (row['Stars']!==null && row['Stars']!==undefined && row['Stars']!=='');
    if(!hasStars || !Number.isFinite(lbNum)) continue;
    // date check
    const d = getDateFromRow(row);
    const now = new Date();
    const isWatched = d ? (d.getTime() <= now.getTime()) : false;
    const isNext = (nextUpcoming && ( (nextUpcoming.title && row.title && nextUpcoming.title === row.title) || (nextUpcoming.Movie && row.Movie && nextUpcoming.Movie === row.Movie) || (getFirstImageValue(nextUpcoming.image) && getFirstImageValue(row.image) && getFirstImageValue(nextUpcoming.image) === getFirstImageValue(row.image)) )) || (nextUpcoming && nextUpcoming === row);
    if(!isWatched && !isNext) continue;
    if(row['order'] == null && !isNext) continue;

    const key = normalizeOrderKey(row['order']);
    const starsRaw = row['stars']||row['Stars']||null;
    const starsValue = parseStarsValue(starsRaw);
    const imagePath = getFirstImageValue(row.image) || null;
    const imageUrl = getPublicImageUrl(imagePath);
    pool.push({
      order: row['order'],
      orderKey: key,
      title: row.title||row.Movie||'',
      letterboxdRating: lbNum,
      starsRaw,
      starsValue,
      starsRawNormalized: starsRaw ? String(starsRaw).split(/\s*[;,|]\s*/)[0].trim() : null,
      imagePath,
      imageUrl,
      sourceKey: 'LETTERBOXD_POP'
    });
  }
  return pool;
}

// ---------------- Fetch letterboxd personal pool (dedupe by title) ----------------
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
    // Only include entries that exist in your moviesList (we only want seen/watched movies for personal tables)
    const mlRow = moviesListByTitle[tkey] || null;
    if(!mlRow) { continue; }
    // require matched moviesList entry to have an order (be watched)
    if(mlRow['order'] == null) { continue; }
    const imagePath = mlRow ? (getFirstImageValue(mlRow.image) || null) : null;
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
  if(sourceKey === 'LETTERBOXD_POP'){ const pool = buildLetterboxdPopPoolFromMoviesList(); sourcePools[sourceKey] = pool; return pool; }
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
  if(imgEl.tagName === 'IMG'){
    imgEl.src = PLACEHOLDER_SRC;
    if(!imgEl.alt) imgEl.alt = 'Poster';
    imgEl.dataset.currentPosterId = 'placeholder';
  } else {
    // for non-img (e.g. div) use background placeholder
    imgEl.style.backgroundImage = `url("${PLACEHOLDER_SRC}")`;
    imgEl.dataset.currentPosterId = 'placeholder';
  }
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
      if(imgEl.tagName === 'IMG'){
        imgEl.src = url;
      } else {
        imgEl.style.backgroundImage = `url("${url}")`;
      }
      imgEl.dataset.currentPosterId = id;
      if(!imgEl.alt && imgEl.tagName === 'IMG') imgEl.alt = debugTitle || 'Poster';
      console.info('Safe image applied ->', imgEl.id, url, 'for id', id, 'title:', debugTitle);
    } else {
      console.warn('Loaded image ignored (id mismatch) ->', url, 'for', id, 'img now intends', imgEl.dataset.intendedPosterId);
    }
  };
  loader.onerror = () => { console.warn('Safe loader failed ->', url, 'for', id); applyPlaceholderToImg(imgEl); };
  loader.src = url;
}

// ---------------- Leaderboard submission helpers ----------------
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
      .select();
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
  // left
  if(leftMovie){
    const leftSource = leftMovie.sourceKey || currentSourceKey || 'IMDB';
    const leftTitle = leftMovie.title || leftMovie.matchedMovieListTitle || '';
    const leftUrl = leftMovie.imageUrl || (leftMovie.imagePath? getPublicImageUrl(leftMovie.imagePath) : null) || null;
    setImgSrcSafely(leftImgEl, leftUrl, leftSource, leftTitle, leftMovie.title);
    if(leftImgEl) leftImgEl.alt = leftMovie.title || 'Poster';
  } else { applyPlaceholderToImg(leftImgEl); if(leftImgEl) leftImgEl.alt = 'Poster'; }
  // right
  if(rightMovie){
    const rightSource = rightMovie.sourceKey || currentSourceKey || 'IMDB';
    const rightTitle = rightMovie.title || rightMovie.matchedMovieListTitle || '';
    const rightUrl = rightMovie.imageUrl || (rightMovie.imagePath? getPublicImageUrl(rightMovie.imagePath) : null) || null;
    setImgSrcSafely(rightImgEl, rightUrl, rightSource, rightTitle, rightMovie.title);
    if(rightImgEl) rightImgEl.alt = rightMovie.title || 'Poster';
  } else { applyPlaceholderToImg(rightImgEl); if(rightImgEl) rightImgEl.alt = 'Poster'; }
  roundInfo.textContent = `Click which movie you think has the HIGHER rating (click the poster).`;
}

// ---------------- Rating evaluation ----------------
function evaluateGuessAgainstCurrentSource(guessHigher){
  // guessHigher === true means player guessed RIGHT is higher than LEFT
  const leftVal = (currentSourceKey === 'IMDB') ? parseFloat(leftMovie.imdbRating) : (currentSourceKey === 'LETTERBOXD_POP' ? Number(leftMovie.letterboxdRating) : Number(leftMovie.starsValue));
  const rightVal = (currentSourceKey === 'IMDB') ? parseFloat(rightMovie.imdbRating) : (currentSourceKey === 'LETTERBOXD_POP' ? Number(rightMovie.letterboxdRating) : Number(rightMovie.starsValue));
  if(!Number.isFinite(leftVal) || !Number.isFinite(rightVal)) return { correct:false, leftVal, rightVal };
  if(Math.abs(leftVal-rightVal) < 1e-9) return { correct:true, leftVal, rightVal };
  const rightIsHigher = rightVal > leftVal;
  const correct = (guessHigher && rightIsHigher) || (!guessHigher && !rightIsHigher);
  return { correct, leftVal, rightVal };
}

// ---------------- Ratings & UI ----------------
function setChoiceButtonsEnabled(enabled){
  // hide original buttons if present
  if(btnHigher) btnHigher.style.display = 'none';
  if(btnLower) btnLower.style.display = 'none';

  // enable/disable clicks on the poster cards
  const elems = [leftCardEl, rightCardEl, leftImgEl, rightImgEl].filter(Boolean);
  elems.forEach(el => {
    if(enabled){
      el.style.pointerEvents = '';
      el.style.cursor = 'pointer';
      el.setAttribute('aria-disabled','false');
    } else {
      el.style.pointerEvents = 'none';
      el.style.cursor = 'default';
      el.setAttribute('aria-disabled','true');
    }
  });
  if(!enabled){ if(leftCardEl) leftCardEl.style.opacity = '0.85'; if(rightCardEl) rightCardEl.style.opacity = '0.85'; }
  else { if(leftCardEl) leftCardEl.style.opacity = ''; if(rightCardEl) rightCardEl.style.opacity = ''; }
}
function formatImdb(v){ if(!Number.isFinite(v)) return 'N/A'; return (Math.round(v*10)/10).toFixed(1); }
function formatLetterboxdPop(v){ if(!Number.isFinite(v)) return 'N/A'; return (Math.round(v*10)/10).toFixed(1); }
function showRatingsAndAction({ correct, leftRating, rightRating }){
  if(currentSourceKey === 'IMDB'){
    leftRatingDisplay.textContent = (Number.isFinite(leftRating) ? `Rating: ${formatImdb(leftRating)}` : 'Rating: N/A');
    rightRatingDisplay.textContent = (Number.isFinite(rightRating) ? `Rating: ${formatImdb(rightRating)}` : 'Rating: N/A');
  } else if(currentSourceKey === 'LETTERBOXD_POP'){
    leftRatingDisplay.textContent = (Number.isFinite(leftRating) ? `Rating: ${formatLetterboxdPop(leftRating)}` : 'Rating: N/A');
    rightRatingDisplay.textContent = (Number.isFinite(rightRating) ? `Rating: ${formatLetterboxdPop(rightRating)}` : 'Rating: N/A');
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

// ---------------- Click handlers for posters (new interaction) ----------------
function handlePosterChoice(isRightChosen){
  if(!leftMovie || !rightMovie) return;
  setChoiceButtonsEnabled(false);
  const { correct, leftVal, rightVal } = evaluateGuessAgainstCurrentSource(isRightChosen);
  if(correct){
    score += 1;
    updateScoreDisplay();
    roundInfo.textContent = 'Correct — the ratings are shown below. Click Next.';
    showRatingsAndAction({ correct:true, leftRating:leftVal, rightRating:rightVal });
  } else {
    roundInfo.textContent = 'Incorrect — the ratings are shown below. Click See my Score.';
    showRatingsAndAction({ correct:false, leftRating:leftVal, rightRating:rightVal });
  }
}

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

// ---------------- Save prompt modal for high-or-low (unchanged from previous) ----------------
function removeHLsavePrompt(){
  const overlay = document.getElementById('hlSavePromptOverlay');
  if(overlay) overlay.remove();
  document.body.style.overflow = '';
}

function showHLsavePrompt(playerName, score){
  if(document.getElementById('hlSavePromptOverlay')) return;

  const overlay = document.createElement('div');
  overlay.id = 'hlSavePromptOverlay';
  overlay.style.position = 'fixed';
  overlay.style.left = '0';
  overlay.style.top = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.background = 'rgba(0,0,0,0.65)';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = '9999';

  const dialog = document.createElement('div');
  dialog.style.background = '#F2F5EA';
  dialog.style.color = '#131313';
  dialog.style.padding = '20px';
  dialog.style.borderRadius = '12px';
  dialog.style.width = 'min(560px, 94%)';
  dialog.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
  dialog.style.textAlign = 'center';

  const title = document.createElement('h2');
  title.textContent = 'Save your score?';
  title.style.marginTop = '0';
  title.style.color = '#4c0606';
  dialog.appendChild(title);

  const msg = document.createElement('p');
  msg.style.margin = '8px 0 16px';
  msg.textContent = `Player: ${playerName || '(no name)'} — Score: ${score}`;
  dialog.appendChild(msg);

  const btnRow = document.createElement('div');
  btnRow.style.display = 'flex';
  btnRow.style.gap = '12px';
  btnRow.style.justifyContent = 'center';
  btnRow.style.marginTop = '12px';

  const saveBtn = document.createElement('button');
  saveBtn.className = 'gameButton';
  saveBtn.textContent = 'Save score';
  saveBtn.style.minWidth = '120px';

  const skipBtn = document.createElement('button');
  skipBtn.className = 'gameButton';
  skipBtn.textContent = "Don't save";
  skipBtn.style.minWidth = '120px';

  const cancelBtn = document.createElement('button');
  cancelBtn.className = 'gameButton';
  cancelBtn.textContent = 'Cancel';
  cancelBtn.style.minWidth = '120px';

  btnRow.appendChild(saveBtn);
  btnRow.appendChild(skipBtn);
  btnRow.appendChild(cancelBtn);

  const statusLine = document.createElement('div');
  statusLine.id = 'hlSavePromptStatus';
  statusLine.style.marginTop = '10px';
  statusLine.style.fontSize = '0.95rem';
  dialog.appendChild(btnRow);
  dialog.appendChild(statusLine);

  overlay.appendChild(dialog);
  document.body.appendChild(overlay);

  cancelBtn.addEventListener('click', () => {
    removeHLsavePrompt();
  });

  skipBtn.addEventListener('click', () => {
    removeHLsavePrompt();
    const submitStatusEl = document.getElementById('submitStatus');
    if(submitStatusEl) submitStatusEl.innerHTML = `<span style="color:#ffd3d3">Score not saved.</span>`;
    const playerSelectEl = document.getElementById('playerSelect');
    if(playerSelectEl) playerSelectEl.disabled = false;
  });

  saveBtn.addEventListener('click', async () => {
    saveBtn.disabled = true;
    skipBtn.disabled = true;
    cancelBtn.disabled = true;
    statusLine.textContent = 'Submitting score...';
    try {
      const { data, error } = await submitScoreToLeaderboard(playerName, score);
      if(error){
        console.warn('Leaderboard insert error', error);
        statusLine.textContent = `Failed to submit: ${error.message || String(error)} — you can try again or choose Don't save.`;
        saveBtn.disabled = false;
        skipBtn.disabled = false;
        cancelBtn.disabled = false;
      } else {
        const insertedId = (Array.isArray(data) && data[0] && data[0].id) ? data[0].id : null;
        const msg = insertedId ? `Score submitted (id ${insertedId}).` : 'Score submitted.';
        const submitStatusEl = document.getElementById('submitStatus');
        if(submitStatusEl) submitStatusEl.innerHTML = `<span style="color:#c8ffcf">${msg}</span>`;
        setTimeout(() => {
          removeHLsavePrompt();
          const playerSelectEl = document.getElementById('playerSelect');
          if(playerSelectEl) playerSelectEl.disabled = false;
        }, 900);
      }
    } catch (err) {
      console.error('Error while submitting score', err);
      statusLine.textContent = 'Unexpected submission error.';
      saveBtn.disabled = false;
      skipBtn.disabled = false;
      cancelBtn.disabled = false;
    }
  });

  saveBtn.focus();
}

// ---------------- Handlers (continued) ----------------
function showGameOver(){
  hideRatingsAndAction();
  gameContainer.style.display='none';
  gameOverSection.style.display='block';
  finalScoreEl.textContent = `You earned ${score} ${score===1?'point':'points'}.`;

  // Clear previous submit status message
  const submitStatusEl = document.getElementById('submitStatus');
  if(submitStatusEl) submitStatusEl.textContent = '';

  // Determine selected player (read from select on page)
  const playerSelectEl = document.getElementById('playerSelect');
  const playerName = playerSelectEl ? (playerSelectEl.value || '') : '';

  // Instead of auto-submitting, prompt user whether to save
  showHLsavePrompt(playerName, score);
}

function handleHigherClick(){ /* removed — posters are buttons now */ }
function handleLowerClick(){ /* removed — posters are buttons now */ }

async function handleNextClick(){
  hideRatingsAndAction();
  const stayingOld = rightMovie;
  const pick = await pickNewSourceContainingStayingMovie(stayingOld.title || stayingOld.matchedMovieListTitle || '');
  if(!pick){
    const pool = await ensureSourcePool(currentSourceKey);
    const wantNorm = normalizeTitle(stayingOld.title || stayingOld.matchedMovieListTitle || '');
    const stayingEntry = pool ? pool.find(m => (m.matchedMovieListTitle && normalizeTitle(m.matchedMovieListTitle) === wantNorm) || normalizeTitle(m.title) === wantNorm) : null;
    if(stayingEntry){
      leftMovie = stayingEntry;
      const candidates = pool.filter(m => m !== stayingEntry);
      if(candidates.length === 0){ showGameOver(); return; }
      rightMovie = pickRandomFromArray(candidates);
    } else {
      leftMovie = stayingOld;
      const candidates = pool || [];
      const filtered = candidates.filter(m => normalizeTitle(m.title) !== normalizeTitle(stayingOld.title || ''));
      if(filtered.length === 0){ showGameOver(); return; }
      rightMovie = pickRandomFromArray(filtered);
    }
  } else {
    currentSourceKey = pick.sourceKey;
    const pool = pick.pool || [];
    const wantNorm = normalizeTitle(stayingOld.title || stayingOld.matchedMovieListTitle || '');
    const stayingEntry = pool.find(m => (m.matchedMovieListTitle && normalizeTitle(m.matchedMovieListTitle) === wantNorm) || normalizeTitle(m.title) === wantNorm) || null;
    if(stayingEntry){
      leftMovie = stayingEntry;
    } else {
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

  // Ensure start disabled until a valid name chosen (HTML starts disabled)
  if (playerSelectEl && startButton) {
    playerSelectEl.addEventListener('change', () => {
      startButton.disabled = !playerSelectEl.value;
    });
  }

  // Nav to leaderboard
  if (leaderboardButtonInitEl) leaderboardButtonInitEl.addEventListener('click', () => { location.href = 'leaderboard.html'; });
  if (leaderboardButtonGameOverEl) leaderboardButtonGameOverEl.addEventListener('click', () => { location.href = 'leaderboard.html'; });

  // When the game starts, lock the player selection to prevent mid-game changes
  if(startButton) startButton.addEventListener('click', () => {
    if (playerSelectEl) playerSelectEl.disabled = true;
  });

  // When restart is clicked, re-enable the select
  if(restartButton) restartButton.addEventListener('click', () => {
    if (playerSelectEl) playerSelectEl.disabled = false;
  });

  if(!startButton || !leftImgEl || !rightImgEl || !restartButton){ console.error('Missing required DOM elements.'); return; }

  // initial guaranteed placeholder (data URI) so no file:// fallback ever used
  if(leftImgEl){ leftImgEl.loading='lazy'; leftImgEl.decoding='async'; leftImgEl.crossOrigin='anonymous'; if(!leftImgEl.src) leftImgEl.src = PLACEHOLDER_SRC; }
  if(rightImgEl){ rightImgEl.loading='lazy'; rightImgEl.decoding='async'; rightImgEl.crossOrigin='anonymous'; if(!rightImgEl.src) rightImgEl.src = PLACEHOLDER_SRC; }
  attachPosterErrorHandlers(); instrumentPosterLoads();

  // Hide the old textual choice buttons (we use posters instead)
  if(btnHigher) btnHigher.style.display = 'none';
  if(btnLower) btnLower.style.display = 'none';

  // Set posters/cards as clickable buttons
  if(leftCardEl){
    leftCardEl.setAttribute('role','button');
    leftCardEl.setAttribute('tabindex','0');
    leftCardEl.addEventListener('click', ()=> handlePosterChoice(false)); // clicking left => left is higher => guessHigher=false
    leftCardEl.addEventListener('keydown', (e)=> { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handlePosterChoice(false); } });
  }
  if(rightCardEl){
    rightCardEl.setAttribute('role','button');
    rightCardEl.setAttribute('tabindex','0');
    rightCardEl.addEventListener('click', ()=> handlePosterChoice(true)); // clicking right => right is higher => guessHigher=true
    rightCardEl.addEventListener('keydown', (e)=> { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handlePosterChoice(true); } });
  }

  startButton.addEventListener('click', handleStartClick);
  // original buttons still present but hidden — keep them wired in case you want to show them again
  if(btnHigher) btnHigher.addEventListener('click', ()=> handlePosterChoice(true));
  if(btnLower) btnLower.addEventListener('click', ()=> handlePosterChoice(false));
  restartButton.addEventListener('click', handleRestartClick);

  hideRatingsAndAction();
  if(sourceLabelEl) sourceLabelEl.style.display='none';

  // keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    const active = document.activeElement;
    if(active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) return;
    // left arrow or 'h' -> choose LEFT poster (left is higher)
    if(e.key === 'ArrowLeft' || e.key.toLowerCase() === 'h'){ if(leftCardEl && leftCardEl.style.pointerEvents !== 'none') leftCardEl.click(); }
    // right arrow or 'l' -> choose RIGHT poster (right is higher)
    else if(e.key === 'ArrowRight' || e.key.toLowerCase() === 'l'){ if(rightCardEl && rightCardEl.style.pointerEvents !== 'none') rightCardEl.click(); }
    else if(e.key === 'Enter'){ if(nextButton && nextButton.style.display !== 'none') nextButton.click(); else if(restartButton && gameOverSection.style.display !== 'none') restartButton.click(); }
  });
});
