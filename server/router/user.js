/**
 * 用户的一些操作，不是boss而是求职者的模块，登录，注册，表单之类的
 */ 
const router =require('koa-router')();
const controller = require("../controller/user");

//  //登录
// router.post('/login', controller.userlogin);

// // 注册
// router.post('/register',controller.register );

// // 上传简历pdf
// router.post('/resume', controller.uploadResume);

// // 获取简历列表
// router.get('/resume', controller.getResumeList);

// // 删除简历
// router.post('/resume', controller.getResumeList);

 
// //  添加求职意向
// router.post('/resume', controller.uploadWantWork );

// // 获取求职意向
// router.get('/resume', controller.getWantWorkList);

// // 删除求职意向
// router.post('/resume', controller.delWantWork);                                    

 

module.exports =router;