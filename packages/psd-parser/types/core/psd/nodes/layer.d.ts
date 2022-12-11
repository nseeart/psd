export default class Layer extends Node {
    constructor(...args: any[]);
    isEmpty(): boolean;
    isVector(): boolean;
    getIsVectorRect(layerInfo: any): any;
    export(): any;
}
import Node from "../node";
