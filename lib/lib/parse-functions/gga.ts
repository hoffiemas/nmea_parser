import {
  parseTime, parseLatitude, parseLongitude, parseCommon, parseFixQuali
} from "./parse-helper-functions";

export function parseGGA(nmeaArray: string[]): { [k: string]: any } | null {

  if (!nmeaArray || nmeaArray.length != 15) {
    return null;
  }
  const time = parseTime(nmeaArray[1]);
  const latitude = parseLatitude(nmeaArray[2], nmeaArray[3]);
  const longitude = parseLongitude(nmeaArray[4], nmeaArray[5]);
  const fixQuality = parseFixQuali(nmeaArray[6]);
  const numberOfSatellites = parseCommon(nmeaArray[7], 'parseToInt');
  const HDOP = parseCommon(nmeaArray[8], 'parseToFloat');
  const altitudeInM = parseCommon(nmeaArray[9], 'parseToFloat');
  const heightAboveWGS84EllipsoidInM = parseCommon(nmeaArray[11], 'parseToFloat');
  const secondsSinceLastDGPSUpdate =parseCommon(nmeaArray[13], 'parseToFloat');
  const DGPSStationIDNumber = parseCommon(nmeaArray[14], 'parseToInt')
  
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