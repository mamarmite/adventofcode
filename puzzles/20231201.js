import {Defi} from "../src/Defi.js";

class Defi20231201 extends Defi {
    constructor() {
        super("20231201", "data/2025");
        this.letterNumbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirdteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
        this.replaceLetterNumbers = [];
    }

    replaceStringNumbers(line) {
        let newline = `${line}`;
        for (let num in this.letterNumbers) {
            const stringNumber = this.letterNumbers[num];
            const targetStringNumber = this.replaceLetterNumbers[num];
            const stringNumberRegex = new RegExp(`${stringNumber}`, 'g');
            newline = newline.replace(stringNumberRegex, targetStringNumber);
        }
        return newline;
    }

    analyse() {
        super.analyse();
        this.loadData(`${this.name}-test.txt`);
    }

    init() {
        for (let index in this.letterNumbers) {
            const word = this.letterNumbers[index];
            const pos = 2;
            const parsedWord = `${word}`.substring(0,pos) + index + `${word}`.substring(pos, word.length);
            this.replaceLetterNumbers.push(parsedWord);
        }
    }

    pruneLetters(value) {
        const numberOnly = /\d+/g;
        let prunedValue = value.match(numberOnly);
        return prunedValue ? prunedValue.join('') : value;
    }

    getLineNumbers(line) {
        const lineTotal = line.length;
        let first = line.charAt(0);
        let last = "";
        if (lineTotal > 1) {
            last = line.charAt(lineTotal-1);
        } else {
            last = first;
        }
        return Number(`${first}${last}`);
    }

    valueOf(lines, stringNumbers=true) {
        let total = 0;
        for (let line of lines) {
            const rawLine = line;
            if (stringNumbers)
                line = this.replaceStringNumbers(line);
            const lineNumbers = this.pruneLetters(line);
            const lineValue = this.getLineNumbers(lineNumbers);
            if (this.verbose) console.log(rawLine, line, lineNumbers, lineValue);
            total += lineValue;
        }
        return total;//54393
    }

    parseData(data) {
        super.parseData(data);
        this.answer(this.valueOf(this.data));
    }
}

const currentDefi = new Defi20231201();
currentDefi.analyse();