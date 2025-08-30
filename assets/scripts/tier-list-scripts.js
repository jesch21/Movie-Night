const movieData = [
    /*
    {
      "title": "",
      "chosenBy": ["Jayden"],
      "star-ratings": [],
      "date": "12-2026"
    },
    {
      "title": "Bullet Train",
      "chosenBy": ["John"],
      "star-ratings": [],
      "date": "12-2026"
    },
    {
      "title": "The Polar Express",
      "chosenBy": ["John"],
      "star-ratings": [],
      "date": "12-2026"
    },
    {
      "title": "",
      "chosenBy": [""],
      "star-ratings": [],
      "date": "12-2026"
    },
    {
      "title": "",
      "chosenBy": ["Ayub"],
      "star-ratings": [],
      "date": "12-2026"
    },
    {
      "title": "",
      "chosenBy": ["Joe"],
      "star-ratings": [],
      "date": "11-2026"
    },
    {
      "title": "",
      "chosenBy": ["Trevor"],
      "star-ratings": [],
      "date": "11-2026"
    },
    {
      "title": "",
      "chosenBy": ["Alex"],
      "star-ratings": [],
      "date": "11-2026"
    },
    {
      "title": "",
      "chosenBy": ["Jayden"],
      "star-ratings": [],
      "date": "11-2026"
    },
    {
      "title": "",
      "chosenBy": ["Joe"],
      "star-ratings": [],
      "date": "10-2026"
    },
    {
      "title": "",
      "chosenBy": [""],
      "star-ratings": [],
      "date": "10-2026"
    },
    {
      "title": "",
      "chosenBy": ["Ayub"],
      "star-ratings": [],
      "date": "10-2026"
    },
    {
      "title": "",
      "chosenBy": ["Joe"],
      "star-ratings": [],
      "date": "10-2026"
    },
    {
      "title": "",
      "chosenBy": ["Trevor"],
      "star-ratings": [],
      "date": "10-2026"
    },
    {
      "title": "",
      "chosenBy": ["Alex"],
      "star-ratings": [],
      "date": "09-2026"
    },
    {
      "title": "",
      "chosenBy": ["Jayden"],
      "star-ratings": [],
      "date": "09-2026"
    },
    {
      "title": "Mission Impossible - Fallout",
      "chosenBy": ["John"],
      "star-ratings": [],
      "date": "09-2026"
    },
    {
      "title": "",
      "chosenBy": [""],
      "star-ratings": [],
      "date": "09-2026"
    },
    {
      "title": "",
      "chosenBy": ["Ayub"],
      "star-ratings": [],
      "date": "08-2026"
    },
    {
      "title": "",
      "chosenBy": ["Joe"],
      "star-ratings": [],
      "date": "08-2026"
    },
    {
      "title": "",
      "chosenBy": ["Trevor"],
      "star-ratings": [],
      "date": "08-2026"
    },
    {
      "title": "",
      "chosenBy": ["Alex"],
      "star-ratings": [],
      "date": "08-2026"
    },
    {
      "title": "",
      "chosenBy": ["Jayden"],
      "star-ratings": [],
      "date": "07-2026"
    },
    {
      "title": "Mission Impossible - Rogue Nation",
      "chosenBy": ["John"],
      "star-ratings": [],
      "date": "07-2026"
    },
    {
      "title": "",
      "chosenBy": [""],
      "star-ratings": [],
      "date": "07-2026"
    },
    {
      "title": "",
      "chosenBy": ["Ayub"],
      "star-ratings": [],
      "date": "07-2026"
    },
    {
      "title": "Jaws",
      "chosenBy": ["John"],
      "star-ratings": [],
      "date": "07-2026"
    },
    {
      "title": "",
      "chosenBy": ["Trevor"],
      "star-ratings": [],
      "date": "06-2026"
    },
    {
      "title": "",
      "chosenBy": ["Alex"],
      "star-ratings": [],
      "date": "06-2026"
    },
    {
      "title": "",
      "chosenBy": ["Jayden"],
      "star-ratings": [],
      "date": "06-2026"
    },
    {
      "title": "Mission Impossible - Ghost Protocol",
      "chosenBy": ["John"],
      "star-ratings": [],
      "date": "06-2026"
    },
    {
      "title": "Mission Impossible III",
      "chosenBy": ["John"],
      "star-ratings": [],
      "date": "06-2026"
    },
    {
      "title": "",
      "chosenBy": [""],
      "star-ratings": [],
      "date": "05-2026"
    },
    {
      "title": "Mission Impossible II",
      "chosenBy": ["John"],
      "star-ratings": [],
      "date": "05-2026"
    },
    {
      "title": "",
      "chosenBy": ["Ayub"],
      "star-ratings": [],
      "date": "05-2026"
    },
    {
      "title": "",
      "chosenBy": ["Joe"],
      "star-ratings": [],
      "date": "05-2026"
    },
    {
      "title": "",
      "chosenBy": ["Trevor"],
      "star-ratings": [],
      "date": "05-2026"
    },
    {
      "title": "",
      "chosenBy": ["Alex"],
      "star-ratings": [],
      "date": "05-2026"
    },
    {
      "title": "",
      "chosenBy": ["Jayden"],
      "star-ratings": [],
      "date": "04-2026"
    },
    {
      "title": "Mission Impossible",
      "chosenBy": ["John"],
      "star-ratings": [],
      "date": "04-2026"
    },
    {
      "title": "",
      "chosenBy": [""],
      "star-ratings": [],
      "date": "04-2026"
    },
    {
      "title": "",
      "chosenBy": ["Ayub"],
      "star-ratings": [],
      "date": "04-2026"
    },
    {
      "title": "",
      "chosenBy": ["Joe"],
      "star-ratings": [],
      "date": "03-2026"
    },
    {
      "title": "",
      "chosenBy": ["Trevor"],
      "star-ratings": [],
      "date": "03-2026"
    },
    {
      "title": "",
      "chosenBy": ["Alex"],
      "star-ratings": [],
      "date": "03-2026"
    },
    {
      "title": "",
      "chosenBy": ["Jayden"],
      "star-ratings": [],
      "date": "03-2026"
    },
    {
      "title": "Iron Man",
      "chosenBy": ["John"],
      "star-ratings": [],
      "date": "02-2026"
    },
    {
      "title": "",
      "chosenBy": [""],
      "star-ratings": [],
      "date": "02-2026"
    },
    {
      "title": "",
      "chosenBy": ["Ayub"],
      "star-ratings": [],
      "date": "02-2026"
    },
    {
      "title": "",
      "chosenBy": ["Joe"],
      "star-ratings": [],
      "date": "02-2026"
    },
    {
      "title": "",
      "chosenBy": ["Trevor"],
      "star-ratings": [],
      "date": "01-2026"
    },
    {
      "title": "",
      "chosenBy": ["Alex"],
      "star-ratings": [],
      "date": "01-2026"
    },
    {
      "title": "",
      "chosenBy": ["Jayden"],
      "star-ratings": [],
      "date": "01-2026"
    },
    {
      "title": "The Fantastic Four: First Steps",
      "chosenBy": ["John"],
      "star-ratings": [],
      "date": "01-2026"
    },
    {
      "title": "",
      "chosenBy": [""],
      "star-ratings": [],
      "date": "01-2026"
    }
      
    {
      "title": "",
      "chosenBy": ["Ayub"],
      "star-ratings": [],
      "date": "12-2025"
    },
    {
      "title": "",
      "chosenBy": ["Joe"],
      "star-ratings": [],
      "date": "12-2025"
    },
    {
      "title": "The Lego Ninjago Movie",
      "chosenBy": ["Trevor"],
      "star-ratings": [],
      "date": "12-2025"
    },
    {
      "title": "National Lampoon's Christmas Vacation",
      "chosenBy": ["Alex"],
      "star-ratings": [],
      "date": "12-2025"
    },
    {
      "title": "",
      "chosenBy": ["Jayden"],
      "star-ratings": [],
      "date": "11-2025"
    },
    {
      "title": "",
      "chosenBy": ["Joe"],
      "star-ratings": [],
      "date": "11-2025"
    },
    {
      "title": "",
      "chosenBy": ["Jayden"],
      "star-ratings": [],
      "date": "11-2025"
    },
    {
      "title": "",
      "chosenBy": ["Ayub"],
      "star-ratings": [],
      "date": "11-2025"
    },
    {
      "title": "",
      "chosenBy": [""],
      "star-ratings": [],
      "date": "10-2025"
    },
    {
      "title": "",
      "chosenBy": ["Trevor"],
      "star-ratings": [],
      "date": "10-2025"
    },
    {
      "title": "",
      "chosenBy": ["Joe"],
      "star-ratings": [],
      "date": "10-2025"
    },
    {
      "title": "Alien: Romulus",
      "chosenBy": ["John"],
      "star-ratings": [],
      "date": "10-2025"
    },
    {
      "title": "The Vvitch",
      "chosenBy": ["Alex"],
      "star-ratings": [],
      "date": "10-2025"
    },
    {
      "title": "The Sudbury Devil",
      "chosenBy": ["Alex"],
      "star-ratings": [],
      "date": "10-2025"
    },
    {
      "title": "Smile 2",
      "chosenBy": ["John"],
      "star-ratings": [],
      "date": "10-2025"
    },
    {
      "title": "Smile",
      "chosenBy": ["John"],
      "star-ratings": [],
      "date": "10-2025"
    },
    {
      "title": "",
      "chosenBy": ["Jayden"],
      "star-ratings": [],
      "date": "9-2025"
    },
    {
      "title": "",
      "chosenBy": ["Ayub"],
      "star-ratings": [],
      "date": "9-2025"
    },
    {
      "title": "Superman",
      "chosenBy": ["John"],
      "star-ratings": [],
      "date": "9-2025"
    },
    {
      "title": "Gladiator II",
      "chosenBy": ["Trevor"],
      "star-ratings": [],
      "date": "9-2025"
    },
    */
    {
      "title": "The Death of Stalin",
      "chosenBy": ["Alex"],
      "star-ratings": ["4/5", "2/5", "2.5/5", "1/5"],
      "date": "8-2025"
    },
   { 
      "title": "The Gentlemen", 
      "chosenBy": ["Alex"], 
      "star-ratings": ["3.5/5", "2.5/5", "1.5/5", "4/5"],
      "date": "8-2025"
    },
   { 
      "title": "Terminator 2: Judgement Day", 
      "chosenBy": ["John"], 
      "star-ratings": ["3.5/5", "2.5/5", "4/5", "4/5"],
      "date": "8-2025"
    },
   { 
      "title": "Ne Zha", 
      "chosenBy": ["Ayub"], 
      "star-ratings": ["4/5", "4/5", "3/5", "4/5", "2.5/5"],
      "date": "8-2025"
    },
   { 
      "title": "Happy Gilmore", 
      "chosenBy": ["Joe"], 
      "star-ratings": ["2.5/5", "1.5/5", "4/5", "2.5/5", "2/5"],
      "date": "8-2025"
    },
   { 
      "title": "Rango", 
      "chosenBy": ["Alex"], 
      "star-ratings": ["5/5", "4/5", "4/5", "4/5", "4.5/5"],
      "date": "7-2025"
    },
   { 
      "title": "All Dogs Go to Heaven", 
      "chosenBy": ["Jayden"], 
      "star-ratings": ["2/5", "0.5/5", "2.5/5", "2.5/5"],
      "date": "7-2025"
    },
   { 
      "title": "Thunderbolts*", 
      "chosenBy": ["John"], 
      "star-ratings": ["3/5", "2.5/5", "5/5", "2/5", "2/5"],
      "date": "7-2025"
    },
   { 
      "title": "Teen Titans GO! To the Movies", 
      "chosenBy": ["Trevor"], 
      "star-ratings": ["4/5", "3/5", "1.5/5", "4.5/5"],
      "date": "6-2025"
    },
   { 
      "title": "Anora", 
      "chosenBy": ["Garrett"], 
      "star-ratings": ["1/5", "4/5", "3.5/5", "2.5/5", "3/5"],
      "date": "6-2025"
    },
   { 
      "title": "Sinners", 
      "chosenBy": ["Ayub"], 
      "star-ratings": ["5/5", "5/5", "4/5", "4/5", "4/5"],
      "date": "6-2025"
    },
   { 
      "title": "Starship Troopers", 
      "chosenBy": ["Joe"], 
      "star-ratings": ["3.5/5", "2.5/5", "4.5/5", "3.5/5", "3/5"],
      "date": "5-2025"
    },
   { 
      "title": "Blade", 
      "chosenBy": ["Joe"], 
      "star-ratings": ["3.5/5", "3/5", "2.5/5", "2.5/5"],
      "date": "5-2025"
    },
   { 
      "title": "Interstellar", 
      "chosenBy": ["Trevor"], 
      "star-ratings": ["4.5/5", "4.5/5", "4.5/5", "3.5/5", "4.5/5"],
      "date": "5-2025"
    },
   { 
      "title": "Monty Python's Life of Brian", 
      "chosenBy": ["Alex"], 
      "star-ratings": ["4/5", "4/5", "3.5/5", "3.5/5", "2.5/5"],
      "date": "5-2025"
    },
    { 
      "title": "Kingsman: The Secret Service", 
      "chosenBy": ["John"], 
      "star-ratings": ["4.5/5", "2.5/5", "2/5"],
      "date": "5-2025"
    },
    { 
      "title": "Transformers: Dark of the Moon", 
      "chosenBy": ["Trevor"], 
      "star-ratings": ["1.5/5", "3/5", "2/5", "1.5/5", "3/5", "3/5"],
      "date": "4-2025"
    },
    { 
      "title": "The Big Lebowski", 
      "chosenBy": ["Garrett"], 
      "star-ratings": ["2.5/5", "4.5/5", "5/5", "4/5", "4/5"],
      "date": "4-2025"
    },
    { 
      "title": "Star Wars: The Rise of Skywalker", 
      "chosenBy": ["John"], 
      "star-ratings": ["0.5/5", "1/5", "1/5", "1/5", "2/5"],
      "date": "4-2025"
    },
    { 
      "title": "A.I. Artificial Intelligence", 
      "chosenBy": ["Joe"], 
      "star-ratings": ["1.5/5", "4.5/5", "5/5", "4/5"],
      "date": "4-2025"
    },
    { 
      "title": "The Royal Tenenbaums", 
      "chosenBy": ["Ayub"], 
      "star-ratings": ["3.5/5", "5/5", "5/5", "3/5", "1.5/5"],
      "date": "4-2025"
    },
    { 
      "title": "Star Wars: The Last Jedi", 
      "chosenBy": ["John"], 
      "star-ratings": ["0.5/5", "3/5", "2.5/5", "3/5", "1.5/5"],
      "date": "3-2025"
    },
    { 
      "title": "Monty Python and the Holy Grail", 
      "chosenBy": ["Alex"], 
      "star-ratings": ["4/5", "3/5", "3.5/5", "4/5"],
      "date": "3-2025"
    },
    { 
      "title": "Star Wars: The Force Awakens", 
      "chosenBy": ["John"], 
      "star-ratings": ["2/5", "2/5", "2/5", "3/5", "2.5/5"],
      "date": "3-2025"
    },
    { 
      "title": "Ninja Assassin", 
      "chosenBy": ["Jayden"], 
      "star-ratings": ["3.5/5", "2.5/5", "3.5/5", "2.5/5"],
      "date": "3-2025"
    },
    { 
      "title": "Prey", 
      "chosenBy": ["John"], 
      "star-ratings": ["2/5", "4/5", "2.5/5", "2.5/5"],
      "date": "3-2025"
    },
    { 
      "title": "Rogue One: A Star Wars Story", 
      "chosenBy": ["John"], 
      "star-ratings": ["5/5", "4/5", "2.5/5", "2.5/5", "2.5/5"],
      "date": "3-2025"
    },
    { 
      "title": "Furiosa: A Mad Max Saga", 
      "chosenBy": ["Ayub"], 
      "star-ratings": ["5/5", "5/5", "3.5/5", "3/5"],
      "date": "2-2025"
    },
    { 
      "title": "Star Wars: Revenge of the Sith", 
      "chosenBy": ["John"], 
      "star-ratings": ["4.5/5", "4/5", "3.5/5", "4/5", "4/5"],
      "date": "2-2025"
    },
    { 
      "title": "Fantastic Mr. Fox", 
      "chosenBy": ["Ayub"], 
      "star-ratings": ["5/5", "4.5/5", "4.5/5", "3.5/5"],
      "date": "2-2025"
    },
    { 
      "title": "Heat", 
      "chosenBy": ["Joe"], 
      "star-ratings": ["5/5", "5/5", "2.5/5", "3.5/5"],
      "date": "2-2025"
    },
    { 
      "title": "Star Wars: Attack of the Clones", 
      "chosenBy": ["John"], 
      "star-ratings": ["1/5", "3/5", "3/5", "2.5/5", "1.5/5"],
      "date": "2-2025"
    },
    { 
      "title": "Transformers: Revenge of the Fallen", 
      "chosenBy": ["Trevor"], 
      "star-ratings": ["1.5/5", "2.5/5", "2/5", "2.5/5", "3.5/5"],
      "date": "1-2025"
    },
    { 
      "title": "Star Wars: The Phantom Menace", 
      "chosenBy": ["John"], 
      "star-ratings": ["3/5", "2.5/5", "3/5", "2.5/5", "2.5/5"],
      "date": "1-2025"
    },
    { 
      "title": "Forest Gump", 
      "chosenBy": ["John"], 
      "star-ratings": ["4/5", "3/5", "3/5", "4/5"],
      "date": "1-2025"
    },
    { 
      "title": "Star Wars: Return of the Jedi", 
      "chosenBy": ["John"], 
      "star-ratings": ["4.5/5", "4/5", "4/5", "3.5/5", "4/5"],
      "date": "1-2025"
    },
    { 
      "title": "The Matrix Revolutions", 
      "chosenBy": ["Ayub"], 
      "star-ratings": ["3/5", "5/5", "4/5", "4.5/5"],
      "date": "1-2025"
    },
    { 
      "title": "The Land Before Time", 
      "chosenBy": ["Jayden"], 
      "star-ratings": ["2.5/5", "4/5", "3.5/5", "3.5/5"],
      "date": "1-2025"
    },
    { 
      "title": "Star Wars: The Empire Strikes Back", 
      "chosenBy": ["John"], 
      "star-ratings": ["5/5", "4.5/5", "4/5", "4/5", "4/5", "5/5"],
      "date": "1-2025"
    },
    { 
      "title": "The Ministry of Ungentlemenly Warfare", 
      "chosenBy": ["John"], 
      "star-ratings": ["4/5", "2.5/5", "2.5/5", "2.5/5"],
      "date": "1-2025"
    },
    { 
      "title": "Star Wars: A New Hope", 
      "chosenBy": ["John"], 
      "star-ratings": ["4/5", "3/5", "4.5/5", "4/5", "4.5/5"],
      "date": "1-2025"
    },
    { 
      "title": "Greyhound", 
      "chosenBy": ["Alex"], 
      "star-ratings": ["3.5/5", "4/5", "3/5", "3/5"],
      "date": "1-2025"
    },
    { 
      "title": "The Hateful Eight - Extended Version", 
      "chosenBy": ["Garrett"], 
      "star-ratings": ["4/5", "4.5/5", "4.5/5"],
      "date": "12-2024"
    },
    { 
      "title": "Drive", 
      "chosenBy": ["Joe"], 
      "star-ratings": ["3.5/5", "4/5", "4/5", "1.5/5"],
      "date": "12-2024"
    },
    { 
      "title": "The Nightmare Before Christmas", 
      "chosenBy": ["John", "Ayub"], 
      "star-ratings": ["3.5/5", "4.5/5", "4.5/5"],
      "date": "12-2024"
    },
    { 
      "title": "The Matrix Reloaded", 
      "chosenBy": ["Ayub"], 
      "star-ratings": ["3.5/5", "4/5", "5/5", "5/5"],
      "date": "12-2024"
    },
    { 
      "title": "Eight Crazy Nights", 
      "chosenBy": ["Jayden"], 
      "star-ratings": ["2.5/5", "1/5", "2.5/5", "3/5", "4/5"],
      "date": "12-2024"
    },
    { 
      "title": "Transformers", 
      "chosenBy": ["Trevor"], 
      "star-ratings": ["2.5/5", "2/5", "2.5/5", "2.5/5", "1.5/5"],
      "date": "12-2024"
    },
    { 
      "title": "Goodfellas", 
      "chosenBy": ["Joe"], 
      "star-ratings": ["5/5", "4.5/5", "5/5", "3.5/5", "2.5/5"],
      "date": "11-2024"
    },
    { 
      "title": "Pirates of the Caribbean: The Curse of the Black Pearl", 
      "chosenBy": ["Alex"], 
      "star-ratings": ["4/5", "4.5/5", "4/5", "4/5", "4/5"],
      "date": "11-2024"
    },
    { 
      "title": "Indiana Jones and The Last Crusade", 
      "chosenBy": ["John"], 
      "star-ratings": ["5/5", "4.5/5", "3.5/5", "4/5"],
      "date": "11-2024"
    },
    { 
      "title": "Burn After Reading", 
      "chosenBy": ["Garrett"], 
      "star-ratings": ["3.5/5", "4.5/5", "4.5/5", "4/5", "4.5/5"],
      "date": "11-2024"
    },
    { 
      "title": "Bram Stoker's Dracula", 
      "chosenBy": ["Ayub"], 
      "star-ratings": ["4.5/5", "1.5/5", "5/5", "5/5", "1.5/5"],
      "date": "11-2024"
    },
    { 
      "title": "Scream", 
      "chosenBy": ["John"], 
      "star-ratings": ["4.5/5", "4.5/5", "5/5"],
      "date": "10-2024"
    },
    { 
      "title": "28 Days Later", 
      "chosenBy": ["Trevor"], 
      "star-ratings": ["2.5/5", "4/5", "3.5/5", "4.5/5"],
      "date": "10-2024"
    },
    { 
      "title": "The Lighthouse", 
      "chosenBy": ["Joe"], 
      "star-ratings": ["4.5/5", "4.5/5", "4.5/5", "4.5/5", "4.5/5"],
      "date": "10-2024"
    },
    { 
      "title": "The Platform 2", 
      "chosenBy": ["Trevor"], 
      "star-ratings": ["1/5", "2/5", "1.5/5", "1.5/5"],
      "date": "10-2024"
    },
    { 
      "title": "The Conjuring", 
      "chosenBy": ["Trevor"], 
      "star-ratings": ["4.5/5", "4.5/5", "4.5/5", "4/5", "3/5"],
      "date": "10-2024"
    },
    { 
      "title": "The Texas Chainsaw Massacre", 
      "chosenBy": ["Ayub"], 
      "star-ratings": ["4.5/5", "5/5", "4/5", "2.5/5", "4/5"],
      "date": "10-2024"
    },
    { 
      "title": "The Thing (1982)", 
      "chosenBy": ["Alex"], 
      "star-ratings": ["5/5", "4/5", "5/5", "4/5", "3/5"],
      "date": "10-2024"
    },
    { 
      "title": "Ernest Scared Stupid", 
      "chosenBy": ["Jayden"], 
      "star-ratings": ["2.5/5", "1/5", "2.5/5", "2.5/5", "1.5/5"],
      "date": "10-2024"
    },
    { 
      "title": "Godzilla: Minus One", 
      "chosenBy": ["John"], 
      "star-ratings": ["5/5", "2.5/5", "4/5", "4/5", "4/5"],
      "date": "9-2024"
    },
    { 
      "title": "Sherlock Holmes (2009)", 
      "chosenBy": ["John"], 
      "star-ratings": ["3.5/5", "3.5/5", "3.5/5", "4/5"],
      "date": "9-2024"
    },
    { 
      "title": "The Truman Show", 
      "chosenBy": ["Trevor"], 
      "star-ratings": ["3.5/5", "4/5", "3.5/5", "3.5/5", "3.5/5", "4.5/5"],
      "date": "12-2023"
    },
    { 
      "title": "The Matrix", 
      "chosenBy": ["Ayub", "Joe", "Garrett"], 
      "star-ratings": ["5/5", "5/5", "4/5", "5/5"],
      "date": "1-2024"
    },
    { 
      "title": "The Terminator", 
      "chosenBy": ["Ayub"], 
      "star-ratings": ["3.5/5", "3.5/5", "2.5/5", "2.5/5"],
      "date": "1-2024"
    },
    { 
      "title": "Fallen Angels", 
      "chosenBy": ["Garrett"], 
      "star-ratings": ["4.5/5", "4/5", "1/5", "1.5/5", "5/5"],
      "date": "1-2024"
    },
    { 
      "title": "The Batman", 
      "chosenBy": ["John"], 
      "star-ratings": ["5/5", "4/5", "5/5", "3.5/5", "5/5"],
      "date": "1-2024"
    },
    { 
      "title": "A Silent Voice", 
      "chosenBy": ["Jayden"], 
      "star-ratings": ["3.5/5", "5/5", "4.5/5", "5/5"],
      "date": "2-2024"
    },
    { 
      "title": "Cloverfield", 
      "chosenBy": ["Landon"], 
      "star-ratings": ["2.5/5", "3.5/5", "2.5/5", "3.5/5", "4/5"],
      "date": "2-2024"
    },
    { 
      "title": "The Platform", 
      "chosenBy": ["Trevor"], 
      "star-ratings": ["3/5", "2.5/5", "2/5", "2/5", "3.5/5", "4/5"],
      "date": "2-2024"
    },
    { 
      "title": "Yojimbo", 
      "chosenBy": ["Joe"], 
      "star-ratings": ["4/5", "4/5", "5/5", "2.5/5"],
      "date": "2-2024"
    },
    { 
      "title": "Princess Mononoke", 
      "chosenBy": ["Ayub"], 
      "star-ratings": ["5/5", "4.5/5", "2/5", "4/5"],
      "date": "3-2024"
    },
    { 
      "title": "Se7en", 
      "chosenBy": ["Garrett"], 
      "star-ratings": ["5/5", "4.5/5", "4.5/5", "5/5", "4/5"],
      "date": "3-2024"
    },
    { 
      "title": "Indiana Jones: Raiders of the Lost Ark", 
      "chosenBy": ["John"], 
      "star-ratings": ["4/5", "4.5/5", "5/5", "4.5/5", "2.5/5"],
      "date": "3-2024"
    },
    { 
      "title": "Click", 
      "chosenBy": ["Jayden"], 
      "star-ratings": ["2.5/5", "3/5", "3/5", "3/5", "4/5"],
      "date": "3-2024"
    },
    { 
      "title": "Attack on Titan The Final Chapter Part 1", 
      "chosenBy": ["Ayub", "John"], 
      "star-ratings": ["4.5/5", "3/5"],
      "date": "3-2024"
    },
    { 
      "title": "Sanjuro", 
      "chosenBy": ["Joe"], 
      "star-ratings": ["3/5", "4/5", "3/5", "2/5"],
      "date": "4-2024"
    },
    { 
      "title": "A Beautiful Mind", 
      "chosenBy": ["Landon"], 
      "star-ratings": ["2/5", "2/5", "3/5", "2/5"],
      "date": "4-2024"
    },
    { 
      "title": "Fight Club", 
      "chosenBy": ["Garrett"], 
      "star-ratings": ["4/5", "4/5", "4.5/5", "4/5"],
      "date": "4-2024"
    },
    { 
      "title": "Das Leben der Anderan", 
      "chosenBy": ["John"], 
      "star-ratings": ["1/5", "0.5/5", "2/5", "1/5"],
      "date": "5-2024"
    },
    { 
      "title": "Midsommar", 
      "chosenBy": ["Trevor"], 
      "star-ratings": ["4.5/5", "3.5/5", "2.5/5", "4/5"],
      "date": "5-2024"
    },
    { 
      "title": "Kill Bill Vol. 1", 
      "chosenBy": ["Ayub"], 
      "star-ratings": ["4/5", "4.5/5", "4.5/5", "2.5/5", "3/5"],
      "date": "5-2024"
    },
    { 
      "title": "Jarhead", 
      "chosenBy": ["Jayden"], 
      "star-ratings": ["4/5", "2.5/5", "2.5/5", "3/5", "3.5/5"],
      "date": "5-2024"
    },
    { 
      "title": "Mad Max: Fury Road", 
      "chosenBy": ["Joe"], 
      "star-ratings": ["4.5/5", "5/5", "5/5", "3.5/5", "5/5"],
      "date": "5-2024"
    },
    { 
      "title": "Master and Commander: The Far Side of the World", 
      "chosenBy": ["Alex"], 
      "star-ratings": ["3/5", "3.5/5", "3.5/5", "3.5/5", "5/5"],
      "date": "6-2024"
    },
    { 
      "title": "Uncut Gems", 
      "chosenBy": ["Garrett"], 
      "star-ratings": ["4/5", "4.5/5", "5/5", "2.5/5", "3.5/5", "5/5"],
      "date": "6-2024"
    },
    { 
      "title": "The Suicide Squad", 
      "chosenBy": ["John"], 
      "star-ratings": ["4/5", "4/5", "4/5", "1.5/5", "5/5", "4.5/5"],
      "date": "6-2024"
    },
    { 
      "title": "Hardcore Henry", 
      "chosenBy": ["Jayden"], 
      "star-ratings": ["3/5", "2.5/5", "3.5/5", "5/5"],
      "date": "6-2024"
    },
    { 
      "title": "Gladiator", 
      "chosenBy": ["John", "Ayub", "Trevor"], 
      "star-ratings": ["4.5/5", "4/5", "3/5", "4/5", "5/5"],
      "date": "7-2024"
    },
    { 
      "title": "John Wick", 
      "chosenBy": ["John"], 
      "star-ratings": ["4/5", "3.5/5", "3/5", "4/5"],
      "date": "7-2024"
    },
    { 
      "title": "High and Low", 
      "chosenBy": ["Joe"], 
      "star-ratings": ["4.5/5", "4/5", "5/5", "3/5"],
      "date": "7-2024"
    },
    { 
      "title": "Full Metal Jacket", 
      "chosenBy": ["Ayub"], 
      "star-ratings": ["4.5/5", "5/5", "5/5", "2/5"],
      "date": "7-2024"
    },
    { 
      "title": "mid90s", 
      "chosenBy": ["Garrett"], 
      "star-ratings": ["3/5", "4.5/5", "3.5/5", "3/5", "4.5/5"],
      "date": "8-2024"
    },
    { 
      "title": "The Possession", 
      "chosenBy": ["Trevor"], 
      "star-ratings": ["1/5", "2/5", "1/5", "2/5", "2/5", "2.5/5"],
      "date": "8-2024"
    },
    { 
      "title": "I Want To Eat Your Pancreas", 
      "chosenBy": ["Jayden"], 
      "star-ratings": ["2.5/5", "1.5/5", "3.5/5"],
      "date": "8-2024"
    },
    { 
      "title": "All Quiet on the Western Front (2022)", 
      "chosenBy": ["Alex"], 
      "star-ratings": ["3.5/5", "2.5/5", "2.5/5", "3.5/5", "4.5/5"],
      "date": "8-2024"
    },
    { 
      "title": "9", 
      "chosenBy": ["Trevor"], 
      "star-ratings": ["1.5/5", "1/5", "2/5", "0.5/5", "3/5"],
      "date": "8-2024"
    },
    { 
        "title": "Collateral", 
        "chosenBy": ["Joe"], 
        "star-ratings": ["3.5/5", "4.5/5", "5/5", "4/5", "4/5", "4.5/5"],
        "date": "9-2024"
      },
      { 
        "title": "The Grand Budapest Hotel", 
        "chosenBy": ["Ayub"], 
        "star-ratings": ["5/5", "5/5", "4.5/5", "5/5", "3.5/5"],
        "date": "9-2024"
      }
    ]

