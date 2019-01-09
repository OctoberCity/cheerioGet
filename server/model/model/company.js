var mongoose = require("mongoose");

var companySchema = new mongoose.Schema({
    companyname: {
        type: String
    },
    companyarea: {
        type: String
    },
    scale: {
        type: String
    },
    financing: {
        type: String
    },
    industry: {
        type: String
    },
    citycode:{
        type:Number
    },
    avatar: {
        type: String,
        default:'https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E8%9F%91%E8%9E%82%E6%81%B6%E9%9C%B8&hs=2&pn=2&spn=0&di=21441210670&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&ie=utf-8&oe=utf-8&cl=2&lm=-1&cs=583139993%2C1542534619&os=372804666%2C2237542150&simid=4277877424%2C836733770&adpicid=0&lpn=0&ln=30&fr=ala&fm=&sme=&cg=&bdtype=0&oriquery=%E8%9F%91%E8%9E%82%E6%81%B6%E9%9C%B8&objurl=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Fface%2F5109dbc1c33e32e2080e60b6f7dbef2fb59d9423.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3Bktstktst_z%26e3Bv54AzdH3Fet1j5AzdH3Fwe8a0lb0dbAzdH3F&gsm=0&islist=&querylist='
    }
});

//通过草稿建造模型peoplemodule
var companyModel = mongoose.model("company", companySchema);
//将这个模型暴露出去
module.exports = companyModel;