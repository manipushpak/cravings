"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var TimeHelper = /** @class */ (function () {
    function TimeHelper() {
    }
    TimeHelper.getHours = function (info) {
        var hours = [];
        info.forEach(function (i) {
            var t = {
                open: i.open,
                startTime: parseInt(i.startTime) || -1,
                endTime: parseInt(i.endTime) || -1,
            };
            hours.push(t);
        });
        console.log(hours);
        return hours;
    };
    TimeHelper.isOpen = function (vendor) {
        var times = vendor.vendorInfo.hours;
        if (times == null || times.length == 0) {
            return false;
        }
        var currDate = moment().format("e HH mm");
        var dayindex = (parseInt(currDate.charAt(0)));
        var currhour = (parseInt(currDate.substring(2, 4)));
        var currmin = (parseInt(currDate.substring(5, currDate.length)));
        console.log(dayindex);
        var currTime = times[dayindex];
        if (currTime.open = false) {
            return false;
        }
        var curr = currhour * 100 + currmin;
        console.log(currTime.startTime);
        console.log(curr);
        console.log(currTime.endTime);
        if (curr >= currTime.startTime && curr < currTime.endTime) {
            return true;
        }
        return false;
    };
    return TimeHelper;
}());
exports.TH = TimeHelper;