// List of all people
const people = ["Ayub", "John", "Joe", "Trevor", "Garrett", "Alex", "Jayden", "Landon"];

/**
 * Function to convert star ratings from string format "X/Y" to numeric format and calculate the average.
 */
function calculateAverage(starRatings) {
    let total = 0;
    let count = 0;

    starRatings.forEach(rating => {
        const [value] = rating.split('/').map(Number);
        if (!isNaN(value)) {
            total += value;
            count++;
        }
    });

    return count === 0 ? 0 : (total / count).toFixed(3); // Round to 2 decimal places
}

/**
 * Function to load the movie data into the table.
 */
function loadMovieTable() {
    const tableBody = document.querySelector('#movieTable tbody');
    tableBody.innerHTML = ''; // Clear any existing rows

    // Calculate the average for each movie and add a new property for sorting
    const movieDataWithAverages = movieData.map(movie => {
        const averageRating = calculateAverage(movie["star-ratings"]);
        return { ...movie, averageRating: parseFloat(averageRating) }; // Store average as a float
    });

    // Sort the movie data by averageRating (descending order)
    movieDataWithAverages.sort((a, b) => b.averageRating - a.averageRating);

    // Populate the table with sorted data
    movieDataWithAverages.forEach((movie, index) => {
        const chosenBy = movie.chosenBy.join(", "); // Join chosenBy array into a string
        const row = `
            <tr>
                <td>#${index + 1}</td> <!-- Ranking column -->
                <td>${movie.title}</td>
                <td>${chosenBy}</td>
                <td>${movie.averageRating.toFixed(3)}</td> <!-- Show average rating -->
            </tr>
        `;
        tableBody.innerHTML += row; // Append the row to the table body
    });
}

