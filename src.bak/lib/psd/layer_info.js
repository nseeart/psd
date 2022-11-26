(function () {
    var LayerInfo;

    module.exports = LayerInfo = (function () {
        function LayerInfo(_at_layer, _at_length) {
            this.layer = _at_layer;
            this.length = _at_length;
            this.file = this.layer.file;
            this.section_end = this.file.tell() + this.length;
            this.data = {};
        }

        LayerInfo.prototype.skip = function () {
            return this.file.seek(this.section_end);
        };

        LayerInfo.prototype.parse = function () {
            return this.skip();
        };

        return LayerInfo;

    })();

}).call(this);