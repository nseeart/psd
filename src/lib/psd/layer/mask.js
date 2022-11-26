import Mask from "../mask";

export default {
    parseMaskData() {
        return (this.mask = new Mask(this.file).parse());
    },
};
