// ---------------------------
// Supabase Setup
// ---------------------------
const SUPABASE_URL = "https://vvknjdudbteivvqzglcv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2a25qZHVkYnRlaXZ2cXpnbGN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4MjEwODAsImV4cCI6MjA3MjM5NzA4MH0.RUabonop6t3H_KhXkm0UuvO_VlGJvCeNPSCYJ5KUNRU";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ---------------------------
// Fetch & Display Data
// ---------------------------
async function fetchData() {
  const { data, error } = await supabase.from("moviesList").select("*");

  const container = document.getElementById("data-container");
  container.innerHTML = "";

  if (error) {
    console.error("Error fetching data:", error);
    container.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
    return;
  }

  if (!data || data.length === 0) {
    container.innerHTML = "<p>No data found.</p>";
    return;
  }

  data.forEach(row => {
    const div = document.createElement("div");
    div.style.marginBottom = "2em";

    // Show movie title
    const title = document.createElement("h3");
    title.textContent = row.title;
    div.appendChild(title);

    // Show image if it exists
    if (row.image) {
      const url = `${SUPABASE_URL}/storage/v1/object/public/slideshowImages/${row.image}`;
      console.log("Image URL:", url);

      const img = document.createElement("img");
      img.src = url;
      img.alt = row.title;
      img.width = 200;
      div.appendChild(img);
    }

    // Show other fields
    const info = document.createElement("p");
    info.textContent = `Picked by: ${row.pickedBy}, Year: ${row.releaseYear}, Stars: ${row.stars}`;
    div.appendChild(info);

    container.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", fetchData);
