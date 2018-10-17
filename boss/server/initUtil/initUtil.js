const superagent=require("superagent");
const cheerio=require("cheerio");
const database =require("../db/database.js");
const staticData=require("./initjson.js");


//插入每个页面的信息
exports.insertOnePageInfo=url=>{ 
  superagent.get(url)
 .end(function (err, sres) {
   // 常规的错误处理
   if (err) {
     return next(err);
   } 
   console.log("-------");
   const $ = cheerio.load(sres.text);
   const items = [];
   $('.job-list li').each(function (idx, element) {
     const $element = $(element);
     const infoObj={}; 
        console.log("11111111111");
     //TODO数据还没有详细分开
    $element.find($('.info-company   em')).text(',');//添加分隔符将em标签变成','
    $element.find($('.info-primary   em')).text(',');//添加分隔符将em标签变成','
    infoObj.jobTitle=$element.find($('.job-title')).text();
    infoObj.slaryRed=$element.find($('.red')).text();
    infoObj.companyName =$element.find($('.info-company .name  a')).text();
    infoObj.companyInfo =$element.find($('.info-company   p')).text();
    infoObj.jobInfo=$element.find($('.info-primary  p')).text();
    items.push(infoObj);
   });
   //将数据插入数据库中
   database.database
   .then((db)=>{
      db
      .db("cheerio")
      .collection("jobInfo")
      .insertMany(items,(err,res)=>{
        if(err)throw err;
       //TODO 将插入条数返回，比对数目
       if(res.insertedCount===items.length){
        console.log("插入成功");
       }
      });
   }).catch((err)=>{
    console.log(err);
   });
 });
}


//循环构建  url
exports.buildURl=()=>{
// staticData.getAllCityList()
// .then((result)=>{
//   console.log(result.length);
//   const city=[];
//   result.forEach((item,index)=>{
//       item.subLevelModelList.forEach((item,index)=>{
//         city.push(item.code);
//       });
//   });
//   //返回城市数据
//   return city;
// },(err)=>{throw err})
// .then((city)=>{
//   //处理position
//  staticData.getAllPositionList()
//   .then((result)=>{ 
//   const postion=[];
//   result.subLevelModelList.forEach((item,index)=>{
//      item.subLevelModelList.forEach((item,index)=>{
//         item.subLevelModelList.forEach((item,index)=>{
//           position.push(item.code);
//         });
//       });
//   });
//  return {city:city,position:position};
//  })
//  .then((urlParams)=>{
//     console.log(urlParams.city.length);
//     console.log(urlParams.position.length);
//  })
// .catch((err)=>{console.log(err);}); 
Promise.all([staticData.getAllCityList(), staticData.getAllPositionList()]).then(function (results) {
    // console.log(results); // 获得一个Array: ['P1', 'P2']
   // console.log(results[1] instanceof  Array );
const position=[];
results[1].forEach((item,index)=>{
   item.subLevelModelList.forEach((item,index)=>{
  if(!item.subLevelModelList){
    console.log(item);
  }
      item.subLevelModelList.forEach((item,index)=>{
        position.push(item.code);
      });
    });
});

const city=[];
results[0].forEach((item,index)=>{
    item.subLevelModelList.forEach((item,index)=>{
      city.push(item.code);
    });
});

console.log("城市数量",city.length);
console.log("职位",position.length);
return {city:city,position:position};
})
//拼凑url
.then((urlParams)=>{
   //并发执行城市数量的promise,如果是并发数量太大而不能爬，改用async模块来执行，控制并发数量
   // Promise.all(cityPromise)
   // .then((err,results)=>{
   //  if(results.length===urlParams.city.length){
   //    console.log("爬取"+urlParams.city.length*urlParams.position.length+'条数据成功');
   //  }
   // });
   
   //使用直接的方法进行处理
   const url=[];
   urlParams.city.forEach((itemc,index)=>{
         urlParams.position.forEach((itemp,index)=>{
          url.push('https://www.zhipin.com/c'+itemc+'-p'+itemp+'/h_'+itemc+'/?page=1&ka=page-1');
         });
   });
   console.log("一共",url.length);
   url.forEach((item,index)=>{
    if(index===0){
          console.log(item);
    this.insertOnePageInfo(item);
        console.log(index);

   }
   });
})
.catch((err)=>{console.log(err)});

}
