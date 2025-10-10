// --- Supabase setup (safe reuse/expose to avoid multiple GoTrue clients) ---
const SUPABASE_URL = "https://vvknjdudbteivvqzglcv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2a25qZHVkYnRlaXZ2cXpnbGN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4MjEwODAsImV4cCI6MjA3MjM5NzA4MH0.RUabonop6t3H_KhXkm0UuvO_VlGJvCeNPSCYJ5KUNRU";

const supabase = window.hlSupabase || (window.supabase && window.supabase.createClient
  ? (window.hlSupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY))
  : null);

if(!supabase) console.warn('Supabase client unavailable — check that supabase-js loaded correctly.');

// -----------------------------------------------------
// movieList will be populated from Supabase. Each entry kept in the same format your game expects:
// [ title, imageName, length, year, starring, miniImagePublicUrl ]
let movieList = [];

let guessedMovies = [];
let currentHint = 0;
let currentMovie = [];
let currentTime;
let wrongGuesses = 0;
let timerOn = true;
let roundNum = 1;
let totalPoints = 0;
let timerIntervalId = null;

// --- helpers ---
function norm(s){ return (s||'').toString().trim().toLowerCase(); }

function getPublicImageUrlFromBucket(bucket, imagePath){
    if(!imagePath || !supabase) return null;
    try {
        // normalize path (remove leading slash if present)
        const p = typeof imagePath === 'string' && imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
        const res = supabase.storage.from(bucket).getPublicUrl(p);
        // supabase client sometimes returns { data: { publicUrl } } or { publicUrl } shape — handle both
        if(res){
            if(res.data && (res.data.publicUrl || res.data.publicURL)) return res.data.publicUrl || res.data.publicURL;
            if(res.publicUrl || res.publicURL) return res.publicUrl || res.publicURL;
        }
    } catch(e){
        console.warn('getPublicImageUrlFromBucket error', bucket, imagePath, e);
    }
    return null;
}

// ---------------- Fetch movie list from Supabase ----------------
async function fetchMovieListFromSupabase() {
    try {
        // Query only movies with stars not NULL and not "None"
        const { data, error } = await supabase
            .from('moviesList')
            .select('title, image, length, releaseYear, starring')
            .not('stars', 'is', null)
            .neq('stars', 'None');

        if (error) {
            console.error('Error fetching moviesList:', error);
            return;
        }

        const rows = data || [];
        const built = [];

        for (const row of rows) {
            const title = row.title || '';
            const imageName = row.image || ''; // stored filename in bucket (e.g. truman.jpg)
            const length = row.length || '';
            const year = row.releaseYear || '';
            const starring = row.starring || '';

            // Use helper to get mini image public URL
            let miniPublicUrl = null;
            try {
                miniPublicUrl = getPublicImageUrlFromBucket('miniImages', imageName);
            } catch (e) {
                console.warn('Could not get public URL for', imageName, e);
            }

            built.push([title, imageName, length, year, starring, miniPublicUrl]);
        }

        movieList = built;
    } catch (err) {
        console.error('Unexpected error fetching movie list:', err);
    }
}

// ---------------- Game functions ----------------
function startGame() {
    const gameContainer = document.getElementById("gameContainer");
    const startButton = document.getElementById("startButton");
    const playerArea = document.getElementById("playerArea");
    const playerSelect = document.getElementById("playerSelect");

    // Hide the player selection area so it disappears during play
    if (playerArea) playerArea.style.display = 'none';
    // Lock the select in case you need its value later
    if (playerSelect) playerSelect.disabled = true;

    gameContainer.style.display = "flex";
    startButton.style.display = "none";

    startTimer();
    loadMiniImg();
}

