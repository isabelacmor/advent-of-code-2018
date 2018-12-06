"use strict";
exports.__esModule = true;
require("core-js");
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.distance = function (p) {
        return Math.abs(p.x - this.x) + Math.abs(p.y - this.y);
    };
    return Point;
}());
var Day6 = /** @class */ (function () {
    function Day6() {
    }
    Day6.Part1 = function () {
        var w = 20; // 10000
        var h = 20; // 10000
        var grid = Array(w).fill(-1).map(function (x) { return Array(h).fill(-1); });
        var points = this.getPoints();
        var _loop_1 = function (i) {
            var _loop_2 = function (j) {
                // Find the distances from this point to all the labeled points
                var distancesToPoint = points.map(function (point) {
                    return point.distance(new Point(i, j));
                });
                // Find the shortest distance
                var min = this_1.getShortestDistance(distancesToPoint);
                // Find all distances that equal the min while handling ties
                // and set this point's value to the index of the closest labeled point
                if (distancesToPoint.filter(function (dist) { return dist === min; }).length === 1) {
                    grid[i][j] = distancesToPoint.indexOf(min);
                }
            };
            for (var j = 0; j < h; j++) {
                _loop_2(j);
            }
        };
        var this_1 = this;
        // Go through the entire grid and find the closest labeled points
        for (var i = 0; i < w; i++) {
            _loop_1(i);
        }
        // Go through the grid again, this time looking around the borders
        // Add the labels found here to the set of regions to ignore
        var ignore = new Set();
        for (var i = 0; i < w; i++) {
            ignore.add(grid[0][i]);
            ignore.add(grid[i][0]);
            ignore.add(grid[grid[i].length - 1][i]);
            ignore.add(grid[i][grid[i].length - 1]);
        }
        // Calculate the size of each labeled point region
        var regionSizes = Array(points.length).fill(0);
        for (var i = 0; i < w; i++) {
            for (var j = 0; j < h; j++) {
                if (!ignore.has(grid[i][j])) {
                    regionSizes[grid[i][j]]++;
                }
            }
        }
        // Find the largest region
        var max = -1;
        regionSizes.forEach(function (val) {
            if (val > max) {
                max = val;
            }
        });
        return max;
    };
    Day6.getShortestDistance = function (arr) {
        var min = Number.MAX_SAFE_INTEGER;
        arr.forEach(function (val) {
            if (val < min) {
                min = val;
            }
        });
        return min;
    };
    Day6.getPoints = function () {
        var testInput = ["1, 1", "1, 6", "8, 3", "3, 4", "5, 5", "8, 9"];
        var points = [];
        testInput.forEach(function (point) {
            var x = parseInt(point.split(", ")[0]);
            var y = parseInt(point.split(", ")[1]);
            points.push(new Point(x, y));
        });
        return points;
    };
    return Day6;
}());
console.log(Day6.Part1());
