import Printer from "./printer.js";

const printer = new Printer();

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
let keyboardButtons = [oneButton, twoButton, threeButton, fourButton, fiveButton, sixButton, sevenButton, 
    eightButton, nineButton, zeroButton, enterButton, backButton];

//=============================================================


// Event Listeners=============================

keyboardButtons.forEach(button => {
    button.addEventListener('click', clicked);
});
startButton.addEventListener('click', start); 
pauseButton.addEventListener('click', pause); 
stopButton.addEventListener('click', stop);  

// Functions=======================================

function clicked() {
    switch(this.id) {
        case 'zeroButton':
            printer.add('0');
            break;

        case 'oneButton':
            printer.add('1');
            break;

        case 'twoButton':
            printer.add('2');
            break;

        case 'threeButton':
            printer.add('3');
            break;

        case 'fourButton':
            printer.add('4');
            break;

        case 'fiveButton':
            printer.add('5');
            break;

        case 'sixButton':
            printer.add('6');
            break;

        case 'sevenButton':
            printer.add('7');
            break;

        case 'eightButton':
            printer.add('8');
            break;

        case 'nineButton':
            printer.add('9');
            break;

        case 'enterButton':
            start();
            break;

        case 'backButton':
            printer.add('back');
            break;
    }
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



