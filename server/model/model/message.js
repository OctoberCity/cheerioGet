var mongoose=require("mongoose"); 

var  messageSchema=new mongoose.Schema({ 
    from:{type:String},
    to:{type:String},
    type:{type:Number},
    content:{type:String},
    createTime:{ 
        type: Date,
        default: Date
    }
});
 
//通过草稿建造模型messageModel
var messageModel=mongoose.model("message",messageSchema);
//将这个模型暴露出去
module.exports=messageModel;
