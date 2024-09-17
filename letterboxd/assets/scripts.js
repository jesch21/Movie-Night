
const alexList = [
    { "movie": "The Batman", "stars": "5/5", "liked": "Liked", "rating": "" },
    { "movie": "A Silent Voice", "stars": "5/5", "liked": "Liked", "rating": "" },
    { "movie": "The Grand Budapest Hotel", "stars": "5/5", "liked": "Liked", "rating": "" },
    { "movie": "Se7en", "stars": "5/5", "liked": "Liked", "rating": "" },
    { "movie": "Fight Club", "stars": "4.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Indiana Jones: Raiders of the Lost Ark", "stars": "4.5/5", "liked": "Liked", "rating": "" },
    { "movie": "John Wick", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "Gladiator", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "Collateral", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "Yojimbo", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "Attack on Titan: The Final Chapter Part 1", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "The Matrix", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "I Want to Eat Your Pancreas", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Hardcore Henry", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Mad Max: Fury Road", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Master and Commander: The Far Side of the World", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "The Truman Show", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Sanjuro", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "mid90s", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "Jarhead", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "A Beautiful Mind", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "Click", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "High and Low", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "All Quiet on the Western Front (2022)", "stars": "2.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Cloverfield", "stars": "2.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Uncut Gems", "stars": "2.5/5", "liked": "Not Liked", "rating": "" },
    { "movie": "Midsommar", "stars": "2.5/5", "liked": "Not Liked", "rating": "" },
    { "movie": "The Terminator", "stars": "2.5/5", "liked": "Not Liked", "rating": "" },
    { "movie": "The Platform", "stars": "2/5", "liked": "Liked", "rating": "" },
    { "movie": "Full Metal Jacket", "stars": "2/5", "liked": "Not Liked", "rating": "" },
    { "movie": "Das Leben der Anderan", "stars": "2/5", "liked": "Not Liked", "rating": "" },
    { "movie": "Fallen Angels", "stars": "2/5", "liked": "Not Liked", "rating": "" },
    { "movie": "The Possession", "stars": "1/5", "liked": "Not Liked", "rating": "" },
    { "movie": "9", "stars": "0.5/5", "liked": "Not Liked", "rating": "" },
];

const ayubList = [
    { "movie": "The Batman", "stars": "5/5", "liked": "Liked", "rating": "" },
    { "movie": "A Silent Voice", "stars": "5/5", "liked": "Liked", "rating": "" },
    { "movie": "The Grand Budapest Hotel", "stars": "5/5", "liked": "Liked", "rating": "" },
    { "movie": "Se7en", "stars": "5/5", "liked": "Liked", "rating": "" },
    { "movie": "Fight Club", "stars": "4.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Indiana Jones: Raiders of the Lost Ark", "stars": "4.5/5", "liked": "Liked", "rating": "" },
    { "movie": "John Wick", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "Gladiator", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "Collateral", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "Yojimbo", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "Attack on Titan: The Final Chapter Part 1", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "The Matrix", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "I Want to Eat Your Pancreas", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Hardcore Henry", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Mad Max: Fury Road", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Master and Commander: The Far Side of the World", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "The Truman Show", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Sanjuro", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "mid90s", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "Jarhead", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "A Beautiful Mind", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "Click", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "High and Low", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "All Quiet on the Western Front (2022)", "stars": "2.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Cloverfield", "stars": "2.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Uncut Gems", "stars": "2.5/5", "liked": "Not Liked", "rating": "" },
    { "movie": "Midsommar", "stars": "2.5/5", "liked": "Not Liked", "rating": "" },
    { "movie": "The Terminator", "stars": "2.5/5", "liked": "Not Liked", "rating": "" },
    { "movie": "The Platform", "stars": "2/5", "liked": "Liked", "rating": "" },
    { "movie": "Full Metal Jacket", "stars": "2/5", "liked": "Not Liked", "rating": "" },
    { "movie": "Das Leben der Anderan", "stars": "2/5", "liked": "Not Liked", "rating": "" },
    { "movie": "Fallen Angels", "stars": "2/5", "liked": "Not Liked", "rating": "" },
    { "movie": "The Possession", "stars": "1/5", "liked": "Not Liked", "rating": "" },
    { "movie": "9", "stars": "0.5/5", "liked": "Not Liked", "rating": "" },
];

