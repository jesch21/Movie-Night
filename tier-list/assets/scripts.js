const movieData = [
    { 
      "title": "The Thing (1982)", 
      "chosenBy": ["Alex"], 
      "star-ratings": ["5/5", "4/5", "5/5", "4/5", "3/5"] 
    },
    { 
      "title": "Ernest Scared Stupid", 
      "chosenBy": ["Jayden"], 
      "star-ratings": ["2.5/5", "1/5", "2.5/5", "2.5/5"] 
    },
    { 
      "title": "Godzilla: Minus One", 
      "chosenBy": ["John"], 
      "star-ratings": ["5/5", "2.5/5", "4/5", "4/5", "4/5"] 
    },
    { 
      "title": "Sherlock Holmes (2009)", 
      "chosenBy": ["John"], 
      "star-ratings": ["3.5/5", "3.5/5", "3.5/5", "4/5"] 
    },
    { 
      "title": "The Truman Show", 
      "chosenBy": ["Trevor"], 
      "star-ratings": ["3.5/5", "4/5", "3.5/5", "3.5/5", "3.5/5", "4.5/5"] 
    },
    { 
      "title": "The Matrix", 
      "chosenBy": ["Ayub", "Joe", "Garrett"], 
      "star-ratings": ["5/5", "5/5", "4/5", "5/5"] 
    },
    { 
      "title": "The Terminator", 
      "chosenBy": ["Ayub"], 
      "star-ratings": ["3.5/5", "3.5/5", "2.5/5", "2.5/5"] 
    },
    { 
      "title": "Fallen Angels", 
      "chosenBy": ["Garrett"], 
      "star-ratings": ["4.5/5", "4/5", "2/5", "1.5/5", "5/5"] 
    },
    { 
      "title": "The Batman", 
      "chosenBy": ["John"], 
      "star-ratings": ["5/5", "4/5", "5/5", "3.5/5", "5/5"] 
    },
    { 
      "title": "A Silent Voice", 
      "chosenBy": ["Jayden"], 
      "star-ratings": ["3.5/5", "5/5", "4.5/5", "5/5"] 
    },
    { 
      "title": "Cloverfield", 
      "chosenBy": ["Landon"], 
      "star-ratings": ["2.5/5", "3.5/5", "2.5/5", "3.5/5", "4/5"] 
    },
    { 
      "title": "The Platform", 
      "chosenBy": ["Trevor"], 
      "star-ratings": ["3/5", "2.5/5", "2/5", "2/5", "3.5/5", "4/5"] 
    },
    { 
      "title": "Yojimbo", 
      "chosenBy": ["Joe"], 
      "star-ratings": ["4/5", "4/5", "5/5", "2.5/5"] 
    },
    { 
      "title": "Princess Mononoke", 
      "chosenBy": ["Ayub"], 
      "star-ratings": ["5/5", "4/5", "2/5", "4/5"] 
    },
    { 
      "title": "Se7en", 
      "chosenBy": ["Garrett"], 
      "star-ratings": ["5/5", "4.5/5", "4.5/5", "5/5", "4/5"] 
    },
    { 
      "title": "Indiana Jones: Raiders of the Lost Ark", 
      "chosenBy": ["John"], 
      "star-ratings": ["4/5", "4.5/5", "5/5", "4.5/5", "2.5/5"] 
    },
    { 
      "title": "Click", 
      "chosenBy": ["Jayden"], 
      "star-ratings": ["2.5/5", "3/5", "3/5", "3/5", "4/5"] 
    },
    { 
      "title": "Attack on Titan The Final Chapter Part 1", 
      "chosenBy": ["Ayub", "John"], 
      "star-ratings": ["4.5/5", "3/5"] 
    },
    { 
      "title": "Sanjuro", 
      "chosenBy": ["Joe"], 
      "star-ratings": ["3/5", "4/5", "3/5", "2/5"] 
    },
    { 
      "title": "A Beautiful Mind", 
      "chosenBy": ["Landon"], 
      "star-ratings": ["2/5", "2/5", "3/5", "2/5"] 
    },
    { 
      "title": "Fight Club", 
      "chosenBy": ["Garrett"], 
      "star-ratings": ["4/5", "4/5", "4.5/5", "4/5"] 
    },
    { 
      "title": "Das Leben der Anderan", 
      "chosenBy": ["John"], 
      "star-ratings": ["1.5/5", "2/5", "2/5", "1/5"] 
    },
    { 
      "title": "Midsommar", 
      "chosenBy": ["Trevor"], 
      "star-ratings": ["4.5/5", "3.5/5", "2.5/5", "4/5"] 
    },
    { 
      "title": "Kill Bill Vol. 1", 
      "chosenBy": ["Ayub"], 
      "star-ratings": ["4/5", "4.5/5", "4.5/5", "2.5/5", "3/5"] 
    },
    { 
      "title": "Jarhead", 
      "chosenBy": ["Jayden"], 
      "star-ratings": ["4/5", "2.5/5", "2.5/5", "3/5", "3.5/5"] 
    },
    { 
      "title": "Mad Max: Fury Road", 
      "chosenBy": ["Joe"], 
      "star-ratings": ["4.5/5", "5/5", "5/5", "3.5/5", "5/5"] 
    },
    { 
      "title": "Master and Commander: The Far Side of the World", 
      "chosenBy": ["Alex"], 
      "star-ratings": ["3/5", "3.5/5", "3.5/5", "3.5/5", "5/5"] 
    },
    { 
      "title": "Uncut Gems", 
      "chosenBy": ["Garrett"], 
      "star-ratings": ["4/5", "4.5/5", "5/5", "2.5/5", "3.5/5"] 
    },
    { 
      "title": "The Suicide Squad", 
      "chosenBy": ["John"], 
      "star-ratings": ["4/5", "4/5", "4/5", "1.5/5", "5/5", "4.5/5"] 
    },
    { 
      "title": "Hardcore Henry", 
      "chosenBy": ["Jayden"], 
      "star-ratings": ["3/5", "2.5/5", "3.5/5", "5/5"] 
    },
    { 
      "title": "Gladiator", 
      "chosenBy": ["John"], 
      "star-ratings": ["4.5/5", "4/5", "3/5", "4/5", "5/5"] 
    },
    { 
      "title": "John Wick", 
      "chosenBy": ["John"], 
      "star-ratings": ["4/5", "3.5/5", "3/5", "4/5"] 
    },
    { 
      "title": "High and Low", 
      "chosenBy": ["Joe"], 
      "star-ratings": ["4.5/5", "4/5", "5/5", "3/5"] 
    },
    { 
      "title": "Full Metal Jacket", 
      "chosenBy": ["Ayub"], 
      "star-ratings": ["4.5/5", "5/5", "5/5", "2/5"] 
    },
    { 
      "title": "mid90s", 
      "chosenBy": ["Garrett"], 
      "star-ratings": ["3/5", "4.5/5", "3.5/5", "3/5", "4.5/5"] 
    },
    { 
      "title": "The Possession", 
      "chosenBy": ["Trevor"], 
      "star-ratings": ["1/5", "2/5", "1/5", "2/5", "2/5", "2.5/5"] 
    },
    { 
      "title": "I Want To Eat Your Pancreas", 
      "chosenBy": ["Jayden"], 
      "star-ratings": ["2.5/5", "1.5/5", "3.5/5"] 
    },
    { 
      "title": "All Quiet on the Western Front (2022)", 
      "chosenBy": ["Alex"], 
      "star-ratings": ["3.5/5", "2.5/5", "2.5/5", "3.5/5", "4.5/5"] 
    },
    { 
      "title": "9", 
      "chosenBy": ["Trevor"], 
      "star-ratings": ["2/5", "1/5", "2/5", "0.5/5", "3/5"] 
    },
    { 
        "title": "Collateral", 
        "chosenBy": ["Joe"], 
        "star-ratings": ["3/5", "4.5/5", "5/5", "4/5", "4/5", "4.5/5"] 
      },
      { 
        "title": "The Grand Budapest Hotel", 
        "chosenBy": ["Ayub"], 
        "star-ratings": ["5/5", "5/5", "4.5/5", "5/5", "3.5/5"] 
      }
    ]

