const audio = document.getElementById("player-audio");
const playimg = document.getElementById("play-img");
const pauseimg = document.getElementById("pause-img");
const progress = document.getElementById("progress");
const start = document.getElementById("start");
const end = document.getElementById("end");
const volume = document.getElementById("range-volume");
const boxvolume = document.getElementById("box-volume");
const volumebtn = document.getElementById("volume-btn");
console.log(volume);
let isPlaying = false;
if (isPlaying) {
  pauseimg.style.display = "none";
}
window.addEventListener("DOMContentLoaded", () => {
  audio.load();
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
  end.textContent = formatTime(audio.duration);
  // console.log(Math.floor(audio.currentTime));
  progress.max = audio.duration;
  console.log(audio.volume);
  // progress.value = audio.currenTime;
});
audio.addEventListener("timeupdate", () => {
  start.textContent = formatTime(audio.currentTime);
  // console.log(audio.currentTime);
  progress.value = audio.currentTime;
});

progress.addEventListener("change", () => {
  console.log(progress.value);
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
    console.log("Now Playing");
    playimg.style.display = "none";
    pauseimg.style.display = "block";
    isPlaying = true;
    audio.play();
    return;
  }
  audio.pause();
  pauseimg.style.display = "none";
  playimg.style.display = "block";
  isPlaying = false;
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
