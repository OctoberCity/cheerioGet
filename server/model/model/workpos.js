var mongoose = require("mongoose");

var workposSchema = new mongoose.Schema({
    hrid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hr'
    },
    createtime: {
        type: Date,
        default: Date
    },
    pubtime: {
        type: Date,
        default: Date
    },
    status: {
        type: Number,
        default: 1 //0 诞生 1，发布，下架
    },
    name: {
        type: String
    },
    slary: {
        type: String
    },
    companyname: {
        type: String
    },
    experience: {
        type: String
    },
    diploma: {
        type: String
    },
    positioncode: {
        type: Number
    }
});






//通过草稿建造模型peoplemodule
var workposModel = mongoose.model("workpos", workposSchema);
//将这个模型暴露出去
module.exports = workposModel;