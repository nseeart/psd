import terser from "@rollup/plugin-terser";
import nodePolyfills from "rollup-plugin-polyfill-node";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
// import ts from "@rollup/plugin-typescript";

const isProduction = process.env.NODE_ENV === "production";
const isBrowser = process.env.RUN_ENV === "browser";

console.log("isBrowser", isBrowser);

export default {
    input: "src/main.js",
    output: [
        {
            file: isBrowser
                ? "dist/psd-parser.browser.mjs"
                : "dist/psd-parser.mjs",
            format: "es",
        },
        {
            file: isBrowser
                ? "dist/psd-parser.browser.js"
                : "dist/psd-parser.js",
            format: "cjs",
        },
    ],
    plugins: [
        isBrowser && nodePolyfills(/* options */),
        json(),
        resolve({
            preferBuiltins: false,
        }),
        commonjs({
            transformMixedEsModules: true,
        }),
        isProduction && terser(),
        // babel({ babelHelpers: "bundled" }),
    ],
};
