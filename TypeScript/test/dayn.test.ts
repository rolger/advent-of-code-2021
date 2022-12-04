import {readInput} from "./read-adventofcode-input";

describe('DayN Test', () => {

    function sum(): (a: number, b: number) => number {
        return (a: number, b: number) => a + b;
    }

    describe('1st Puzzle', () => {
        it('should', () => {
        });

        xit('should ... from file', () => {
            let input = readInput(-1);

            let result = input
                .map(s => Number.parseInt(s))
                .reduce(sum(), 0);

            expect(result).toBe(0);
        });
    });

    describe('2nd Puzzle', () => {
        it('should', () => {
        });

        xit('should ... from file', () => {
            let input = readInput(-1);

            let result = input
                .map(s => Number.parseInt(s))
                .reduce(sum(), 0);

            expect(result).toBe(0);
        });
    });

});