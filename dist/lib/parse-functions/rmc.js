"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parse_helper_functions_1 = require("./parse-helper-functions");
function parseRMC(nmeaArray) {
    if (!nmeaArray || nmeaArray.length != 13) {
        return null;
    }
    const time = parse_helper_functions_1.parseTime(nmeaArray[1]);
    const validationState = parse_helper_functions_1.parseValidationState(nmeaArray[2]);
    const latitude = parse_helper_functions_1.parseLatitude(nmeaArray[3], nmeaArray[4]);
    const longitude = parse_helper_functions_1.parseLongitude(nmeaArray[5], nmeaArray[6]);
    const speedOverGroundKt = parse_helper_functions_1.parseCommon(nmeaArray[7], 'parseToFloat');
    const courseOverGroundDeg = parse_helper_functions_1.parseCommon(nmeaArray[8], 'parseToFloat');
    const currDate = parse_helper_functions_1.parseCommon(nmeaArray[9]);
    const variationDeg = parse_helper_functions_1.parseVariation(nmeaArray[10], nmeaArray[11]);
    const positioningMode = parse_helper_functions_1.parseModeIndication(nmeaArray[12]);
    return {
        time,
        validationState,
        latitude,
        longitude,
        speedOverGroundKt,
        courseOverGroundDeg,
        currDate,
        variationDeg,
        positioningMode,
    };
}
exports.parseRMC = parseRMC;
