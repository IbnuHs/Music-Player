const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 400,
    height: 600,
    webPreferences: {
      preload: `${__dirname}/preload.js`,
      nodeIntegration: true,
    },
  });
  // win.webContents.openDevTools();
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

    ipcMain.handle("upload-music", async (event, { fileName, data }) => {
      albumfolderExist();
      try {
        for (let { name, buffer } of data) {
          const bufferData = Buffer.from(buffer);
          const savepath = path.join(__dirname, "album", name);
          await fs.promises.writeFile(savepath, bufferData);
          // console.log(bufferData);
        }
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
