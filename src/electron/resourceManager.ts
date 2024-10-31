import osUtils from "os-utils";
import fs from "fs";
import os from "os";
import { BrowserWindow } from "electron";

const POLLING_INTERVALL = 500;

// Collect and return system resources data
export function pollResources(mainWindow: BrowserWindow) {
  // Poll and send system resources every 500ms
  setInterval(async () => {
    const cpuUsage = await getCpuUsage();
    const ramUsage = getRamUsage();
    const diskUsage = getDiskData().usage;

    // Send data to specified renderer process (mainWindow)
    mainWindow.webContents.send("statistics", {
      cpuUsage,
      ramUsage,
      diskUsage,
    });
  }, POLLING_INTERVALL);
}

// Get static system data
export function getStaticData() {
  const totalStorage = getDiskData().total;
  const cpuModel = os.cpus()[0].model;
  const totalMemoryGB = Math.floor(os.totalmem() / 1024);

  return { totalStorage, cpuModel, totalMemoryGB };
}

function getCpuUsage() {
  return new Promise((resolve) => {
    osUtils.cpuUsage(resolve);
  });
}

function getRamUsage() {
  return 1 - osUtils.freememPercentage();
}

function getDiskData() {
  // Provide stats for the root directory
  const stats = fs.statfsSync(process.platform == "win32" ? "C://" : "/");
  // Get total space
  const total = stats.bsize * stats.blocks;
  // Get free space
  const free = stats.bsize * stats.bfree;

  return {
    // Convert total to GB
    total: Math.floor(total / 1_000_000_000),
    // Convert free to GB
    usage: 1 - free / total,
  };
}
