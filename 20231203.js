import {Defi} from "./src/Defi.js";
import {TextGrid} from "./src/TextGrid/TextGrid.js";

class Defi20231203 extends Defi {
    constructor() {
        super("20231203");
        this.rows = [];
        this.grid = [];
        this.centers = ['*','#','$'];
        this.findings = [];
    }

    analyse() {
        super.analyse();
        this.loadData(`${this.name}-test.txt`);
    }

    init() {

    }

    parseData(data) {
        super.parseData(data);
        this.rows = this.data;
        this.grid = new TextGrid(this.rows);

        for (let center of this.centers) {
            this.findings.push(this.grid.find(center));
        }


        let foundNumbers = [];
        for (let centers of this.findings) {
            for (let pos of centers) {

                const a = this.grid.area(pos);
                const areaAsValues = [];
                for (let point of a) {
                    areaAsValues.push(this.grid.char(point.x, point.y));
                }
                //console.log("area", a, "values", areaAsValues);
                for (let point of a) {

                    if (Number(this.grid.char(point.x, point.y)) > 0) {
                        const foundNumber = Number(this.grid.findNumber(point));
                        //console.log("found number",foundNumber)
                        if (!foundNumbers.includes(foundNumber))
                            foundNumbers.push(foundNumber);
                    }
                }

            }
        }

        console.log(foundNumbers);
        console.log(foundNumbers.reduce((a, b) => a + b, 0));


        this.answer(42);
    }
}

const currentDefi = new Defi20231203();