/**
 * Created by wujian on 2017/12/31.
 */

import {
    ASIDE_SHOW,
    ASIDE_HIDE,
    SET_PAGE_X,
    SET_DROP_FLAG,
    SET_ASIDE_WIDTH,
    SET_ASIDE_DOWN_WIDTH,
    SET_ASIDE_DEFAULT_WIDTH,
    SET_PSD_PNG,
    SET_PSD_JSON,
    SET_PSD_DOCUMENT,
    UPDATE_SELECT_LAYER_FLAG,
    SET_LAYER_ITEM,
    TOAST_SHOW,
    SET_LAYERS,
    SET_LAYER_IMAGE,
    SET_LAYER_BGCOLOR,
    SET_LAYER_BORDER,
    SET_PSD,
} from "./types";

export default {
    [ASIDE_SHOW](state) {
        state.asideShow = true;
    },
    [ASIDE_HIDE](state) {
        state.asideShow = false;
    },
    [SET_PAGE_X](state, value) {
        state.pageX = value;
    },
    [SET_ASIDE_WIDTH](state, width) {
        state.asideWidth = width;
    },
    [SET_ASIDE_DOWN_WIDTH](state, width) {
        state.asideDownWidth = width;
    },
    [SET_ASIDE_DEFAULT_WIDTH](state, width) {
        state.asideDefaultWidth = width;
    },
    [SET_DROP_FLAG](state, flag) {
        state.isDrop = flag;
    },
    [SET_PSD_PNG](state, data) {
        state.psdPng = data;
    },
    [SET_PSD_JSON](state, data) {
        state.psdJson = data;
    },
    [SET_PSD_DOCUMENT](state, data) {
        state.psdDocument = data;
    },
    [UPDATE_SELECT_LAYER_FLAG](state, flag) {
        state.isSelectLayer = flag;
    },
    [SET_LAYER_ITEM](state, data) {
        state.layerItem = data;
    },
    [SET_LAYERS](state, data) {
        state.layers = data;
    },
    [TOAST_SHOW](state, flag) {
        state.isToast = flag;
    },
    [SET_LAYER_IMAGE](state, { id, image }) {
        state.layers.forEach((item, index) => {
            if (item.id === id) {
                state.layers[index].image = image;
            }
        });
    },
    [SET_LAYER_BGCOLOR](state, { id, bgColor }) {
        state.layers.forEach((item, index) => {
            if (item.id === id) {
                state.layers[index].bgColor = bgColor;
            }
        });
    },
    [SET_LAYER_BORDER](state, { id, border, bgColor }) {
        state.layers.forEach((item, index) => {
            if (item.id === id) {
                state.layers[index].border = border;
                state.layers[index].bgColor = bgColor;
            }
        });
    },
    [SET_PSD](state, psdTree) {
        state.psdTree = psdTree;
    },
};
