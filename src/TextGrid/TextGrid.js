
class TextGrid {

    constructor(rows) {
        this.grid = [];
        this.parse(rows);
    }

    parse(rows) {
        for (let row of rows) {
            this.grid.push(row.split(''));
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
            area.push({x:pointX, y:pointY});
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
        console.log("find number from", this.char(fromPos.x, fromPos.y), "pos", fromPos);
        const toLeft1 = fromPos.x - 1;
        const toLeft2 = fromPos.x - 2;
        const toLeft3 = fromPos.x - 3;
        const center = fromPos.x;
        const toRight1 = fromPos.x + 1;
        const toRight2 = fromPos.x + 2;
        const toRight3 = fromPos.x + 3;
        //const checkValuesLeft = [];
        const checkValues = [toLeft2, toLeft1, center, toRight1, toRight2];

        const notValid = ['*','#','$', '.'];
        const stopValue = ['.'];
        let numbers = [];
        let numberString = "";
        let lastChar = "";
        let lastCharIsNumber = false;

        for (let targetX of checkValues) {
            const targetChar = this.char(targetX, fromPos.y);
            if (stopValue.includes(targetChar) && lastCharIsNumber) {
                break;
            }
            if (notValid.includes(targetChar) && lastCharIsNumber) {
                continue;
            }
            if (!notValid.includes(targetChar) && Number(targetChar) > 0) {
                numbers.push({pos: Number(targetX), value: targetChar})
            }
            lastChar = targetChar;
            lastCharIsNumber = Number(targetChar) > 0;
        }

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
            numberString = numberString + String(num.value);
        }
        console.log("on", checkValues, "numbers", numbers, "strings", numberString);
        /*if (Number(numberString) < 9) {
            let numberString = "";
            let lastChar = "";
            let lastCharIsNumber = false;
            for (let targetX of checkValuesRight) {
                const targetChar = this.char(targetX, fromPos.y);
                if (notValid.includes(targetChar) && lastCharIsNumber) {
                    break;
                }
                if (!notValid.includes(targetChar) && Number(targetChar) > 0) {
                    numberString += targetChar;
                }
                lastChar = targetChar;
                lastCharIsNumber = Number(targetChar) > 0;
            }
        }*/
        return numberString;
    }
}

export {TextGrid};