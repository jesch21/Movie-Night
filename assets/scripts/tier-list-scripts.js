const movieData = [
    /*
    { 
      "title": "The Hateful Eight - Extended Version", 
      "chosenBy": ["Garrett"], 
      "star-ratings": [],
      "date": "12-2024"
    },
    { 
      "title": "The Matrix Reloaded", 
      "chosenBy": ["Ayub"], 
      "star-ratings": [],
      "date": "12-2024"
    },
    { 
      "title": "Goodfellas", 
      "chosenBy": ["Joe"], 
      "star-ratings": [],
      "date": "12-2024"
    },
    { 
      "title": "Transformers", 
      "chosenBy": ["Trevor"], 
      "star-ratings": [],
      "date": "12-2024"
    },
    { 
      "title": "Pirates of the Caribbean: The Curse of the Black Pearl", 
      "chosenBy": ["Alex"], 
      "star-ratings": [],
      "date": "11-2024"
    },
    Jayden's movie
    { 
      "title": "Indiana Jones and The Last Crusade", 
      "chosenBy": ["John"], 
      "star-ratings": [],
      "date": "11-2024"
    },
    Garrett's movie
    { 
      "title": "Bram Stoker's Dracula", 
      "chosenBy": ["Ayub"], 
      "star-ratings": [],
      "date": "11-2024"
    },
    { 
      "title": "The Lighthouse", 
      "chosenBy": ["Joe"], 
      "star-ratings": [],
      "date": "10-2024"
    },
    { 
      "title": "The Conjuring", 
      "chosenBy": ["Trevor"], 
      "star-ratings": [],
      "date": "10-2024"
    },
    { 
      "title": "Texas Chainsaw Massacre", 
      "chosenBy": ["Ayub"], 
      "star-ratings": [],
      "date": "10-2024"
    },
    */
    { 
      "title": "The Thing (1982)", 
      "chosenBy": ["Alex"], 
      "star-ratings": ["5/5", "4/5", "5/5", "4/5", "3/5"],
      "date": "10-2024"
    },
    { 
      "title": "Ernest Scared Stupid", 
      "chosenBy": ["Jayden"], 
      "star-ratings": ["2.5/5", "1/5", "2.5/5", "2.5/5", "1.5/5"],
      "date": "10-2024"
    },
    { 
      "title": "Godzilla: Minus One", 
      "chosenBy": ["John"], 
      "star-ratings": ["5/5", "2.5/5", "4/5", "4/5", "4/5"],
      "date": "9-2024"
    },
    { 
      "title": "Sherlock Holmes (2009)", 
      "chosenBy": ["John"], 
      "star-ratings": ["3.5/5", "3.5/5", "3.5/5", "4/5"],
      "date": "9-2024"
    },
    { 
      "title": "The Truman Show", 
      "chosenBy": ["Trevor"], 
      "star-ratings": ["3.5/5", "4/5", "3.5/5", "3.5/5", "3.5/5", "4.5/5"],
      "date": "12-2023"
    },
    { 
      "title": "The Matrix", 
      "chosenBy": ["Ayub", "Joe", "Garrett"], 
      "star-ratings": ["5/5", "5/5", "4/5", "5/5"],
      "date": "1-2024"
    },
    { 
      "title": "The Terminator", 
      "chosenBy": ["Ayub"], 
      "star-ratings": ["3.5/5", "3.5/5", "2.5/5", "2.5/5"],
      "date": "1-2024"
    },
    { 
      "title": "Fallen Angels", 
      "chosenBy": ["Garrett"], 
      "star-ratings": ["4.5/5", "4/5", "2/5", "1.5/5", "5/5"],
      "date": "1-2024"
    },
    { 
      "title": "The Batman", 
      "chosenBy": ["John"], 
      "star-ratings": ["5/5", "4/5", "5/5", "3.5/5", "5/5"],
      "date": "1-2024"
    },
    { 
      "title": "A Silent Voice", 
      "chosenBy": ["Jayden"], 
      "star-ratings": ["3.5/5", "5/5", "4.5/5", "5/5"],
      "date": "2-2024"
    },
    { 
      "title": "Cloverfield", 
      "chosenBy": ["Landon"], 
      "star-ratings": ["2.5/5", "3.5/5", "2.5/5", "3.5/5", "4/5"],
      "date": "2-2024"
    },
    { 
      "title": "The Platform", 
      "chosenBy": ["Trevor"], 
      "star-ratings": ["3/5", "2.5/5", "2/5", "2/5", "3.5/5", "4/5"],
      "date": "2-2024"
    },
    { 
      "title": "Yojimbo", 
      "chosenBy": ["Joe"], 
      "star-ratings": ["4/5", "4/5", "5/5", "2.5/5"],
      "date": "2-2024"
    },
    { 
      "title": "Princess Mononoke", 
      "chosenBy": ["Ayub"], 
      "star-ratings": ["5/5", "4/5", "2/5", "4/5"],
      "date": "3-2024"
    },
    { 
      "title": "Se7en", 
      "chosenBy": ["Garrett"], 
      "star-ratings": ["5/5", "4.5/5", "4.5/5", "5/5", "4/5"],
      "date": "3-2024"
    },
    { 
      "title": "Indiana Jones: Raiders of the Lost Ark", 
      "chosenBy": ["John"], 
      "star-ratings": ["4/5", "4.5/5", "5/5", "4.5/5", "2.5/5"],
      "date": "3-2024"
    },
    { 
      "title": "Click", 
      "chosenBy": ["Jayden"], 
      "star-ratings": ["2.5/5", "3/5", "3/5", "3/5", "4/5"],
      "date": "3-2024"
    },
    { 
      "title": "Attack on Titan The Final Chapter Part 1", 
      "chosenBy": ["Ayub", "John"], 
      "star-ratings": ["4.5/5", "3/5"],
      "date": "3-2024"
    },
    { 
      "title": "Sanjuro", 
      "chosenBy": ["Joe"], 
      "star-ratings": ["3/5", "4/5", "3/5", "2/5"],
      "date": "4-2024"
    },
    { 
      "title": "A Beautiful Mind", 
      "chosenBy": ["Landon"], 
      "star-ratings": ["2/5", "2/5", "3/5", "2/5"],
      "date": "4-2024"
    },
    { 
      "title": "Fight Club", 
      "chosenBy": ["Garrett"], 
      "star-ratings": ["4/5", "4/5", "4.5/5", "4/5"],
      "date": "4-2024"
    },
    { 
      "title": "Das Leben der Anderan", 
      "chosenBy": ["John"], 
      "star-ratings": ["1.5/5", "2/5", "2/5", "1/5"],
      "date": "5-2024"
    },
    { 
      "title": "Midsommar", 
      "chosenBy": ["Trevor"], 
      "star-ratings": ["4.5/5", "3.5/5", "2.5/5", "4/5"],
      "date": "5-2024"
    },
    { 
      "title": "Kill Bill Vol. 1", 
      "chosenBy": ["Ayub"], 
      "star-ratings": ["4/5", "4.5/5", "4.5/5", "2.5/5", "3/5"],
      "date": "5-2024"
    },
    { 
      "title": "Jarhead", 
      "chosenBy": ["Jayden"], 
      "star-ratings": ["4/5", "2.5/5", "2.5/5", "3/5", "3.5/5"],
      "date": "5-2024"
    },
    { 
      "title": "Mad Max: Fury Road", 
      "chosenBy": ["Joe"], 
      "star-ratings": ["4.5/5", "5/5", "5/5", "3.5/5", "5/5"],
      "date": "5-2024"
    },
    { 
      "title": "Master and Commander: The Far Side of the World", 
      "chosenBy": ["Alex"], 
      "star-ratings": ["3/5", "3.5/5", "3.5/5", "3.5/5", "5/5"],
      "date": "6-2024"
    },
    { 
      "title": "Uncut Gems", 
      "chosenBy": ["Garrett"], 
      "star-ratings": ["4/5", "4.5/5", "5/5", "2.5/5", "3.5/5"],
      "date": "6-2024"
    },
    { 
      "title": "The Suicide Squad", 
      "chosenBy": ["John"], 
      "star-ratings": ["4/5", "4/5", "4/5", "1.5/5", "5/5", "4.5/5"],
      "date": "6-2024"
    },
    { 
      "title": "Hardcore Henry", 
      "chosenBy": ["Jayden"], 
      "star-ratings": ["3/5", "2.5/5", "3.5/5", "5/5"],
      "date": "6-2024"
    },
    { 
      "title": "Gladiator", 
      "chosenBy": ["John", "Ayub", "Trevor"], 
      "star-ratings": ["4.5/5", "4/5", "3/5", "4/5", "5/5"],
      "date": "7-2024"
    },
    { 
      "title": "John Wick", 
      "chosenBy": ["John"], 
      "star-ratings": ["4/5", "3.5/5", "3/5", "4/5"],
      "date": "7-2024"
    },
    { 
      "title": "High and Low", 
      "chosenBy": ["Joe"], 
      "star-ratings": ["4.5/5", "4/5", "5/5", "3/5"],
      "date": "7-2024"
    },
    { 
      "title": "Full Metal Jacket", 
      "chosenBy": ["Ayub"], 
      "star-ratings": ["4.5/5", "5/5", "5/5", "2/5"],
      "date": "7-2024"
    },
    { 
      "title": "mid90s", 
      "chosenBy": ["Garrett"], 
      "star-ratings": ["3/5", "4.5/5", "3.5/5", "3/5", "4.5/5"],
      "date": "8-2024"
    },
    { 
      "title": "The Possession", 
      "chosenBy": ["Trevor"], 
      "star-ratings": ["1/5", "2/5", "1/5", "2/5", "2/5", "2.5/5"],
      "date": "8-2024"
    },
    { 
      "title": "I Want To Eat Your Pancreas", 
      "chosenBy": ["Jayden"], 
      "star-ratings": ["2.5/5", "1.5/5", "3.5/5"],
      "date": "8-2024"
    },
    { 
      "title": "All Quiet on the Western Front (2022)", 
      "chosenBy": ["Alex"], 
      "star-ratings": ["3.5/5", "2.5/5", "2.5/5", "3.5/5", "4.5/5"],
      "date": "8-2024"
    },
    { 
      "title": "9", 
      "chosenBy": ["Trevor"], 
      "star-ratings": ["2/5", "1/5", "2/5", "0.5/5", "3/5"],
      "date": "8-2024"
    },
    { 
        "title": "Collateral", 
        "chosenBy": ["Joe"], 
        "star-ratings": ["3/5", "4.5/5", "5/5", "4/5", "4/5", "4.5/5"],
        "date": "9-2024"
      },
      { 
        "title": "The Grand Budapest Hotel", 
        "chosenBy": ["Ayub"], 
        "star-ratings": ["5/5", "5/5", "4.5/5", "5/5", "3.5/5"],
        "date": "9-2024"
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

// Variables for monthly averages
let jan23 = 0, feb23 = 0, mar23 = 0, apr23 = 0, may23 = 0, jun23 = 0, jul23 = 0, aug23 = 0, sep23 = 0, oct23 = 0, nov23 = 0, dec23 = 0;
let counts23 = { jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0 };

let jan24 = 0, feb24 = 0, mar24 = 0, apr24 = 0, may24 = 0, jun24 = 0, jul24 = 0, aug24 = 0, sep24 = 0, oct24 = 0, nov24 = 0, dec24 = 0;
let counts24 = { jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0 };

/**
 * Function to calculate average ratings per month for the years 2023, 2024, and 2025.
 */
function calculateMonthlyAverages() {
    movieData.forEach(movie => {
        const [month, year] = movie.date.split('-').map(Number);
        const averageRating = parseFloat(calculateAverage(movie["star-ratings"]));

        if (year === 2023) {
            switch(month) {
                case 1:
                    jan23 += averageRating;
                    counts23.jan++;
                    break;
                case 2:
                    feb23 += averageRating;
                    counts23.feb++;
                    break;
                case 3:
                    mar23 += averageRating;
                    counts23.mar++;
                    break;
                case 4:
                    apr23 += averageRating;
                    counts23.apr++;
                    break;
                case 5:
                    may23 += averageRating;
                    counts23.may++;
                    break;
                case 6:
                    jun23 += averageRating;
                    counts23.jun++;
                    break;
                case 7:
                    jul23 += averageRating;
                    counts23.jul++;
                    break;
                case 8:
                    aug23 += averageRating;
                    counts23.aug++;
                    break;
                case 9:
                    sep23 += averageRating;
                    counts23.sep++;
                    break;
                case 10:
                    oct23 += averageRating;
                    counts23.oct++;
                    break;
                case 11:
                    nov23 += averageRating;
                    counts23.nov++;
                    break;
                case 12:
                    dec23 += averageRating;
                    counts23.dec++;
                    break;
            }
        } else if (year === 2024) {
          switch(month) {
              case 1:
                  jan24 += averageRating;
                  counts24.jan++;
                  break;
              case 2:
                  feb24 += averageRating;
                  counts24.feb++;
                  break;
              case 3:
                  mar24 += averageRating;
                  counts24.mar++;
                  break;
              case 4:
                  apr24 += averageRating;
                  counts24.apr++;
                  break;
              case 5:
                  may24 += averageRating;
                  counts24.may++;
                  break;
              case 6:
                  jun24 += averageRating;
                  counts24.jun++;
                  break;
              case 7:
                  jul24 += averageRating;
                  counts24.jul++;
                  break;
              case 8:
                  aug24 += averageRating;
                  counts24.aug++;
                  break;
              case 9:
                  sep24 += averageRating;
                  counts24.sep++;
                  break;
              case 10:
                  oct24 += averageRating;
                  counts24.oct++;
                  break;
              case 11:
                  nov24 += averageRating;
                  counts24.nov++;
                  break;
              case 12:
                  dec24 += averageRating;
                  counts24.dec++;
                  break;
          }
        } 
    });

    // Calculate the final averages for each year
    jan23 = counts23.jan === 0 ? 0 : (jan23 / counts23.jan).toFixed(2);
    feb23 = counts23.feb === 0 ? 0 : (feb23 / counts23.feb).toFixed(2);
    mar23 = counts23.mar === 0 ? 0 : (mar23 / counts23.mar).toFixed(2);
    apr23 = counts23.apr === 0 ? 0 : (apr23 / counts23.apr).toFixed(2);
    may23 = counts23.may === 0 ? 0 : (may23 / counts23.may).toFixed(2);
    jun23 = counts23.jun === 0 ? 0 : (jun23 / counts23.jun).toFixed(2);
    jul23 = counts23.jul === 0 ? 0 : (jul23 / counts23.jul).toFixed(2);
    aug23 = counts23.aug === 0 ? 0 : (aug23 / counts23.aug).toFixed(2);
    sep23 = counts23.sep === 0 ? 0 : (sep23 / counts23.sep).toFixed(2);
    oct23 = counts23.oct === 0 ? 0 : (oct23 / counts23.oct).toFixed(2);
    nov23 = counts23.nov === 0 ? 0 : (nov23 / counts23.nov).toFixed(2);
    dec23 = counts23.dec === 0 ? 0 : (dec23 / counts23.dec).toFixed(2);

    jan24 = counts24.jan === 0 ? 0 : (jan24 / counts24.jan).toFixed(2);
    feb24 = counts24.feb === 0 ? 0 : (feb24 / counts24.feb).toFixed(2);
    mar24 = counts24.mar === 0 ? 0 : (mar24 / counts24.mar).toFixed(2);
    apr24 = counts24.apr === 0 ? 0 : (apr24 / counts24.apr).toFixed(2);
    may24 = counts24.may === 0 ? 0 : (may24 / counts24.may).toFixed(2);
    jun24 = counts24.jun === 0 ? 0 : (jun24 / counts24.jun).toFixed(2);
    jul24 = counts24.jul === 0 ? 0 : (jul24 / counts24.jul).toFixed(2);
    aug24 = counts24.aug === 0 ? 0 : (aug24 / counts24.aug).toFixed(2);
    sep24 = counts24.sep === 0 ? 0 : (sep24 / counts24.sep).toFixed(2);
    oct24 = counts24.oct === 0 ? 0 : (oct24 / counts24.oct).toFixed(2);
    nov24 = counts24.nov === 0 ? 0 : (nov24 / counts24.nov).toFixed(2);
    dec24 = counts24.dec === 0 ? 0 : (dec24 / counts24.dec).toFixed(2);
}

// Calculate monthly averages
calculateMonthlyAverages();

// List for chart data
let avg23 = [null, null, null, null, null, null, null, null, null, null, null, dec23]; // Only December has a value
let avg24 = [jan24, feb24, mar24, apr24, may24, jun24, jul24, aug24, sep24, oct24, nov24, dec24];

const ctx = document.getElementById('myLineChart').getContext('2d');
const myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
          {
              label: '2023',
              data: avg23,
              borderColor: 'blue',
              borderWidth: 2,
              fill: false,
              tension: 0.2,
              pointBackgroundColor: 'blue'
          },
          {
              label: '2024',
              data: avg24,
              borderColor: 'red',
              borderWidth: 2,
              fill: false,
              tension: 0.2
          },
      ]
  },
  options: {
      scales: {
          y: {
              beginAtZero: true,
              max: 5
          }
      }
  }
});

