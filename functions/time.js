var config = require("../config.json");

module.exports = function (from) {
    var Time = Math.floor(from / 1000) - config.startTime;
    console.log(Math.floor(from / 1000) + "\n" + config.startTime + "\n" + (Math.floor(from / 1000) - config.startTime));
    Time = Time.toString().split("")
    while (Time.length > 6) {
        Time[1] = Time[0] + Time[1];
        Time.shift();
        console.log(Time)
    }

    Time = {
        "second": Number(Time[5]),
        "minute": Number(Time[4]),
        "hour": Number(Time[3]),
        "day": Number(Time[2]),
        "month": Number(Time[1]),
        "year": Number(Time[0]),
        "monthName": config.monthOrder[Number(Time[1])],
    };
    console.log(Time)
    return Time;
}