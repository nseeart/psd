(function () {
    var Resource, Util;

    Util = require('./util.js');

    module.exports = Resource = (function () {
        Resource.Section = require('./resource_section.js');

        function Resource(_at_file) {
            this.file = _at_file;
            this.id = null;
            this.type = null;
            this.length = 0;
        }

        Resource.prototype.parse = function () {
            var nameLength;
            this.type = this.file.readString(4);
            this.id = this.file.readShort();
            nameLength = Util.pad2(this.file.readByte() + 1) - 1;
            this.name = this.file.readString(nameLength);
            return this.length = Util.pad2(this.file.readInt());
        };

        return Resource;

    })();

}).call(this);