const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  getAudioFiles: () => ipcRenderer.invoke("get-music"),
  uploadMusic: file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async event => {
        try {
          const result = await ipcRenderer.invoke("upload-music", {
            name: file.name,
            type: file.type,
            size: file.size,
            data: event.target.result.buffer,
          });
          resolve(result);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = error => {
        reject(error);
      };
      reader.readAsArrayBuffer(file);
    });
  },
});
