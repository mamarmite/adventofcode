import fs from "fs";
import path from "path";

class Defi {

    constructor(name, path="puzzles") {
        this.name = name;
        this.rawData = null;
        this.path = path;
        this.verbose = true;
        this.analyse();
    }

    loadData(filename) {
         fs.readFile(`${this.path}\\${filename}`, 'utf8', (err, data) => {
            if (err) throw err;
            this.parseData(data);
        });
    }

    parseData(data) {
        this.rawData = data;
        this.data = data.split(/\r\n/);//?;
    }

    analyse() {
        this.init();
        console.log("Defi initiation");
    }

    answer(value) {
        console.log(`And the answer of ${this.name} is : `, value);
    }
}

export {Defi};