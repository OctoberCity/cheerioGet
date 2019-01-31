const router =require('koa-router')();
const user=require('./user');
const cheerioParam=require('./cheerioParam');
const cheerio=require('./cheerio');
const position=require('./position'); 
const resume=require('./resume'); 


router.use('/user',user.routes(),user.allowedMethods());
router.use('/cheerioParam',cheerioParam.routes(),cheerioParam.allowedMethods());
router.use('/cheerio',cheerio.routes(),cheerio.allowedMethods());
router.use('/position',position.routes(),position.allowedMethods());
router.use('/resume',resume.routes(),position.allowedMethods());



module.exports = router;