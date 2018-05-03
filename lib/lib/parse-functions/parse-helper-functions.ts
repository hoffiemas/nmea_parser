
/*
 * Function for parsing times
 */
export function parseTime(value: string): string | null {
  let result = null;

  /*
   * GPS Time comes usually in the following formats:
   *   - "" empty string    ==> no time in the sentence
   *   - HHMMSS
   *   - HHMMSS.ss
   *   - value ist always in UTC
   * empty string will be parsed as null
   * invalid string will be parsed as null
  */
  if (value && value.length >= 6) {
    let HH = value.substr(0, 2);
    let MM = value.substr(2, 2);
    let SS = value.substr(4);
    value = HH + ':' + MM + ':' + SS;
    result = value;
  }
  return result;
}


/*
 * Function for parsing Latitudes
 */
export function parseLatitude(value: string, hemisphere: string):
  number | null {

  let deg: number = null;

  //value comes usually in the following format DDMM.mmmmm
  if (value && hemisphere) {
    let degStr = value.substr(0, 2);
    let minStr = value.replace(degStr, '');

    if (!isNaN(parseInt(degStr, 10))) {
      let parsedMin = isNaN(parseFloat(minStr)) ? 0 : parseFloat(minStr) / 60;

      // if hemispehre is no valid arg, the parser doesn't know whether it's
      // south or 
      // north hemisphere. In this case the latitude ist undetermined
      // and worthless ==> null is returned,therefore only the N and S cases are
      //here
      (hemisphere.toUpperCase() == 'N') &&
        (deg = parseInt(degStr, 10) + parsedMin);

      (hemisphere.toUpperCase() == 'S') &&
        (deg = -(parseInt(degStr, 10) + parsedMin));
    }
  }
  return deg;;
}

export function parseVariation(value: string, hemisphere: string):
  number | null {

  let deg: number = null;

  //value comes usually in the following format DD.dddd
  if (value && hemisphere && (hemisphere.toUpperCase() == 'E' ||
    hemisphere.toUpperCase() == 'W')) {

    let multiplier = (hemisphere.toUpperCase() == 'E') ? (1) : (-1);

    deg = parseFloat(value);

    if (!isNaN(deg)) deg = deg * multiplier;

  }
  return deg;
}


export function parseLongitude(value: string, hemisphere: string):
  number | null {
  //empty return value; return value is an object with string-keys
  // and values of every type
  let deg: number = null;

  //value comes usually in the following format DDMM.mmmmm
  if (value && hemisphere) {
    let degStr = value.substr(0, 3);
    let minStr = value.replace(degStr, '');

    if (!isNaN(parseInt(degStr, 10))) {
      let parsedMin = isNaN(parseFloat(minStr)) ? 0 : parseFloat(minStr) / 60;
      //if hemispehre is no valid arg, the parser doesn't know whether it's E
      //or W.  In this case the latitude ist undetermined
      // and worthless ==> null is returned,therefore only the E and W cases
      //are here
      (hemisphere.toUpperCase() == 'E') &&
        (deg = parseInt(degStr, 10) + parsedMin);

      (hemisphere.toUpperCase() == 'W') &&
        (deg = -(parseInt(degStr, 10) + parsedMin));
    }
  }
  return deg;
}

export function parseCommon(value: string, howToParse: string = ''):
  string | number | null {

  let result: string | number = value;

  if (value == null) {
    result = value;
  } else {
    if (howToParse == 'parseToInt') result = parseInt(value, 10);
    if (howToParse == 'parseToFloat') result = parseFloat(value);
  }
  return result;
}


export function parseFixQuali(value: string): null | number {
  //TODO: function should have the option to return a translation
  // of the numerical output as string - not yet implemented but
  //switch is prepared for it
  let result = parseInt(value, 10);

  switch (result) {
    case 1:
    case 2:
    case 4:
    case 5:
    case 6:
      break; //result remains as it is
    default:
      result = null;
  }

  return result;
}

export function parseValidationState(value: string): null | string {
  if (!value || !value.trim()) return null;

  value = value.trim().toUpperCase();
  if (value == 'A') {
    return 'valid';
  } else if (value == 'V') {
    return 'invalid';
  } else return null;
}

export function parseModeIndication(value: string): null | string {
  if (!value || !value.trim()) return null;

  value = value.trim().toUpperCase();

  let res: string = null;

  switch (value) {
    case 'A':
      res = 'A-autonomous mode';
      break;
    case 'D':
      res = 'D-differential mode,';
      break;
    case 'E':
      res = 'E-estimated (dead-reckoning) mode';
      break;
    case 'M':
      res = 'M-manual input mode';
      break;
    case 'S':
      res = 'S-simulated mode';
      break;
    case 'N':
      res = 'N-invalid';
      break;
  }
  return res;
}

export function parseSmode(value: string): null | string {
  if (!value || !value.trim()) return null;

  value = value.trim().toUpperCase();

  let res: string = null;

  switch (value) {
    case 'A':
      res = 'A-allowed to automatically switch 2D/3D mode';
      break;
    case 'M':
      res = 'M-manual - forced to operate in 2D or 3D mode';
      break;
  }
  return res;
}

export function parseFixStatus(value: string): null | string {
  if (!value || !value.trim()) return null;

  value = value.trim().toUpperCase();

  let res: string = null;

  switch (value) {
    case '1':
      res = '1-no fix';
      break;
    case '2':
      res = '2-2D fix';
      break;
    case '3':
      res = '3-3D fix';
      break;
  }
  return res;
}




export function parseAltitude(value: string, name: string, args: (number | string)[]): { [key: string]: any } {
  let obj: { [k: string]: any } = {};
  const result = parseInt(value, 10);

  obj[name] = isNaN(result) ? 0 : result;

  return obj;
}