import { ISimpleObject } from './interfaces';
export declare function isNoOrEmptyObj(obj?: ISimpleObject): boolean;
export declare function stringifyDecision(stringifyResults: boolean, errorMsg?: string | null, qualifiedErrMsg?: boolean, obj?: ISimpleObject): string | ISimpleObject;
