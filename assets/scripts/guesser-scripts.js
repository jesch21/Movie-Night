const movieList = [["The Truman Show", "truman.jpg", "1 hrs 43 mins", "1998", "Ed Harris"]];
let currentHint = 0;
let currentMovie;

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
                break;
        }
        currentHint++;
    } else {
        alert("All the hints are used!");
    }
}

function startGame() {
    let gameContainer = document.getElementById("gameContainer");
    let gameButton = document.getElementById("startButton");

    if(gameButton.innerHTML === "Start the Game!") {
        gameContainer.style.display = "flex";
        gameButton.innerHTML = "Restart the Game!";

        startTimer();
        loadMiniImg();

    } else {

    }
}

function loadMiniImg(){
    const randomIndex = Math.floor(Math.random() * movieList.length);
    const selectedMovie = movieList[randomIndex];

    const [title, imageName, duration, year, mainActor] = currentMovie = selectedMovie;

    const gameImageContainer = document.getElementById("gameImageContainer");

    gameImageContainer.innerHTML = "";

    const miniImg = document.createElement("img");
    miniImg.src = `../assets/images/mini-img/${imageName}`;
    miniImg.className = "miniGameImage";
    miniImg.alt = `Mini ${title} Image`;
    gameImageContainer.appendChild(miniImg);
}

const gameImageContainer = document.getElementById("gameImageContainer");

    gameImageContainer.innerHTML = "";

    imageNames.forEach((imageName) => {
        const miniImg = document.createElement("img");
        miniImg.src = `../assets/images/mini-img/${imageName}`;
        miniImg.className = "miniGameImage";
        miniImg.alt = `Mini ${imageName.split('.')[0]} Image`;

        const fullImg = document.createElement("img");
        fullImg.src = `../assets/images/slideshow/${imageName}`;
        fullImg.className = "fullGameImage";
        fullImg.alt = `Full ${imageName.split('.')[0]} Image`;

        gameImageContainer.appendChild(miniImg);
        gameImageContainer.appendChild(fullImg);
    });

function startTimer() {
    let timerElement = document.getElementById("timer").querySelector("p");
    let timeRemaining = 180;

    let timerInterval = setInterval(() => {
        let minutes = Math.floor(timeRemaining / 60);
        let seconds = timeRemaining % 60;

        seconds = seconds < 10 ? "0" + seconds : seconds;
        timerElement.textContent = `${minutes}:${seconds} left`;

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            timerElement.textContent = "Time's up!";
        }

        timeRemaining--;
    }, 1000);
}