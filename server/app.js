const koa = require("koa");
const app = new koa();
const cors = require("koa-cors");
const koaBody = require('koa-body');
const koaJwt = require("koa-jwt");
const router = require("../server/router/z-index");
const verify = require("./middleware/verify");
const mongoose = require("mongoose");
const config = require("./config/config-default");
const chat = require("./util/chat");
const process = require("child_process");
const workprocess = process.fork("./util/chrriomainprocess.js");

const Redis = require("ioredis"); 
const redis = new Redis(config.redis);

mongoose.connect('mongodb://192.168.17.180:27018/bishe2'); //docker mongo容器
const socketIo =require("./util/socketIo");
mongoose.connect('mongodb://localhost:27017/bishe2');
// 错误处理
app.use((ctx, next) => {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.body = {
                code: 1004,
                msg: "请重新登录",
                data: null
            };
        } else {
            throw err;
        }
    })
});
app.use(cors());
// app.use(koaJwt({
//     secret: 'tokenhjw'
// }).unless({
//     path: ["/user/login","/user/register","/cheerioParam/upParams","/cheerio/upParams"]
// }));

// //解析header,将用户信息解析
// app.use(verify);

app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M 文件从request.files
    }
}));
app.use(async (ctx, next) => {
    ctx.config = config;
    ctx.workprocess = workprocess;
    ctx.redis =redis;
    await next();
});

app.use(router.routes());
app.use(router.allowedMethods());

const server = app.listen(7001, () => {
    console.log("已经启动了");
});


// //执行聊天监听



// 与子进程同信 
workprocess.on("message",(m) => {
    console.log("子进程已经成功登陆");
});

//启动继续爬取工作 
workprocess.send({
    message: '有新的点单来了',
    type: 3
}); 
 
socketIo(server);
