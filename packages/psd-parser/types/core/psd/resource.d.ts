export default Resource;
declare class Resource {
    static Section: typeof ResourceSection;
    constructor(file: any);
    file: any;
    id: any;
    type: any;
    length: number;
    parse(): number;
    name: any;
}
import ResourceSection from "./resource_section";
