(function () {
    var ChannelImage, LazyExecute;

    ChannelImage = require('../channel_image.js');

    LazyExecute = require('../lazy_execute.js');

    module.exports = {
        parseChannelImage: function () {
            var image;
            image = new ChannelImage(this.file, this.header, this);
            return this.image = new LazyExecute(image, this.file).now('skip').later('parse').get();
        }
    };

}).call(this);