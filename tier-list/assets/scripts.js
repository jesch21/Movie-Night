// Example data structure for letterboxd lists (replace with actual lists)
const alexList = [{ movie: 'The Matrix', stars: 5 }];
const ayubList = [{ movie: 'The Truman Show', stars: 4.5 }];
const joeList = [{ movie: 'Akira', stars: 4 }];
const johnList = [{ movie: 'The Godfather', stars: 5 }];
const trevorList = [{ movie: 'The Terminator', stars: 4.8 }];

// Combine letterboxd lists
const letterboxdLists = [...alexList, ...ayubList, ...joeList, ...johnList, ...trevorList];

// Function to find a movie's rating in the letterboxd lists
function findMovieRating(title) {
    const foundMovie = letterboxdLists.find(movie => movie.movie === title);
    return foundMovie ? foundMovie.stars : 'N/A';
}

// Function to populate the "Best Movie Picks" table
function populateBestMoviePicks() {
    const tableBody = document.querySelector('#best-movie-table tbody');
    tableBody.innerHTML = ''; // Clear the table first

    // Add rows for seen movies in movieData and unseenMovieData
    movieData["2024"].forEach(movie => {
        const stars = findMovieRating(movie.title);
        const row = `<tr>
            <td>${movie.title}</td>
            <td>${movie.chosenBy}</td>
            <td>${stars}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });

    unseenMovieData.seen.forEach(movie => {
        const stars = findMovieRating(movie.title);
        const row = `<tr>
            <td>${movie.title}</td>
            <td>${movie.chosenBy.join(', ')}</td>
            <td>${stars}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// Run the function on page load
window.onload = function() {
    populateBestMoviePicks();
};
