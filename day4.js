var readline = require('readline');
var fs = require('fs');
var inputFile = readline.createInterface({
    input: fs.createReadStream('day4.in'),
    crlfDelay: Infinity
});
var Guard = /** @class */ (function () {
    function Guard(id, date) {
        this.id = id;
        this.sleep = [];
        this.date = date;
    }
    Guard.prototype.updateGuard = function (id) {
        this.id = id;
    };
    Guard.prototype.addSleepTime = function (minute) {
        this.sleep.push(minute);
    };
    Guard.prototype.getSleepTimes = function () {
        return this.sleep.sort(function (a, b) { return a - b; });
    };
    Guard.prototype.getTotalSleep = function () {
        var sleep = this.getSleepTimes();
        this.totalSleep = 0;
        for (var i = 0; i < sleep.length; i += 2) {
            this.totalSleep += (sleep[i + 1] - sleep[i]);
        }
        return this.totalSleep;
    };
    return Guard;
}());
var Day3 = /** @class */ (function () {
    function Day3() {
    }
    Day3.Part1 = function () {
        var _this = this;
        var start = new Date().getTime();
        var hm = {};
        inputFile.on('line', function (line) {
            _this.parseInput(hm, line);
        });
        inputFile.on('close', function () {
            // Calculate how much time each guard stayed asleep for
            var guards = {};
            _this.calcGuards(hm, guards);
            var maxGuard = "-1";
            var maxMinute = -1;
            var maxTime = -1;
            for (var g in guards) {
                if (guards[g].totalSleep > maxTime) {
                    maxTime = guards[g].totalSleep;
                    maxGuard = g;
                    maxMinute = guards[g].freqAsleep.indexOf(Math.max.apply(Math, guards[g].freqAsleep));
                }
            }
            console.log("Part 1");
            console.log("Guard " + maxGuard + " slept for " + maxTime + " mins. They slept the most on min " + maxMinute + " while working.");
            console.log("Result: " + parseInt(maxGuard.substring(1)) * maxMinute);
            var end = new Date().getTime();
            console.log("Part 1 executed in " + (end - start) + " ms");
        });
    };
    Day3.Part2 = function () {
        var _this = this;
        var start = new Date().getTime();
        var hm = {};
        inputFile.on('line', function (line) {
            _this.parseInput(hm, line);
        });
        inputFile.on('close', function () {
            // Calculate how much time each guard stayed asleep for
            var guards = {};
            _this.calcGuards(hm, guards);
            var maxGuard = "-1";
            var maxFreq = 0;
            var maxMinute = -1;
            for (var g in guards) {
                var curMax = Math.max.apply(Math, guards[g].freqAsleep);
                if (curMax > maxFreq) {
                    maxFreq = curMax;
                    maxMinute = guards[g].freqAsleep.indexOf(maxFreq);
                    maxGuard = g;
                }
            }
            console.log("Part 2");
            console.log("Guard " + maxGuard + " slept on min " + maxFreq + " the most. They slept the most on min " + maxMinute + " while working.");
            console.log("Result: " + parseInt(maxGuard.substring(1)) * maxMinute);
            var end = new Date().getTime();
            console.log("Part 1 executed in " + (end - start) + " ms");
        });
    };
    Day3.calcGuards = function (hm, guards) {
        for (var item in hm) {
            // Add the guard to the hashmap if it hasn't been seen yet
            if (guards[hm[item].id] === undefined) {
                guards[hm[item].id] = { totalSleep: 0, freqAsleep: [] };
                for (var i = 0; i < 60; i++) {
                    guards[hm[item].id].freqAsleep.push(0);
                }
            }
            // Increment the guard's sleep time by the total sleep he got on this night
            guards[hm[item].id].totalSleep += hm[item].getTotalSleep();
            var sleepTimes = hm[item].getSleepTimes();
            // Increment the guard's frequency array in pairs [start, end, start, end...]
            // to show how many nights they slept on that minute
            for (var times = 0; times < sleepTimes.length; times += 2) {
                for (var minute = sleepTimes[times]; minute < sleepTimes[times + 1]; minute++) {
                    guards[hm[item].id].freqAsleep[minute]++;
                }
            }
        }
    };
    Day3.parseInput = function (hm, line) {
        var parsedLine = line.split(" ");
        var currentDate = new Date(parsedLine[0].substring(1));
        var currentAction = parsedLine[2];
        var currentHour = parseInt(parsedLine[1].split(":")[0]);
        // If their start time is right before midnight, increment the date
        // since we know we only have one guard on duty per night
        if (currentHour === 23) {
            currentDate.setDate(currentDate.getDate() + 1);
        }
        // This is the first time we're seeing the currentDate, so add it to our hm
        if (hm[currentDate.toDateString()] === undefined) {
            hm[currentDate.toDateString()] = new Guard("-1", currentDate);
        }
        // Determine if the current line is about a new guard, falling asleep, or waking up
        if (currentAction === "Guard") {
            // Update the guard's id for this date
            hm[currentDate.toDateString()].updateGuard(parsedLine[3]);
        }
        else if (currentAction === "falls" || currentAction === "wakes") {
            // Add this minute to the falls array
            var minute = parseInt(parsedLine[1].split(":")[1].substring(0, 2));
            hm[currentDate.toDateString()].addSleepTime(minute);
        }
    };
    return Day3;
}());
Day3.Part1();
Day3.Part2();
