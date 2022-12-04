import LayerInfo from "../layer_info";
import Descriptor from "../descriptor";

export default class Metadata extends LayerInfo {
    constructor() {
        return super(...arguments);
    }

    static shouldParse(key) {
        return key === "shmd";
    }

    parse() {
        var copyOnSheetDup, count, end, i, key, len, _i, _results;
        count = this.file.readInt();
        _results = [];
        for (
            i = _i = 0;
            0 <= count ? _i < count : _i > count;
            i = 0 <= count ? ++_i : --_i
        ) {
            this.file.seek(4, true);
            key = this.file.readString(4);
            copyOnSheetDup = this.file.readByte();
            this.file.seek(3, true);
            len = this.file.readInt();
            end = this.file.tell() + len;
            if (key === "cmls") {
                this.parseLayerComps();
            }
            _results.push(this.file.seek(end));
        }
        return _results;
    }

    parseLayerComps() {
        this.file.seek(4, true);
        return (this.data.layerComp = new Descriptor(this.file).parse());
    }
}
