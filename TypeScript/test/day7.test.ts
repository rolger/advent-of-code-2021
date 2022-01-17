import {readInput} from "./read-adventofcode-input";
import {expect} from "chai";


describe('Day7 Test', () => {

    it('should calc median', () => {
        let crabs: number[] = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];

        crabs.sort();

        expect(crabs[crabs.length / 2]).to.equal(2);
    });

    it('should calc median from file', () => {
        let lines = readInput(7);
        let crabs: number[] = lines[0].split(",").map(n => Number.parseInt(n.trim())).sort();

        let half = crabs.length / 2;
        expect(crabs[half]).to.equal(315);
        expect(crabs[half + 1]).to.equal(316);

        let sum = crabs.reduce((a, b) => a + b, 0);
        expect(Math.floor(sum / crabs.length)).to.equal(473);
    });

});


