//movie-lists
const firstTable = 2025;  // Set this to the default year you want to load

const movieData = {
    "2023": [
        {"date": "12/29/2023", "chosenBy": "Trevor", "title": "The Truman Show"},
],
    "2024": [
        {"date": "1/5/2024", "chosenBy": "Ayub/Joe/Garrett", "title": "The Matrix"},
        {"date": "1/12/2024", "chosenBy": "Ayub", "title": "The Terminator"},
        {"date": "1/19/2024", "chosenBy": "Garrett", "title": "Fallen Angels"},
        {"date": "1/26/2024", "chosenBy": "John", "title": "The Batman"},
        {"date": "2/2/2024", "chosenBy": "Jayden", "title": "A Silent Voice"},
        {"date": "2/9/2024", "chosenBy": "Landon", "title": "Cloverfield"},
        {"date": "2/16/2024", "chosenBy": "Trevor", "title": "The Platform"},
        {"date": "2/23/2024", "chosenBy": "Joe", "title": "Yojimbo"},
        {"date": "3/1/2024", "chosenBy": "Ayub", "title": "Princess Mononoke"},
        {"date": "3/8/2024", "chosenBy": "Garrett", "title": "Se7en"},
        {"date": "3/15/2024", "chosenBy": "John", "title": "Indiana Jones: Raiders of the Lost Ark"},
        {"date": "3/22/2024", "chosenBy": "Jayden", "title": "Click"},
        {"date": "3/29/2024", "chosenBy": "Ayub/John", "title": "Attack on Titan: The Final Chapter Part 1"},
        {"date": "4/5/2024", "chosenBy": "Hez", "title": "None"},
        {"date": "4/12/2024", "chosenBy": "Joe", "title": "Sanjuro"},
        {"date": "4/19/2024", "chosenBy": "Landon", "title": "A Beautiful Mind"},
        {"date": "4/26/2024", "chosenBy": "Garrett", "title": "Fight Club"},
        {"date": "5/3/2024", "chosenBy": "John", "title": "Das Leben der Anderen"},
        {"date": "5/10/2024", "chosenBy": "Trevor", "title": "Midsommar"},
        {"date": "5/17/2024", "chosenBy": "Ayub", "title": "Kill Bill Vol. 1"},
        {"date": "5/24/2024", "chosenBy": "Jayden", "title": "Jarhead"},
        {"date": "5/31/2024", "chosenBy": "Joe", "title": "Mad Max: Fury Road"},
        {"date": "6/7/2024", "chosenBy": "Alex", "title": "Master and Commander: The Far Side of the World"},
        {"date": "6/14/2024", "chosenBy": "Garrett", "title": "Uncut Gems"},
        {"date": "6/21/2024", "chosenBy": "John", "title": "The Suicide Squad"},
        {"date": "6/28/2024", "chosenBy": "Jayden", "title": "Hardcore Henry"},
        {"date": "7/5/2024", "chosenBy": "Unseen Roulette", "title": "Gladiator"},
        {"date": "7/12/2024", "chosenBy": "John", "title": "John Wick"},
        {"date": "7/19/2024", "chosenBy": "Joe", "title": "High and Low"},
        {"date": "7/26/2024", "chosenBy": "Ayub", "title": "Fullmetal Jacket"},
        {"date": "8/2/2024", "chosenBy": "Garrett", "title": "Mid 90s"},
        {"date": "8/9/2024", "chosenBy": "Trevor", "title": "The Possession"},
        {"date": "8/16/2024", "chosenBy": "Jayden", "title": "I Want to Eat Your Pancreas"},
        {"date": "8/23/2024", "chosenBy": "Alex", "title": "All Quiet on the Western Front (2022)"},
        {"date": "8/30/2024", "chosenBy": "Trevor", "title": "9"},
        {"date": "9/6/2024", "chosenBy": "Joe", "title": "Collateral"},
        {"date": "9/13/2024", "chosenBy": "Ayub", "title": "The Grand Budapest Hotel"},
        {"date": "9/20/2024", "chosenBy": "Unseen Roulette", "title": "Sherlock Holmes (2009)"},
        {"date": "9/27/2024", "chosenBy": "John", "title": "Godzilla Minus One"},
        {"date": "10/4/2024", "chosenBy": "Jayden", "title": "Ernest Scared Stupid"},
        {"date": "10/11/2024", "chosenBy": "Alex", "title": "The Thing (1982)"},
        {"date": "10/17/2024", "chosenBy": "Bonus Movie: Ayub", "title": "The Texas Chainsaw Massacre"},
        {"date": "10/18/2024", "chosenBy": "Trevor", "title": "The Conjuring"},
        {"date": "10/20/2024", "chosenBy": "Bonus Movie: Trevor", "title": "The Platform 2"},
        {"date": "10/25/2024", "chosenBy": "Joe", "title": "The Lighthouse"},
        {"date": "10/27/2024", "chosenBy": "Bonus Movie: Trevor", "title": "28 Days Later"},
        {"date": "10/31/2024", "chosenBy": "Bonus Movie: John", "title": "Scream"},
        {"date": "11/1/2024", "chosenBy": "Ayub", "title": "Bram Stoker's Dracula"},
        {"date": "11/8/2024", "chosenBy": "Garrett", "title": "Burn After Reading"},
        {"date": "11/15/2024", "chosenBy": "John", "title": "Indiana Jones and The Last Crusade"},
        {"date": "11/22/2024", "chosenBy": "Alex", "title": "Pirates of the Caribbean: The Curse of the Black Pearl"},
        {"date": "11/29/2024", "chosenBy": "Joe", "title": "Goodfellas"},
        {"date": "12/6/2024", "chosenBy": "Trevor", "title": "Transformers"},
        {"date": "12/13/2024", "chosenBy": "Jayden", "title": "Eight Crazy Nights"},
        {"date": "12/20/2024", "chosenBy": "Ayub", "title": "The Matrix Reloaded"},
        {"date": "12/22/2024", "chosenBy": "Bonus Movie: John, Ayub", "title": "The Nightmare Before Christmas"},
        {"date": "12/26/2024", "chosenBy": "Garrett", "title": "The Hateful Eight - Extended Version (Part 1)"},
        {"date": "12/27/2024", "chosenBy": "Unseen Roulette", "title": "Drive"},
        {"date": "12/29/2024", "chosenBy": "Garrett", "title": "The Hateful Eight - Extended Version (Part 2)"},
],
    "2025": [
        {"date": "1/3/2025", "chosenBy": "Unseen Roulette", "title": "Greyhound"},
        {"date": "1/6/2025", "chosenBy": "Bonus Movie: John", "title": "Star Wars: A New Hope"},
        {"date": "1/10/2025", "chosenBy": "John", "title": "The Ministry of Ungentlemanly Warfare"},
        {"date": "1/16/2025", "chosenBy": "Bonus Movie: John", "title": "Star Wars: The Empire Strikes Back"},
        {"date": "1/17/2025", "chosenBy": "Jayden", "title": "The Land Before Time"},
        {"date": "1/20/2025", "chosenBy": "Bonus Movie: Ayub", "title": "The Matrix Revolutions"},
        {"date": "1/23/2025", "chosenBy": "Bonus Movie: John", "title": "Star Wars: Return of the Jedi"},
        {"date": "1/24/2025", "chosenBy": "Unseen Roulette", "title": "Forest Gump"},
        {"date": "1/30/2025", "chosenBy": "Bonus Movie: John", "title": "Star Wars: The Phantom Menace"},
        {"date": "1/31/2025", "chosenBy": "Trevor", "title": "Transformers: Revenge of the Fallen"},
        {"date": "2/6/2025", "chosenBy": "Bonus Movie: John", "title": "Star Wars: Attack of the Clones"},
        {"date": "2/7/2025", "chosenBy": "Joe", "title": "Heat"},
        {"date": "2/21/2025", "chosenBy": "Unseen Roulette", "title": "Fantastic Mr. Fox"},
        {"date": "2/24/2025", "chosenBy": "Bonus Movie: John", "title": "Star Wars: Revenge of the Sith"},
        {"date": "2/28/2025", "chosenBy": "Ayub", "title": "Furiosa: A Mad Max Saga"},
        {"date": "3/6/2025", "chosenBy": "Bonus Movie: John", "title": "Rogue One: A Star Wars Story"},
        {"date": "3/7/2025", "chosenBy": "John", "title": "Prey"},
        {"date": "3/17/2025", "chosenBy": "Jayden", "title": "Ninja Assassin"},
        {"date": "3/20/2025", "chosenBy": "Bonus Movie: John", "title": "Star Wars: The Force Awakens"},
        {"date": "3/21/2025", "chosenBy": "Alex", "title": "Monty Python and the Holy Grail"},
        {"date": "3/27/2025", "chosenBy": "Bonus Movie: John", "title": "Star Wars: The Last Jedi"},
        {"date": "4/1/2025", "chosenBy": "Ayub", "title": "The Royal Tenenbaums"},
        {"date": "4/11/2025", "chosenBy": "Joe", "title": "A.I. Artificial Intelligence"},
        {"date": "4/17/2025", "chosenBy": "Bonus Movie: John", "title": "Star Wars: The Rise of Skywalker"},
        {"date": "4/18/2025", "chosenBy": "Garrett", "title": "The Big Lebowski"},
        {"date": "4/25/2025", "chosenBy": "Trevor", "title": "Transformers: Dark of the Moon"},
        {"date": "5/2/2025", "chosenBy": "John", "title": "Kingsman: The Secret Service"},
        {"date": "5/9/2025", "chosenBy": "Alex", "title": "Monty Python's Life of Brian"},
        {"date": "5/16/2025", "chosenBy": "Trevor", "title": "Interstellar"},
        {"date": "5/23/2025", "chosenBy": "Unseen Roulette", "title": "Blade"},
        {"date": "5/30/2025", "chosenBy": "Joe", "title": "Starship Troopers"},
        {"date": "6/6/2025", "chosenBy": "Ayub", "title": "Sinners"},
        {"date": "6/13/2025", "chosenBy": "Garrett", "title": "Anora"},
        {"date": "6/27/2025", "chosenBy": "Trevor", "title": "Teen Titans GO! To the Movies"},
        {"date": "7/11/2025", "chosenBy": "John", "title": "Thunderbolts*"},
        {"date": "7/17/2025", "chosenBy": "Jayden", "title": "All Dogs Go to Heaven"},
        {"date": "7/25/2025", "chosenBy": "Alex", "title": "Rango"},
        {"date": "8/1/2025", "chosenBy": "Joe", "title": "Happy Gilmore"},
        {"date": "8/7/2025", "chosenBy": "Bonus Movie: Trevor", "title": "The Road to El Dorado"},
        {"date": "8/8/2025", "chosenBy": "Ayub", "title": ""},
        {"date": "8/15/2025", "chosenBy": "Garrett", "title": "Sin City"},
        {"date": "8/22/2025", "chosenBy": "John", "title": "Terminator 2: Judgement Day"},
        {"date": "8/29/2025", "chosenBy": "Alex", "title": ""},
        {"date": "9/5/2025", "chosenBy": "Jayden", "title": ""},
        {"date": "9/12/2025", "chosenBy": "Trevor", "title": "Gladiator II"},
        {"date": "9/19/2025", "chosenBy": "Joe", "title": ""},
        {"date": "9/26/2025", "chosenBy": "Ayub", "title": ""},
        {"date": "10/2/2025", "chosenBy": "Bonus Movie: John", "title": "Alien: Romulus"},
        {"date": "10/3/2025", "chosenBy": "Garrett", "title": ""},
        {"date": "10/10/2025", "chosenBy": "Unseen Roulette", "title": ""},
        {"date": "10/16/2025", "chosenBy": "Bonus Movie: John", "title": "Smile"},
        {"date": "10/17/2025", "chosenBy": "John", "title": "Smile 2"},
        {"date": "10/24/2025", "chosenBy": "Jayden", "title": ""},
        {"date": "10/31/2025", "chosenBy": "Alex", "title": ""},
        {"date": "11/7/2025", "chosenBy": "Trevor", "title": "The Lego Ninjago Movie"},
        {"date": "11/14/2025", "chosenBy": "Joe", "title": ""},
        {"date": "11/21/2025", "chosenBy": "Ayub", "title": ""},
        {"date": "11/28/2025", "chosenBy": "Garrett", "title": ""},
        {"date": "12/5/2025", "chosenBy": "Unseen Roulette", "title": ""},
        {"date": "12/12/2025", "chosenBy": "John", "title": "The Fantastic Four: First Steps"},
        {"date": "12/19/2025", "chosenBy": "Jayden", "title": ""},
        {"date": "12/26/2025", "chosenBy": "Alex", "title": "National Lampoon's Christmas Vacation"}
],
    "2026": [
        {"date": "1/2/2026", "chosenBy": "Trevor", "title": ""},
        {"date": "1/9/2026", "chosenBy": "Joe", "title": ""},
        {"date": "1/16/2026", "chosenBy": "Ayub", "title": ""},
        {"date": "1/23/2026", "chosenBy": "Garrett", "title": ""},
        {"date": "1/30/2026", "chosenBy": "Unseen Roulette", "title": ""},
        {"date": "2/6/2026", "chosenBy": "John", "title": "Iron Man"},
        {"date": "2/13/2026", "chosenBy": "Jayden", "title": ""},
        {"date": "2/20/2026", "chosenBy": "Alex", "title": ""},
        {"date": "2/27/2026", "chosenBy": "Trevor", "title": ""},
        {"date": "3/6/2026", "chosenBy": "Joe", "title": ""},
        {"date": "3/13/2026", "chosenBy": "Ayub", "title": ""},
        {"date": "3/20/2026", "chosenBy": "Garrett", "title": ""},
        {"date": "3/27/2026", "chosenBy": "Unseen Roulette", "title": ""},
        {"date": "4/3/2026", "chosenBy": "John", "title": "Bullet Train"},
        {"date": "4/10/2026", "chosenBy": "Jayden", "title": ""},
        {"date": "4/17/2026", "chosenBy": "Alex", "title": ""},
        {"date": "4/24/2026", "chosenBy": "Trevor", "title": ""},
        {"date": "5/1/2026", "chosenBy": "Joe", "title": ""},
        {"date": "5/8/2026", "chosenBy": "Ayub", "title": ""},
        {"date": "5/15/2026", "chosenBy": "Garrett", "title": ""},
        {"date": "5/22/2026", "chosenBy": "Unseen Roulette", "title": ""},
        {"date": "5/29/2026", "chosenBy": "John", "title": "Mission Impossible"},
        {"date": "6/5/2026", "chosenBy": "Jayden", "title": ""},
        {"date": "6/12/2026", "chosenBy": "Alex", "title": ""},
        {"date": "6/19/2026", "chosenBy": "Trevor", "title": ""},
        {"date": "6/26/2026", "chosenBy": "Joe", "title": ""},
        {"date": "7/3/2026", "chosenBy": "Ayub", "title": ""},
        {"date": "7/10/2026", "chosenBy": "Garrett", "title": ""},
        {"date": "7/16/2026", "chosenBy": "Bonus Movie: John", "title": "Mission Impossible II"},
        {"date": "7/17/2026", "chosenBy": "Unseen Roulette", "title": ""},
        {"date": "7/23/2026", "chosenBy": "Bonus Movie: John", "title": "Mission Impossible III"},
        {"date": "7/24/2026", "chosenBy": "John", "title": "Mission Impossible - Ghost Protocol"},
        {"date": "7/31/2026", "chosenBy": "Jayden", "title": ""},
        {"date": "8/7/2026", "chosenBy": "Alex", "title": ""},
        {"date": "8/14/2026", "chosenBy": "Trevor", "title": ""},
        {"date": "8/21/2026", "chosenBy": "Joe", "title": ""},
        {"date": "8/28/2026", "chosenBy": "Ayub", "title": ""},
        {"date": "9/4/2026", "chosenBy": "Garrett", "title": ""},
        {"date": "9/11/2026", "chosenBy": "Unseen Roulette", "title": ""},
        {"date": "9/18/2026", "chosenBy": "John", "title": "Mission Impossible - Rogue Nation"},
        {"date": "9/25/2026", "chosenBy": "Jayden", "title": ""},
        {"date": "10/2/2026", "chosenBy": "Alex", "title": ""},
        {"date": "10/9/2026", "chosenBy": "Trevor", "title": ""},
        {"date": "10/16/2026", "chosenBy": "Joe", "title": ""},
        {"date": "10/23/2026", "chosenBy": "Ayub", "title": ""},
        {"date": "10/30/2026", "chosenBy": "Garrett", "title": ""},
        {"date": "11/6/2026", "chosenBy": "Unseen Roulette", "title": ""},
        {"date": "11/13/2026", "chosenBy": "John", "title": "Mission Impossible - Fallout"},
        {"date": "11/20/2026", "chosenBy": "Jayden", "title": ""},
        {"date": "11/27/2026", "chosenBy": "Alex", "title": ""},
        {"date": "12/4/2026", "chosenBy": "Trevor", "title": ""},
        {"date": "12/11/2026", "chosenBy": "Joe", "title": ""},
        {"date": "12/17/2026", "chosenBy": "Bonus Movie: John", "title": "The Polar Express"},
        {"date": "12/18/2026", "chosenBy": "Ayub", "title": ""},
        {"date": "12/25/2026", "chosenBy": "Garrett", "title": ""}
],
    "2027": [
        
]    
};

