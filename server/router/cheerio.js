/**
 * 该模块是用来测试爬取所有数据，暂时因为数据关系处理不明确暂时不确定是否开放这个接口
 */
const router =require('koa-router')();
const controller = require("../controller/page");
// 更新数据核心功能通过三个参数
router.get('/upParams',controller.pushPageData);
module.exports=router;