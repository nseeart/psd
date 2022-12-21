export default class Guides {
    id = 1032;
    name = "guides";

    constructor(resource) {
        this.resource = resource;
        this.file = resource.file;
        this.data = [];
    }

    parse() {
        // Descriptor version
        this.file.seek(4, true);
        // Future implementation of document-specific grids
        this.file.seek(8, true);
        const num_guides = this.file.readInt();
        const results = [];
        const ref = num_guides;
        for (
            let i = 1, j = 1;
            1 <= ref ? j <= ref : j >= ref;
            i = 1 <= ref ? ++j : --j
        ) {
            const location = (this.file.readInt() / 32).toFixed(1);
            const direction = this.file.readByte() ? "horizontal" : "vertical";
            results.push(this.data.push({ location, direction }));
        }
        return results;
    }
    export() {
        return this.data;
    }
}