function getBestMonth() {
  const avgMonths = [
      { month: 'January', value: jan23, year: 2023 },
      { month: 'February', value: feb23, year: 2023 },
      { month: 'March', value: mar23, year: 2023 },
      { month: 'April', value: apr23, year: 2023 },
      { month: 'May', value: may23, year: 2023 },
      { month: 'June', value: jun23, year: 2023 },
      { month: 'July', value: jul23, year: 2023 },
      { month: 'August', value: aug23, year: 2023 },
      { month: 'September', value: sep23, year: 2023 },
      { month: 'October', value: oct23, year: 2023 },
      { month: 'November', value: nov23, year: 2023 },
      { month: 'December', value: dec23, year: 2023 },
      { month: 'January', value: jan24, year: 2024 },
      { month: 'February', value: feb24, year: 2024 },
      { month: 'March', value: mar24, year: 2024 },
      { month: 'April', value: apr24, year: 2024 },
      { month: 'May', value: may24, year: 2024 },
      { month: 'June', value: jun24, year: 2024 },
      { month: 'July', value: jul24, year: 2024 },
      { month: 'August', value: aug24, year: 2024 },
      { month: 'September', value: sep24, year: 2024 },
      { month: 'October', value: oct24, year: 2024 },
      { month: 'November', value: nov24, year: 2024 },
      { month: 'December', value: dec24, year: 2024 },
  ];

  const bestMonth = avgMonths.reduce((prev, curr) => (prev.value > curr.value ? prev : curr));

  document.getElementById('bestMonthLabel').innerText = `Best Month: ${bestMonth.month} of ${bestMonth.year}`;
}

// Call the function to update the label
getBestMonth();