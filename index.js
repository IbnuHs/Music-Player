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
const albumpath = path.join(__dirname, "album");

async function albumfolderExist() {
  try {
    fs.promises.mkdir(albumpath, { recursive: true });
  } catch (error) {
    console.error("Gagal Membuat folder album ", error);
  }
}
app.whenReady().then(() => {
  try {
    createWindow();
    ipcMain.handle("get-music", () => {
      const files = fs.readdirSync(albumpath);
      const audiofiles = files.filter(file => file.endsWith(".mp3"));
      return audiofiles.map(file => ({
        name: file,
        path: path.join(albumpath, file),
      }));
    });

    ipcMain.handle("upload-music", async (event, { file, buffer }) => {
      albumfolderExist();
      // console.log(file);
      // console.log("halo");
      // console.log(buffer);
      const savepath = path.join(albumpath, file);
      console.log(savepath);
      try {
        await fs.promises.writeFile(savepath, Buffer.from(buffer));
        console.log("Musik Berhasil Ditambahkan");
        return { success: true };
      } catch (error) {
        console.log("Musik Gagal Ditambahkan karena : ", error);
        return { success: false, error: error.message };
      }
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
