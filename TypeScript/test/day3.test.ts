import {readInput} from "./read-adventofcode-input";

function divideRucksack(content: string) {
    return {
        first: content.slice(0, content.length / 2),
        second: content.slice(content.length / 2),

        commonItem() {
            let arr1 = this.first.split("");
            let arr2 = this.second.split("");

            let allFounded = arr2.filter(ai => arr1.includes(ai));
            return allFounded[0];
        },

        priority() {
            return priority(this.commonItem());
        }
    }

}

function priority(item: string) {
    let codeAt = item.charCodeAt(0);
    if (codeAt >= 'A'.charCodeAt(0) && codeAt <= 'Z'.charCodeAt(0))
        return codeAt - 'A'.charCodeAt(0) + 1 + 26;

    return codeAt - 'a'.charCodeAt(0) + 1;
}


function buildIntersection(arr1: string[], arr2: string[], arr3: string[]) {
    let intersection = arr1.filter((val1) => {
        return arr2.find((val2) => val1 === val2);
    });
    return intersection.filter((val1) => {
        return arr3.find((val2) => val1 === val2);
    })[0];
}

describe('Day3 Test', () => {

    describe('1st Puzzle', () => {
        it('should dived rucksack content', () => {
            let compartments = divideRucksack('vJrwpWtwJgWrhcsFMMfFFhFp');
            expect(compartments.first).toBe('vJrwpWtwJgWr');
            expect(compartments.second).toBe('hcsFMMfFFhFp');

            compartments = divideRucksack('jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL');
            expect(compartments.first).toBe('jqHRNqRjqzjGDLGL');
            expect(compartments.second).toBe('rsFMfFZSrLrFZsSL');
        });

        it('should find common item', () => {
            let compartments = divideRucksack('vJrwpWtwJgWrhcsFMMfFFhFp');
            expect(compartments.commonItem()).toBe('p');

            compartments = divideRucksack('jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL');
            expect(compartments.commonItem()).toBe('L');
        });

        it('should calculate priority of item', () => {
            let compartments = divideRucksack('vJrwpWtwJgWrhcsFMMfFFhFp');
            expect(compartments.priority()).toBe(16);

            compartments = divideRucksack('jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL');
            expect(compartments.priority()).toBe(38);
        });

        it('should calculate priority sum of rucksack', () => {
            let input = [
                "vJrwpWtwJgWrhcsFMMfFFhFp",
                "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
                "PmmdzqPrVvPwwTWBwg",
                "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
                "ttgJtRGJQctTZtZT",
                "CrZsJsPPZsGzwwsLwLmpwMDw",
            ];

            let score = input
                .map(s => divideRucksack(s).priority())
                .reduce((score, value) => score + value, 0);

            expect(score).toBe(157);
        });

        it('should calculate priority sum of rucksack from file', () => {
            let input = readInput(3);

            let score = input
                .map(s => divideRucksack(s).priority())
                .reduce((score, value) => score + value, 0);

            expect(score).toBe(7597);
        });
    });

    describe('2nd Puzzle', () => {
        it('should find intersection of 2 strings', () => {
            let arr1 = "vJrwpWtwJgWrhcsFMMfFFhFp".split("");
            let arr2 = "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL".split("");

            let intersection = arr1.filter((val1) => {
                return arr2.find((val2) => val1 === val2);
            });
            expect(intersection[0]).toBe('r');
        });

        it('should find intersection of 3 strings', () => {
            let arr1 = "vJrwpWtwJgWrhcsFMMfFFhFp".split("");
            let arr2 = "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL".split("");
            let arr3 = "PmmdzqPrVvPwwTWBwg".split("");
            let intersection = buildIntersection(arr1, arr2, arr3);

            expect(intersection).toBe('r');
        });

        it('should calculate priority of bagges', () => {
            let input = [
                "vJrwpWtwJgWrhcsFMMfFFhFp",
                "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
                "PmmdzqPrVvPwwTWBwg",
                "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
                "ttgJtRGJQctTZtZT",
                "CrZsJsPPZsGzwwsLwLmpwMDw",
            ];

            let score = input
                .map(function (e, i) {
                    return i % 3 === 0 ? input.slice(i, i + 3) : [];
                })
                .filter(x => x.length > 0)
                .map(threeOf => priority(buildIntersection(threeOf[0].split(""), threeOf[1].split(""), threeOf[2].split(""))))
                .reduce((a, b) => a + b, 0);

            expect(score).toBe(70);
        });

        it('should calculate priority of bagges from file', () => {
            let input = readInput(3);

            let score = input
                .map(function (e, i) {
                    return i % 3 === 0 ? input.slice(i, i + 3) : [];
                })
                .filter(x => x.length > 0)
                .map(threeOf => priority(buildIntersection(threeOf[0].split(""), threeOf[1].split(""), threeOf[2].split(""))))
                .reduce((a, b) => a + b, 0);

            expect(score).toBe(2607);
        });

    });

});