// List of all people
const people = ["Ayub", "John", "Joe", "Trevor", "Garrett", "Alex", "Jayden", "Landon"];

/**
 * Function to convert star ratings from string format "X/Y" to numeric format and calculate the average.
 */
function calculateAverage(starRatings) {
    let total = 0;
    let count = 0;

    starRatings.forEach(rating => {
        const [value] = rating.split('/').map(Number);
        if (!isNaN(value)) {
            total += value;
            count++;
        }
    });

    return count === 0 ? 0 : (total / count).toFixed(2); // Round to 2 decimal places
}

/**
 * Function to load the movie data into the table.
 */
function loadMovieTable() {
    const tableBody = document.querySelector('#movieTable tbody');
    tableBody.innerHTML = ''; // Clear any existing rows

    // Calculate the average for each movie and add a new property for sorting
    const movieDataWithAverages = movieData.map(movie => {
        const averageRating = calculateAverage(movie["star-ratings"]);
        return { ...movie, averageRating: parseFloat(averageRating) }; // Store average as a float
    });

    // Sort the movie data by averageRating (descending order)
    movieDataWithAverages.sort((a, b) => b.averageRating - a.averageRating);

    // Populate the table with sorted data
    movieDataWithAverages.forEach((movie, index) => {
        const chosenBy = movie.chosenBy.join(", "); // Join chosenBy array into a string
        const row = `
            <tr>
                <td>#${index + 1}</td> <!-- Ranking column -->
                <td>${movie.title}</td>
                <td>${chosenBy}</td>
                <td>${movie.averageRating.toFixed(2)}</td> <!-- Show average rating -->
            </tr>
        `;
        tableBody.innerHTML += row; // Append the row to the table body
    });
}

