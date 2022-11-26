(function () {
    module.exports = {
        parseRaw: function () {
            return this.channelData = this.file.read(this.length);
        }
    };

}).call(this);