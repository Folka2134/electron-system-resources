import { app, BrowserWindow } from "electron";
import path from "path";
import { isDev } from "./util.js";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    // Window configuration
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    // Load production build
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }
});
