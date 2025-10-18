// guesser-scripts.js
// Corona-Guesser full script (with DB-backed claim/reset for guesser_used)
// - Supabase client
// - fetch movie list + public URLs
// - dynamic zoomed mini previews (3x-6x by default)
// - smart autocomplete suggestions for answer input
// - timer, scoring, hints, result flow
// - prompt to save to 'guesser-leaderboard' after game ends
// - passes results to results.html via sessionStorage

// ---------------- Supabase setup (replace these values if needed) ----------------
const SUPABASE_URL = "https://vvknjdudbteivvqzglcv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2a25qZHVkYnRlaXZ2cXpnbGN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4MjEwODAsImV4cCI6MjA3MjM5NzA4MH0.RUabonop6t3H_KhXkm0UuvO_VlGJvCeNPSCYJ5KUNRU";
const supabase = (window.supabase && window.supabase.createClient) ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;
// ----------------------------------------------------------------------------------

// Movie data used by the game:
// Each entry in movieList will be [ title, imageName, length, year, starring, miniPublicUrl, slideshowPublicUrl ]
let movieList = [];

let guessedMovies = [];          // normalized titles guessed this session
let currentHint = 0;             // 0..3 (4 hints)
let currentMovie = [];           // array as above
let currentTime = 0;             // seconds left when answering
let wrongGuesses = 0;
let timerOn = true;
let roundNum = 1;
let totalPoints = 0;
let timerIntervalId = null;      // global interval id so we can clear it immediately

// DOM helpers
function $(id){ return document.getElementById(id); }
function norm(s){ return typeof s==='string' ? s.trim().toLowerCase() : ''; }

// ---------------- Helper: pick random item from array ----------------
function pickRandomFromArray(arr){ return arr && arr.length ? arr[Math.floor(Math.random() * arr.length)] : null; }

// ---------------- Helper: get first image value from array-or-string ----------------
function getFirstImageValue(imgField){
    if(Array.isArray(imgField)){
        return imgField.length > 0 ? (typeof imgField[0] === 'string' ? imgField[0].trim() : String(imgField[0])) : '';
    }
    if(typeof imgField === 'string') return imgField.trim();
    return '';
}

// ---------------- Helper: get random image value from array-or-string ----------------
function getRandomImageValue(imgField){
    if(Array.isArray(imgField) && imgField.length > 0){
        const idx = Math.floor(Math.random() * imgField.length);
        const v = imgField[idx];
        return (typeof v === 'string') ? v.trim() : (v === null || typeof v === 'undefined' ? '' : String(v));
    }
    if(typeof imgField === 'string') return imgField.trim();
    return '';
}

// ---------------- Supabase storage helpers ----------------
function getPublicImageUrlFromBucket(bucket, imagePath){
    if(!imagePath || !supabase) return null;
    try {
        const p = (typeof imagePath === 'string' && imagePath.startsWith('/')) ? imagePath.slice(1) : imagePath;
        const res = supabase.storage.from(bucket).getPublicUrl(p);
        // handle shapes { data: { publicUrl } } or { publicUrl } etc.
        if(res){
            if(res.data && (res.data.publicUrl || res.data.publicURL)) return res.data.publicUrl || res.data.publicURL;
            if(res.publicUrl || res.publicURL) return res.publicUrl || res.publicURL;
        }
    } catch(e){
        console.warn('getPublicImageUrlFromBucket error', bucket, imagePath, e);
    }
    return null;
}

// ---------------- Fetch movie list ----------------
async function fetchMovieListFromSupabase(){
    try {
        if(!supabase){
            console.warn('Supabase client not available; movieList will remain empty.');
            movieList = [];
            return;
        }

        // Query moviesList: we only need title, image, length, releaseYear, starring (and we filter by stars presence)
        const { data, error } = await supabase
            .from('moviesList')
            .select('title, image, length, releaseYear, starring')
            .not('stars', 'is', null)
            .neq('stars', 'None');

        if(error){
            console.error('Error fetching moviesList:', error);
            movieList = [];
            return;
        }

        const rows = Array.isArray(data) ? data : [];
        const built = [];

        for(const row of rows){
            const title = row.title || '';
            // image may be an array — grab a random element safely
            const imageName = getRandomImageValue(row.image) || '';
            const length = row.length || '';
            const year = row.releaseYear || '';
            const starring = row.starring || '';

            // Get mini image public URL from 'miniImages' (if available)
            let miniPublicUrl = null;
            try {
                const u = getPublicImageUrlFromBucket('miniImages', imageName);
                if(u) miniPublicUrl = u;
            } catch(e){ console.warn('mini public url error', e); }

            // Get slideshow (full) public URL from 'slideshowImages'
            let slideshowPublicUrl = null;
            try {
                const u2 = getPublicImageUrlFromBucket('slideshowImages', imageName);
                if(u2) slideshowPublicUrl = u2;
            } catch(e){ console.warn('slideshow public url error', e); }

            built.push([ title, imageName, length, year, starring, miniPublicUrl, slideshowPublicUrl ]);
        }

        movieList = built;
    } catch (err) {
        console.error('Unexpected error fetching movie list:', err);
        movieList = [];
    }
}

// ---------------- Supabase claim/reset helpers ----------------

