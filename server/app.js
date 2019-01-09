const koa = require("koa");
const app = new koa();
const cors = require("koa-cors");
const koaBody = require('koa-body');
const router = require("koa-route");
const mongoose = require("mongoose");
const config = require("./config/config-default");
mongoose.connect('mongodb://localhost:27017/bishe2');
const paramsList = require("./controller/paramsList");
const page = require('./controller/page');
const position = require('./controller/position');

app.use(cors());
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


// 以下是业务代码，上面是爬取代码


/**
 * 获取参数 ，所有的查询参数，部分卸载配置文件，部分存数据库
 */

 // 获取city industry position
app.use(router.get('/getDBParam',paramsList.searchDBParams));

// 获取配置文件，薪资，规模，融资等情况参数列表
app.use(router.get('/getParam',paramsList.searchParams));






/**
 * 搜索职位根据城市和职位以及搜索公司
 */
app.use(router.get('/searchPosition',position.searchPosition));























app.listen(7001, () => {
    console.log("已经启动了");
});