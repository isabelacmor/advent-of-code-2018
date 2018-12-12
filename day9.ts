import { createSecureContext } from "tls";

const addAfterMarble = (value: number, marble) => {
    const newMarble = {
        value,
        prev: marble,
        next: marble.next,
    };
    marble.next.prev = newMarble;
    marble.next = newMarble;
    return newMarble;
};

const part2 = () => {
    const numPlayers: number = 448;
    const endMarble: number = 71628;
    let curPlayer = 1;
    let playerScores = [];

    // All players start with score of zero
    for (let i = 0; i < numPlayers; i += 1) {
        playerScores[i] = 0;
    }
    
    // The starting marble is linked to itself
    let curMarble = {
        value: 0,
        next: null,
        prev: null
    };
    curMarble.next = curMarble;
    curMarble.prev = curMarble;
    

    for (let i = 1; i <= endMarble * 100; i++) {
        if (i % 23 !== 0) {
            // Add the new marble (i) to the slot after the current marble
            // curMarble then gets updated to point to the newly added marble
            curMarble = addAfterMarble(i, curMarble.next);
        } else {
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

    console.log(Math.max(...playerScores));
}

const part1 = () => {
    const numPlayers: number = 448;
    const endMarble: number = 71628;
    let curMarble: number = 2;
    let marbleCircle: number[] = [0, 1];
    let curPos: number = 1;
    let curPlayer: number = 2;
    let playerScores: number[] = [];

    // All players start with score of zero
    for (let i = 0; i < numPlayers; i++) {
        playerScores.push(0);
    }

    while (curMarble !== endMarble + 1) {
        // Not a special marble, just place it
        if (curMarble % 23 !== 0) {
            if (curPos + 2 >= marbleCircle.length + 1) {
                curPos = mod((curPos + 2), marbleCircle.length + 1) + 1;
            } else {
                curPos = mod((curPos + 2), marbleCircle.length + 1);
            }
            marbleCircle.splice(curPos, 0, curMarble);
        } else {
            playerScores[curPlayer] += curMarble;
            curPos = mod((curPos - 7), marbleCircle.length);
            playerScores[curPlayer] += marbleCircle[curPos];
            marbleCircle.splice(curPos, 1);
        }

        // Move to the next marble
        curMarble++;

        // Move to the next player
        curPlayer++;
        curPlayer %= numPlayers;
    }

    console.log(Math.max(...playerScores));
};

const mod = (n: number, m: number): number => {
    return ((n%m)+m)%m;
}

let start = new Date().getTime();
part2();
let end = new Date().getTime();
console.log(`Part 1 executed in ${end - start} ms`);