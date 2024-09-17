// assets/scripts.js

const movieData = {
    "2024": [
        {"date": "12/29/2023", "chosenBy": "Trevor", "title": "The Truman Show"},
        {"date": "1/5/2024", "chosenBy": "Ayub/Joe/Garrett", "title": "The Matrix"},
        {"date": "1/12/2024", "chosenBy": "Ayub", "title": "The Terminator"},
        {"date": "1/19/2024", "chosenBy": "Garrett", "title": "Fallen Angels"},
        {"date": "1/26/2024", "chosenBy": "John", "title": "The Batman"},
        {"date": "2/2/2024", "chosenBy": "Jayden", "title": "A Silent Voice"},
        {"date": "2/9/2024", "chosenBy": "Landon", "title": "Cloverfield"},
        {"date": "2/16/2024", "chosenBy": "Trevor", "title": "The Platform"},
        {"date": "2/23/2024", "chosenBy": "Joe", "title": "Yojimbo"},
        {"date": "3/1/2024", "chosenBy": "Ayub", "title": "Princess Mononoke"},
        {"date": "3/8/2024", "chosenBy": "Garrett", "title": "Seven"},
        {"date": "3/15/2024", "chosenBy": "John", "title": "Indiana Jones: Raiders of the Lost Ark"},
        {"date": "3/22/2024", "chosenBy": "Jayden", "title": "Click"},
        {"date": "3/29/2024", "chosenBy": "Ayub/John", "title": "Attack on Titan: The Final Chapter Part 1"},
        {"date": "4/5/2024", "chosenBy": "Hez", "title": "None"},
        {"date": "4/12/2024", "chosenBy": "Joe", "title": "Sanjuro"},
        {"date": "4/19/2024", "chosenBy": "Landon", "title": "A Beautiful Mind"},
        {"date": "4/26/2024", "chosenBy": "Garrett", "title": "Fight Club"},
        {"date": "5/3/2024", "chosenBy": "John", "title": "Das Leben der Anderen"},
        {"date": "5/10/2024", "chosenBy": "Trevor", "title": "Midsommar"},
        {"date": "5/17/2024", "chosenBy": "Ayub", "title": "Kill Bill Vol. 1"},
        {"date": "5/24/2024", "chosenBy": "Jayden", "title": "Jarhead"},
        {"date": "5/31/2024", "chosenBy": "Joe", "title": "Mad Max: Fury Road"},
        {"date": "6/7/2024", "chosenBy": "Alex", "title": "Master and Commander: The Far Side of the World"},
        {"date": "6/14/2024", "chosenBy": "Garrett", "title": "Uncut Gems"},
        {"date": "6/21/2024", "chosenBy": "John", "title": "The Suicide Squad"},
        {"date": "6/28/2024", "chosenBy": "Jayden", "title": "Hardcore Henry"},
        {"date": "7/5/2024", "chosenBy": "Unseen Roulette", "title": "Gladiator"},
        {"date": "7/12/2024", "chosenBy": "John", "title": "John Wick"},
        {"date": "7/19/2024", "chosenBy": "Joe", "title": "High and Low"},
        {"date": "7/26/2024", "chosenBy": "Ayub", "title": "Fullmetal Jacket"},
        {"date": "8/2/2024", "chosenBy": "Garrett", "title": "Mid 90s"},
        {"date": "8/9/2024", "chosenBy": "Trevor", "title": "The Possession"},
        {"date": "8/16/2024", "chosenBy": "Jayden", "title": "I Want to Eat Your Pancreas"},
        {"date": "8/23/2024", "chosenBy": "Alex", "title": "All Quiet on the Western Front (2022)"},
        {"date": "8/30/2024", "chosenBy": "Trevor", "title": "9"},
        {"date": "9/6/2024", "chosenBy": "Joe", "title": "Collateral"},
        {"date": "9/13/2024", "chosenBy": "Ayub", "title": "The Grand Budapest Hotel"},
        {"date": "9/20/2024", "chosenBy": "Garrett", "title": "Asteroid City"},
        {"date": "9/27/2024", "chosenBy": "John", "title": "Godzilla Minus One"},
        {"date": "10/4/2024", "chosenBy": "Jayden", "title": "Ernest Scared Stupid"},
        {"date": "10/11/2024", "chosenBy": "Alex", "title": "The Thing"},
        {"date": "10/18/2024", "chosenBy": "Trevor", "title": "The Conjuring"},
        {"date": "10/25/2024", "chosenBy": "Joe", "title": "The Lighthouse"},
        {"date": "11/1/2024", "chosenBy": "Ayub", "title": "Coraline"},
        {"date": "11/8/2024", "chosenBy": "Garrett", "title": ""},
        {"date": "11/15/2024", "chosenBy": "John", "title": "Indiana Jones: The Last Crusade"},
        {"date": "11/22/2024", "chosenBy": "Jayden", "title": ""},
        {"date": "11/29/2024", "chosenBy": "Alex", "title": "Rango/LEGO/Black Pearl/Ep 4/Gump"},
        {"date": "12/6/2024", "chosenBy": "Trevor", "title": "Transformers"},
        {"date": "12/13/2024", "chosenBy": "Joe", "title": "Goodfellas"},
        {"date": "12/20/2024", "chosenBy": "Ayub", "title": ""},
        {"date": "12/27/2024", "chosenBy": "Garrett", "title": "The Hateful Eight: Extended Edition"}
  ],
    "2025": [
        {"date": "1/3/2025", "chosenBy": "Roulette", "title": ""},
        {"date": "1/10/2025", "chosenBy": "John", "title": "The Ministry of Ungentlemanly Warfare"},
        {"date": "1/17/2025", "chosenBy": "Jayden", "title": ""},
        {"date": "1/24/2025", "chosenBy": "Alex", "title": ""},
        {"date": "1/31/2025", "chosenBy": "Trevor", "title": "Transformers 2"},
        {"date": "2/7/2025", "chosenBy": "Joe", "title": ""},
        {"date": "2/14/2025", "chosenBy": "Ayub", "title": ""},
        {"date": "2/21/2025", "chosenBy": "Garrett", "title": ""},
        {"date": "2/28/2025", "chosenBy": "Roulette", "title": ""},
        {"date": "3/7/2025", "chosenBy": "John", "title": "Princess Bride"},
        {"date": "3/14/2025", "chosenBy": "Jayden", "title": ""},
        {"date": "3/21/2025", "chosenBy": "Alex", "title": ""},
        {"date": "3/28/2025", "chosenBy": "Trevor", "title": "Transformers 3"},
        {"date": "4/4/2025", "chosenBy": "Joe", "title": ""},
        {"date": "4/11/2025", "chosenBy": "Ayub", "title": ""},
        {"date": "4/18/2025", "chosenBy": "Garrett", "title": ""},
        {"date": "4/25/2025", "chosenBy": "Roulette", "title": ""},
        {"date": "5/2/2025", "chosenBy": "John", "title": "Logan"},
        {"date": "5/9/2025", "chosenBy": "Jayden", "title": ""},
        {"date": "5/16/2025", "chosenBy": "Alex", "title": ""},
        {"date": "5/23/2025", "chosenBy": "Trevor", "title": ""},
        {"date": "5/30/2025", "chosenBy": "Joe", "title": ""},
        {"date": "6/6/2025", "chosenBy": "Ayub", "title": ""},
        {"date": "6/13/2025", "chosenBy": "Garrett", "title": ""},
        {"date": "6/20/2025", "chosenBy": "Roulette", "title": ""},
        {"date": "6/27/2025", "chosenBy": "John", "title": "Deadpool and Wolverine"},
        {"date": "7/4/2025", "chosenBy": "Jayden", "title": ""},
        {"date": "7/11/2025", "chosenBy": "Alex", "title": ""},
        {"date": "7/18/2025", "chosenBy": "Trevor", "title": ""},
        {"date": "7/25/2025", "chosenBy": "Joe", "title": ""},
        {"date": "8/1/2025", "chosenBy": "Ayub", "title": ""},
        {"date": "8/8/2025", "chosenBy": "Garrett", "title": ""},
        {"date": "8/15/2025", "chosenBy": "Roulette", "title": ""},
        {"date": "8/22/2025", "chosenBy": "John", "title": "Guardians of the Galaxy Vol. 3"},
        {"date": "8/29/2025", "chosenBy": "Jayden", "title": ""},
        {"date": "9/5/2025", "chosenBy": "Alex", "title": ""},
        {"date": "9/12/2025", "chosenBy": "Trevor", "title": ""},
        {"date": "9/19/2025", "chosenBy": "Joe", "title": ""},
        {"date": "9/26/2025", "chosenBy": "Ayub", "title": ""},
        {"date": "10/3/2025", "chosenBy": "Garrett", "title": ""},
        {"date": "10/10/2025", "chosenBy": "Roulette", "title": ""},
        {"date": "10/17/2025", "chosenBy": "John", "title": "Scary Movie (2000)"},
        {"date": "10/24/2025", "chosenBy": "Jayden", "title": ""},
        {"date": "10/31/2025", "chosenBy": "Alex", "title": ""},
        {"date": "11/7/2025", "chosenBy": "Trevor", "title": ""},
        {"date": "11/14/2025", "chosenBy": "Joe", "title": ""},
        {"date": "11/21/2025", "chosenBy": "Ayub", "title": ""},
        {"date": "11/28/2025", "chosenBy": "Garrett", "title": ""},
        {"date": "12/5/2025", "chosenBy": "Roulette", "title": ""},
        {"date": "12/12/2025", "chosenBy": "John", "title": "Violent Night"},
        {"date": "12/19/2025", "chosenBy": "Jayden", "title": ""},
        {"date": "12/26/2025", "chosenBy": "Alex", "title": "National Lampoon's Christmas Vacation"}
    ]
};

function loadTable() {
    const year = document.getElementById('yearSelect').value;
    const tableBody = document.getElementById('movieTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear current table rows

    // Populate the table with data from the selected year
    movieData[year].forEach(movie => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${movie.date}</td><td>${movie.chosenBy}</td><td>${movie.title}</td>`;
        tableBody.appendChild(row);
    });
}

// Load 2024 table on page load
window.onload = loadTable;