function loadTable() {
    const year = document.getElementById('yearSelect') ? document.getElementById('yearSelect').value : firstTable.toString();
    const tableBody = document.getElementById('movieTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear current table rows
    // Populate the table with data from the selected year
    movieData[year].forEach(movie => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${movie.date}</td><td>${movie.chosenBy}</td><td>${movie.title}</td>`;
        tableBody.appendChild(row);
    });
}

// Add event listener for year selection
document.getElementById('yearSelect').addEventListener('change', loadTable);


// Load table on page load
window.onload = loadTable;

const unseenMovieData = {
    "unseen": [
        {"chosenBy": ["Joe", "Ayub", "Trevor"], "title": "Akira"},
        {"chosenBy": ["Ayub", "Trevor"], "title": "Knock at the Cabin"},
        {"chosenBy": ["Alex"], "title": "The VVitch"},
        {"chosenBy": ["Ayub"], "title": "The Social Network"},
        {"chosenBy": ["Ayub"], "title": "The Northman"},
        {"chosenBy": ["Ayub"], "title": "Blade Runner 2049"},
        {"chosenBy": ["Ayub"], "title": "Wall-E"},
        {"chosenBy": ["Ayub"], "title": "Total Recall"},
        {"chosenBy": ["Garrett"], "title": "Requiem for a Dream"},
        {"chosenBy": ["Garrett"], "title": "Magnolia"},
        {"chosenBy": ["Garrett"], "title": "The Hunted"},
        {"chosenBy": ["Joe"], "title": "Bone Tomahawk"},
        {"chosenBy": ["Joe"], "title": "Who Framed Roger Rabbit"},
        {"chosenBy": ["Joe"], "title": "Crank"},
        {"chosenBy": ["Joe"], "title": "Super Mario Bros (1993)"},
        {"chosenBy": ["Joe"], "title": "The Babadook"},
        {"chosenBy": ["Joe"], "title": "10 Cloverfield Lane"},
        {"chosenBy": ["Joe"], "title": "Zoolander"},
        {"chosenBy": ["Joe"], "title": "Popstar: Never Stop, Never Stopping"},
        {"chosenBy": ["John"], "title": "Animal House"},
        {"chosenBy": ["John"], "title": "Baby Driver"},
        {"chosenBy": ["John"], "title": "Whiplash"},
        {"chosenBy": ["John"], "title": "300"},
        {"chosenBy": ["John"], "title": "Back to the Future"},
        {"chosenBy": ["John"], "title": "Shrek"},
        {"chosenBy": ["John"], "title": "Taken"},
        {"chosenBy": ["John"], "title": "Scary Movie 3"},
        {"chosenBy": ["John"], "title": "Django Unchained"},
        {"chosenBy": ["John"], "title": "Ghost Rider"},
        {"chosenBy": ["John"], "title": "Phone Booth"},
        {"chosenBy": ["John"], "title": "Everything Everywhere All At Once"},
        {"chosenBy": ["John"], "title": "Robocop"},
        {"chosenBy": ["Landon"], "title": "Hairspray"},
        {"chosenBy": ["Trevor"], "title": "Across the Spiderverse"},
        {"chosenBy": ["Trevor"], "title": "A Quiet Place"},
        {"chosenBy": ["Trevor"], "title": "Robots"},
        {"chosenBy": ["Trevor"], "title": "Inside Out 2"},
    ],
    "seen": [
        {"chosenBy": ["John", "Ayub", "Trevor"], "title": "Gladiator"},
        {"chosenBy": ["John"], "title": "Sherlock Holmes (2009)"},
        {"chosenBy": ["Joe"], "title": "Drive"},
        {"chosenBy": ["Alex"], "title": "Greyhound"},
        {"chosenBy": ["John"], "title": "Forest Gump"},
        {"chosenBy": ["Ayub"], "title": "Fantastic Mr. Fox"},
        {"chosenBy": ["Joe"], "title": "Blade"},
    ],
    "bonus": [
        {"chosenBy": ["Ayub"], "title": "The Texas Chainsaw Massacre"},
        {"chosenBy": ["Trevor"], "title": "The Platform 2"},
        {"chosenBy": ["Trevor"], "title": "28 Days Later"},
        {"chosenBy": ["John"], "title": "Scream"},
        {"chosenBy": ["John"], "title": "The Nightmare Before Christmas"},
        {"chosenBy": ["John"], "title": "Star Wars: A New Hope"},
        {"chosenBy": ["John"], "title": "Star Wars: The Empire Strikes Back"},
        {"chosenBy": ["Ayub"], "title": "The Matrix Revolutions"},
        {"chosenBy": ["John"], "title": "Star Wars: Return of the Jedi"},
        {"chosenBy": ["John"], "title": "Star Wars: The Phantom Menace"},
        {"chosenBy": ["John"], "title": "Star Wars: Attack of the Clones"},
        {"chosenBy": ["John"], "title": "Star Wars: Revenge of the Sith"},
        {"chosenBy": ["John"], "title": "Rogue One: A Star Wars Story"},
        {"chosenBy": ["John"], "title": "Star Wars: The Force Awakens"},
        {"chosenBy": ["John"], "title": "Star Wars: The Last Jedi"},
        {"chosenBy": ["John"], "title": "Star Wars: The Rise of Skywalker"},
        {"chosenBy": ["Trevor"], "title": "The Road to El Dorado"},
        {"chosenBy": ["John"], "title": "Alien: Romulus"},
        {"chosenBy": ["John"], "title": "Smile"},
        {"chosenBy": ["John"], "title": "Mission Impossible II"},
        {"chosenBy": ["John"], "title": "Mission Impossible III"},
        {"chosenBy": ["John"], "title": "The Polar Express"},
    ]
};

function loadUnseenTable() {
    const status = document.getElementById('unseenSelect').value;
    const tableBody = document.getElementById('unseenTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear current table rows

    // Populate the table with unseen/seen data
    unseenMovieData[status].forEach(movie => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${movie.chosenBy}</td><td>${movie.title}</td>`;
        tableBody.appendChild(row);
    });
}