/**
 * Function to calculate average pick scores for each person.
 */
function calculateAveragePickScores() {
    const personScores = {};

    // Initialize scores for each person
    people.forEach(person => {
        personScores[person] = {
            total: 0,
            count: 0
        };
    });

    // Calculate total score and count for each person based on their chosen movies
    movieData.forEach(movie => {
        const averageRating = parseFloat(calculateAverage(movie["star-ratings"]));
        movie.chosenBy.forEach(person => {
            if (personScores[person]) {
                personScores[person].total += averageRating;
                personScores[person].count++;
            }
        });
    });

    // Calculate average score for each person
    return people.map(person => {
        const { total, count } = personScores[person];
        const averagePickScore = count === 0 ? 0 : (total / count).toFixed(3);
        return { name: person, averagePickScore: parseFloat(averagePickScore) };
    }).sort((a, b) => b.averagePickScore - a.averagePickScore); // Sort by averagePickScore descending
}

/**
 * Function to load the best picks data into the table.
 */
function loadBestPicksTable() {
    const tableBody = document.querySelector('#bestPicksTable tbody');
    tableBody.innerHTML = ''; // Clear any existing rows

    const bestPicks = calculateAveragePickScores();

    // Populate the table with sorted data
    bestPicks.forEach((person, index) => {
        const row = `
            <tr>
                <td>#${index + 1}</td> <!-- Ranking column -->
                <td>${person.name}</td>
                <td>${person.averagePickScore.toFixed(3)}</td> <!-- Show average pick score -->
            </tr>
        `;
        tableBody.innerHTML += row; // Append the row to the table body
    });
}

