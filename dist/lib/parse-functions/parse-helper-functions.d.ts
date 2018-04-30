export declare function parseTime(value: string): string | null;
export declare function parseLatitude(value: string, hemisphere: string): number | null;
export declare function parseVariation(value: string, hemisphere: string): number | null;
export declare function parseLongitude(value: string, hemisphere: string): number | null;
export declare function parseCommon(value: string, howToParse?: string): string | number | null;
export declare function parseFixQuali(value: string): null | number;
export declare function parseValidationState(value: string): null | string;
export declare function parseModeIndication(value: string): null | string;
export declare function parseSmode(value: string): null | string;
export declare function parseFixStatus(value: string): null | string;
export declare function parseAltitude(value: string, name: string, args: (number | string)[]): {
    [key: string]: any;
};
