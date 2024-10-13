const fart = 'my rank-ass farts are making me super fucking angry';

function openYourEyes() {
    document.getElementById("first").style.color="red";
    whoAteNine()
}

function redReveal() {
    document.body.style.backgroundColor = "red";
    document.getElementById("second").style.display = "flex";
}

function whoAteNine() {
    let typed = "";

    // Event listener for keypress
    document.addEventListener('keydown', (event) => {
        // Check if the pressed key is "7"
        if (event.key === '7') {
            redReveal();
        }

        // Collect typed letters to form the word "seven"
        typed += event.key.toLowerCase();

        // Check if the word "seven" is typed
        if (typed.includes("seven")) {
            redReveal();
            typed = "";  // Reset the typed word
        }

        // Limit the length of the typed string to avoid excess memory usage
        if (typed.length > 5) {
            typed = typed.slice(-5);
        }
    });
}

function rankFarts() {
    const passphrase = document.getElementById('textinput').value;
    const messageDiv = document.getElementById('message');

    if (passphrase !== fart) {
        messageDiv.textContent = 'dumbass';
    } else {
        messageDiv.textContent = 'https://coronacinema.com/secret/room';
    }

    return false;
}