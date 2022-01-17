import {expect} from "chai";
import {readInput} from "./read-adventofcode-input";

function findLowestLocations(matrix: string[]) {
    let low: number[] = [];
    for (let i = 0; i < matrix.length; i++) {
        low = low.concat(lowestLocation(toIntArray(matrix[i - 1]), toIntArray(matrix[i]), toIntArray(matrix[i + 1])));
    }
    return low;
}

function lowestLocation(line1: number[], line2: number[], line3: number[]) {
    let result = [];

    if (line1.length === 0) {
        if (line2[0] < line3[0] && line2[0] < line2[1]) {
            result.push(line2[0]);
        }

        for (let i = 1; i < line2.length - 1; i++) {
            if (line2[i] < line3[i] && line2[i] < line2[i - 1] && line2[i] < line2[i + 1]) {
                result.push(line2[i]);
            }
        }

        if (line2[line2.length - 1] < line3[line2.length - 1] && line2[line2.length - 1] < line2[line2.length - 2]) {
            result.push(line2[line2.length - 1]);
        }
        return result;
    }

    if (line3.length === 0) {
        if (line2[0] < line1[0] && line2[0] < line2[1]) {
            result.push(line2[0]);
        }

        for (let i = 1; i < line2.length - 1; i++) {
            if (line2[i] < line1[i] && line2[i] < line2[i - 1] && line2[i] < line2[i + 1]) {
                result.push(line2[i]);
            }
        }

        if (line2[line2.length - 1] < line1[line2.length - 1] &&
            line2[line2.length - 1] < line2[line2.length - 2]) {
            result.push(line2[line2.length - 1]);
        }
        return result;
    }

    if (line2[0] < line1[0] &&
        line2[0] < line3[0] &&
        line2[0] < line2[1]) {
        result.push(line2[0]);
    }

    for (let i = 1; i < line2.length - 1; i++) {
        if (line2[i] < line1[i] &&
            line2[i] < line3[i] &&
            line2[i] < line2[i - 1] && line2[i] < line2[i + 1]) {
            result.push(line2[i]);
        }
    }

    if (line2[line2.length - 1] < line1[line2.length - 1] &&
        line2[line2.length - 1] < line3[line2.length - 1] &&
        line2[line2.length - 1] < line2[line2.length - 1 - 1]) {
        result.push(line2[line2.length - 1]);
    }

    return result;
}

function toIntArray(line: string | undefined) {
    if (line === undefined) {
        return [];
    }
    return line.split("").map(s => Number.parseInt(s));
}

describe('Day9 Test', () => {

    describe('check first row', () => {
        it('should find lowest', () => {
            let low = lowestLocation([], [2, 1, 9], [3, 9, 8]);
            expect(low).to.eql([1]);
            low = lowestLocation([], [1, 2, 9], [3, 9, 8]);
            expect(low).to.eql([1]);
            low = lowestLocation([], [9, 2, 1], [8, 9, 3]);
            expect(low).to.eql([1]);
        });
        it('should find lowest more digits', () => {
            let low = lowestLocation([], toIntArray("2199943210"), toIntArray("3987894921"));
            expect(low).to.eql([1, 0]);
        });
    });

    describe('check last row', () => {
        it('should find lowest', () => {
            let low = lowestLocation([9, 6, 7], [6, 5, 6], []);
            expect(low).to.eql([5]);
            low = lowestLocation([9, 6, 7], [4, 5, 6], []);
            expect(low).to.eql([4]);
            low = lowestLocation([9, 6, 7], [6, 5, 3], []);
            expect(low).to.eql([3]);
        });
    });

    describe('check middle row', () => {
        it('should find lowest', () => {
            let low = lowestLocation([9, 8, 7], [8, 5, 6], [7, 6, 7]);
            expect(low).to.eql([5]);
            low = lowestLocation([9, 8, 7], [3, 5, 6], [7, 6, 7]);
            expect(low).to.eql([3]);
            low = lowestLocation([9, 8, 7], [9, 5, 1], [7, 6, 7]);
            expect(low).to.eql([1]);
        });
    });

    it('should find lowest locations in matrix', () => {
        let matrix = [
            "2199943210",
            "3987894921",
            "9856789892",
            "8767896789",
            "9899965678"
        ];
        let lowestLocations = findLowestLocations(matrix);

        expect(lowestLocations).to.eql([1, 0, 5, 5]);
        let sumRisk = lowestLocations.map(i => i + 1)
            .reduce((a, b) => a + b);
        expect(sumRisk).to.equal(15);
    });

    it('should find lowest locations in file', () => {
        let input = readInput(9);
        let lowestLocations = findLowestLocations(input);

        let sumRisk = lowestLocations.map(i => i + 1)
            .reduce((a, b) => a + b);
        expect(sumRisk).to.equal(425);
    });

});