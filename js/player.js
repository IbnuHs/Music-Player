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
const containermusic = document.getElementById("container-music");

let isPlaying = false;
if (isPlaying) {
  pauseimg.style.display = "none";
}
let indexSong = 0;
let mysong = [];
function chooseMusic(path, index) {
  audio.src = path;
  indexSong = index;
  audio.play();
  return;
}

const loadMusic = async () => {
  const electronApi = await window.electronAPI;
  // console.log(electronApi);
  if (!electronApi) {
    console.error("Electron API tidak tersedia");
  }
  const songs = await window.electronAPI.getAudioFiles();
  mysong = songs;
  audio.src = songs[indexSong].path;
  audio.load();
  // console.log(mysong);
  songs.forEach((i, index) => {
    const container = document.createElement("div");
    container.classList.add("song-box");
    const titlesongs = document.createElement("h1");
    titlesongs.classList.add("title-list");
    titlesongs.textContent = i.name;
    container.appendChild(titlesongs);
    container.addEventListener("click", () => {
      chooseMusic(i.path, index);
    });
    containermusic.appendChild(container);
  });
};

window.addEventListener("DOMContentLoaded", async () => {
  try {
    loadMusic();
    if (mysong.length === 0) {
      titleSong.textContent = "Music Is Empty, Added Some Music ...";
    }
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
  // console.log(audio.src);
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

// Display list songs
const songList = document.getElementById("listmusic");
const closebtn = document.getElementById("close-btn");
closebtn.addEventListener("click", () => {
  songList.style.height = "0px";
  songList.style.overflow = "hidden";
  songList.style.padding = "0px";
});

const listbtn = document.getElementById("list-btn");
listbtn.addEventListener("click", () => {
  songList.style.height = "90%";
  songList.style.overflow = "auto";
  songList.style.padding = "16px";
  containermusic.style.overflowY = "scroll";
});

const formadd = document.getElementById("form-music");
console.log(formadd);
const addbtn = document.getElementById("add-btn");
addbtn.addEventListener("click", () => {
  formadd.style.height = "100%";
});

const uploadbtn = document.getElementById("upload-btn");
const inputmusic = document.getElementById("upload-input");
const containeradded = document.getElementById("added-music");
uploadbtn.addEventListener("click", () => {
  inputmusic.click();
});
let aray = [];
inputmusic.addEventListener("change", e => {
  const musics = e.target.files;
  const arrayMusic = Array.from(musics);
  aray = [...aray, ...arrayMusic];
  inputmusic.value = "";
  render();
  function render() {
    containeradded.innerHTML = "";
    aray.forEach((i, index) => {
      const container = document.createElement("div");
      container.classList.add("music-added");
      const title = document.createElement("h1");
      title.textContent = i.name;
      const button = document.createElement("button");
      button.classList.add("delete-added");
      button.type = "button";
      const boxbutton = document.createElement("div");
      boxbutton.appendChild(button);
      const image = document.createElement("img");
      image.setAttribute("src", "assets/delete.svg");
      button.innerHTML = `<img src="assets/delete.svg" alt="" />`;
      container.appendChild(title);
      container.appendChild(boxbutton);
      containeradded.append(container);

      button.addEventListener("click", () => {
        console.log("tes");
        aray.splice(index, 1);
        render();
      });
    });
  }
});

const closeformbtn = document.getElementById("close-form");
const loading = document.getElementById("loading");
closeformbtn.addEventListener("click", () => {
  formadd.style.height = "0px";
});
const uploadform = document.getElementById("upload-form");
uploadform.addEventListener("submit", async e => {
  e.preventDefault();
  inputmusic.value = "";
  loading.style.visibility = "visible";
  if (aray.length === 0) {
    console.log(aray.length);
    alert("Music is Not Uploaded");
    loading.style.visibility = "hidden";
    return;
  }
  console.log(aray.length);
  let bufferArray = [];
  try {
    for (const file of aray) {
      const buffer = await file.arrayBuffer();
      const uint8 = new Uint8Array(buffer);
      let databuffer = {
        name: file.name,
        buffer: uint8,
      };
      bufferArray.push(databuffer);
      await window.electronAPI.uploadFiles(file.name, bufferArray);
    }
    setTimeout(() => {
      console.log("loading ...");
      containeradded.innerHTML = "";
      loading.style.visibility = "hidden";
      aray = [];
      loadMusic();
    }, 2000);
  } catch (error) {
    console.error(error);
  }
});
