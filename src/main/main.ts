import { app, BrowserWindow, ipcMain, Menu } from "electron";
declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  return new BrowserWindow({
    height: 600,
    width: 800,
    useContentSize: true,
    titleBarStyle: "hidden",
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });
};

const createActions = (mw: BrowserWindow) => {
  ipcMain.on("get-locale", (e) => {
    e.reply("get-locale-reply", app.getLocale());
  });
};

app.on("ready", () => {
  let mw = createWindow();
  createActions(mw);
  mw.webContents.openDevTools();
  mw.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  Menu.setApplicationMenu(null);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
