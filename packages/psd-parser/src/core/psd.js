import File from "./psd/file";
import LayerMask from "./psd/layer_mask";
import ImageBase from "./psd/image";
import Root from "./psd/nodes/root";
import LazyExecute from "./psd/lazy_execute";
import Header from "./psd/header";
import ColorModeData from "./psd/color_mode_data";
import Resources from "./psd/resources";
import RSVP from "rsvp";
// import { readFile } from "fs";

/**
 * https://www.adobe.com/devnet-apps/photoshop/fileformatashtml/
 */
export default class PSD {
    constructor(data) {
        this.file = new File(data);
        this.parsed = false;
        this.header = null;
        this.colorModeData = null;
        RSVP.on("error", (reason) => {
            return console.error(reason);
        });
    }

    get layers() {
        return this.layerMask.layers;
    }

    parse() {
        if (this.parsed) {
            return;
        }
        this.parseHeader();
        this.parseColorModeData();
        this.parseImageResources();
        this.parseLayerMask();
        this.parseImageData();
        return (this.parsed = true);
    }

    // 文件头部分
    parseHeader() {
        this.header = new Header(this.file);
        return this.header.parse();
    }

    // 颜色模式数据部分
    parseColorModeData() {
        this.colorModeData = new ColorModeData(this.file);
        return this.colorModeData.parse();
    }

    // 图像资源部分
    parseImageResources() {
        const resources = new Resources(this.file);
        console.log("resources====", resources);
        this.resources = new LazyExecute(resources, this.file);
        return this.resources.now("skip").later("parse").get();
    }

    // 图层和蒙版信息部分
    parseLayerMask() {
        const layerMask = new LayerMask(this.file, this.header);
        this.layerMask = new LazyExecute(layerMask, this.file);
        return this.layerMask.now("skip").later("parse").get();
    }

    // 图像数据部分
    parseImageData() {
        const image = new ImageBase(this.file, this.header);
        this.image = new LazyExecute(image, this.file);
        return this.image.later("parse").ignore("width", "height").get();
    }
    tree() {
        return new PSD.Node.Root(this);
    }

    static Node = {
        Root,
    };

    static fromURL(url) {
        return new RSVP.Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.responseType = "arraybuffer";
            xhr.onload = () => {
                const data = new Uint8Array(
                    xhr.response || xhr.mozResponseArrayBuffer
                );
                const psd = new PSD(data);
                psd.parse();
                return resolve(psd);
            };
            xhr.onerror = reject;
            return xhr.send(null);
        });
    }

    static fromEvent(e) {
        return new RSVP.Promise((resolve, reject) => {
            const file = e.dataTransfer.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                const psd = new PSD(new Uint8Array(e.target.result));
                psd.parse();
                return resolve(psd);
            };
            reader.onerror = reject;
            return reader.readAsArrayBuffer(file);
        });
    }

    static fromDroppedFile(file) {
        return new RSVP.Promise(function (resolve, reject) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const psd = new PSD(new Uint8Array(e.target.result));
                psd.parse();
                return resolve(psd);
            };
            reader.onerror = reject;
            return reader.readAsArrayBuffer(file);
        });
    }

    // node
    static fromFile(file) {
        if (process) {
            return new PSD(require("fs").readFileSync(file));
        }
    }

    static open(file) {
        if (process) {
            return new RSVP.Promise((resolve, reject) => {
                require("fs").readFile(file, (err, data) => {
                    if (err) {
                        return reject(err);
                    }
                    const psd = new PSD(data);
                    psd.parse();
                    resolve(psd);
                });
            });
        }
    }
}
