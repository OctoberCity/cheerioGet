 const process = require("process"); 
 const Redis = require("ioredis");
 const config = require('./../config/config-default');
 const {insertOnePageInfo} =  require("./util");
 const redis = new Redis(config.redis);
 
 process.on("message", (m) => {
     console.log("来自父亲的痛楚", m);
     switch (m.type) {
         case 1: // 确认发送消息
             checkGetmessage();
             break;
         case 2: // 爬取消息根据城市
             cheerioDataBegin(m);
     }

 });

 function checkGetmessage() {
     process.send({
         message:'工作进程确认获得主要进程消息',
         type:1
     });
 }

 function cheerioDataBegin() {
     
  }