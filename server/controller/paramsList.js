// 对搜索参数进行数据操作
const proxyUtil = require("../util/proxyUtil");  
const AnyModel = require("../model/index");
const configparam =require("../config/config-param");




// 爬取配置参数
exports.getparamsByJson = async (ctx) => {
    const {
        param
    } = ctx.query; 
    const res={} 
    const anyModel = new AnyModel(param);
    const sres = await proxyUtil.superproxy(ctx.config[param]); 
    const paramList = getRequestByType(param,sres); 
    // let citylist2=0 ;
    // // 如果是热门城市ishot字段设置1
    // if(param === 'city'){ 
    //     citylist2 =paramList.hotcity.map((item)=>{
    //             item.isHot=1; 
    //         return  item;
    //     });
    //     citylist2=citylist2.concat(paramList.city);
    // }
    const result =  await anyModel.insertMany(paramList);
    if(result.length){
     res.code=1001;
     res.message=`爬取${param}成功`;
     res.data=result;
    }else{
        res.code=1001;
        res.message=`爬取${param}失败`;  
    }
    ctx.body=res;
}
 


// 取得city , position ,oldindustry，页面获取参数要用
exports.searchDBParams =async(ctx)=>{
    const {
        param
    } = ctx.query;  
    const anyModel = new AnyModel(param); 
    const alldata = await anyModel.find();
    ctx.body={data:alldata,msg:"获取参数成功",code:1001};
}


// 获取配置文件，薪资，规模，融资等情况参数列表
exports.searchParams =async(ctx)=>{
    ctx.body = {data:configparam,msg:"获取参数成功",code:1001};
}

 
// 缩减代码，根据传的参数获取不同的代码数据
function getRequestByType(type,sres){
    let  result;
    switch(type){
       case 'city':
    //    result={hotcity:0,city:0};
    //    result.hotcity=JSON.parse(sres.text).data.hotCityList;
       result=JSON.parse(sres.text).data.cityList; 
       break;
       case 'position':result=JSON.parse(sres.text).data;
       break;
       case 'oldindustry':result=JSON.parse(sres.text).data;
       break;
    }
    return result;
    
}
