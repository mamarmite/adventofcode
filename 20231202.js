import {Defi} from "./src/Defi.js";
import {CubesGame} from "./src/CubesGame/CubesGame.js";
import {colors} from "./src/CubesGame/Run.js";

class Defi20231202 extends Defi {
    constructor() {
        super("20231202");
        this.games = [];
    }

    analyse() {
        super.analyse();
    }

    init() {
        this.loadData(`${this.name}.txt`);
    }


    parseData(data) {
        super.parseData(data);


        //test games for values.
        const hypothesis = {
            red: 12,
            green: 13,
            blue:14
        };

        let answer = 0;
        let answer2 = 0;
        for (const gameRaw of this.data) {
            const game = new CubesGame(gameRaw);
            game.parse();
            this.games.push(game);
            game.checkHypothesis(hypothesis, "max");

            if (game.passedHypothesis) {
                answer += game.id;
            }
            answer2 += game.power("max");
        }

        this.answer(answer);
        this.answer(answer2);
    }
}

const currentDefi = new Defi20231202();