async function loadMiniImg() {
    // guard
    if (!Array.isArray(movieList) || movieList.length === 0) {
        alert("No movies available to play.");
        return;
    }

    // If all movies are used, reset guessed list to allow replay
    if (guessedMovies.length >= movieList.length) guessedMovies = [];

    // pick a non-used movie (or allow reuse if all used)
    let selectedMovie;
    let attempts = 0;
    do {
        const randomIndex = Math.floor(Math.random() * movieList.length);
        selectedMovie = movieList[randomIndex];
        attempts++;
        if(attempts > movieList.length + 5) break;
    } while (selectedMovie && guessedMovies.includes(norm(selectedMovie[0])));

    if (!selectedMovie) {
        alert("No movie could be selected.");
        return;
    }

    currentMovie = selectedMovie;
    const [title = '', imageName = '', duration, year, mainActor, miniPublicUrl] = currentMovie;

    const gameImageContainer = document.getElementById("gameImageContainer");
    gameImageContainer.innerHTML = "";

    // Try to get the full slideshow image public URL (we will crop from this)
    let fullImageUrl = getPublicImageUrlFromBucket('slideshowImages', imageName) || null;
    // Fallback to the miniPublicUrl if full not available (some setups store only mini)
    if(!fullImageUrl && miniPublicUrl) fullImageUrl = miniPublicUrl;
    // final fallback to local path
    if(!fullImageUrl) fullImageUrl = `../assets/images/slideshow/${imageName}`;

    // small neutral SVG placeholder (guaranteed to exist)
    const PLACEHOLDER_DATA_URI = 'data:image/svg+xml;utf8,' + encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
         <rect width="100%" height="100%" fill="#111"/>
         <text x="50%" y="50%" fill="#999" font-size="18" font-family="sans-serif" dominant-baseline="middle" text-anchor="middle">Preview</text>
       </svg>`
    );

    // We'll attempt to load the image first to ensure URL works. If it loads, create the zoomed DIV.
    const tester = new Image();
    tester.crossOrigin = 'anonymous';
    let gotUrl = null;

    // Use a timeout in case remote request hangs
    const TIMEOUT_MS = 3000;
    let timeoutId = setTimeout(() => {
        tester.src = ''; // abort attempt
        if(!gotUrl){
            console.warn('Image tester timed out for', fullImageUrl);
            // continue with placeholder
            insertZoomedDiv(PLACEHOLDER_DATA_URI);
        }
    }, TIMEOUT_MS);

    tester.onload = () => {
        clearTimeout(timeoutId);
        gotUrl = fullImageUrl;
        // Insert the zoomed preview using the working URL
        insertZoomedDiv(gotUrl);
    };
    tester.onerror = () => {
        clearTimeout(timeoutId);
        console.warn('Tester failed to load', fullImageUrl, '— falling back to other options.');
        // If we tried slideshow path, try miniPublicUrl next (if different)
        if(fullImageUrl && miniPublicUrl && miniPublicUrl !== fullImageUrl) {
            const tester2 = new Image();
            tester2.crossOrigin = 'anonymous';
            let t2timeout = setTimeout(() => {
                tester2.src = '';
                insertZoomedDiv(PLACEHOLDER_DATA_URI);
            }, TIMEOUT_MS);
            tester2.onload = () => { clearTimeout(t2timeout); insertZoomedDiv(miniPublicUrl); };
            tester2.onerror = () => { clearTimeout(t2timeout); insertZoomedDiv(PLACEHOLDER_DATA_URI); };
            tester2.src = miniPublicUrl;
            return;
        }
        // otherwise show placeholder
        insertZoomedDiv(PLACEHOLDER_DATA_URI);
    };

    // start load test
    try { tester.src = fullImageUrl; } catch(e){ clearTimeout(timeoutId); console.warn('Error setting tester.src', e); insertZoomedDiv(PLACEHOLDER_DATA_URI); }

    // helper that actually inserts the zoomed DIV; keeps it square and sets zoom/position
    function insertZoomedDiv(imageUrl) {
        // ----- DYNAMIC ZOOM PARAMETERS -----
        const MIN_ZOOM = 2.0;   // minimum zoom (2x)
        const MAX_ZOOM = 4.0;   // maximum zoom (adjustable)
        const zoom = MIN_ZOOM + Math.random() * (MAX_ZOOM - MIN_ZOOM); // float between MIN_ZOOM..MAX_ZOOM

        // choose background position as percentages but keep clamped so we always show valid content
        const posX = Math.floor(Math.random() * 101); // 0..100
        const posY = Math.floor(Math.random() * 101); // 0..100

        const miniDiv = document.createElement('div');
        miniDiv.className = 'miniGameImage zoomed';
        miniDiv.style.width = '';  // allow CSS to control size
        miniDiv.style.height = '';
        miniDiv.style.backgroundImage = `url("${imageUrl}")`;
        // background-size: zoom*100% width and 'auto' height to preserve aspect ratio
        miniDiv.style.backgroundSize = `${zoom * 100}% auto`;
        miniDiv.style.backgroundPosition = `${posX}% ${posY}%`;
        miniDiv.style.backgroundRepeat = 'no-repeat';
        miniDiv.setAttribute('aria-label', `Zoomed preview for ${title}`);
        miniDiv.title = `${title} — zoom ${zoom.toFixed(2)}x`;

        // Save some metadata for debugging if needed
        try { miniDiv.dataset.debug = JSON.stringify({ zoom: Number(zoom.toFixed(2)), posX, posY, src: imageUrl }); } catch(e){}

        gameImageContainer.appendChild(miniDiv);
        // mark used
        guessedMovies.push(norm(currentMovie[0]));
    }
}

// make getHint async so the fourth hint can fetch slideshow image public URL
async function getHint() {
    if (currentHint < 4) {
        switch(currentHint) {
            case 0:
                document.getElementById("hint1").style.display = "block";
                let hint1Text = currentMovie[2];
                document.querySelector("#hint1 p").textContent = hint1Text;
                break;
            case 1:
                document.getElementById("hint2").style.display = "block";
                let hint2Text = currentMovie[3];
                document.querySelector("#hint2 p").textContent = hint2Text;
                break;
            case 2:
                document.getElementById("hint3").style.display = "block";
                let hint3Text = currentMovie[4];
                document.querySelector("#hint3 p").textContent = hint3Text;
                break;
            case 3:
                document.getElementById("hint4").style.display = "block";
                const gameImageContainer = document.getElementById("gameImageContainer");
                let imageName = currentMovie[1];

                gameImageContainer.innerHTML = "";
                const fullImg = document.createElement("img");

                // Try to fetch public URL from slideshowImages bucket
                let fullPublicUrl = null;
                try {
                    fullPublicUrl = getPublicImageUrlFromBucket('slideshowImages', imageName);
                } catch (e) {
                    console.warn('Error getting slideshow public url', e);
                }
                if (fullPublicUrl) {
                    fullImg.src = fullPublicUrl;
                } else {
                    fullImg.src = `../assets/images/slideshow/${imageName}`;
                }

                fullImg.className = "fullGameImage";
                fullImg.alt = `Full ${imageName.split('.')[0]} Image`;

                gameImageContainer.appendChild(fullImg);
                break;
        }
        currentHint++;
    } else {
        alert("All the hints are used!");
    }
}

function startTimer() {
    let timerElement = document.getElementById("timer").querySelector("p");
    let timeRemaining = 120;  // Initial time in seconds

    currentTime = timeRemaining;  // Store the initial time in the global variable

    if (timerIntervalId) {
        clearInterval(timerIntervalId);
        timerIntervalId = null;
    }

    timerIntervalId = setInterval(() => {
        let minutes = Math.floor(timeRemaining / 60);
        let seconds = timeRemaining % 60;

        seconds = seconds < 10 ? "0" + seconds : seconds;
        timerElement.textContent = `${minutes}:${seconds} left`;

        if (timeRemaining <= 0) {
            clearInterval(timerIntervalId);
            timerIntervalId = null;
            timerElement.textContent = "Time's up!";
            alert("You ran out of time! The answer was " + currentMovie[0] + "! Click OK to move on to the next round!");
            currentTime = 0;

            // move to next round immediately
            resetPage();
        } else if (timerOn === false) {
            clearInterval(timerIntervalId);
            timerIntervalId = null;
            timerElement.textContent = ``;
        }

        currentTime = timeRemaining;  // Update the global currentTime with the remaining time
        timeRemaining--;
    }, 1000);
}

function calculatePoints(){
    if(currentTime === 0){return 0;}

    let hintPoints = 4 - currentHint;
    let wrongPoints = 20 * wrongGuesses;
    if(wrongPoints > 100){wrongPoints = 100;}
    if(hintPoints > 0) {
        hintPoints = ((hintPoints*120)/4)
    }

    return (currentTime+hintPoints - wrongPoints);
}

function clearTimerImmediately(){
    if(timerIntervalId){
        clearInterval(timerIntervalId);
        timerIntervalId = null;
    }
}

// submit score to guesser-leaderboard
async function submitGuesserScore(player, score) {
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
            .from('guesser-leaderboard')
            .insert([payload])
            .select();
        return { data, error };
    } catch (err) {
        console.error('submitGuesserScore unexpected error', err);
        return { data: null, error: err };
    }
}

// ---------------- Save-prompt modal ----------------
function removeSavePrompt(){
    const overlay = document.getElementById('savePromptOverlay');
    if(overlay) overlay.remove();
    // Re-enable body scrolling if you changed it (not necessary here but safe)
    document.body.style.overflow = '';
}

function showSavePrompt(playerName, score){
    // Prevent duplicate prompts
    if(document.getElementById('savePromptOverlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'savePromptOverlay';
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
    statusLine.id = 'savePromptStatus';
    statusLine.style.marginTop = '10px';
    statusLine.style.fontSize = '0.95rem';
    dialog.appendChild(btnRow);
    dialog.appendChild(statusLine);

    overlay.appendChild(dialog);
    document.body.appendChild(overlay);

    // Button handlers
    cancelBtn.addEventListener('click', () => {
        removeSavePrompt();
        // allow player to review result screen (we remain on same page - we will still show the final score UI)
    });

    skipBtn.addEventListener('click', () => {
        // Do not save, just proceed to results page
        removeSavePrompt();
        // navigate to results page
        window.location.href = "results.html";
    });

    saveBtn.addEventListener('click', async () => {
        saveBtn.disabled = true;
        skipBtn.disabled = true;
        cancelBtn.disabled = true;
        statusLine.textContent = 'Submitting score...';
        try {
            const { data, error } = await submitGuesserScore(playerName, score);
            if (error) {
                console.warn('Guesser leaderboard insert error', error);
                statusLine.textContent = `Failed to submit: ${error.message || String(error)} — you can try again or choose Don't save.`;
                saveBtn.disabled = false;
                skipBtn.disabled = false;
                cancelBtn.disabled = false;
            } else {
                statusLine.textContent = 'Score saved!';
                // small delay so user sees confirmation
                setTimeout(() => {
                    removeSavePrompt();
                    window.location.href = "results.html";
                }, 900);
            }
        } catch (err) {
            console.error('Unexpected submission error', err);
            statusLine.textContent = 'Unexpected error while submitting. Check console.';
            saveBtn.disabled = false;
            skipBtn.disabled = false;
            cancelBtn.disabled = false;
        }
    });

    // focus first button for accessibility
    saveBtn.focus();
}

