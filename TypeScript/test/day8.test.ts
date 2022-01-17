import {expect} from "chai";
import {readInput} from "./read-adventofcode-input";


type CountFunction = (singleEntry: string, digitDescription: Map<string, string[]>) => number;

function countUniqueDigitsInOutput(singleEntry: string): number {
    let outputValues = singleEntry.split("|")[1].split(" ");

    return outputValues
        .filter(value => value.length === 2 ||
        value.length === 3 ||
        value.length === 4 ||
        value.length === 7).length;
}

function containsAll(value: string, characters: string[] | undefined) {
    if (characters === undefined) {
        return false;
    }
    let containsAll = true;
    for (const char of characters) {
        containsAll = containsAll && value.includes(char);
    }
    return containsAll;
}

function decodedDigitsInOutput(singleEntry: string, digitDescription: Map<string, string[]> = new Map()): number {
    let outputValues = singleEntry.split("|")[1].split(" ");

    let digits = outputValues
        .filter(s => s.length !== 0)
        .map(value => {
            if (value.length === 7) {
                return 8;
            }
            if (value.length === 3) {
                return 7;
            }
            if (value.length === 2) {
                return 1;
            }
            if (value.length === 4) {
                return 4;
            }

            if (value.length === 5) {
                if (containsAll(value, digitDescription.get("three"))) {
                    return 3;
                }
                if (containsAll(value, digitDescription.get("five"))) {
                    return 5;
                }
                return 2;
            }

            if (value.length === 6) {
                if (!containsAll(value, digitDescription.get("six"))) {
                    return 6;
                }
                if (containsAll(value, digitDescription.get("nine"))) {
                    return 9;
                }
            }

            return 0;
        });

    return digits[0] * 1000 + digits[1] * 100 + digits[2] * 10 + digits[3];
}

function countUniqueInLines(lines: string[], countFunction: CountFunction): number {
    return lines
        .map(value => countFunction(value, parseDigitDescription(value)))
        .reduce((a, b) => a + b);
}

function buildDigitDescription() {
    let digitDescription = new Map();
    digitDescription.set("three", ['a', 'b']);
    digitDescription.set("five", ['e', 'f']);
    digitDescription.set("nine", ['a', 'f', 'e', 'b']);
    digitDescription.set("six", ['a', 'b']);
    return digitDescription;
}

function parseDigitDescription(singleEntry: string): Map<string, string[]> {
    let digitDescription = new Map();
    let values = singleEntry.split(" ").filter(s => s !== "|");
    for (const value of values) {
        if (value.length === 2) {
            digitDescription.set("three", value.split(""));
            digitDescription.set("six", value.split(""));
        }
        if (value.length === 4) {
            digitDescription.set("nine", value.split(""));
        }
    }
    let five: string[] = [...digitDescription.get("nine")];
    for (const d of digitDescription.get("three")) {
        const index = five.indexOf(d);
        if (index > -1) {
            five.splice(index, 1);
        }

    }
    digitDescription.set("five", five);
    return digitDescription;
}

