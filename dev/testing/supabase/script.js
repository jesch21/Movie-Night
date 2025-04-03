const SUPABASE_URL = "https://mmydvnnofhfqvpzrzqxa.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1teWR2bm5vZmhmcXZwenJ6cXhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MDU0ODgsImV4cCI6MjA1OTI4MTQ4OH0.5X-6PcQqx5QQ_s4FBOoORmNVxDnQ48RxaTti5SOR97g"; // Replace with actual key

// Initialize Supabase client (Browser version)
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Function to fetch data
async function fetchData() {
    const { data, error } = await supabase.from("items").select("*");

    console.log("Fetched data:", data);
    console.log("Fetch error:", error);

    if (error) {
        console.error("Error fetching data:", error);
        return;
    }

    const container = document.getElementById("data-container");
    container.innerHTML = data.length ? "" : "<p>No data found.</p>";

    data.forEach(item => {
        container.innerHTML += `
            <div>
                <h2>${item.name}</h2>
                <p>${item.description}</p>
                <img src="${item.image_url}" width="150" />
            </div>
        `;
    });
}

// Ensure Supabase library is loaded before running fetchData()
document.addEventListener("DOMContentLoaded", fetchData);