import { ISimpleObject } from './lib/interfaces';
export declare class GPS_Parser {
    /**
     * @description Function that parses a set of NMEA Messages. For details about
     * parsing look at parseNmeaMessage function.
     * Function accepts optional args. At the moment only the string
     * 'suppressInvalid' is accepted. If this flag is set, the returned array will
     *  not contain any invalid nmea Message. Further all args of parseNmeaMessage
     *  function are accepted.
     * @param {string[]} nmeaMessageArray string[] - Array of string, where each
     * string is a NMEA Message
     * @param {any} args optional args see description
     */
    parseNmeaArray(nmeaMessageArray: string[], ...args: any[]): string[] | ISimpleObject[];
    /**
   * @description Function that parses a NMEA Messages.
   * Function accepts optional args. At the moment the following strings
   * are supported:
   * - 'qualifiedErrorMessages' ==> if parsing fails give a error message
   * - 'noChecksumIsError' ==> the absense of a checksum is treated as error
   * - 'dontParseInvalidChecksum' ==> if checksum is invalid, errormessage
   * is returned
   * - 'unknownDeviceIsError' ==> if device id is unknown, send error
   * - 'stringify' ==> return results after JSON.stringify() and not as plain
   *  js objects
   * @param {string} nmeaMessage string - potential NMEA message.
   * @param {any} args optional args see description.
   */
    parseNmeaMessage(nmeaMessage: string, ...args: any[]): string | ISimpleObject;
}