function toggleWheel() {
    const wheel = document.getElementById("spinner-container");
    const button = document.getElementById("spin-button");
    if (wheel.style.display === "none" || wheel.style.display === "") {
        wheel.style.display = "flex";
        button.style.top = "-40px";
    } else {
        wheel.style.display = "none";
        button.style.top = "-25px";
    }
}

// Load table on page load using firstTable
window.onload = () => {
    document.getElementById('yearSelect').value = firstTable; // Set the select menu to the default year
    loadTable(); // Main Movie List
    loadUnseenTable(); // Unseen List
};


// Default movie list
let spinnerMovies = ["Choose", "2", "Movies", "Each"];
const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spinBtn');
const updateWheelBtn = document.getElementById('updateWheelBtn');
const movieInput = document.getElementById('movieInput');
let numSegments = spinnerMovies.length;
const anglePerSegment = () => 2 * Math.PI / numSegments;

// Function to adjust font size based on screen width
function getFontSize() {
    const screenWidth = window.innerWidth;
    
    if (screenWidth < 600) {
        return '24px Arial';  // Larger font size for smaller screens
    } else if (screenWidth < 900) {
        return '20px Arial';  // Medium font size for mid-range screens
    } else {
        return '16px Arial';  // Default font size for larger screens
    }
}

