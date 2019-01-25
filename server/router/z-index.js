const router =require('koa-router')();
const user=require('./user');
const cheerioParam=require('./cheerioParam');
const cheerio=require('./cheerio');
const position=require('./position'); 

router.use('/',user.routes(),user.allowedMethods());
router.use('/cheerioParam',cheerioParam.routes(),cheerioParam.allowedMethods());
router.use('/cheerio',cheerio.routes(),cheerio.allowedMethods());
router.use('/position',position.routes(),position.allowedMethods());



module.exports = router;