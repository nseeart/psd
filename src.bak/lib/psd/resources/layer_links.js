(function () {
    var LinkLayers;

    module.exports = LinkLayers = (function () {
        LinkLayers.prototype.id = 1026;

        LinkLayers.prototype.name = 'LinkLayers';

        function LinkLayers(_at_resource) {
            this.resource = _at_resource;
            this.file = this.resource.file;
            this.linkArray = [];
        }

        LinkLayers.prototype.parse = function () {
            var end;
            end = this.file.tell() + this.resource.length;
            while (end > this.file.tell()) {
                this.linkArray.push(this.file.readShort());
            }
            return this.linkArray.reverse();
        };

        return LinkLayers;

    })();

}).call(this);