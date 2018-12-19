const koa = require("koa");
const app = new koa();
const koaBody = require('koa-body');
const router = require("koa-route");
const mongoose = require("mongoose");
const config = require("./config/config-default");
mongoose.connect('mongodb://localhost:27017/bishe2');
const paramsList = require("./controller/paramsList");
const page = require('./controller/page');
app.use(koaBody());
app.use(async (ctx, next) => {
    ctx.config = config;
    await next();
});


// 获得数据参数列表
app.use(router.get('/getParams', paramsList.getparamsByJson));

// 删除三个参数数据
app.use(router.post('/delParams', async (ctx) => {
    await ctx.render('list', {});
}));

// 更新三个参数数据 
app.use(router.post('/upParams', async (ctx) => {
    await ctx.render('list', {});
}));

// 更新数据核心功能通过三个参数
app.use(router.get('/upParams',page.pushPageData));





app.listen(8081, () => {
    console.log("已经启动了");
});