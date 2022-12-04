// import terser from "@rollup/plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
// import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
// import ts from "@rollup/plugin-typescript";

export default {
    input: "src/main.js",
    output: [
        {
            file: "dist/psd-parser.esm.js",
            format: "es",
        },
        {
            file: "dist/psd-parser.cjs.js",
            format: "cjs",
        },
        {
            file: "dist/psd-parser.umd.js",
            format: "iife",
            name: "PSD",
            // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
            globals: {
                psd: "PSD",
            },
            // plugins: [terser()],
        },
    ],
    plugins: [
        json(),
        resolve({
            preferBuiltins: false,
        }),
        commonjs({
            transformMixedEsModules: true,
        }),
        // ts(),
        // babel({ babelHelpers: "bundled" }),
    ],
};
