export default class Mask {
    constructor(file: any);
    file: any;
    top: number;
    right: number;
    bottom: number;
    left: number;
    parse(): Mask;
    size: any;
    width: number | undefined;
    height: number | undefined;
    relative: boolean | undefined;
    disabled: boolean | undefined;
    invert: boolean | undefined;
    defaultColor: any;
    /**
     * 位 0 = 相对于图层的位置
     * 位 1 = 图层蒙版禁用
     * 位 2 = 混合时反转图层蒙版（已过时）
     * 位 2 = 矢量掩码密度，1 字节
     * 位 3 = 矢量掩码羽化，8 字节，双精度
     */
    flags: any;
    export(): {
        top?: undefined;
        left?: undefined;
        bottom?: undefined;
        right?: undefined;
        width?: undefined;
        height?: undefined;
        defaultColor?: undefined;
        relative?: undefined;
        disabled?: undefined;
        invert?: undefined;
    } | {
        top: number;
        left: number;
        bottom: number;
        right: number;
        width: number | undefined;
        height: number | undefined;
        defaultColor: any;
        relative: boolean | undefined;
        disabled: boolean | undefined;
        invert: boolean | undefined;
    };
}
