// vuex.d.ts
import { Store, CommitOptions } from "vuex";
import vuexOptions from "./store";

declare module "@vue/runtime-core" {
    // declare your own store states
    interface State {
        asideShow: boolean;
        pageX: number;
        asideWidth: number;
        asideDownWidth: number;
        asideDefaultWidth: number;
        isSelectLayer: boolean;
        isDrop: boolean;
        psdPng: {};
        psdJson: never[];
        psdDocument: {};
        layers: never[];
        layerItem: {};
        isToast: boolean;
        psdTree: {};
    }

    // provide typings for `this.$store`
    interface ComponentCustomProperties {
        $store: Store<State>;
    }
}
