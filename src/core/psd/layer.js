import { includes } from "./module";
import positionChannels from "./layer/position_channels";
import blendModes from "./layer/blend_modes";
import info from "./layer/info";
import mask from "./layer/mask";
import blendingRanges from "./layer/blending_ranges";
import helpers from "./layer/helpers";
import name from "./layer/name";
import channelImage from "./layer/channel_image";

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
        console.log("  this.mask", this.mask);
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
        const extraLen = this.file.readInt();
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
}

includes(Layer, positionChannels);
includes(Layer, blendModes);
includes(Layer, info);
includes(Layer, mask);
includes(Layer, blendingRanges);
includes(Layer, helpers);
includes(Layer, name);
includes(Layer, channelImage);

export default Layer;
