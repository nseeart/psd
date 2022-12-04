export default class NestedSectionDivider extends LayerInfo {
    static shouldParse(key: any): boolean;
    isFolder: boolean;
    isHidden: boolean;
    layerType: string | null;
    blendMode: any;
    subType: string | null;
    parse(): "normal" | "scene group" | undefined;
}
import LayerInfo from "../layer_info";
