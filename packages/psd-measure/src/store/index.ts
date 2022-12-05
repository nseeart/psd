/**
 * Created by wujian on 2017/12/31.
 */

import { createStore } from "vuex";
import state from "./state";
import * as getters from "./getters";
import * as actions from "./actions";
import mutations from "./mutations";

const store = createStore({
    state,
    getters,
    actions,
    mutations,
});

// if (module.hot) {
//     module.hot.accept(["./getters", "./actions", "./mutations"], () => {
//         store.hotUpdate({
//             getters: require("./getters"),
//             actions: require("./actions"),
//             mutations: require("./mutations"),
//         });
//     });
// }

export default store;
