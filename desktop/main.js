// Desktop app (Windows, macOS, Linux): a window around the web app in
// dist/web, which runs entirely from local files.
const { app, BrowserWindow, shell, Menu } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 380,
    minHeight: 560,
    title: "Head & Neck Surgical Anatomy",
    icon: path.join(__dirname, "..", "dist", "web", "icons", "icon-512.png"),
    backgroundColor: "#f5f3ee",
    autoHideMenuBar: true,
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true }
  });
  win.loadFile(path.join(__dirname, "..", "dist", "web", "index.html"));
  // Links to other sites (references, licences) open in the default browser.
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/.test(url)) shell.openExternal(url);
    return { action: "deny" };
  });
  win.webContents.on("will-navigate", (e, url) => {
    if (/^https?:/.test(url)) {
      e.preventDefault();
      shell.openExternal(url);
    }
  });
}

Menu.setApplicationMenu(null);
app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
