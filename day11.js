// Find the fuel cell's rack ID, which is its X coordinate plus 10.
// Begin with a power level of the rack ID times the Y coordinate.
// Increase the power level by the value of the grid serial number (your puzzle input).
// Set the power level to itself multiplied by the rack ID.
// Keep only the hundreds digit of the power level (so 12345 becomes 3; numbers with no hundreds digit become 0).
// Subtract 5 from the power level.
var part1 = function () {
    var size = 300;
    var serial = 7672;
    var grid = [];
    // Generate grid that stores each cell's power level
    for (var i = 0; i < size; i++) {
        grid.push([]);
        for (var j = 0; j < size; j++) {
            var rackId = i + 10;
            var power = rackId * j;
            power += serial;
            power *= rackId;
            power = Math.floor((power % 1000) / 100);
            power -= 5;
            grid[i].push(power);
        }
    }
    // Go through each sub 2d array and find the total power
    // Update the current cell and power if it's the new max
    var max = -9007199254740991;
    var topCell = { x: -1, y: -1, size: -1 };
    var curSubSize = 1;
    // Remove this while loop and set curSubSize = 3 to solve for part 1
    while (curSubSize <= size / 10) {
        for (var i = 0; i < size - curSubSize; i++) {
            for (var j = 0; j < size - curSubSize; j++) {
                var startingCell = { x: i, y: j, size: curSubSize };
                var curSum = 0;
                for (var di = 0; di < curSubSize; di++) {
                    for (var dj = 0; dj < curSubSize; dj++) {
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
var start = new Date().getTime();
part1();
var end = new Date().getTime();
console.log("Part 1 executed in " + (end - start) + " ms");
