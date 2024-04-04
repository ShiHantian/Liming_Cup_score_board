const songs = [
    { src: 'src/Legends Never Die.mp3', cover: 'src/Legends Never Die.png' },
    { src: 'src/BLOW.mp3', cover: 'src/BLOW.png' }
];

let currentSong = 0;
const audio = new Audio(songs[currentSong].src);
const cover = document.querySelector('.cover');
const playButton = document.querySelector('.play');
const nextButton = document.querySelector('.next');

// 设置初始封面
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
