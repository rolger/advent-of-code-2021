import {readInput} from "./read-adventofcode-input";

class Instruction {
    constructor(public amount: number, public from: number, public to: number) {
    }

}

function addInstruction(input: string) {
    let parts = input.split(" ");
    return new Instruction(Number.parseInt(parts[1]), Number.parseInt(parts[3]), Number.parseInt(parts[5]));
}

class Ship {
    private stacks: string[][] = [];

    topElements() {
        return this.stacks
            .map(s => s.at(s.length - 1))
            .filter(s => s != undefined)
            .reduce((a, b) => {
                // @ts-ignore
                return a.concat(b);
            }, "");
    }

    addStack(stack: string[]) {
        this.stacks.push(stack);
    }

    move(instruction: Instruction) {
        for (let i = 0; i < instruction.amount; i++) {
            let elem = this.stacks[instruction.from - 1].pop();
            if (elem)
                this.stacks[instruction.to - 1].push(elem);
        }
    }

    moveInOrder(instruction: Instruction) {
        let from = this.stacks[instruction.from - 1];
        let slices = from.slice(from.length - instruction.amount);
        if (slices) {
            // @ts-ignore
            this.stacks[instruction.to - 1].push(...slices);
        }
        this.stacks[instruction.from - 1] = from.slice(0, from.length - instruction.amount );
    }
}

function buildShip(description: string[]) {
    let ship = new Ship();

    let numbers = description[description.length - 1].trimEnd();
    // @ts-ignore
    let numberOfStacks = Number.parseInt(numbers.at(numbers.length - 1));

    for (let i = 0; i < numberOfStacks; i++) {
        let stack: string[] = [];

        for (let j = description.length - 2; j >= 0; j--) {
            let content = description[j].split("")[(i * 4) + 1];
            if (content != ' ' && content !== undefined) {
                stack.push(content);
            }
        }
        ship.addStack(stack);
    }

    return ship;
}

describe('Day5 Test', () => {

    describe('1st Puzzle', () => {
        it('should parse an instruction', () => {
            let instruction = addInstruction("move 1 from 2 to 1");
            expect(instruction).toMatchObject({amount: 1, from: 2, to: 1});
        });

        it('should parse a ship with 1 item', () => {
            let ship = buildShip(["[Z] [M] [P]", " 1   2   3 "]);
            expect(ship.topElements()).toBe("ZMP");
        });

        it('should parse a ship with empty stacks', () => {
            let ship = buildShip(["    [A]    ", " 1   2   3 "]);
            expect(ship.topElements()).toBe("A");
        });

        it('should parse a ship with 2 items', () => {
            let ship = buildShip(["    [A]    ", "[S] [M] [P]", " 1   2   3 "]);
            expect(ship.topElements()).toBe("SAP");
        });

        it('should parse a ship with 3 items', () => {
            let input = [
                "    [D]",
                "[N] [C]",
                "[Z] [M] [P]",
                " 1   2   3 "];
            let ship = buildShip(input);
            expect(ship.topElements()).toBe("NDP");
        });

        it('should move 1 item', () => {
            let instruction = addInstruction("move 1 from 2 to 1");
            expect(instruction).toMatchObject({amount: 1, from: 2, to: 1});
        });

        it('should move 1 item in a ship', () => {
            let input = [
                "    [D]    ",
                "[N] [C]",
                "[Z] [M] [P]",
                " 1   2   3 "];
            let ship = buildShip(input);
            let instruction = addInstruction("move 1 from 2 to 1");

            ship.move(instruction);
            expect(ship.topElements()).toBe("DCP");
        });

        it('should move 2 items in a ship', () => {
            let input = [
                "    [D]    ",
                "[N] [C]    ",
                "[Z] [M] [P]",
                " 1   2   3 "];
            let ship = buildShip(input);
            ship.move(addInstruction("move 2 from 1 to 3"));

            expect(ship.topElements()).toBe("DZ");
        });

        it('should move all', () => {
            let input = [
                "    [D]    ",
                "[N] [C]    ",
                "[Z] [M] [P]",
                " 1   2   3 ",
                "",
                "move 1 from 2 to 1",
                "move 3 from 1 to 3",
                "move 2 from 2 to 1",
                "move 1 from 1 to 2",
            ];

            let splitIndex = input.indexOf("");

            let ship = buildShip(input.slice(0, splitIndex));
            input.slice(splitIndex + 1).forEach(s => ship.move(addInstruction(s)));

            expect(ship.topElements()).toBe("CMZ");
        });

        it('should ... from file', () => {
            let input = readInput(5);

            let splitIndex = input.indexOf("");

            let ship = buildShip(input.slice(0, splitIndex));
            expect(ship.topElements()).toBe("ZVGNQTHQM");

            input.slice(splitIndex + 1)
                .filter(s => s != '')
                .forEach(s => ship.move(addInstruction(s)));
            expect(ship.topElements()).toBe("QGTHFZBHV");
        });
    });

    describe('2nd Puzzle', () => {
        it('should move in order', () => {
            let input = [
                "    [D]    ",
                "[N] [C]    ",
                "[Z] [M] [P]",
                " 1   2   3 ",
                "",
                "move 1 from 2 to 1",
                "move 3 from 1 to 3",
                "move 2 from 2 to 1",
                "move 1 from 1 to 2",
            ];

            let splitIndex = input.indexOf("");

            let ship = buildShip(input.slice(0, splitIndex));
            input.slice(splitIndex + 1).forEach(s => ship.moveInOrder(addInstruction(s)));

            expect(ship.topElements()).toBe("MCD");

        });

        it('should ... from file', () => {
            let input = readInput(5);

            let splitIndex = input.indexOf("");

            let ship = buildShip(input.slice(0, splitIndex));

            input.slice(splitIndex + 1)
                .filter(s => s != '')
                .forEach(s => ship.moveInOrder(addInstruction(s)));
            expect(ship.topElements()).toBe("MGDMPSZTM");
        });
    });

});