import Printer from "./printer.js";

const printer = new Printer();

// Elements from dom=========================================

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
let values = ['00', '00', '00'];
var myString = '000000';
let myTimeInNumbers = [];
let currentTime;
let timer;
let keyboardButtons = [oneButton, twoButton, threeButton, fourButton, fiveButton, sixButton, sevenButton, 
    eightButton, nineButton, zeroButton, enterButton, backButton];

const KEYBOARD_FUNCTIONS = {
    zeroButton: () => printer.add('0'),
    oneButton: () => printer.add('1'),
    twoButton: () => printer.add('2'),
    threeButton: () => printer.add('3'),
    fourButton: () => printer.add('4'),
    fiveButton: () => printer.add('5'),
    sixButton: () => printer.add('6'),
    sevenButton: () => printer.add('7'),
    eightButton: () => printer.add('8'),
    nineButton: () => printer.add('9'),
    backButton: () => printer.add('back'),
    enterButton: () => start(),
}

//=============================================================


// Event Listeners=============================

keyboardButtons.forEach(button => {
    button.addEventListener('click', clicked);
});
startButton.addEventListener('click', start); 
pauseButton.addEventListener('click', pause); 
stopButton.addEventListener('click', stop);  

// Functions=======================================

function clicked () {
    values = KEYBOARD_FUNCTIONS[this.id]();
}

function start() {
    if(printer.check(values)) {
        console.log('hi');
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

function defaultValues(arr) {
    arr.forEach(element => {
        element = '00';
    })
}

// =======================================

// OOP=======================================



