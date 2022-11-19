export default class Printer {
    constructor() {
        this.hours = document.getElementById('hours');
        this.minutes = document.getElementById('minutes');
        this.seconds = document.getElementById('seconds');
        this.timeString = '000000';
        this.time = ['00', '00', '00'];
        this.init();
    }

    init() {
        this.inputs = [ this.hours, this.minutes, this.seconds];
        this.inputs.forEach(element => {
            element.addEventListener('input', () => this.keyboardCheck(this))
        })
    }

    add(value) {
        if (value === 'back') {
            this.timeString = this.timeString.slice(0, this.timeString.length - 1);
            this.timeString = '0' + this.timeString;
        } else {
            this.timeString += value;
            this.timeString = this.timeString.slice(1);
        }
    
        this.stringToArray(this.time, this.timeString);
        this.print(this.time);
        return this.time;
    }

    keyboardCheck(parent) {
        let symbols = ['e', '-', '+'];
        if (symbols.includes(event.data)) {
            alert(`Please don't add "${event.data}" number`);
            event.target.value = '00';
        } else if (event.target.value.length >= 3) {
            alert(`Please don't add more than 2 number`);
            event.target.value = '00';
        } else if (parent.seconds.value > 59 || parent.minutes.value > 59) {
            alert(`Error: that field cannot be greater than 59`)
            event.target.value = '00';
        }
    }

    stringToArray(arr, str) {
        arr[arr.length - 1] = `${str[str.length - 6]}${str[str.length - 5]}`;
        arr[arr.length - 2] = `${str[str.length - 4]}${str[str.length - 3]}`;
        arr[arr.length - 3] = `${str[str.length - 2]}${str[str.length - 1]}`;
    }

    numberToString(time) {
        time.forEach(element => {
            console.log(element.toString());
        })
    }

    print(time) {
        this.seconds.value = time[0];
        this.minutes.value = time[1];
        this.hours.value = time[2];
    }

    check(values) {
        const bigNumberError = this.isBigNumber(values);
        const allZeroError = this.isAllZero(values);

        return bigNumberError || allZeroError;
    }

    isBigNumber(values) {
        const error = values.map(element => {
            if (parseInt(element) > 59) {
                alert(`Error: that field cannot be greater than 59`);
                this.timeString = '000000';
                this.print(['00', '00', '00']);
                return true;
            } else {
                return false;
            }
        });

        return error.includes(true);
    }

    isAllZero(values) {
        const zeroError = values.every(element => element === '00');
        if (zeroError) {
            alert('Cannot start from zero');
        }
        return zeroError;
    }

    defaultValues() {
        this.timeString = '000000';
        this.time = ['00', '00', '00'];
    }
}
