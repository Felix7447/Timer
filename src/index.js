// Styles
import '@styles/index.css';
import '@styles/buttons.css';
import '@styles/keyboard.css';
import '@styles/numbers.css';

// Creating classes
import Printer from './classes/printer.js';
import Timer from './classes/timer.js';

const printer = new Printer();
const timer = new Timer();

// Elements from dom=========================================

// Fields
let hours = document.getElementById('hours');
let minutes = document.getElementById('minutes');
let seconds = document.getElementById('seconds');

// Keyboard
let oneButton = document.getElementById('oneButton');
let twoButton = document.getElementById('twoButton');
let threeButton = document.getElementById('threeButton');
let fourButton = document.getElementById('fourButton');
let fiveButton = document.getElementById('fiveButton');
let sixButton = document.getElementById('sixButton');
let sevenButton = document.getElementById('sevenButton');
let eightButton = document.getElementById('eightButton');
let nineButton = document.getElementById('nineButton');
let zeroButton = document.getElementById('zeroButton');
let enterButton = document.getElementById('enterButton');
let backButton = document.getElementById('backButton');

// Other buttons
let buttonsContainer = document.getElementById('buttonsContainer');
let startButton = document.getElementById('startButton');
let otherButtonsContainer = document.getElementById('otherButtonsContainer');
let pauseButton = document.getElementById('pauseButton');
let stopButton = document.getElementById('stopButton');

//=============================================================


// Variables    ===============================================
let values = ['00', '00', '00'];
let timeInterval = 1000;
let interval;
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
    values = [hours.value, minutes.value, seconds.value];
    if(printer.check(values)) {
        return
    } else {
        toggleButtons(true);
        timer.start(values);
        interval = setInterval(() => {
            if (timer.hasStoped()) {
                stop()
            } else {
                timer.continue();
                const currentTime = numberToString([timer.seconds, timer.minutes, timer.hours]);
                printer.print(currentTime);
            }
        }, timeInterval)
    }
}

function numberToString(time) {
    const newTime = time.map(element => (
        (element < 10) ? 
            element = `0${element.toString()}` 
            : element = element.toString()
        )
    )
    return newTime;
}

function toggleButtons(isStarted) {
    if (isStarted) {
        buttonsContainer.style.display = "none";
        otherButtonsContainer.style.display = "flex";
        enterButton.disabled = true;
        backButton.disabled = true;
    } else {
        buttonsContainer.style.display = "flex";
        otherButtonsContainer.style.display = "none";
        enterButton.disabled = false;
        backButton.disabled = false;
    }
}

function pause() {
    clearInterval(interval);
    toggleButtons(false);
}

function stop() {
    toggleButtons(false);
    clearInterval(interval);
    values = ['00', '00', '00'];
    printer.print(values);
    printer.defaultValues();
}