// Load both tables when the window is loaded
window.onload = function() {
    loadMovieTable();
    loadBestPicksTable();
};

// Variables for monthly averages
let jan23 = 0, feb23 = 0, mar23 = 0, apr23 = 0, may23 = 0, jun23 = 0, jul23 = 0, aug23 = 0, sep23 = 0, oct23 = 0, nov23 = 0, dec23 = 0;
let counts23 = { jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0 };

let jan24 = 0, feb24 = 0, mar24 = 0, apr24 = 0, may24 = 0, jun24 = 0, jul24 = 0, aug24 = 0, sep24 = 0, oct24 = 0, nov24 = 0, dec24 = 0;
let counts24 = { jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0 };

let jan25 = 0, feb25 = 0, mar25 = 0, apr25 = 0, may25 = 0, jun25 = 0, jul25 = 0, aug25 = 0, sep25 = 0, oct25 = 0, nov25 = 0, dec25 = 0;
let counts25 = { jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0 };

//let jan26 = 0, feb26 = 0, mar26 = 0, apr26 = 0, may26 = 0, jun26 = 0, jul26 = 0, aug26 = 0, sep26 = 0, oct26 = 0, nov26 = 0, dec26 = 0;
//let counts26 = { jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0 };

//let jan27 = 0, feb27 = 0, mar27 = 0, apr27 = 0, may27 = 0, jun27 = 0, jul27 = 0, aug27 = 0, sep27 = 0, oct27 = 0, nov27 = 0, dec27 = 0;
//let counts27 = { jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0 };

