const koa =require("koa");
const staticData= require("./initUtil/initjson.js");
const database =require("./db/database.js");
const util = require("./initUtil/initUtil.js");

const app =new koa();
// staticData.cityList();
// staticData.postionList();
// staticData.oldindustryList();

//清除集合
// database.cleanCollection();
 
//测试插入每页数据到数据库
// const  url ="https://www.zhipin.com/c101210100/h_101210100/?query=nodejs&page=1&ka=page-1";

// util.insertOnePageInfo(url);


util.buildURl();




app.listen(13126);