const garrettList = [
    { "movie": "The Batman", "stars": "5/5", "liked": "Liked", "rating": "" },
    { "movie": "A Silent Voice", "stars": "5/5", "liked": "Liked", "rating": "" },
    { "movie": "The Grand Budapest Hotel", "stars": "5/5", "liked": "Liked", "rating": "" },
    { "movie": "Se7en", "stars": "5/5", "liked": "Liked", "rating": "" },
    { "movie": "Fight Club", "stars": "4.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Indiana Jones: Raiders of the Lost Ark", "stars": "4.5/5", "liked": "Liked", "rating": "" },
    { "movie": "John Wick", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "Gladiator", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "Collateral", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "Yojimbo", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "Attack on Titan: The Final Chapter Part 1", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "The Matrix", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "I Want to Eat Your Pancreas", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Hardcore Henry", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Mad Max: Fury Road", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Master and Commander: The Far Side of the World", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "The Truman Show", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Sanjuro", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "mid90s", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "Jarhead", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "A Beautiful Mind", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "Click", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "High and Low", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "All Quiet on the Western Front (2022)", "stars": "2.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Cloverfield", "stars": "2.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Uncut Gems", "stars": "2.5/5", "liked": "Not Liked", "rating": "" },
    { "movie": "Midsommar", "stars": "2.5/5", "liked": "Not Liked", "rating": "" },
    { "movie": "The Terminator", "stars": "2.5/5", "liked": "Not Liked", "rating": "" },
    { "movie": "The Platform", "stars": "2/5", "liked": "Liked", "rating": "" },
    { "movie": "Full Metal Jacket", "stars": "2/5", "liked": "Not Liked", "rating": "" },
    { "movie": "Das Leben der Anderan", "stars": "2/5", "liked": "Not Liked", "rating": "" },
    { "movie": "Fallen Angels", "stars": "2/5", "liked": "Not Liked", "rating": "" },
    { "movie": "The Possession", "stars": "1/5", "liked": "Not Liked", "rating": "" },
    { "movie": "9", "stars": "0.5/5", "liked": "Not Liked", "rating": "" },
];

const jaydenList = [
    { "movie": "The Batman", "stars": "5/5", "liked": "Liked", "rating": "" },
    { "movie": "A Silent Voice", "stars": "5/5", "liked": "Liked", "rating": "" },
    { "movie": "The Grand Budapest Hotel", "stars": "5/5", "liked": "Liked", "rating": "" },
    { "movie": "Se7en", "stars": "5/5", "liked": "Liked", "rating": "" },
    { "movie": "Fight Club", "stars": "4.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Indiana Jones: Raiders of the Lost Ark", "stars": "4.5/5", "liked": "Liked", "rating": "" },
    { "movie": "John Wick", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "Gladiator", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "Collateral", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "Yojimbo", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "Attack on Titan: The Final Chapter Part 1", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "The Matrix", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "I Want to Eat Your Pancreas", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Hardcore Henry", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Mad Max: Fury Road", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Master and Commander: The Far Side of the World", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "The Truman Show", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Sanjuro", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "mid90s", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "Jarhead", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "A Beautiful Mind", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "Click", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "High and Low", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "All Quiet on the Western Front (2022)", "stars": "2.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Cloverfield", "stars": "2.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Uncut Gems", "stars": "2.5/5", "liked": "Not Liked", "rating": "" },
    { "movie": "Midsommar", "stars": "2.5/5", "liked": "Not Liked", "rating": "" },
    { "movie": "The Terminator", "stars": "2.5/5", "liked": "Not Liked", "rating": "" },
    { "movie": "The Platform", "stars": "2/5", "liked": "Liked", "rating": "" },
    { "movie": "Full Metal Jacket", "stars": "2/5", "liked": "Not Liked", "rating": "" },
    { "movie": "Das Leben der Anderan", "stars": "2/5", "liked": "Not Liked", "rating": "" },
    { "movie": "Fallen Angels", "stars": "2/5", "liked": "Not Liked", "rating": "" },
    { "movie": "The Possession", "stars": "1/5", "liked": "Not Liked", "rating": "" },
    { "movie": "9", "stars": "0.5/5", "liked": "Not Liked", "rating": "" },
];

