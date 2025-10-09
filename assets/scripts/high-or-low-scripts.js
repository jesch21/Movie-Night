// high-or-low-scripts.js (UPDATED)
// IMDB-only "Higher or Lower" with posters pulled from Supabase storage (slideshowImages bucket)

// ---------------- Supabase init (from your provided keys) ----------------
const SUPABASE_URL = "https://vvknjdudbteivvqzglcv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2a25qZHVkYnRlaXZ2cXpnbGN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4MjEwODAsImV4cCI6MjA3MjM5NzA4MH0.RUabonop6t3H_KhXkm0UuvO_VlGJvCeNPSCYJ5KUNRU";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ---------------- Game state ----------------
let moviesPool = [];      // array of movie objects with non-null imdb-rating
let leftMovie = null;     // currently left movie object
let rightMovie = null;    // currently right movie object
let score = 0;

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

// New DOM elements for the feature
const ratingsActionRow = document.getElementById('ratingsActionRow'); // container for ratings + action
const leftRatingDisplay = document.getElementById('leftRatingDisplay');
const rightRatingDisplay = document.getElementById('rightRatingDisplay');
const nextButton = document.getElementById('nextButton');

// placeholder image path (used when no image found)
const PLACEHOLDER_SRC = "../assets/images/poster-placeholder.png";

// ---------------- Utility functions ----------------

/**
 * fetchMoviesFromSupabase
 * - Queries the moviesList table (quotes "order" & "imdb-rating")
 * - Filters out rows with null or missing imdb-rating
 */
async function fetchMoviesFromSupabase() {
    try {
        const { data, error } = await supabase
            .from('moviesList')
            .select('"order", title, image, "imdb-rating"')

        if (error) {
            console.error("Supabase error fetching movies:", error);
            return { success: false, error };
        }
        if (!Array.isArray(data)) {
            return { success: false, error: new Error("Unexpected response from Supabase") };
        }
        const filtered = data.filter(row => {
            const val = row['imdb-rating'];
            return val !== null && typeof val !== 'undefined' && val !== '';
        });
        return { success: true, movies: filtered };
    } catch (err) {
        console.error("Error fetching movies:", err);
        return { success: false, error: err };
    }
}

/**
 * getPublicImageUrl
 * - Given an image path/name (the value stored in moviesList.image), return a public URL
 * - Uses Supabase storage getPublicUrl for the 'slideshowImages' bucket
 * - If the returned URL is empty or not available, returns null
 */
function getPublicImageUrl(imagePath) {
    if (!imagePath) return null;

    try {
        const res = supabase.storage.from('slideshowImages').getPublicUrl(encodeURI(imagePath));
        if (res && res.data && res.data.publicUrl) {
            return res.data.publicUrl;
        }
    } catch (err) {
        console.warn("Error getting public URL for image:", imagePath, err);
    }
    return null;
}

/** pickRandomFromArray - returns a random element from an array */
function pickRandomFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

/** findIndexByOrder - finds index in moviesPool by comparing 'order' */
function findIndexByOrder(orderValue) {
    return moviesPool.findIndex(m => String(m['order']) === String(orderValue));
}

/** pickTwoDistinct - choose two different movies from moviesPool */
function pickTwoDistinct() {
    if (moviesPool.length < 2) return null;
    const leftIdx = Math.floor(Math.random() * moviesPool.length);
    let rightIdx;
    do {
        rightIdx = Math.floor(Math.random() * moviesPool.length);
    } while (rightIdx === leftIdx);
    return { left: moviesPool[leftIdx], right: moviesPool[rightIdx] };
}

/** setPosterSrc - sets img.src with fallback to placeholder and sets alt text */
function setPosterSrc(imgEl, imagePathFromRow, title) {
    if (!imgEl) return;
    const url = getPublicImageUrl(imagePathFromRow);
    if (url) {
        imgEl.src = url;
        imgEl.alt = `${title} poster`;
    } else {
        imgEl.src = PLACEHOLDER_SRC;
        imgEl.alt = `${title} poster (placeholder)`;
    }
}

/** render the current left/right movies (posters above titles) */
function renderMovies() {
    // Titles + years
    leftTitleEl.textContent = leftMovie ? leftMovie.title : '';
    rightTitleEl.textContent = rightMovie ? rightMovie.title : '';
    leftYearEl.textContent = leftMovie && leftMovie.year ? `(${leftMovie.year})` : '';
    rightYearEl.textContent = rightMovie && rightMovie.year ? `(${rightMovie.year})` : '';

    // Posters
    setPosterSrc(leftImgEl, leftMovie ? leftMovie.image : null, leftMovie ? leftMovie.title : 'Movie');
    setPosterSrc(rightImgEl, rightMovie ? rightMovie.image : null, rightMovie ? rightMovie.title : 'Movie');

    roundInfo.textContent = `Right movie rating vs Left movie rating — guess if RIGHT is higher or lower.`;
}

