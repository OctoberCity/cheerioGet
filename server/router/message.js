/**
 * 关于消息的路由
 */
/**
 * 此路由是对查询的参数 city oldindustry postion
 */
const router =require('koa-router')();
const controller = require("../controller/message");

// 获得联系人
router.get('/getContactList', controller.getContactList);

// 获得持久化的聊天信息
router.get('/getChatList', controller.getChatList);



module.exports =router;