import {Parser} from "../Parser.js";
import {CubesGame} from "../CubesGame/CubesGame.js";

class CardGame {

    constructor(raw) {
        this.data = raw;
        this.gameSep = ": ";
        this.idSep = " ";
        this.rawName = "";
        this.subsetsRaw = "";
        this.subsetSeperator = " | ";
        this.name = "";
        this.id = 0;
        this.run = [];
    }


    parse() {
        const game = this.data.split(this.gameSep);
        if (game.length === 2) {
            this.rawName = game[0];
            this.subsetsRaw = game[1];
        }

        Parser(this.rawName, this.idSep, (parsed) => {
            this.id = Number(parsed[1]);
            this.name = parsed[0];
        }, false);

        Parser(this.subsetsRaw, this.subsetSeperator, (parsed) => {
            this.run.push(parsed);
        }, false);
        console.log(this.run);
    }

}

export {CardGame};