/** updateScoreDisplay */
function updateScoreDisplay() {
    scoreDisplay.textContent = `Score: ${score}`;
}

/** showGameOver */
function showGameOver() {
    // hide the ratings/action container so it doesn't remain visible on the Game Over screen
    hideRatingsAndAction();
    gameContainer.style.display = 'none';
    gameOverSection.style.display = 'block';
    finalScoreEl.textContent = `You earned ${score} ${score === 1 ? 'point' : 'points'}.`;
}

/**
 * chooseNewRight
 * - Picks a new right movie and assigns to rightMovie
 * - Ensures the new right is not the same as leftMovie
 * - When possible, avoids immediately repeating the previous right
 */
function chooseNewRight() {
    if (!leftMovie || moviesPool.length < 2) return;

    const leftIndex = findIndexByOrder(leftMovie['order']);
    const currentRightIndex = rightMovie ? findIndexByOrder(rightMovie['order']) : -1;

    // Candidate indexes exclude leftIndex. If pool > 2, also exclude currentRightIndex to avoid immediate repeat
    const candidates = [];
    for (let i = 0; i < moviesPool.length; i++) {
        if (i === leftIndex) continue;
        if (moviesPool.length > 2 && i === currentRightIndex) continue;
        candidates.push(i);
    }

    let chosenIndex;
    if (candidates.length === 0) {
        // fallback: pick any index not equal to leftIndex
        const fallback = [];
        for (let i = 0; i < moviesPool.length; i++) {
            if (i !== leftIndex) fallback.push(i);
        }
        chosenIndex = pickRandomFromArray(fallback);
    } else {
        chosenIndex = pickRandomFromArray(candidates);
    }

    if (typeof chosenIndex === 'number' && chosenIndex >= 0) {
        rightMovie = moviesPool[chosenIndex];
    }
}

/** parseRating - robust parse for ratings, returns Number or NaN */
function parseRating(value) {
    if (value === null || typeof value === 'undefined') return NaN;
    // coerce to string, trim, replace commas with dots (in case), then parse
    const normalized = String(value).trim().replace(',', '.');
    return parseFloat(normalized);
}

/** evaluateGuess - guessHigher=true means user guessed RIGHT is higher than LEFT */
function evaluateGuess(guessHigher) {
    const leftRating = parseRating(leftMovie['imdb-rating']);
    const rightRating = parseRating(rightMovie['imdb-rating']);

    if (!Number.isFinite(leftRating) || !Number.isFinite(rightRating)) {
        return { correct: false, leftRating, rightRating };
    }

    // equal ratings -> both answers correct
    if (Math.abs(leftRating - rightRating) < 1e-9) {
        return { correct: true, leftRating, rightRating };
    }

    const rightIsHigher = rightRating > leftRating;
    const correct = (guessHigher && rightIsHigher) || (!guessHigher && !rightIsHigher);

    return { correct, leftRating, rightRating };
}

/** disable choice buttons to prevent double clicks */
function setChoiceButtonsEnabled(enabled) {
    btnHigher.disabled = !enabled;
    btnLower.disabled = !enabled;

    // optionally add a visual cue
    if (!enabled) {
        btnHigher.style.opacity = '0.6';
        btnLower.style.opacity = '0.6';
        btnHigher.style.cursor = 'default';
        btnLower.style.cursor = 'default';
    } else {
        btnHigher.style.opacity = '';
        btnLower.style.opacity = '';
        btnHigher.style.cursor = '';
        btnLower.style.cursor = '';
    }
}

/** show ratings + action button */
function showRatingsAndAction({ correct, leftRating, rightRating }) {
    // populate ratings
    leftRatingDisplay.textContent = (Number.isFinite(leftRating) ? `Rating: ${leftRating}` : 'Rating: N/A');
    rightRatingDisplay.textContent = (Number.isFinite(rightRating) ? `Rating: ${rightRating}` : 'Rating: N/A');

    // decide action button text + handler
    if (correct) {
        nextButton.textContent = 'Next';
        // detach previous handlers by replacing with a new function
        nextButton.onclick = handleNextClick;
    } else {
        nextButton.textContent = 'See my Score';
        nextButton.onclick = handleSeeScoreClick;
    }

    // show container + button
    ratingsActionRow.style.display = 'flex';
    nextButton.style.display = 'inline-block';
}

