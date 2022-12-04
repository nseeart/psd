export default class VectorMask extends LayerInfo {
    static shouldParse(key: any): boolean;
    invert: boolean | null;
    notLink: boolean | null;
    disable: boolean | null;
    paths: any[];
    parse(): number[];
    export(): {
        invert: boolean | null;
        notLink: boolean | null;
        disable: boolean | null;
        paths: any[];
    };
}
import LayerInfo from "../layer_info";