/**
 * Function to calculate average pick scores for each person.
 */
function calculateAveragePickScores() {
    const personScores = {};

    // Initialize scores for each person
    people.forEach(person => {
        personScores[person] = {
            total: 0,
            count: 0
        };
    });

    // Calculate total score and count for each person based on their chosen movies
    movieData.forEach(movie => {
        const averageRating = parseFloat(calculateAverage(movie["star-ratings"]));
        movie.chosenBy.forEach(person => {
            if (personScores[person]) {
                personScores[person].total += averageRating;
                personScores[person].count++;
            }
        });
    });

    // Calculate average score for each person
    return people.map(person => {
        const { total, count } = personScores[person];
        const averagePickScore = count === 0 ? 0 : (total / count).toFixed(2);
        return { name: person, averagePickScore: parseFloat(averagePickScore) };
    }).sort((a, b) => b.averagePickScore - a.averagePickScore); // Sort by averagePickScore descending
}

/**
 * Function to load the best picks data into the table.
 */
function loadBestPicksTable() {
    const tableBody = document.querySelector('#bestPicksTable tbody');
    tableBody.innerHTML = ''; // Clear any existing rows

    const bestPicks = calculateAveragePickScores();

    // Populate the table with sorted data
    bestPicks.forEach((person, index) => {
        const row = `
            <tr>
                <td>#${index + 1}</td> <!-- Ranking column -->
                <td>${person.name}</td>
                <td>${person.averagePickScore.toFixed(2)}</td> <!-- Show average pick score -->
            </tr>
        `;
        tableBody.innerHTML += row; // Append the row to the table body
    });
}

// Load both tables when the window is loaded
window.onload = function() {
    loadMovieTable();
    loadBestPicksTable();
};