// ---------------- End-of-round / reset/score flow ----------------
async function checkAnswer() {
    const submittedAnswer = document.getElementById("answer").value.trim();
    const correctAnswer = currentMovie[0];
    const correctAnswerSection = document.getElementById("correctAnswer");

    // Clear previous results if any
    const previousResult = document.querySelector("#correctAnswer .result");
    if (previousResult) {
        previousResult.remove();
    }

    if (submittedAnswer.toUpperCase() === correctAnswer.toUpperCase()) {
        // Calculate Points
        let points = calculatePoints();
        totalPoints += points;

        // Create a container for the result
        const resultContainer = document.createElement("div");
        resultContainer.className = "result";

        // Turn off timer
        timerOn = false;
        clearTimerImmediately();

        // Create the success message
        const successMessage = document.createElement("h3");
        successMessage.textContent = `Correct! You earned ${points} points!`;
        resultContainer.appendChild(successMessage);

        // Create the button
        const nextButton = document.createElement("button");
        nextButton.textContent = "Next";
        nextButton.onclick = resetPage; // Call resetPage to reset the game (resetPage is async)
        resultContainer.appendChild(nextButton);

        // Append the result to the correctAnswer section
        correctAnswerSection.appendChild(resultContainer);
    } else {
        wrongGuesses++;
        alert("Incorrect! Check your spelling & try again!");
    }
}

