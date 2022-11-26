(function () {
    var ResourceSection, _;

    _ = require('lodash');

    module.exports = ResourceSection = (function () {
        var RESOURCES;

        function ResourceSection() {
        }

        RESOURCES = [require('./resources/layer_comps.js'), require('./resources/layer_links.js')];

        ResourceSection.factory = function (resource) {
            var Section, _i, _len;
            for (_i = 0, _len = RESOURCES.length; _i < _len; _i++) {
                Section = RESOURCES[_i];
                if (Section.prototype.id !== resource.id) {
                    continue;
                }
                return _.tap(new Section(resource), function (s) {
                    return s.parse();
                });
            }
            return null;
        };

        return ResourceSection;

    })();

}).call(this);