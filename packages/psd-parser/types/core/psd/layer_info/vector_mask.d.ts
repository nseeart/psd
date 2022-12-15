export default class VectorMask extends LayerInfo {
    static shouldParse(key: any): boolean;
    proxyProperies: string[];
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
