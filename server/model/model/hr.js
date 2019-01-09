var mongoose = require("mongoose");

var hrSchema = new mongoose.Schema({
    companyid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company'
    },
    hrname: {
        type: String
    },
    hravatar: {
        type: String
    },
    hrposition:{
         type:String 
    }
});

//通过草稿建造模型peoplemodule
var hrModel = mongoose.model("hr", hrSchema);
//将这个模型暴露出去
module.exports = hrModel;