const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      preload: `${__dirname}/preload.js`,
      nodeIntegration: true,
    },
  });
  win.webContents.openDevTools();
  win.loadFile("index.html");
};

app.whenReady().then(() => {
  try {
    createWindow();
    ipcMain.handle("get-music", () => {
      const albumpath = path.join(__dirname, "album");
      const files = fs.readdirSync(albumpath);
      const audiofiles = files.filter(file => file.endsWith(".mp3"));
      return audiofiles.map(file => ({
        name: file,
        path: path.join(albumpath, file),
      }));
    });
  } catch (error) {
    console.error(error);
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
