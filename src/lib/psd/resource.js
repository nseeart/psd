import { pad2 } from "./util2";
import ResourceSection from "./resource_section";

class Resource {
    constructor(file) {
        this.file = file;
        this.id = null;
        this.type = null;
        this.length = 0;
    }
    parse() {
        this.type = this.file.readString(4);
        this.id = this.file.readShort();
        const nameLength = pad2(this.file.readByte() + 1) - 1;
        this.name = this.file.readString(nameLength);
        const length = pad2(this.file.readInt());
        return (this.length = length);
    }
    static Section = ResourceSection;
}

export default Resource;
