/**
 * 该模块是对职位的操作
 */
const router =require('koa-router')();
const controller = require("../controller/position");

/**
 * 搜索职位根据城市和职位以及搜索公司
 */
 router.get('/position/searchPosition',controller.searchPosition);
 

module.exports =router;