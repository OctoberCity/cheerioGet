var mongoose = require("mongoose");

var citySchema = new mongoose.Schema({
    code: {
        type: Number
    },
    name: {
        type: String
    },
    subLevelModelList: {
        type: Array
    },
    firstChar: {
        type: String
    },
    pinyin: {
        type: String
    },
    rank: {
        type: String
    },
    isHot :{ //是否是热门城市
        type: Number,
        default:0
    }
});

//通过草稿建造模型peoplemodule
var cityModel = mongoose.model("city", citySchema);
//将这个模型暴露出去
module.exports = cityModel;