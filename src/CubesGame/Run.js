
const colors = ["blue", "red", "green"]

class Run {
    constructor(rawSteps) {
        this.diceColors = colors;
        this.rawSteps = rawSteps;
        this.dices = rawSteps;
    }

    initDices() {
        const dices = {};
        for (let dice of this.diceColors) {
            dices[dice] = 0;
        }
        return dices;
    }

    get dices() {
        return this._dices;
    }

    set dices(steps) {
        this._dices = this.initDices();
        for (let step of steps) {
            this._dices[step.color] = step.nb;
        }
    }
}

export {Run, colors};