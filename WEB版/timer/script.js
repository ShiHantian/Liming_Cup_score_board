document.addEventListener('DOMContentLoaded', function() {
    let countdown;
    let paused = false;
    let timeLeft = 0;
    const displayTime = document.getElementById('time');
    const startButton = document.getElementById('start');
    const pauseButton = document.getElementById('pause');
    const resetButton = document.getElementById('reset');
    const inputMinutes = document.getElementById('inputMinutes');
    const audio = new Audio('src/bell.mp3');

    function playSound(times) {
        audio.play();
        audio.onended = function() {
            if (times > 1) {
                playSound(times - 1);
            }
        };
    }

    startButton.addEventListener('click', function() {
        if (!paused) {
            const minutes = parseInt(inputMinutes.value);
            if (!isNaN(minutes) && minutes > 0) {
                timeLeft = minutes * 60;
                inputMinutes.value = '';
            }
        }
        if (timeLeft > 0) {
            playSound(2);
            startTimer();
        }
    });

    pauseButton.addEventListener('click', function() {
        clearInterval(countdown);
        paused = true;
    });

    resetButton.addEventListener('click', function() {
        clearInterval(countdown);
        displayTime.innerText = '00:00';
        displayTime.style.color = 'black';
        inputMinutes.value = '';
        paused = false;
        timeLeft = 0;
    });

    function startTimer() {
        updateDisplay(timeLeft);
        clearInterval(countdown);
        countdown = setInterval(function() {
            timeLeft--;
            updateDisplay(timeLeft);
            if (timeLeft <= 0) {
                clearInterval(countdown);
                paused = false;
                displayTime.style.color = 'red'; // 时间到
                playSound(1);
            }
        }, 1000);
        paused = false;
    }

    function updateDisplay(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        displayTime.innerText = `${pad(minutes)}:${pad(remainingSeconds)}`;
    }

    function pad(number) {
        return number < 10 ? '0' + number : number;
    }
});
