import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
// import nodeResolve from "@rollup/plugin-node-resolve";
// import commonjs from "@rollup/plugin-commonjs";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        dedupe: ["vue"],
        extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
        alias: {
            "@": resolve(__dirname, "src"),
            "~/": `${resolve(__dirname, "src")}/`,
            "@scss": resolve(__dirname, "src/assets/scss"),
            "@pages": resolve(__dirname, "src/components/pages"),
            "@services": resolve(__dirname, "src/components/services"),
            "@widgets": resolve(__dirname, "src/components/widgets"),
        },
    },
});
