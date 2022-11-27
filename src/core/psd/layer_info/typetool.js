import LayerInfo from "../layer_info";
import Descriptor from "../descriptor";

const _ = require("lodash");
const parseEngineData = require("parse-engine-data");
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
        var index, _i, _len;
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

    parseTransformInfo() {
        var index, name, _i, _len, _results;
        _results = [];
        for (
            index = _i = 0, _len = TRANSFORM_VALUE.length;
            _i < _len;
            index = ++_i
        ) {
            name = TRANSFORM_VALUE[index];
            _results.push((this.transform[name] = this.file.readDouble()));
        }
        return _results;
    }

    fonts() {
        if (this.engineData == null) {
            return [];
        }
        return this.engineData.ResourceDict.FontSet.map(function (f) {
            return f.Name;
        });
    }

    lengthArray() {
        var arr, sum;
        arr = this.engineData.EngineDict.StyleRun.RunLengthArray;
        sum = _.reduce(arr, function (m, o) {
            return m + o;
        });
        if (sum - this.textValue.length === 1) {
            arr[arr.length - 1] = arr[arr.length - 1] - 1;
        }
        return arr;
    }

    fontStyles() {
        var data;
        data = this.engineData.EngineDict.StyleRun.RunArray.map(function (r) {
            return r.StyleSheet.StyleSheetData;
        });
        return data.map(function (f) {
            var style;
            if (f.FauxItalic) {
                style = "italic";
            } else {
                style = "normal";
            }
            return style;
        });
    }

    fontWeights() {
        var data;
        data = this.engineData.EngineDict.StyleRun.RunArray.map(function (r) {
            return r.StyleSheet.StyleSheetData;
        });
        return data.map(function (f) {
            var weight;
            if (f.FauxBold) {
                weight = "bold";
            } else {
                weight = "normal";
            }
            return weight;
        });
    }

    textDecoration() {
        var data;
        data = this.engineData.EngineDict.StyleRun.RunArray.map(function (r) {
            return r.StyleSheet.StyleSheetData;
        });
        return data.map(function (f) {
            var decoration;
            if (f.Underline) {
                decoration = "underline";
            } else {
                decoration = "none";
            }
            return decoration;
        });
    }

    leading() {
        var data;
        data = this.engineData.EngineDict.StyleRun.RunArray.map(function (r) {
            return r.StyleSheet.StyleSheetData;
        });
        return data.map(function (f) {
            var leading;
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
        var alignments;
        if (this.engineData == null) {
            return [];
        }
        alignments = ["left", "right", "center", "justify"];
        return this.engineData.EngineDict.ParagraphRun.RunArray.map(function (
            s
        ) {
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
        return this.styles().FillColor.map(function (s) {
            var values;
            values = s.Values.map(function (v) {
                return Math.round(v * 255);
            });
            values.push(values.shift());
            return values;
        });
    }

    styles() {
        var data;
        if (this.engineData == null) {
            return {};
        }
        if (this._styles != null) {
            return this._styles;
        }
        data = this.engineData.EngineDict.StyleRun.RunArray.map(function (r) {
            return r.StyleSheet.StyleSheetData;
        });
        return (this._styles = _.reduce(
            data,
            function (m, o) {
                var k, v;
                for (k in o) {
                    if (!o.hasOwnProperty(k)) continue;
                    v = o[k];
                    m[k] || (m[k] = []);
                    m[k].push(v);
                }
                return m;
            },
            {}
        ));
    }

    toCSS() {
        var css, definition, k, v;
        definition = {
            "font-family": this.fonts().join(", "),
            "font-size": this.sizes()[0] + "pt",
            color: "rgba(" + this.colors()[0].join(", ") + ")",
            "text-align": this.alignment()[0],
        };
        css = [];
        for (k in definition) {
            v = definition[k];
            if (v == null) {
                continue;
            }
            css.push(k + ": " + v + ";");
        }
        return css.join("\n");
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
}
