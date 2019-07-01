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
         case 2: // 爬取消息根据城市 
             await cheerioDataBegin(m);
             break;
     }
 });


 function checkGetmessage() {
     process.send({
         message: '工作进程确认获得主要进程消息',
         type: 1
     });
 }

 async function cheerioDataBegin(m) { 
     const params = m.params;
     const cityCode = await getAllCode(params.city, "city"); 
     let urls=[];
     cityCode.forEach((itemc, index) => { 
         urls.push(`https://www.zhipin.com/c${itemc}-p${params.position}/?page=1&ka=page-1`);
     });
     const key = `${params.city}_${params.position}`;
     await redis.lpush(key,urls);
     setInterval(() => { 
        redis.rpop(key)
        .then((result)=>{
             return superproxy(result);
        })
        .then((sres)=>{ 
            return insertOnePageInfo(sres,params.city,params.position)
        })
        .then((allResult)=>{
            console.log(allResult);
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