import {readInput} from "./read-adventofcode-input";

class BingoCell {
    public marked: boolean;

    constructor(public num: number) {
        this.marked = false;
    }
}

class BingoBoard {
    matrix: BingoCell[][] = [];

    constructor(inputBoard: string) {
        let numbers: string[] = inputBoard.trim().split(/\s\s*|\n/);

        let i = 0;
        for (let x = 0; x < 5; x++) {
            this.matrix[x] = [];
            for (let y = 0; y < 5; y++) {
                this.matrix[x][y] = new BingoCell(Number.parseInt(numbers[i]));
                i++;
            }
        }
    }

    log(line: number) {
        console.log(this.matrix[line]);
    }

    at(x: number, y: number) {
        return this.matrix[x][y].num;
    }

    isMarked(x: number, y: number) {
        return this.matrix[x][y].marked;
    }

    call(num: number) {
        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 5; y++) {
                if (this.matrix[x][y].num === num) {
                    this.matrix[x][y].marked = true;
                }
            }
        }
    }

    hasWon() {
        for (let x = 0; x < 5; x++) {
            if (this.matrix[x].filter(c => c.marked).length === 5)
                return true;
        }

        for (let y = 0; y < 5; y++) {
            let count = 0;
            for (let x = 0; x < 5; x++) {
                if (this.matrix[x][y].marked)
                    count++;
            }
            if (count === 5)
                return true;
        }

        return false;
    }

    points() {
        return this.matrix.map(line => line.filter(c => !c.marked)
            .reduce((sum, current) => sum + current.num, 0))
            .reduce((sum, current) => sum + current, 0);
    }
}


function findFirstWinner(boards: BingoBoard[], numbers: number[]): any {
    for (let i = 0; i < numbers.length; i++) {
        let num = numbers[i];
        boards.forEach(b => b.call(num));

        let wins = boards.filter(b => b.hasWon());
        if (wins.length !== 0) {
            return {
                board: wins[0],
                num: num
            };
        }
    }
    return null;
}


function findLastWinner(boards: BingoBoard[], numbers: number[]) {
    for (let i = 0; i < numbers.length; i++) {
        let num = numbers[i];
        boards.forEach(b => b.call(num));

        let wins = boards.filter(b => !b.hasWon());
        if (wins.length === 1) {
            for (; i < numbers.length; i++) {
                wins[0].call(numbers[i]);
                if (wins[0].hasWon()) {
                    return {
                        board: wins[0],
                        num: numbers[i]
                    };
                }
            }
        }
    }
    return null;
}

describe('Day4 Test', () => {

    it('can parse bíngo board', () => {
        let inputBoard = `22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19`
        let board = new BingoBoard(inputBoard);

        expect(board.at(0, 0)).toBe(22);
        expect(board.at(0, 1)).toBe(13);
        expect(board.at(2, 4)).toBe(7);
        expect(board.at(4, 3)).toBe(15);
    });

    it('numbers are not marked per default', () => {
        let inputBoard = `22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19`
        let board = new BingoBoard(inputBoard);

        expect(board.isMarked(0, 0)).toBeFalsy();
    });

    it('should mark a called number', () => {
        let inputBoard = `22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19`
        let board = new BingoBoard(inputBoard);

        board.call(7);

        expect(board.isMarked(2, 4)).toBeTruthy();
    });

    it('should identify horizontal win', () => {
        let inputBoard = `22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19`
        let board = new BingoBoard(inputBoard);

        board.call(7);
        board.call(21);
        board.call(9);
        board.call(14);
        board.call(16);

        expect(board.hasWon()).toBeTruthy();
    });

    it('should identify vertical win', () => {
        let inputBoard = `22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19`
        let board = new BingoBoard(inputBoard);

        board.call(0);
        board.call(24);
        board.call(7);
        board.call(5);
        board.call(19);

        expect(board.hasWon()).toBeTruthy();
    });

    it('should calculates points', () => {
        let inputBoard = `14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`
        let board = new BingoBoard(inputBoard);

        for (const call of [7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24]) {
            board.call(call);
        }

        expect(board.hasWon()).toBeTruthy();
        expect(board.points()).toBe(188);
    });

    it('should stop at winning board', () => {
        let boards: BingoBoard[] = [];
        boards[0] = new BingoBoard(`22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19`);

        boards[1] = new BingoBoard(` 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6`);

        boards[2] = new BingoBoard(`14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`);

        let winner = findFirstWinner(boards, [7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18, 20, 8, 19, 3, 26, 1]);

        expect(winner).not.toBeNull();
        expect(winner.board.hasWon()).toBeTruthy();
        expect(winner.board.points()).toBe(188);
        expect(winner.num).toBe(24);
    });


    it('should read and stop at winning board', () => {
        let numbers: number[];
        let boards: BingoBoard[] = [];

        let lines = readInput(4);

        numbers = lines[0].split(",").map(n => Number.parseInt(n.trim()));

        for (let i = 2; i < lines.length; i = i + 6) {
            let boardData = "";
            for (let j = 0; j < 5; j++) {
                boardData = boardData + lines[i + j] + "\n";
            }

            boards.push(new BingoBoard(boardData))
        }

        let winner = findFirstWinner(boards, numbers);

        expect(winner).not.toBeNull();
        expect(winner.board.hasWon()).toBeTruthy();
        expect(winner.board.points()).toBe(1108);
        expect(winner.num).toBe(45);
        expect(49860).toBe(45 * 1108);
    });


    it('should stop at last winning board', () => {
        let boards: BingoBoard[] = [];
        boards[0] = new BingoBoard(`22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19`);

        boards[1] = new BingoBoard(` 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6`);

        boards[2] = new BingoBoard(`14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`);

        let winner = findLastWinner(boards, [7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18, 20, 8, 19, 3, 26, 1]);

        expect(winner).not.toBeNull();
        if (winner !== null) {
            expect(winner.board.hasWon()).toBeTruthy();
            expect(winner.board.points()).toBe(148);
            expect(winner.num).toBe(13);
        }
    });


    it('should read and stop at last winning board', () => {
        let lines = readInput(4);

        let numbers: number[] = lines[0].split(",").map(n => Number.parseInt(n.trim()));

        let boards: BingoBoard[] = [];
        for (let i = 2; i < lines.length; i = i + 6) {
            let boardData = "";
            for (let j = 0; j < 5; j++) {
                boardData = boardData + lines[i + j] + "\n";
            }

            boards.push(new BingoBoard(boardData))
        }

        let winner = findLastWinner(boards, numbers);

        expect(winner).not.toBeNull();
        if (winner !== null) {
            expect(winner.board.hasWon()).toBeTruthy();
            expect(winner.board.points()).toBe(262);
            expect(winner.num).toBe(94);
            expect(24628).toBe(94 * 262);
        }
    });

});