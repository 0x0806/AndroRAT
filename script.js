
class FlipClock {
    constructor() {
        this.hours = document.getElementById('hours');
        this.minutes = document.getElementById('minutes');
        this.seconds = document.getElementById('seconds');
        this.dateDisplay = document.getElementById('date');
        
        this.currentTime = {
            hours: '',
            minutes: '',
            seconds: ''
        };
        
        this.init();
    }
    
    init() {
        this.updateTime();
        setInterval(() => this.updateTime(), 1000);
        this.updateDate();
    }
    
    updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        if (this.currentTime.hours !== hours) {
            this.flipCard(this.hours, hours);
            this.currentTime.hours = hours;
        }
        
        if (this.currentTime.minutes !== minutes) {
            this.flipCard(this.minutes, minutes);
            this.currentTime.minutes = minutes;
        }
        
        if (this.currentTime.seconds !== seconds) {
            this.flipCard(this.seconds, seconds);
            this.currentTime.seconds = seconds;
        }
    }
    
    flipCard(unit, newValue) {
        const flipCard = unit.querySelector('.flip-card');
        const frontDigit = flipCard.querySelector('.flip-card-front .digit');
        const backDigit = flipCard.querySelector('.flip-card-back .digit');
        
        backDigit.textContent = newValue;
        flipCard.classList.add('flipping');
        
        setTimeout(() => {
            frontDigit.textContent = newValue;
            flipCard.classList.remove('flipping');
        }, 300);
    }
    
    updateDate() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        this.dateDisplay.textContent = now.toLocaleDateString('en-US', options);
        
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        const msUntilMidnight = tomorrow.getTime() - now.getTime();
        
        setTimeout(() => {
            this.updateDate();
            setInterval(() => this.updateDate(), 24 * 60 * 60 * 1000);
        }, msUntilMidnight);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new FlipClock();
});

document.addEventListener('touchstart', function() {}, { passive: true });

let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);
