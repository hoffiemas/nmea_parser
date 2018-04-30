/**
 * @description Every NMEA sentence beginns with either ! or $ followed by a 
 * device ID wich describes what kind of device has send the sentence followed by an identifier, describing the kind
 * of sentence type. The const deviceID is a dict. of the two char device id. 
 * For the sentence identifier look for NMEA_Sentences
 */


export const DEVICE_IDS = [
    {
        abbr: "AG",
        meaning: "Autopilot - General"
    },
    {
        abbr: "AP",
        meaning: "Autopilot - Magnetic"
    },
    {
        abbr: "CC",
        meaning: "Computer - Programmed Calculator (outdated)"
    },
    {
        abbr: "CD",
        meaning: "Communications - Digital Selective Calling (DSC)"
    },
    {
        abbr: "CM",
        meaning: "Computer - Memory Data (outdated)"
    },
    {
        abbr: "CS",
        meaning: "Communications - Satellite"
    },
    {
        abbr: "CT",
        meaning: "Communications - Radio-Telephone (MF/HF)"
    },
    {
        abbr: "CV",
        meaning: "Communications - Radio-Telephone (VHF)"
    },
    {
        abbr: "CX",
        meaning: "Communications - Scanning Receiver"
    },
    {
        abbr: "DE",
        meaning: "DECCA Navigation"
    },
    {
        abbr: "DF",
        meaning: "Direction Finder"
    },
    {
        abbr: "EC",
        meaning: "Elektronische Seekarte (ECDIS)"
    },
    {
        abbr: "EP",
        meaning: "Emergency Position Indicating Beacon (EPIRB)"
    },
    {
        abbr: "ER",
        meaning: "Engine Room Monitoring Systems"
    },
    {
        abbr: "GA",
        meaning: "Galileo"
    },
    {
        abbr: "GL",
        meaning: "GLONASS"
    },
    {
        abbr: "GN",
        meaning: "kombinierte Positionslösung mehrerer GNSS"
    },
    {
        abbr: "GP",
        meaning: "GPS"
    },
    {
        abbr: "HC",
        meaning: "Magnetic Compass"
    },
    {
        abbr: "HE",
        meaning: "North Seeking Gyro"
    },
    {
        abbr: "HN",
        meaning: "Non North Seeking Gyro"
    },
    {
        abbr: "II",
        meaning: "Integrated Instrumentation"
    },
    {
        abbr: "IN",
        meaning: "Integrated Navigation"
    },
    {
        abbr: "LA",
        meaning: "Loran A"
    },
    {
        abbr: "LC",
        meaning: "Loran C"
    },
    {
        abbr: "MP",
        meaning: "Microwave Positioning System"
    },
    {
        abbr: "OM",
        meaning: "OMEGA"
    },
    {
        abbr: "OS",
        meaning: "Distress Alarm System"
    },
    {
        abbr: "PF",
        meaning: "FLARM"
    },
    {
        abbr: "RA",
        meaning: "RADAR"
    },
    {
        abbr: "SD",
        meaning: "Sounder, Depth"
    },
    {
        abbr: "SN",
        meaning: "Electronic Positioning System"
    },
    {
        abbr: "SS",
        meaning: "Sounder, Scanning"
    },
    {
        abbr: "TI",
        meaning: "Turn Rate Indicator"
    },
    {
        abbr: "TR",
        meaning: "TRANSIT"
    },
    {
        abbr: "VD",
        meaning: "Velocity Sensor, Doppler"
    },
    {
        abbr: "DM",
        meaning: "Velocity Sensor, Speed Log, Water, Magnetic"
    },
    {
        abbr: "VW",
        meaning: "Velocity Sensor, Speed Log, Water, Mechanical"
    },
    {
        abbr: "WI",
        meaning: "Weather Instruments"
    },
    {
        abbr: "YX",
        meaning: "Transducer"
    },
    {
        abbr: "ZA",
        meaning: "Timekeeper - Atomic Clock"
    },
    {
        abbr: "ZC",
        meaning: "Timekeeper - Chronometer"
    },
    {
        abbr: "ZQ",
        meaning: "Timekeeper - Quartz"
    },
    {
        abbr: "ZV",
        meaning: "Timekeeper - Radio Update, WWV (Zeitzeichensender) oder WWVH"
    }
]

    
