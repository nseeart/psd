import { clamp } from "./util2";
export function cmykToRgb(c, m, y, k) {
    var b, g, r;
    r = clamp((65535 - (c * (255 - k) + (k << 8))) >> 8, 0, 255);
    g = clamp((65535 - (m * (255 - k) + (k << 8))) >> 8, 0, 255);
    b = clamp((65535 - (y * (255 - k) + (k << 8))) >> 8, 0, 255);
    return [r, g, b];
}
