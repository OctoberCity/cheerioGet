const  jwt =  require("jsonwebtoken");
const AnyModel = require("../model/index");


exports.userlogin= async(ctx)=>{
    const {password,username} = ctx.request.body;
    const anymodel =new AnyModel('user'); 
    const userResult = await anymodel.findOne({username});  
    if(userResult === null){
        //没有该用户
        ctx.body={
            code:1003,
            msg:"登录失败,没有该账户",
            data:null
        }
    }else if(userResult.password !==password){
        // 密码输出错误
        ctx.body={
            code:1003,
            msg:"登录失败,密码错误",
            data:null
        }

    }else if(userResult.password === password){
        //登陆成功 
        //生成token
        const token = jwt.sign({user:userResult}, 'tokenhjw', { expiresIn: '2h' });
        const userInfo ={
            avator:userResult.avator,
            username,
            userId:userResult._id
        }
        // 返回   
        ctx.body={
            code:1001,
            msg:"登录成功",
            data:{token,userInfo}
        }
    }
}

// 用户注册
exports.userRegister= async(ctx)=>{
    const {password,username} = ctx.request.body;
    const anymodel =new AnyModel('user'); 
    const userResult = await anymodel.insertOne({username,password}); 
    ctx.body={
        code:1001,
        msg:"注册成功",
        data:null
    };
}



