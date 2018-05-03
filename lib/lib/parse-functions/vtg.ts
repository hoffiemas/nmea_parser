import {
   parseCommon, parseModeIndication
} from './parse-helper-functions';

export function parseVTG(nmeaArray: string[]): { [k: string]: any } | null {

  if (!nmeaArray || nmeaArray.length != 10) {
    return null;
  }
  const courseOverGroundDeg = parseCommon(nmeaArray[1],'parseToFloat');
  const courseOverGroundDegMag = parseCommon(nmeaArray[3],'parseToFloat');
  const speedOverGroundKt = parseCommon(nmeaArray[5],'parseToFloat');
  const speedOverGroundKmh = parseCommon(nmeaArray[7],'parseToFloat');
  const positioningMode = parseModeIndication(nmeaArray[9]);
  
  return {
   courseOverGroundDeg,
   courseOverGroundDegMag,
   speedOverGroundKt,
   speedOverGroundKmh,
   positioningMode
  };
}