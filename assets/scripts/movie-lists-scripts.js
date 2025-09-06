// movie-lists

const firstTable = 2025;  // Set this to the default year you want to load

// --- Supabase setup (uses the values you provided earlier) ---
const SUPABASE_URL = "https://vvknjdudbteivvqzglcv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2a25qZHVkYnRlaXZ2cXpnbGN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4MjEwODAsImV4cCI6MjA3MjM5NzA4MH0.RUabonop6t3H_KhXkm0UuvO_VlGJvCeNPSCYJ5KUNRU";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --- Replace hardcoded data with Supabase-backed data structures ---
let movieData = {}; // will become { "2023": [...], "2024": [...], ... }
let unseenMovieData = { unseen: [], seen: [], bonus: [] };
const EXPECTED_YEARS = ["2023","2024","2025","2026","2027"];
EXPECTED_YEARS.forEach(y => { movieData[y] = []; });

/** Helper: parse "pickedBy" values into an array (handles "A/B", "A, B", string, array) */
function parsePickedBy(pb) {
  if (!pb) return [];
  if (Array.isArray(pb)) return pb;
  return pb.toString().split(/[\/,]+/).map(s => s.trim()).filter(Boolean);
}

/** Helper: extract year from date strings like "1/5/2024" or "12/29/2023" or ISO dates */
function extractYearFromDate(raw) {
  if (!raw) return null;
  if (typeof raw === 'string') {
    // common format is M/D/YYYY or MM/DD/YYYY
    const parts = raw.split('/');
    if (parts.length === 3 && /^\d{4}$/.test(parts[2])) return parts[2];
    // try dash separated YYYY-MM-DD or YYYY-M-D
    const dashParts = raw.split('-');
    if (dashParts.length === 3 && /^\d{4}$/.test(dashParts[0])) return dashParts[0];
    // fallback: try Date parse
    const d = new Date(raw);
    if (!isNaN(d)) return String(d.getFullYear());
  } else if (raw instanceof Date && !isNaN(raw)) {
    return String(raw.getFullYear());
  }
  return null;
}

/** Format date into MM/DD/YY (e.g. 12/29/23). Handles:
 *  - "YYYY-MM-DD" or "YYYY-M-D"
 *  - "M/D/YYYY" or "MM/DD/YYYY"
 *  - Date objects or other parseable strings as fallback
 */
function formatDateShort(raw) {
  if (!raw) return '';
  // If already in M/D/YYYY or similar with slashes:
  if (typeof raw === 'string' && raw.includes('/')) {
    const parts = raw.split('/');
    if (parts.length === 3) {
      let month = parts[0].padStart(2, '0');
      let day = parts[1].padStart(2, '0');
      let year = parts[2];
      // year might be '2024' or '24'
      if (year.length === 4) year = year.slice(2);
      else year = year.padStart(2, '0');
      return `${month}/${day}/${year}`;
    }
  }

  // If dash-separated like YYYY-MM-DD or YYYY-M-D:
  if (typeof raw === 'string' && raw.includes('-')) {
    const parts = raw.split('-');
    if (parts.length === 3 && parts[0].length === 4) {
      const year = parts[0].slice(2);
      const month = parts[1].padStart(2, '0');
      const day = parts[2].padStart(2, '0');
      return `${month}/${day}/${year}`;
    }
  }

  // Try Date parsing fallback
  const d = new Date(raw);
  if (!isNaN(d)) {
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = String(d.getFullYear()).slice(2);
    return `${month}/${day}/${year}`;
  }

  // If nothing matched, return raw as-is
  return raw;
}

/** Build movieData from moviesList table (date, pickedBy, title) */
async function buildMovieDataFromSupabase() {
  try {
    const { data, error } = await supabase
      .from('moviesList')
      .select('date, pickedBy, title, movieType');

    if (error) {
      console.error('Error fetching moviesList:', error);
      return;
    }

    // Reset expected years then fill
    EXPECTED_YEARS.forEach(y => movieData[y] = []);

    (data || []).forEach(row => {
      const year = extractYearFromDate(row.date) || String(firstTable);
      if (!movieData[year]) movieData[year] = [];
      movieData[year].push({
        date: row.date || '',
        chosenBy: row.pickedBy || '',
        title: row.title || '',
        movieType: row.movieType || ''
      });
    });

    // Optional: sort each year's list by date (old -> new) if date strings are parseable
    Object.keys(movieData).forEach(year => {
      movieData[year].sort((a,b) => {
        const da = new Date(a.date);
        const db = new Date(b.date);
        if (isNaN(da) || isNaN(db)) return 0;
        return da - db;
      });
    });

  } catch (err) {
    console.error('buildMovieDataFromSupabase error:', err);
  }
}

/** Build unseenMovieData:
 *  - unseen: rows from unseenList (pickedBy, title, order → used for sorting)
 *  - seen: moviesList rows with movieType == 'roulette' AND stars present
 *  - bonus: moviesList rows with movieType == 'bonus'
 *  Seen & Bonus are ordered by date (oldest first).
 */