// Function to draw the wheel with colored segments
function drawWheel(rotation = 0) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2;
    let currentAngle = -Math.PI / 2 + rotation;  // Start angle

    for (let i = 0; i < numSegments; i++) {
        // Pick a random color for each segment
        const randomColor = `hsl(${Math.random() * 360}, 100%, 70%)`;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + anglePerSegment());
        ctx.fillStyle = randomColor;
        ctx.fill();

        // Set font size dynamically based on screen width
        ctx.font = getFontSize();  // Dynamically set font size
        ctx.fillStyle = '#000';  // Text color

        // Draw the movie title text
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(currentAngle + anglePerSegment() / 2);
        ctx.textAlign = 'right';
        ctx.fillText(spinnerMovies[i], radius - 10, 10);  // Text positioning
        ctx.restore();

        currentAngle += anglePerSegment();
    }
}

// Function to draw the black triangle pointer on the right side
function drawTriangle() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const triangleSize = 20;

    ctx.beginPath();
    ctx.moveTo(canvas.width - 30, centerY - triangleSize / 2);   // Left point of the triangle
    ctx.lineTo(canvas.width - 30 - triangleSize, centerY);        // Right point of the triangle
    ctx.lineTo(canvas.width - 30, centerY + triangleSize / 2);    // Bottom point of the triangle
    ctx.closePath();
    ctx.fillStyle = 'black';
    ctx.fill();
}

