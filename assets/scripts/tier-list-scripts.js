// Supabase setup
const SUPABASE_URL = "https://vvknjdudbteivvqzglcv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2a25qZHVkYnRlaXZ2cXpnbGN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4MjEwODAsImV4cCI6MjA3MjM5NzA4MH0.RUabonop6t3H_KhXkm0UuvO_VlGJvCeNPSCYJ5KUNRU";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Bonus points per rank (1 → 0.1, 2 → 0.09, …, 10 → 0.01)
const rankBonus = {
    1: 0.10,
    2: 0.09,
    3: 0.08,
    4: 0.07,
    5: 0.06,
    6: 0.05,
    7: 0.04,
    8: 0.03,
    9: 0.02,
    10: 0.01
};

// Movie data will be fetched from Supabase
let movieData = [];

// List of all people
const people = ["Ayub", "Caleb", "John", "Joe", "Trevor", "Garrett", "Alex", "Jayden", "Landon"];

/**
 * Fetch movie data from Supabase and format it to match previous structure
 */
async function fetchMovieData() {
    const { data, error } = await supabase
        .from('moviesList')
        .select('*')
        .not('stars', 'is', null)
        .neq('stars', 'None');

    if (error) {
        console.error('Error fetching movie data:', error);
        return;
    }

    movieData = data.map(movie => ({
        title: movie.title || "",
        chosenBy: movie.pickedBy ? movie.pickedBy.split(',').map(n => n.trim()) : [],
        "star-ratings": movie.stars ? movie.stars.split(',').map(r => r.trim()) : [],
        date: movie.date || "",
        movieType: movie.movieType || ""   // <-- add movieType here so we can filter by it
    }));
}


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

    return count === 0 ? 0 : (total / count).toFixed(3);
}

/**
 * Function to load the movie data into the table.
 * @param {string|null} filterPerson - Name to filter by, or null to show all.
 */
