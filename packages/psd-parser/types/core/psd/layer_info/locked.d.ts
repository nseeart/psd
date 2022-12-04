export default class Locked extends LayerInfo {
    static shouldParse(key: any): boolean;
    transparencyLocked: boolean;
    compositeLocked: boolean;
    positionLocked: boolean;
    allLocked: boolean;
    parse(): boolean;
}
import LayerInfo from "../layer_info";
