const musicContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const audio = document.getElementById('audio');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const playlistEl = document.getElementById('playlist');

const songs = [
    {
        name: 'song1',
        displayName: 'Afsanay',
        artist: 'Talhah Yunus | Talha Anjum',
        cover: 'assets/images/cover1.jpg',
        path: 'assets/audio/song1.mp3'
    },
    {
        name: 'song2',
        displayName: "DONT MIND",
        artist: 'Talhah Yunus | Talha Anjum | Rap Demon',
        cover: 'assets/images/cover2.jpg',
        path: 'assets/audio/song2.mp3'
    },
    {
        name: 'song3',
        displayName: "ALWAYS ON TIME",
        artist: 'Talha Anjum',
        cover: 'assets/images/cover3.jpg',
        path: 'assets/audio/song3.mp3'
    },
    {
        name: 'song4',
        displayName: "Downers At Dusk",
        artist: 'Talha Anjum',
        cover: 'assets/images/cover4.jpg',
        path: 'assets/audio/song4.mp3'
    }
];

let songIndex = 0;

loadSong(songs[songIndex]);
buildPlaylist();

function loadSong(song) {
    title.innerText = song.displayName;
    artist.innerText = song.artist;
    audio.src = song.path;
    cover.src = song.cover;
    updateActivePlaylist();
}

function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    audio.pause();
}

function togglePlay() {
    const isPlaying = musicContainer.classList.contains('play');
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.innerText = `${currentMinutes}:${currentSeconds}`;

    if (!isNaN(duration)) {
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        durationEl.innerText = `${durationMinutes}:${durationSeconds}`;
    }
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function buildPlaylist() {
    playlistEl.innerHTML = '';
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.innerText = `${song.displayName} - ${song.artist}`;
        li.setAttribute('data-index', index);
        li.addEventListener('click', () => {
            songIndex = index;
            loadSong(songs[songIndex]);
            playSong();
        });
        playlistEl.appendChild(li);
    });
}

function updateActivePlaylist() {
    const listItems = playlistEl.querySelectorAll('li');
    listItems.forEach((item, index) => {
        if (index === songIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong);
musicContainer.addEventListener('click', setProgress);