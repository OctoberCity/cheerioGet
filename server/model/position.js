var mongoose=require("mongoose"); 

var positionSchema=new mongoose.Schema({ 
    code:{type:Number},
    name:{type:String},
    subLevelModelList:{type:Array},
    firstChar:{type:String},
    pinyin:{type:String},
    rank:{type:String}
});
 
//通过草稿建造模型peoplemodule
var positionModel=mongoose.model("position",positionSchema);
//将这个模型暴露出去
module.exports=positionModel;