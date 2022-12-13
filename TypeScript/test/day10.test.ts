import {readInput} from "./read-adventofcode-input";

class CPU {
    cycles: number;
    storage: Map<number, number> = new Map();

    constructor() {
        this.cycles = 0;
        this.storage.set(0, 1);
    }

    execute(instruction: string): CPU {
        let value = this.storage.get(this.cycles);

        if (instruction.trim() === 'noop') {
            this.cycles++;
            // @ts-ignore
            this.storage.set(this.cycles, value);
        } else {
            let parts = instruction.split(' ');

            this.cycles++;
            // @ts-ignore
            this.storage.set(this.cycles, value);

            this.cycles++;
            // @ts-ignore
            this.storage.set(this.cycles, value + Number.parseInt(parts[1]));
        }
        return this;
    }
}

describe('Day 10 Test', () => {

    function sum(): (a: number, b: number) => number {
        return (a: number, b: number) => a + b;
    }

    describe('1st Puzzle', () => {
        it('should increase cycles without changing the value', () => {
            let cpu = new CPU();

            cpu = cpu.execute('noop')

            expect(1).toBe(1);
            expect(1).toBe(1);
        });

        it('should increase cycles and change the value', () => {
            let cpu = new CPU();

            cpu = cpu.execute('noop')
            cpu = cpu.execute('addx 3');
            cpu = cpu.execute('addx -5');

            expect(cpu.cycles).toBe(5);

            expect(cpu.storage.get(1)).toBe(1);
            expect(cpu.storage.get(2)).toBe(1);
            expect(cpu.storage.get(3)).toBe(4);
            expect(cpu.storage.get(4)).toBe(4);
            expect(cpu.storage.get(5)).toBe(-1);
        });

        it('should call instructions from file', () => {
            let input = readInput(100);

            let cpu = new CPU();
            input.forEach(s => cpu.execute(s));

            expect(cpu.storage.get(20)).toBe(21);
            expect(cpu.storage.get(60)).toBe(19);
            expect(cpu.storage.get(100)).toBe(18);
            expect(cpu.storage.get(140)).toBe(21);
            expect(cpu.storage.get(180)).toBe(16);
            expect(cpu.storage.get(220)).toBe(18);

            let result = 0;
            result += (cpu.storage.get(20) ?? 0) * 20;
            result += (cpu.storage.get(60) ?? 0) * 60;
            result += (cpu.storage.get(100) ?? 0) * 100;
            result += (cpu.storage.get(140) ?? 0) * 140;
            result += (cpu.storage.get(180) ?? 0) * 180;
            result += (cpu.storage.get(220) ?? 0) * 220;

            expect(result).toBe(13140);
        });

        it('should call instructions from file day 10', () => {
            let input = readInput(10);

            let cpu = new CPU();
            input.forEach(s => cpu.execute(s));

            let result = 0;
            result += (cpu.storage.get(20) ?? 0) * 20;
            result += (cpu.storage.get(60) ?? 0) * 60;
            result += (cpu.storage.get(100) ?? 0) * 100;
            result += (cpu.storage.get(140) ?? 0) * 140;
            result += (cpu.storage.get(180) ?? 0) * 180;
            result += (cpu.storage.get(220) ?? 0) * 220;

            expect(result).toBe(13140);
        });
    });

    describe('2nd Puzzle', () => {
        it('should', () => {
        });

        xit('should ... from file', () => {
            let input = readInput(-1);

            let result = input
                .map(s => Number.parseInt(s))
                .reduce(sum(), 0);

            expect(result).toBe(0);
        });
    });

});