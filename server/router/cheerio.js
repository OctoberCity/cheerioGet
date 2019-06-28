/**
 * 该模块是用来测试爬取所有数据
 */
const router =require('koa-router')();
const controller = require("../controller/page");
// 根据城市来启动爬取数据  
router.get('/upPositionByCity',controller.pushPageData);


module.exports=router;