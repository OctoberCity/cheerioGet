 const AnyModel = require("../model/index");
 const {
     insertOnePageInfo
 } = require('../util/util');
 const {
     superproxy
 } = require("../util/proxyUtil");


 // 更具所选的城市开始爬取城市的数据
 exports.pushPageData = async (ctx) => {
     const {
         city,
         position
     } = ctx.query; 
     const params = {
         city,
         position
     };
     //启动爬取进程
     ctx.workprocess.send({
         message: '干活了',
         type: 2,
         params
     });
     ctx.body = {
         code: 1001
     };
     //对所有的urls进行链式处理boss直聘对访问ip限制非常小，所以使用一个处理完之后在处理的方法，以后进行修改
     //  const finallResult = urls.reduce(function(result,url){
     //      num++;
     //      return result.then( superproxy(url).then((sres)=>{
     //      return  insertOnePageInfo(sres,paramlist[num].city,paramlist[num].position);   
     //     }));
     // },Promise.resolve());
     //  ctx.body=urls;
 }





 // 判断城市是热门还是非热门,返回url
 //  function geturl(citycode,positioncode,hotcitylist){
 //    if(hotcitylist.some((item)=>{return item === citycode})){
 //      return 'https://www.zhipin.com/c' + itemc + '-p' + itemp + '/h_' + itemc + '/?page=1&ka=page-1';

 //    }
 //      return `https://www.zhipin.com/c${itemc}-p${itemp}/h_${itemc}/?page=1&ka=page-1`;

 //  }