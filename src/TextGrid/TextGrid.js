
class TextGrid {

    constructor(rows) {
        this.grid = [];
        this.parse(rows);
        this.invalids = ["."];
        this.centers = [];
        this.gearChar = "*";
        this.gears = [];
        this.parseForCenter();
    }

    parse(rows) {
        for (let row of rows) {
            this.grid.push(row.split(''));
        }
    }

    parseForCenter() {
        for (let y in this.grid) {
            const row = this.grid[y];
            for (let x in row) {
                const pos = row[x];
                this.pushCenter(this.char(Number(x), Number(y)));
            }
        }
    }
    parseForGears() {
        for (let y in this.grid) {
            const row = this.grid[y];
            for (let x in row) {
                const pos = row[x];
                this.pushGears(Number(x), Number(y));
            }
        }
    }

    pushGears(x, y) {
        if (this.char(Number(x), Number(y)) === this.gearChar) {
            const gearCenter = {x:x, y:y};
            const gearArea= this.area(gearCenter);

            this.gears.push({
                x:gearCenter.x,
                y:gearCenter.y,
                area: gearArea
            });
        }
    }

    pushCenter(char) {
        if (!this.invalids.includes(char) &&
            !Number.isInteger(Number(char)) &&
            !this.centers.includes(char)) {
            this.centers.push(char);
        }
    }

    find(char) {
        const finding = [];
        for (let y in this.grid) {
            const row = this.grid[y];
            for (let x in row) {
                const pos = row[x];
                if (pos === char)
                    finding.push({x:Number(x), y:Number(y)});
            }
        }
        return finding;
    }

    char(targetX, targetY) {
        return this.grid[targetY][targetX];
    }

    area(center, radius) {
        radius = 1;
        const area = [];
        const areaVectors = [
            {x:-radius, y:-radius}, {x:0, y:-radius}, {x:radius, y:-radius},
            {x:-radius, y:0}, {x:0, y:0}, {x:radius, y:0},
            {x:-radius, y:radius}, {x:0, y:radius}, {x:radius, y:radius}
        ];

        const xMin = 0;
        const yMin = 0;
        const xMax = this.grid[0].length;
        const yMax = this.grid.length;

        for (let pointModifier of areaVectors) {
            const pointX = center.x + pointModifier.x;
            const pointY = center.y + pointModifier.y;
            if (pointX < xMin || pointY < yMin || pointX >= xMax || pointY >= yMax) continue;
            area.push({x:pointX, y:pointY, char:this.char(pointX, pointY) });
        }
        return area;
    }

    printArea(area) {
        const rowWidth = 3;
        let index = 0;
        for (let point of area) {
            console.log(this.char(point.x, point.y));
            index++;
        }
    }

    findNumber(fromPos) {
        //fonctionne seulement horizontal.
        const walkingMax = 2;
        const targetRow = this.grid[fromPos.y];

        const stopValue = ['.'];
        let numbers = [];
        //let points = [];
        let numberString = "";
        let numberId = "";
        let lastChar = "";
        let lastCharIsNumber = false;


        for (let targetX = fromPos.x - walkingMax; targetX <= fromPos.x + walkingMax; targetX++) {

            const targetChar = this.char(targetX, fromPos.y);

            if (stopValue.includes(targetChar) && lastCharIsNumber) {
                if (targetX <= fromPos.x) numbers = [];//if it's a point but before the center, flush everything saved before
                if (targetX >= fromPos.x) break;//if it's a point and after the center, break we should have our number.
                continue;
            }
            if (this.centers.includes(targetChar) && lastCharIsNumber) {
                if (targetX <= fromPos.x) {
                    numbers = [];
                    continue;
                }
                if (targetX >= fromPos.x) {
                    break;
                }//if it's a point and after the center, break we should have our number.
            }
            if (!this.centers.includes(targetChar) && Number.isInteger(Number(targetChar))) {
                numbers.push({
                    pos: Number(targetX),
                    row: Number(fromPos.y),
                    value: targetChar
                });
            }
            lastChar = targetChar;
            lastCharIsNumber = Number.isInteger(Number(targetChar));
        }
        //  Reorder number in ASC from their x.
        const orderByPos = (a, b) => {
            if ( a.pos < b.pos ){
                return -1;
            }
            if ( a.pos > b.pos ){
                return 1;
            }
            return 0;
        }
        numbers.sort(orderByPos);
        for (let num of numbers) {
            numberString = numberString + String(num.value);//concatenate
            numberId += String(num.pos) + String(num.row);
        }

        return {str:numberString, id:numberId};
    }
}

export {TextGrid};