// Function to spin the wheel
function spinWheel() {
    const randomSpin = Math.floor(Math.random() * 360) + 720; // Ensure at least 2 full rotations
    let currentRotation = 0;
    const spinInterval = setInterval(() => {
        currentRotation += 10;
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas for the next frame
        drawWheel(currentRotation * Math.PI / 180); // Draw the wheel with current rotation
        drawTriangle(); // Draw the triangle

        if (currentRotation >= randomSpin) {
            clearInterval(spinInterval);
            const finalRotation = (currentRotation % 360) - 90; // Adjust for the triangle position
            const winningIndex = Math.floor((360 - (finalRotation % 360)) / (360 / numSegments)) % numSegments;
            const selectedMovie = spinnerMovies[winningIndex];
            setTimeout(() => alert(`You got: ${selectedMovie}`), 500);
        }
    }, 20); // Rotate every 20ms for a smooth animation
}

// Event listener for updating the wheel based on text input
updateWheelBtn.addEventListener('click', () => {
    const userInput = movieInput.value;
    
    if (userInput.trim()) {
        // Split user input by // and trim whitespace
        spinnerMovies = userInput.split('//').map(movie => movie.trim());
        numSegments = spinnerMovies.length; // Update the number of segments
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
        drawWheel();  // Redraw the wheel with updated movies
        drawTriangle(); // Redraw the triangle
    } else {
        alert('Please enter movie names.');
    }
});

// Initial draw of the wheel
drawWheel();
drawTriangle(); // Draw triangle on initial wheel

// Attach spin button event
spinBtn.addEventListener('click', spinWheel);

// Redraw the wheel when the window is resized
window.addEventListener('resize', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    drawWheel();  // Redraw the wheel with updated font size
    drawTriangle(); // Redraw the triangle
});