const joeList = [
    { "movie": "The Batman", "stars": "5/5", "liked": "Liked", "rating": "" },
    { "movie": "A Silent Voice", "stars": "5/5", "liked": "Liked", "rating": "" },
    { "movie": "The Grand Budapest Hotel", "stars": "5/5", "liked": "Liked", "rating": "" },
    { "movie": "Se7en", "stars": "5/5", "liked": "Liked", "rating": "" },
    { "movie": "Fight Club", "stars": "4.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Indiana Jones: Raiders of the Lost Ark", "stars": "4.5/5", "liked": "Liked", "rating": "" },
    { "movie": "John Wick", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "Gladiator", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "Collateral", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "Yojimbo", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "Attack on Titan: The Final Chapter Part 1", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "The Matrix", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "I Want to Eat Your Pancreas", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Hardcore Henry", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Mad Max: Fury Road", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Master and Commander: The Far Side of the World", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "The Truman Show", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Sanjuro", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "mid90s", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "Jarhead", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "A Beautiful Mind", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "Click", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "High and Low", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "All Quiet on the Western Front (2022)", "stars": "2.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Cloverfield", "stars": "2.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Uncut Gems", "stars": "2.5/5", "liked": "Not Liked", "rating": "" },
    { "movie": "Midsommar", "stars": "2.5/5", "liked": "Not Liked", "rating": "" },
    { "movie": "The Terminator", "stars": "2.5/5", "liked": "Not Liked", "rating": "" },
    { "movie": "The Platform", "stars": "2/5", "liked": "Liked", "rating": "" },
    { "movie": "Full Metal Jacket", "stars": "2/5", "liked": "Not Liked", "rating": "" },
    { "movie": "Das Leben der Anderan", "stars": "2/5", "liked": "Not Liked", "rating": "" },
    { "movie": "Fallen Angels", "stars": "2/5", "liked": "Not Liked", "rating": "" },
    { "movie": "The Possession", "stars": "1/5", "liked": "Not Liked", "rating": "" },
    { "movie": "9", "stars": "0.5/5", "liked": "Not Liked", "rating": "" },
];

const johnList = [
    { "movie": "The Batman", "stars": "5/5", "liked": "Liked", "rating": "" },
    { "movie": "A Silent Voice", "stars": "5/5", "liked": "Liked", "rating": "" },
    { "movie": "The Grand Budapest Hotel", "stars": "5/5", "liked": "Liked", "rating": "" },
    { "movie": "Se7en", "stars": "5/5", "liked": "Liked", "rating": "" },
    { "movie": "Fight Club", "stars": "4.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Indiana Jones: Raiders of the Lost Ark", "stars": "4.5/5", "liked": "Liked", "rating": "" },
    { "movie": "John Wick", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "Gladiator", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "Collateral", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "Yojimbo", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "Attack on Titan: The Final Chapter Part 1", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "The Matrix", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "I Want to Eat Your Pancreas", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Hardcore Henry", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Mad Max: Fury Road", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Master and Commander: The Far Side of the World", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "The Truman Show", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Sanjuro", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "mid90s", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "Jarhead", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "A Beautiful Mind", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "Click", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "High and Low", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "All Quiet on the Western Front (2022)", "stars": "2.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Cloverfield", "stars": "2.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Uncut Gems", "stars": "2.5/5", "liked": "Not Liked", "rating": "" },
    { "movie": "Midsommar", "stars": "2.5/5", "liked": "Not Liked", "rating": "" },
    { "movie": "The Terminator", "stars": "2.5/5", "liked": "Not Liked", "rating": "" },
    { "movie": "The Platform", "stars": "2/5", "liked": "Liked", "rating": "" },
    { "movie": "Full Metal Jacket", "stars": "2/5", "liked": "Not Liked", "rating": "" },
    { "movie": "Das Leben der Anderan", "stars": "2/5", "liked": "Not Liked", "rating": "" },
    { "movie": "Fallen Angels", "stars": "2/5", "liked": "Not Liked", "rating": "" },
    { "movie": "The Possession", "stars": "1/5", "liked": "Not Liked", "rating": "" },
    { "movie": "9", "stars": "0.5/5", "liked": "Not Liked", "rating": "" },
];

