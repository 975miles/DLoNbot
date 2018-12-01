var config = require("../config.json");

module.exports = function() {
    var months = ["january","february","march","april","may","june","july","august","september","october","november","december"];
    var calibration = (1036800000*504)+(86400000*7);
    var date = {};
    var d = new Date();
    var t = d.getTime()+calibration;
    var year = 1036800000;
    var month = 86400000;
    var day = 2880000;
    var hour = 120000;
    var minute = 2000;
    date.year = Math.floor(t/year);
    date.month = months[Math.floor(t/month)%12];
    date.monthNum = Math.floor(t/month)%12;
    date.day = Math.floor(t/day)%30;
    date.hour = Math.floor(((t/hour)+12)%24);
    date.minute = Math.floor(t/minute)%60;
    return date;
}
