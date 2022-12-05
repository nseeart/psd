/**
 * Created by wujian on 2018/1/1.
 */

export const getWinWidth = () => {
    let doc = document;
    let win = window;
    if (win.innerWidth) {
        return win.innerWidth;
    } else if (doc.body && doc.body.clientWidth) {
        return doc.body.clientWidth;
    }
    return 1;
};

export const array2hex = (array) => {
    let strHex = "#";
    let opacity = 0;
    array.length > 0 &&
        array.forEach((item, index) => {
            if (index < 3) {
                let hex = Number(item).toString(16);
                if (hex === "0") {
                    hex += hex;
                }
                strHex += hex;
            } else {
                opacity = Number(item) / 255;
            }
        });
    return {
        strHex,
        opacity,
    };
};

export const array2rgba = (array) => {
    let rgbaStr = "rgba";
    let rgb = [];
    let a = 0;
    array.length > 0 &&
        array.forEach((item, index) => {
            if (index < 3) {
                rgb.push(item);
            } else {
                a = Number(item) / 255;
            }
        });
    return `${rgbaStr}(${rgb.join(",")},${a})`;
};

export const unique = (arr) => {
    var res = [];
    var json = {};
    for (let i = 0; i < arr.length; i++) {
        if (!json[arr[i]]) {
            res.push(arr[i]);
            json[arr[i]] = 1;
        }
    }
    return res;
};

const I64BIT_TABLE =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-".split(
        ""
    );
export const hash = (input) => {
    let hash = 5381;
    let i = input.length - 1;
    if (typeof input === "string") {
        for (; i > -1; i--) {
            hash += (hash << 5) + input.charCodeAt(i);
        }
    } else {
        for (; i > -1; i--) {
            hash += (hash << 5) + input[i];
        }
    }
    let value = hash & 0x7fffffff;
    let retValue = "";
    do {
        retValue += I64BIT_TABLE[value & 0x3f];
        // eslint-disable-next-line
    } while ((value >>= 6));

    return retValue;
};

export const byte2bm = (byte) => (byte / 1024 / 1024).toFixed(2);
