class Timer {
    constructor(userTime, timeText, containers, pauseButton) {

        this.currentTime = Date.now();
        this.currentTime = Math.round(this.currentTime / 1000);
        this.userTime = this.currentTime + 
            (userTime[userTime.length - 3]*3600 + userTime[userTime.length - 2]*60 + userTime[userTime.length - 1]);
        this.interval = 1000;

        this.hoursText = timeText[0];
        this.minutesText = timeText[1];
        this.secondsText = timeText[2];

        this.buttonContainer = containers[0];
        this.otherButtonContainer = containers[1];

        this.sound = new Audio('../assets/sounds/beep.wav');
        
        this.pauseButton = pauseButton;
        // this.pauseButton.addEventListener('click', this.pause());

        this.init();
    }

    init() {
        this.finalTime = this.userTime - this.currentTime;
        // console.log(this.userTime);
        this.seconds = Math.floor(this.finalTime % 60);
        this.minutes = Math.floor((this.finalTime / 60) % 60);
        this.hours = Math.floor((this.finalTime / (60 * 60)) % 24);

        this.checkNumbers()
        this.printNumbers()

        if (this.seconds == 0 && this.minutes == 0 && this.hours == 0) {
            this.stop()
            this.sound.play();
            setTimeout(() => {
                this.sound.pause()
            }, 3000)
        }
    }

    start() {
        this.intervalID = setInterval(() => {
            this.currentTime = Date.now();
            this.currentTime = Math.round(this.currentTime / 1000);
            this.init();
        }, this.interval);
    }

    pause() {
        clearInterval(this.intervalID);
        this.userTime = 
        (parseInt(this.hours)*3600 + parseInt(this.minutes)*60 + parseInt(this.seconds));
        // console.log(this.hours, this.minutes, this.seconds);
        this.buttonContainer.style.display = 'flex';
        this.otherButtonContainer.style.display = 'none';
    }

    stop() {
        clearInterval(this.intervalID);
        this.seconds = this.minutes = this.hours = 0;
        this.checkNumbers()
        this.printNumbers();
        this.buttonContainer.style.display = 'flex';
        this.otherButtonContainer.style.display = 'none';
        this.defaultValues(this.values);
    }

    checkNumbers() {
        this.hours = this.hours.toString();
        this.minutes = this.minutes.toString();
        this.seconds = this.seconds.toString();

        this.hours = (this.hours < 10) ? 
                `0${this.hours}` : this.hours;
        
        this.minutes = (this.minutes < 10) ? 
                `0${this.minutes}` : this.minutes;

        this.seconds = (this.seconds < 10) ? 
                `0${this.seconds}` : this.seconds;
         
    }

    printNumbers() {
        this.hoursText.innerHTML = this.hours;
        this.minutesText.innerHTML = this.minutes;
        this.secondsText.innerHTML = this.seconds;
    }

    defaultValues(arr) {
        myString = '000000';
        values = ['00', '00', '00']
    }
}