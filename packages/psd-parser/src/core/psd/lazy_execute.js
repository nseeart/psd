// LazyExecute is very important when it comes to speed. Because some PSD documents
// can be extremely large and hold a LOT of data, we can significantly speed up
// parsing by temporarily skipping over chunks of the PSD. Chances are that you aren't
// going to use every piece of data in the document. This means, when you do request
// some data that's proxied through LazyExecute, we can parse it on the fly. This overhead
// should be incredibly minimal.

// LazyExecute在速度方面非常重要。 由于一些PSD文件
// 可以是非常大的，拥有大量的数据，我们可以大大加快速度
// 通过临时跳过PSD的块来解析。 有可能是你不是
// 将使用文档中的每一条数据。 这意味着，当你要求
// 通过LazyExecute代理的一些数据，我们可以即时解析它。 这个开销
// 应该是极其微小的

// While not as elegant as the PSD.rb counterpart, it gets the job done. We look at the
// object we need to proxy, and define proxies for every item on its prototype on this
// one. The proxy checks to see if the object has been loaded first before passing on
// the call to the object.
// 虽然不像PSD.rb那样高雅，但它完成了工作。 我们看看
// 我们需要代理对象，并为其原型上的每个项目定义代理
// 一个 代理在传递之前检查对象是否已经被加载对象的调用。

// If the object has not been loaded yet, we record our current position in the file, jump
// to the known start position of the data, parse it by calling a set method on the object,
// jump back to the original position in the file, and then call the proxied property.
// 如果对象尚未加载，我们在文件中记录当前位置，
// 跳转到数据已知的开始位置，通过调用对象上的set方法解析它，
// 跳回到文件的原始位置，然后调用代理属性。

// ## Example
// ``` coffeescript
// obj = new SomeObject()
// data = new LazyExecute(obj, file)
//   .now('skip')
//   .later('parse')
//   .ignore('foo', 'bar')
//   .get()
// ```
import { getProperies } from "./util";

export default class LazyExecute {
    constructor(obj, file) {
        this.obj = obj;

        this.file = file;
        this.startPos = this.file.tell();
        this.loaded = false;
        this.loadMethod = null;
        this.loadArgs = [];
        this.passthru = [];
    }

    // This describes the method that we want to run at object instantiation. Typically this
    // will skip over the data that we will parse on-demand later. We can pass any arguments
    // we want to the method as well.
    now(method, ...args) {
        this.obj[method].apply(this.obj, args);
        return this;
    }

    // Here we describe the method we want to run when the first method/property on the object
    // is accessed. We can also define any arguments that need to be passed to the function.
    later(method, ...args) {
        this.loadMethod = method;
        this.loadArgs = args;
        return this;
    }

    // Sometimes we don't have to parse the data in order to get some important information.
    // For example, we can get the widht/height from the full preview image without parsing the
    // image itself, since that data comes from the header. Purely convenience, but helps to
    // optimize usage.

    // The arguments are a list of method/property names we don't want to trigger on-demand parsing.
    ignore(...args) {
        this.passthru.concat(args);
        return this;
    }

    // This is called once all of the paramters of the proxy have been set up, i.e. now, later, and skip.
    // 一旦设置了代理的所有参数，即现在、稍后和跳过，就会调用它。
    // This defines all items on the proxied objects prototype on this object, and checks to make sure
    // the proxied object has been loaded before passing on the call.
    // 这会在此对象上定义代理对象原型上的所有项目，并检查以确保在传递调用之前已加载代理对象。
    get() {
        const _ref = this.obj;
        const properies = getProperies(_ref);
        const keys = new Set(properies);
        const proxy = (key) => {
            if (this[key] != null) {
                return;
            }
            return Object.defineProperty(this, key, {
                get: function () {
                    if (!this.loaded && !this.passthru.includes(key)) {
                        this.load();
                    }
                    return this.obj[key];
                },
            });
        };
        for (let key of keys) {
            proxy(key);
        }
        return this;
    }

    // If we are accessing a property for the first time, then this will call the load method, which
    // was defined during setup with `later()`. The steps this performs are:

    // 1. Records the current file position.
    // 记录当前文件位置。
    // 2. Jumps to the recorded start position for the proxied data.
    // 跳转到代理数据的记录起始位置。
    // 3. Calls the load method, which was defined with `later()`.
    // 调用用 `later()` 定义的 load 方法。
    // 4. Jumps back to the original file position.
    // 跳回原始文件位置。
    // 5. Sets the `@loaded` flag to true so we know this object has been parsed.
    // 将“@loaded”标志设置为 true，以便我们知道该对象已被解析。
    load() {
        const origPos = this.file.tell();
        this.file.seek(this.startPos);
        this.obj[this.loadMethod].apply(this.obj, this.loadArgs);
        this.file.seek(origPos);
        this.loaded = true;
        return this.loaded;
    }
}
