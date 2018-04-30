const gpsparser = require('nmea-parser');
const gps = new gpsparser.GPS_Parser();
const parse = gps.parseNmeaMessage;
// test a common gga message:
const ggaString = '$GPGGA,092725.00,4717.11399,N,00833.91590,E,1,8,1.01,499.6,M,48.0,M,,0*5B';
const gllString = '$GPGLL,4717.11364,N,00833.91565,E,092321.00,A,A*60';
const gsaString = '$GPGSA,A,3,23,29,07,08,09,18,26,28,,,,,1.94,1.18,1.54*0D';
const gsvString_1 = '$GPGSV,3,1,10,23,38,230,44,29,71,156,47,07,29,116,41,08,09,081,36*7F';
const gsvString_2 = '$GPGSV,3,2,10,10,07,189,,05,05,220,,09,34,274,42,18,25,309,44*72'
const gsvString_3 = '$GPGSV,3,3,10,26,82,187,47,28,43,056,46*77';
const rmcString_1 = '$GPRMC,083559.00,A,4717.11437,N,00833.91522,E,0.004,77.52,091202,,,A*57';
const rmcString_2 = '$GPRMC,083559.00,A,4717.11437,N,00833.91522,E,0.004,77.52,091202,5.4,W,A*2F';
const vtgString = '$GPVTG,77.52,T,,M,0.004,N,0.008,K,A*06';

const gsvMissingChecksum = '$GPGSV,3,3,10,26,82,187,47,28,43,056,46';
const gsvWrongChecksum = '$GPGSV,3,3,10,26,82,187,47,28,43,056,46*4F';
const wrongNmeaSentence = '$GPGTX,,,,,,,';

const settings = ['noChecksumIsError', 'dontParseInvalidChecksum', 'qualifiedErrorMessages']

console.log('* * * * * * *  * * ');
console.log('Nr. 1:')
console.log(
    parse(ggaString, ...settings)
);
console.log('');

console.log('Nr. 2:')
console.log(
    parse(gllString, ...settings)
);
console.log('');

console.log('Nr. 3:')
console.log(
    parse(gsaString, ...settings)
);
console.log('');

console.log('Nr. 4:')
console.log(
    parse(gsvString_1, ...settings)
);
console.log('');

console.log('Nr. 5:')
console.log(
    parse(gsvString_2, ...settings)
);
console.log('');

console.log('Nr. 6:')
console.log(
    parse(gsvString_3, ...settings)
);
console.log('');

console.log('Nr. 7 -error:')
console.log(
    parse(gsvMissingChecksum, ...settings)
);
console.log('');

console.log('Nr. 8 -error:')
console.log(
    parse(gsvWrongChecksum, ...settings)
);
console.log('');

console.log('Nr. 9 -error:')
console.log(
    parse(wrongNmeaSentence, 'dontParseInvalidChecksum', 'qualifiedErrorMessages')
);
console.log('');

console.log('Nr. 10:')
console.log(
    parse(rmcString_1, ...settings)
);
console.log('');

console.log('Nr. 11:')
console.log(
    parse(rmcString_2, ...settings)
);
console.log('');

console.log('Nr. 12:')
console.log(
    parse(vtgString, ...settings)
);
console.log('');