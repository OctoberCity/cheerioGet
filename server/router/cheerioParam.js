/**
 * 此路由是对查询的参数 city oldindustry postion
 */
const router =require('koa-router')();
const controller = require("../controller/paramsList");

// 获得数据参数列表
router.get('/getParams', controller.getparamsByJson);

// // 删除三个参数数据
// router.post('/delParams', async (ctx) => {
//     await ctx.render('list', {});
// });

// // 更新三个参数数据 
// router.post('/upParams',controller.getparamsByJson);

 
// //取得city , position ,oldindustry，页面获取参数要用,这些参数从数据库获得
// router.get('/getDBParam', controller.searchDBParams);


// // 获取配置文件，薪资，规模，融资等情况参数列表
// router.get('/searchParams', controller.searchParams);



module.exports =router;