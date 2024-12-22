// 55 total
let movieList = [
    ["The Truman Show", "truman.jpg", "1 hrs 43 mins", "1998", "Ed Harris"],
    ["The Matrix", "matrix.jpg", "2 hrs 16 mins", "1999", "Laurence Fishburne"],
    ["The Terminator", "terminator.jpg", "1 hrs 47 mins", "1984", "Linda Hamilton"],
    ["Fallen Angels", "angels.jpg", "1 hrs 36 mins", "1995", "Leon Lai"],
    ["The Batman", "batman.jpg", "2 hrs 56 mins", "2022", "Colin Farrel"],
];

let guessedMovies=[];
let currentHint = 0;
let currentMovie=[];
let currentTime;
let wrongGuesses = 0;
let timerOn = true;
let roundNum = 1;
let totalPoints = 0;

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

    while (loop) {
        let randomIndex = Math.floor(Math.random() * movieList.length);
        selectedMovie = movieList[randomIndex];

        // Break loop if the selected movie is not in guessedMovies
        if (!guessedMovies.includes(selectedMovie[0])) {
            loop = false;
        }
    }

    let [title, imageName, duration, year, mainActor] = currentMovie = selectedMovie;

    let gameImageContainer = document.getElementById("gameImageContainer");
    gameImageContainer.innerHTML = ""; // Clears previous images

    let miniImg = document.createElement("img");
    miniImg.src = `../assets/images/mini-img/${imageName}`;
    miniImg.className = "miniGameImage";
    miniImg.alt = `Mini ${title} Image`;

    guessedMovies.push(currentMovie[0]); // Add the title to guessedMovies
    gameImageContainer.appendChild(miniImg);
}

    function getHint() {
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
                    fullImg.src = `../assets/images/slideshow/${imageName}`;
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
