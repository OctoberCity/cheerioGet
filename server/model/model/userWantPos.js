var mongoose = require("mongoose");

var userWantPosSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    citycode:{
        type: Number
    },
    slary: {
        type: Object //start,end
    },
    industry: {
        type: String
    },
    position: {
        type: Number
    }
});
 
var userWantPosModel = mongoose.model("userwantpos", userWantPosSchema);
//将这个模型暴露出去
module.exports = userWantPosModel;