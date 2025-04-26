const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  getAudioFiles: () => ipcRenderer.invoke("get-music"),
  uploadFiles: (fileName, data) => {
    // console.log(file);
    // console.log(data);
    ipcRenderer.invoke("upload-music", { fileName, data });
  },
});
