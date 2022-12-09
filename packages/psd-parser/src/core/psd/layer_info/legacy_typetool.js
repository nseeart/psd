import TypeTool from "./typetool";
import { tap } from "lodash-es";

export default class LegacyTypeTool extends TypeTool {
    static shouldParse(key) {
        return key === "tySh";
    }

    constructor(layer, length) {
        super(layer, length);
        this.transform = {};
        this.faces = [];
        this.styles = [];
        this.lines = [];
        this.type = 0;
        this.scalingFactor = 0;
        this.characterCount = 0;
        this.horzPlace = 0;
        this.vertPlace = 0;
        this.selectStart = 0;
        this.selectEnd = 0;
        this.color = null;
        this.antialias = null;
    }

    parse() {
        this.file.seek(2, true);
        this.parseTransformInfo();
        this.file.seek(2, true);
        const facesCount = this.file.readShort();
        let i, _i;
        for (
            i = _i = 0;
            0 <= facesCount ? _i < facesCount : _i > facesCount;
            i = 0 <= facesCount ? ++_i : --_i
        ) {
            this.faces.push(
                tap({}, (face) => {
                    let j, _j, _ref, _results;
                    face.mark = this.file.readShort();
                    face.fontType = this.file.readInt();
                    face.fontName = this.file.readString();
                    face.fontFamilyName = this.file.readString();
                    face.fontStyleName = this.file.readString();
                    face.script = this.file.readShort();
                    face.numberAxesVector = this.file.readInt();
                    face.vector = [];
                    _results = [];
                    for (
                        j = _j = 0, _ref = face.numberAxesVector;
                        0 <= _ref ? _j < _ref : _j > _ref;
                        j = 0 <= _ref ? ++_j : --_j
                    ) {
                        _results.push(face.vector.push(this.file.readInt()));
                    }
                    return _results;
                })
            );
        }
        const stylesCount = this.file.readShort();
        let _j;
        for (
            i = _j = 0;
            0 <= stylesCount ? _j < stylesCount : _j > stylesCount;
            i = 0 <= stylesCount ? ++_j : --_j
        ) {
            this.styles.push(
                tap({}, (style) => {
                    style.mark = this.file.readShort();
                    style.faceMark = this.file.readShort();
                    style.size = this.file.readInt();
                    style.tracking = this.file.readInt();
                    style.kerning = this.file.readInt();
                    style.leading = this.file.readInt();
                    style.baseShift = this.file.readInt();
                    style.autoKern = this.file.readBoolean();
                    this.file.seek(1, true);
                    return (style.rotate = this.file.readBoolean());
                })
            );
        }
        this.type = this.file.readShort();
        this.scalingFactor = this.file.readInt();
        this.characterCount = this.file.readInt();
        this.horzPlace = this.file.readInt();
        this.vertPlace = this.file.readInt();
        this.selectStart = this.file.readInt();
        this.selectEnd = this.file.readInt();
        const linesCount = this.file.readShort();
        let _k;
        for (
            i = _k = 0;
            0 <= linesCount ? _k < linesCount : _k > linesCount;
            i = 0 <= linesCount ? ++_k : --_k
        ) {
            this.lines.push(
                tap({}, (line) => {
                    line.charCount = this.file.readInt();
                    line.orientation = this.file.readShort();
                    line.alignment = this.file.readShort();
                    line.actualChar = this.file.readShort();
                    return (line.style = this.file.readShort());
                })
            );
        }
        this.color = this.file.readSpaceColor();
        return (this.antialias = this.file.readBoolean());
    }
}
