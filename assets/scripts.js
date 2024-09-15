let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const slideInterval = 30000; // 30 seconds
let autoSlide;

// Function to show a specific slide
function showSlide(index) {
    const slidesContainer = document.querySelector('.slides-container');
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
}

// Function to go to the next slide
function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
    resetSlideInterval(); // Reset the timer
}

// Function to go to the previous slide
function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentIndex);
    resetSlideInterval(); // Reset the timer
}

// Function to start or reset the slideshow interval
function startSlideInterval() {
    autoSlide = setInterval(nextSlide, slideInterval);
}

// Function to reset the slideshow interval
function resetSlideInterval() {
    clearInterval(autoSlide);
    startSlideInterval();
}

// Start the slideshow automatically
startSlideInterval();

// Arrow navigation
document.getElementById('dright').addEventListener('click', nextSlide);
document.getElementById('dleft').addEventListener('click', prevSlide);

// Initial setup
showSlide(currentIndex);
