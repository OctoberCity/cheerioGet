 const AnyModel = require("../model/index"); 
 const  {insertOnePageInfo} =require('./util');
 const   {superproxy} =require("./proxyUtil");


 // 更具所选的城市开始爬取城市的数据 ,
 exports.getAllUrlByCity = async (city) => { 
     const cityCode = await getAllCode(city,  "city");  
     const allPosition = await getAllCode([1], "position");
     const urls = [];
     const paramlist =[];
     cityCode.forEach((itemc, index) => {
         allPosition.forEach((itemp, index) => {
            paramlist.push({city:itemc,position:itemp});
             urls.push(`https://www.zhipin.com/c${itemc}-p${itemp}/?page=1&ka=page-1`);
         });
     }); 
     return urls;
 }

 exports.doPushOnePageDateInMD= async (url,redis)=>{
    return  superproxy(url).then((sres)=>{
            // 判断此种查询情况有多少页,这个方法没写
            const haveOtherPage = judgeHaveOtherPage(sres);
            if(haveOtherPage>1 && url.indexOf('page=1')>0){
                const OtherUrls =[] ;
                 for(let i =2 ;i <haveOtherPage ;i++ ){
                      OtherUrls.push(url.replace('page=1&ka=page-1',`page=${i}&ka=page-${i}`));     
                 }
              await redis.lpush(OtherUrls);   
            }
            //开始插入数据
            await insertOnePageInfo(sres); 
            });
 }


 //获得参数的所有
 async function getAllCode(paramArray, modelName) {
     const anyModel = new AnyModel(modelName); 
     let array = [];
     for (let i = 0; i < paramArray.length; i++) {
         console.log("limian");
         console.log(i);
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


 // 判断城市是热门还是非热门,返回url
//  function geturl(citycode,positioncode,hotcitylist){
//    if(hotcitylist.some((item)=>{return item === citycode})){
//      return 'https://www.zhipin.com/c' + itemc + '-p' + itemp + '/h_' + itemc + '/?page=1&ka=page-1';

//    }
//      return `https://www.zhipin.com/c${itemc}-p${itemp}/h_${itemc}/?page=1&ka=page-1`;

//  }