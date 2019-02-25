const fs = require('fs');
const path = require('path');
const AnyModel = require("../model/index");
const anymodel = new AnyModel('resume');



exports.resumelist = async (ctx) => {
    //  const {
    //      userId
    //  } = ctx.user;
    //  const resumelist = await anymodel.find({
    //      userid: userId,
    //      state:1
    //  });
    const data = [{
        resumeName: 'node.js简历',
        resumeSize: '10kb',
        resumeType: 1,
        uploadTime: '2017-18-19 10:12:12',
        id: 'sdsdadadadadada'
    }, {
        resumeName: 'node.js简历',
        resumeSize: '10kb',
        resumeType: 1,
        uploadTime: '2017-18-19 10:12:12',
        id: 'sdsdadadadadada'
    }];
    ctx.body = {
        code: 1001,
        msg: '获得简历信息成功',
        data
    };
}

exports.uploadResume = async (ctx) => {
    const file = ctx.request.files.file;
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    let filePath = __dirname+ `../../${file.name}`;
    const upStream = fs.createWriteStream(filePath);
    reader.pipe(upStream);
    return ctx.body = {
        code: 1001,
        msg: '简历上传成功',
        data:null
    };

}
exports.renameResume = async (ctx) => {
    const {
        userId
    } = ctx.user;
    const {
        resumeId,
        newResumeName
    } = ctx.request.body;
    const upResult = await anymodel.update({
        _id: resumeId
    }, {
        resumeName: newResumeName
    });
    console.log(upResult);
    ctx.body = {
        code: 1001,
        msg: '修改成功',
        data: null
    };
}
exports.delResume = async (ctx) => {
    const {
        resumeId
    } = ctx.request.body;
    const upResult = await anymodel.update({
        _id: resumeId
    }, {
        state: 0
    });
    console.log(upResult);
    ctx.body = {
        code: 1001,
        msg: '删除成功',
        data: null
    };
}
exports.preViewResume = async (ctx) => {

}