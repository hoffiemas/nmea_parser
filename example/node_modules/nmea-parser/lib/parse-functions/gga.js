"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parse_helper_functions_1 = require("./parse-helper-functions");
function parseGGA(nmeaArray) {
    if (!nmeaArray || nmeaArray.length != 15) {
        return null;
    }
    const time = parse_helper_functions_1.parseTime(nmeaArray[1]);
    const latitude = parse_helper_functions_1.parseLatitude(nmeaArray[2], nmeaArray[3]);
    const longitude = parse_helper_functions_1.parseLongitude(nmeaArray[4], nmeaArray[5]);
    const fixQuality = parse_helper_functions_1.parseFixQuali(nmeaArray[6]);
    const numberOfSatellites = parse_helper_functions_1.parseCommon(nmeaArray[7], 'parseToInt');
    const HDOP = parse_helper_functions_1.parseCommon(nmeaArray[8], 'parseToFloat');
    const altitudeInM = parse_helper_functions_1.parseCommon(nmeaArray[9], 'parseToFloat');
    const heightAboveWGS84EllipsoidInM = parse_helper_functions_1.parseCommon(nmeaArray[11], 'parseToFloat');
    const secondsSinceLastDGPSUpdate = parse_helper_functions_1.parseCommon(nmeaArray[13], 'parseToFloat');
    const DGPSStationIDNumber = parse_helper_functions_1.parseCommon(nmeaArray[14], 'parseToInt');
    return {
        time,
        latitude,
        longitude,
        fixQuality,
        numberOfSatellites,
        HDOP,
        altitudeInM,
        heightAboveWGS84EllipsoidInM,
        secondsSinceLastDGPSUpdate,
        DGPSStationIDNumber
    };
}
exports.parseGGA = parseGGA;
