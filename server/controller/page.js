 const AnyModel = require("../model/index");
 const proxyUtil = require("../util/proxyUtil");
 const async = require("async");


 // 更具所选的城市开始爬取城市的数据
 exports.pushPageData = async (ctx) => {
     const {
         param,
         modelName
     } = ctx.query;
     const params = param.split(",");
     const cityCode = await getAllCode(params, modelName);
     const allPosition = await getAllCode([1], "position");
     const urls = [];
     cityCode.forEach((itemc, index) => {
         allPosition.forEach((itemp, index) => {
             urls.push('https://www.zhipin.com/c' + itemc + '-p' + itemp + '/h_' + itemc + '/?page=1&ka=page-1');
         });
     });
     // 这里做爬五个做一次暂停 
     const startnum = 0;

    //  async.mapLimit(urls, 5, async (url) => {
    //      const res = await proxyUtil.superproxy(url);
    //      return res;
    //  });
    //  while (startnum < urls.length) {
    //      const littlearr = urls.splice(startnum, startnum + 6);
    //      const promiseArr = [];
    //      for (i = 0; i < 5; i++) {
    //          promiseArr.push(proxyUtil.superproxy(littlearr[i]));
    //      }
    //      setTimeout(() => {
    //          Promise.all(promiseArr).then(cb);
    //          console.log(startnum);

    //      }, 2000);


     }




 }

 //获得参数的所有
 async function getAllCode(paramArray, modelName) {
     const anyModel = new AnyModel(modelName);
     let array = [];
     for (let i = 0; i < paramArray.length; i++) {
         const option = paramArray[i] === 1 ? {} : {
             code: Number(paramArray[i])
         };
         const param = await anyModel.find(option);
         array = array.concat(param);
     }
     array = getall(array, []);
     return array;
 }

 // 递归取循环
 function getall(params, array) {
     params.forEach((item) => {
         if (item.subLevelModelList === null) {
             array.push(item.code);
         } else {
             array = getall(item.subLevelModelList, array);
         }
     });
     return array;
 }