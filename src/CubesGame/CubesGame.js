import {Parser} from "../Parser.js";
import {Run} from "./Run.js";

class CubesGame {

    constructor(rawGame) {
        this.raw = rawGame;
        this.rawName = "";
        this.id = 0;
        this.name = "";
        this.subsetsRaw = "";
        this.runs = [];

        this.gameSep = ": ";
        this.idSep = " ";
        this.runSep = "; ";
        this.stepSep = ", ";
        this.diceSep = " ";

        this.baseRun = new Run([]);
        this.sum = this.baseRun.initDices();
        this.max = this.baseRun.initDices();
        this.min = this.baseRun.initDices();

        this.passedHypothesis = false;

    }

    parse() {
        const game = this.raw.split(this.gameSep);
        if (game.length === 2) {
            this.rawName = game[0];
            this.subsetsRaw = game[1];
        }

        Parser(this.rawName, this.idSep, (parsed) => {
            this.id = Number(parsed[1]);
            this.name = parsed[0];
        }, false);

        this.parseRun(this.subsetsRaw);
    }

    parseRun(subsetRaw) {
        this.runs = Parser(subsetRaw, this.runSep, this.parseSteps.bind(this));

        for (let run of this.runs) {
            for (let color of this.baseRun.diceColors) {
                this.sum[color] += run.dices[color];
            }
        }

        for (let run of this.runs) {
            for (let color of this.baseRun.diceColors) {
                this.max[color] = this.max[color] < run.dices[color] ? run.dices[color] : this.max[color];
            }
        }

        for (let run of this.runs) {
            for (let color of this.baseRun.diceColors) {

                console.log(`min ${color}`, this.min[color], "> dice", run.dices[color]);
                if (this.min[color] === 0) {
                    this.min[color] = run.dices[color];
                    continue;
                }

                this.min[color] = this.min[color] > run.dices[color] ? run.dices[color] : this.min[color];

                console.log(`min ${color}`, this.min[color], "> dice", run.dices[color]);
            }
        }

        //console.log("Sum", this.sum, "max", this.max, "min", this.min);
    }

    parseSteps(runRaw) {
        const steps = Parser(runRaw, this.stepSep, this.parseDice.bind(this));

        return new Run(steps);
    }

    parseDice(diceRaw) {

        return Parser(diceRaw, this.diceSep, (parsed) => {
            return {color:parsed[1], nb:Number(parsed[0])}
        }, false);
    }

    checkHypothesis(hypothesis, on= "max") {
        let checkedDices = this.baseRun.initDices();

        let count = 0;
        const sets = this[on];
        for (let color of this.baseRun.diceColors) {
            checkedDices[color] = sets[color] <= hypothesis[color];
            if (checkedDices[color]) {
                count++;
            }
        }
        this.passedHypothesis = count === this.baseRun.diceColors.length;
        return this.passedHypothesis;
    }

    power(on="min") {
        let power = 1;
        const sets = this[on];

        for (let color of this.baseRun.diceColors) {
            if (sets[color] !== 0) {
                power *= sets[color];
            }
        }
        console.log("power", power, "of", sets);
        return power;
    }
}
export {CubesGame};