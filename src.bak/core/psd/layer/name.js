import { pad4 } from "../util";

export default {
    parseLegacyLayerName() {
        const len = pad4(this.file.readByte());
        this.legacyName = this.file.readString(len);
        return this.legacyName;
    },
};