/**
 * Function to calculate average ratings per month for the years 2023, 2024, 2025, 2026, 2027.
 */
function calculateMonthlyAverages() {
    movieData.forEach(movie => {
        const [month, year] = movie.date.split('-').map(Number);
        const averageRating = parseFloat(calculateAverage(movie["star-ratings"]));

        if (year === 2023) {
            switch(month) {
                case 1:
                    jan23 += averageRating;
                    counts23.jan++;
                    break;
                case 2:
                    feb23 += averageRating;
                    counts23.feb++;
                    break;
                case 3:
                    mar23 += averageRating;
                    counts23.mar++;
                    break;
                case 4:
                    apr23 += averageRating;
                    counts23.apr++;
                    break;
                case 5:
                    may23 += averageRating;
                    counts23.may++;
                    break;
                case 6:
                    jun23 += averageRating;
                    counts23.jun++;
                    break;
                case 7:
                    jul23 += averageRating;
                    counts23.jul++;
                    break;
                case 8:
                    aug23 += averageRating;
                    counts23.aug++;
                    break;
                case 9:
                    sep23 += averageRating;
                    counts23.sep++;
                    break;
                case 10:
                    oct23 += averageRating;
                    counts23.oct++;
                    break;
                case 11:
                    nov23 += averageRating;
                    counts23.nov++;
                    break;
                case 12:
                    dec23 += averageRating;
                    counts23.dec++;
                    break;
            }
        } else if (year === 2024) {
          switch(month) {
              case 1:
                  jan24 += averageRating;
                  counts24.jan++;
                  break;
              case 2:
                  feb24 += averageRating;
                  counts24.feb++;
                  break;
              case 3:
                  mar24 += averageRating;
                  counts24.mar++;
                  break;
              case 4:
                  apr24 += averageRating;
                  counts24.apr++;
                  break;
              case 5:
                  may24 += averageRating;
                  counts24.may++;
                  break;
              case 6:
                  jun24 += averageRating;
                  counts24.jun++;
                  break;
              case 7:
                  jul24 += averageRating;
                  counts24.jul++;
                  break;
              case 8:
                  aug24 += averageRating;
                  counts24.aug++;
                  break;
              case 9:
                  sep24 += averageRating;
                  counts24.sep++;
                  break;
              case 10:
                  oct24 += averageRating;
                  counts24.oct++;
                  break;
              case 11:
                  nov24 += averageRating;
                  counts24.nov++;
                  break;
              case 12:
                  dec24 += averageRating;
                  counts24.dec++;
                  break;
          }
        }else if (year === 2025) {
          switch(month) {
              case 1:
                  jan25 += averageRating;
                  counts25.jan++;
                  break;
              case 2:
                  feb25 += averageRating;
                  counts25.feb++;
                  break;
              case 3:
                  mar25 += averageRating;
                  counts25.mar++;
                  break;
              case 4:
                  apr25 += averageRating;
                  counts25.apr++;
                  break;
              case 5:
                  may25 += averageRating;
                  counts25.may++;
                  break;
              case 6:
                  jun25 += averageRating;
                  counts25.jun++;
                  break;
              case 7:
                  jul25 += averageRating;
                  counts25.jul++;
                  break;
              case 8:
                  aug25 += averageRating;
                  counts25.aug++;
                  break;
              case 9:
                  sep25 += averageRating;
                  counts25.sep++;
                  break;
              case 10:
                  oct25 += averageRating;
                  counts25.oct++;
                  break;
              case 11:
                  nov25 += averageRating;
                  counts25.nov++;
                  break;
              case 12:
                  dec25 += averageRating;
                  counts25.dec++;
                  break;
          }
        } /*else if (year === 2026) {
          switch(month) {
              case 1:
                  jan26 += averageRating;
                  counts26.jan++;
                  break;
              case 2:
                  feb26 += averageRating;
                  counts26.feb++;
                  break;
              case 3:
                  mar26 += averageRating;
                  counts26.mar++;
                  break;
              case 4:
                  apr26 += averageRating;
                  counts26.apr++;
                  break;
              case 5:
                  may26 += averageRating;
                  counts26.may++;
                  break;
              case 6:
                  jun26 += averageRating;
                  counts26.jun++;
                  break;
              case 7:
                  jul26 += averageRating;
                  counts26.jul++;
                  break;
              case 8:
                  aug26 += averageRating;
                  counts26.aug++;
                  break;
              case 9:
                  sep26 += averageRating;
                  counts26.sep++;
                  break;
              case 10:
                  oct26 += averageRating;
                  counts26.oct++;
                  break;
              case 11:
                  nov26 += averageRating;
                  counts26.nov++;
                  break;
              case 12:
                  dec26 += averageRating;
                  counts26.dec++;
                  break;
          }
        } 
          else if (year === 2027) {
          switch(month) {
              case 1:
                  jan27 += averageRating;
                  counts27.jan++;
                  break;
              case 2:
                  feb27 += averageRating;
                  counts27.feb++;
                  break;
              case 3:
                  mar27 += averageRating;
                  counts27.mar++;
                  break;
              case 4:
                  apr27 += averageRating;
                  counts27.apr++;
                  break;
              case 5:
                  may27 += averageRating;
                  counts27.may++;
                  break;
              case 6:
                  jun27 += averageRating;
                  counts27.jun++;
                  break;
              case 7:
                  jul27 += averageRating;
                  counts27.jul++;
                  break;
              case 8:
                  aug27 += averageRating;
                  counts27.aug++;
                  break;
              case 9:
                  sep27 += averageRating;
                  counts27.sep++;
                  break;
              case 10:
                  oct27 += averageRating;
                  counts27.oct++;
                  break;
              case 11:
                  nov27 += averageRating;
                  counts27.nov++;
                  break;
              case 12:
                  dec27 += averageRating;
                  counts27.dec++;
                  break;
          }
        } */
    });

    // Calculate the final averages for each year
    jan23 = counts23.jan === 0 ? 0 : (jan23 / counts23.jan).toFixed(3);
    feb23 = counts23.feb === 0 ? 0 : (feb23 / counts23.feb).toFixed(3);
    mar23 = counts23.mar === 0 ? 0 : (mar23 / counts23.mar).toFixed(3);
    apr23 = counts23.apr === 0 ? 0 : (apr23 / counts23.apr).toFixed(3);
    may23 = counts23.may === 0 ? 0 : (may23 / counts23.may).toFixed(3);
    jun23 = counts23.jun === 0 ? 0 : (jun23 / counts23.jun).toFixed(3);
    jul23 = counts23.jul === 0 ? 0 : (jul23 / counts23.jul).toFixed(3);
    aug23 = counts23.aug === 0 ? 0 : (aug23 / counts23.aug).toFixed(3);
    sep23 = counts23.sep === 0 ? 0 : (sep23 / counts23.sep).toFixed(3);
    oct23 = counts23.oct === 0 ? 0 : (oct23 / counts23.oct).toFixed(3);
    nov23 = counts23.nov === 0 ? 0 : (nov23 / counts23.nov).toFixed(3);
    dec23 = counts23.dec === 0 ? 0 : (dec23 / counts23.dec).toFixed(3);

    jan24 = counts24.jan === 0 ? 0 : (jan24 / counts24.jan).toFixed(3);
    feb24 = counts24.feb === 0 ? 0 : (feb24 / counts24.feb).toFixed(3);
    mar24 = counts24.mar === 0 ? 0 : (mar24 / counts24.mar).toFixed(3);
    apr24 = counts24.apr === 0 ? 0 : (apr24 / counts24.apr).toFixed(3);
    may24 = counts24.may === 0 ? 0 : (may24 / counts24.may).toFixed(3);
    jun24 = counts24.jun === 0 ? 0 : (jun24 / counts24.jun).toFixed(3);
    jul24 = counts24.jul === 0 ? 0 : (jul24 / counts24.jul).toFixed(3);
    aug24 = counts24.aug === 0 ? 0 : (aug24 / counts24.aug).toFixed(3);
    sep24 = counts24.sep === 0 ? 0 : (sep24 / counts24.sep).toFixed(3);
    oct24 = counts24.oct === 0 ? 0 : (oct24 / counts24.oct).toFixed(3);
    nov24 = counts24.nov === 0 ? 0 : (nov24 / counts24.nov).toFixed(3);
    dec24 = counts24.dec === 0 ? 0 : (dec24 / counts24.dec).toFixed(3);

    jan25 = counts25.jan === 0 ? 0 : (jan25 / counts25.jan).toFixed(3);
    feb25 = counts25.feb === 0 ? 0 : (feb25 / counts25.feb).toFixed(3);
    mar25 = counts25.mar === 0 ? 0 : (mar25 / counts25.mar).toFixed(3);
    apr25 = counts25.apr === 0 ? 0 : (apr25 / counts25.apr).toFixed(3);
    may25 = counts25.may === 0 ? 0 : (may25 / counts25.may).toFixed(3);
    jun25 = counts25.jun === 0 ? 0 : (jun25 / counts25.jun).toFixed(3);
    jul25 = counts25.jul === 0 ? 0 : (jul25 / counts25.jul).toFixed(3);
    aug25 = counts25.aug === 0 ? 0 : (aug25 / counts25.aug).toFixed(3);
    sep25 = counts25.sep === 0 ? 0 : (sep25 / counts25.sep).toFixed(3);
    oct25 = counts25.oct === 0 ? 0 : (oct25 / counts25.oct).toFixed(3);
    nov25 = counts25.nov === 0 ? 0 : (nov25 / counts25.nov).toFixed(3);
    dec25 = counts25.dec === 0 ? 0 : (dec25 / counts25.dec).toFixed(3);
    /*
    jan26 = counts26.jan === 0 ? 0 : (jan26 / counts26.jan).toFixed(3);
    feb26 = counts26.feb === 0 ? 0 : (feb26 / counts26.feb).toFixed(3);
    mar26 = counts26.mar === 0 ? 0 : (mar26 / counts26.mar).toFixed(3);
    apr26 = counts26.apr === 0 ? 0 : (apr26 / counts26.apr).toFixed(3);
    may26 = counts26.may === 0 ? 0 : (may26 / counts26.may).toFixed(3);
    jun26 = counts26.jun === 0 ? 0 : (jun26 / counts26.jun).toFixed(3);
    jul26 = counts26.jul === 0 ? 0 : (jul26 / counts26.jul).toFixed(3);
    aug26 = counts26.aug === 0 ? 0 : (aug26 / counts26.aug).toFixed(3);
    sep26 = counts26.sep === 0 ? 0 : (sep26 / counts26.sep).toFixed(3);
    oct26 = counts26.oct === 0 ? 0 : (oct26 / counts26.oct).toFixed(3);
    nov26 = counts26.nov === 0 ? 0 : (nov26 / counts26.nov).toFixed(3);
    dec26 = counts26.dec === 0 ? 0 : (dec26 / counts26.dec).toFixed(3);

    jan27 = counts27.jan === 0 ? 0 : (jan27 / counts27.jan).toFixed(3);
    feb27 = counts27.feb === 0 ? 0 : (feb27 / counts27.feb).toFixed(3);
    mar27 = counts27.mar === 0 ? 0 : (mar27 / counts27.mar).toFixed(3);
    apr27 = counts27.apr === 0 ? 0 : (apr27 / counts27.apr).toFixed(3);
    may27 = counts27.may === 0 ? 0 : (may27 / counts27.may).toFixed(3);
    jun27 = counts27.jun === 0 ? 0 : (jun27 / counts27.jun).toFixed(3);
    jul27 = counts27.jul === 0 ? 0 : (jul27 / counts27.jul).toFixed(3);
    aug27 = counts27.aug === 0 ? 0 : (aug27 / counts27.aug).toFixed(3);
    sep27 = counts27.sep === 0 ? 0 : (sep27 / counts27.sep).toFixed(3);
    oct27 = counts27.oct === 0 ? 0 : (oct27 / counts27.oct).toFixed(3);
    nov27 = counts27.nov === 0 ? 0 : (nov27 / counts27.nov).toFixed(3);
    dec27 = counts27.dec === 0 ? 0 : (dec27 / counts27.dec).toFixed(3);
    */
}

