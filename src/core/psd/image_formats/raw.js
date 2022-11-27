export default {
    parseRaw() {
        return (this.channelData = this.file.read(this.length));
    },
};
