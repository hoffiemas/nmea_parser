/**
 * @description function detectes a checksum an evaluates it.
 * @returns Object with checksumState:string 'valid', 'invalid' or 'none' 
 * @param {string} nmeaMessage a NMEA message string without starting '!' or
 * '$'
 * @author Henner
 */
export function evaluateChecksum(nmeaMessage: string): {
  checksumState: string,
  clearedNmeaMessage: string
} {
  
  let result = { checksumState: 'none', clearedNmeaMessage: nmeaMessage };

  if (nmeaMessage.substr(-3, 1) != '*') return result;

  const checksum = nmeaMessage.substr(-3);
  
  const clearedNmeaMessage = nmeaMessage.replace(checksum, '');

  let checksumShouldBe = 0;

  for (let char of clearedNmeaMessage) {
    checksumShouldBe = checksumShouldBe ^ char.charCodeAt(0);
  }

  let hex = checksumShouldBe.toString(16).toUpperCase();

  (hex.length==1)&&(hex = '0'+hex);
 
  let checksumState = ('*' + hex) == checksum ? 'valid' : 'invalid';

  result = { checksumState, clearedNmeaMessage }

  return result;
} 