// Calculate monthly averages
calculateMonthlyAverages();

// List for chart data
let avg23 = [null, null, null, null, null, null, null, null, null, null, null, dec23]; // Only December has a value
let avg24 = [jan24, feb24, mar24, apr24, may24, jun24, jul24, aug24, sep24, oct24, nov24, dec24];
let avg25 = [jan25, feb25, mar25, apr25, may25, jun25, jul25, aug25, sep25, oct25, nov25, dec25];
//let avg26 = [jan26, feb26, mar26, apr26, may26, jun26, jul26, aug26, sep26, oct26, nov26, dec26];
//let avg27 = [jan27, feb27, mar27, apr27, may27, jun27, jul27, aug27, sep27, oct27, nov27, dec27];

const ctx = document.getElementById('myLineChart').getContext('2d');
const myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
          {
              label: '2023',
              data: avg23,
              borderColor: 'blue',
              borderWidth: 2,
              fill: false,
              tension: 0.2,
              pointBackgroundColor: 'blue'
          },
          {
              label: '2024',
              data: avg24,
              borderColor: 'red',
              borderWidth: 2,
              fill: false,
              tension: 0.2
          },
          {
              label: '2025',
              data: avg25,
              borderColor: 'green',
              borderWidth: 2,
              fill: false,
              tension: 0.2
          }/*,
          {
            label: '2026',
            data: avg26,
            borderColor: 'yellow',
            borderWidth: 2,
            fill: false,
            tension: 0.2
          },
          {
            label: '2027',
            data: avg27,
            borderColor: 'orange',
            borderWidth: 2,
            fill: false,
            tension: 0.2
          }
            */
      ]
  },
  options: {
      scales: {
          y: {
              beginAtZero: true,
              max: 5
          }
      }
  }
});

