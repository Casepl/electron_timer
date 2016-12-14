// This is main process of Electron, started as first thing when your
// app starts. This script is running through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import path from 'path';
import url from 'url';
import { app, Menu, Tray } from 'electron';
import { devMenuTemplate } from './menu/dev_menu_template';
import { trayMenuTemplate } from './menu/tray_menu_template';
import createWindow from './helpers/window';

// Special module holding environment variables which you declared
// in config/env_xxx.json file.
import env from './env';

var mainWindow;

var setApplicationMenu = function () {
    var menus = [];
    if (env.name !== 'production') {
        menus.push(devMenuTemplate);
    }
    Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

// Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.
if (env.name !== 'production') {
    var userDataPath = app.getPath('userData');
    app.setPath('userData', userDataPath + ' (' + env.name + ')');
}

app.on('ready', function () {
    setApplicationMenu();
    var force_quit = false;
    var mainWindow = createWindow('main', {
        width: 1000,
        height: 600,
        show:false
    });
    const tray = new Tray(path.join(__dirname, 'assets/tray.png'));
    trayMenuTemplate.click = function() {
        force_quit = true;
        app.quit();
    };
    var contextMenu = Menu.buildFromTemplate([
        trayMenuTemplate
    ]);


    tray.on('click', () => {
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
    });

    // Continue to handle mainWindow "close" event here
    mainWindow.on('close', function(e){
        if(!force_quit){
            e.preventDefault();
            mainWindow.hide();
        }
    });

    // You can use 'before-quit' instead of (or with) the close event
    app.on('before-quit', function (e) {
        // Handle menu-item or keyboard shortcut quit here
        if(!force_quit){
            e.preventDefault();
            mainWindow.hide();
        }
    });

    mainWindow.on('show', () => {
        tray.setHighlightMode('always')
    });

    mainWindow.on('hide', () => {
        tray.setHighlightMode('never')
    });

    mainWindow.on("minimize", (e) => {
        e.preventDefault();
        mainWindow.hide();
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'app.html'),
        protocol: 'file:',
        slashes: true
    }));

    tray.setContextMenu(contextMenu);

    if (env.name === 'development') {
        mainWindow.openDevTools();
    }
});

app.on('window-all-closed', function () {
    app.quit();
});
