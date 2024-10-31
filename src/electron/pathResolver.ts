import { app } from "electron";
import path from "path";
import { isDev } from "./util.js";

// Used to resolve path to preload script
export function getPreloadPath() {
  return path.join(
    app.getAppPath(),
    // if running in development mode, prepend `.` to path
    isDev() ? "." : "..",
    "/dist-electron/preload.cjs"
  );
}
