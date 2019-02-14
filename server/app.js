const koa = require("koa");
const app = new koa();
const cors = require("koa-cors");
const koaBody = require('koa-body');
const koaJwt =require("koa-jwt");
const router = require("../server/router/z-index");
const verify =require("./middleware/verify");
const mongoose = require("mongoose");
const config = require("./config/config-default");
mongoose.connect('mongodb://localhost:27017/cheerio');
// 错误处理
app.use((ctx, next) => {
    return next().catch((err) => { 
        if(err.status === 401){ 
            ctx.body = {code:1004,msg:"请重新登录",data:null};
        }else{
            throw err;
        }
    })
});
app.use(cors());
app.use(koaJwt({
    secret: 'tokenhjw'
}).unless({
    path: ["/user/login","/user/register","/cheerioParam/upParams","/cheerio/upParams"]
}));

//解析header,将用户信息解析
app.use(verify);





app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M 文件从request.files
    }
}));
app.use(async (ctx, next) => {
    ctx.config = config;
    await next();
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(7001, () => {
    console.log("已经启动了");
});