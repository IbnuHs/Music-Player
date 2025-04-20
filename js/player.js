const audio = document.getElementById("player-audio");
const playimg = document.getElementById("play-img");
const pauseimg = document.getElementById("pause-img");
const progress = document.getElementById("progress");
const start = document.getElementById("start");
const end = document.getElementById("end");
const volume = document.getElementById("range-volume");
const boxvolume = document.getElementById("box-volume");
const volumebtn = document.getElementById("volume-btn");
const titleSong = document.getElementById("title-song");
const nexbtn = document.getElementById("next");
const prevbtn = document.getElementById("prev");

let isPlaying = false;
if (isPlaying) {
  pauseimg.style.display = "none";
}
let indexSong = 0;
let mysong = [];
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const electronApi = await window.electronAPI;
    // console.log(electronApi);
    if (!electronApi) {
      console.error("Electron API tidak tersedia");
    }
    const songs = await window.electronAPI.getAudioFiles();
    mysong = songs;
    audio.src = songs[indexSong].path;
    audio.load();
  } catch (error) {
    console.error(error);
  }
});

function formatTime(time) {
  const minute = Math.floor(time / 60)
    .toString()
    .padStart(2, 0);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, 0);
  return `${minute}:${seconds}`;
}
audio.addEventListener("loadedmetadata", () => {
  const title = mysong[indexSong].name.replace(".mp3", "");
  titleSong.textContent = title;
  end.textContent = formatTime(audio.duration);
  console.log(audio.src);
  progress.max = audio.duration;
});
audio.addEventListener("timeupdate", () => {
  start.textContent = formatTime(audio.currentTime);
  progress.value = audio.currentTime;
});

audio.addEventListener("play", () => {
  playimg.style.display = "none";
  pauseimg.style.display = "block";
  console.log(indexSong);
  // isPlaying = false;
  // console.log("from event play", isPlaying);
});
audio.addEventListener("pause", () => {
  pauseimg.style.display = "none";
  playimg.style.display = "block";
  // isPlaying = true;
  // console.log("from event pause", isPlaying);
});

audio.addEventListener("ended", () => {
  isPlaying = false;
  if (indexSong + 1 === mysong.length) {
    indexSong = 0;
    audio.src = mysong[indexSong].path;
    audio.play();
    return;
  }
  indexSong += 1;
  audio.src = mysong[indexSong].path;
  audio.play();
  console.log(indexSong);
});

nexbtn.addEventListener("click", () => {
  if (indexSong + 1 === mysong.length) {
    indexSong = 0;
    audio.src = mysong[indexSong].path;
    audio.play();
    return;
  }
  indexSong += 1;
  audio.src = mysong[indexSong].path;
  audio.play();
});

prevbtn.addEventListener("click", () => {
  if (indexSong === 0) {
    indexSong = mysong.length - 1;
    audio.src = mysong[indexSong].path;
    audio.play();
    return;
  }
  indexSong -= 1;
  audio.src = mysong[indexSong].path;
  audio.play();
});
progress.addEventListener("change", () => {
  audio.currentTime = progress.value;
});
function playMusic() {
  if (!isPlaying) {
    audio.play();
  }
}
const playButton = document.getElementById("pause-play");
playButton.addEventListener("click", () => {
  if (!isPlaying) {
    isPlaying = true;
    audio.play();
    // console.log("from event pause", isPlaying);
    return;
  }
  isPlaying = false;
  audio.pause();
  // console.log("from event play ng", isPlaying);
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

let visible = false;
volumebtn.addEventListener("click", () => {
  if (visible) {
    boxvolume.style.visibility = "hidden";
    visible = false;
    return;
  }
  boxvolume.style.visibility = "visible";
  visible = true;
  return;
});
