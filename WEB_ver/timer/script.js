
let countdown;
let paused = false;
let timeLeft = 0;
const displayTime = document.getElementById('time');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const inputMinutes = document.getElementById('inputMinutes');
const audio_bell = new Audio('src/bell.mp3');

///Player part//////////////////////////////////////////////////////////////

const songs = [
    { src: 'src/Legends Never Die_cut.mp3', cover: 'src/Legends Never Die.png' },
    { src: 'src/BLOW.mp3', cover: 'src/BLOW.png' },
    { src: 'src/The Phoenix.mp3', cover: 'src/The Phoenix.png' },
    { src: 'src/Spectre_cut.mp3', cover: 'src/Spectre.png' },
    { src: 'src/PARANOIA.mp3', cover: 'src/PARANOIA.png' }
];

let currentSong = 0;
const audio = new Audio(songs[currentSong].src);
const cover = document.querySelector('.cover');
const playButton = document.querySelector('.play');
const nextButton = document.querySelector('.next');

cover.src = songs[currentSong].cover;

function togglePlay() {
    if (audio.paused) {
        audio.play();
        playButton.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
        cover.style.animationPlayState = 'running'; // 继续旋转动画
    } else {
        audio.pause();
        playButton.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
        cover.style.animationPlayState = 'paused'; // 暂停旋转动画
    }
}

playButton.addEventListener('click', togglePlay);

nextButton.addEventListener('click', () => {
    currentSong = (currentSong + 1) % songs.length;
    audio.src = songs[currentSong].src;
    cover.src = songs[currentSong].cover;
    audio.play();
    playButton.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
    cover.style.animationPlayState = 'running'; // 确保旋转动画继续进行
});

audio.addEventListener('ended', () => {
    nextButton.click(); // 自动切换到下一首歌
});

////////////////////////////////////////////////////////////////////////////////////////


function playSound(times) {
    audio_bell.play();
    audio_bell.onended = function () {
        if (times > 1) {
            playSound(times - 1);
        }
    };
}

startButton.addEventListener('click', function () {
    if (!paused) {
        const minutes = parseInt(inputMinutes.value);
        if (!isNaN(minutes) && minutes > 0) {
            timeLeft = minutes * 60;
            inputMinutes.value = '';
        }
    }
    // 当暂停后再点击开始，无论音乐是否已经在播放，都尝试继续播放音乐
    // 这里需要检查音乐是否已暂停，如果是，则继续播放
    if (audio.paused) {
        togglePlay(); // 如果音乐已暂停，则继续播放
    }

    if (timeLeft > 0) {
        //playSound(2); // 这行代码播放开始的提示音
        startTimer();
    }
});


pauseButton.addEventListener('click', function () {
    clearInterval(countdown);
    paused = true;
    // 如果音乐在播放，暂停音乐
    if (!audio.paused) {
        togglePlay();
    }
});

resetButton.addEventListener('click', function () {
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
    countdown = setInterval(function () {
        timeLeft--;
        updateDisplay(timeLeft);
        if (timeLeft <= 0) {
            clearInterval(countdown);
            paused = false;
            displayTime.style.color = 'red'; // 时间到
            playSound(1);
            // 倒计时结束时，如果音乐在播放，则暂停音乐
            if (!audio.paused) {
                togglePlay();
            }
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

