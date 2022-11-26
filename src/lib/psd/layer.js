import { LAYER_INFO } from "./layer/info";
import ChannelImage from "./channel_image";
import LazyExecute from "./lazy_execute";
import { pad2, pad4 } from "./util2";
import BlendMode from "./blend_mode";
import Mask from "./mask";

class Layer {
    constructor(file, header) {
        this.file = file;
        this.header = header;
        this.mask = {};
        this.blendingRanges = {};
        this.adjustments = {};
        this.channelsInfo = [];
        this.blendMode = {};
        this.groupLayer = null;
        this.infoKeys = [];
    }

    get name() {
        if (this.adjustments["name"] != null) {
            return this.adjustments["name"].data;
        } else {
            return this.legacyName;
        }
    }

    parse() {
        this.parsePositionAndChannels();
        this.parseBlendModes();
        var extraLen = this.file.readInt();
        this.layerEnd = this.file.tell() + extraLen;
        this.parseMaskData();
        this.parseBlendingRanges();
        this.parseLegacyLayerName();
        this.parseLayerInfo();
        this.file.seek(this.layerEnd);
        return this;
    }

    export() {
        return {
            name: this.name,
            top: this.top,
            right: this.right,
            bottom: this.bottom,
            left: this.left,
            width: this.width,
            height: this.height,
            opacity: this.opacity,
            visible: this.visible,
            clipped: this.clipped,
            mask: this.mask.export(),
        };
    }

    // "./layer/position_channels"
    parsePositionAndChannels() {
        var i, id, length, _i, _ref, _results;
        this.top = this.file.readInt();
        this.left = this.file.readInt();
        this.bottom = this.file.readInt();
        this.right = this.file.readInt();
        this.channels = this.file.readShort();
        this.rows = this.height = this.bottom - this.top;
        this.cols = this.width = this.right - this.left;
        _results = [];
        for (
            i = _i = 0, _ref = this.channels;
            0 <= _ref ? _i < _ref : _i > _ref;
            i = 0 <= _ref ? ++_i : --_i
        ) {
            id = this.file.readShort();
            length = this.file.readInt();
            _results.push(
                this.channelsInfo.push({
                    id: id,
                    length: length,
                })
            );
        }
        return _results;
    }
    //  "./layer/blend_modes"
    parseBlendModes() {
        this.blendMode = new BlendMode(this.file);
        this.blendMode.parse();
        this.opacity = this.blendMode.opacity;
        this.visible = this.blendMode.visible;
        return (this.clipped = this.blendMode.clipped);
    }
    hidden() {
        return !this.visible;
    }
    blendingMode() {
        return this.blendMode.mode;
    }

    // "./layer/info"
    parseLayerInfo() {
        var i, key, keyParseable, klass, length, name, pos, _results;
        _results = [];
        while (this.file.tell() < this.layerEnd) {
            this.file.seek(4, true);
            key = this.file.readString(4);
            length = pad2(this.file.readInt());
            pos = this.file.tell();
            keyParseable = false;
            for (name in LAYER_INFO) {
                if (!Object.hasOwnProperty.call(LAYER_INFO, name)) continue;
                klass = LAYER_INFO[name];
                if (!klass.shouldParse(key)) {
                    continue;
                }
                i = new klass(this, length);
                this.adjustments[name] = new LazyExecute(i, this.file)
                    .now("skip")
                    .later("parse")
                    .get();
                if (this[name] == null) {
                    (function (_this) {
                        return function (name) {
                            return (_this[name] = function () {
                                return _this.adjustments[name];
                            });
                        };
                    })(this)(name);
                }
                this.infoKeys.push(key);
                keyParseable = true;
                break;
            }
            if (!keyParseable) {
                _results.push(this.file.seek(length, true));
            } else {
                _results.push(void 0);
            }
        }
        return _results;
    }
    // "./layer/mask"
    parseMaskData() {
        return (this.mask = new Mask(this.file).parse());
    }

    // "./layer/blending_ranges"
    parseBlendingRanges() {
        var i, length, numChannels, _i, _results;
        length = this.file.readInt();
        this.blendingRanges.grey = {
            source: {
                black: [this.file.readByte(), this.file.readByte()],
                white: [this.file.readByte(), this.file.readByte()],
            },
            dest: {
                black: [this.file.readByte(), this.file.readByte()],
                white: [this.file.readByte(), this.file.readByte()],
            },
        };
        numChannels = (length - 8) / 8;
        this.blendingRanges.channels = [];
        _results = [];
        for (
            i = _i = 0;
            0 <= numChannels ? _i < numChannels : _i > numChannels;
            i = 0 <= numChannels ? ++_i : --_i
        ) {
            _results.push(
                this.blendingRanges.channels.push({
                    source: {
                        black: [this.file.readByte(), this.file.readByte()],
                        white: [this.file.readByte(), this.file.readByte()],
                    },
                    dest: {
                        black: [this.file.readByte(), this.file.readByte()],
                        white: [this.file.readByte(), this.file.readByte()],
                    },
                })
            );
        }
        return _results;
    }

    //  "./layer/helpers"
    isFolder() {
        if (this.adjustments["sectionDivider"] != null) {
            return this.adjustments["sectionDivider"].isFolder;
        } else if (this.adjustments["nestedSectionDivider"] != null) {
            return this.adjustments["nestedSectionDivider"].isFolder;
        } else {
            return this.name === "<Layer group>";
        }
    }

    // "./layer/name"
    parseLegacyLayerName() {
        const len = pad4(this.file.readByte());
        return (this.legacyName = this.file.readString(len));
    }

    isFolderEnd() {
        if (this.adjustments["sectionDivider"] != null) {
            return this.adjustments["sectionDivider"].isHidden;
        } else if (this.adjustments["nestedSectionDivider"] != null) {
            return this.adjustments["nestedSectionDivider"].isHidden;
        } else {
            return this.name === "</Layer group>";
        }
    }
    //  ./layer/channel_image
    parseChannelImage() {
        const image = new ChannelImage(this.file, this.header, this);
        return (this.image = new LazyExecute(image, this.file)
            .now("skip")
            .later("parse")
            .get());
    }
}

export default Layer;