function loadMovieTable(filterPerson = null, filterType = null) {
    const tableBody = document.querySelector('#movieTable tbody');
    tableBody.innerHTML = '';

    let movieDataWithAverages = movieData.map(movie => {
        const averageRating = calculateAverage(movie["star-ratings"]);
        return { ...movie, averageRating: parseFloat(averageRating) };
    });

    if (filterPerson && filterPerson !== "None") {
        movieDataWithAverages = movieDataWithAverages.filter(movie =>
            movie.chosenBy.includes(filterPerson)
        );
    }

    if (filterType && filterType !== "Type") {
        movieDataWithAverages = movieDataWithAverages.filter(movie =>
            movie.movieType === filterType
        );
    }

    movieDataWithAverages.sort((a, b) => b.averageRating - a.averageRating);

    let lastScore = null;
    let currentRank = 0;

    movieDataWithAverages.forEach((movie) => {
        if (movie.averageRating !== lastScore) {
            currentRank += 1;           // DENSE ranking: increment only when score changes
            lastScore = movie.averageRating;
        }

        const rankClass = currentRank <= 10 ? `rank-${currentRank}` : "";
        const chosenBy = movie.chosenBy.join(", ");

        const bonusText = rankBonus[currentRank] ? ` (+${rankBonus[currentRank].toFixed(2)})` : "";
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="${rankClass}">#${currentRank}${bonusText}</td>
            <td>${movie.title}</td>
            <td>${chosenBy}</td>
            <td>${movie.averageRating.toFixed(3)}</td>
        `;
        tableBody.appendChild(row);
    });

    // ✅ After table is built, add a bottom border under the last Top 10
    const rows = tableBody.querySelectorAll("tr");
    let lastTop10Row = null;
    rows.forEach(row => {
        const rankCell = row.querySelector("td:first-child");
        if (rankCell && parseInt(rankCell.textContent.replace("#", "")) <= 10) {
            lastTop10Row = row;
        }
    });
    if (lastTop10Row) {
        lastTop10Row.style.borderBottom = "5px solid black";
    }

    document.getElementById("movieCountLabel").innerText =
        `Showing ${movieDataWithAverages.length} entr${movieDataWithAverages.length === 1 ? "y" : "ies"}`;
}

function filter() {
    const selectedPerson = document.getElementById("tierListFilter").value;
    const selectedTypeElem = document.getElementById("movieTypeFilter");
    const selectedType = selectedTypeElem ? selectedTypeElem.value : null;

    const personArg = (selectedPerson === "None") ? null : selectedPerson;
    const typeArg = (selectedType === "Type" || !selectedType) ? null : selectedType;

    loadMovieTable(personArg, typeArg);
}

function calculateAveragePickScores() {
    const personScores = {};
    people.forEach(person => { personScores[person] = { total: 0, count: 0, bonus: 0 }; });

    // Step 1: Base averages
    movieData.forEach(movie => {
        const averageRating = parseFloat(calculateAverage(movie["star-ratings"]));
        movie.chosenBy.forEach(person => {
            if (personScores[person]) {
                personScores[person].total += averageRating;
                personScores[person].count++;
            }
        });
    });

    // Step 2: Assign bonuses based on Top 10 ranks
    let rankedMovies = movieData.map(movie => {
        const averageRating = parseFloat(calculateAverage(movie["star-ratings"]));
        return { ...movie, averageRating };
    }).sort((a, b) => b.averageRating - a.averageRating);

    let lastScore = null;
    let currentRank = 0;
    rankedMovies.forEach(movie => {
        if (movie.averageRating !== lastScore) {
            currentRank++;
            lastScore = movie.averageRating;
        }
        if (currentRank <= 10) {
            movie.chosenBy.forEach(person => {
                if (personScores[person]) {
                    personScores[person].bonus += rankBonus[currentRank] || 0;
                }
            });
        }
    });

    // Step 3: Return adjusted scores
    return people.map(person => {
        const { total, count, bonus } = personScores[person];
        const baseAverage = count === 0 ? 0 : (total / count);
        const adjusted = baseAverage + bonus;
        return { name: person, baseAverage, bonus, adjusted };
    }).sort((a, b) => b.adjusted - a.adjusted);
}

/**
 * NEW: Load Best Picks Table
 */
function loadBestPicksTable() {
    const tableBody = document.querySelector('#bestPicksTable tbody');
    tableBody.innerHTML = '';

    const bestPicks = calculateAveragePickScores();

    let lastScore = null;
    let currentRank = 0;

    bestPicks.forEach(person => {
        if (person.adjusted !== lastScore) {
            currentRank++;
            lastScore = person.adjusted;
        }

        const rankClass = currentRank <= 10 ? `rank-${currentRank}` : "";
        const bonusDisplay = ` <b style="color:red">(+${person.bonus.toFixed(2)})</b>`;

        const row = `
            <tr>
                <td class="${rankClass}">#${currentRank}</td>
                <td>${person.name}</td>
                <td>${person.adjusted.toFixed(3)}${bonusDisplay}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}


// ---------- START: Chart.js & monthly averages ----------

let myLineChart = null; // Chart.js instance (reuse if already created)

function extractMonthYear(dateVal) {
    if (!dateVal) return null;
    if (dateVal instanceof Date) {
        if (isNaN(dateVal)) return null;
        return { month: dateVal.getMonth() + 1, year: dateVal.getFullYear() };
    }
    if (typeof dateVal === 'object' && typeof dateVal.toISOString === 'function') {
        const d = new Date(dateVal.toISOString());
        if (!isNaN(d)) return { month: d.getMonth() + 1, year: d.getFullYear() };
    }
    if (typeof dateVal === 'string') {
        const s = dateVal.trim();
        let m = s.match(/^(\d{1,2})\s*-\s*(\d{4})$/);
        if (m) return { month: parseInt(m[1], 10), year: parseInt(m[2], 10) };
        m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
        if (m) return { month: parseInt(m[2], 10), year: parseInt(m[1], 10) };
        const d = new Date(s);
        if (!isNaN(d)) return { month: d.getMonth() + 1, year: d.getFullYear() };
    }
    return null;
}

const trackedYears = [2023, 2024, 2025];
const monthlyTotals = {};
const monthlyCounts = {};
trackedYears.forEach(year => {
    monthlyTotals[year] = {};
    monthlyCounts[year] = {};
    for (let m = 1; m <= 12; m++) {
        monthlyTotals[year][m] = 0;
        monthlyCounts[year][m] = 0;
    }
});

function calculateMonthlyAverages() {
    trackedYears.forEach(year => {
        for (let m = 1; m <= 12; m++) {
            monthlyTotals[year][m] = 0;
            monthlyCounts[year][m] = 0;
        }
    });

    movieData.forEach(movie => {
        const parsed = extractMonthYear(movie.date);
        if (!parsed) return;
        const { month, year } = parsed;
        if (!trackedYears.includes(year)) return;
        if (!month || month < 1 || month > 12) return;
        const avg = parseFloat(calculateAverage(movie["star-ratings"]));
        if (isNaN(avg)) return;
        monthlyTotals[year][month] += avg;
        monthlyCounts[year][month] += 1;
    });

    trackedYears.forEach(year => {
        for (let m = 1; m <= 12; m++) {
            const total = monthlyTotals[year][m];
            const count = monthlyCounts[year][m];
            monthlyTotals[year][m] = count === 0 ? 0 : parseFloat((total / count).toFixed(3));
        }
    });
}

function renderChart() {
    const avgData = trackedYears.map(year =>
        Array.from({ length: 12 }, (_, i) => {
            const val = monthlyTotals[year][i + 1];
            return val === 0 ? null : val;
        })
    );

    const ctx = document.getElementById('myLineChart').getContext('2d');

    if (myLineChart) {
        myLineChart.data.datasets = trackedYears.map((year, i) => ({
            label: String(year),
            data: avgData[i],
            borderColor: ['blue', 'red', 'green'][i] || 'gray',
            borderWidth: 2,
            fill: false,
            tension: 0.2,
            pointBackgroundColor: ['blue', 'red', 'green'][i] || 'gray',
            spanGaps: false
        }));
        myLineChart.update();
        return;
    }

    myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
            datasets: trackedYears.map((year, i) => ({
                label: String(year),
                data: avgData[i],
                borderColor: ['blue', 'red', 'green'][i] || 'gray',
                borderWidth: 2,
                fill: false,
                tension: 0.2,
                pointBackgroundColor: ['blue', 'red', 'green'][i] || 'gray',
                spanGaps: false
            }))
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
}

function getBestMonth() {
    const allMonths = trackedYears.flatMap(year =>
        Array.from({ length: 12 }, (_, i) => ({
            month: i + 1,
            value: monthlyTotals[year][i + 1] || 0,
            year: year
        }))
    );
    if (allMonths.length === 0) {
        document.getElementById('bestMonthLabel').innerText = `Best Month: No data`;
        return;
    }
    const best = allMonths.reduce((prev, curr) => (curr.value > prev.value ? curr : prev), allMonths[0]);
    const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    document.getElementById('bestMonthLabel').innerText =
        `Best Month: ${monthNames[best.month - 1]} of ${best.year} with a ${best.value}`;
}

// Window load: fetch data, compute, render everything in correct order
window.onload = async function() {
    await fetchMovieData();
    calculateMonthlyAverages();
    loadMovieTable();
    loadBestPicksTable();
    renderChart();
    getBestMonth();
};