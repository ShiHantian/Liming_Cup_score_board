document.addEventListener('DOMContentLoaded', function() {
    let countdown;
    let paused = false; // 新增标记是否暂停
    let timeLeft = 0; // 剩余时间
    const displayTime = document.getElementById('time');
    const startButton = document.getElementById('start');
    const pauseButton = document.getElementById('pause');
    const resetButton = document.getElementById('reset');
    const inputMinutes = document.getElementById('inputMinutes');

    startButton.addEventListener('click', function() {
        if (!paused) { // 如果没有暂停，则根据输入的时间开始
            const minutes = parseInt(inputMinutes.value);
            if (!isNaN(minutes) && minutes > 0) {
                timeLeft = minutes * 60; // 更新剩余时间
                inputMinutes.value = ''; // 清空输入框
            }
        }
        if (timeLeft > 0) {
            startTimer(); // 从剩余时间开始或继续倒计时
        }
    });

    pauseButton.addEventListener('click', function() {
        clearInterval(countdown);
        paused = true; // 设置暂停标记
    });

    resetButton.addEventListener('click', function() {
        clearInterval(countdown);
        displayTime.innerText = '00:00';
        inputMinutes.value = '';
        paused = false; // 重置暂停标记
        timeLeft = 0; // 重置剩余时间
    });

    function startTimer() {
        updateDisplay(timeLeft);
        clearInterval(countdown); // 清除旧的倒计时（如果有）
        countdown = setInterval(function() {
            timeLeft--;
            updateDisplay(timeLeft);
            if (timeLeft <= 0) {
                clearInterval(countdown);
                paused = false; // 重置暂停标记
            }
        }, 1000);
        paused = false; // 开始倒计时后重置暂停标记
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
