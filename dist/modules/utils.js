"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getStringNumber(string, fallbackNumber) {
    if (fallbackNumber === void 0) { fallbackNumber = null; }
    var result = string.match(/\d+/g);
    if (result)
        return Number(result[0]);
    return fallbackNumber;
}
exports.getStringNumber = getStringNumber;
function arrayContains(targetArray, matchArray) {
    var result = false;
    matchArray.map(function (item) {
        if (targetArray.indexOf(item) != -1)
            result = true;
    });
    return result;
}
exports.arrayContains = arrayContains;
function determineDeviceType(words) {
    if (arrayContains(words, ["pc", "computer", "laptop"])) {
        return "computer";
    }
    else if (arrayContains(words, ["mobile", "phone", "smartphone"])) {
        return "smartphone";
    }
    else if (arrayContains(words, ["tv", "television"])) {
        return "tv";
    }
    else if (arrayContains(words, ["speaker", "speakers"])) {
        return "speaker";
    }
    else {
        return null;
    }
}
exports.determineDeviceType = determineDeviceType;
