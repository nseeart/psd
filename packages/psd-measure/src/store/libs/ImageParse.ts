/**
 * Created by wujian on 2018/3/4.
 */
class ImageParse {
    constructor(node) {
        this.node = node;
        this.png = this.node.toPng();
        this.info = this.node.export();
        this.image = new Image();
        this.image.src = this.png.src;
    }

    getImageData(cb) {
        let canvas = document.createElement("canvas");
        let context = canvas.getContext("2d");
        let imgWidth = this.png.width;
        let imgHeight = this.png.height;
        let self = this;
        this.image.onload = function () {
            canvas.width = imgWidth;
            canvas.height = imgHeight;
            context.drawImage(this, 0, 0, imgWidth, imgHeight);
            let imageData = context.getImageData(0, 0, imgWidth, imgHeight);
            let color = self.parseBgColor(imageData, self.info);
            cb && cb(color);
        };
    }

    parseBgColor(imageData, info) {
        let arrbox = [];
        let length = imageData.data.length;
        let imgWidth = imageData.width;
        let mathX = 0;
        let mathY = 0;
        // let imgHeight = imageData.imgHeight
        // console.log('length', length, imageData.data)
        for (let i = 0; i < length; i++) {
            if (i % 4 === 0) {
                // 每四个元素为一个像素数据 r,g,b,alpha
                let x = (i / 4) % imgWidth; // 横坐标
                let y = Math.floor(i / 4 / imgWidth); // 纵坐标
                let alpha =
                    Math.round((imageData.data[i + 3] / 255) * 100) / 100; // alpha 值
                // console.log('alpha', alpha)
                if (imageData.data[i + 3] === 255) {
                    // 没有alpha 值
                    if (info.opacity && info.opacity < 1) {
                        let rgba =
                            imageData.data[i] +
                            "," +
                            imageData.data[i + 1] +
                            "," +
                            imageData.data[i + 2] +
                            "," +
                            info.opacity.toFixed(2);
                        arrbox.push({
                            color: "rgba(" + rgba + ")",
                            x,
                            y,
                        });
                    } else {
                        let hex = this.gethex(
                            imageData.data[i],
                            imageData.data[i + 1],
                            imageData.data[i + 2]
                        );
                        // arrbox.push(x + 'px ' + y + 'px #' + hex)
                        arrbox.push({
                            color: "#" + hex,
                            x,
                            y,
                        });
                    }
                } else if (alpha > 0) {
                    // 有alpha 值
                    let rgba =
                        imageData.data[i] +
                        "," +
                        imageData.data[i + 1] +
                        "," +
                        imageData.data[i + 2] +
                        "," +
                        alpha;
                    // arrbox.push(x + 'px ' + y + 'px rgba(' + rgba + ')')
                    arrbox.push({
                        color: "rgba(" + rgba + ")",
                        x,
                        y,
                    });
                }
                mathX = x;
                mathY = y;
            }
        }
        // console.log('arrbox', arrbox)
        let bgColor = this.removalObj(arrbox);
        if (bgColor.length === 1) {
            return {
                type: 1,
                bgColor: bgColor[0],
            };
        } else if (bgColor.length === 2) {
            let middlePx = this.getMiddlePx(mathX, mathY);
            let middlePxColor = this.getMiddlePxColor(arrbox, middlePx);
            let border = this.getBorder(arrbox, middlePxColor, imgWidth);
            return {
                type: 2,
                border,
                bgColor: middlePxColor,
            };
        } else {
            // console.log('bgColor', bgColor)
            return {
                type: 3,
            };
        }
    }

    /**
     * 获取中间的像素位置
     * @param mathX
     * @param mathY
     * @returns {{x: number, y: number}}
     */
    getMiddlePx(mathX, mathY) {
        let middleX = mathX % 2 ? Math.ceil(mathX / 2) : mathX / 2;
        let middleY = mathY / 2 ? Math.ceil(mathY / 2) : mathY / 2;
        return {
            x: middleX,
            y: middleY,
        };
    }

    getBorder(arrbox, middlePxColor, imgWidth) {
        let length = arrbox.length;
        let imgHeight = length / imgWidth;
        if (length === 0) {
            return;
        }
        let yt = 1;
        let yb = imgHeight;
        let xl = 1;
        let xr = imgWidth;
        let self = this;
        let border = {
            style: "solid",
        };
        getRoundColors(arrbox, middlePxColor, yt, yb, xl, xr);
        function getRoundColors(arrbox, middlePxColor, yt, yb, xl, xr) {
            // console.log('getRoundColors:===xxxx', yt, yb, xl, xr)
            // console.log('arrboxarrboxarrbox', arrbox)
            let roundPxs = [];
            arrbox &&
                arrbox.length > 0 &&
                arrbox.forEach((item, index) => {
                    if (item.y === yt) {
                        roundPxs.push(item.color);
                    }
                    if (item.y === yb) {
                        roundPxs.push(item.color);
                    }
                    if (item.x === xl) {
                        roundPxs.push(item.color);
                    }
                    if (item.x === xr) {
                        roundPxs.push(item.color);
                    }
                });
            let arr = self.removal(roundPxs);
            if (arr.length === 1) {
                if (arr[0] !== middlePxColor) {
                    border["color"] = arr[0];
                    yt += 1;
                    yb -= 1;
                    xl += 1;
                    xr -= 1;
                    getRoundColors(arrbox, middlePxColor, yt, yb, xl, xr);
                } else {
                    border["size"] = yt;
                }
            } else if (arr.length === 2) {
                border["size"] = yt;
            }
        }
        return border;
    }

    /**
     * 获取中间的像素颜色
     * @param arrbox
     * @param middlePx
     * @returns {string}
     */
    getMiddlePxColor(arrbox, middlePx) {
        if (arrbox.length > 0) {
            let color = "";
            arrbox.forEach((item) => {
                if (item.x === middlePx.x && item.y === middlePx.y) {
                    color = item.color;
                }
            });
            return color;
        }
        return "";
    }

    removal(arrbox) {
        let newArr = [];
        let obj = {};
        arrbox.forEach((item) => {
            obj[item] = item;
        });
        for (let key in obj) {
            newArr.push(key);
        }
        return newArr;
    }
    removalObj(arrbox) {
        let newArr = [];
        let obj = {};
        arrbox.forEach((item) => {
            obj[item.color] = item;
        });
        for (let key in obj) {
            newArr.push(key);
        }
        return newArr;
    }

    /**
     * 获取16进制颜色
     * @param r
     * @param g
     * @param b
     * @returns {*}
     */
    gethex(r, g, b) {
        r = r.toString(16);
        g = g.toString(16);
        b = b.toString(16);

        if (r.length === 1) {
            r = "0" + r;
        }
        if (g.length === 1) {
            g = "0" + g;
        }
        if (b.length === 1) {
            b = "0" + b;
        }
        // r.length === 1 ? r = '0' + r : ''
        // g.length === 1 ? g = '0' + g : ''
        // b.length === 1 ? b = '0' + b : ''

        var hex = r + g + b;
        // 简化处理,如 FFEEDD 可以写为 FED
        if (
            r.slice(0, 1) === r.slice(1, 1) &&
            g.slice(0, 1) === g.slice(1, 1) &&
            b.slice(0, 1) === b.slice(1, 1)
        ) {
            hex = r.slice(0, 1) + g.slice(0, 1) + b.slice(0, 1);
        }
        return hex;
    }
}

export default ImageParse;
