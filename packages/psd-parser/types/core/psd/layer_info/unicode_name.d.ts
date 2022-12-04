export default UnicodeName;
declare class UnicodeName extends LayerInfo {
    static shouldParse(key: any): boolean;
    constructor(...args: any[]);
    parse(): UnicodeName;
}
import LayerInfo from "../layer_info";
