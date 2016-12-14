export let timer = function () {
    let date = new Date();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    return {hour: hour, minutes: minutes, seconds: seconds}
};