function getBestMonth() {
  const avgMonths = [
      { month: 'January', value: jan23, year: 2023 },
      { month: 'February', value: feb23, year: 2023 },
      { month: 'March', value: mar23, year: 2023 },
      { month: 'April', value: apr23, year: 2023 },
      { month: 'May', value: may23, year: 2023 },
      { month: 'June', value: jun23, year: 2023 },
      { month: 'July', value: jul23, year: 2023 },
      { month: 'August', value: aug23, year: 2023 },
      { month: 'September', value: sep23, year: 2023 },
      { month: 'October', value: oct23, year: 2023 },
      { month: 'November', value: nov23, year: 2023 },
      { month: 'December', value: dec23, year: 2023 },
      { month: 'January', value: jan24, year: 2024 },
      { month: 'February', value: feb24, year: 2024 },
      { month: 'March', value: mar24, year: 2024 },
      { month: 'April', value: apr24, year: 2024 },
      { month: 'May', value: may24, year: 2024 },
      { month: 'June', value: jun24, year: 2024 },
      { month: 'July', value: jul24, year: 2024 },
      { month: 'August', value: aug24, year: 2024 },
      { month: 'September', value: sep24, year: 2024 },
      { month: 'October', value: oct24, year: 2024 },
      { month: 'November', value: nov24, year: 2024 },
      { month: 'December', value: dec24, year: 2024 },
      { month: 'January', value: jan25, year: 2025 },
      { month: 'February', value: feb25, year: 2025 },
      { month: 'March', value: mar25, year: 2025 },
      { month: 'April', value: apr25, year: 2025 },
      { month: 'May', value: may25, year: 2025 },
      { month: 'June', value: jun25, year: 2025 },
      { month: 'July', value: jul25, year: 2025 },
      { month: 'August', value: aug25, year: 2025 },
      { month: 'September', value: sep25, year: 2025 },
      { month: 'October', value: oct25, year: 2025 },
      { month: 'November', value: nov25, year: 2025 },
      { month: 'December', value: dec25, year: 2025 },
      /*
      { month: 'January', value: jan26, year: 2026 },
      { month: 'February', value: feb26, year: 2026 },
      { month: 'March', value: mar26, year: 2026 },
      { month: 'April', value: apr26, year: 2026 },
      { month: 'May', value: may26, year: 2026 },
      { month: 'June', value: jun26, year: 2026 },
      { month: 'July', value: jul26, year: 2026 },
      { month: 'August', value: aug26, year: 2026 },
      { month: 'September', value: sep26, year: 2026 },
      { month: 'October', value: oct26, year: 2026 },
      { month: 'November', value: nov26, year: 2026 },
      { month: 'December', value: dec26, year: 2026 }

      { month: 'January', value: jan27, year: 2027 },
      { month: 'February', value: feb27, year: 2027 },
      { month: 'March', value: mar27, year: 2027 },
      { month: 'April', value: apr27, year: 2027 },
      { month: 'May', value: may27, year: 2027 },
      { month: 'June', value: jun27, year: 2027 },
      { month: 'July', value: jul27, year: 2027 },
      { month: 'August', value: aug27, year: 2027 },
      { month: 'September', value: sep27, year: 2027 },
      { month: 'October', value: oct27, year: 2027 },
      { month: 'November', value: nov27, year: 2027 },
      { month: 'December', value: dec27, year: 2027 }
       */
  ];

  const bestMonth = avgMonths.reduce((prev, curr) => (prev.value > curr.value ? prev : curr));

  document.getElementById('bestMonthLabel').innerText = `Best Month: ${bestMonth.month} of ${bestMonth.year} with a ${bestMonth.value}`;
}

// Call the function to update the label
getBestMonth();
