/**
 * 该模块是与前端交互，展现现在某城市爬取的进度
 */
const socket = require('socket.io');
const Redis = require("ioredis");
const config = require('./../config/config-default');
const redis = new Redis(config.redis);




function processNum(server) {
    var io = socket.listen(server);
    io.sockets.on("connection", function (socket) {
 
        socket.on("sendMessage", async (messageObj, fn) => {
            // 根据传递的参数，判断爬取数量的进度
            const city = messageObj.city;
            
             
        });

    });

}

module.exports = processNum;