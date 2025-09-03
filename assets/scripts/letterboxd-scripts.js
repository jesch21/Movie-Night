// Initialize Supabase
const SUPABASE_URL = "https://vvknjdudbteivvqzglcv.supabase.co";   // replace with your project URL
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2a25qZHVkYnRlaXZ2cXpnbGN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4MjEwODAsImV4cCI6MjA3MjM5NzA4MH0.RUabonop6t3H_KhXkm0UuvO_VlGJvCeNPSCYJ5KUNRU";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Function to populate a table with data
function populateTable(tableId, data) {
    const tableBody = document.querySelector(`#${tableId} tbody`);
    tableBody.innerHTML = ''; // Clear existing rows

    data.forEach((entry, index) => {
        const row = `
            <tr>
                <td>#${entry.Rank || index + 1}</td>
                <td>${entry.Movie || ""}</td>
                <td>${entry.Stars || ""}</td>
                <td>${entry.Liked || ""}</td>
                <td>${entry.Review || ""}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Toggle show/hide table
function toggleTable(tableId) {
    const table = document.getElementById(tableId);
    if (table.style.display === "none" || table.style.display === "") {
        table.style.display = "table";
    } else {
        table.style.display = "none";
    }
}

// Fetch data from Supabase
async function fetchLetterboxdData(tableName) {
    const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .order('Rank', { ascending: true });

    if (error) {
        console.error(`Error fetching ${tableName}:`, error);
        return [];
    }
    return data;
}

// Populate all tables on page load
window.onload = async function() {
    const alexData = await fetchLetterboxdData('Alex-Letterboxd');
    populateTable('alex-table', alexData);

    const ayubData = await fetchLetterboxdData('Ayub-Letterboxd');
    populateTable('ayub-table', ayubData);

    const joeData = await fetchLetterboxdData('Joe-Letterboxd');
    populateTable('joe-table', joeData);

    const johnData = await fetchLetterboxdData('John-Letterboxd');
    populateTable('john-table', johnData);

    const landonData = await fetchLetterboxdData('Landon-Letterboxd');
    populateTable('landon-table', landonData);

    const trevorData = await fetchLetterboxdData('Trevor-Letterboxd');
    populateTable('trevor-table', trevorData);
};