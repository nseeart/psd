import LayerInfo from "../layer_info";
import Descriptor from "../descriptor";
import parseEngineData from "../../../libs/parse-engine-data";

const TRANSFORM_VALUE = ["xx", "xy", "yx", "yy", "tx", "ty"];
const COORDS_VALUE = ["left", "top", "right", "bottom"];

export default class TextElements extends LayerInfo {
    static shouldParse(key) {
        return key === "TySh";
    }

    constructor(layer, length) {
        super(layer, length);
        this.version = null;
        this.transform = {};
        this.textVersion = null;
        this.descriptorVersion = null;
        this.textData = null;
        this.engineData = null;
        this.textValue = null;
        this.warpVersion = null;
        this.descriptorVersion = null;
        this.warpData = null;
        this.coords = {};
    }

    parse() {
        this.version = this.file.readShort();
        this.parseTransformInfo();
        this.textVersion = this.file.readShort();
        this.descriptorVersion = this.file.readInt();
        this.textData = new Descriptor(this.file).parse();
        this.textValue = this.textData["Txt "];
        this.engineData = parseEngineData(this.textData.EngineData);
        this.warpVersion = this.file.readShort();
        this.descriptorVersion = this.file.readInt();
        this.warpData = new Descriptor(this.file).parse();
        const _results = [];
        let index, _i, _len;
        for (
            index = _i = 0, _len = COORDS_VALUE.length;
            _i < _len;
            index = ++_i
        ) {
            const name = COORDS_VALUE[index];
            _results.push((this.coords[name] = this.file.readInt()));
        }
        return _results;
    }

    export() {
        return {
            value: this.textValue,
            font: {
                lengthArray: this.lengthArray(),
                styles: this.fontStyles(),
                weights: this.fontWeights(),
                names: this.fonts(),
                sizes: this.sizes(),
                colors: this.colors(),
                alignment: this.alignment(),
                textDecoration: this.textDecoration(),
                leading: this.leading(),
            },
            left: this.coords.left,
            top: this.coords.top,
            right: this.coords.right,
            bottom: this.coords.bottom,
            transform: this.transform,
        };
    }

    lengthArray() {
        const arr = this.engineData.EngineDict.StyleRun.RunLengthArray;
        const sum = arr.reduce((m, o) => {
            return m + o;
        });
        if (sum - this.textValue.length === 1) {
            arr[arr.length - 1] = arr[arr.length - 1] - 1;
        }
        return arr;
    }

    fontStyles() {
        const data = this.engineData.EngineDict.StyleRun.RunArray.map((r) => {
            return r.StyleSheet.StyleSheetData;
        });
        return data.map((f) => {
            let style;
            if (f.FauxItalic) {
                style = "italic";
            } else {
                style = "normal";
            }
            return style;
        });
    }

    fontWeights() {
        const data = this.engineData.EngineDict.StyleRun.RunArray.map((r) => {
            return r.StyleSheet.StyleSheetData;
        });
        return data.map((f) => {
            let weight;
            if (f.FauxBold) {
                weight = "bold";
            } else {
                weight = "normal";
            }
            return weight;
        });
    }

    fonts() {
        if (this.engineData == null) {
            return [];
        }
        return this.engineData.ResourceDict.FontSet.map((f) => {
            return f.Name;
        });
    }

    textDecoration() {
        const data = this.engineData.EngineDict.StyleRun.RunArray.map((r) => {
            return r.StyleSheet.StyleSheetData;
        });
        return data.map((f) => {
            let decoration;
            if (f.Underline) {
                decoration = "underline";
            } else {
                decoration = "none";
            }
            return decoration;
        });
    }

    leading() {
        const data = this.engineData.EngineDict.StyleRun.RunArray.map((r) => {
            return r.StyleSheet.StyleSheetData;
        });
        return data.map((f) => {
            let leading;
            if (f.Leading) {
                leading = f.Leading;
            } else {
                leading = "auto";
            }
            return leading;
        });
    }

    sizes() {
        if (this.engineData == null && this.styles().FontSize == null) {
            return [];
        }
        return this.styles().FontSize;
    }

    alignment() {
        if (this.engineData == null) {
            return [];
        }
        const alignments = ["left", "right", "center", "justify"];
        return this.engineData.EngineDict.ParagraphRun.RunArray.map((s) => {
            return alignments[
                Math.min(
                    parseInt(s.ParagraphSheet.Properties.Justification, 10),
                    3
                )
            ];
        });
    }

    colors() {
        if (this.engineData == null || this.styles().FillColor == null) {
            return [[0, 0, 0, 255]];
        }
        return this.styles().FillColor.map((s) => {
            const values = s.Values.map(function (v) {
                return Math.round(v * 255);
            });
            values.push(values.shift());
            return values;
        });
    }

    styles() {
        if (this.engineData == null) {
            return {};
        }
        if (this._styles != null) {
            return this._styles;
        }
        const data = this.engineData.EngineDict.StyleRun.RunArray.map((r) => {
            return r.StyleSheet.StyleSheetData;
        });
        return (this._styles = data.reduce((m, o) => {
            for (let k in o) {
                if (!o.hasOwnProperty(k)) continue;
                const v = o[k];
                m[k] || (m[k] = []);
                m[k].push(v);
            }
            return m;
        }, {}));
    }

    parseTransformInfo() {
        const _results = [];
        const _len = TRANSFORM_VALUE.length;
        for (let _i = 0; _i < _len; ++_i) {
            const name = TRANSFORM_VALUE[_i];
            _results.push((this.transform[name] = this.file.readDouble()));
        }
        return _results;
    }
}