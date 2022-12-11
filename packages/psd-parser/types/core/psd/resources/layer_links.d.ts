export default class LinkLayers {
    constructor(resource: any);
    id: number;
    name: string;
    resource: any;
    file: any;
    linkArray: any[];
    parse(): any[];
    export(): {
        data: any[];
        name: string;
        id: number;
    };
}
