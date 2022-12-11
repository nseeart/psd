import LayerInfo from "../layer_info";
import PathRecord from "../path_record";

export default class VectorMask extends LayerInfo {
    static shouldParse(key) {
        return key === "vmsk" || key === "vsms";
    }

    constructor(layer, length) {
        super(layer, length);
        this.invert = null;
        this.notLink = null;
        this.disable = null;
        this.paths = [];
    }

    parse() {
        this.file.seek(4, true);
        const tag = this.file.readInt();
        this.invert = (tag & 0x01) > 0;
        this.notLink = (tag & (0x01 << 1)) > 0;
        this.disable = (tag & (0x01 << 2)) > 0;
        const numRecords = (this.length - 10) / 26;
        const _results = [];
        let i, _i;
        for (
            i = _i = 0;
            0 <= numRecords ? _i < numRecords : _i > numRecords;
            i = 0 <= numRecords ? ++_i : --_i
        ) {
            const record = new PathRecord(this.file);
            record.parse();
            _results.push(this.paths.push(record));
        }
        return _results;
    }

    export() {
        return {
            invert: this.invert,
            notLink: this.notLink,
            disable: this.disable,
            paths: this.paths.map(function (p) {
                return p["export"]();
            }),
        };
    }
}
