// Slideshow variables
let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const slideInterval = 30000; // 30 seconds
let autoSlide;
let isInitialLoad = true;

// Video variables
let currentVideoIndex = 0;
const videos = [
    /*
    {
        src: 'assets/videos/lampoon-trailer.mp4',
        title: 'National Lampoon's Christmas Vacation'
    },
            jayden
    {
        src: 'assets/videos/violent-trailer.mp4',
        title: 'Violent Night'
    },
            roulette
            garrett
            ayub
            joe
            trevor
            alex
            jayden
    {
        src: 'assets/videos/scary-movie-trailer.mp4',
        title: 'Scary Movie (2000)'
    },
            roulette
            garrett
            ayub
            joe
            trevor
            alex
            jayden
    {
        src: 'assets/videos/guardians3-trailer.mp4',
        title: 'Guardians of the Galaxy Vol. 3'
    },
            roulette
            garrett
            ayub
            joe
            trevor
            alex
            jayden
    {
        src: 'assets/videos/deadpool3-trailer.mp4',
        title: 'Deadpool and Wolverine'
    },
            roulette
            garrett
            ayub
            joe
            trevor
            alex
            jayden
    {
        src: 'assets/videos/logan-trailer.mp4',
        title: 'Logan'
    },
            roulette
            garrett
            ayub
            joe
    {
        src: 'assets/videos/transformers3-trailer.mp4',
        title: 'Transformers: Dark of the Moon'
    },
            alex
            jayden
    {
        src: 'assets/videos/princess-trailer.mp4',
        title: 'The Princess Bride'
    },
            Roulette
            Garrett
    {
        src: 'assets/videos/matrix-revolutions-trailer.mp4',
        title: 'The Matrix Revolutions'
    },
            joe
    {
        src: 'assets/videos/transformers2-trailer.mp4',
        title: 'Transformers: Revenge of the Fallen'
    },
            alex
            jayden
    {
        src: 'assets/videos/ministry-trailer.mp4',
        title: 'The Ministry of Ungentlemenly Warfare'
    },
            Roulette

    {
        src: 'assets/videos/hateful-trailer.mp4',
        title: 'The Hateful Eight - Extended Version'
    },
    {
        src: 'assets/videos/matrix-reloaded-trailer.mp4',
        title: 'The Matrix Reloaded'
    },
    {
        src: 'assets/videos/goodfellas-trailer.mp4',
        title: 'Goodfellas'
    },
    {
        src: 'assets/videos/transformers-trailer.mp4',
        title: 'Transformers'
    },
    {
        src: 'assets/videos/pearl-trailer.mp4',
        title: 'Pirates of the Caribbean: The Curse of the Black Pearl'
    },
    Jayden's movie
    {
        src: 'assets/videos/crusade-trailer.mp4',
        title: 'Indiana Jones and The Last Crusade'
    },
    Garrett's movie
    */
    {
        src: 'assets/videos/dracula-trailer.mp4',
        title: "Bram Stoker's Dracula"
    },
    {
        src: 'assets/videos/scream-trailer.mp4',
        title: 'Scream'
    },
    {
        src: 'assets/videos/28-trailer.mp4',
        title: '28 Days Later'
    },
    {
        src: 'assets/videos/lighthouse-trailer.mp4',
        title: 'The Lighthouse'
    },
    {
        src: 'assets/videos/platform2-trailer.mp4',
        title: 'The Platform 2'
    },
    {
        src: 'assets/videos/conjuring-trailer.mp4',
        title: 'The Conjuring'
    },
    {
        src: 'assets/videos/chainsaw-trailer.mp4',
        title: 'The Texas Chainsaw Massacre'
    },
    {
        src: 'assets/videos/thing-trailer.mp4',
        title: 'The Thing (1982)'
    },
    {
        src: 'assets/videos/ernest-trailer.mp4',
        title: 'Ernest Scared Stupid'
    },
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
        title: 'The Suicide Squad'
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

let spookyMovies = [
    'Ernest Scared Stupid',
    'The Thing (1982)',
    'The Texas Chainsaw Massacre',
    'The Conjuring',
    'The Platform 2',
    'The Lighthouse',
    '28 Days Later',
    'Scream',
    "Bram Stoker's Dracula",
    "Scary Movie (2000)",
]

let merryMovies = [
    'Violent Night',
    "National Lampoon's Christmas Vacation",
]

const videoSlidesContainer = document.querySelector('.video-slides-container');

// Getting the elements for both the slideshow title and the video title
const slideshowTitle = document.getElementById('slideshow-title');
const videoTitle = document.getElementById('video-title');

function revealArrows() {
    document.getElementById('lleft').style.opacity = '60%';
    document.getElementById('lright').style.opacity = '60%';
}

function hideArrows() {
    document.getElementById('lleft').style.opacity = '0%';
    document.getElementById('lright').style.opacity = '0%';
}

function isSpooky(title) {
    return spookyMovies.includes(title);
}

function isMerry(title) {
    return merryMovies.includes(title);
}

function showSlide(index) {
    const slidesContainer = document.querySelector('.slides-container');
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;

    // If it's the initial load, update the title immediately without fade
    if (isInitialLoad) {
        slideshowTitle.textContent = `${videos[index].title}`;
        isInitialLoad = false;
    } else {
        // Fade out the title before changing it
        slideshowTitle.style.opacity = 0;

        // Wait for 0.5 seconds (fade-out duration) before changing the title
        setTimeout(function() {
            slideshowTitle.textContent = `${videos[index].title}`;

            // Fade the title back in after it's updated
            slideshowTitle.style.opacity = 1;
        }, 500);  // Delay for 0.5 seconds
    }

    if (isSpooky(videos[index].title)) {
        slideshowTitle.style.fontFamily = "Nosifer";
        slideshowTitle.style.letterSpacing = "3px";
        slideshowTitle.style.fontWeight = "lighter";
    } else if(isMerry(videos[index].title)) {
        slideshowTitle.style.fontFamily = "Mountains of Christmas";
        slideshowTitle.style.letterSpacing = "3px";
        slideshowTitle.style.fontWeight = "bold";
        slideshowTitle.style.fontSize = "35px";
    }
    else {
        // Reset to default font styles if not spooky or merry
        slideshowTitle.style.fontFamily = "";
        slideshowTitle.style.letterSpacing = "";
        slideshowTitle.style.fontWeight = "";
    }

    if (isSpooky(videos[index].title)) {
        videoTitle.style.fontFamily = "Nosifer";
        videoTitle.style.letterSpacing = "3px";
        videoTitle.style.fontWeight = "lighter";
    } else if(isMerry(videos[index].title)) {
        videoTitle.style.fontFamily = "Mountains of Christmas";
        videoTitle.style.letterSpacing = "3px";
        videoTitle.style.fontWeight = "bold";
        videoTitle.style.fontSize = "35px";
    }
    else {
        // Reset to default font styles if not spooky or merry
        videoTitle.style.fontFamily = "";
        videoTitle.style.letterSpacing = "";
        videoTitle.style.fontWeight = "";
    }
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

    // Update the video title only
    videoTitle.textContent = `${videos[index].title}`;

    if (isSpooky(videos[index].title)) {
        slideshowTitle.style.fontFamily = "Nosifer";
        slideshowTitle.style.letterSpacing = "3px";
        slideshowTitle.style.fontWeight = "lighter";
    } else if(isMerry(videos[index].title)) {
        slideshowTitle.style.fontFamily = "Mountains of Christmas";
        slideshowTitle.style.letterSpacing = "3px";
        slideshowTitle.style.fontWeight = "bold";
        slideshowTitle.style.fontSize = "35px";
    }
    else {
        // Reset to default font styles if not spooky or merry
        slideshowTitle.style.fontFamily = "";
        slideshowTitle.style.letterSpacing = "";
        slideshowTitle.style.fontWeight = "";
    }

    if (isSpooky(videos[index].title)) {
        videoTitle.style.fontFamily = "Nosifer";
        videoTitle.style.letterSpacing = "3px";
        videoTitle.style.fontWeight = "lighter";
    } else if(isMerry(videos[index].title)) {
        videoTitle.style.fontFamily = "Mountains of Christmas";
        videoTitle.style.letterSpacing = "3px";
        videoTitle.style.fontWeight = "bold";
        videoTitle.style.fontSize = "35px";
    }
    else {
        // Reset to default font styles if not spooky or merry
        videoTitle.style.fontFamily = "";
        videoTitle.style.letterSpacing = "";
        videoTitle.style.fontWeight = "";
    }
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