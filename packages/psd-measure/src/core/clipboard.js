/**
 * Created by wujian on 2018/1/6.
 */
"use strict";

import store from "@/store";
// const Clipboard = require("clipboard");

let vueClipboard = {};
vueClipboard.install = function install(Vue) {
    // Vue.directive("clipboard", {
    //     deep: true,
    //     bind: function bind(el) {
    //         let clipboard = new Clipboard(el);
    //         clipboard.on("success", function (e) {
    //             store.dispatch("toast");
    //             e.clearSelection();
    //         });
    //         clipboard.on("error", function (e) {
    //             // console.error('Action:', e.action);
    //             // console.error('Trigger:', e.trigger);
    //         });
    //     },
    // });
};

export default vueClipboard;