// Query candidate rows where guesser_used = false (and stars present)
async function queryUnusedCandidates(){
    if(!supabase) return { data: [], error: new Error('Supabase unavailable') };
    try {
        const { data, error } = await supabase
            .from('moviesList')
            .select('*')
            .eq('guesser_used', false)
            .not('stars', 'is', null)
            .neq('stars', 'None');
        if(error) {
            console.warn('queryUnusedCandidates error', error);
            return { data: [], error };
        }
        return { data: Array.isArray(data) ? data : [], error: null };
    } catch(e){
        console.error('queryUnusedCandidates unexpected', e);
        return { data: [], error: e };
    }
}

// Reset guesser_used = false for eligible rows
async function resetAllGuesserUsed(){
    if(!supabase) return { data: null, error: new Error('Supabase unavailable') };
    try {
        const { data, error } = await supabase
            .from('moviesList')
            .update({ guesser_used: false })
            .not('stars', 'is', null)
            .neq('stars', 'None');
        if(error){
            console.warn('resetAllGuesserUsed error', error);
            return { data: null, error };
        }
        return { data, error: null };
    } catch(e){
        console.error('resetAllGuesserUsed unexpected', e);
        return { data: null, error: e };
    }
}

// Pick a random unused candidate and attempt to atomically mark it as used (guesser_used = true).
// Returns the DB row (authoritative) when marking succeeds, otherwise returns a best-effort row or null.
async function pickAndClaimUnusedMovie(){
    if(!supabase) return null;

    try {
        // 1) Query unused candidates
        let q = await queryUnusedCandidates();
        if(q.error){
            console.error('Error querying unused candidates', q.error);
            return null;
        }
        let candidates = q.data || [];

        // 2) If none found, reset all then requery
        if(!candidates || candidates.length === 0){
            console.info('No unused candidates found — resetting guesser_used flags and retrying.');
            const resetRes = await resetAllGuesserUsed();
            if(resetRes && resetRes.error){
                console.error('Failed to reset guesser_used flags — aborting pick.', resetRes.error);
                return null;
            }
            q = await queryUnusedCandidates();
            if(q.error){
                console.error('Error querying unused candidates after reset', q.error);
                return null;
            }
            candidates = q.data || [];
            if(!candidates || candidates.length === 0){
                console.warn('Still no candidates after reset — nothing to pick.');
                return null;
            }
        }

        // Choose a random candidate
        const candidate = pickRandomFromArray(candidates);
        if(!candidate) return null;

        // Prepare image-first string (safe whether candidate.image is array or string)
        const imageFirst = getFirstImageValue(candidate.image) || null;

        console.debug('Attempting to claim candidate', {
            title: candidate.title,
            order: candidate.order,
            imageFirst,
            isArrayImage: Array.isArray(candidate.image)
        });

        // Try to update the chosen row to set guesser_used = true.
        // Prefer title + .contains('image',[imageFirst]) (works for text[] image column),
        // fall back to title-only .eq('title', ...) if needed.
        try {
            let updated = null;

            if(imageFirst){
                // try contains (array) first
                try {
                    const { data: udata, error: uerr } = await supabase
                        .from('moviesList')
                        .update({ guesser_used: true })
                        .eq('title', candidate.title)
                        .contains('image', [imageFirst])
                        .select('*')
                        .limit(1);
                    if(uerr) throw uerr;
                    if(Array.isArray(udata) && udata.length > 0){
                        updated = udata[0];
                        console.debug('Claim succeeded via title + image contains', updated);
                        return updated;
                    }
                } catch (errContain) {
                    // contains may fail if schema differs — swallow and try fallback
                    console.debug('contains() update failed, will try title-only update. Err:', errContain && errContain.message ? errContain.message : errContain);
                }
            }

            // Fallback: update by title only
            try {
                const { data: udata2, error: uerr2 } = await supabase
                    .from('moviesList')
                    .update({ guesser_used: true })
                    .eq('title', candidate.title)
                    .select('*')
                    .limit(1);
                if(uerr2) throw uerr2;
                if(Array.isArray(udata2) && udata2.length > 0){
                    updated = udata2[0];
                    console.debug('Claim succeeded via title-only', updated);
                    return updated;
                }
            } catch (errTitle) {
                console.warn('title-only update failed', errTitle);
            }

            // If update didn’t return an authoritative row (race condition?), return the candidate as best-effort (unmarked)
            console.warn('Unable to claim (no updated row returned). Returning candidate without DB mark.', { title: candidate.title });
            return candidate;
        } catch(e){
            console.error('pickAndClaimUnusedMovie: update attempt unexpected error', e);
            return candidate;
        }
    } catch(e){
        console.error('pickAndClaimUnusedMovie unexpected error', e);
        return null;
    }
}

// ---------------- Autocomplete suggestion utilities ----------------
function normalizeForSearch(s){
  if(!s && s !== 0) return '';
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
}

