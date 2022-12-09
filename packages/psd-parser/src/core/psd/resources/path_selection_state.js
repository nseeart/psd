import Descriptor from "../descriptor";

export default class PathSelectionState {
    id = 1088;
    name = "PathSelectionState";
    constructor(resource) {
        this.resource = resource;
        this.file = this.resource.file;
    }

    parse() {
        this.file.seek(4, true);
        return (this.data = new Descriptor(this.file).parse());
    }

    export() {
        return {
            id: this.id,
            name: this.name,
            data: this.data.list,
        };
    }
}
