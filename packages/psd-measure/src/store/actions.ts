/**
 * Created by n.see on 2022/12/8.
 */

import * as types from "./types";
import PsdParse from "./libs/psdParse";
import ImageParse from "./libs/ImageParse";
import { byte2bm } from "@/core/utils";
import moment from "moment";

type Commit = (type: string, payload?: any) => void;
type Dispatch = (type: string, payload?: any) => Promise<any>;

type Context = {
    commit: Commit;
} & {
    dispatch: Dispatch;
} & {
    getters: Record<string, any>;
};

export const toggleAsideStatus = ({ commit }: Context, status: number) => {
    status ? commit(types.ASIDE_SHOW) : commit(types.ASIDE_HIDE);
};

export const setPageX = ({ commit }: Context, value: number) => {
    commit(types.SET_PAGE_X, value);
};

export const setDropFlag = ({ commit }: Context, flag: boolean) => {
    commit(types.SET_DROP_FLAG, flag);
};

export const setAsideWidth = ({ commit }: Context, width: number) => {
    commit(types.SET_ASIDE_WIDTH, width);
};

export const setAsideDownWidth = ({ commit }: Context, width: number) => {
    commit(types.SET_ASIDE_DOWN_WIDTH, width);
};

export const setAsideDefaultWidth = ({ commit }: Context, width: number) => {
    commit(types.SET_ASIDE_DEFAULT_WIDTH, width);
};

export const mouseDown = ({ dispatch }: Context, data: Record<string, any>) => {
    dispatch("setPageX", data.pageX);
    dispatch("setDropFlag", data.isDrop);
    dispatch("setAsideWidth", data.width);
};

export const parsePsd = ({ commit }: Context, psd: any) => {
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

export const handleSelectLayer = ({ commit }: Context) => {
    commit(types.UPDATE_SELECT_LAYER_FLAG, true);
};

export const handleCancelLayer = ({ commit }: Context) => {
    commit(types.UPDATE_SELECT_LAYER_FLAG, false);
};

export const setLayerItem = ({ commit }: Context, data: any) => {
    commit(types.SET_LAYER_ITEM, data);
};

export const toast = ({ commit }: Context, timer = 1000) => {
    commit(types.TOAST_SHOW, true);
    setTimeout(() => {
        commit(types.TOAST_SHOW, false);
    }, timer);
};

function getUpdateAt() {
    return moment().format("YYYY/MM/DD hh:mm");
}

export const getImage = ({ commit, getters }: Context, id: number) => {
    let psdTree = getters.getPsdTree;
    let descendants = psdTree.descendants();
    console.log("===", id);
    let node = descendants[id];
    // let png = node.toPng();
    // console.log("png", png);

    commit(types.SET_NODE, node);
};
