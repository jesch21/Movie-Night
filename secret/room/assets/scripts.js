let touch1 = [document.getElementById('touch'), false];
let touch2 = [document.getElementById('touch-harder'), false];
let touchNum = 0;

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
    }
}