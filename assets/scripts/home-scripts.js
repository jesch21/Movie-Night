// Slideshow variables
let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const slideInterval = 15000; // 15 seconds
let autoSlide;
let isInitialLoad = true;

// Video variables
let currentVideoIndex = 0;
const videos = [
    /*
    Jayden
    {
        src: 'assets/videos/bullet-train-trailer.mp4',
        title: 'Bullet Train'
    },
    {
        src: 'assets/videos/polar-trailer.mp4',
        title: 'The Polar Express'
    },
    Unseen Roulette
    Ayub
    Joe
    Trevor
    Alex
    Jayden
    Joe
    Unseen Roulette
    Ayub
    Joe
    Trevor
    Alex
    Jayden
    {
        src: 'assets/videos/mission-impossible6-trailer.mp4',
        title: 'Mission Impossible - Fallout'
    },
    Unseen Roulette
    Ayub
    Joe
    Trevor
    Alex
    Jayden
    {
        src: 'assets/videos/mission-impossible5-trailer.mp4',
        title: 'Mission Impossible - Rogue Nation'
    },
    Unseen Roulette
    Ayub
    {
        src: 'assets/videos/jaws-trailer.mp4',
        title: 'Jaws'
    },
    Trevor
    Alex
    Jayden
    {
        src: 'assets/videos/mission-impossible4-trailer.mp4',
        title: 'Mission Impossible - Ghost Protocol'
    },
    {
        src: 'assets/videos/mission-impossible3-trailer.mp4',
        title: 'Mission Impossible III'
    },
    Unseen Roulette
    {
        src: 'assets/videos/mission-impossible2-trailer.mp4',
        title: 'Mission Impossible II'
    },
    Ayub
    Joe
    Trevor
    Alex
    Jayden
    {
        src: 'assets/videos/mission-impossible1-trailer.mp4',
        title: 'Mission Impossible'
    },
    Unseen Roulette
    Ayub
    Joe
    Trevor
    Alex
    Jayden
    {
        src: 'assets/videos/iron-man-trailer.mp4',
        title: 'Iron Man'
    },
    Unseen Roulette
    Ayub
    Joe
    Trevor
    Alex
    Jayden
    {
        src: 'assets/videos/fantastic4-trailer.mp4',
        title: 'The Fantastic Four: First Steps'
    },
    Unseen Roulette
    
    Ayub
    Joe
    {
        src: 'assets/videos/ninjago-trailer.mp4',
        title: 'The Lego Ninjago Movie'
    },
    {
        src: 'assets/videos/lampoon-trailer.mp4',
        title: 'National Lampoon's Christmas Vacation'
    },
    Jayden
    Joe
    Jayden
    Ayub
    Unseen Roulette
    Trevor
    Joe
    {
        src: 'assets/videos/romulus-trailer.mp4',
        title: 'Alien: Romulus'
    },
    {
        src: 'assets/videos/vvitch-trailer.mp4',
        title: 'The Vvitch'
    },
    {
        src: 'assets/videos/sudbury-trailer.mp4',
        title: 'The Sudbury Devil'
    },
    {
        src: 'assets/videos/smile2-trailer.mp4',
        title: 'Smile 2'
    },
    {
        src: 'assets/videos/smile-trailer.mp4',
        title: 'Smile'
    },
    Jayden
    Ayub
    {
        src: 'assets/videos/superman-trailer.mp4',
        title: 'Superman'
    },
    */
   {
        src: 'assets/videos/gladiator2-trailer.mp4',
        title: 'Gladiator II'
    },
   {
        src: 'assets/videos/stalin-trailer.mp4',
        title: 'The Death of Stalin'
    },
   {
        src: 'assets/videos/gentlemen-trailer.mp4',
        title: 'The Gentlemen'
    },
   {
        src: 'assets/videos/terminator2-trailer.mp4',
        title: 'Terminator 2: Judgement Day'
    },
   {
        src: 'assets/videos/ne-zha-trailer.mp4',
        title: 'Ne Zha'
    },
   {
        src: 'assets/videos/gilmore-trailer.mp4',
        title: 'Happy Gilmore'
    },
   {
        src: 'assets/videos/rango-trailer.mp4',
        title: 'Rango'
    },
   {
        src: 'assets/videos/all-dogs-trailer.mp4',
        title: 'All Dogs Go to Heaven'
    },
   {
        src: 'assets/videos/thunderbolts-trailer.mp4',
        title: 'Thunderbolts*'
    },
    {
        src: 'assets/videos/teen-titans-trailer.mp4',
        title: 'Teen Titans GO! To the Movies'
    },
   {
        src: 'assets/videos/anora-trailer.mp4',
        title: 'Anora'
    },
   {
        src: 'assets/videos/sinners-trailer.mp4',
        title: 'Sinners'
    },
   {
        src: 'assets/videos/starship-trailer.mp4',
        title: 'Starship Troopers'
    },
   {
        src: 'assets/videos/blade-trailer.mp4',
        title: 'Blade'
    },
   {
        src: 'assets/videos/interstellar-trailer.mp4',
        title: 'Interstellar'
    },
    {
        src: 'assets/videos/monty2-trailer.mp4',
        title: "Monty Python's Life of Brian"
    },
    {
        src: 'assets/videos/kingsman-trailer.mp4',
        title: 'Kingsman: The Secret Service'
    },
    {
        src: 'assets/videos/transformers3-trailer.mp4',
        title: 'Transformers: Dark of the Moon'
    },
    {
        src: 'assets/videos/lebowski-trailer.mp4',
        title: 'The Big Lebowski'
    },
    {
        src: 'assets/videos/skywalker-trailer.mp4',
        title: "Star Wars: The Rise of Skywalker"
    },
    {
        src: 'assets/videos/ai-trailer.mp4',
        title: "A.I. Artificial Intelligence"
    },
    {
        src: 'assets/videos/tenenbaums-trailer.mp4',
        title: "The Royal Tenenbaums"
    },
    {
        src: 'assets/videos/last-trailer.mp4',
        title: "Star Wars: The Last Jedi"
    },
    {
        src: 'assets/videos/monty1-trailer.mp4',
        title: "Monty Python and the Holy Grail"
    },
    {
        src: 'assets/videos/awakens-trailer.mp4',
        title: "Star Wars: The Force Awakens"
    },
    {
        src: 'assets/videos/ninja-trailer.mp4',
        title: "Ninja Assassin"
    },
    {
        src: 'assets/videos/prey-trailer.mp4',
        title: 'Prey'
    },
    {
        src: 'assets/videos/rogue-trailer.mp4',
        title: "Rogue One: A Star Wars Story"
    },
    {
        src: 'assets/videos/furiosa-trailer.mp4',
        title: "Furiosa: A Mad Max Saga"
    },
    {
        src: 'assets/videos/revenge-trailer.mp4',
        title: "Star Wars: Revenge of the Sith"
    },
    {
        src: 'assets/videos/fantastic-mr-fox-trailer.mp4',
        title: "Fantastic Mr. Fox"
    },
    {
        src: 'assets/videos/heat-trailer.mp4',
        title: "Heat"
    },
   {
        src: 'assets/videos/clones-trailer.mp4',
        title: "Star Wars: Attack of the Clones"
    },
    {
        src: 'assets/videos/transformers2-trailer.mp4',
        title: 'Transformers: Revenge of the Fallen'
    },
    {
        src: 'assets/videos/phantom-trailer.mp4',
        title: "Star Wars: The Phantom Menace"
    },
    {
        src: 'assets/videos/gump-trailer.mp4',
        title: "Forest Gump"
    },
   {
        src: 'assets/videos/return-trailer.mp4',
        title: "Star Wars: Return of the Jedi"
    },
    {
        src: 'assets/videos/matrix-revolutions-trailer.mp4',
        title: 'The Matrix Revolutions'
    },
    {
        src: 'assets/videos/land-trailer.mp4',
        title: "The Land Before Time"
    },
    {
        src: 'assets/videos/empire-trailer.mp4',
        title: "Star Wars: The Empire Strikes Back"
    },
    {
        src: 'assets/videos/ministry-trailer.mp4',
        title: 'The Ministry of Ungentlemenly Warfare'
    },
    {
        src: 'assets/videos/hope-trailer.mp4',
        title: "Star Wars: A New Hope"
    },
    {
        src: 'assets/videos/greyhound-trailer.mp4',
        title: 'Greyhound'
    },
    {
        src: 'assets/videos/hateful-trailer.mp4',
        title: 'The Hateful Eight - Extended Version'
    },
    {
        src: 'assets/videos/drive-trailer.mp4',
        title: "Drive"
    },
    {
        src: 'assets/videos/nightmare-trailer.mp4',
        title: 'The Nightmare Before Christmas'
    },
    {
        src: 'assets/videos/matrix-reloaded-trailer.mp4',
        title: 'The Matrix Reloaded'
    },
    {
        src: 'assets/videos/eight-trailer.mp4',
        title: 'Eight Crazy Nights'
    },
    {
        src: 'assets/videos/transformers-trailer.mp4',
        title: 'Transformers'
    },
    {
        src: 'assets/videos/goodfellas-trailer.mp4',
        title: 'Goodfellas'
    },
    {
        src: 'assets/videos/pearl-trailer.mp4',
        title: 'Pirates of the Caribbean: The Curse of the Black Pearl'
    },
    {
        src: 'assets/videos/crusade-trailer.mp4',
        title: 'Indiana Jones and The Last Crusade'
    },
    {
        src: 'assets/videos/burn-trailer.mp4',
        title: "Burn After Reading"
    },
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
    "Prey",
    "Sinners",
    "Alien: Romulus",
    "Smile",
    "Smile 2",
]

let merryMovies = [
    'The Nightmare Before Christmas',
    'Eight Crazy Nights',
    'Die Hard',
    "National Lampoon's Christmas Vacation",
    'The Polar Express'
]


// Getting the elements for both the slideshow title and the video title
const slideshowTitle = document.getElementById('slideshow-title');

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

document.getElementById('streaming-button').addEventListener('click', function() {
    const streamLinks = document.getElementById('stream-links');
    
    if (streamLinks.style.display === 'none' || streamLinks.style.display === '') {
        streamLinks.style.display = 'flex';  // Show the links in a row
    } else {
        streamLinks.style.display = 'none';  // Hide the links
    }
});