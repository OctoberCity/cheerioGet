// 对搜索参数进行数据操作
const proxyUtil = require("../util/proxyUtil");
const cityModel = require("../model/city");


exports.getparamsByJson = async (ctx) => {
    const {
        param
    } = ctx.query; 
    const res={} 
    const sres = await proxyUtil.superproxy(ctx.config[param]);
    const cityLsit = getRequestByType(param,sres) ;
    const result = await new Promise((resolve, reject) => {
        cityModel.insertMany(cityLsit, (error, docs) => {
            if (error) {
                reject(error);
            }
            resolve(docs);
        });
    });
    if(result.length){
     res.code=1001;
     res.message=`爬取${param}成功`;
    }else{
        res.code=1001;
        res.message=`爬取${param}失败`;  
    }
    ctx.body=res;
}

//从数据库查找数据
exports.findBycode =async(ctx)=>{
    const {codes}=ctx.query;
    
}








// 缩减代码，根据传的参数获取不同的代码数据
function getRequestByType(type,sres){
    let  result;
    switch(type){
       case 'city':result=JSON.parse(sres.text).data.cityList;
       break;
       case 'psoition':result=JSON.parse(sres.text).data;
       break;
       case 'oldindustry':result=JSON.parse(sres.text).data;
       break;
    }
    return result;
    
}

 