import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { isDev } from "./util.js";
import { getStaticData, pollResources } from "./resourceManager.js";
import { getPreloadPath } from "./pathResolver.js";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    // preload script
    webPreferences: {
      // Preload script before opening main window renderer process
      preload: getPreloadPath(),
    },
    // Window configuration
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    // Load production build
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }

  // Function to pass data from main process to renderer process
  ipcMain.handle("get-static-data", async () => {
    const data = await getStaticData();
    return data;
  });

  // Pass the mainWindow to be used with webContents.send
  pollResources(mainWindow);
});
