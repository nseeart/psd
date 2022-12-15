export default class VectorStrokeContent extends LayerInfo {
    static shouldParse(key: any): boolean;
    constructor(...args: any[]);
    r: number;
    g: number;
    b: number;
    dataKey: any;
    version: any;
    parse(): number;
    colorData(): any;
    color(): number[];
}
import LayerInfo from "../layer_info";
