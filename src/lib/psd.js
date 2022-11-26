import File from "./psd/file";
import LayerMask from "./psd/layer_mask";
import ImageBase from "./psd/image";
import Root from "./psd/nodes/root";
import LazyExecute from "./psd/lazy_execute";
import Header from "./psd/header";
import Resources from "./psd/resources";
import RSVP from "rsvp";

export default class PSD {
    constructor(data) {
        this.file = new File(data);
        this.parsed = false;
        this.header = null;
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
        this.parseResources();
        this.parseLayerMask();
        this.parseImage();
        return (this.parsed = true);
    }

    parseHeader() {
        this.header = new Header(this.file);
        return this.header.parse();
    }

    parseResources() {
        const resources = new Resources(this.file);
        this.resources = new LazyExecute(resources, this.file);
        return this.resources.now("skip").later("parse").get();
    }

    parseLayerMask() {
        const layerMask = new LayerMask(this.file, this.header);
        this.layerMask = new LazyExecute(layerMask, this.file);
        return this.layerMask.now("skip").later("parse").get();
    }

    parseImage() {
        const image = new ImageBase(this.file, this.header);
        this.image = new LazyExecute(image, this.file);
        console.log(" this.image", this.image);
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
}
