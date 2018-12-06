import 'core-js';

class Point {
    x: number;
    y: number;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    distance(p: Point): number {
        return Math.abs(p.x - this.x) + Math.abs(p.y - this.y);
    }
}

class Day6 {
    public static Part1():number {
        let w: number = 20; // 10000
        let h: number = 20; // 10000
        let grid: number[][] = Array(w).fill(-1).map(x => Array(h).fill(-1));
        let points: Point[] = this.getPoints();

        // Go through the entire grid and find the closest labeled points
        for (let i: number = 0; i < w; i++) {
            for (let j: number = 0; j < h; j++) {

                // Find the distances from this point to all the labeled points
                let distancesToPoint: number[] = points.map((point: Point) => {
                    return point.distance(new Point(i, j));
                });

                // Find the shortest distance
                let min: number = this.getShortestDistance(distancesToPoint);

                // Find all distances that equal the min while handling ties
                // and set this point's value to the index of the closest labeled point
                if (distancesToPoint.filter(dist => dist === min).length === 1) {
                    grid[i][j] = distancesToPoint.indexOf(min);
                }
            }
        }

        // Go through the grid again, this time looking around the borders
        // Add the labels found here to the set of regions to ignore
        let ignore: Set<number> = new Set();
        for (let i: number = 0; i < w; i++) {
            ignore.add(grid[0][i]);
            ignore.add(grid[i][0]);
            ignore.add(grid[grid[i].length - 1][i]);
            ignore.add(grid[i][grid[i].length - 1]);
        }

        // Calculate the size of each labeled point region
        let regionSizes: number[] = Array(points.length).fill(0);
        for (let i: number = 0; i < w; i++) {
            for (let j:number = 0; j < h; j++) {
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

        return max;
    }

    public static getShortestDistance(arr: number[]): number {
        let min = Number.MAX_SAFE_INTEGER;
        arr.forEach(val => {
            if (val < min) {
                min = val;
            }
        });

        return min;
    }

    public static getPoints():Point[] {
        let testInput = ["1, 1", "1, 6", "8, 3", "3, 4", "5, 5", "8, 9"];
        let points: Point[] = [];

        testInput.forEach(point => {
            let x = parseInt(point.split(", ")[0]);
            let y = parseInt(point.split(", ")[1]);

            points.push(new Point(x, y));
        });

        return points;
    }
}

console.log(Day6.Part1());