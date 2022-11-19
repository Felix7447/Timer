export default class Timer {
    constructor() {
    }

    start(userTime) {
        this.currentTime = Math.round(Date.now() / 1000);
        this.userTime = this.currentTime + 
            (parseInt(userTime[userTime.length - 3])*3600 + 
            parseInt(userTime[userTime.length - 2])*60 + 
            parseInt(userTime[userTime.length - 1]));
        this.finalTime = this.userTime - this.currentTime;
        return this.finalTime;
    }

    continue() {
        this.finalTime -= 1;
        this.hours = Math.floor(this.finalTime / 3600);
        this.minutes = Math.floor((this.finalTime - this.hours * 3600) / 60);
        this.seconds = Math.floor(this.finalTime % 60);
    }

    hasStoped() {
        if (this.finalTime === 1) {
            return true;
        } else {
            return false;
        }
    }

    stop() {
        this.finalTime = 0;
        this.userTime = 0;
        this.currentTime = 0;
    }
}