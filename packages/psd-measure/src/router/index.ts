import { createRouter, createWebHashHistory } from "vue-router";
import PsdViewer from "@/pages/PsdViewer/Index.vue";
import Home from "@/pages/Home/Index.vue";

const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home,
        },
        {
            path: "/demo",
            name: "PsdViewer",
            component: PsdViewer,
        },
    ],
});

export default router;
