
function part1 () {
    let start = new Date().getTime();
    let w = 1000;
    let h = 1000;
    let grid = Array(w).fill(-1).map(x => Array(h).fill(-1));
    let points = getPoints();

    // Go through the entire grid and find the closest labeled points
    for (let i = 0; i < w; i++) {
        for (let j = 0; j < h; j++) {

            // Find the distances from this point to all the labeled points
            let distancesToPoint = points.map((point) => {
                return distance(point, {x : i, y : j});
            });

            // Find the shortest distance
            let min = getShortestDistance(distancesToPoint);

            // Find all distances that equal the min while handling ties
            // and set this point's value to the index of the closest labeled point
            if (distancesToPoint.filter(dist => dist === min).length === 1) {
                grid[i][j] = distancesToPoint.indexOf(min);
            }
        }
    }

    // Go through the grid again, this time looking around the borders
    // Add the labels found here to the set of regions to ignore
    let ignore = new Set();
    for (let i = 0; i < w; i++) {
        ignore.add(grid[0][i]);
        ignore.add(grid[i][0]);
        ignore.add(grid[grid[i].length - 1][i]);
        ignore.add(grid[i][grid[i].length - 1]);
    }

    // Calculate the size of each labeled point region
    let regionSizes = Array(points.length).fill(0);
    for (let i = 0; i < w; i++) {
        for (let j = 0; j < h; j++) {
            if (!ignore.has(grid[i][j])) {
                regionSizes[grid[i][j]]++;
            }
        }
    }

    // Find the largest region
    let max = -1;
    regionSizes.forEach(val => {
        if (val > max) {
            max = val;
        }
    });

    console.log(max);

    let end = new Date().getTime();
    console.log(`Part 1 executed in ${end - start} ms`);
}

function part2 () {
    let start = new Date().getTime();
    let w = 1000;
    let h = 1000;
    let grid = Array(w).fill(-1).map(x => Array(h).fill(-1));
    let points = getPoints();
    let size = 0;

    // Go through the entire grid and sum the distances to all the labeled points
    for (let i = 0; i < w; i++) {
        for (let j = 0; j < h; j++) {

            // Find the distances from this point to all the labeled points
            let distancesToPoint = points.map((point) => {
                return distance(point, {x : i, y : j});
            });

            grid[i][j] = distancesToPoint.reduce((s, val) => {return s + val}, 0);
            
            // Include all points in the region if they're < 32
            if (grid[i][j] < 10000) {
                size++;
            }
        }
    }

    // console.log(grid);

    console.log(size);

    let end = new Date().getTime();
    console.log(`Part 2 executed in ${end - start} ms`);
}

function distance(p1, p2) {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}

function getShortestDistance(arr) {
    let min = Number.MAX_SAFE_INTEGER;
    arr.forEach(val => {
        if (val < min) {
            min = val;
        }
    });

    return min;
}

function getPoints() {
    let testInput = ["1, 1", "1, 6", "8, 3", "3, 4", "5, 5", "8, 9"];
    let input = ["162, 168" , "86, 253" , "288, 359" , "290, 219" , "145, 343" , "41, 301" , "91, 214" , "166, 260" , "349, 353" , "178, 50" , "56, 79" , "273, 104" , "173, 118" , "165, 47" , "284, 235" , "153, 69" , "116, 153" , "276, 325" , "170, 58" , "211, 328" , "238, 346" , "333, 299" , "119, 328" , "173, 289" , "44, 223" , "241, 161" , "225, 159" , "266, 209" , "293, 95" , "89, 86" , "281, 289" , "50, 253" , "75, 347" , "298, 241" , "88, 158" , "40, 338" , "291, 156" , "330, 88" , "349, 289" , "165, 102" , "232, 131" , "338, 191" , "178, 335" , "318, 107" , "335, 339" , "153, 156" , "88, 119" , "163, 268" , "159, 183" , "162, 134"];
    let points = [];

    input.forEach(point => {
        let x = parseInt(point.split(", ")[0]);
        let y = parseInt(point.split(", ")[1]);

        points.push({x : x, y : y});
    });

    return points;
}

part1();
part2();