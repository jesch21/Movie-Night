// ---------------- Supabase Setup ----------------
const { SUPABASE_URL, SUPABASE_KEY } = window.APP_CONFIG;

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Function to populate a table with data
function populateTable(tableId, data) {
    const tableBody = document.querySelector(`#${tableId} tbody`);
    tableBody.innerHTML = ''; // Clear existing rows

    data.forEach((entry, index) => {
        const row = `
            <tr>
                <td>#${index + 1}</td> <!-- Always incremental rank -->
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
    const { data, error } = await supabaseClient
        .from(tableName)
        .select('*')
        .order('order', { ascending: true }); // keep ordering by order

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

    const blissData = await fetchLetterboxdData('Bliss-Letterboxd');
    populateTable('bliss-table', blissData);

    const calebData = await fetchLetterboxdData('Caleb-Letterboxd');
    populateTable('caleb-table', calebData);

    const joeData = await fetchLetterboxdData('Joe-Letterboxd');
    populateTable('joe-table', joeData);

    const johnData = await fetchLetterboxdData('John-Letterboxd');
    populateTable('john-table', johnData);

    const landonData = await fetchLetterboxdData('Landon-Letterboxd');
    populateTable('landon-table', landonData);

    const trevorData = await fetchLetterboxdData('Trevor-Letterboxd');
    populateTable('trevor-table', trevorData);
};
