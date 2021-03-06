"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isNoOrEmptyObj(obj) {
    if (!obj)
        return true;
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
exports.isNoOrEmptyObj = isNoOrEmptyObj;
function stringifyDecision(stringifyResults, errorMsg, qualifiedErrMsg = true, obj) {
    if (errorMsg) {
        if (qualifiedErrMsg) {
            let res_obj = { msgType: 'error', message: errorMsg };
            return stringifyResults ? JSON.stringify(res_obj) : res_obj;
        }
        else {
            return null;
        }
    }
    if (isNoOrEmptyObj(obj))
        return null;
    return stringifyResults ? JSON.stringify(obj) : obj;
}
exports.stringifyDecision = stringifyDecision;