function findSuggestions(query, limit = 10){
  const q = normalizeForSearch(query || '');
  if(!q) return [];
  const tokens = q.split(/\s+/).filter(Boolean);
  if(tokens.length === 0) return [];

  const matches = [];
  for(const mv of movieList){
    const title = mv && mv[0] ? mv[0] : '';
    const titleNorm = normalizeForSearch(title);
    let ok = true;
    let score = 0;
    for(const t of tokens){
      const idx = titleNorm.indexOf(t);
      if(idx === -1){ ok = false; break; }
      score += (idx >= 0 ? idx : 1000);
    }
    if(ok) matches.push({ title, titleNorm, score });
  }

  matches.sort((a,b) => {
    if(a.score !== b.score) return a.score - b.score;
    return a.title.localeCompare(b.title);
  });
  return matches.slice(0, limit).map(m => m.title);
}

function renderSuggestions(suggestions){
  const container = $('answerSuggestions');
  if(!container) return;
  container.innerHTML = '';
  if(!suggestions || suggestions.length === 0){
    container.style.display = 'none';
    container.setAttribute('aria-hidden','true');
    return;
  }
  suggestions.forEach((t, i) => {
    const div = document.createElement('div');
    div.className = 'suggestion';
    div.textContent = t;
    div.setAttribute('role','option');
    div.setAttribute('data-index', String(i));
    div.setAttribute('aria-selected','false');
    div.addEventListener('click', () => {
      const input = $('answer');
      if(!input) return;
      input.value = t;
      renderSuggestions([]);
      input.focus();
    });
    container.appendChild(div);
  });
  container.style.display = 'block';
  container.setAttribute('aria-hidden','false');
}

function setupAnswerAutocomplete(){
  const input = $('answer');
  const container = $('answerSuggestions');
  if(!input || !container) return;

  let suggestions = [];
  let activeIndex = -1;
  let debounceId = null;

  function updateSuggestionsFromInput(){
    const q = input.value || '';
    suggestions = findSuggestions(q, 10);
    activeIndex = -1;
    renderSuggestions(suggestions);
  }

  input.addEventListener('input', () => {
    if(debounceId) clearTimeout(debounceId);
    debounceId = setTimeout(() => {
      updateSuggestionsFromInput();
      debounceId = null;
    }, 150);
  });

  input.addEventListener('keydown', (e) => {
    const items = Array.from(container.querySelectorAll('.suggestion'));
    if(items.length === 0) return;

    if(e.key === 'ArrowDown'){
      e.preventDefault();
      activeIndex = (activeIndex + 1) % items.length;
      items.forEach((it, idx) => it.setAttribute('aria-selected', idx === activeIndex ? 'true' : 'false'));
      items[activeIndex].scrollIntoView({ block: 'nearest' });
    } else if(e.key === 'ArrowUp'){
      e.preventDefault();
      activeIndex = (activeIndex - 1 + items.length) % items.length;
      items.forEach((it, idx) => it.setAttribute('aria-selected', idx === activeIndex ? 'true' : 'false'));
      items[activeIndex].scrollIntoView({ block: 'nearest' });
    } else if(e.key === 'Enter'){
      if(activeIndex >= 0 && items[activeIndex]){
        e.preventDefault();
        items[activeIndex].click();
      }
    } else if(e.key === 'Escape'){
      renderSuggestions([]);
    }
  });

  document.addEventListener('click', (ev) => {
    if(!container || !input) return;
    if(ev.target === input) return;
    if(container.contains(ev.target)) return;
    renderSuggestions([]);
  });
}

// ---------------- Mini preview (dynamic zoom) ----------------
function safeNormalizeTitle(t){ return typeof t==='string' ? t.trim().toLowerCase() : ''; }

