import {of, reduce} from "rxjs";
import {readInput} from "./read-adventofcode-input";


function groupElfsBySumOfCalories(input: string[]) {
    let elfGroups: number[] = [];
    return input.reduce((accumulator: number[][], currentValue) => {
        if (currentValue === '') {
            accumulator.push([]);
        } else {
            // @ts-ignore
            let last: number[] = accumulator.pop();
            accumulator.push([...last, Number.parseInt(currentValue)]);
        }
        return accumulator;
    }, [[]])
        .map(elf => elf.reduce((x, y) => x + y, 0));
}

function calculateMaxElfCalories(input: string[]) {
    return Math.max(...(groupElfsBySumOfCalories(input)));
}

describe('Day1 Test', () => {

    it('should compute elf\'s calories', () => {
        let input = of(
            "1000",
            "2000",
            "3000"
        );

        function accu(acc: number, curr: string) {
            return acc + Number.parseFloat(curr);
        }

        let elfCalories = 0;

        input.pipe(
            reduce(accu, 0)
        ).subscribe(sum => elfCalories = sum);

        expect(elfCalories).toBe(6000);
    });

    it('should split one elf\'s calories', () => {
        let input = [
            "1000",
            "1000",
        ];

        let elfGroups = [];

        elfGroups.push(input.reduce((accumulator: number[], currentValue) => [...accumulator, Number.parseInt(currentValue)], []));

        expect(elfGroups).toStrictEqual([[1000, 1000]]);
    });

    it('should split two elf\' calories', () => {
        let input = [
            "1000",
            "1000",
            "",
            "3000"
        ];

        let elfGroups: number[][] = [[]];


        elfGroups = input.reduce((accumulator: number[][], currentValue) => {
            if (currentValue === '') {
                accumulator.push([]);
            } else {
                // @ts-ignore
                let last: number[] = accumulator.pop();
                accumulator.push([...last, Number.parseInt(currentValue)]);
            }
            return accumulator;
        }, [[]]);


        expect(elfGroups).toStrictEqual([[1000, 1000], [3000]]);
    });

    it('should calculate elf\' max calories', () => {
        let input = [
            "1000",
            "1000",
            "",
            "1000",
            "3000"
        ];

        let maxCalories = calculateMaxElfCalories(input);

        expect(maxCalories).toStrictEqual(4000);
    });

    it('should calculate elf\' max calories from file', () => {
        let input = readInput(1);

        let maxCalories = calculateMaxElfCalories(input);

        expect(maxCalories).toStrictEqual(68923);
    });

    it('should calculate sum of 3 elf\' max calories from file', () => {
        let input = readInput(1);

        let bySumOfCalories = groupElfsBySumOfCalories(input).sort((a, b) => a - b);

        // @ts-ignore
        let sumOfCalories = bySumOfCalories.pop() + bySumOfCalories.pop() + bySumOfCalories.pop();
        expect(sumOfCalories).toStrictEqual(200044);
    });

});