async function resetPage() {
    // Remove all displayed hints
    for (let i = 1; i <= 4; i++) {
        const hint = document.getElementById(`hint${i}`);
        if (hint) {
            hint.style.display = "none";
            if (hint.querySelector("p")) {
                hint.querySelector("p").textContent = "";
            }
        }
    }

    // Clear the correctAnswer section
    const correctAnswerSection = document.getElementById("correctAnswer");
    if (correctAnswerSection) correctAnswerSection.innerHTML = "";

    // Clear the gameImageContainer
    const gameImageContainer = document.getElementById("gameImageContainer");
    if (gameImageContainer) gameImageContainer.innerHTML = "";

    // Reset the input field in the gameAnswer section
    const answerInput = document.getElementById("answer");
    if (answerInput) answerInput.value = "";

    // Reset the hint counter
    currentHint = 0;

    // Reset Timer Boolean
    timerOn = true;

    wrongGuesses = 0;

    if(roundNum === 5) {
        // GAME OVER: show the save prompt asking user to submit or not
        // Determine selected player (read from select on page)
        const playerSelectEl = document.getElementById('playerSelect');
        const playerName = playerSelectEl ? (playerSelectEl.value || '') : '';

        // Show a small final score summary in the page so player sees it before choosing
        const finalContainer = document.createElement('div');
        finalContainer.className = 'result';
        const header = document.createElement('h3');
        header.textContent = `Game Over — You scored ${totalPoints} ${totalPoints === 1 ? 'point' : 'points'}.`;
        finalContainer.appendChild(header);
        const info = document.createElement('p');
        info.textContent = 'Would you like to save this score to the leaderboard?';
        finalContainer.appendChild(info);

        // add to DOM (replace any existing)
        const correctAnswerSection = document.getElementById("correctAnswer");
        if (correctAnswerSection) {
            correctAnswerSection.innerHTML = '';
            correctAnswerSection.appendChild(finalContainer);
        }

        // show modal prompt to Save/Don't Save
        showSavePrompt(playerName, totalPoints);

    } else{
        roundNum++;
        // clear timer text
        const timerEl = document.getElementById("timer").querySelector("p");
        if(timerEl) timerEl.textContent = '';
        startGame();
    }
}

