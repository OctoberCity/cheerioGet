 const AnyModel = require("../model/index"); 
 const  {insertOnePageInfo} =require('../util/util');
 const   {superproxy} =require("../util/proxyUtil");


 // 更具所选的城市开始爬取城市的数据 ,
 exports.pushPageData = async (ctx) => {
     const {
         param,
         modelname
     } = ctx.query;
     let num =0;
     const params = param.split(","); 
     //获取热门城市对象
    //  const hotcity = await new AnyModel('city').find({isHot:1}); 
     const cityCode = await getAllCode(params, modelname); 
     const allPosition = await getAllCode([1], "position");
     const urls = [];
     const paramlist =[];
     cityCode.forEach((itemc, index) => {
         allPosition.forEach((itemp, index) => {
            paramlist.push({city:itemc,position:itemp});
             urls.push(`https://www.zhipin.com/c${itemc}-p${itemp}/?page=1&ka=page-1`);
         });
     });
     ctx.body=urls;
     //对所有的urls进行链式处理boss直聘对访问ip限制非常小，所以使用一个处理完之后在处理的方法，以后进行修改
    //  const finallResult = urls.reduce(function(result,url){
    //      num++;
    //      return result.then( superproxy(url).then((sres)=>{
    //      return  insertOnePageInfo(sres,paramlist[num].city,paramlist[num].position);   
    //     }));
    // },Promise.resolve());
    //  ctx.body=urls;
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


 // 判断城市是热门还是非热门,返回url
//  function geturl(citycode,positioncode,hotcitylist){
//    if(hotcitylist.some((item)=>{return item === citycode})){
//      return 'https://www.zhipin.com/c' + itemc + '-p' + itemp + '/h_' + itemc + '/?page=1&ka=page-1';

//    }
//      return `https://www.zhipin.com/c${itemc}-p${itemp}/h_${itemc}/?page=1&ka=page-1`;

//  }