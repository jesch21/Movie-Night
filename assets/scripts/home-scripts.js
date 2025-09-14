// ---------------------------
// Supabase Setup
// ---------------------------
const SUPABASE_URL = "https://vvknjdudbteivvqzglcv.supabase.co";   // replace with your project URL
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2a25qZHVkYnRlaXZ2cXpnbGN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4MjEwODAsImV4cCI6MjA3MjM5NzA4MH0.RUabonop6t3H_KhXkm0UuvO_VlGJvCeNPSCYJ5KUNRU";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ---------------------------
// Slideshow variables
// ---------------------------
let currentIndex = 0;
let totalSlides = 0;
let autoSlide;
let isInitialLoad = true;
const slideInterval = 15000; // 15 seconds

let movies = []; // this will hold data from Supabase

// ---------------------------
// DOM Elements
// ---------------------------
const slideshowTitle = document.getElementById("slideshow-title");
const slidesContainer = document.querySelector(".slides-container");

// ---------------------------
// Arrow Hover Visibility
// ---------------------------
function revealArrows() {
  document.getElementById("lleft").style.opacity = "60%";
  document.getElementById("lright").style.opacity = "60%";
}

function hideArrows() {
  document.getElementById("lleft").style.opacity = "0%";
  document.getElementById("lright").style.opacity = "0%";
}

// ---------------------------
// Apply Font Style
// ---------------------------
function applyFontStyle(titleElement, specialFont) {
  if (specialFont === "Spooky") {
    titleElement.style.fontFamily = "Nosifer";
    titleElement.style.letterSpacing = "3px";
    titleElement.style.fontWeight = "lighter";
    titleElement.style.fontSize = "30px";
  } else if (specialFont === "Merry") {
    titleElement.style.fontFamily = "Mountains of Christmas";
    titleElement.style.letterSpacing = "3px";
    titleElement.style.fontWeight = "bold";
    titleElement.style.fontSize = "35px";
  } else {
    // Reset to default styles
    titleElement.style.fontFamily = "";
    titleElement.style.letterSpacing = "";
    titleElement.style.fontWeight = "";
    titleElement.style.fontSize = "";
  }
}

// ---------------------------
// Show a Slide
// ---------------------------
function showSlide(index) {
  // guard
  if (!movies || movies.length === 0) return;

  // clamp index
  if (index < 0) index = 0;
  if (index >= totalSlides) index = totalSlides - 1;

  slidesContainer.style.transform = `translateX(-${index * 100}%)`;

  const movie = movies[index];
  if (!movie) return;

  if (isInitialLoad) {
    slideshowTitle.textContent = movie.title;
    applyFontStyle(slideshowTitle, movie.specialFont);
    isInitialLoad = false;
  } else {
    // Fade out, update, fade in
    slideshowTitle.style.opacity = 0;
    setTimeout(() => {
      slideshowTitle.textContent = movie.title;
      applyFontStyle(slideshowTitle, movie.specialFont);
      slideshowTitle.style.opacity = 1;
    }, 500);
  }
}

// ---------------------------
// Slideshow Navigation
// ---------------------------
function nextSlide() {
  if (totalSlides === 0) return;
  currentIndex = (currentIndex + 1) % totalSlides;
  showSlide(currentIndex);
  resetSlideInterval();
}

function prevSlide() {
  if (totalSlides === 0) return;
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  showSlide(currentIndex);
  resetSlideInterval();
}

function startSlideInterval() {
  clearInterval(autoSlide);
  if (totalSlides > 1) {
    autoSlide = setInterval(nextSlide, slideInterval);
  }
}

function resetSlideInterval() {
  clearInterval(autoSlide);
  startSlideInterval();
}

// ---------------------------
// Fetch Movies from Supabase
// ---------------------------
// Notes per requirements:
// - Load movies ordered by date ASC (oldest -> newest)
// - Determine the first movie whose `stars` is NULL or "None" (case-insensitive).
//   The slideshow should include movies up to and including that movie, and exclude any later (future) movies.
// - Finally, display the resulting list in reverse order so the most recent appears first and the oldest (e.g. Truman) ends up last.
async function loadMovies() {
  const { data, error } = await supabase
    .from("moviesList")
    .select("title, image, specialFont, stars, date")
    .order("date", { ascending: true });

  if (error) {
    console.error("Error loading movies:", error);
    return;
  }

  if (!data || data.length === 0) {
    console.warn("No movies found in database.");
    return;
  }

  // Find the first movie (in chronological order) whose stars is NULL or "None"
  // If that movie's title is literally "None", don't include it (cut just before it).
  let cutoffIndex = data.findIndex(m => {
    if (m.stars === null || m.stars === undefined) return true;
    if (typeof m.stars === "string" && m.stars.trim().toLowerCase() === "none") return true;
    return false;
  });

  if (cutoffIndex !== -1 && data[cutoffIndex].title.trim().toLowerCase() === "none") {
    cutoffIndex = cutoffIndex - 1; // exclude this placeholder movie
  }

  // If no such movie, include all
  if (cutoffIndex === -1) cutoffIndex = data.length - 1;

  // Slice up to and including the cutoff movie
  const toDisplayChronological = data.slice(0, cutoffIndex + 1);

  // Reverse so the most recent appears first (Truman show / oldest will be at the end)
  movies = toDisplayChronological.reverse();

  totalSlides = movies.length;

  // Populate slides dynamically
  slidesContainer.innerHTML = "";

  if (movies.length === 0) {
    console.warn("No movies to display after applying cutoff rules.");
    return;
  }

  movies.forEach((movie) => {
    const slideDiv = document.createElement("div");
    slideDiv.classList.add("slide");

    const img = document.createElement("img");
    img.src = `${SUPABASE_URL}/storage/v1/object/public/slideshowImages/${movie.image}`;
    img.alt = movie.title;

    // Maintain original size / fill container
    img.style.width = "100%";
    img.style.height = "100%";      // fill the slide container height
    img.style.objectFit = "cover";  // fully cover the container

    slideDiv.appendChild(img);
    slidesContainer.appendChild(slideDiv);
  });

  // reset index and start slideshow
  currentIndex = 0;
  isInitialLoad = true;
  showSlide(currentIndex);
  startSlideInterval();
}

// ---------------------------
// Arrow navigation
// ---------------------------
document.getElementById("lright").addEventListener("click", nextSlide);
document.getElementById("lleft").addEventListener("click", prevSlide);

// ---------------------------
// Streaming Button
// ---------------------------
document.getElementById("streaming-button").addEventListener("click", function () {
  const streamLinks = document.getElementById("stream-links");
  if (streamLinks.style.display === "none" || streamLinks.style.display === "") {
    streamLinks.style.display = "flex";
  } else {
    streamLinks.style.display = "none";
  }
});

// ---------------------------
// Run after DOM is ready
// ---------------------------
document.addEventListener("DOMContentLoaded", loadMovies);