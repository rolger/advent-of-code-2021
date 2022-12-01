"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const read_adventofcode_input_1 = require("./read-adventofcode-input");
class Line {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
}
function createLines(observable, withoutDiagonals) {
    return observable.pipe((0, rxjs_1.map)(s => {
        let [begin, end] = s.replace(/\s/g, "").split("->");
        let [beginX, beginY] = begin.split(",").map(n => Number.parseInt(n.trim()));
        let [endX, endY] = end.split(",").map(n => Number.parseInt(n.trim()));
        if (endX > beginX || beginY < endY) {
            return new Line({ x: beginX, y: beginY }, { x: endX, y: endY });
        }
        return new Line({ x: endX, y: endY }, { x: beginX, y: beginY });
    }), (0, rxjs_1.filter)(line => withoutDiagonals || line.start.x === line.end.x || line.start.y === line.end.y));
}
class Area {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.matrix = new Array(height);
        for (let i = 0; i < width; i++) {
            this.matrix[i] = new Array(width);
        }
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                this.matrix[i][j] = 0;
            }
        }
    }
    horizontal(number) {
        return this.matrix[number].toString();
    }
    draw(line) {
        if (line.start.y !== line.end.y && line.start.x !== line.end.x) {
            for (let j = line.start.x; j <= line.end.x; j++) {
                for (let i = line.start.y; i <= line.end.y; i++) {
                    this.matrix[i][j]++;
                }
            }
        }
        else if (line.start.y === line.end.y) {
            for (let i = line.start.x; i <= line.end.x; i++) {
                this.matrix[line.start.y][i]++;
            }
        }
        else {
            for (let i = line.start.y; i <= line.end.y; i++) {
                this.matrix[i][line.start.x]++;
            }
        }
    }
    dangerZones() {
        let count = 0;
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                if (this.matrix[i][j] > 1)
                    count++;
            }
        }
        return count;
    }
}
describe('Day5 Test', () => {
    it('should remove non horizontal/vertical lines', () => {
        let input = [
            "0,9 -> 5,9",
            "8,0 -> 0,8",
            "9,4 -> 3,4",
            "2,2 -> 2,1",
            "7,0 -> 7,4",
            "6,4 -> 2,0",
            "0,9 -> 2,9",
            "3,4 -> 1,4",
            "0,0 -> 8,8",
            "5,5 -> 8,2"
        ];
        let result = [];
        let observable = (0, rxjs_1.from)(input);
        createLines(observable).subscribe(list => {
            result.push(list);
        });
        console.log(result);
        expect(result.length).toBe(6);
    });
    it('should computes lines and size', () => {
        let input = [
            "0,9 -> 5,9",
            "8,0 -> 0,8",
            "9,4 -> 3,4",
            "2,2 -> 2,1",
            "7,0 -> 7,4",
            "6,4 -> 2,0",
            "0,9 -> 2,9",
            "3,4 -> 1,4",
            "0,0 -> 8,8",
            "5,5 -> 8,2"
        ];
        let result = [];
        let observable = (0, rxjs_1.from)(input);
        createLines(observable).subscribe(list => {
            result.push(list);
        });
        console.log(result);
        let width = 0;
        let height = 0;
        result.forEach(l => {
            width = Math.max(width, l.start.x, l.end.x);
            height = Math.max(height, l.start.y, l.end.y);
        });
        expect(width).toBe(9);
        expect(height).toBe(9);
    });
    it('should draw horizontal lines', () => {
        let line = new Line({ x: 0, y: 0 }, { x: 2, y: 0 });
        let area = new Area(4, 4);
        area.draw(line);
        expect(area.horizontal(0)).toBe("1,1,1,0");
    });
    it('should draw vertical lines', () => {
        let line = new Line({ x: 0, y: 0 }, { x: 0, y: 2 });
        let area = new Area(4, 4);
        area.draw(line);
        expect(area.horizontal(0)).toBe("1,0,0,0");
        expect(area.horizontal(1)).toBe("1,0,0,0");
        expect(area.horizontal(2)).toBe("1,0,0,0");
        expect(area.horizontal(3)).toBe("0,0,0,0");
    });
    it('should draw overlapping lines', () => {
        let line1 = new Line({ x: 0, y: 0 }, { x: 0, y: 2 });
        let line2 = new Line({ x: 0, y: 1 }, { x: 0, y: 3 });
        let area = new Area(4, 4);
        area.draw(line1);
        area.draw(line2);
        expect(area.horizontal(0)).toBe("1,0,0,0");
        expect(area.horizontal(1)).toBe("2,0,0,0");
        expect(area.horizontal(2)).toBe("2,0,0,0");
        expect(area.horizontal(3)).toBe("1,0,0,0");
    });
    it('should calculate dangerous areas', () => {
        let input = [
            "0,9 -> 5,9",
            "8,0 -> 0,8",
            "9,4 -> 3,4",
            "2,2 -> 2,1",
            "7,0 -> 7,4",
            "6,4 -> 2,0",
            "0,9 -> 2,9",
            "3,4 -> 1,4",
            "0,0 -> 8,8",
            "5,5 -> 8,2"
        ];
        let lines = [];
        let observable = (0, rxjs_1.from)(input);
        createLines(observable).subscribe(list => {
            lines.push(list);
        });
        console.log(lines);
        let width = 0;
        let height = 0;
        lines.forEach(l => {
            width = Math.max(width, l.start.x, l.end.x);
            height = Math.max(height, l.start.y, l.end.y);
        });
        let area = new Area(width + 1, height + 1);
        lines.forEach(l => area.draw(l));
        let result = area.dangerZones();
        expect(result).toBe(5);
    });
    it('should calculate dangerous areas for file', () => {
        let input = (0, rxjs_1.from)((0, read_adventofcode_input_1.readInput)(5));
        let lines = [];
        let observable = (0, rxjs_1.from)(input);
        createLines(observable).subscribe(list => {
            lines.push(list);
        });
        console.log(lines);
        let width = 0;
        let height = 0;
        lines.forEach(l => {
            width = Math.max(width, l.start.x, l.end.x);
            height = Math.max(height, l.start.y, l.end.y);
        });
        let area = new Area(width + 1, height + 1);
        lines.forEach(l => area.draw(l));
        let result = area.dangerZones();
        expect(result).toBe(4873);
    });
    it('should include diagonals in the calculation', () => {
        let input = [
            "0,9 -> 5,9",
            "8,0 -> 0,8",
            "9,4 -> 3,4",
            "2,2 -> 2,1",
            "7,0 -> 7,4",
            "6,4 -> 2,0",
            "0,9 -> 2,9",
            "3,4 -> 1,4",
            "0,0 -> 8,8",
            "5,5 -> 8,2"
        ];
        let lines = [];
        let observable = (0, rxjs_1.from)(input);
        createLines(observable, true).subscribe(list => {
            lines.push(list);
        });
        console.log(lines);
        let width = 0;
        let height = 0;
        lines.forEach(l => {
            width = Math.max(width, l.start.x, l.end.x);
            height = Math.max(height, l.start.y, l.end.y);
        });
        let area = new Area(width + 1, height + 1);
        lines.forEach(l => area.draw(l));
        let result = area.dangerZones();
        expect(result).toBe(12);
    });
});
