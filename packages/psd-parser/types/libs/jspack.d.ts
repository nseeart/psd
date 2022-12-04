export default m;
declare namespace m {
    function _DeInt(a: any, p: any): number;
    function _EnInt(a: any, p: any, v: any): void;
    function _De754(a: any, p: any): number;
    function _En754(a: any, p: any, v: any): void;
    function _UnpackSeries(n: any, s: any, a: any, p: any): any[];
    function _PackSeries(n: any, s: any, a: any, p: any, v: any, i: any): void;
    function Unpack(fmt: any, a: any, p: any): any[] | undefined;
    function PackTo(fmt: any, a: any, p: any, values: any): any;
    function Pack(fmt: any, values: any): any;
    function CalcLength(fmt: any): number;
}
