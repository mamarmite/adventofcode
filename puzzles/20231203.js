import {Defi} from "../src/Defi.js";
import {TextGrid} from "../src/TextGrid/TextGrid.js";

class Defi20231203 extends Defi {
    constructor() {
        super("20231203", "data/2025");
        this.rows = [];
        this.grid = [];
        this.centers = ['*','#','$','+'];
        this.findings = [];
    }

    analyse() {
        super.analyse();
        this.loadData(`${this.name}.txt`);
        //test 2 use : https://www.reddit.com/r/adventofcode/comments/189q9wv/2023_day_3_another_sample_grid_to_use/
    }

    init() {

    }

    findCenters() {

    }

    parseDataP1(data) {

        super.parseData(data);
        this.rows = this.data;
        this.grid = new TextGrid(this.rows);
        this.grid.parseForCenter();

        for (let center of this.grid.centers) {
            this.findings.push(this.grid.find(center));
        }

        let foundNumbersById = {};
        for (let centers of this.findings) {
            for (let pos of centers) {

                const a = this.grid.area(pos);
                /*const areaAsValues = [];
                for (let point of a) {
                    areaAsValues.push(this.grid.char(point.x, point.y));
                }*/

                for (let point of a) {
                    let pointValue = Number(this.grid.char(point.x, point.y));
                    if (Number.isInteger(pointValue)) {
                        const found = this.grid.findNumber(point);
                        foundNumbersById[found.id] = Number(found.str);
                        //check if we already found that number around that characters
                        //ca prend une genre d'empreinte pour savoir si c'est le même nombre ou pas.
                        //if (!foundNumbersById[found.id])
                        //    foundNumbers.push(foundNumbersById[found.id]);
                    }
                }
                //
                //allFoundNumbers.push(...foundNumbers);
                //foundNumbers = [];
            }
        }
        //509115
        //486607
        //147337669
        //317717
        console.log('foundNumbersById', foundNumbersById);
        let total = 0;
        for (let num in foundNumbersById) {
            total += foundNumbersById[num];
        }
        //this.answer(allFoundNumbers.reduce((a, b) => a + b, 0));
        this.answer(total)
    }

    parseData(data) {
        super.parseData(data);
        this.rows = this.data;
        this.grid = new TextGrid(this.rows);
        this.grid.parseForGears();
        const confirmedGear = [];
        for (let gear of this.grid.gears) {
            gear.foundNumbers = {};
            gear.found = 0;
            gear.ratio = 1;

            for (let point of gear.area) {
                let pointValue = Number(point.char);
                if (Number.isInteger(pointValue)) {
                    const found = this.grid.findNumber(point);
                    gear.foundNumbers[found.id] = Number(found.str);
                }
            }
            for (let num in gear.foundNumbers) {
                let gearNumber = gear.foundNumbers[num];
                gear.found++;
                gear.ratio *= Number(gearNumber);
            }
            if (gear.found === 2) {
                confirmedGear.push(gear);
            }
        }

        //this.answer(confirmedGear.reduce((a, b) => a.ratio + b.ratio, 0));
        let total = 0;
        for (let gear of confirmedGear) {
            total += Number(gear.ratio);
        }
        console.log("confirmed", confirmedGear);
        this.answer(total);
    }
}

new Defi20231203();