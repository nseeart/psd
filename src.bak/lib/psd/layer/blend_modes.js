(function () {
    var BlendMode;

    BlendMode = require('../blend_mode.js');

    module.exports = {
        parseBlendModes: function () {
            this.blendMode = new BlendMode(this.file);
            this.blendMode.parse();
            this.opacity = this.blendMode.opacity;
            this.visible = this.blendMode.visible;
            return this.clipped = this.blendMode.clipped;
        },
        hidden: function () {
            return !this.visible;
        },
        blendingMode: function () {
            return this.blendMode.mode;
        }
    };

}).call(this);