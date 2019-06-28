const socket = require('socket.io');
const Redis = require("ioredis");
const config = require('./../config/config-default');
const redis = new Redis(config.redis);




function chat(server) {
    var io = socket.listen(server);
    io.sockets.on("connection", function (socket) {

        socket.on("join", async (userId) => {
            // 用户上线添加至redis缓存，使用散列key: {userID,socketID}
            console.log(socket.id);
            // await redis.hmset('SocketUser',userId,socket.id);
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
        socket.on('disconnectUser', async (userId) => {
            const dd = await redis.hdel('SocketUser', userId);
            if (dd) {
                this.$socket.emit('disconnect');
            }
        });

        /**
         * 第一次加入的联系人初始化
         * 
         */
        socket.on("initUserLink", async (Obj, fn) => {
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
    });

}

module.exports = chat;