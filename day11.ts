// Find the fuel cell's rack ID, which is its X coordinate plus 10.
// Begin with a power level of the rack ID times the Y coordinate.
// Increase the power level by the value of the grid serial number (your puzzle input).
// Set the power level to itself multiplied by the rack ID.
// Keep only the hundreds digit of the power level (so 12345 becomes 3; numbers with no hundreds digit become 0).
// Subtract 5 from the power level.


const part1 = () => {
    const size: number = 300;
    const serial: number = 7672;
    let grid: number[][] = [];

    // Generate grid that stores each cell's power level
    for (let i = 0; i < size; i++) {
        grid.push([]);
        for (let j = 0; j < size; j++) {
            let rackId = i + 10;
            let power = rackId * j;
            power += serial;
            power *= rackId;
            power = Math.floor((power % 1000) / 100);
            power -= 5;
            grid[i].push(power);
        }
    }

    // Go through each sub 2d array and find the total power
    // Update the current cell and power if it's the new max
    let max: number = -9007199254740991;
    let topCell: Object = {x : -1, y: -1, size: -1};
    let curSubSize = 1;

    // Remove this while loop and set curSubSize = 3 to solve for part 1
    // For part 2, based on the sample outputs, we can bound the search to [1,30]
    // to reduce runtime while still being able to bruteforce
    while (curSubSize <= size) {
        for (let i = 0; i < size - curSubSize; i++) {
            for (let j = 0; j < size - curSubSize; j++) {
                let startingCell: Object = {x : i, y: j, size: curSubSize};
                let curSum: number = 0;

                for (let di = 0; di < curSubSize; di++) {
                    for (let dj = 0; dj < curSubSize; dj++) {
                        curSum += grid[i + di][j + dj];
                    }
                }

                if (curSum > max) {
                    max = curSum;
                    topCell = startingCell;
                }
            }
        }

        // console.log(`Size ${curSubSize} done`);
        curSubSize++;
    }

    console.log(grid[122][79]);
    console.log(topCell);
    console.log(max);
};

let start = new Date().getTime();
part1();
let end = new Date().getTime();
console.log(`Part 1 executed in ${end - start} ms`);