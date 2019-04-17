const socket = require('socket.io');
const Redis = require("ioredis");
const config = require('./../config/config-default');
const pageUtil = require("./page");
const redis = new Redis(config.redis);
let setIntervalName;

 
function socketIo(server) {
    var io = socket.listen(server);
    io.sockets.on("connection", function (socket) {

        socket.on("join", async (userId) => {
            // 用户上线添加至redis缓存，使用散列key: {userID,socketID}
            console.log(socket.id);
            //await redis.hmset('SocketUser',userId,socket.id);
        });
        /**
         * 接受并发送用户发的消息 
         * message
         * 消息类型：type 暂时两种类型 
         * 消息内容，
         * 消息发送人from  
         * 消息接收人to
         * */

        socket.on("sendMessage", async (messageObj, fn) => {
            // 判断接收方是否在线
            console.log("接收信息");
            const result = await redis.hexists('SocketUser', messageObj.to);
            const rediskey = messageObj.roleType === 1 ? `${messageObj.from }:${messageObj.to}` : `${messageObj.to }:${messageObj.from}`; // 只用一个集合去存储最新消息
            if (result === 0) {
                // 对方不在修改消息状态,用于提示用户未接受信息
                redis.hset(rediskey, 'haveNewNews', true);
                return fn({
                    code: 1001
                });
            }
            redis.hset(rediskey, 'haveNewNews', true);
            // 持久化进数据库 
            const message = new AnyModel('message');
            const insetresult = await message.insertOne(messageObj);
            // 发送消息 通过socket.id
            const tosocketId = await redis.hmget('SocketUser', messageObj.to);
            socket(tosocketId).emit('sendMessageBySocketId', messageObj);
            //返回给客户端发送消息操作是否成功
            fn({
                code: 1001
            });
        });

        /***
         * 
         * 断开连接
         */
        socket.on('disconnectUser', async (userId, fn) => {
            console.log("断开连接");
            const dd = await redis.hdel('SocketUser', userId);
            console.log(dd);
            if (dd) {
                this.$socket.emit('disconnect');
            }
            fn(null);
        });

        /**
         * 第一次加入的联系人初始化
         * 
         */
        socket.on("initUserLink", async (Obj, fn) => {
            console.log("初始化联系人");
            const date = (new Date()).getTime();
            redis.zadd(Obj.to, date, Obj.from);
            redis.zadd(Obj.from, date, Obj.to);
            return fn({
                code: 1001
            });
        });

        /** 
         * 判断是不是第一次与对方通信
         */
        socket.on("isFirstFriend", async (Obj, fn) => {
            // 判断对方和你是否联系过
            const result = await redis.zrank(Obj.from, Obj.to);
            if (result !== null && typeof result === 'number')
                return fn({
                    code: 1002
                }); //1002代表不是第一次联系 
            fn({
                code: 1001
            });
        });


        /****用户更新数据（只有一人可以更新数据isme）****/
        /**
         * 参数是以城市为单位。获取所有公司的信息，以及公司职位的消息
         */
        socket.on("beginGet", async (param, fn) => {
            const nowFinishLink = await redis.llen("searchDateCompanyList");
            if (nowFinishLink > 0) {
                return fn({
                    code: 1001,
                    data: {
                        allLinkLen: 10000,
                        nowFinishLink,
                    }
                }); 
            } 
       const getUrls = await pageUtil.getAllUrlByCity(param); 
                         await redis.lpush('searchDateCompanyList',getUrls);
            // 开始定时获取所有的linkList 
            setIntervalFun(socket); 
        });
    }); 
}

function setIntervalFun(socket) {
    setIntervalName = setInterval(() => {
        redis.rpop('searchDateCompanyList')
            .then((param) => {
                if (param == null) {
                    socket.emit('getDateIsFinish',{code:1001});
                    return clearInterval(setIntervalName);
                }
                return pageUtil.doPushOnePageDateInMD(param,redis);
            })
            .catch((err) => {
                console.log(err);
            });
    }, 30000); // 网站太快被封
}

module.exports = socketIo;