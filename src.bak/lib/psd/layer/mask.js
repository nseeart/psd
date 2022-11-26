(function () {
    var Mask;

    Mask = require('../mask.js');

    module.exports = {
        parseMaskData: function () {
            return this.mask = new Mask(this.file).parse();
        }
    };

}).call(this);