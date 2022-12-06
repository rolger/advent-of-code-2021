import {readInput} from "./read-adventofcode-input";

function findMarker(input: string, markerLength: number = 4) {
    let markers = new Map();
    let markerStream = input.split('');

    for (let i = 0; i < markerStream.length; i++) {
        const current = markerStream[i];

        if (!markers.has(current) && markers.size === markerLength - 1) {
            return i + 1;
        } else if (!markers.has(current)) {
            markers.set(current, i);
        } else {
            let deleteEntries = [];

            for (const entry of markers.entries()) {
                if (entry[0] != current) {
                    deleteEntries.push(entry[0]);
                } else {
                    deleteEntries.push(current);
                    break;
                }
            }
            for (const currentKey of deleteEntries) {
                markers.delete(currentKey);
            }

            markers.set(current, i);
        }
    }
}

describe('Day6 Test', () => {

    describe('1st Puzzle', () => {
        it('should find first marker', () => {
            expect(findMarker('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).toBe(7);
            expect(findMarker('bvwbjplbgvbhsrlpgdmjqwftvncz')).toBe(5);
            expect(findMarker('nppdvjthqldpwncqszvftbrmjlhg')).toBe(6);
            expect(findMarker('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toBe(10);
            expect(findMarker('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toBe(11);
        });

        it('should find first marker from file', () => {
            let input = readInput(6);
            expect(findMarker(input[0])).toBe(1760);
        });
    });

    describe('2nd Puzzle', () => {
        it('should find first message marker', () => {
            expect(findMarker('mjqjpqmgbljsphdztnvjfqwrcgsmlb',14)).toBe(19);
            expect(findMarker('bvwbjplbgvbhsrlpgdmjqwftvncz', 14)).toBe(23);
            expect(findMarker('nppdvjthqldpwncqszvftbrmjlhg', 14)).toBe(23);
            expect(findMarker('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 14)).toBe(29);
            expect(findMarker('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 14)).toBe(26);
        });

        it('should find first message marker from file', () => {
            let input = readInput(6);
            expect(findMarker(input[0], 14)).toBe(2974);
        });
    });

});