// Elements from dom=========================================
// Numbers
var hours = document.getElementById('hours');
var minutes = document.getElementById('minutes');
var seconds = document.getElementById('seconds');

// Keyboard
var oneButton = document.getElementById('oneButton');
var twoButton = document.getElementById('twoButton');
var threeButton = document.getElementById('threeButton');
var fourButton = document.getElementById('fourButton');
var fiveButton = document.getElementById('fiveButton');
var sixButton = document.getElementById('sixButton');
var sevenButton = document.getElementById('sevenButton');
var eightButton = document.getElementById('eightButton');
var nineButton = document.getElementById('nineButton');
var zeroButton = document.getElementById('zeroButton');
var enterButton = document.getElementById('enterButton');
var backButton = document.getElementById('backButton');

// Other buttons
var buttonsContainer = document.getElementById('buttonsContainer');
var startButton = document.getElementById('startButton');
var otherButtonsContainer = document.getElementById('otherButtonsContainer');
var pauseButton = document.getElementById('pauseButton');
var stopButton = document.getElementById('stopButton');

//=============================================================


// Variables    ===============================================
var values = new Array();
values = ['00', '00', '00'];
var myString = '000000';
let myTimeInNumbers = [];
let currentTime;
let timer;


//=============================================================

// Key codes from keyboard
const KEYS = {
    zero: 96,
    one: 97,
    two: 98,
    three: 99,
    four: 100,
    five: 101,
    six: 102,
    seven: 103,
    eight: 104,
    nine: 105,
    enter: 13,
    back: 8
}


// Event Listeners=============================
addEventListener('keydown', type);
oneButton.addEventListener('click', clicked); 
twoButton.addEventListener('click', clicked); 
threeButton.addEventListener('click', clicked); 
fourButton.addEventListener('click', clicked); 
fiveButton.addEventListener('click', clicked); 
sixButton.addEventListener('click', clicked); 
sevenButton.addEventListener('click', clicked); 
eightButton.addEventListener('click', clicked); 
nineButton.addEventListener('click', clicked); 
zeroButton.addEventListener('click', clicked); 
backButton.addEventListener('click', clicked); 
enterButton.addEventListener('click', start); 
startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause); 
stopButton.addEventListener('click', stop);  

// Functions=======================================

function type() {
    switch(event.keyCode) {
        case KEYS.zero:
            myTime('0');
            break;

        case KEYS.one:
            myTime('1');
            break;

        case KEYS.two:
            myTime('2');
            break;

        case KEYS.three:
            myTime('3');
            break;

        case KEYS.four:
            myTime('4');
            break;

        case KEYS.five:
            myTime('5');
            break;

        case KEYS.six:
            myTime('6');
            break;

        case KEYS.seven:
            myTime('7');
            break;

        case KEYS.eight:
            myTime('8');
            break;

        case KEYS.nine:
            myTime('9');
            break;

        case KEYS.enter:
            start();
            break;

        case KEYS.back:
            myTime('back');
            break;
    }
}

function clicked() {
    
    switch(this.id) {
        case 'zeroButton':
            myTime('0');
            break;

        case 'oneButton':
            myTime('1');
            break;

        case 'twoButton':
            myTime('2');
            break;

        case 'threeButton':
            myTime('3');
            break;

        case 'fourButton':
            myTime('4');
            break;

        case 'fiveButton':
            myTime('5');
            break;

        case 'sixButton':
            myTime('6');
            break;

        case 'sevenButton':
            myTime('7');
            break;

        case 'eightButton':
            myTime('8');
            break;

        case 'nineButton':
            myTime('9');
            break;

        case 'enterButton':
            start();
            break;

        case 'backButton':
            myTime('back');
            break;
    }
}


function myTime(num) {
    
    if (num === 'back') {
        myString = myString.slice(0, myString.length - 1);
        myString = '0' + myString;
        // console.log(myString);
    } else {
        myString += num;
        myString = myString.slice(1)
        // console.log(myString);
    }

    addToArr(values, myString);
    write(values);
}

function addToArr(arr, str) {
    arr[arr.length - 1] = `${str[str.length - 6]}${str[str.length - 5]}`;
    arr[arr.length - 2] = `${str[str.length - 4]}${str[str.length - 3]}`;
    arr[arr.length - 3] = `${str[str.length - 2]}${str[str.length - 1]}`;
    // console.log(str[str.length - 1]);
}

function write(arr) {
    // console.log(arr);
    hours.innerHTML = arr[arr.length - 1];
    minutes.innerHTML = arr[arr.length - 2];
    seconds.innerHTML = arr[arr.length - 3];
}


function start() {
    if(check(values)) {
        return
    } else {
        buttonsContainer.style.display = "none";
        otherButtonsContainer.style.display = "flex";
        myTimeInNumbers = [parseInt(values[values.length - 1]), parseInt(values[values.length - 2]), parseInt(values[values.length - 3])];
        timer = new Timer(myTimeInNumbers, [hours, minutes, seconds], [buttonsContainer, otherButtonsContainer], pauseButton);
        timer.start();
    }
    
}

function pause() {
    myString = timer.hours + timer.minutes + timer.seconds;
    addToArr(values, myString)
    timer.pause();
}

function stop() {
    timer.stop();
    addToArr(values, myString);
    buttonsContainer.style.display = "flex";
    otherButtonsContainer.style.display = "none";
}

function check(arr) {
    if(parseInt(arr[arr.length - 3]) > 59) {
        alert('Error: Segs cannot be greater than 59');
        return true
    }

    if(parseInt(arr[arr.length - 2]) > 59) {
        alert('Error: Mins cannot be greater than 59');
        return true
    }

    if(parseInt(arr[arr.length - 1]) > 99) {
        alert('Error: Hours cannot be greater than 99');
        return true
    }

    if(parseInt(arr[arr.length - 1]) == 0 && arr[arr.length - 2] == 0 && parseInt(arr[arr.length - 3]) == 0) {
        alert('Cannot start from 0!');
        return true
    }

}

function defaultValues(arr) {
    arr.forEach(element => {
        element = '00';
    })
}

// =======================================

// OOP=======================================



