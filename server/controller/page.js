const cityModel = require("../model/city");
const AnyModel = require("../model/index");


exports.pushPageData = async (ctx) => {
    const {
        param
    } = ctx.query;
    const params = param.split(",");
    const anyModel = new AnyModel(cityModel);
    let array = [];
    for (let i = 0; i < params.length; i++) {
        console.log(params[i]);
        const city = await anyModel.findone({
            code: Number(params[i])
        });
        array.push(city);
    } 
    //取得了以省为基础的城市
    array = getall(array, []); 


}

// 递归取循环
function getall(params, array) {
    params.forEach((item) => {
        if (item.subLevelModelList === null) {
            array.push(item.code);
        } else { 
            array = getall(item.subLevelModelList, array);
        }
    });
    return array;
}