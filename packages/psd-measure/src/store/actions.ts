/**
 * Created by wujian on 2017/12/31.
 */

import * as types from "./types";
import PsdParse from "./libs/psdParse";
import ImageParse from "./libs/ImageParse";
import { byte2bm } from "@/core/utils";
import moment from "moment";

export const toggleAsideStatus = ({ commit }, status) => {
    status ? commit(types.ASIDE_SHOW) : commit(types.ASIDE_HIDE);
};

export const setPageX = ({ commit }, value) => {
    commit(types.SET_PAGE_X, value);
};

export const setDropFlag = ({ commit }, flag) => {
    commit(types.SET_DROP_FLAG, flag);
};

export const setAsideWidth = ({ commit }, width) => {
    commit(types.SET_ASIDE_WIDTH, width);
};

export const setAsideDownWidth = ({ commit }, width) => {
    commit(types.SET_ASIDE_DOWN_WIDTH, width);
};

export const setAsideDefaultWidth = ({ commit }, width) => {
    commit(types.SET_ASIDE_DEFAULT_WIDTH, width);
};

export const mouseDown = ({ dispatch }, data) => {
    dispatch("setPageX", data.pageX);
    dispatch("setDropFlag", data.isDrop);
    dispatch("setAsideWidth", data.width);
};

export const parsePsd = ({ commit }, psd) => {
    let psdTree = psd.tree();
    let psdParse = new PsdParse(psdTree);
    let thumb = psd.image.toPng();
    let png = {
        src: thumb.src,
        width: thumb.width,
        height: thumb.height,
    };
    let layers = psdParse.parse().getLayers();
    let document = psdTree.export().document;
    commit(types.SET_PSD, psdTree);
    commit(types.SET_LAYERS, layers);
    commit(types.SET_PSD_JSON, psdTree.export().children);
    commit(types.SET_PSD_DOCUMENT, {
        width: document.width,
        height: document.height,
        size: byte2bm(thumb.src.length),
        updateAt: getUpdateAt(),
    });
    commit(types.SET_PSD_PNG, png);
};

export const handleSelectLayer = ({ commit }) => {
    commit(types.UPDATE_SELECT_LAYER_FLAG, true);
};

export const handleCancelLayer = ({ commit }) => {
    commit(types.UPDATE_SELECT_LAYER_FLAG, false);
};

export const setLayerItem = ({ commit }, data) => {
    commit(types.SET_LAYER_ITEM, data);
};

export const toast = ({ commit }, timer = 1000) => {
    commit(types.TOAST_SHOW, true);
    setTimeout(() => {
        commit(types.TOAST_SHOW, false);
    }, timer);
};

function getUpdateAt() {
    return moment().format("YYYY/MM/DD hh:mm");
}

export const getImage = ({ commit, getters }, id: number) => {
    let psdTree = getters.getPsdTree;
    let descendants = psdTree.descendants();
    let node = descendants[id];
    console.log("node===", node);
    console.log("toPng===", node.toPng());
    let png = node.toPng();

    let imageParse = new ImageParse(node);
    imageParse.getImageData((color) => {
        console.log("color===", color);
        if (color.type === 1) {
            commit(types.SET_LAYER_BGCOLOR, {
                id,
                bgColor: color.bgColor,
            });
        } else if (color.type === 2) {
            commit(types.SET_LAYER_BORDER, {
                id,
                bgColor: color.bgColor,
                border: color.border,
            });
        } else {
            commit(types.SET_LAYER_IMAGE, {
                id,
                image: {
                    width: png.width,
                    height: png.height,
                    src: png.src,
                },
            });
        }
    });
};
