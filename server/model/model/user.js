var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    avator: {
        type: String,
        default: "https://image.baidu.com/search/detail?ct=503316480&z=undefined&tn=baiduimagedetail&ipn=d&word=%E9%BB%98%E8%AE%A4%E5%A4%B4%E5%83%8F&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=undefined&hd=undefined&latest=undefined&copyright=undefined&cs=2043830891,3717215658&os=89748969,1317275748&simid=4132705632,541145692&pn=18&rn=1&di=69740&ln=1676&fr=&fmq=1548470446423_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&is=0,0&istype=0&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=0&hs=2&objurl=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F00%2F67%2F59%2F63%2F58e89bee922a2.png&rpstart=0&rpnum=0&adpicid=0&force=undefined"
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    tel: {
        type: String
    }
});

//通过草稿建造模型peoplemodule
var userModel = mongoose.model("user", userSchema);
//将这个模型暴露出去
module.exports = userModel;