describe('Day8 Test', () => {

    describe('count encoded digits', () => {
        it('should find digit 1111', () => {
            let singleEntry: string = 'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | fg fg fg fg';

            let uniqueOutputValues: number = decodedDigitsInOutput(singleEntry);

            expect(uniqueOutputValues).to.equal(1111);
        });
        it('should find digit 4444', () => {
            let singleEntry: string = 'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | eafb eafb eafb eafb';

            let uniqueOutputValues: number = decodedDigitsInOutput(singleEntry);

            expect(uniqueOutputValues).to.equal(4444);
        });
        it('should find digit 5555', () => {
            let singleEntry: string = 'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | dcbef cbdef cdfeb dcbef';

            let uniqueOutputValues: number = decodedDigitsInOutput(singleEntry, buildDigitDescription());

            expect(uniqueOutputValues).to.equal(5555);
        });
        it('should find digit 3333', () => {
            let singleEntry: string = 'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdbaf fbcad fbcad fbcad';

            let uniqueOutputValues: number = decodedDigitsInOutput(singleEntry, buildDigitDescription());

            expect(uniqueOutputValues).to.equal(3333);
        });
        it('should find digit 2222', () => {
            let singleEntry: string = 'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | gcdfa gcdfa cdgfa gcdfa';

            let uniqueOutputValues: number = decodedDigitsInOutput(singleEntry, buildDigitDescription());

            expect(uniqueOutputValues).to.equal(2222);
        });
        it('should find digit 8888', () => {
            let singleEntry: string = 'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | gbdfcae gbdfcae gbdfcae gbdfcae';

            let uniqueOutputValues: number = decodedDigitsInOutput(singleEntry, buildDigitDescription());

            expect(uniqueOutputValues).to.equal(8888);
        });
        it('should find digit 7777', () => {
            let singleEntry: string = 'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cgb cgb cgb cgb';

            let uniqueOutputValues: number = decodedDigitsInOutput(singleEntry, buildDigitDescription());

            expect(uniqueOutputValues).to.equal(7777);
        });
        it('should find digit 6666', () => {
            let singleEntry: string = 'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfgeb cdfgeb cdfgeb cdfgeb';

            let uniqueOutputValues: number = decodedDigitsInOutput(singleEntry, buildDigitDescription());

            expect(uniqueOutputValues).to.equal(6666);
        });
        it('should find digit 9999', () => {
            let singleEntry: string = 'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cefabd cefabd cefabd cefabd';

            let uniqueOutputValues: number = decodedDigitsInOutput(singleEntry, buildDigitDescription());

            expect(uniqueOutputValues).to.equal(9999);
        });
        it('should find digit 0000', () => {
            let singleEntry: string = 'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | dabcge dabcge bcdage cgedab';

            let uniqueOutputValues: number = decodedDigitsInOutput(singleEntry, buildDigitDescription());

            expect(uniqueOutputValues).to.equal(0);
        });


        it('should find digit 9361', () => {
            let singleEntry: string = 'fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb';

            let digitDescription = parseDigitDescription(singleEntry);
            let uniqueOutputValues: number = decodedDigitsInOutput(singleEntry, digitDescription);

            expect(uniqueOutputValues).to.equal(9361);
        });

        it('should find encoded digits in input file', () => {
            let input = readInput(8);

            let uniqueOutputValues = countUniqueInLines(input, decodedDigitsInOutput);

            expect(uniqueOutputValues).to.equal(594215);
        });

    });


    describe('count unique digits', () => {
        it('should find no valid digit', () => {
            let singleEntry: string = 'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cefdb cefdb cefdb cefdb';

            let uniqueOutputValues: number = countUniqueDigitsInOutput(singleEntry);

            expect(uniqueOutputValues).to.equal(0);
        });

        it('should find digit 8', () => {
            let singleEntry: string = 'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | gbdfcae cefdb cefdb cefdb';

            let uniqueOutputValues: number = countUniqueDigitsInOutput(singleEntry);

            expect(uniqueOutputValues).to.equal(1);
        });

        it('should find digit 7', () => {
            let singleEntry: string = 'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cgb cefdb cefdb cefdb';

            let uniqueOutputValues: number = countUniqueDigitsInOutput(singleEntry);

            expect(uniqueOutputValues).to.equal(1);
        });

        it('should find unique digit 8,7,1,4', () => {
            let singleEntry: string = 'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cgb fg fgae gbdfcae';

            let uniqueOutputValues: number = countUniqueDigitsInOutput(singleEntry);

            expect(uniqueOutputValues).to.equal(4);
        });

        it('should find unique digits in multiple lines', () => {
            let lines: string[] = [
                "be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe",
                "edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc"];
            let uniqueOutputValues = countUniqueInLines(lines, countUniqueDigitsInOutput);

            expect(uniqueOutputValues).to.equal(5);
        });

        it('should find unique digits in input file', () => {
            let input = readInput(8);

            let uniqueOutputValues = countUniqueInLines(input, countUniqueDigitsInOutput);

            expect(uniqueOutputValues).to.equal(301);
        });
    });

});


