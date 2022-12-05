/**
 * Created by wujian on 2018/1/1.
 */
import {
    array2hex,
    array2rgba,
    unique
} from '@/core/utils'

class PsdParse {
    constructor (psdTree) {
        this.psdTree = psdTree
        this.treeExprot = this.psdTree.export()
        this.children = this.treeExprot.children
        this.document = this.treeExprot.document
        this.descendants = this.psdTree.descendants()
        this.layers = []
    }
    parse () {
        this.parseLayer(this.descendants)
        this.overflows()
        // console.log(this.layers)
        this.parseLayers(this.descendants)
        return this
    }

    /**
     * 获取扁平图层
     * @returns {Array}
     */
    getLayers () {
        return this.layers
    }

    /**
     * 遍历修正溢出层
     */
    overflows () {
        this.layers.map((layer) => {
            return this.overflow(layer)
        })
    }

    /**
     * 修正溢出的层
     * @param layer
     * @returns {*}
     */
    overflow (layer) {
        let { top, right, bottom, left, width, height } = Object.assign({}, layer)
        let docWidth = this.document.width
        let docHeight = this.document.height
        top = top > 0 ? top : 0
        left = left > 0 ? left : 0
        width = width > docWidth - left ? docWidth - left : width
        height = height > docHeight - top ? docHeight - top : height
        return Object.assign(layer, { top, left, right, bottom, width, height })
    }
    parseLayers (descendants) {
        descendants.forEach((node, index) => {
            if (index < 10) {
                var nodeInfo = node.export()
                console.log(nodeInfo)
                // console.log('node:', node)
            }
        })
        // console.log('descendants====xxx:', descendants)
    }
    /**
     * 图层扁平化
     * 修正偏移
     * @param children
     */
    parseLayer (childrens) {
        childrens.length > 0 && childrens.forEach((node, index) => {
            if (node.isGroup() || node.hidden()) {
                return true
            }
            let item = node.export()
            // let png = node.toPng()
            if (item.width <= 0 || item.height <= 0) { // 无效数据
                return
            }
            if (item.type === 'layer' && item.visible) {
                // console.log(node.name, node, item)
                var layer = {
                    id: index,
                    name: item.name,
                    type: item.type,
                    opacity: item.opacity,
                    zIndex: -(item.width * item.height),
                    item: item,
                    image: false,
                    bgColor: '',
                    border: null
                }
                if (item.text) {
                    layer = Object.assign(layer, {
                        top: item.top,
                        right: item.right,
                        bottom: item.bottom,
                        left: item.left,
                        width: item.width,
                        height: item.height,
                        text: this.parseText(item.text)
                    })
                    if (item.text && item.text.font) {
                        layer = Object.assign(layer, {
                            font: this.parseFont(item.text.font)
                        })
                    }
                } else {
                    layer = Object.assign(layer, {
                        top: item.top + 1,
                        right: item.right - 1,
                        bottom: item.bottom - 1,
                        left: item.left + 1,
                        width: item.width - 2,
                        height: item.height - 2
                    })
                }
                this.layers.push(layer)
            }
        })
    }

    _base64ToArrayBuffer (base64) {
        let binaryString = window.btoa(base64)
        let len = binaryString.length
        let bytes = new Uint8Array(len)
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i)
        }
        return bytes.buffer
    }

    parseText (text) {
        let {value, top, right, bottom, left} = text
        return { value, top, right, bottom, left }
    }

    /**
     * 处理文字属性
     * @param font
     * @returns {{aligns: *, colors: *, lineHeights: *, lengthArray: *, names: *, sizes: *, styles: *, textDecoration: *, weights: *}}
     */
    parseFont (font) {
        return {
            aligns: this.parseAlignment(font.alignment),
            colors: this.parseColor(font.colors),
            lineHeights: this.parseLeading(font.leading),
            lengthArray: this.parseLengthArray(font.lengthArray),
            names: this.parseName(font.names),
            sizes: this.parseSize(font.sizes),
            styles: this.parseStyle(font.styles),
            textDecoration: this.parseTextDecoration(font.textDecoration),
            weights: this.parseWeight(font.weights)
        }
    }
    parseAlignment (alignment) {
        if (!alignment) return
        return unique(alignment).join('/')
    }
    parseColor (colors) {
        let newColors = []
        colors = unique(colors)
        colors.forEach((item) => {
            newColors.push({
                rgba: array2rgba(item),
                hex: array2hex(item)
            })
        })
        return newColors
    }
    parseLeading (lineHeights) {
        if (!lineHeights) return []
        let newLineHeights = []
        lineHeights = unique(lineHeights)
        lineHeights.forEach(item => {
            newLineHeights.push(`${item}px`)
        })
        return newLineHeights.join('/')
    }
    parseLengthArray (lengthArray) {
        return lengthArray
    }
    parseName (names) {
        return unique(names)
    }
    parseSize (sizes) {
        let newSize = []
        sizes = unique(sizes)
        sizes.forEach(item => {
            newSize.push(`${item}px`)
        })
        return newSize.join('/')
    }
    parseStyle (styles) {
        return unique(styles).join('/')
    }
    parseTextDecoration (textDecoration) {
        return textDecoration
    }
    parseWeight (weights) {
        return unique(weights).join('/')
    }
}

export default PsdParse
