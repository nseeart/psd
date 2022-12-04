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