async function buildUnseenMovieDataFromSupabase() {
  try {
    // unseenList -> unseen (now includes order)
    const { data: unseenRows, error: unseenErr } = await supabase
      .from('unseenList')
      .select('pickedBy, title, order');

    if (unseenErr) {
      console.error('Error fetching unseenList:', unseenErr);
    }

    // moviesList -> seen & bonus
    const { data: movieRows, error: movieErr } = await supabase
      .from('moviesList')
      .select('pickedBy, title, movieType, stars, date');

    if (movieErr) {
      console.error('Error fetching moviesList for seen/bonus:', movieErr);
    }

    // unseen: now sorted by "order"
    unseenMovieData.unseen = (unseenRows || [])
      .map(r => ({
        chosenBy: parsePickedBy(r.pickedBy),
        title: r.title || '',
        order: r.order ?? 0
      }))
      .sort((a, b) => (a.order || 0) - (b.order || 0));

    const seen = [];
    const bonus = [];
    (movieRows || []).forEach(r => {
      const type = (r.movieType || '').toString().toLowerCase();
      const stars = (r.stars || '').toString().toLowerCase();
      if (type === 'roulette') {
        if (stars && stars !== 'none' && stars !== 'null') {
          seen.push({
            chosenBy: parsePickedBy(r.pickedBy),
            title: r.title || '',
            movieType: r.movieType,
            stars: r.stars,
            date: r.date || ''
          });
        }
      } else if (type === 'bonus') {
        bonus.push({
          chosenBy: parsePickedBy(r.pickedBy),
          title: r.title || '',
          movieType: r.movieType,
          stars: r.stars,
          date: r.date || ''
        });
      }
    });

    // Sort Seen & Bonus only (oldest first)
    const sortByDate = (a, b) => {
      const da = new Date(a.date);
      const db = new Date(b.date);
      if (isNaN(da) || isNaN(db)) return 0;
      return da - db;
    };
    seen.sort(sortByDate);
    bonus.sort(sortByDate);

    unseenMovieData.seen = seen;
    unseenMovieData.bonus = bonus;

  } catch (err) {
    console.error('buildUnseenMovieDataFromSupabase error:', err);
  }
}

// ----------------- Remaining original script (unchanged logic) -----------------

function loadTable() {
    const year = document.getElementById('yearSelect') ? document.getElementById('yearSelect').value : firstTable.toString();
    const tableBody = document.getElementById('movieTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear current table rows

    // If the year key missing or empty array, just exit gracefully
    if (!movieData[year] || movieData[year].length === 0) {
        return;
    }

    // Populate the table with data from the selected year
    movieData[year].forEach(movie => {
        const row = document.createElement('tr');
        const formattedDate = formatDateShort(movie.date);

        // Prefix "Who's Movie" column based on type
        let chosenByStr = movie.chosenBy;
        const type = movie.movieType ? movie.movieType.toString().toLowerCase() : "";
        if (type === "roulette") {
            chosenByStr = `Unseen Roulette`;
        } else if (type === "bonus") {
            chosenByStr = `Bonus Movie: ${chosenByStr}`;
        }

        row.innerHTML = `<td>${formattedDate}</td><td>${chosenByStr}</td><td>${movie.title}</td>`;
        tableBody.appendChild(row);
    });
}

// Add event listener for year selection if element exists
const yearSelectElem = document.getElementById('yearSelect');
if (yearSelectElem) {
  yearSelectElem.addEventListener('change', loadTable);
}

// Load unseen/unseen/bonus table renderer (uses unseenMovieData built above)
function loadUnseenTable() {
    const status = document.getElementById('unseenSelect').value;
    const tableBody = document.getElementById('unseenTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear current table rows

    // if nothing present for that status, do nothing
    if (!unseenMovieData || !unseenMovieData[status] || unseenMovieData[status].length === 0) {
        return;
    }

    // Populate the table with unseen/seen data
    unseenMovieData[status].forEach(movie => {
        const row = document.createElement('tr');
        // chosenBy may be array or string depending on source; show it sensibly
        const chosenByStr = Array.isArray(movie.chosenBy) ? movie.chosenBy.join('/') : movie.chosenBy;
        row.innerHTML = `<td>${chosenByStr}</td><td>${movie.title}</td>`;
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

// Load table on page load using firstTable, but first fetch data from Supabase
window.onload = async () => {
    // set select to default year (same behavior as before)
    const yearSelectElem = document.getElementById('yearSelect');
    if (yearSelectElem) yearSelectElem.value = firstTable;

    // Fetch data from Supabase to populate movieData and unseenMovieData
    await Promise.all([
      buildMovieDataFromSupabase(),
      buildUnseenMovieDataFromSupabase()
    ]);

    // Debug logging so you can inspect shapes in console
    console.log('movieData (sample):', movieData);
    console.log('unseenMovieData (sample):', unseenMovieData);

    // Call original renderers
    loadTable();       // Main Movie List
    loadUnseenTable(); // Unseen/Seen/Bonus lists
};

// ----------------- Spinner / wheel / canvas code (unchanged) -----------------

// Default movie list
let spinnerMovies = ["Choose", "2", "Movies", "Each"];
const canvas = document.getElementById('wheel');
const ctx = canvas ? canvas.getContext('2d') : null;
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
    if (!ctx || !canvas) return;
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
    if (!ctx || !canvas) return;
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
    if (!ctx || !canvas) return;
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
if (updateWheelBtn && movieInput) {
  updateWheelBtn.addEventListener('click', () => {
      const userInput = movieInput.value;
      
      if (userInput.trim()) {
          // Split user input by // and trim whitespace
          spinnerMovies = userInput.split('//').map(movie => movie.trim());
          numSegments = spinnerMovies.length; // Update the number of segments
          if (ctx && canvas) ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
          drawWheel();  // Redraw the wheel with updated movies
          drawTriangle(); // Redraw the triangle
      } else {
          alert('Please enter movie names.');
      }
  });
}

// Initial draw of the wheel
drawWheel();
drawTriangle(); // Draw triangle on initial wheel

// Attach spin button event
if (spinBtn) spinBtn.addEventListener('click', spinWheel);

// Redraw the wheel when the window is resized
window.addEventListener('resize', () => {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    drawWheel();  // Redraw the wheel with updated font size
    drawTriangle(); // Redraw the triangle
});