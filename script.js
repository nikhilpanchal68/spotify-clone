console.log("Welcome to Spotify");


//Initialize the variable
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songName = document.getElementsByClassName('songName');
let songItemPlay = document.getElementsByClassName('songItemPlay');
let masterSongName = document.getElementById('masterSongName');

let songs = [
    { songName: "Let me love you", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Apna Bana Le", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Bekhayali", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Besharam Rang", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Jhoome Jo", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Jims Theme Pathaan", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Kaise Hua", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Pathaans Theme", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Save Your Tears", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "Tujhe Kitna Chahne", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" },
];

songItems.forEach((element, i) => {
    // console.log(element,i)
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
});


// audioElement.play()


// Handle play / pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

//Listen to events
audioElement.addEventListener('timeupdate', () => {
    //update seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(songItemPlay).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(songItemPlay).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id)
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    masterSongName.innerText = songs[songIndex].songName
})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 9;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    masterSongName.innerText = songs[songIndex].songName
})

