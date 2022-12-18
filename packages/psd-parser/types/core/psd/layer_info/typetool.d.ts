export default class TextElements extends LayerInfo {
    static shouldParse(key: any): boolean;
    version: any;
    transform: {};
    textVersion: any;
    descriptorVersion: any;
    textData: {} | null;
    engineData: any;
    textValue: any;
    warpVersion: any;
    warpData: {} | null;
    coords: {};
    parse(): any[];
    getFont(): {
        style: any;
        weight: any;
        family: any;
        size: any;
        color: any;
        textAlign: any;
        textDecoration: any;
        lineHeight: any;
    };
    export(): {
        value: any;
        font: {
            lengthArray: any;
            styles: any;
            weights: any;
            names: any;
            sizes: any;
            colors: any;
            alignment: any;
            textDecoration: any;
            leading: any;
        };
        cssFont: {
            style: any;
            weight: any;
            family: any;
            size: any;
            color: any;
            textAlign: any;
            textDecoration: any;
            lineHeight: any;
        };
        left: any;
        top: any;
        right: any;
        bottom: any;
        transform: {};
    };
    lengthArray(): any;
    fontStyles(): any;
    fontWeights(): any;
    fonts(): any;
    textDecoration(): any;
    leading(): any;
    sizes(): any;
    alignment(): any;
    colors(): any;
    styles(): any;
    _styles: any;
    parseTransformInfo(): any[];
}
import LayerInfo from "../layer_info";
