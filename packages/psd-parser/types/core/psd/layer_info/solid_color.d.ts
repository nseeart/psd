export default class SolidColor extends LayerInfo {
    static shouldParse(key: any): boolean;
    r: number;
    g: number;
    b: number;
    parse(): number;
    colorData(): any;
    color(): number[];
}
import LayerInfo from "../layer_info";
