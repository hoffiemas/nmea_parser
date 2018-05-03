import {
   parseCommon, parseSmode, parseFixStatus
} from './parse-helper-functions';

export function parseGSA(nmeaArray: string[]): { [k: string]: any } | null {

  if (!nmeaArray || nmeaArray.length != 18) {
    return null;
  }
  const sMode = parseSmode(nmeaArray[1]);
  const fixStatus = parseFixStatus(nmeaArray[2]);
  const sateliteNumbers: number[] = [];
  
  for (let i = 3; i < 15; i++) {
    const sateliteNr = parseInt(nmeaArray[i], 10);
    if (!isNaN(sateliteNr)) {
      sateliteNumbers.push(sateliteNr);
    }
  }

  const PDOP = parseCommon(nmeaArray[15], 'parseToFloat');
  const HDOP = parseCommon(nmeaArray[16], 'parseToFloat');
  const VDOP = parseCommon(nmeaArray[17], 'parseToFloat');

  return {
    sMode,
    fixStatus,
    sateliteNumbers,
    PDOP,
    HDOP,
    VDOP,
  };
}