import {readInput} from "./read-adventofcode-input";

class LaternFish {

    constructor(public age: number) {
    }

    nextDay(): LaternFish[] {
        if (this.age === 0) {
            this.age = 6;
            return [new LaternFish(8)];
        }
        this.age--;
        return [];
    }
}

describe('Day6 Test', () => {

    it('should decrease age by 1', () => {
        let fish: LaternFish = new LaternFish(3);

        fish.nextDay();

        expect(fish.age).toBe(2);
    });

    it('should reset to age of 6', () => {
        let fish: LaternFish = new LaternFish(0);

        fish.nextDay();

        expect(fish.age).toBe(6);
    });

    it('should create a new fish', () => {
        let fish: LaternFish = new LaternFish(0);

        let newFish = fish.nextDay();

        expect(newFish[0].age).toBe(8);
    });

    it('should handle multiple fish', () => {
        let fishes: LaternFish[] = [];
        for (const age of [3, 4, 3, 0, 2]) {
            fishes.push(new LaternFish(age));
        }

        let newGeneration: LaternFish[] = [];
        for (const fish of fishes) {
            newGeneration.push(...(fish.nextDay()));
        }

        expect(fishes[0].age).toBe(2);
        expect(fishes[1].age).toBe(3);
        expect(fishes[2].age).toBe(2);
        expect(fishes[3].age).toBe(6);
        expect(fishes[4].age).toBe(1);
        expect(newGeneration[0].age).toBe(8);
    });

    it('should handle multiple days', () => {
        let fishes: LaternFish[] = [];
        for (const age of [3, 4, 3, 1, 2]) {
            fishes.push(new LaternFish(age));
        }

        let newGeneration: LaternFish[] = [];
        for (let i = 0; i < 80; i++) {
            for (const fish of fishes) {
                newGeneration.push(...(fish.nextDay()));
            }
            fishes.push(...newGeneration);
            newGeneration = [];
        }

        expect(fishes.length).toBe(5934);
    });

    function countFish(countOf: Map<number, number>, key: number, fishes: LaternFish[]) {
        let oldVal = countOf.get(key) ?? 0;
        countOf.set(key, fishes.filter(f => f.age === key).length + oldVal);
        return countOf;
    }

    it('should handle file input', () => {
        let initialFish = readInput(6);

        /*
        let fishes: LaternFish[] = [];
        for (const age of initialFish[0].split(",")) {
            fishes.push(new LaternFish(Number.parseInt(age)));
        }
        */

        let numberOfGenerationsOf = new Map();
        let fishCount = new Map();
        for (const age of [1, 2, 3, 4, 5, 6, 7, 8]) {
            let currentFish = [new LaternFish(age)];

            let newGeneration: LaternFish[] = [];
            for (let i = 0; i < 64; i++) {
                for (const fish of currentFish) {
                    newGeneration.push(...(fish.nextDay()));
                }
                for (const next of newGeneration) {
                    currentFish.push(next);
                }
            }
            numberOfGenerationsOf.set(age, currentFish.length);
/*
            fishCount = countFish(fishCount, 1, currentFish);
            fishCount = countFish(fishCount, 2, currentFish);
            fishCount = countFish(fishCount, 3, currentFish);
            fishCount = countFish(fishCount, 4, currentFish);
            fishCount = countFish(fishCount, 5, currentFish);
            fishCount = countFish(fishCount, 6, currentFish);
            fishCount = countFish(fishCount, 7, currentFish);
            fishCount = countFish(fishCount, 8, currentFish);

 */
        }

        console.log(numberOfGenerationsOf);
        console.log(fishCount);

        //expect(fishes.length).toBe(379114);
    });


});