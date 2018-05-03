import { ISimpleObject } from './interfaces';

export function isNoOrEmptyObj(obj?: ISimpleObject) {

  if (!obj) return true;

  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}


export function stringifyDecision(
  stringifyResults: boolean,
  errorMsg?: string | null,
  qualifiedErrMsg: boolean = true,
  obj?: ISimpleObject) {
 
  if (errorMsg) {
    if (qualifiedErrMsg) {
      
      let res_obj = { msgType: 'error', message: errorMsg };

      return stringifyResults ? JSON.stringify(res_obj) : res_obj;

    } else {

      return null;
    }
  }

if (isNoOrEmptyObj(obj)) return null;

return stringifyResults ? JSON.stringify(obj) : obj;

}