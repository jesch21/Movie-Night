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
        const res = supabase.storage.from(bucket).getPublicUrl(imagePath);
        if(res && res.data) return res.data.publicUrl || res.data.publicURL || null;
        return res && (res.publicUrl || res.publicURL) ? (res.publicUrl || res.publicURL) : null;
    } catch(e){
        console.warn('getPublicImageUrlFromBucket error', bucket, imagePath, e);
        return null;
    }
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

function loadMiniImg() {
    // guard
    if (!Array.isArray(movieList) || movieList.length === 0) {
        alert("No movies available to play.");
        return;
    }

    // If all movies used, reset guessed list to allow replay
    if (guessedMovies.length >= movieList.length) {
        guessedMovies = [];
    }

    let selectedMovie;
    // Pick random until we find one not guessed
    do {
        const randomIndex = Math.floor(Math.random() * movieList.length);
        selectedMovie = movieList[randomIndex];
    } while (selectedMovie && guessedMovies.includes(norm(selectedMovie[0])));

    // If still nothing, bail
    if (!selectedMovie) {
        alert("No movie could be selected.");
        return;
    }

    currentMovie = selectedMovie;
    let [title, imageName, duration, year, mainActor, miniPublicUrl] = currentMovie;

    const gameImageContainer = document.getElementById("gameImageContainer");
    gameImageContainer.innerHTML = "";

    const miniImg = document.createElement("img");
    const src = miniPublicUrl || `../assets/images/mini-img/${imageName}`;
    miniImg.src = src;
    miniImg.className = "miniGameImage";
    miniImg.alt = `Mini ${title} Image`;

    guessedMovies.push(norm(currentMovie[0])); // store normalized title

    gameImageContainer.appendChild(miniImg);
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

                const publicUrl = getPublicImageUrlFromBucket('slideshowImages', imageName);
                fullImg.src = publicUrl || `../assets/images/slideshow/${imageName}`;

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
        // Before navigating to results, submit the score into guesser-leaderboard
        // Determine selected player (read from select on page)
        const playerSelectEl = document.getElementById('playerSelect');
        const playerName = playerSelectEl ? (playerSelectEl.value || '') : '';

        // show a quick message in console & await submission
        try {
            const { data, error } = await submitGuesserScore(playerName, totalPoints);
            if(error){
                console.warn('Guesser leaderboard insert error', error);
            } else {
                console.info('Guesser leaderboard insert success', data);
            }
        } catch(err) {
            console.error('Error while submitting guesser score', err);
        }

        alert("You got a total of " + totalPoints + " points!");
        // redirect to results page
        window.location.href = "results.html";
    } else{
        roundNum++;
        // clear timer text
        const timerEl = document.getElementById("timer").querySelector("p");
        if(timerEl) timerEl.textContent = '';
        startGame();
    }
}

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
