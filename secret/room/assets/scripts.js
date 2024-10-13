let touch1 = [document.getElementById('touch'), false];
let touch2 = [document.getElementById('touch-harder'), false];
let touchNum = 0;
let unlocked = true;

function touchMe() {
    touch1[0].style.color = 'blue';
    touch1[0].style.backgroundColor = 'cyan';

    if(touchNum === 1){
        touch2[0].style.color = 'blue';
        touch2[0].style.backgroundColor = 'cyan';
    }
}

function touched() {
    if(!touch1[1]){
        touch1[0].style.color = 'white';
        touch1[0].style.backgroundColor = 'white';
    }
    if(!touch2[1]){
        touch2[0].style.color = 'white';
        touch2[0].style.backgroundColor = 'white';
    }
}

function touchedMe() {
    if(touchNum === 0) {
        touch1[1] = true;
        touch2[0].style.display = 'block';
        touchNum=1;
    } else if(touchNum = 1){
        touch2[1] = true;
        document.getElementById('maze').style.display = 'block';
        document.getElementById('reveal').style.display = 'block';
    }
}

function unlock() {
    let button=document.getElementById('door');
    button.style.backgroundColor = 'rgb(82, 255, 47)';
    button.textContent = 'Unlocked';
    button.style.padding = '12px';
    button.style.marginBottom = '-4px';
    button.style.cursor = 'pointer';
    unlocked = true;
}

function lock() {
    let button=document.getElementById('door');
    button.style.backgroundColor = 'red';
    button.textContent = 'Locked';
    button.style.padding = '12px';
    button.style.cursor = 'default';
    unlocked = false;
}

function vanish() {
    let trevElements = document.getElementsByClassName('trev');
    for (let i = 0; i < trevElements.length; i++) {
        trevElements[i].style.opacity = '0';
    }
}

function door(){
    if(unlocked){
        window.location.href = 'door/index.html';
    } 
}

document.getElementById('reveal').addEventListener('mousedown', function() {
    let trevElements = document.getElementsByClassName('trev');
    for (let i = 0; i < trevElements.length; i++) {
        trevElements[i].style.opacity = '1';
    }
});

document.getElementById('reveal').addEventListener('mouseup', function() {
    let trevElements = document.getElementsByClassName('trev');
    for (let i = 0; i < trevElements.length; i++) {
        trevElements[i].style.opacity = '0';
    }
});