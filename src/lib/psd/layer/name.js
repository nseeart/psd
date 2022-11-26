import { pad4 } from "../util2";

export default {
    parseLegacyLayerName() {
        const len = pad4(this.file.readByte());
        return (this.legacyName = this.file.readString(len));
    },
};
