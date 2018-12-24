// 对搜索参数进行数据操作
const proxyUtil = require("../util/proxyUtil");  
const AnyModel = require("../model/index");




// 爬取配置文件
exports.getparamsByJson = async (ctx) => {
    const {
        param
    } = ctx.query; 
    const res={} 
    const anyModel = new AnyModel(param);
    const sres = await proxyUtil.superproxy(ctx.config[param]); 
    const cityLsit = getRequestByType(param,sres) ;
    const result =  await anyModel.insertMany(cityLsit);
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
exports.findOneBycode =async(ctx)=>{
     const {codes}=ctx.query;
     const anyModel = new AnyModel(cityModel);
     const result =  await anyModel.findone();


}


// 取得city , position ,oldindustry，页面获取参数要用
exports.searchParams =async(ctx)=>{
    const {
        param
    } = ctx.query; 
    const anyModel = new AnyModel(param); 
    const alldata = await anyModel.findone();
    ctx.body=alldata;
}

 
// 缩减代码，根据传的参数获取不同的代码数据
function getRequestByType(type,sres){
    let  result;
    switch(type){
       case 'city':result=JSON.parse(sres.text).data.cityList;
       break;
       case 'position':result=JSON.parse(sres.text).data;
       break;
       case 'oldindustry':result=JSON.parse(sres.text).data;
       break;
    }
    return result;
    
}
