const play = document.querySelector(".controls .play");
const prev = document.querySelector(".controls .prev");
const next = document.querySelector(".controls .next");

const songName = document.querySelector(".song-name");
const artist = document.querySelector(".artist-name");
const image = document.querySelector(".image-container img");

const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress-bar");
const currentTime = document.querySelector(".current-time");
const duration = document.querySelector(".duration");
const playIcon = document.querySelector(".play i");



let songs = [
    {
        songName: "Nothing Else Matters",
        artist: "Metallica",
        image: "https://cdns-images.dzcdn.net/images/cover/f1c31620f0e108b707ce1a1af0954158/500x500.jpg",
        audioLink: "media/Metallica - Nothing Else Matters [Official ].mp3"
    },
    {
        songName: "Fallen Star",
        artist: "The Neighbourhood",
        image: "https://cdns-images.dzcdn.net/images/cover/40728751ca5dd2b0c48eb6179fcf8d7a/500x500.jpg",
        audioLink: "media/The_Neighbourhood_Fallen_Star.mp3"
    },
    {
        songName: "Do I Wanna Know?",
        artist: "Arctic Monkeys",
        image:  "https://i.scdn.co/image/ab67616d0000b2734ae1c4c5c45aabe565499163",
        audioLink: "media/Arctic Monkeys - Do I Wanna Know.mp3"
    },
    {
        songName: "Düşüncə",
        artist: "Vaqif Mustafazadə",
        image: "https://i.scdn.co/image/ab67616d0000b2735433ef46f31cb6d5a375cdb1",
        audioLink: "media/Vaqif_Mustafazade_dushunce_-_Dusunce_-_www.BiG.AZ.mp3"
    }
];


let isPlaying = false;
let songIndex = 0;
let song = new Audio(songs[songIndex].audioLink);

function handlePlay() {
    if (!isPlaying) {
        document.createElement("audio");
        console.log("Play button clicked");
        playIcon.classList.replace("fa-play", "fa-pause");
        song.play();
        isPlaying = true;
        song.addEventListener("timeupdate", handleTimeUpdate);
        songName.innerHTML = `${songs[songIndex].songName}`;
        artist.innerHTML = `${songs[songIndex].artist}`;
        image.src = `${songs[songIndex].image}`;

    } else {
        console.log("Pause button clicked");
        playIcon.classList.replace("fa-pause", "fa-play");
        song.pause();
        isPlaying = false;
    }
}

function handlePrev() {
    console.log("Prev button clicked");
    if (songIndex !== 0) {
        songIndex -= 1;
    } else {
        songIndex = 0;
    }
    if(isPlaying){
        song.pause();
        isPlaying = false;
    }
    song = new Audio(songs[songIndex].audioLink);
    handlePlay();
}

function handleNext() {
    console.log("Next button clicked");
    if (songIndex < songs.length - 1) {
        songIndex += 1;
    } else {
        songIndex = 0;
    }
    if(isPlaying){
        song.pause();
        isPlaying = false;
    }
    song = new Audio(songs[songIndex].audioLink);
    handlePlay();
    song.addEventListener("ended", handleSongEnd);
    function handleSongEnd() {
        console.log("Song ended");
        handleNext();
    }
}

song.addEventListener("ended", handleSongEnd);
function handleSongEnd() {
    console.log("Song ended");
    handleNext();
}



function handleTimeUpdate() {
    let currentTimeValue = song.currentTime;
    let durationValue = song.duration;
    let progressValue = (currentTimeValue / durationValue) * 100;
    progress.style.width = `${progressValue}%`;
    currentTime.innerHTML = `${formatTime(currentTimeValue)}`;
    duration.innerHTML = `${formatTime(durationValue)}`;
}

function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
}

play.addEventListener("click", handlePlay);
prev.addEventListener("click", handlePrev);
next.addEventListener("click", handleNext);

progressBar.addEventListener("mouseup", function (e) {
    let x = e.offsetX;
    let width = this.clientWidth;
    let duration = song.duration;
    song.currentTime = (x / width) * duration;
    if (!isPlaying) {
        handlePlay();
    }
});



let isDragging = false;

progressBar.addEventListener("mousedown", function (e) {
    isDragging = true;
});

window.addEventListener("mousemove", function (e) {
    if (isDragging) {
        let x = e.offsetX;
        let width = progressBar.clientWidth;
        let duration = song.duration;
        song.currentTime = (x / width) * duration;
    }
});

window.addEventListener("mouseup", function (e) {
    isDragging = false;
});


function handleKeydown(e) {
    if (e.keyCode === 32) {
        console.log("Spacebar pressed");
        handlePlay();
    }
}

document.addEventListener("keydown", handleKeydown); 