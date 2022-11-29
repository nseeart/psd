import { pad4 } from "../util2";

export default {
    parseLegacyLayerName() {
        const len = pad4(this.file.readByte());
        this.legacyName = this.file.readString(len);
        return this.legacyName;
        // return (this.legacyName = this.file.readString(len));
    },
};
