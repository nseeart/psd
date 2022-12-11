export default {
    parsePositionAndChannels() {
        // 包含图层内容的矩形。指定为上、左、下、右坐标
        // 修复矩形偏移1px问题
        this.top = this.file.readInt();
        this.left = this.file.readInt();
        this.bottom = this.file.readInt();
        this.right = this.file.readInt();
        // 图层中的通道数
        this.channels = this.file.readShort();
        this.rows = this.height = this.bottom - this.top;
        this.cols = this.width = this.right - this.left;
        const _results = [];
        const _ref = this.channels;
        console.log("top", this.top);
        console.log("left", this.left);
        console.log("bottom", this.bottom);
        console.log("right", this.right);
        console.log("height", this.height);
        console.log("width", this.width);
        console.log("_vectorMask==========", this);

        let i, _i;
        for (
            i = _i = 0;
            0 <= _ref ? _i < _ref : _i > _ref;
            i = 0 <= _ref ? ++_i : --_i
        ) {
            const id = this.file.readShort();
            const length = this.file.readInt();
            _results.push(
                this.channelsInfo.push({
                    id,
                    length,
                })
            );
        }
        return _results;
    },
};
