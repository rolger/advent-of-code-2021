"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const read_adventofcode_input_1 = require("./read-adventofcode-input");
const rxjs_1 = require("rxjs");
function mostCommonBit(input, index) {
    let mostCommonNthBit = input.pipe((0, rxjs_1.reduce)((acc, diagnostic) => {
        if (diagnostic.at(index) === '0')
            acc.count0++;
        else
            acc.count1++;
        return acc;
    }, { count0: 0, count1: 0 }), (0, rxjs_1.map)(x => x.count1 >= x.count0 ? "1" : "0"));
    return mostCommonNthBit;
}
function powerConsumption(numberOfBits, data) {
    let gammaRate = '';
    let epsilon = '';
    for (let i = 0; i < numberOfBits; i++) {
        let mostCommonNthBit = mostCommonBit(data, i);
        mostCommonNthBit.subscribe(x => {
            gammaRate = gammaRate + x;
            epsilon = epsilon + (x === "0" ? "1" : "0");
        });
    }
    return {
        gammaRate: Number.parseInt(gammaRate, 2),
        epsilon: Number.parseInt(epsilon, 2),
        power() {
            return this.gammaRate * this.epsilon;
        }
    };
}
function findNumber(input, numberOfBits, invert) {
    for (let i = 0; i < numberOfBits; i++) {
        let filterChar = "0";
        let most1stCommonBit = mostCommonBit(input, i).subscribe(x => {
            filterChar = invert ? (x === "0" ? "1" : "0") : x;
        });
        let reduced = [];
        input.pipe((0, rxjs_1.filter)(diagnostic => diagnostic.at(i) === filterChar))
            .subscribe(list => {
            reduced.push(list);
        });
        // console.log(reduced);
        if (i == numberOfBits || reduced.length === 1)
            return reduced.at(0);
        input = (0, rxjs_1.from)(reduced);
    }
}
describe('Day3 Test', () => {
    it('compute from example', () => {
        let input = (0, rxjs_1.of)("00100", "11110", "10110", "10111", "10101", "01111", "00111", "11100", "10000", "11001", "00010", "01010");
        let result = powerConsumption(5, input);
        console.log(`gamma rate: ${result.gammaRate}`);
        console.log(`epsilon: ${result.epsilon}`);
        console.log(`result: ${result.power()}`);
    });
    it('compute from input file', () => {
        let input = (0, rxjs_1.from)((0, read_adventofcode_input_1.readInput)(4));
        let result = powerConsumption(12, input);
        console.log(`gamma rate: ${result.gammaRate}`);
        console.log(`epsilon: ${result.epsilon}`);
        console.log(`result: ${result.power()}`);
    });
    it('task2', () => {
        let input = (0, rxjs_1.of)("00100", "11110", "10110", "10111", "10101", "01111", "00111", "11100", "10000", "11001", "00010", "01010");
        let oxygenRating = Number.parseInt(findNumber(input, 5) || "0", 2);
        let co2Rating = Number.parseInt(findNumber(input, 5, true) || "0", 2);
        console.log(oxygenRating);
        console.log(co2Rating);
        console.log(co2Rating * oxygenRating);
    });
    it('task2 with input', () => {
        let input = (0, rxjs_1.from)((0, read_adventofcode_input_1.readInput)(4));
        let oxygenRating = Number.parseInt(findNumber(input, 12) || "0", 2);
        let co2Rating = Number.parseInt(findNumber(input, 12, true) || "0", 2);
        console.log(oxygenRating);
        console.log(co2Rating);
        console.log(co2Rating * oxygenRating);
    });
});
