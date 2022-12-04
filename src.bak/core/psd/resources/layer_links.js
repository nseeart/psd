export default class LinkLayers {
    id = 1026;
    name = "LinkLayers";
    constructor(resource) {
        this.resource = resource;
        this.file = this.resource.file;
        this.linkArray = [];
    }

    parse() {
        const end = this.file.tell() + this.resource.length;
        while (end > this.file.tell()) {
            this.linkArray.push(this.file.readShort());
        }
        return this.linkArray.reverse();
    }
}
