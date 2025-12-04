import {Defi} from "../src/Defi.js";
import {CardGame} from "../src/CardsGame/CardGame.js";

class Defi20231204 extends Defi {
    constructor() {
        super("20231204", "data/2025");
        this.games = [];
    }

    analyse() {
        super.analyse();
        this.loadData(`${this.name}-test.txt`);
    }

    init() {
    }


    parseData(data) {
        super.parseData(data);


        for (const gameRaw of this.data) {
            const game = new CardGame(gameRaw);

            game.parse();
            this.games.push(game);
        }


        this.answer(42);
    }
}

new Defi20231204();