import { includes } from "./util";
import positionChannels from "./layer/position_channels";
import blendModes from "./layer/blend_modes";
import info from "./layer/info";
import mask from "./layer/mask";
import blendingRanges from "./layer/blending_ranges";
import helpers from "./layer/helpers";
import name from "./layer/name";
import channelImage from "./layer/channel_image";
import Module from "./module";

class Layer extends Module {
    constructor(file, header) {
        super();
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
        // 额外数据字段的长度（=接下来五个字段的总长度）。
        const extraLen = this.file.readInt();
        this.layerEnd = this.file.tell() + extraLen;
        // 图层蒙版数据：请参阅图层蒙版/调整图层数据以了解结构。可以是 40 字节、24 字节或 4 字节（如果没有层掩码）。
        this.parseMaskData();
        // 图层混合范围：请参阅图层混合范围数据。
        this.parseBlendingRanges();
        // 图层名称：Pascal 字符串，填充为 4 字节的倍数。
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

Layer.includes(positionChannels);
Layer.includes(blendModes);
Layer.includes(info);
Layer.includes(mask);
Layer.includes(blendingRanges);
Layer.includes(helpers);
Layer.includes(name);
Layer.includes(channelImage);

export default Layer;