/** hide ratings + action button */
function hideRatingsAndAction() {
    leftRatingDisplay.textContent = '';
    rightRatingDisplay.textContent = '';
    ratingsActionRow.style.display = 'none';
    nextButton.style.display = 'none';
    nextButton.onclick = null;
}

// ---------------- Event handlers ----------------

async function handleStartClick() {
    // Hide instructions & game over, show game
    instructionsSection.style.display = 'none';
    gameOverSection.style.display = 'none';
    gameContainer.style.display = 'block';

    // Reset score
    score = 0;
    updateScoreDisplay();

    // hide ratings/action if any
    hideRatingsAndAction();
    setChoiceButtonsEnabled(true);

    // Fetch movies if needed
    if (moviesPool.length === 0) {
        roundInfo.textContent = 'Loading movies...';
        const res = await fetchMoviesFromSupabase();
        if (!res.success) {
            roundInfo.textContent = 'Error loading movies. See console for details.';
            return;
        }
        moviesPool = res.movies;
    }

    if (moviesPool.length < 2) {
        roundInfo.textContent = 'Not enough movies with IMDB ratings available to start the game.';
        return;
    }

    // Initialize left/right and render
    const pair = pickTwoDistinct();
    leftMovie = pair.left;
    rightMovie = pair.right;
    renderMovies();
}

function handleHigherClick() {
    if (!leftMovie || !rightMovie) return;

    // disable choices while we show feedback
    setChoiceButtonsEnabled(false);

    const { correct, leftRating, rightRating } = evaluateGuess(true);

    if (correct) {
        // increment score now (player earned it)
        score += 1;
        updateScoreDisplay();
        roundInfo.textContent = `Correct — the ratings are shown below. Click Next to continue.`;
        showRatingsAndAction({ correct: true, leftRating, rightRating });
    } else {
        roundInfo.textContent = `Incorrect — the ratings are shown below. Click "See my Score" to view your result.`;
        showRatingsAndAction({ correct: false, leftRating, rightRating });
    }
}

function handleLowerClick() {
    if (!leftMovie || !rightMovie) return;

    // disable choices while we show feedback
    setChoiceButtonsEnabled(false);

    const { correct, leftRating, rightRating } = evaluateGuess(false);

    if (correct) {
        // increment score now (player earned it)
        score += 1;
        updateScoreDisplay();
        roundInfo.textContent = `Correct — the ratings are shown below. Click Next to continue.`;
        showRatingsAndAction({ correct: true, leftRating, rightRating });
    } else {
        roundInfo.textContent = `Incorrect — the ratings are shown below. Click "See my Score" to view your result.`;
        showRatingsAndAction({ correct: false, leftRating, rightRating });
    }
}

/** Called when player clicks Next after a correct guess */
function handleNextClick() {
    // hide ratings/action first
    hideRatingsAndAction();

    // SHIFT: right becomes the new left
    leftMovie = rightMovie;

    // pick a new right (never equal to new left)
    chooseNewRight();

    // re-enable choice buttons
    setChoiceButtonsEnabled(true);

    // render for the next round
    renderMovies();
}

/** Called when player clicks See my Score after an incorrect guess */
function handleSeeScoreClick() {
    // hide ratings/action first
    hideRatingsAndAction();

    // show game over screen
    showGameOver();
}

/** Restart: clear inline display so CSS controls centering */
function handleRestartClick() {
    gameOverSection.style.display = 'none';
    instructionsSection.style.display = ''; // let CSS control it
    gameContainer.style.display = 'none';
    roundInfo.textContent = '';
    score = 0;
    updateScoreDisplay();
    hideRatingsAndAction();
    setChoiceButtonsEnabled(true);
}

// ---------------- Wire up events ----------------
document.addEventListener('DOMContentLoaded', () => {
    if (!startButton || !btnHigher || !btnLower || !restartButton) {
        console.error("Missing one or more required DOM elements for High-or-Low game.");
        return;
    }
    startButton.addEventListener('click', handleStartClick);
    btnHigher.addEventListener('click', handleHigherClick);
    btnLower.addEventListener('click', handleLowerClick);
    restartButton.addEventListener('click', handleRestartClick);

    // ensure ratings/action hidden on initial load
    hideRatingsAndAction();
});
