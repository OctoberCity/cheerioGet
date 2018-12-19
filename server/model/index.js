// 对于model,默认实现封装promise的方法，各个model实例化需要继承（extends）此类，在用有基本类之后，对于所需的其他方法在继承类中实现

class  anyModel {
    constructor(model){ 
      this.model =model;
    }
    getModel(){
        const schema=require(`./${this.name}`);
        var oldindustryModel=mongoose.model("oldinsustry",schema);
        return oldindustryModel;
    }
    findone(option){
         return new Promise((resolve,reject)=>{
             this.model.findOne(option,(error,doc)=>{
                 if(error){
                     reject(error);
                 }
                 resolve(doc);
             });
         });
    }
   insertMany(option){
    return new Promise((resolve,reject)=>{
        this.model.insertMany(option,(error,doc)=>{
            if(error){
                reject(error);
            }
            resolve(doc);
        });
    });
   }
}

module.exports=anyModel;