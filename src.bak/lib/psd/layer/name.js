(function () {
    var Util;

    Util = require('../util.js');

    module.exports = {
        parseLegacyLayerName: function () {
            var len;
            len = Util.pad4(this.file.readByte());
            return this.legacyName = this.file.readString(len);
        }
    };

}).call(this);