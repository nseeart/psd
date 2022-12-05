import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Vue3HighlightJS from "vue3-highlightjs";
// import "highlight.js/styles/github-dark.css";
import "@/assets/scss/hightlight.scss";
import VueClipboard from "@/core/clipboard";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const app = createApp(App);
app.use(Vue3HighlightJS);
app.use(VueClipboard);
app.use(ElementPlus);
app.use(store);
app.use(router);

app.mount("#app");