async function loadMiniImg() {
    // guard: ensure we have either supabase or a local movieList
    if ((!supabase) && (!Array.isArray(movieList) || movieList.length === 0)) {
        alert("No movies available to play.");
        return;
    }

    // Try DB-backed claim first (if supabase available)
    let selectedMovieRow = null;
    if(supabase){
        try {
            const claimedRow = await pickAndClaimUnusedMovie();
            if(claimedRow){
                // claimedRow is a DB object (may be fully authoritative)
                selectedMovieRow = claimedRow;
                console.debug('Using DB-claimed row for game:', {
                    title: selectedMovieRow.title,
                    imagePreviewType: Array.isArray(selectedMovieRow.image) ? 'array' : typeof selectedMovieRow.image
                });
            } else {
                console.debug('No claimed DB row (none available or error). Falling back to local movieList.');
            }
        } catch(e){
            console.warn('Error attempting DB claim; falling back to local list', e);
            selectedMovieRow = null;
        }
    }

    // Fallback: pick local random row from previously loaded movieList array (ensure not reused same session)
    if(!selectedMovieRow){
        if (!Array.isArray(movieList) || movieList.length === 0) {
            await fetchMovieListFromSupabase(); // try again to populate local list
        }

        // If all movies are used, reset guessed list to allow replay locally
        if (Array.isArray(movieList) && guessedMovies.length >= movieList.length) guessedMovies = [];

        let attempts = 0;
        let found = null;
        if(Array.isArray(movieList) && movieList.length > 0){
            do {
                const idx = Math.floor(Math.random() * movieList.length);
                const m = movieList[idx];
                if(!m) break;
                const title = m[0] || '';
                if(!guessedMovies.includes(safeNormalizeTitle(title))){
                    // build a pseudo-row similar to DB row so the rest of the logic can treat uniformly
                    found = {
                        title: title,
                        image: m[1] || '',
                        length: m[2] || '',
                        releaseYear: m[3] || '',
                        starring: m[4] || '',
                        miniPublicUrl: m[5] || null,
                        slideshowPublicUrl: m[6] || null
                    };
                    break;
                }
                attempts++;
                if(attempts > movieList.length + 5) break;
            } while(true);
        }

        if(found){
            selectedMovieRow = found;
            console.debug('Using local fallback selectedMovieRow:', { title: found.title });
        } else {
            // final fallback: pick first in movieList if nothing else
            if(Array.isArray(movieList) && movieList.length > 0){
                const m = movieList[0];
                selectedMovieRow = { title: m[0] || '', image: m[1] || '', length: m[2] || '', releaseYear: m[3] || '', starring: m[4] || '', miniPublicUrl: m[5] || null, slideshowPublicUrl: m[6] || null };
                console.debug('Fallback to first movieList entry', { title: selectedMovieRow.title });
            }
        }
    }

    if(!selectedMovieRow){
        alert("No movie could be selected.");
        return;
    }

    // Normalize fields from either DB row object or local pseudo-row
    const title = selectedMovieRow.title || '';
    const rawImageField = selectedMovieRow.image || selectedMovieRow.imagePath || selectedMovieRow.image_name || selectedMovieRow.imageName || selectedMovieRow.image || '';
    // choose a random image entry from the array (or string)
    const imageName = getRandomImageValue(rawImageField) || '';
    // compute mini/slideshow public URLs if row didn't already provide them
    let miniPublicUrl = selectedMovieRow.miniPublicUrl || selectedMovieRow.mini_public_url || null;
    let slideshowPublicUrl = selectedMovieRow.slideshowPublicUrl || selectedMovieRow.slideshow_public_url || null;

    // If the row doesn't include public URLs, build them from the chosen imageName using bucket helper
    if(!miniPublicUrl && imageName){
        try {
            const u = getPublicImageUrlFromBucket('miniImages', imageName);
            if(u) miniPublicUrl = u;
        } catch(e){ console.debug('mini public url build error', e); }
    }
    if(!slideshowPublicUrl && imageName){
        try {
            const u2 = getPublicImageUrlFromBucket('slideshowImages', imageName);
            if(u2) slideshowPublicUrl = u2;
        } catch(e){ console.debug('slideshow public url build error', e); }
    }

    // Keep a copy for answer checking & hints
    // Format currentMovie the same as earlier: [ title, imageName, length, year, starring, miniPublicUrl, slideshowPublicUrl ]
    currentMovie = [
        title,
        imageName,
        selectedMovieRow.length || '',
        selectedMovieRow.releaseYear || selectedMovieRow.release_year || '',
        selectedMovieRow.starring || '',
        miniPublicUrl,
        slideshowPublicUrl
    ];

    const gameImageContainer = $('gameImageContainer');
    if(!gameImageContainer) return;
    gameImageContainer.innerHTML = "";

    // prefer slideshowPublicUrl (full image) as the source for zooming; fallback to miniPublicUrl or site-root path
    let fullImageUrl = slideshowPublicUrl || miniPublicUrl || null;

    // If still no public URL, fall back to a site-root path (avoid fragile relative paths)
    if(!fullImageUrl && imageName){
        fullImageUrl = `/assets/images/slideshow/${encodeURIComponent(imageName)}`;
    }

    // Debug: show what we're about to try loading
    console.debug('Selected movie debug', {
        title,
        imageName,
        rawImageFieldPreview: (Array.isArray(rawImageField) ? `Array(${rawImageField.length})` : typeof rawImageField),
        miniPublicUrl,
        slideshowPublicUrl,
        fullImageUrl
    });

    // placeholder data URI (guaranteed)
    const PLACEHOLDER_DATA_URI = 'data:image/svg+xml;utf8,' + encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
         <rect width="100%" height="100%" fill="#111"/>
         <text x="50%" y="50%" fill="#999" font-size="18" font-family="sans-serif" dominant-baseline="middle" text-anchor="middle">Preview</text>
       </svg>`
    );

    // Test that we can load the image URL; fallback gracefully
    const tester = new Image();
    tester.crossOrigin = 'anonymous';
    let gotUrl = null;
    const TIMEOUT_MS = 3000;
    let timeoutId = setTimeout(() => {
        try { tester.src = ''; } catch(e) {}
        if(!gotUrl){
            console.warn('Image load timed out for', fullImageUrl);
            insertZoomedDiv(PLACEHOLDER_DATA_URI);
        }
    }, TIMEOUT_MS);

    tester.onload = () => {
        clearTimeout(timeoutId);
        gotUrl = fullImageUrl;
        console.debug('Image loaded OK:', fullImageUrl);
        insertZoomedDiv(gotUrl);
    };
    tester.onerror = (ev) => {
        clearTimeout(timeoutId);
        console.warn('Image loader error for', fullImageUrl, ev);
        // try miniPublicUrl if different
        if(fullImageUrl && miniPublicUrl && miniPublicUrl !== fullImageUrl){
            const tester2 = new Image();
            tester2.crossOrigin = 'anonymous';
            let t2timeout = setTimeout(() => { try { tester2.src = ''; } catch(e){} insertZoomedDiv(PLACEHOLDER_DATA_URI); }, TIMEOUT_MS);
            tester2.onload = () => { clearTimeout(t2timeout); insertZoomedDiv(miniPublicUrl); };
            tester2.onerror = () => { clearTimeout(t2timeout); insertZoomedDiv(PLACEHOLDER_DATA_URI); };
            try { tester2.src = miniPublicUrl; } catch(e){ clearTimeout(t2timeout); insertZoomedDiv(PLACEHOLDER_DATA_URI); }
            return;
        }
        insertZoomedDiv(PLACEHOLDER_DATA_URI);
    };

    try { if(fullImageUrl) tester.src = fullImageUrl; else { clearTimeout(timeoutId); insertZoomedDiv(PLACEHOLDER_DATA_URI); } } catch(e){ clearTimeout(timeoutId); console.warn('Tester error', e); insertZoomedDiv(PLACEHOLDER_DATA_URI); }

    // helper inserts the zoomed DIV with random crop
    function insertZoomedDiv(imageUrl){
        const MIN_ZOOM = 3.0;   // 3x minimum
        const MAX_ZOOM = 6.0;   // 6x maximum
        const zoom = MIN_ZOOM + Math.random() * (MAX_ZOOM - MIN_ZOOM);

        // choose centered percentages but keep wide range
        const posX = Math.floor(Math.random() * 101); // 0..100
        const posY = Math.floor(Math.random() * 101); // 0..100

        const miniDiv = document.createElement('div');
        miniDiv.className = 'miniGameImage zoomed';
        miniDiv.style.backgroundImage = `url("${imageUrl}")`;
        miniDiv.style.backgroundSize = `${zoom * 100}% auto`;
        miniDiv.style.backgroundPosition = `${posX}% ${posY}%`;
        miniDiv.style.backgroundRepeat = 'no-repeat';
        // keep aria-label for accessibility but DO NOT set title (that creates tooltip on hover)
        miniDiv.setAttribute('aria-label', `Zoomed preview`);
        miniDiv.removeAttribute('title');

        try { miniDiv.dataset.debug = JSON.stringify({ zoom: Number(zoom.toFixed(2)), posX, posY, src: imageUrl }); } catch(e){}

        gameImageContainer.appendChild(miniDiv);

        // record as used in this session to avoid immediate repeats locally
        guessedMovies.push(safeNormalizeTitle(currentMovie[0]));
    }
}

// ---------------- Hints logic ----------------
async function getHint() {
    if (currentHint < 4) {
        switch(currentHint) {
            case 0:
                const h1 = $('hint1');
                if(h1) h1.style.display = "block";
                const h1p = document.querySelector("#hint1 p");
                if(h1p) h1p.textContent = currentMovie[2] || '';
                break;
            case 1:
                const h2 = $('hint2');
                if(h2) h2.style.display = "block";
                const h2p = document.querySelector("#hint2 p");
                if(h2p) h2p.textContent = currentMovie[3] || '';
                break;
            case 2:
                const h3 = $('hint3');
                if(h3) h3.style.display = "block";
                const h3p = document.querySelector("#hint3 p");
                if(h3p) h3p.textContent = currentMovie[4] || '';
                break;
            case 3:
                const h4 = $('hint4');
                if(h4) h4.style.display = "block";
                const gameImageContainer = $('gameImageContainer');
                if(gameImageContainer){
                    gameImageContainer.innerHTML = "";
                    const fullImg = document.createElement("img");
                    const imageName = currentMovie[1] || '';
                    // try slideshowPublicUrl first
                    let fullPublicUrl = currentMovie[6] || null;
                    if(!fullPublicUrl && currentMovie[5]) fullPublicUrl = currentMovie[5]; // fall back to miniPublicUrl
                    if(!fullPublicUrl && imageName) fullPublicUrl = `/assets/images/slideshow/${encodeURIComponent(imageName)}`;
                    fullImg.className = "fullGameImage";
                    fullImg.alt = `Full ${imageName.split('.')[0] || 'image'} Image`;
                    // ensure no tooltip appears on hover
                    fullImg.title = '';
                    fullImg.crossOrigin = 'anonymous';
                    fullImg.src = fullPublicUrl;
                    gameImageContainer.appendChild(fullImg);
                }
                break;
        }
        currentHint++;
    } else {
        alert("All the hints are used!");
    }
}

// ---------------- Timer & scoring ----------------
// 3 minute time limit (180 seconds)
function startTimer() {
    const timerElement = document.getElementById("timer") && document.getElementById("timer").querySelector("p");
    if(!timerElement) return;

    // clear any existing interval
    if (timerIntervalId) {
        clearInterval(timerIntervalId);
        timerIntervalId = null;
    }

    let timeRemaining = 180; // 3 minutes
    currentTime = timeRemaining;
    timerOn = true;

    timerElement.textContent = `${Math.floor(timeRemaining/60)}:${String(timeRemaining%60).padStart(2,'0')} left`;

    timerIntervalId = setInterval(() => {
        let minutes = Math.floor(timeRemaining / 60);
        let seconds = timeRemaining % 60;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        timerElement.textContent = `${minutes}:${seconds} left`;

        if (timeRemaining <= 0) {
            clearInterval(timerIntervalId);
            timerIntervalId = null;
            timerElement.textContent = "Time's up!";
            alert("You ran out of time! The answer was " + (currentMovie[0] || 'unknown') + "! Click OK to move on to the next round!");
            currentTime = 0;
            timerOn = false;
            // proceed to reset for next round
            resetPage();
        } else if (timerOn === false) {
            clearInterval(timerIntervalId);
            timerIntervalId = null;
            if(timerElement) timerElement.textContent = ``;
        }
        currentTime = timeRemaining;
        timeRemaining--;
    }, 1000);
}

// Reworked scoring:
// - base points scale with remaining time (scaled to a maximum around 135)
// - hint penalty: SMALLER penalty per hint (so it's harder to reach 0)
// - wrong guess penalty: SMALLER penalty per wrong guess (so it's harder to reach 0)
// - final points never negative

function calculatePoints(){
    // If no time left, zero points
    if(currentTime <= 0) return 0;

    // Base scaled: map currentTime (0..180) to approx 0..135
    const BASE_SCALE = 0.75; // 180 * 0.75 = 135 max
    const basePoints = Math.round(currentTime * BASE_SCALE);

    // ====== ADJUSTED PENALTIES (reduced so players rarely hit 0) ======
    const hintPenaltyPer = 12;    // previously 30 -> reduced to 12
    const wrongPenaltyPer = 12;   // previously 40 -> reduced to 12
    const wrongPenaltyCap = 72;   // previously 120 -> reduced cap
    // =================================================================

    const hintPenalty = currentHint * hintPenaltyPer;
    const wrongPenalty = Math.min(wrongGuesses * wrongPenaltyPer, wrongPenaltyCap);

    const raw = basePoints - hintPenalty - wrongPenalty;
    return Math.max(0, Math.floor(raw));
}

// ---------------- Answer checking ----------------
function checkAnswer(){
    const inputEl = $('answer');
    if(!inputEl) return;
    const submittedAnswer = inputEl.value.trim();
    const correctAnswer = currentMovie[0] || '';
    const correctAnswerSection = $('correctAnswer');
    if(!correctAnswerSection) return;

    // remove previous
    const previousResult = correctAnswerSection.querySelector('.result');
    if(previousResult) previousResult.remove();

    if (submittedAnswer.toUpperCase() === correctAnswer.toUpperCase()) {
        // stop timer immediately
        timerOn = false;
        if (timerIntervalId) {
            clearInterval(timerIntervalId);
            timerIntervalId = null;
        }

        const points = calculatePoints();
        totalPoints += points;

        const resultContainer = document.createElement('div');
        resultContainer.className = 'result';

        const successMessage = document.createElement('h3');
        successMessage.textContent = `Correct! You earned ${points} points!`;
        resultContainer.appendChild(successMessage);

        const nextButton = document.createElement('button');
        nextButton.textContent = "Next";
        nextButton.className = 'gameButton';
        nextButton.onclick = resetPage;
        resultContainer.appendChild(nextButton);

        correctAnswerSection.appendChild(resultContainer);
    } else {
        wrongGuesses++;
        alert("Incorrect! Check your spelling & try again!");
    }
}

// ---------------- Reset / Next round / Endgame ----------------
function resetPage() {
    // clear interval if still running
    if (timerIntervalId) {
        clearInterval(timerIntervalId);
        timerIntervalId = null;
    }

    // hide hints
    for (let i = 1; i <= 4; i++) {
        const hint = $('hint' + i);
        if(hint) { hint.style.display = "none"; if(hint.querySelector("p")) hint.querySelector("p").textContent = ""; }
    }

    const correctAnswerSection = $('correctAnswer');
    if(correctAnswerSection) correctAnswerSection.innerHTML = '';

    const gameImageContainer = $('gameImageContainer');
    if(gameImageContainer) gameImageContainer.innerHTML = '';

    const answerInput = $('answer');
    if(answerInput) answerInput.value = '';

    currentHint = 0;
    timerOn = true;
    wrongGuesses = 0;

    if(roundNum === 5) {
        // End of session: ask to save score then go to results
        // Determine selected player if present
        const playerSelectEl = $('playerSelect');
        const playerName = playerSelectEl ? (playerSelectEl.value || '') : (sessionStorage.getItem('guesserPlayerName') || '');

        // show save prompt then redirect to results
        showGuesserSavePrompt(playerName, totalPoints).then(() => {
            // after user chooses (saved or not), pass results to results page via sessionStorage and navigate
            sessionStorage.setItem('guesser_last_score', String(totalPoints));
            sessionStorage.setItem('guesser_last_player', playerName || '');
            // also add a flag so results.html can show the game-bottom image if desired
            sessionStorage.setItem('guesser_show_game_bottom', '1');
            window.location.href = "results.html";
        }).catch((err) => {
            console.error('Save prompt flow error', err);
            // still go to results
            sessionStorage.setItem('guesser_last_score', String(totalPoints));
            sessionStorage.setItem('guesser_last_player', playerName || '');
            sessionStorage.setItem('guesser_show_game_bottom', '1');
            window.location.href = "results.html";
        });
    } else {
        roundNum++;
        // start next round
        loadMiniImg();
        startTimer();
    }
}

// ---------------- Leaderboard submission helper (guesser) ----------------
async function submitScoreToGuesserLeaderboard(player, score){
    if(!supabase){
        console.warn('Supabase client unavailable — cannot submit score.');
        return { data: null, error: new Error('Supabase client unavailable') };
    }
    if(!player){
        console.warn('No player selected — skipping submit.');
        return { data: null, error: new Error('No player selected') };
    }
    try {
        const payload = { player: player, score: Math.floor(Number(score) || 0) };
        const { data, error } = await supabase
            .from('guesser-leaderboard')
            .insert([payload])
            .select();
        return { data, error };
    } catch (err) {
        console.error('submitScoreToGuesserLeaderboard unexpected error', err);
        return { data: null, error: err };
    }
}

// ---------------- Save prompt modal for guesser ----------------
function showGuesserSavePrompt(playerName, score){
    // returns a Promise that resolves when the user finishes the flow (save or don't save or cancel)
    return new Promise((resolve, reject) => {
        // don't create duplicate overlay
        if(document.getElementById('guesserSavePromptOverlay')) {
            resolve();
            return;
        }

        const overlay = document.createElement('div');
        overlay.id = 'guesserSavePromptOverlay';
        overlay.style.position = 'fixed';
        overlay.style.left = '0';
        overlay.style.top = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.background = 'rgba(0,0,0,0.7)';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.zIndex = '9999';

        const dialog = document.createElement('div');
        dialog.style.background = '#F2F5EA';
        dialog.style.color = '#131313';
        dialog.style.padding = '20px';
        dialog.style.borderRadius = '12px';
        dialog.style.width = 'min(580px, 94%)';
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
        statusLine.id = 'guesserSavePromptStatus';
        statusLine.style.marginTop = '10px';
        statusLine.style.fontSize = '0.95rem';
        dialog.appendChild(btnRow);
        dialog.appendChild(statusLine);

        overlay.appendChild(dialog);
        document.body.appendChild(overlay);

        cancelBtn.addEventListener('click', () => {
            overlay.remove();
            resolve(); // resolve (no save) and continue to results
        });

        skipBtn.addEventListener('click', () => {
            overlay.remove();
            // mark in-page status
            const statusEl = $('submitStatus');
            if(statusEl) statusEl.innerHTML = `<span style="color:#ffd3d3">Score not saved.</span>`;
            resolve();
        });

        saveBtn.addEventListener('click', async () => {
            saveBtn.disabled = true; skipBtn.disabled = true; cancelBtn.disabled = true;
            statusLine.textContent = 'Submitting score...';
            try {
                const { data, error } = await submitScoreToGuesserLeaderboard(playerName, score);
                if(error){
                    console.warn('Leaderboard insert error', error);
                    statusLine.textContent = `Failed to submit: ${error.message || String(error)} — try again or choose Don't save.`;
                    saveBtn.disabled = false; skipBtn.disabled = false; cancelBtn.disabled = false;
                } else {
                    const insertedId = (Array.isArray(data) && data[0] && data[0].id) ? data[0].id : null;
                    const msg = insertedId ? `Score submitted (id ${insertedId}).` : 'Score submitted.';
                    const statusEl = $('submitStatus');
                    if(statusEl) statusEl.innerHTML = `<span style="color:#c8ffcf">${msg}</span>`;
                    setTimeout(() => { overlay.remove(); resolve(); }, 700);
                }
            } catch (err) {
                console.error('Error while submitting score', err);
                statusLine.textContent = 'Unexpected submission error.';
                saveBtn.disabled = false; skipBtn.disabled = false; cancelBtn.disabled = false;
            }
        });

        saveBtn.focus();
    });
}

