/**
 * @description function detectes a checksum an evaluates it.
 * @returns Object with checksumState:string 'valid', 'invalid' or 'none'
 * @param {string} nmeaMessage a NMEA message string without starting '!' or
 * '$'
 * @author Henner
 */
export declare function evaluateChecksum(nmeaMessage: string): {
    checksumState: string;
    clearedNmeaMessage: string;
};
