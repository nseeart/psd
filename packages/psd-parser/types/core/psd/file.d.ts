export default File;
declare class File {
    constructor(data: any);
    pos: number;
    data: any;
    tell(): number;
    read(length: any): any[];
    readf(format: any, len: any): any[] | undefined;
    seek(amt: any, rel: any): any;
    readString(length: any): string;
    readUnicodeString(length: any): string;
    readByte(): any;
    readBoolean(): boolean;
    readSpaceColor(): {
        colorSpace: any;
        components: number | undefined;
    };
    readPathNumber(): number;
}
