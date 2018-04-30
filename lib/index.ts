import { evaluateChecksum } from './lib/checksum-function';
import { DEVICE_IDS } from './lib/device-id';
import { parseGGA } from './lib/parse-functions/gga';
import { stringifyDecision } from './lib/helper-functions';
import { ISimpleObject } from './lib/interfaces';
import { parseGLL } from './lib/parse-functions/gll';
import { parseGSA } from './lib/parse-functions/gsa';
import { parseGSV } from './lib/parse-functions/gsv';
import { parseRMC } from './lib/parse-functions/rmc';
import { parseVTG } from './lib/parse-functions/vtg';

export class GPS_Parser {
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
  public parseNmeaArray(nmeaMessageArray: string[], ...args: any[]):
    string[] | ISimpleObject[] {

    //filters args for suppressInvalid flag
    const suppressInvalid: boolean =
      args.find(x => x == 'suppressInvalid') ? true : false;

    let result: ISimpleObject[] = [];

    if (!nmeaMessageArray || nmeaMessageArray.length == 0) return [];

    //clone args
    let myArgs = args.slice(0);

    //if there is the argument 'stringify', remove it, we will stringify later
    while (myArgs.indexOf('stringify') > -1) {
      const index = myArgs.indexOf('stringify');
      myArgs.splice(index, 1);
    }

    for (let item of nmeaMessageArray) {
      const res = this.parseNmeaMessage(item, ...myArgs);
      if ((!res || (res as ISimpleObject).msgType == 'error') &&
        suppressInvalid) {
        continue;
      }
      result.push(res as ISimpleObject);
    }

    if (args.find(x => x == 'stringify')) {
      let res: string[] = [];
      result.forEach((i) => {
        res.push(JSON.stringify(i))
      });
      return res;
    }
    return result;
  }



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
  parseNmeaMessage(nmeaMessage: string, ...args: any[]):
    string | ISimpleObject {

    //flags for parsing, see args description
    const qualifiedErrorMessages: boolean =
      args.find(x => x == 'qualifiedErrorMessages') ? true : false;

    const noChecksumIsError: boolean =
      args.find(x => x == 'noChecksumIsError') ? true : false;

    const dontParseInvalidChecksum: boolean =
      args.find(x => x == 'dontParseInvalidChecksum') ? true : false;

    const unknownDeviceIsError: boolean =
      args.find(x => x == 'unknownDeviceIsError') ? true : false;

    const stringify: boolean =
      args.find(x => x == 'stringify') ? true : false;

    let result: ISimpleObject = {};

    if (!nmeaMessage || typeof nmeaMessage != 'string' ||
      !nmeaMessage.trim()) {

      return stringifyDecision(stringify, 'got no data',
        qualifiedErrorMessages);

    }

    /*remove whitespaces because NMEA messages end with
     line breaks and other whitespaces and you're not alway aware of
     what comes in trail from serial readers or others... */
    nmeaMessage = nmeaMessage.trim();

    //check if it starts with '!' or '$' 
    const startChar = nmeaMessage[0];
    const seemsToBeNmea = (startChar == '$' || startChar == '!');

    if (!seemsToBeNmea) {
      return stringifyDecision(stringify, 'not a nmeaString',
        qualifiedErrorMessages);
    }

    //remove '$' or '!' -- read from index 1 till end
    nmeaMessage = nmeaMessage.substring(1);

    //evaluate the checksum
    const checksumEvaluation: {
      checksumState: string,
      clearedNmeaMessage: string
    } = evaluateChecksum(nmeaMessage);

    if (noChecksumIsError && checksumEvaluation.checksumState == 'none') {
      return stringifyDecision(stringify, 'no checksum detected',
        qualifiedErrorMessages);
    }

    if (checksumEvaluation.checksumState == 'invalid' &&
      dontParseInvalidChecksum) {

      return stringifyDecision(stringify, `checksum invalid and` +
        `'dontParseInvalidChecksum' flag set`, qualifiedErrorMessages);

    }

    //split nmea string wich has no beginnig '$' or '$' into array of strings
    const nmeaMessageArr = checksumEvaluation.clearedNmeaMessage.split(',');

    /* first part of the array is the sentence identifier,
     * so the challenge is to find the correct sentence
     * parsefunction by the identifier
     * First Part is $AABBB  '$' can also be a '!' but we have
     * removed it already. So gpsDataArr[0] holds only AABBB
     *   AA ==> devie ID
     *   BBB ==> type of Message/Sentence  
     */

    // get AA and find the device (for information purposes) e.g.
    // if you use a device that can handle GPS and GLONAS parallel

    const deviceIdentifierObj = DEVICE_IDS.find(
      x => x.abbr === nmeaMessageArr[0].substr(0, 2).toUpperCase())

    if (!deviceIdentifierObj && unknownDeviceIsError) {
      return stringifyDecision(stringify, 'No such device found, do you use a',
        qualifiedErrorMessages);
    }

    //in case of unknown deviceIdentifier but no errorflag for this
    //set it to AA + '-unknown';
    const deviceIdentifier = !deviceIdentifierObj ? nmeaMessageArr[0]
      .substr(0, 2).toUpperCase() + ' -unknown' : deviceIdentifierObj.meaning;

    // get BBB to chose the right parse function
    const typeOfMessage: string = nmeaMessageArr[0].substr(2).toUpperCase();

    // This is what all non error result objects have in common
    result = {
      checksumState: checksumEvaluation.checksumState,
      deviceIdentifier,
      msgType: typeOfMessage
    }

    let res: ISimpleObject;

    switch (typeOfMessage) {
      case 'GGA':
        res = parseGGA(nmeaMessageArr);
        break;
      case 'GLL':
      res = parseGLL(nmeaMessageArr);
        break;
      case 'GSA':
      res = parseGSA(nmeaMessageArr);
        break;
      case 'GSV':
      res = parseGSV(nmeaMessageArr);
        break
      case 'RMC':
      res = parseRMC(nmeaMessageArr);
        break
      case 'VTG':
      res = parseVTG(nmeaMessageArr);
        break;
      default:
        break;
    }

    if (res == null) {
      return stringifyDecision(stringify, 'parsing error',
        qualifiedErrorMessages);
    }

    result = { ...result, ...res };

    return stringifyDecision(stringify, null, null, result);
  }
}