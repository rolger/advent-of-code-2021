export function readInput(day: number): string[] {
    const fs = require('fs');

    let lines: string[];
    try {
        // read contents of the file
        const data = fs.readFileSync('C:\\Users\\rolandgerm\\projects\\community\\advent-of-code\\TypeScript\\test\\input' + day + '.txt', 'UTF-8');

        // split the contents by new line
        lines = data.split(/\r?\n/);
        return lines;
    } catch (err) {
        console.error(err);
    }
    return [];
}