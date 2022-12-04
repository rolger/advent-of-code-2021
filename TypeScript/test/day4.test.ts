import {readInput} from "./read-adventofcode-input";


class Sections {
    private first: { start: number; end: number };
    private second: { start: number; end: number };

    constructor(s: string) {
        let assignments = s.split(",");
        this.first = {start: this.parseSectionRange(assignments[0], 0), end: this.parseSectionRange(assignments[0], 1)};
        this.second = {
            start: this.parseSectionRange(assignments[1], 0),
            end: this.parseSectionRange(assignments[1], 1)
        };
    }

    private parseSectionRange(range: string, part: number) {
        return Number.parseInt(range.split("-")[part]);
    }

    contains(): number {
        if (this.first.start <= this.second.start && this.second.end <= this.first.end) {
            return 1;
        }
        if (this.second.start <= this.first.start && this.first.end <= this.second.end) {
            return 1;
        }
        return 0;
    }

    overlaps(): number {
        if (this.first.start <= this.second.start && this.second.start <= this.first.end) {
            return 1;
        }
        if (this.second.start <= this.first.start && this.first.start <= this.second.end) {
            return 1;
        }
        return 0;
    }
}

describe('Day4 Test', () => {

    function sum(): (a: number, b: number) => number {
        return (a: number, b: number) => a + b;
    }

    describe('1st Puzzle', () => {
        it('should not overlap', () => {
            expect(new Sections("2-4,6 - 8").contains()).toBe(0);
        });

        it('should calculate pairs fully containing the other', () => {
            let input = [
                "2-4,6-8",
                "2-3,4-5",
                "5-7,7-9",
                "2-8,3-7",
                "6-6,4-6",
                "2-6,4-8",
            ];

            let count = input
                .map(s => new Sections(s).contains())
                .reduce(sum(), 0);

            expect(count).toBe(2);
        });

        it('should calculate pairs fully containing the other from file', () => {
            let input = readInput(4);

            let count = input
                .map(s => new Sections(s).contains())
                .reduce(sum(), 0);

            expect(count).toBe(500);
        });
    });

    describe('2nd Puzzle', () => {
        it('should calculate number of overlaps', () => {
            let input = [
                "2-4,6-8",
                "2-3,4-5",
                "5-7,7-9",
                "2-8,3-7",
                "6-6,4-6",
                "2-6,4-8",
            ];

            let count = input
                .map(s => new Sections(s).overlaps())
                .reduce((a, b) => a + b, 0);

            expect(count).toBe(4);
        });

        it('should calculate number of overlaps from file', () => {
            let input = readInput(4);

            let count = input
                .map(s => new Sections(s).overlaps())
                .reduce((a, b) => a + b, 0);

            expect(count).toBe(815);
        });
    });

});