// ---------------- UI helpers ----------------
// call this once during initialization
function addLeaderboardLinksIfNeeded() {
  // helper to insert a link into a container if one doesn't already exist
  function ensureLink(containerId, linkId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    // if any anchor to leaderboard exists inside this container, do nothing
    if (container.querySelector('a[href="leaderboard.html"]')) return;

    const a = document.createElement('a');
    a.id = linkId;
    a.href = 'leaderboard.html';
    a.textContent = 'View Leaderboard';
    a.className = 'gameButton';
    a.style.display = 'inline-block';
    a.style.marginTop = '8px';
    container.appendChild(a);
  }

  // add to intro/instructions (if present)
  ensureLink('instructions', 'guesserLeaderboardLink');

  // add to results area (if present)
  ensureLink('results', 'guesserLeaderboardLinkResults');
}

// ---------------- Start / Restart handlers ----------------
function startGame(){
    const gameContainer = $('gameContainer');
    const startBtn = $('startButton');
    const instructions = $('instructions');
    const playerSelectEl = $('playerSelect');
    // require selection if playerSelect exists
    if(playerSelectEl && !playerSelectEl.value){
        alert('Please select your name before starting the game.');
        return;
    }
    // hide instructions & name selection to prevent mid-game changes
    if(instructions) instructions.style.display = 'none';
    // if there is a container that holds playerSelect (id playerSelectContainer) hide it too
    const playerContainer = $('playerSelectContainer');
    if(playerContainer) playerContainer.style.display = 'none';

    if(gameContainer) gameContainer.style.display = 'flex';
    if(startBtn) startBtn.style.display = 'none';

    // persist selected player name to sessionStorage so results page can read it later
    if(playerSelectEl && playerSelectEl.value){
        sessionStorage.setItem('guesserPlayerName', playerSelectEl.value);
    }

    // start game
    startTimer();
    loadMiniImg();
}

