import {readInput} from "./read-adventofcode-input";

function findMarker(input: string) {
    
}

describe('Day6 Test', () => {

    describe('1st Puzzle', () => {
        it('should fin first marker', () => {
            let input = 'mjqjpqmgbljsphdztnvjfqwrcgsmlb';

            let pos = findMarker(input);

            expect(pos).toBe(7);
        });

        xit('should ... from file', () => {
            let input = readInput(6);


        });
    });

    describe('2nd Puzzle', () => {
        it('should', () => {
        });

        xit('should ... from file', () => {
            let input = readInput(6);

        });
    });

});