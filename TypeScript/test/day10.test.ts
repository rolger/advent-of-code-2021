import {expect} from "chai";
import {readInput} from "./read-adventofcode-input";

function getKey(s: string) {
    if (s === '[' || s === ']')
        return '[';
    if (s === '(' || s === ')')
        return '(';
    if (s === '{' || s === '}')
        return '{';

    return '<';
}

function getScore(character: string) {
    switch (getKey(character)) {
        case '(':
            return 3;
        case '[':
            return 57;
        case '{':
            return 1197;
        case '<':
            return 25137;
    }
    return 0;
}

function isComplete(line: string): number {
    let chunks = new Array();

    for (const character of line.split('')) {
        switch (character) {
            case '(':
            case '[':
            case '{':
            case '<':
                chunks.push(character);
                break;

            case '}':
            case ')':
            case ']':
            case '>':
                let prev = chunks.pop();

                if (prev !== getKey(character))
                    return getScore(character);
                break;
        }
    }

    return 0;
}

describe('Day 10 Test', () => {

    it('should find complete line', () => {
        expect(isComplete('()')).is.eql(0);
        expect(isComplete('[]')).is.eql(0);
        expect(isComplete('{}')).is.eql(0);
        expect(isComplete('<>')).is.eql(0);
    });

    it('should find incomplete line', () => {
        expect(isComplete('())')).is.eql(3);
        expect(isComplete('(]')).is.eql(57);
        expect(isComplete('(}')).is.eql(1197);
        expect(isComplete('(>')).is.eql(25137);

        expect(isComplete('{([(<{}[<>[]}>{[]{[(<()>')).is.eql(1197);

    });

    it('should sum incomplete lines', () => {

        let input =
            `[({(<(())[]>[[{[]{<()<>>
            [(()[<>])]({[<{<<[]>>(
            {([(<{}[<>[]}>{[]{[(<()>
            (((({<>}<{<{<>}{[]{[]{}
            [[<[([]))<([[{}[[()]]]
            [{[{({}]{}}([{[{{{}}([]
            {<[[]]>}<{[{[{[]{()[[[]
            [<(<(<(<{}))><([]([]()
            <{([([[(<>()){}]>(<<{{
            <{([{{}}[<[[[<>{}]]]>[]]`;

        let sum = input
            .split('\n')
            .map(l => l.trim())
            .map(l => isComplete(l))
            .reduce((a, b) => a + b);

        expect(sum).is.eql(26397);

    });

    it('should sum incomplete lines from file', () => {
        let input= readInput(10);

        let sum = input
            .map(l => l.trim())
            .map(l => isComplete(l))
            .reduce((a, b) => a + b);

        expect(sum).is.eql(26397);

    });

});