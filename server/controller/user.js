// const  jwt =  require("Jsonwev");
const AnyModel = require("../model/index");


exports.userlogin= async(ctx)=>{
    const {password,username} = ctx.body;
    const anymodel =new AnyModel('user');
    const userResult = await anymodel.find({username});
    if(userResult === null){
        //没有该用户
        ctx.body={}
    }else if(userResult.password !==password){
        // 密码输出错误
    }else if(userResult.password === password){
        //登陆成功
        //生成token
        //存redis
        // 返回
    }


}