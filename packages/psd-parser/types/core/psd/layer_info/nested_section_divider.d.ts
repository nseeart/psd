export default class NestedSectionDivider extends LayerInfo {
    static shouldParse(key: any): boolean;
    isFolder: boolean;
    isHidden: boolean;
    parse(): true | undefined;
}
import LayerInfo from "../layer_info";