const trevorList = [
    { "movie": "The Batman", "stars": "5/5", "liked": "Liked", "rating": "" },
    { "movie": "A Silent Voice", "stars": "5/5", "liked": "Liked", "rating": "" },
    { "movie": "The Grand Budapest Hotel", "stars": "5/5", "liked": "Liked", "rating": "" },
    { "movie": "Se7en", "stars": "5/5", "liked": "Liked", "rating": "" },
    { "movie": "Fight Club", "stars": "4.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Indiana Jones: Raiders of the Lost Ark", "stars": "4.5/5", "liked": "Liked", "rating": "" },
    { "movie": "John Wick", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "Gladiator", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "Collateral", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "Yojimbo", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "Attack on Titan: The Final Chapter Part 1", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "The Matrix", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "I Want to Eat Your Pancreas", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Hardcore Henry", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Mad Max: Fury Road", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Master and Commander: The Far Side of the World", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "The Truman Show", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Sanjuro", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "mid90s", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "Jarhead", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "A Beautiful Mind", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "Click", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "High and Low", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "All Quiet on the Western Front (2022)", "stars": "2.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Cloverfield", "stars": "2.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Uncut Gems", "stars": "2.5/5", "liked": "Not Liked", "rating": "" },
    { "movie": "Midsommar", "stars": "2.5/5", "liked": "Not Liked", "rating": "" },
    { "movie": "The Terminator", "stars": "2.5/5", "liked": "Not Liked", "rating": "" },
    { "movie": "The Platform", "stars": "2/5", "liked": "Liked", "rating": "" },
    { "movie": "Full Metal Jacket", "stars": "2/5", "liked": "Not Liked", "rating": "" },
    { "movie": "Das Leben der Anderan", "stars": "2/5", "liked": "Not Liked", "rating": "" },
    { "movie": "Fallen Angels", "stars": "2/5", "liked": "Not Liked", "rating": "" },
    { "movie": "The Possession", "stars": "1/5", "liked": "Not Liked", "rating": "" },
    { "movie": "9", "stars": "0.5/5", "liked": "Not Liked", "rating": "" },
];

// Function to populate a table with data
// Function to populate a table with data
function populateTable(tableId, data) {
    const tableBody = document.querySelector(`#${tableId} tbody`);
    tableBody.innerHTML = ''; // Clear any existing rows

    // Iterate over each entry in the data array and add a row
    data.forEach((entry, index) => {
        const row = `
            <tr>
                <td>#${index + 1}</td>  <!-- Automatically generated rank -->
                <td>${entry.movie}</td>
                <td>${entry.stars}</td>
                <td>${entry.liked}</td>
                <td>${entry.rating}</td>
            </tr>
        `;
        tableBody.innerHTML += row; // Append the row to the table body
    });
}

// Populate all tables on page load
window.onload = function() {
    populateTable('alex-table', alexList);
    populateTable('ayub-table', ayubList);
    populateTable('garrett-table', garrettList);
    populateTable('jayden-table', jaydenList);
    populateTable('joe-table', joeList);
    populateTable('john-table', johnList);
    populateTable('trevor-table', trevorList);
};


// Populate all tables on page load
window.onload = function() {
    populateTable('alex-table', alexList);
    populateTable('ayub-table', ayubList);
    populateTable('garrett-table', garrettList);
    populateTable('jayden-table', jaydenList);
    populateTable('joe-table', joeList);
    populateTable('john-table', johnList);
    populateTable('trevor-table', trevorList);
};
