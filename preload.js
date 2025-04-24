const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  getAudioFiles: () => ipcRenderer.invoke("get-music"),
  uploadFiles: (file, buffer) => {
    // console.log(file);
    ipcRenderer.invoke("upload-music", { file, buffer });
  },
  // uploadMusic: file => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = async event => {
  //       try {
  //         const result = await ipcRenderer.invoke("upload-music", {
  //           name: file.name,
  //           type: file.type,
  //           size: file.size,
  //           data: event.target.result.buffer,
  //         });
  //         console.log(result);
  //         resolve(result);
  //       } catch (error) {
  //         reject(error);
  //       }
  //     };
  //     reader.onerror = error => {
  //       reject(error);
  //     };
  //     reader.readAsArrayBuffer(file);
  //   });
  // },
});
