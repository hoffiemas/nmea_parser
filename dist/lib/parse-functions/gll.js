"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parse_helper_functions_1 = require("./parse-helper-functions");
function parseGLL(nmeaArray) {
    if (!nmeaArray || nmeaArray.length != 8) {
        return null;
    }
    const latitude = parse_helper_functions_1.parseLatitude(nmeaArray[1], nmeaArray[2]);
    const longitude = parse_helper_functions_1.parseLongitude(nmeaArray[3], nmeaArray[4]);
    const time = parse_helper_functions_1.parseTime(nmeaArray[5]);
    const validationState = parse_helper_functions_1.parseValidationState(nmeaArray[6]);
    const positioningMode = parse_helper_functions_1.parseModeIndication(nmeaArray[7]);
    return {
        latitude,
        longitude,
        time,
        validationState,
        positioningMode
    };
}
exports.parseGLL = parseGLL;
