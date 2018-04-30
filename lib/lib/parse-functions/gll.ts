import {
  parseTime, parseLatitude, parseLongitude, parseValidationState, parseModeIndication
} from "./parse-helper-functions";

export function parseGLL(nmeaArray: string[]): { [k: string]: any } | null {

  if (!nmeaArray || nmeaArray.length != 8) {
    return null;
  }
  const latitude = parseLatitude(nmeaArray[1], nmeaArray[2]);
  const longitude = parseLongitude(nmeaArray[3], nmeaArray[4]);
  const time = parseTime(nmeaArray[5]);
  const validationState = parseValidationState(nmeaArray[6]);
  const positioningMode = parseModeIndication(nmeaArray[7]);

  return {
    latitude,
    longitude,
    time,
    validationState,
    positioningMode
  };
}