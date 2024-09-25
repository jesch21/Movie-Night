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
        src: 'assets/videos/godzilla-trailer.mp4',
        title: 'Godzilla Minus One'
    },
    {
        src: 'assets/videos/sherlock-trailer.mp4',
        title: 'Sherlock Holmes (2009)'
    },
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
    },
    {
        src: 'assets/videos/mid90s-trailer.mp4',
        title: 'Mid 90s'
    },
    {
        src: 'assets/videos/fmj-trailer.mp4',
        title: 'Full Metal Jacket'
    },
    {
        src: 'assets/videos/high-and-low-trailer.mp4',
        title: 'High and Low'
    },
    {
        src: 'assets/videos/wick-trailer.mp4',
        title: 'John Wick'
    },
    {
        src: 'assets/videos/gladiator-trailer.mp4',
        title: 'Gladiator'
    },
    {
        src: 'assets/videos/henry-trailer.mp4',
        title: 'Hardcore Henry'
    },
    {
        src: 'assets/videos/suicide-trailer.mp4',
        title: 'The Suicide Squad Trailer'
    },
    {
        src: 'assets/videos/gems-trailer.mp4',
        title: 'Uncut Gems'
    },
    {
        src: 'assets/videos/commander-trailer.mp4',
        title: 'Master and Commander: The Far Side of the World'
    },
    {
        src: 'assets/videos/mad-max-trailer.mp4',
        title: 'Mad Max: Fury Road'
    },
    {
        src: 'assets/videos/jarhead-trailer.mp4',
        title: 'Jarhead'
    },
    {
        src: 'assets/videos/kill-bill-trailer.mp4',
        title: 'Kill Bill Vol. 1'
    },
    {
        src: 'assets/videos/midsommar-trailer.mp4',
        title: 'Midsommar'
    },
    {
        src: 'assets/videos/leben-trailer.mp4',
        title: 'Das Leben der Anderan'
    },
    {
        src: 'assets/videos/fight-club-trailer.mp4',
        title: 'Fight Club'
    },
    {
        src: 'assets/videos/beautiful-mind-trailer.mp4',
        title: 'A Beautiful Mind'
    },
    {
        src: 'assets/videos/sanjuro-trailer.mp4',
        title: 'Sanjuro'
    },
    {
        src: 'assets/videos/aot-trailer.mp4',
        title: 'Attack on Titan: The Final Chapter Part 1'
    },
    {
        src: 'assets/videos/click-trailer.mp4',
        title: 'Click'
    },
    {
        src: 'assets/videos/raiders-trailer.mp4',
        title: 'Indiana Jones: Raiders of the Lost Ark'
    },
    {
        src: 'assets/videos/se7en-trailer.mp4',
        title: 'Se7en'
    },
    {
        src: 'assets/videos/mononoke-trailer.mp4',
        title: 'Princess Mononoke'
    },
    {
        src: 'assets/videos/yojimbo-trailer.mp4',
        title: 'Yojimbo'
    },
    {
        src: 'assets/videos/platform-trailer.mp4',
        title: 'The Platform'
    },
    {
        src: 'assets/videos/cloverfield-trailer.mp4',
        title: 'Cloverfield'
    },
    {
        src: 'assets/videos/silent-trailer.mp4',
        title: 'A Silent Voice'
    },
    {
        src: 'assets/videos/batman-trailer.mp4',
        title: 'The Batman'
    },
    {
        src: 'assets/videos/angels-trailer.mp4',
        title: 'Fallen Angels'
    },
    {
        src: 'assets/videos/terminator-trailer.mp4',
        title: 'The Terminator'
    },
    {
        src: 'assets/videos/matrix-trailer.mp4',
        title: 'The Matrix'
    },
    {
        src: 'assets/videos/truman-trailer.mp4',
        title: 'The Truman Show'
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

document.getElementById('streaming-button').addEventListener('click', function() {
    const streamLinks = document.getElementById('stream-links');
    
    if (streamLinks.style.display === 'none' || streamLinks.style.display === '') {
        streamLinks.style.display = 'flex';  // Show the links in a row
    } else {
        streamLinks.style.display = 'none';  // Hide the links
    }
});
