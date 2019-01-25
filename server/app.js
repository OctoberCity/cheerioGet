const koa = require("koa");
const app = new koa();
const cors = require("koa-cors");
const koaBody = require('koa-body');
const router = require("../server/router/z-index");
const mongoose = require("mongoose");
const config = require("./config/config-default");
mongoose.connect('mongodb://localhost:27017/bishe2');

app.use(cors());
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M 文件从request.files
    }
}));
app.use(async (ctx, next) => {
    ctx.config = config;
    await next();
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(7001, () => {
    console.log("已经启动了");
});