function handleRestart(){
    // re-enable UI
    const gameContainer = $('gameContainer');
    const instructions = $('instructions');
    const startBtn = $('startButton');
    if(gameContainer) gameContainer.style.display = 'none';
    if(instructions) instructions.style.display = '';
    if(startBtn) startBtn.style.display = '';
    // re-enable select container
    const playerContainer = $('playerSelectContainer');
    if(playerContainer) playerContainer.style.display = '';
    // reset state
    guessedMovies = [];
    currentHint = 0;
    currentMovie = [];
    currentTime = 0;
    wrongGuesses = 0;
    timerOn = true;
    roundNum = 1;
    totalPoints = 0;
    // clear UI spots
    const gameImageContainer = $('gameImageContainer');
    if(gameImageContainer) gameImageContainer.innerHTML = '';
    const correctAnswerSection = $('correctAnswer');
    if(correctAnswerSection) correctAnswerSection.innerHTML = '';
    // re-enable startButton depending on playerSelect value (if it exists)
    const playerSelectEl = $('playerSelect');
    if(playerSelectEl && startButton) startButton.disabled = !playerSelectEl.value;
}

// ---------------- Results page population ----------------
function populateResultsPageIfPresent(){
    const resultsSection = $('results');
    if(!resultsSection) return;
    const lastScore = sessionStorage.getItem('guesser_last_score') || '';
    const lastPlayer = sessionStorage.getItem('guesser_last_player') || '';
    const showBottom = sessionStorage.getItem('guesser_show_game_bottom') === '1';
    // display message
    resultsSection.innerHTML = `<h2>You Did It!</h2>
      <p>Game Done!</p>
      <p style="color:#F2F5EA; font-size:20px;">${lastPlayer ? (lastPlayer + ' — ') : ''}Score: ${lastScore}</p>
      <div style="display:flex; gap:12px; justify-content:center; margin-top:10px; flex-wrap:wrap;">
         <a href="index.html" class="gameButton">Play Again</a>
         <a href="leaderboard.html" class="gameButton">View Leaderboard</a>
      </div>
    `;
    if(showBottom){
        const img = document.createElement('img');
        img.src = '/assets/images/game-bottom.png';
        img.id = 'gameBottomImg';
        img.alt = 'Bottom of Page Image';
        img.style.marginTop = '18px';
        img.style.width = '80%';
        resultsSection.appendChild(img);
    }
}

