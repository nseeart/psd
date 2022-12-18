/// <reference types="vite/client" />

declare module "*.vue" {
    import type { DefineComponent } from "vue";
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

declare module "vue3-highlightjs";
declare module "@/core/*";
declare module "@pages/*";
declare module "@pages/*";
declare module "vite-plugin-require-transform";
declare module "psd.js";
declare module "color";
