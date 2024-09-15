// Slideshow variables
let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const slideInterval = 30000; // 30 seconds
let autoSlide;

// Video variables
let currentVideoIndex = 0;
const videos = [
    {
        src: 'assets/videos/budapest-trailer.mp4',
        title: 'The Grand Budapest Hotel'
    },
    {
        src: 'assets/videos/collateral-trailer.mp4',
        title: 'Collateral'
    },
    {
        src: 'assets/videos/9-trailer.mp4',
        title: '9'
    },
    {
        src: 'assets/videos/western-front-trailer.mp4',
        title: 'All Quiet on the Western Front'
    },
    {
        src: 'assets/videos/pancreas-trailer.mp4',
        title: 'I Want To Eat Your Pancreas'
    },
    {
        src: 'assets/videos/possession-trailer.mp4',
        title: 'The Possession'
    }
];
const videoSlidesContainer = document.querySelector('.video-slides-container');
const movieNightTitle = document.getElementById('movie-night-title');

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

// Arrow navigation for slideshow
document.getElementById('lright').addEventListener('click', nextSlide);
document.getElementById('lleft').addEventListener('click', prevSlide);

// Initial setup for slideshow
showSlide(currentIndex);

// Function to show a specific video
function showVideo(index) {
    const video = document.createElement('video');
    video.src = videos[index].src;
    video.controls = true;
    video.style.width = '100%';
    video.style.height = 'auto';
    video.style.maxHeight = '80vh';
    video.style.objectFit = 'cover';
    videoSlidesContainer.innerHTML = ''; // Clear previous videos
    videoSlidesContainer.appendChild(video);
    video.load(); // Load the new video

    // Update the subtitle
    movieNightTitle.textContent = `Movie Night: ${videos[index].title}`;
}

// Function to go to the next video
function nextVideo() {
    currentVideoIndex = (currentVideoIndex + 1) % videos.length;
    showVideo(currentVideoIndex);
}

// Function to go to the previous video
function prevVideo() {
    currentVideoIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
    showVideo(currentVideoIndex);
}

// Arrow navigation for videos
document.getElementById('dright').addEventListener('click', nextVideo);
document.getElementById('dleft').addEventListener('click', prevVideo);

// Initial setup for video
showVideo(currentVideoIndex);
