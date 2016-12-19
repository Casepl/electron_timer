export let timer = function () {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    return {hours: hours, minutes: minutes, seconds: seconds}
};
