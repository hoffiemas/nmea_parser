"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Function for parsing times
 */
function parseTime(value) {
    let result = null;
    /*
     * GPS Time comes usually in the following formats:
     *   - "" empty string    ==> no time in the sentence
     *   - HHMMSS
     *   - HHMMSS.ss
     *   - value ist always in UTC
     * empty string will be parsed as null
     * invalid string will be parsed as null
    */
    if (value && value.length >= 6) {
        let HH = value.substr(0, 2);
        let MM = value.substr(2, 2);
        let SS = value.substr(4);
        value = HH + ":" + MM + ":" + SS;
        result = value;
    }
    return result;
}
exports.parseTime = parseTime;
/*
 * Function for parsing Latitudes
 */
function parseLatitude(value, hemisphere) {
    let deg = null;
    //value comes usually in the following format DDMM.mmmmm
    if (value && hemisphere) {
        let degStr = value.substr(0, 2);
        let minStr = value.replace(degStr, "");
        if (!isNaN(parseInt(degStr, 10))) {
            let parsedMin = isNaN(parseFloat(minStr)) ? 0 : parseFloat(minStr) / 60;
            // if hemispehre is no valid arg, the parser doesn't know whether it's
            // south or 
            // north hemisphere. In this case the latitude ist undetermined
            // and worthless ==> null is returned,therefore only the N and S cases are
            //here
            (hemisphere.toUpperCase() == "N") &&
                (deg = parseInt(degStr, 10) + parsedMin);
            (hemisphere.toUpperCase() == "S") &&
                (deg = -(parseInt(degStr, 10) + parsedMin));
        }
    }
    return deg;
    ;
}
exports.parseLatitude = parseLatitude;
function parseVariation(value, hemisphere) {
    let deg = null;
    //value comes usually in the following format DD.dddd
    if (value && hemisphere && (hemisphere.toUpperCase() == 'E' ||
        hemisphere.toUpperCase() == 'W')) {
        let multiplier = (hemisphere.toUpperCase() == 'E') ? (1) : (-1);
        deg = parseFloat(value);
        if (!isNaN(deg))
            deg = deg * multiplier;
    }
    return deg;
}
exports.parseVariation = parseVariation;
function parseLongitude(value, hemisphere) {
    //empty return value; return value is an object with string-keys
    // and values of every type
    let deg = null;
    //value comes usually in the following format DDMM.mmmmm
    if (value && hemisphere) {
        let degStr = value.substr(0, 3);
        let minStr = value.replace(degStr, '');
        if (!isNaN(parseInt(degStr, 10))) {
            let parsedMin = isNaN(parseFloat(minStr)) ? 0 : parseFloat(minStr) / 60;
            //if hemispehre is no valid arg, the parser doesn't know whether it's E
            //or W.  In this case the latitude ist undetermined
            // and worthless ==> null is returned,therefore only the E and W cases
            //are here
            (hemisphere.toUpperCase() == 'E') &&
                (deg = parseInt(degStr, 10) + parsedMin);
            (hemisphere.toUpperCase() == 'W') &&
                (deg = -(parseInt(degStr, 10) + parsedMin));
        }
    }
    return deg;
}
exports.parseLongitude = parseLongitude;
function parseCommon(value, howToParse = '') {
    let result = value;
    if (value == null) {
        result = value;
    }
    else {
        if (howToParse == 'parseToInt')
            result = parseInt(value, 10);
        if (howToParse == 'parseToFloat')
            result = parseFloat(value);
    }
    return result;
}
exports.parseCommon = parseCommon;
function parseFixQuali(value) {
    //TODO: function should have the option to return a translation
    // of the numerical output as string - not yet implemented but
    //switch is prepared for it
    let result = parseInt(value, 10);
    switch (result) {
        case 1:
        case 2:
        case 4:
        case 5:
        case 6:
            break; //result remains as it is
        default:
            result = null;
    }
    return result;
}
exports.parseFixQuali = parseFixQuali;
function parseValidationState(value) {
    if (!value || !value.trim())
        return null;
    value = value.trim().toUpperCase();
    if (value == 'A') {
        return 'valid';
    }
    else if (value == 'V') {
        return 'invalid';
    }
    else
        return null;
}
exports.parseValidationState = parseValidationState;
function parseModeIndication(value) {
    if (!value || !value.trim())
        return null;
    value = value.trim().toUpperCase();
    let res = null;
    switch (value) {
        case 'A':
            res = 'A-autonomous mode';
            break;
        case 'D':
            res = 'D-differential mode,';
            break;
        case 'E':
            res = 'E-estimated (dead-reckoning) mode';
            break;
        case 'M':
            res = 'M-manual input mode';
            break;
        case 'S':
            res = 'S-simulated mode';
            break;
        case 'N':
            res = 'N-invalid';
            break;
    }
    return res;
}
exports.parseModeIndication = parseModeIndication;
function parseSmode(value) {
    if (!value || !value.trim())
        return null;
    value = value.trim().toUpperCase();
    let res = null;
    switch (value) {
        case 'A':
            res = 'A-allowed to automatically switch 2D/3D mode';
            break;
        case 'M':
            res = 'M-manual - forced to operate in 2D or 3D mode';
            break;
    }
    return res;
}
exports.parseSmode = parseSmode;
function parseFixStatus(value) {
    if (!value || !value.trim())
        return null;
    value = value.trim().toUpperCase();
    let res = null;
    switch (value) {
        case '1':
            res = '1-no fix';
            break;
        case '2':
            res = '2-2D fix';
            break;
        case '3':
            res = '3-3D fix';
            break;
    }
    return res;
}
exports.parseFixStatus = parseFixStatus;
function parseAltitude(value, name, args) {
    let obj = {};
    const result = parseInt(value, 10);
    obj[name] = isNaN(result) ? 0 : result;
    return obj;
}
exports.parseAltitude = parseAltitude;
