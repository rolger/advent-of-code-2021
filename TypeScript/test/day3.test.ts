import {readInput} from "./read-adventofcode-input";
import {filter, from, map, Observable, of, reduce} from 'rxjs';

function mostCommonBit(input: Observable<string>, index: number) {
    let mostCommonNthBit = input.pipe(
        reduce((acc, diagnostic) => {
            if (diagnostic.at(index) === '0')
                acc.count0++
            else
                acc.count1++;
            return acc;
        }, {count0: 0, count1: 0}),
        map(x => x.count1 >= x.count0 ? "1" : "0")
    );
    return mostCommonNthBit;
}

function powerConsumption(numberOfBits: number, data: Observable<string>) {
    let gammaRate: string = '';
    let epsilon: string = '';

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
    }
}
function findNumber(input: Observable<string>, numberOfBits: number, invert?: boolean) {
    for (let i = 0; i < numberOfBits; i++) {
        let filterChar = "0";
        let most1stCommonBit = mostCommonBit(input, i).subscribe(x => {
            filterChar = invert ? (x === "0" ? "1" : "0") : x;
        });

        let reduced: string[] = [];
        input.pipe(filter(diagnostic => diagnostic.at(i) === filterChar))
            .subscribe(list => {
                reduced.push(list);
            });
        // console.log(reduced);
        if (i ==numberOfBits || reduced.length === 1)
            return reduced.at(0);
        input = from(reduced);
    }
}

describe('Day3 Test', () => {

    it('compute from example', () => {
        let input = of(
            "00100",
            "11110",
            "10110",
            "10111",
            "10101",
            "01111",
            "00111",
            "11100",
            "10000",
            "11001",
            "00010",
            "01010"
        );

        let result = powerConsumption(5, input);

        console.log(`gamma rate: ${result.gammaRate}`);
        console.log(`epsilon: ${result.epsilon}`);
        console.log(`result: ${result.power()}`);
    });

    it('compute from input file', () => {
        let input = from(readInput(4));

        let result = powerConsumption(12, input);

        console.log(`gamma rate: ${result.gammaRate}`);
        console.log(`epsilon: ${result.epsilon}`);
        console.log(`result: ${result.power()}`);
    });


    it('task2', () => {
        let input = of(
            "00100",
            "11110",
            "10110",
            "10111",
            "10101",
            "01111",
            "00111",
            "11100",
            "10000",
            "11001",
            "00010",
            "01010"
        );

        let oxygenRating = Number.parseInt(findNumber(input, 5) || "0", 2);
        let co2Rating = Number.parseInt(findNumber(input, 5, true) || "0", 2);

        console.log(oxygenRating);
        console.log(co2Rating);
        console.log(co2Rating * oxygenRating);
    });

    it('task2 with input', () => {
        let input = from(readInput(4));

        let oxygenRating = Number.parseInt(findNumber(input, 12) || "0", 2);
        let co2Rating = Number.parseInt(findNumber(input, 12, true) || "0", 2);

        console.log(oxygenRating);
        console.log(co2Rating);
        console.log(co2Rating * oxygenRating);
    });

});