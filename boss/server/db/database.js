const mongodb=require("mongodb");
const configDb=require("../config/initjson.js");
//连接mongodb数据库
const MongoClient = require('mongodb').MongoClient;
exports.database= new Promise((resolve,reject)=>{
MongoClient.connect(configDb.initdb.url, function(err, db) { 
   if (err){ 
  	 reject(err);
  }
  if(db){
  	resolve(db);
  	  console.log("数据库已经连接!");
  }
}); 
});


//清空数据库，作为一个请求处理，达到更新数据的目的


exports.cleanCollection=()=>{
	this.database
	.then((db)=>{
      const database=db.db("cheerio");
      database.collection("city").drop((err,isDelete)=>{
      	if(err)throw err;
      	if(isDelete){
      		console.log("删除集合成功");
      		// return database; 
      	}
      });
      return db;
	})
	.then((db)=>{
      const database=db.db("cheerio");
      database.collection("position").drop((err,isDelete)=>{
      	if(err)throw err;
      	if(isDelete){
      		console.log("删除集合成功");
      	}
      });
      return db; 
	})
	.then((db)=>{
      const database=db.db("cheerio");
      database.collection("oldindustry").drop((err,isDelete)=>{
      	if(err)throw err;
      	if(isDelete){
      		console.log("删除集合成功");
      	  db.close();
      	}
      });
	})
	.catch((err)=>{
		console.log(err);
        throw err;
	});
} 



