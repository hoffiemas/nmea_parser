"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parse_helper_functions_1 = require("./parse-helper-functions");
function parseVTG(nmeaArray) {
    if (!nmeaArray || nmeaArray.length != 10) {
        return null;
    }
    const courseOverGroundDeg = parse_helper_functions_1.parseCommon(nmeaArray[1], 'parseToFloat');
    const courseOverGroundDegMag = parse_helper_functions_1.parseCommon(nmeaArray[3], 'parseToFloat');
    const speedOverGroundKt = parse_helper_functions_1.parseCommon(nmeaArray[5], 'parseToFloat');
    const speedOverGroundKmh = parse_helper_functions_1.parseCommon(nmeaArray[7], 'parseToFloat');
    const positioningMode = parse_helper_functions_1.parseModeIndication(nmeaArray[9]);
    return {
        courseOverGroundDeg,
        courseOverGroundDegMag,
        speedOverGroundKt,
        speedOverGroundKmh,
        positioningMode
    };
}
exports.parseVTG = parseVTG;
