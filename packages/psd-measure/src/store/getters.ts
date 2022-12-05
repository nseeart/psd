/**
 * Created by wujian on 2017/12/31.
 */

export const getAsideDisaplayStatus = (state) => state.asideShow;
export const getAsideWidth = (state) => state.asideWidth;
export const getAsideDownWidth = (state) => state.asideDownWidth;
export const getAsideDefaultWidth = (state) => state.asideDefaultWidth;
export const getPageX = (state) => state.pageX;
export const getIsDropStatus = (state) => state.isDrop;
export const getSelectLayerStatus = (state) => state.isSelectLayer;

// psd
export const getPsdTree = (state) => state.psdTree;
export const getPsdPng = (state) => state.psdPng;
export const getPsdJson = (state) => state.psdJson;
export const getPsdDocument = (state) => state.psdDocument;
export const getLayers = (state) => state.layers;

export const getLayerItem = (state) => state.layerItem;

export const getToastStatus = (state) => state.isToast;