// ---------------- Misc UI helpers ----------------
function displayMovieNames() {
    const nameOptions = document.getElementById("nameOptions");
    if (!nameOptions) return;
    nameOptions.innerHTML = ""; // Clear any existing content

    // Add the H3 heading
    const heading = document.createElement("h3");
    heading.textContent = "All Available Answers";
    nameOptions.appendChild(heading);

    // Add the movie names
    movieList.forEach(movie => {
        const movieName = movie[0]; // Get the movie name from the list
        const movieElement = document.createElement("p"); // Create a paragraph element
        movieElement.textContent = movieName; // Set the text content to the movie name
        nameOptions.appendChild(movieElement); // Append the element to the nameOptions section
    });

    toggleMovieList();
}

function toggleMovieList() {
    const nameOptions = document.getElementById("nameOptions");
    if (!nameOptions) return;
    if (nameOptions.style.display === "none") {
        nameOptions.style.display = "block"; // Show the list
    } else {
        nameOptions.style.display = "none"; // Hide the list
    }
}

// Add the toggle button
function addToggleButton() {
    const button = document.createElement("button");
    button.textContent = "Toggle Movie List";
    button.onclick = toggleMovieList;
    button.style.cursor = "pointer";

    const nameOptions = document.getElementById("nameOptions");
    if (nameOptions) nameOptions.before(button); // Add the button before the nameOptions section
}

// ---------------- Wire UI events for start/submit/hints and enable logic ----------------
document.addEventListener('DOMContentLoaded', () => {
    const playerSelectEl = document.getElementById('playerSelect');
    const startBtn = document.getElementById('startButton');
    const hintBtn = document.getElementById('hintBtn');
    const submitBtn = document.getElementById('submit');

    function updateStartEnabled(){
        if (!startBtn) return;
        const nameChosen = playerSelectEl && playerSelectEl.value;
        startBtn.disabled = !nameChosen;
    }

    if (playerSelectEl) playerSelectEl.addEventListener('change', updateStartEnabled);

    if (startBtn) {
        startBtn.addEventListener('click', () => {
            // Lock name selection during gameplay and hide the player area
            const playerArea = document.getElementById('playerArea');
            if (playerArea) playerArea.style.display = 'none';
            if (playerSelectEl) playerSelectEl.disabled = true;
            startGame();
        });
    }

    if (hintBtn) hintBtn.addEventListener('click', getHint);
    if (submitBtn) submitBtn.addEventListener('click', checkAnswer);

    // initialize UI state
    updateStartEnabled();
});

// --- Initialize: fetch movie list from Supabase, then initialize UI that depends on movieList ---
(async function init() {
    await fetchMovieListFromSupabase();
    // after fetching, populate the movie list UI and add the toggle button
    displayMovieNames();
    addToggleButton();
})();
