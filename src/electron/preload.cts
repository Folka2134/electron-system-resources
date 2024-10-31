import { ipcRenderer } from "electron";

const electron = require("electron");

// ContextBrdige is used to communicate data between Electron process and window process
// Expose functions to the renderer process
electron.contextBridge.exposeInMainWorld("electron", {
  // Subscribe to an event
  subscribeStatistics: (callback: (statistics: any) => void) => {
    ipcRenderer.on("statistics", (event, statistics) => {
      callback(statistics);
    });
  },
  // Requests static data from main process
  //   getStaticData: () => console.log("static"),

  getStaticData: async () => {
    const data = await ipcRenderer.invoke("get-static-data");
    return data;
  },
});
