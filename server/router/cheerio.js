/**
 * 该模块是用来测试爬取所有数据
 */
const router =require('koa-router')();
const controller = require("../controller/page");
// 爬取某个城市的所有职业第一页
router.get('/upPositionByCity',controller.pushPageData);


module.exports=router;