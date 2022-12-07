import ChannelImage from "../channel_image";
import LazyExecute from "../lazy_execute";

export default {
    parseChannelImage() {
        const image = new ChannelImage(this.file, this.header, this);
        return (this.image = new LazyExecute(image, this.file))
            .now("skip")
            .later("parse")
            .get();
    },
};
