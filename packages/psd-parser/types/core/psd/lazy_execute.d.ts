export default LazyExecute;
declare class LazyExecute {
    constructor(obj: any, file: any);
    obj: any;
    file: any;
    startPos: any;
    loaded: boolean;
    loadMethod: any;
    loadArgs: any[];
    passthru: any[];
    now(method: any, ...args: any[]): LazyExecute;
    later(method: any, ...args: any[]): LazyExecute;
    ignore(...args: any[]): LazyExecute;
    get(): LazyExecute;
    load(): boolean;
}
