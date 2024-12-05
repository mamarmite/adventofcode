import {Parser} from "../Parser.js";

class CardGame {

    constructor() {
        this.gameSep = "";
        this.idSep = " ";
        this.name = "";
        this.id = 0;
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


    }

}

export {CardGame};