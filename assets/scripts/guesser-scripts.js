// --- Supabase setup (replace these values if needed) ---
const SUPABASE_URL = "https://vvknjdudbteivvqzglcv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2a25qZHVkYnRlaXZ2cXpnbGN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4MjEwODAsImV4cCI6MjA3MjM5NzA4MH0.RUabonop6t3H_KhXkm0UuvO_VlGJvCeNPSCYJ5KUNRU";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
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
 
// Fetch movie list from Supabase and public URLs from storage bucket "miniImages"
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
 
        // Map rows into the array format used by the rest of the script
        const rows = data || [];
        const built = [];
 
        // For each row, attempt to get a public URL from the 'miniImages' storage bucket
        for (const row of rows) {
            const title = row.title || '';
            const imageName = row.image || ''; // stored filename in bucket (e.g. truman.jpg)
            const length = row.length || '';
            const year = row.releaseYear || '';
            const starring = row.starring || '';
 
            // Get public URL for mini image from bucket 'miniImages'
            let miniPublicUrl = null;
            try {
                const { data: urlData } = supabase.storage.from('miniImages').getPublicUrl(imageName);
                if (urlData && urlData.publicUrl) {
                    miniPublicUrl = urlData.publicUrl;
                }
            } catch (e) {
                console.warn('Could not get public URL for', imageName, e);
            }
 
            // push array in the same structure the rest of the code expects
            // NOTE: index 5 will be the mini image public url (or null fallback)
            built.push([title, imageName, length, year, starring, miniPublicUrl]);
        }
 
        // If no rows returned, movieList remains empty (UI will still work)
        movieList = built;
    } catch (err) {
        console.error('Unexpected error fetching movie list:', err);
    }
}
 
function startGame() {
    let gameContainer = document.getElementById("gameContainer");
    let gameButton = document.getElementById("startButton");
 
    gameContainer.style.display = "flex";
    gameButton.style.display = "none";
 
    startTimer();
    loadMiniImg();
}
 
function loadMiniImg() {
    let loop = true;
    let selectedMovie;
 
    // If movieList is empty, guard
    if (!Array.isArray(movieList) || movieList.length === 0) {
        alert("No movies available to play.");
        return;
    }
 
    while (loop) {
        let randomIndex = Math.floor(Math.random() * movieList.length);
        selectedMovie = movieList[randomIndex];
 
        // Break loop if the selected movie is not in guessedMovies
        if (!guessedMovies.includes(selectedMovie[0])) {
            loop = false;
        } else {
            // If all movies are guessed, break to avoid infinite loop
            if (guessedMovies.length >= movieList.length) {
                loop = false;
            }
        }
    }
 
    let [title, imageName, duration, year, mainActor, miniPublicUrl] = currentMovie = selectedMovie;
 
    let gameImageContainer = document.getElementById("gameImageContainer");
    gameImageContainer.innerHTML = ""; // Clears previous images
 
    let miniImg = document.createElement("img");
    // Use the Supabase mini image public URL if available, otherwise fall back to the old local path
    if (miniPublicUrl) {
        miniImg.src = miniPublicUrl;
    } else {
        miniImg.src = `../assets/images/mini-img/${imageName}`;
    }
    miniImg.className = "miniGameImage";
    miniImg.alt = `Mini ${title} Image`;
 
    guessedMovies.push(currentMovie[0]); // Add the title to guessedMovies
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
                // Try to fetch public URL from slideshowImages bucket
                try {
                    const { data: urlData } = supabase.storage.from('slideshowImages').getPublicUrl(imageName);
                    if (urlData && urlData.publicUrl) {
                        fullImg.src = urlData.publicUrl;
                    } else {
                        fullImg.src = `../assets/images/slideshow/${imageName}`;
                    }
                } catch (e) {
                    // fallback to local slideshow path if anything goes wrong
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
 
    let timerInterval = setInterval(() => {
        let minutes = Math.floor(timeRemaining / 60);
        let seconds = timeRemaining % 60;
 
        seconds = seconds < 10 ? "0" + seconds : seconds;
        timerElement.textContent = `${minutes}:${seconds} left`;
 
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            timerElement.textContent = "Time's up!";
            alert("You ran out of time! The answer was " + currentMovie[0] + "! Click OK to move on to the next round!");
            currentTime = 0;
 
            resetPage();
        } else if (timerOn === false) {
            clearInterval(timerInterval);
            document.getElementById("timer").querySelector("p").textContent = ``;
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
 
function checkAnswer() {
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
 
        // Create the success message
        const successMessage = document.createElement("h3");
        successMessage.textContent = `Correct! You earned ${points} points!`; // Update BLANK with dynamic points if needed
        resultContainer.appendChild(successMessage);
    
        // Create the button
        const nextButton = document.createElement("button");
        nextButton.textContent = "Next";
        nextButton.onclick = resetPage; // Call resetPage to reset the game
        resultContainer.appendChild(nextButton);
    
        // Append the result to the correctAnswer section
        correctAnswerSection.appendChild(resultContainer);
    } else {
        wrongGuesses++;
        alert("Incorrect! Check your spelling & try again!");
    }
}
 
function resetPage() {
    // Remove all displayed hints
    for (let i = 1; i <= 4; i++) {
        const hint = document.getElementById(`hint${i}`);
        hint.style.display = "none";
        if (hint.querySelector("p")) {
            hint.querySelector("p").textContent = "";
        }
    }
 
    // Clear the correctAnswer section
    const correctAnswerSection = document.getElementById("correctAnswer");
    correctAnswerSection.innerHTML = "";
 
    // Clear the gameImageContainer
    const gameImageContainer = document.getElementById("gameImageContainer");
    gameImageContainer.innerHTML = "";
 
    // Reset the input field in the gameAnswer section
    const answerInput = document.getElementById("answer");
    answerInput.value = "";
 
    // Reset the hint counter
    currentHint = 0;
 
    // Reset Timer Boolean
    timerOn = true;
 
    wrongGuesses=0;
 
    if(roundNum === 5) {
        alert("You got a total of " + totalPoints + " points!")
        window.location.href = "results.html";
    } else{
        roundNum++;
        startGame();
    }
}
 
function displayMovieNames() {
    const nameOptions = document.getElementById("nameOptions");
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
    nameOptions.before(button); // Add the button before the nameOptions section
}
 
// --- Initialize: fetch movie list from Supabase, then initialize UI that depends on movieList ---
(async function init() {
    await fetchMovieListFromSupabase();
    // after fetching, populate the movie list UI and add the toggle button
    displayMovieNames();
    addToggleButton();
})();