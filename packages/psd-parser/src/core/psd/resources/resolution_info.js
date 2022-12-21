export default class ResolutionInfo {
    id = 1005;
    name = "resolutionInfo";

    constructor(resource) {
        this.resource = resource;
        this.file = resource.file;
    }

    parse() {
        // 32-bit fixed-point number (16.16)
        this.h_res = this.file.readUInt() / 65536;
        this.h_res_unit = this.file.readUShort();
        this.width_unit = this.file.readUShort();

        //  32-bit fixed-point number (16.16)
        this.v_res = this.file.readUInt() / 65536;
        this.v_res_unit = this.file.readUShort();
        this.height_unit = this.file.readUShort();

        this.resource.data = this;
    }

    export() {
        const properies = [
            "h_res",
            "h_res_unit",
            "width_unit",
            "v_res",
            "v_res_unit",
            "height_unit",
        ];
        const data = {};
        properies.forEach((key) => {
            data[key] = this[key];
        });
        return data;
    }
}
