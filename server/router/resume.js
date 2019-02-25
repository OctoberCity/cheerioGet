//对简历的操作
const router =require('koa-router')();
const controller = require("../controller/resume");

 // 获取简历列表
 router.get('/resumeList',controller.resumelist);

// 上传简历
router.post('/uploadResume',controller.uploadResume);

// 修改简历名字
router.get('/rename',controller.renameResume);

// 删除简历
router.get('/delResume',controller.delResume);

// 预览简历
//将docx,pdf，jpg,png之类的上传，转成图片
router.get('/preViewResume',controller.preViewResume);


module.exports =router;