import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vue3HighlightJS from "vue3-highlightjs";
import "@/assets/scss/hightlight.scss";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { VueClipboard } from "@soerenmartius/vue3-clipboard";

const app = createApp(App);
app.use(Vue3HighlightJS);
app.use(ElementPlus);
app.use(VueClipboard);
app.use(store);
app.use(router);
app.mount("#app");
