import {Defi} from "./src/Defi.js";

class Defi20231202 extends Defi {
    constructor() {
        super("20231202");
    }

    analyse() {
        super.analyse();
        this.loadData(`${this.name}-test.txt`);
    }

    init() {

    }


    parseData(data) {
        super.parseData(data);
        this.answer(42);
    }
}

const currentDefi = new Defi20231202();