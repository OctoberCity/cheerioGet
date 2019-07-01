 const process = require("process");
 const Redis = require("ioredis");
 const mongoose = require("mongoose");
 mongoose.connect('mongodb://192.168.17.180:27018/bishe2'); //docker mongo容器 
 const config = require('./../config/config-default');
 const {
     superproxy
 } = require("./proxyUtil");
 const redis = new Redis(config.redis);

 const AnyModel = require("../model/index");
 const {
     insertOnePageInfo
 } = require("./util");


 process.on("message", async (m, handle) => {
     switch (m.type) {
         case 1: // 确认发送消息
             checkGetmessage();
             break;
         case 2: // 新的订单开始
             await cheerioDataBegin(m);
             break;
         case 3: // 进程启动的时候获得程序
             cheerioDataBeginOld();
             break;
     }
 });


 function checkGetmessage() {
     process.send({
         message: '工作进程确认获得主要进程消息',
         type: 1
     });
 }
 // 当程序宕机的时候,重启的时候可以继续
 async function cheerioDataBeginOld() {
     for (let i = 0; 9 < 10; i++) {
         const provinceCode = await redis.lindex("province_position",i); 
         if(!provinceCode){
             console.log("退出了大哥");
             break;
         } 
         const provinceitem = await redis.hgetall(provinceCode);
         // 判断是不是退出
         if (provinceitem.allNum !== provinceitem.curNum) {
             // 不等于代表没有更新完毕
             const key = provinceCode.replace("pre", '');
             const params = {
                 city: key.split("_")[0],
                 position: key.split("_")[1],
             }; 
             setInterval(() => {
                 redis.rpop(key)
                     .then((result) => {
                         return superproxy(result);
                     })
                     .then((sres) => {
                         return insertOnePageInfo(sres, params.city, params.position)
                     })
                     .then((allResult) => {
                         if (!allResult.nextpage) {
                             redis.lpush(key, allResult);
                         } else {
                             // 给完成进度加1
                             if (!redis.lpup(key)) {
                                 redis.hincrby(`pre${key}`, curNum, 1);
                             }
                         }
                     });
             }, 10000);
         }
     }


 }

 // 第一次爬取的时候获得的程序
 async function cheerioDataBegin(m) {
     const params = m.params;
     const key = `${params.city}_${params.position}`;
     const cityCode = await getAllCode(params.city, "city");
     let urls = [];
     cityCode.forEach((itemc, index) => {
         urls.push(`https://www.zhipin.com/c${itemc}-p${params.position}/?page=1&ka=page-1`);
     });
     // 初始化List province数据（记录省会和职业的列表）  
     redis.lpush("province_position", `pre${city}_${position}`);
     // 初始化hashredis数据
     redis.hmset(`pre${city}_${position}`, 'allNum', 2, 'curNum', 0, 'updateDate');
     // 初始化list redis数据
     await redis.lpush(key, urls);
     setInterval(() => {
         redis.rpop(key)
             .then((result) => {
                 return superproxy(result);
             })
             .then((sres) => {
                 return insertOnePageInfo(sres, params.city, params.position)
             })
             .then((allResult) => {
                 if (!allResult.nextpage) {
                     redis.lpush(key, allResult);
                 } else {
                     // 给完成进度加1
                     if (!redis.lpup(key)) {
                         redis.hincrby(`pre${key}`, curNum, 1);
                     }
                 }
             });
     }, 10000);
 }



 //获得参数的所有
 async function getAllCode(params, modelName) {
     const anyModel = new AnyModel(modelName);
     let array = [];
     const option = {
         code: Number(params)
     };
     const param = await anyModel.find(option);
     array = getall(param, []);
     return array;
 }

 // 递归取循环
 function getall(citydata, array) {
     citydata.forEach((item) => {
         if (item.subLevelModelList === null) {
             array.push(item.code);
         } else {
             array = getall(item.subLevelModelList, array);
         }
     });
     return array;
 }