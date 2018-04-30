/**
 * @description Every NMEA sentence beginns with either ! or $ followed by a
 * device ID wich describes what kind of device has send the sentence followed by an identifier, describing the kind
 * of sentence type. The const deviceID is a dict. of the two char device id.
 * For the sentence identifier look for NMEA_Sentences
 */
export declare const DEVICE_IDS: {
    abbr: string;
    meaning: string;
}[];
