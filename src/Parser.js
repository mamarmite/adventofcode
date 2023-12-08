

export const Parser = (raw, sep, subParsing, loop=true) => {
    const splitedRaw = raw.split(sep);
    let parsedResult = [];

    if (typeof subParsing === "function" && loop) {
        for (let elementRaw of splitedRaw) {
            parsedResult.push(subParsing(elementRaw));
        }
    }
    if (typeof subParsing === "function" && !loop) {
        return subParsing(splitedRaw);
    }
    return parsedResult;
}