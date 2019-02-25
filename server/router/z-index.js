const router =require('koa-router')();
const user=require('./user');
const cheerioParam=require('./cheerioParam');
const cheerio=require('./cheerio');
const position=require('./position'); 
const resume=require('./resume'); 
const message=require('./message'); 


router.use('/user',user.routes(),user.allowedMethods());
router.use('/cheerioParam',cheerioParam.routes(),cheerioParam.allowedMethods());
router.use('/cheerio',cheerio.routes(),cheerio.allowedMethods());
router.use('/position',position.routes(),position.allowedMethods());
router.use('/resume',resume.routes(),resume.allowedMethods());
router.use('/message',message.routes(),message.allowedMethods());



module.exports = router;