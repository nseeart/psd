const RSVP = require('rsvp'),
    File = require('./psd/file.js'),
    Header = require('./psd/header.js'),
    Resources = require('./psd/resources.js'),
    LayerMask = require('./psd/layer_mask.js'),
    Image = require('./psd/image.js'),
    Root = require('./psd/nodes/root.js');

import Init from './psd/init.js';
import LazyExecute from './psd/lazy_execute.js';

class PSD {
    constructor(data) {
        this.file = new File(data);
        this.parsed = false;
        this.header = null;
        Object.defineProperty(this, 'layers', {
            get: function () {
                return this.layerMask.layers;
            }
        });
        RSVP.on('error', function (reason) {
            return console.error(reason);
        });
    }
    parse () {
        if (this.parsed) {
            return;
        }
        this.parseHeader();
        this.parseResources();
        this.parseLayerMask();
        this.parseImage();
        return this.parsed = true;
    }
    parseHeader () {
        this.header = new Header(this.file);
        return this.header.parse();
    }

    parseResources () {
        var resources;
        resources = new Resources(this.file);
        return this.resources = new LazyExecute(resources, this.file).now('skip').later('parse').get();
    }

    parseLayerMask () {
        var layerMask;
        layerMask = new LayerMask(this.file, this.header);
        return this.layerMask = new LazyExecute(layerMask, this.file).now('skip').later('parse').get();
    }

    parseImage () {
        var image;
        image = new Image(this.file, this.header);
        return this.image = new LazyExecute(image, this.file).later('parse').ignore('width', 'height').get();
    }
    tree () {
        return new PSD.Node.Root(this);
    }
}

PSD.Node = {
    Root
};

new Init(PSD)

export default PSD
