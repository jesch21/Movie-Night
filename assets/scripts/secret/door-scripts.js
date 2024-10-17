let level = 0;
let first = ['apple', 'bottom', 'jeans', 'boots', 'with', 'the', 'fur'];
let second = ['official', 'trevor', 'fanclub', 'things', 'stuff', 'and', 'shit'];
let third = ['John', 'is', 'the', 'funniest', 'smartest', 'and', 'coolest', 'guy', 'I', 'know'];
let levelList = [first, second, third];

function containsAll(target, arr) {
    target = target.toLowerCase();
    return arr.every(element => target.includes(element.toLowerCase()));
}

function password() {
    const passphrase = document.getElementsByClassName('textinput')[level].value;
    const messageDivs = document.getElementsByClassName('message');
    if (containsAll(passphrase, levelList[level])) {
        if(level===0){
            document.getElementById("first").style.display = "none";
            document.getElementById("second").style.display = "flex";
        }else if(level===1){
            document.getElementById("second").style.display = "none";
            document.getElementById("third").style.display = "flex";
        }else {
            document.getElementById("third").style.display = "none";
            document.getElementById("final").style.display = "flex";
        }
        level = level + 1;
    } else {
        messageDivs[level].textContent = "Incorrect";
    }
    return false;
}

function realReward() {
    document.getElementById("final").style.display = "none";
    document.getElementById("real").style.display = "flex";
}