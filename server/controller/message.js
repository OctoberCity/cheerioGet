const Redis = require("ioredis");
const config = require('./../config/config-default');
const AnyModel = require("../model/index");

const redis = new Redis(config.redis);
 


// 从redis获取联系过的人
exports.getContactList = async (ctx) => {
    // const {
    //     _id
    // } = ctx.user;
    // const newResult = [];
    // const contactrList = await redis.zrange(_id, 0, -1);
    // if (!contactrList.isArray || contactrList.length === 0)
    //     return ctx.body = {
    //         code: 1001,
    //         msg: '暂无联系人',
    //         data: null
    //     } 
    // for (let i = 0; i < contactrList.length; i++) {
    //     const hashgeall = await redis.hgetall(contactrList[i]);
    //     newResult.push(hashgeall);
    // }
    // 假数据
    const mockdata = {
        id: 1,
        avatar: 'https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=d3668cc1dc88d43ff0a996f44525b526/359b033b5bb5c9ea3aab2857df39b6003af3b32d.jpg',
        haveNewNews: Math.random() * 10 > 5 ? true : false,
        name: "大大大",
        lastNews: '这是最近消息这是最近消息这是最近消息这是最近消息这是最近消息这是最近消息这是最近消息这是最近消息这是最近消息这是最近消息这是最近消息这是最近消息这是最近消息'
    }
    const modat = [];
    for (let i = 0; i < 10; i++) {
        modat.push(mockdata);
    } 
    ctx.body = {
        code: 1001,
        data: modat,
        msg: '获取联系人成功'
    }
}


exports.getChatList = async (ctx) => {
    // const {_id} =ctx.user;
    // const {friendId} = ctx.query;
    // const anymodel = new AnyModel('message');
    // const queryoption={
    //     from :_id,
    //     to : friendId
    // };
    // const chatList= anymodel.find(queryoption);

    // 假数据
    const modat = [];
    for (let i = 0; i < 10; i++) {
        const result= Math.random() * 10 > 5 ? true : false;
        const mockdata = {
            from: result===true?'5c4bcae525d87f3070fdc3c4':'luanqibazao',
            to:result===false?'5c4bcae525d87f3070fdc3c4':'luanqibazao',
            avatar: result===true?'https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=d3668cc1dc88d43ff0a996f44525b526/359b033b5bb5c9ea3aab2857df39b6003af3b32d.jpg':'sddasd',
            type:Math.random() * 10 > 9 ? 1 : 2,
            content: '股票sb代表什么意思,指南针股票软件下载,新手股票软件,盘中买卖点提示,免费!“中国证券信息服务行业影响力企业”,三板上市,Level2数据服务商,1对1在线服务'
        }
        modat.push(mockdata);
    }
    ctx.body = {
        code: 1001,
        data: modat,
        message: '获得聊天内容列表成功'
    }
}