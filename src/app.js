// Here is the starting point for your application code.
// All stuff below is just to show you how it works. You can delete all of it.

// Use new ES6 modules syntax for everything.
import { remote, Notification } from 'electron'; // native electron module
import path from 'path';
import jetpack from 'fs-jetpack'; // module loaded from npm
import { timer } from './time/time'; // code authored by you in this project
import formateTime from './helpers/formate';
import node_notifier from 'node-notifier'
var app = remote.app;
var appDir = jetpack.cwd(app.getAppPath());


document.addEventListener('DOMContentLoaded', function () {
    var currentTime = new Date();
    var block = document.querySelector('.block');
    document.getElementById("setTimer").addEventListener("click", function () {
       currentTime = new Date();
        block.innerHTML = "Set Time:"+formateTime(currentTime.getHours()) +
                            ":" + formateTime(currentTime.getMinutes()) + ":"
                            + formateTime(currentTime.getSeconds());
        block.classList.remove('loading');
        setTimeout(function () {
            block.classList.add('loading');
        }, 400);
    });
    setInterval(function(){
        let time = timer();
        if(time.hour == currentTime.getHours()+1 && time.minutes == currentTime.getMinutes()){
            node_notifier.notify({title: "Upwork time",
                                    message: "Don't forget",
                                    sound: true,
                                    icon: path.join(__dirname, 'assets/tray.png'),
                                    wait: true});
            currentTime = new Date();
        }
        document.getElementById('time').innerHTML = formateTime(time.hour) + ":" + formateTime(time.minutes) + ":"
            + formateTime(time.seconds);
    }, 1000);

});
