// Here is the starting point for your application code.
// All stuff below is just to show you how it works. You can delete all of it.

// Use new ES6 modules syntax for everything.
import { remote, Notification } from 'electron'; // native electron module
import path from 'path';
import { timer } from './time/time'; // code authored by you in this project
import formateTime from './helpers/formate';
import { WindowsToaster  } from 'node-notifier'
var windT = new WindowsToaster();

document.addEventListener('DOMContentLoaded', function () {
    var currentTime = new Date();
    var block = document.querySelector('.block');
    var timeListEl = document.getElementById('time-list');
    var timeList = [];
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
        let el = null;
        let listEl = null;
        let timeString = formateTime(time.hours) + ":" + formateTime(time.minutes) + ":"
            + formateTime(time.seconds);
        if(time.hour == currentTime.getHours()+1 && time.minutes == currentTime.getMinutes()){
            windT.notify({title: "Upwork time",
                                    message: "Don't forget",
                                    sound: true,
                                    icon: path.join(__dirname, 'assets/tray.png'),
                                    wait: true});
            currentTime = new Date();
            timeString = formateTime(currentTime.getHours()) + ":" + formateTime(currentTime.getMinutes()) + ":"
                + formateTime(currentTime.getSeconds());
            timeList.push(timeString);
            if(timeList.length === 11){
                timeList.shift();
                el = timeListEl.getElementsByTagName('li')[0];
                el.classList.add('loading');
                setTimeout(function(){
                    timeListEl.removeChild(el);
                }, 200);
            }
            listEl =  document.createElement('li');
            listEl.classList.add("list-item");
            listEl.innerHTML = timeList[timeList.length - 1];
            timeListEl.appendChild(listEl);
        }

        document.getElementById('time').innerHTML = timeString;
    }, 1000);

});
