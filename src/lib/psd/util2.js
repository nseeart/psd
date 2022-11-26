export function pad2(i) {
    return (i + 1) & ~0x01;
}

export function pad4(i) {
    return ((i + 4) & ~0x03) - 1;
}

export function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}
