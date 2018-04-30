"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parse_helper_functions_1 = require("./parse-helper-functions");
function parseGSA(nmeaArray) {
    if (!nmeaArray || nmeaArray.length != 18) {
        return null;
    }
    const sMode = parse_helper_functions_1.parseSmode(nmeaArray[1]);
    const fixStatus = parse_helper_functions_1.parseFixStatus(nmeaArray[2]);
    const sateliteNumbers = [];
    for (let i = 3; i < 15; i++) {
        const sateliteNr = parseInt(nmeaArray[i], 10);
        if (!isNaN(sateliteNr)) {
            sateliteNumbers.push(sateliteNr);
        }
    }
    const PDOP = parse_helper_functions_1.parseCommon(nmeaArray[15], 'parseToFloat');
    const HDOP = parse_helper_functions_1.parseCommon(nmeaArray[16], 'parseToFloat');
    const VDOP = parse_helper_functions_1.parseCommon(nmeaArray[17], 'parseToFloat');
    return {
        sMode,
        fixStatus,
        sateliteNumbers,
        PDOP,
        HDOP,
        VDOP,
    };
}
exports.parseGSA = parseGSA;
