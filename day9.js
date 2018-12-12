"use strict";
exports.__esModule = true;
var addAfterMarble = function (value, marble) {
    var newMarble = {
        value: value,
        prev: marble,
        next: marble.next
    };
    marble.next.prev = newMarble;
    marble.next = newMarble;
    return newMarble;
};
var part2 = function () {
    var numPlayers = 448;
    var endMarble = 71628;
    var curPlayer = 1;
    var playerScores = [];
    // All players start with score of zero
    for (var i = 0; i < numPlayers; i += 1) {
        playerScores[i] = 0;
    }
    // The starting marble is linked to itself
    var curMarble = {
        value: 0,
        next: null,
        prev: null
    };
    curMarble.next = curMarble;
    curMarble.prev = curMarble;
    for (var i = 1; i <= endMarble * 100; i++) {
        if (i % 23 !== 0) {
            // Add the new marble (i) to the slot after the current marble
            // curMarble then gets updated to point to the newly added marble
            curMarble = addAfterMarble(i, curMarble.next);
        }
        else {
            playerScores[curPlayer] += i;
            curMarble = curMarble.prev.prev.prev.prev.prev.prev;
            playerScores[curPlayer] += curMarble.prev.value;
            curMarble.prev.prev.next = curMarble;
            curMarble.prev = curMarble.prev.prev;
        }
        // Move to the next player
        curPlayer++;
        curPlayer %= numPlayers;
    }
    console.log(Math.max.apply(Math, playerScores));
};
var part1 = function () {
    var numPlayers = 448;
    var endMarble = 71628 * 100;
    var curMarble = 2;
    var marbleCircle = [0, 1];
    var curPos = 1;
    var curPlayer = 2;
    var playerScores = [];
    // All players start with score of zero
    for (var i = 0; i < numPlayers; i++) {
        playerScores.push(0);
    }
    while (curMarble !== endMarble + 1) {
        // Not a special marble, just place it
        if (curMarble % 23 !== 0) {
            // console.log(`Trying to add marble ${curMarble}`);
            // console.log(`curPos: ${curPos}\t circleLength: ${marbleCircle.length}`);
            if (curPos + 2 >= marbleCircle.length + 1) {
                curPos = mod((curPos + 2), marbleCircle.length + 1) + 1;
            }
            else {
                curPos = mod((curPos + 2), marbleCircle.length + 1);
            }
            marbleCircle.splice(curPos, 0, curMarble);
        }
        else {
            playerScores[curPlayer] += curMarble;
            curPos = mod((curPos - 7), marbleCircle.length);
            playerScores[curPlayer] += marbleCircle[curPos];
            marbleCircle.splice(curPos, 1);
        }
        // console.log(`Current player is #${curPlayer}`);
        // for (let i = 0; i < marbleCircle.length; i++) {
        //     if (i === curPos) {
        //         process.stdout.write("(" + marbleCircle[i] + "), ");
        //     } else {
        //         process.stdout.write(marbleCircle[i] + ", ");
        //     }
        // }
        // console.log("\n");
        // Move to the next marble
        curMarble++;
        // Move to the next player
        curPlayer++;
        curPlayer %= numPlayers;
    }
    console.log(Math.max.apply(Math, playerScores));
};
var mod = function (n, m) {
    return ((n % m) + m) % m;
};
var start = new Date().getTime();
part2();
var end = new Date().getTime();
console.log("Part 1 executed in " + (end - start) + " ms");
