import {readInput} from "./read-adventofcode-input";

class Move {

    static Rock = new Move(1);
    static Paper = new Move(2);
    static Scissor = new Move(3);

    static of(thing: string): Move {
        switch (thing) {
            case 'A':
            case 'X':
                return Move.Rock;
            case 'B':
            case 'Y':
                return Move.Paper;
            case 'C':
            case 'Z':
                return Move.Scissor;
            default:
                throw new Error("invalide thing " + thing);
        }
    }

    constructor(public value: number) {
    }

    public scoreRockPaperScissor(opponentThing: Move) {
        return this.value + this.scoreOutcome(opponentThing);
    }

    private scoreOutcome(opponentThing: Move): number {
        if (opponentThing === Move.Scissor && this === Move.Rock)
            return 6;

        if (opponentThing === Move.Rock && this === Move.Scissor)
            return 0;

        if (opponentThing === this)
            return 3;

        else if (opponentThing.value < this.value)
            return 6;
        return 0;
    }
}


function scoreRockPaperScissor(opponent: string, me: string) {
    return Move.of(me).scoreRockPaperScissor(Move.of(opponent));
}

function expectedMove(opponent: Move, expectedResult: string): Move {
    if (expectedResult === 'Y')
        return opponent;

    if (expectedResult === 'Z') {
        if (opponent === Move.Scissor)
            return Move.Rock;
        if (opponent === Move.Paper)
            return Move.Scissor;
        return Move.Paper;
    }

    if (expectedResult === 'X') {
        if (opponent === Move.Scissor)
            return Move.Paper;
        if (opponent === Move.Rock)
            return Move.Scissor;
        return Move.Rock;
    }
    throw new Error('unknown result ' + expectedResult);
}

describe('Day2 Test', () => {

    it('should score a draw', () => {
        expect(scoreRockPaperScissor('A', 'X')).toBe(4);
        expect(scoreRockPaperScissor('B', 'Y')).toBe(5);
        expect(scoreRockPaperScissor('C', 'Z')).toBe(6);
    });

    it('should loose the game', () => {
        expect(scoreRockPaperScissor('B', 'X')).toBe(1);
        expect(scoreRockPaperScissor('C', 'Y')).toBe(2);
        expect(scoreRockPaperScissor('A', 'Z')).toBe(3);
    });

    it('should win the game', () => {
        expect(scoreRockPaperScissor('C', 'X')).toBe(7);
        expect(scoreRockPaperScissor('A', 'Y')).toBe(8);
        expect(scoreRockPaperScissor('B', 'Z')).toBe(9);
    });

    it('should count all rounds', () => {
        let input = [
            "A Y",
            "B X",
            "C Z",
        ];

        let allRounds = input
            .map(s => scoreRockPaperScissor(s.split(" ")[0], s.split(" ")[1]))
            .reduce((score, value) => score + value, 0);

        expect(allRounds).toBe(15);
    });

    it('should calculate all rounds from file', () => {
        let input = readInput(2);

        let allRounds = input
            .map(s => scoreRockPaperScissor(s.split(" ")[0], s.split(" ")[1]))
            .reduce((score, value) => score + value, 0);

        expect(allRounds).toStrictEqual(11475);
    });

    it('should end with a draw', () => {
        expect(expectedMove(Move.Rock, 'Y')).toBe(Move.Rock);
        expect(expectedMove(Move.Paper, 'Y')).toBe(Move.Paper);
    });

    it('should end with a win', () => {
        expect(expectedMove(Move.Scissor, 'Z')).toBe(Move.Rock);
        expect(expectedMove(Move.Rock, 'Z')).toBe(Move.Paper);
        expect(expectedMove(Move.Paper, 'Z')).toBe(Move.Scissor);
    });

    it('should end with a loose', () => {
        expect(expectedMove(Move.Scissor, 'X')).toBe(Move.Paper);
        expect(expectedMove(Move.Rock, 'X')).toBe(Move.Scissor);
        expect(expectedMove(Move.Paper, 'X')).toBe(Move.Rock);
    });

    it('should calculate expected results', () => {
        let input = [
            "A Y",
            "B X",
            "C Z",
        ];

        let allRounds = input
            .map(s => {
                let opponentsMove = Move.of(s.split(" ")[0]);
                let myMove = expectedMove(opponentsMove, s.split(" ")[1]);
                return myMove.scoreRockPaperScissor(opponentsMove);
            })
            .reduce((score, value) => score + value, 0);

        expect(allRounds).toBe(12);
    });

    it('should calculate expected results from file', () => {
        let input = readInput(2);

        let allRounds = input
            .map(s => {
                let opponentsMove = Move.of(s.split(" ")[0]);
                let myMove = expectedMove(opponentsMove, s.split(" ")[1]);
                return myMove.scoreRockPaperScissor(opponentsMove);
            })
            .reduce((score, value) => score + value, 0);

        expect(allRounds).toBe(16862);
    });

});