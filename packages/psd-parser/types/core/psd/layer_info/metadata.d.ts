export default class Metadata extends LayerInfo {
    static shouldParse(key: any): boolean;
    constructor(...args: any[]);
    parse(): any[];
    parseLayerComps(): {};
}
import LayerInfo from "../layer_info";
