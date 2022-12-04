import PNGBrowser from "./image_exports/png.browser";
import PNGNode from "./image_exports/png.node";

export default {
    PNG: { ...PNGBrowser, ...PNGNode },
};
