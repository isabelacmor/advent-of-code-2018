const readline = require('readline');
const fs = require('fs');

const inputFile = readline.createInterface({
    input: fs.createReadStream('day4.in'),
    crlfDelay: Infinity
});

class Guard {
    id: string;
    sleep: number[];
    date: string;
    totalSleep: number;

    constructor (id, date) {
        this.id = id;
        this.sleep = [];
        this.date = date;
    }

    updateGuard (id:string):void {
        this.id = id;
    }

    addSleepTime (minute:number):void {
        this.sleep.push(minute);
    }

    getSleepTimes ():number[] {
        return this.sleep.sort(function (a,b) { return a-b; });
    }
    getTotalSleep ():number {
        let sleep = this.getSleepTimes();
        this.totalSleep = 0;

        for (let i = 0; i < sleep.length; i+=2) {
            this.totalSleep += (sleep[i+1] - sleep[i]);
        }

        return this.totalSleep;
    }
}

class Day3 {
    public static Part1(): void {
        let start = new Date().getTime();
        let hm:Object = {};

        inputFile.on('line', (line:string) => {
            this.parseInput(hm, line);
        });

        inputFile.on('close', () => {
            // Calculate how much time each guard stayed asleep for
            let guards:Object = {};
            this.calcGuards(hm, guards);

            let maxGuard = "-1";
            let maxMinute = -1;
            let maxTime = -1;

            for (let g in guards) {
                if (guards[g].totalSleep > maxTime) {
                    maxTime = guards[g].totalSleep;
                    maxGuard = g;

                    maxMinute = guards[g].freqAsleep.indexOf(Math.max(...guards[g].freqAsleep));
                }
            }

            console.log("Part 1");
            console.log(`Guard ${maxGuard} slept for ${maxTime} mins. They slept the most on min ${maxMinute} while working.`);
            console.log(`Result: ${parseInt(maxGuard.substring(1)) * maxMinute}`);

            let end = new Date().getTime();
            console.log(`Part 1 executed in ${end - start} ms`);
        });
    }

    public static Part2(): void {
        let start = new Date().getTime();
        let hm:Object = {};

        inputFile.on('line', (line:string) => {
            this.parseInput(hm, line);
        });
        
        inputFile.on('close', () => {
            // Calculate how much time each guard stayed asleep for
            let guards:Object = {};
            this.calcGuards(hm, guards);

            let maxGuard = "-1";
            let maxFreq = 0;
            let maxMinute = -1;

            for (let g in guards) {
                let curMax = Math.max(...guards[g].freqAsleep);
                if (curMax > maxFreq) {
                    maxFreq = curMax;
                    maxMinute = guards[g].freqAsleep.indexOf(maxFreq);
                    maxGuard = g;
                }
            }

            console.log("Part 2");
            console.log(`Guard ${maxGuard} slept on min ${maxFreq} the most. They slept the most on min ${maxMinute} while working.`);
            console.log(`Result: ${parseInt(maxGuard.substring(1)) * maxMinute}`);

            let end = new Date().getTime();
            console.log(`Part 1 executed in ${end - start} ms`);
        });
    }

    public static calcGuards(hm: Object, guards: Object): void {
        for(let item in hm) {

            // Add the guard to the hashmap if it hasn't been seen yet
            if (guards[hm[item].id] === undefined) {
                guards[hm[item].id] = { totalSleep: 0, freqAsleep: [] };
                for (let i = 0; i < 60; i++) {
                    guards[hm[item].id].freqAsleep.push(0);
                }
            }

            // Increment the guard's sleep time by the total sleep he got on this night
            guards[hm[item].id].totalSleep += hm[item].getTotalSleep();
            let sleepTimes = hm[item].getSleepTimes();

            // Increment the guard's frequency array in pairs [start, end, start, end...]
            // to show how many nights they slept on that minute
            for (let times = 0; times < sleepTimes.length; times+=2) {
                for (let minute = sleepTimes[times]; minute < sleepTimes[times+1]; minute++) {
                    guards[hm[item].id].freqAsleep[minute]++;
                }
            }
        }
    }

    public static parseInput(hm: Object, line: string): void {
        let parsedLine:string[] = line.split(" ");
        let currentDate:Date = new Date(parsedLine[0].substring(1));
        let currentAction:string = parsedLine[2];
        let currentHour = parseInt(parsedLine[1].split(":")[0]);

        // If their start time is right before midnight, increment the date
        // since we know we only have one guard on duty per night
        if (currentHour === 23) {
            currentDate.setDate(currentDate.getDate()+1);
        }
        
        // This is the first time we're seeing the currentDate, so add it to our hm
        if (hm[currentDate.toDateString()] === undefined) {
            hm[currentDate.toDateString()] = new Guard("-1", currentDate);
        }

        // Determine if the current line is about a new guard, falling asleep, or waking up
        if (currentAction === "Guard") {
            // Update the guard's id for this date
            hm[currentDate.toDateString()].updateGuard(parsedLine[3]);
        } else if (currentAction === "falls" || currentAction === "wakes") {
            // Add this minute to the falls array
            let minute = parseInt(parsedLine[1].split(":")[1].substring(0,2));
            hm[currentDate.toDateString()].addSleepTime(minute);
        }
    }
}

Day3.Part1();
Day3.Part2();