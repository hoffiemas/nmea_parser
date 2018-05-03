import {
  parseTime, parseLatitude, parseLongitude, parseCommon,  parseValidationState, parseVariation, parseModeIndication
} from './parse-helper-functions';

export function parseRMC(nmeaArray: string[]): { [k: string]: any } | null {

  if (!nmeaArray || nmeaArray.length != 13) {
    return null;
  }
  const time = parseTime(nmeaArray[1]);
  const validationState = parseValidationState(nmeaArray[2]);
  const latitude = parseLatitude(nmeaArray[3], nmeaArray[4]);
  const longitude = parseLongitude(nmeaArray[5], nmeaArray[6]);
  const speedOverGroundKt = parseCommon(nmeaArray[7],'parseToFloat');
  const courseOverGroundDeg = parseCommon(nmeaArray[8],'parseToFloat');
  const currDate = parseCommon(nmeaArray[9]);
  const variationDeg = parseVariation(nmeaArray[10],nmeaArray[11]);
  const positioningMode = parseModeIndication(nmeaArray[12]);
  
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