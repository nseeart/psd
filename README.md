# psd-parser.js

A general purpose PSD parser written in ES6. Based off of [PSD.rb](https://github.com/layervault/psd.rb). It allows you to work with a Photoshop document in a manageable tree structure and find out important data such as:

-   Document structure
-   Document size
-   Layer/folder size + positioning
-   Layer/folder names
-   Layer/folder visibility and opacity
-   Font data (via [psd-enginedata](https://github.com/layervault/psd-enginedata))
    -   Text area contents
    -   Font names, sizes, and colors
-   Color mode and bit-depth
-   Vector mask data
-   Flattened image data
-   Layer comps

Runs in both NodeJS and the browser (using browserify). There are still some pieces missing that are present in PSD.rb, such as layer comp filtering, a built-in renderer, and many layer info blocks. The eventual goal is full feature parity with PSD.rb.

## Installation

```bash
# pnpm
pnpm install @n.see/psd-parser
# or
# npm
npm install @n.see/psd-parser --save
# yarn
yarn add @n.see/psd-parser --save
```

## Documentation

## Usage

psd-parser.js works almost exactly the same in the browser and NodeJS.

### NodeJS Example

```js
import Koa from "koa";
import PSD from "@n.see/psd-parser";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filepath = resolve(__dirname, "..", "public/test2.psd");
const imgpath = resolve(__dirname, "..", "public/output.png");

const app = new Koa();

// response
app.use(async (ctx) => {
    // const psd = PSD.fromFile(filepath);
    // psd.parse();
    // const data = psd.tree().export();
    // console.log("data:", data);
    // ctx.body = data;

    const psd = await PSD.open(filepath);
    const data = psd.tree().export();
    psd.image.saveAsPng(imgpath);
    ctx.body = data;
});

app.listen(3000);
console.log(`[psd-parser] http://127.0.0.1:3000`);
```

### Browser Example

```vue
<template>
    <div class="container">
        <div id="dropzone">
            <p>Drop here</p>
        </div>
        <div id="content">
            <div ref="imageRef" id="image"></div>
            <pre ref="dataRef" id="data"></pre>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import PSD from "@n.see/psd-parser";

const dataRef = ref();
const imageRef = ref();

onMounted(() => {
    PSD.fromURL("/test2.psd").then((psd: PSD) => {
        console.log("psd==========", psd);
        const data = psd.tree().export();
        const dataString = JSON.stringify(data, undefined, 2);
        if (dataRef.value) {
            dataRef.value.innerHTML = dataString;
        }
        const img = (psd.image as any).toPng();
        if (imageRef.value) {
            imageRef.value.appendChild(img);
        }

        const node = psd.tree();
        console.log("node", node);
    });
});
</script>
<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
}
#data {
    background-color: #eee;
    padding: 10px;
    margin: 0;
    flex: 1;
}

#dropzone {
    width: 500px;
    height: 100px;
    border: 1px #ababab dashed;
    margin: 50px auto;
}

#dropzone p {
    text-align: center;
    line-height: 100px;
    margin: 0;
    padding: 0;
    background-color: #eee;
}

#content {
    display: flex;
}
</style>
```

### Traversing the Document

To access the document as a tree structure, use `psd.tree()` to get the root node. From there, work with the tree using any of these methods:

-   `root()`: get the root node from anywhere in the tree
-   `isRoot()`: is this the root node?
-   `children()`: get all immediate children of the node
-   `hasChildren()`: does this node have any children?
-   `childless()`: opposite of `hasChildren()`
-   `ancestors()`: get all ancestors in the path of this node (excluding the root)
-   `siblings()`: get all sibling tree nodes including the current one (e.g. all layers in a folder)
-   `nextSibling()`: gets the sibling immediately following the current node
-   `prevSibling()`: gets the sibling immediately before the current node
-   `hasSiblings()`: does this node have any siblings?
-   `onlyChild()`: opposite of `hasSiblings()`
-   `descendants()`: get all descendant nodes not including the current one
-   `subtree()`: same as descendants but starts with the current node
-   `depth()`: calculate the depth of the current node (root node is 0)
-   `path()`: gets the path to the current node

If you know the path to a group or layer within the tree, you can search by that path. Note that this always returns an Array because layer/group names do not have to be unique. The search is always scoped to the descendants of the current node, as well.

```js
psd.tree().childrenAtPath("Version A/Matte");
psd.tree().childrenAtPath(["Version A", "Matte"]);
```

### Accessing Layer Data

To get data such as the name or dimensions of a layer:

```js
node = psd.tree().descendants()[0];
node.get("name");
node.get("width");
```

PSD files also store various pieces of information in "layer info" blocks. See [this file](https://github.com/meltingice/psd.js/blob/master/lib/psd/layer/info.coffee) for all of the possible layer info blocks that PSD.js parses (in `LAYER_INFO`). Which blocks a layer has varies from layer-to-layer, but to access them you can do:

```js
node = psd.tree().descendants()[0];
node.get("typeTool").export();
node.get("vectorMask").export();
```

### Exporting Data

When working with the tree structure, you can recursively export any node to an object. This does not dump _everything_, but it does include the most commonly accessed information.

```js
console.log(psd.tree().export());
```

Which produces something like:

```js
{ children:
   [ { type: 'group',
       visible: false,
       opacity: 1,
       blendingMode: 'normal',
       name: 'Version D',
       left: 0,
       right: 900,
       top: 0,
       bottom: 600,
       height: 600,
       width: 900,
       children:
        [ { type: 'layer',
            visible: true,
            opacity: 1,
            blendingMode: 'normal',
            name: 'Make a change and save.',
            left: 275,
            right: 636,
            top: 435,
            bottom: 466,
            height: 31,
            width: 361,
            mask: {},
            text:
             { value: 'Make a change and save.',
               font:
                { name: 'HelveticaNeue-Light',
                  sizes: [ 33 ],
                  colors: [ [ 85, 96, 110, 255 ] ],
                  alignment: [ 'center' ] },
               left: 0,
               top: 0,
               right: 0,
               bottom: 0,
               transform: { xx: 1, xy: 0, yx: 0, yy: 1, tx: 456, ty: 459 } },
            image: {} } ] } ],
    document:
       { width: 900,
         height: 600,
         resources:
          { layerComps:
             [ { id: 692243163, name: 'Version A', capturedInfo: 1 },
               { id: 725235304, name: 'Version B', capturedInfo: 1 },
               { id: 730932877, name: 'Version C', capturedInfo: 1 } ],
            guides: [],
            slices: [] } } }
```

You can also export the PSD to a flattened image. Please note that, at this time, not all image modes + depths are supported.

```js
png = psd.image.toPng(); // get PNG object
psd.image.saveAsPng("path/to/output.png").then(function () {
    console.log("Exported!");
});
```

This uses the full rasterized preview provided by Photoshop. If the file was not saved with Compatibility Mode enabled, this will return an empty image.