// ---------------- Initialization ----------------
(async function init(){
    // fetch movies first
    await fetchMovieListFromSupabase();

    // Add leaderboard links to start/results if possible
    addLeaderboardLinksIfNeeded();

    // Setup autocomplete (will use movieList)
    setupAnswerAutocomplete();

    // Wire up buttons & inputs
    const startBtn = $('startButton');

    // ---- HINT BUTTON: try multiple selectors so we actually find the hint button ----
    const hintButton = $('hintButton') // prefer explicit id
        || document.querySelector('#instructions button[data-action="hint"]')
        || document.querySelector('#instructions button[data-action="getHint"]')
        || document.querySelector('#instructions button[onclick*="getHint"]')
        || document.querySelector('button[data-action="getHint"]')
        || document.querySelector('button[id*="hint"]')
        || document.querySelector('button[class*="hint"]')
        || null;

    if (hintButton) {
      hintButton.addEventListener('click', (e) => {
        if(e && typeof e.preventDefault === 'function') e.preventDefault();
        try { getHint(); } catch (err) { console.error('getHint error', err); }
      });
    } else {
      // helpful debug info for you if button not found
      console.warn('Hint button not found during init. Add id="hintButton" or data-action="hint" to your hint button in the DOM.');
    }

    // playerSelect behavior: enable/disable start button if playerSelect present
    const playerSelectEl = $('playerSelect');
    if(playerSelectEl && startBtn){
        // ensure start disabled until a valid name chosen
        startBtn.disabled = !playerSelectEl.value;
        playerSelectEl.addEventListener('change', () => {
            startBtn.disabled = !playerSelectEl.value;
        });
    }

    if(startBtn) {
        startBtn.addEventListener('click', startGame);
    }

    // submit button
    const submitBtn = $('submit');
    if(submitBtn) submitBtn.addEventListener('click', (e) => { e.preventDefault(); checkAnswer(); });

    // results page population if loaded
    populateResultsPageIfPresent();

    // add toggle button for list if still present previously (hide old displayMovieNames)
    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = 'Toggle Movie List';
    toggleBtn.style.cursor = 'pointer';
    toggleBtn.className = 'gameButton';
    toggleBtn.style.display = 'none'; // hide by default (user didn't want the list shown)
    // if the old nameOptions exist, insert toggle to allow dev to show if desired (kept hidden)
    const nameOptions = $('nameOptions');
    if(nameOptions) {
        nameOptions.before(toggleBtn);
        toggleBtn.addEventListener('click', () => {
            if(nameOptions.style.display === 'none' || nameOptions.style.display === '') {
                // show as block
                nameOptions.style.display = 'block';
            } else {
                nameOptions.style.display = 'none';
            }
        });
    }

    // Restart button wiring (if results page has a Play Again button it links back to index.html)
    const restartBtn = $('startButton'); // reuse
    // nothing more needed here

})();
