 
const koaJwt = require("jwt-simple");
//解析用户的信息将其放入ctx中
module.exports = async (ctx,next)=>{
    const unlessPath=["/user/login","/user/register","cheerioParam","cheerio"];  
     if(unlessPath.every((item)=>{return ctx.path.indexOf(item)<0})){ 
        const token = ctx.header.authorization;
        const payload=koaJwt.decode(token.split(' ')[1], "tokenhjw");
        ctx.user=payload.user;
    } 
    await next(); 
}