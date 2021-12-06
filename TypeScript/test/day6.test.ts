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

function extracted(initialFish: string[], days: number) {
    let initFishCount = new Map();
    initFishCount.set(0, initialFish[0].split(",").filter(f => f === "0").length);
    initFishCount.set(1, initialFish[0].split(",").filter(f => f === "1").length);
    initFishCount.set(2, initialFish[0].split(",").filter(f => f === "2").length);
    initFishCount.set(3, initialFish[0].split(",").filter(f => f === "3").length);
    initFishCount.set(4, initialFish[0].split(",").filter(f => f === "4").length);
    initFishCount.set(5, initialFish[0].split(",").filter(f => f === "5").length);
    initFishCount.set(6, initialFish[0].split(",").filter(f => f === "6").length);
    initFishCount.set(7, initialFish[0].split(",").filter(f => f === "7").length);
    initFishCount.set(8, initialFish[0].split(",").filter(f => f === "8").length);
    initialFish = [];

    let numberOfGens = new Map();
    let fishBowl: LaternFish[] = [];
    let fishCount = new Map();
    for (const age of [0, 1, 2, 3, 4, 5, 6, 7, 8]) {
        fishBowl = [new LaternFish(age)];

        let newGeneration: LaternFish[] = [];
        for (let i = 0; i < days; i++) {
            for (const fish of fishBowl) {
                newGeneration.push(...(fish.nextDay()));
            }
            for (const next of newGeneration) {
                fishBowl.push(next);
            }

            newGeneration = [];
        }
        numberOfGens.set(age, {
         total:   fishBowl.length,
         part0: countFish( 0, fishBowl),
         part1: countFish( 1, fishBowl),
         part2: countFish( 2, fishBowl),
         part3: countFish( 3, fishBowl),
         part4: countFish( 4, fishBowl),
         part5: countFish( 5, fishBowl),
         part6: countFish( 6, fishBowl),
         part7: countFish( 7, fishBowl),
         part8: countFish( 8, fishBowl)
        });
        fishBowl = [];
    }
    return {initFishCount, numberOfGens, fishCount};
}

function countFish(key: number, fishes: LaternFish[]) {
    return fishes.filter(f => f.age === key).length;
}

function countGenerations(initialFish: string[], days: number) {
    let fishCount = new Map();
    fishCount.set(0, initialFish[0].split(",").filter(f => f === "0").length);
    fishCount.set(1, initialFish[0].split(",").filter(f => f === "1").length);
    fishCount.set(2, initialFish[0].split(",").filter(f => f === "2").length);
    fishCount.set(3, initialFish[0].split(",").filter(f => f === "3").length);
    fishCount.set(4, initialFish[0].split(",").filter(f => f === "4").length);
    fishCount.set(5, initialFish[0].split(",").filter(f => f === "5").length);
    fishCount.set(6, initialFish[0].split(",").filter(f => f === "6").length);
    fishCount.set(7, initialFish[0].split(",").filter(f => f === "7").length);
    fishCount.set(8, initialFish[0].split(",").filter(f => f === "8").length);

    for (let i = 0; i < days; i++) {
        let temp = fishCount.get(0);

        for (let j = 0; j <= 5; j++) {
            fishCount.set(j, fishCount.get(j + 1));
        }
        fishCount.set(6, temp + fishCount.get(7));
        fishCount.set(7, fishCount.get(8));
        fishCount.set(8, temp);
    }

    let numOfFish = 0;
    for (let i = 0; i <= 8; i++) {
        numOfFish = numOfFish + fishCount.get(i);
    }
    return numOfFish;
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


    it('should count generations', () => {
        // let initialFish = readInput(6);
        let initialFish = ["3,4,3,1,2"];

        expect(countGenerations(initialFish, 80)).toBe(5934);
        expect(countGenerations(initialFish, 256)).toBe(26984457539);
    });

    it('should count generations from file', () => {
        let initialFish = readInput(6);

        expect(countGenerations(initialFish, 256)).toBe(1702631502303);
    });
});


