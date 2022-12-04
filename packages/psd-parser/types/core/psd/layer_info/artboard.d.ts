export default class Artboard extends LayerInfo {
    static shouldParse(key: any): boolean;
    constructor(...args: any[]);
    export(): {
        coords: {
            left: any;
            top: any;
            right: any;
            bottom: any;
        };
    };
}
import LayerInfo from "../layer_info";
