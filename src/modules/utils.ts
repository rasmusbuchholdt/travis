export function getStringNumber(string: string, fallbackNumber: number = null) {
    let result: string[] = string.match(/\d+/g);
    if(result)
        return Number(result[0]);
    return fallbackNumber;
}

export function arrayContains(targetArray: string[], matchArray: string[]) {
    let result: boolean = false;
    matchArray.map(item => {
        if(targetArray.indexOf(item) != -1)
            result = true;
    });
    return result;
}