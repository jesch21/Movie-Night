// 55 total
let movieList = [
    ["The Truman Show", "truman.jpg", "1 hrs 43 mins", "1998", "Ed Harris"],
    ["The Matrix", "matrix.jpg", "2 hrs 16 mins", "1999", "Laurence Fishburne"],
    ["The Terminator", "terminator.jpg", "1 hrs 47 mins", "1984", "Linda Hamilton"],
    ["Fallen Angels", "angels.jpg", "1 hrs 36 mins", "1995", "Leon Lai"],
    ["The Batman", "batman.jpg", "2 hrs 56 mins", "2022", "Colin Farrel"],
    ["A Silent Voice", "silent-voice.jpg", "2 hrs 10 mins", "2016", "Miyu Irino"],
    ["Cloverfield", "cloverfield.jpg", "1 hrs 25 mins", "2008", "T.J. Miller"],
    ["The Platform", "platform.jpg", "1 hrs 34 mins", "2019", "Antonia San Juan"],
    ["Yojimbo", "yojimbo.jpg", "1 hrs 50 mins", "1961", "Tatsuya Nakadai"],
    ["Princess Mononoke", "mononoke.jpg", "2 hrs 13 mins", "1997", "Yuriko Ishida"],
    ["Se7en", "se7en.gif", "2 hrs 7 mins", "1995", "Brad Pitt"],
    ["Indiana Jones: Raiders of the Lost Ark", "raiders.jpg", "1 hrs 55 mins", "1981", "Paul Freeman"],
    ["Click", "click.jpg", "1 hrs 47 mins", "2006", "Adam Sandler"],
    ["Attack on Titan: The Final Chapter Part 1", "aot.jpg", "1 hrs 1 mins", "2023", "Adam Sandler"],
    ["Sanjuro", "sanjuro.jpg", "1 hrs 36 mins", "1962", "Tatsuya Nakadai"],
    ["A Beautiful Mind", "beautiful-mind.jpg", "2 hrs 15 mins", "2001", "Russel Crowe"],
    ["Fight Club", "fight.jpg", "2 hrs 19 mins", "1999", "Brad Pitt"],
    ["Das Leben der Anderen", "leben.jpg", "2 hrs 17 mins", "2006", "Martina Gedeck"],
    ["Midsommar", "midsommar.jpg", "2 hrs 28 mins", "2019", "Florence Pugh"],
    ["Kill Bill Vol. 1", "bill.jpg", "1 hrs 53 mins", "2003", "David Carradine"],
    ["Jarhead", "jarhead.jpg", "2 hrs 05 mins", "2005", "Jamie Foxx"],
    ["Mad Max: Fury Road", "max.jpg", "2 hrs 00 mins", "2015", "Tom Hardy"],
    ["Master and Commander: The Far Side of the World", "commander.jpg", "2 hrs 18 mins", "2013", "Russel Crowe"],
    ["Uncut Gems", "gems.jpg", "2 hrs 15 mins", "2019", "Adam Sandler"],
    ["The Suicide Squad", "suicide.jpg", "2 hrs 12 mins", "2021", "Idris Elba"],
    ["Hardcore Henry", "henry.jpg", "1 hrs 36 mins", "2015", "Tim Roth"],
    ["Gladiator", "gladiator.jpg", "2 hrs 35 mins", "2000", "Russel Crowe"],
    ["John Wick", "wick.jpg", "1 hrs 41 mins", "2014", "Keanu Reeves"],
    ["High and Low", "high-and-low.jpg", "2 hrs 23 mins", "1963", "Tatsuya Nakadai"],
    ["Full Metal Jacket", "fmj.jpg", "1 hrs 56 mins", "1987", "Matthew Modine"],
    ["Mid90s", "mid90s.jpg", "1 hrs 25 mins", "2018", "Sunny Suljic"],
    ["The Possession", "possession.jpg", "1 hrs 32 mins", "2012", "Jeffrey Dean Morgan"],
    ["I Want to Eat Your Pancreas", "pancreas.jpg", "1 hrs 49 mins", "2018", "Mahiro Takasugi"],
    ["All Quiet on the Western Front", "western.jpg", "2 hrs 28 mins", "2022", "Felix Kammerer"],
    ["9", "9.jpg", "1 hrs 19 mins", "2009", "Elijah Wood"],
    ["Collateral", "collateral.jpg", "2 hrs 00 mins", "2009", "Jamie Foxx"],
    ["The Grand Budapest Hotel", "budapest.jpg", "1 hrs 39 mins", "2014", "Ralph Fiennes"],
    ["Sherlock Holmes (2009)", "sherlock.jpg", "2 hrs 08 mins", "2009", "Jude Law"],
    ["Godzilla Minus One", "godzilla.jpg", "2 hrs 04 mins", "2023", "Minami Hamabe"],
    ["Ernest Scared Stupid", "ernest.gif", "1 hrs 31 mins", "1991", "Jim Varney"],
    ["The Thing (1982)", "thing.jpg", "1 hrs 49 mins", "1982", "Kurt Russel"],
    ["The Texas Chainsaw Massacre", "chainsaw.jpg", "1 hrs 23 mins", "1974", "Marilyn Burns"],
    ["The Conjuring", "conjuring.jpg", "1 hrs 52 mins", "2013", "Patrick Wilson"],
    ["The Platform 2", "platform2.jpg", "1 hrs 39 mins", "2024", "Milena Smit"],
    ["The Lighthouse", "lighthouse.jpg", "1 hrs 49 mins", "2019", "Wilem DaFoe"],
    ["28 Days Later", "28.jpg", "1 hrs 53 mins", "2002", "Cillian Murphy"],
    ["Scream", "scream.jpg", "1 hrs 51 mins", "1996", "Courteney Cox"],
    ["Bram Stoker's Dracula", "dracula.jpg", "2 hrs 08 mins", "1992", "Keanu Reeves"],
    ["Burn After Reading", "burn.jpg", "1 hrs 36 mins", "2008", "Brad Pitt"],
    ["Indiana Jones and The Last Crusade", "crusade.jpg", "2 hrs 07 mins", "1989", "Sean Connery"],
    ["Pirates of the Carribean: The Curse of the Black Pearl", "pearl.jpg", "2 hrs 23 mins", "2003", "Orlando Bloom"],
    ["Goodfellas", "goodfellas.jpg", "2 hrs 25 mins", "1990", "Joe Pesci"],
    ["Transformers", "transformers.jpg", "2 hrs 24 mins", "2007", "Megan Fox"],
    ["Eight Crazy Nights", "eight.jpg", "1 hrs 16 mins", "2002", "Adam Sandler"],
    ["The Matrix Reloaded", "matrix-reloaded.jpg", "2 hrs 18 mins", "2003", "Keanu Reeves"],
    ["The Nightmare Before Christmas", "nightmare.jpg", "1 hrs 16 mins", "1993", "Daniel Elfman"],
    ["The Hateful Eight - Extended Version", "hateful.jpg", "3 hrs 30 mins", "2019", "Kurt Russel"],
    ["Drive", "drive.jpg", "1 hrs 40 mins", "2011", "Bryan Cranston"],
    ["Greyhound", "greyhound.jpg", "1 hrs 31 mins", "2020", "Tom Hanks"],
    ["Star Wars: A New Hope", "hope.jpg", "2 hrs 01 mins", "1977", "Mark Hamill"],
    ["The Ministry of Ungentlemanly Warfare", "ministry.jpg", "2 hrs 02 mins", "2024", "Alan Ritchson"],
    ["Star Wars: The Empire Strikes Back", "empire.jpg", "2 hrs 04 mins", "1980", "Carrie Fischer"],
    ["The Land Before Time", "land.jpg", "1 hrs 9 mins", "1988", "Pat Hingle"],
    ["The Matrix Revolutions", "matrix-revolutions.jpg", "2 hrs 09 mins", "2003", "Laurence Fishburne"],
    ["Star Wars: Return of the Jedi", "return.jpg", "2 hrs 11 mins", "1983", "Anthony Daniels"],
    ["Forest Gump", "gump.jpg", "2 hrs 22 mins", "1994", "Tom Hanks"],
    ["Star Wars: The Phantom Menace", "phantom.jpg", "2 hrs 16 mins", "1999", "Liam Neeson"],
    ["Transformers: Revenge of the Fallen", "transformers2.jpg", "2 hrs 29 mins", "2009", "Shia LaBeouf"],
    ["Star Wars: Attack of the Clones", "clones.jpg", "2 hrs 22 mins", "2002", "Natalie Portman"],
    ["Heat", "heat.jpg", "2 hrs 50 mins", "1995", "Al Pacino"],
    ["Fantastic Mr. Fox", "fantastic-mr-fox.jpg", "1 hrs 27 mins", "2009", "Bill Murray"],
    ["Star Wars: Revenge of the Sith", "revenge.jpg", "2 hrs 20 mins", "2005", "Ian McDiarmid"],
    ["Rogue One: A Star Wars Story", "rogue.jpg", "2 hrs 13 mins", "2016", "Felicity Jones"],
    /*
    ["Furiosa", "furiosa.jpg", "2 hrs 28 mins", "2024", "Chris Hemsworth"],

    ["Star Wars: The Force Awakens", "awakens.jpg", "2 hrs 18 mins", "2015", "Harrison Ford"],
    ["Prey", "prey.jpg", "1 hrs 40 mins", "2022", "Amber Midthunder"],
    ["Star Wars: The Last Jedi", "last.jpg", "2 hrs 32 mins", "2017", "Benecio Del Toro"],
    ["The Holy Mountain", "mountain.jpg", "1 hrs 54 mins", "1973", "Alejandro Jodorowsky"],
    ["Star Wars: The Rise of Skywalker", "skywalker.jpg", "2 hrs 21 mins", "2019", "Oscar Isaac"],
    ["Monty Python and the Holy Grail", "monty1.jpg", "1 hrs 31 mins", "1975", "Graham Chapman"],
    ["Transformers: Dark of the Moon", "transformers3.jpg", "2 hrs 34 mins", "2011", "Tyrese Gibson"],

    ["Kingsman: The Secret Service", "kingsman.jpg", "2 hrs 9 mins", "2014", "Samuel L. Jackson"],

    ["Monty Python's Life of Brian", "monty2.jpg", "1 hrs 34 mins", "1979", "John Cleese"],
    ["Interstellar", "interstellar.jpg", "2 hrs 49 mins", "2014", "Matthew McConaughey"],

    ["Logan", "logan.jpg", "2 hrs 17 mins", "2017", "Hugh Jackman"]

    ["Deadpool", "deadpool.jpg", "1 hrs 48 mins", "2016", "Ryan Reynolds"],

    ["Deadpool 2", "deadpool2.jpg", "1 hrs 59 mins", "2018", "Josh Brolin"],
    ["Deadpool and Wolverine", "deadpool3.jpg", "2 hrs 08 mins", "2024", "Emma Corrin"],

    ["Alien", "alien.jpg", "1 hrs 57 mins", "1979", "Sigourney Weaver"],
    ["Alien: Romulus", "romulus.jpg", "1 hrs 59 mins", "2024", "Cailee Spaeny"],

    ["Jaws", "jaws.jpg", "2 hrs 04 mins", "1975", "Roy Schneider"],

    ["Smile", "smile.jpg", "1 hrs 55 mins", "2022", "Sosie Bacon"],
    ["Smile 2", "smile2.jpg", "2 hrs 07 mins", "2024", "Naomi Scott"],

    ["Die Hard", "die-hard.jpg", "2 hrs 12 mins", "1988", "David Harbour"],

    ["National Lampoon's Christmas Vacation", "lampoon.jpg", "1 hrs 37 mins", "1989", "Bruce Willis"],

    ["Guardians of the Galaxy", "guardians.jpg", "2 hrs 01 mins", "2014", "Chris Pratt"],

    ["Guardians of the Galaxy Vol. 2", "guardians2.jpg", "2 hrs 16 mins", "2017", "Kurt Russel"],
    ["Guardians of the Galaxy Vol. 3", "guardians3.jpg", "2 hrs 30 mins", "2023", "Bradley Cooper"],

    ["American Psycho", "psycho.jpg", "1 hrs 42 mins", "2000", "Christian Bale"],

    ["Bullet Train", "bullet-train.jpg", "2 hrs 7 mins", "2022", "Brad Pitt"],

    ["Iron Man", "iron-man.jpg", "2 hrs 6 mins", "2008", "Robert Downey Jr."],

    ["Shang Chi and the Legend of the Ten Rings", "shang-chi.jpg", "2 hrs 12 mins", "2021", "Simu Liu"],

    ["Captain America: The First Avenger", "captain-america1.jpg", "2 hrs 4 mins", "2011", "Hugo Weaving"],
    ["Captain America: The Winter Soldier", "captain-america2.jpg", "2 hrs 16 mins", "2014", "Sebastian Stan"],

    ["The Polar Express", "polar.jpg", "1 hrs 40 mins", "2004", "Tom Hanks"],
    */
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

// Call functions to initialize
displayMovieNames();
addToggleButton();
