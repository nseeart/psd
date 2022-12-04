export default class Descriptor {
    constructor(file: any);
    file: any;
    data: {};
    parse(): {};
    parseClass(): {
        name: any;
        id: any;
    };
    parseId(): any;
    parseKeyItem(): any[];
    parseItem(type: any): any;
    parseBoolean(): any;
    parseDouble(): any;
    parseInteger(): any;
    parseLargeInteger(): any;
    parseIdentifier(): any;
    parseIndex(): any;
    parseOffset(): any;
    parseProperty(): {
        class: {
            name: any;
            id: any;
        };
        id: any;
    };
    parseEnum(): {
        type: any;
        value: any;
    };
    parseEnumReference(): {
        class: {
            name: any;
            id: any;
        };
        type: any;
        value: any;
    };
    parseAlias(): any;
    parseFilePath(): {
        sig: any;
        path: any;
    };
    parseList(): any;
    parseObjectArray(): void;
    parseRawData(): any;
    parseReference(): {
        type: any;
        value: any;
    }[];
    parseUnitDouble(): {
        id: any;
        unit: string | undefined;
        value: any;
    };
    parseUnitFloat(): {
        id: any;
        unit: string | undefined;
        value: any;
    };
}
