const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  getAudioFiles: () => ipcRenderer.invoke("get-music"),
});
