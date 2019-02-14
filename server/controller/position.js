/**
 * 该模块是对职位操作
 */
const proxyUtil = require("../util/proxyUtil");
const util = require("../util/util");
const AnyModel = require("../model/index");



/**
 * 搜取职位的方法,先请求boss官网
 * param:city  position
 * 暂时根据 城市 以及职业来确定  测试100114：node.js  101210100杭州
 * */
exports.searchPosition = async (ctx) => {
    const {
        city,
        position,
    } = ctx.query;
    const anymodel = new AnyModel('workpos');
    b 
    //取数据库的数据
    const mianoption = {
        positioncode: position
    };
    const popoption = {
        path: 'hrid', 
        populate: {
            path: 'companyid',
            match: {
                citycode: city
            }
        }
    };
    const result = await anymodel.findByPopulate(mianoption, popoption)
    const newresult = result.map((item) => {
        // 解构赋值
        const {
            name: name,
            slary: slary,
            hrid: {
                companyid: {
                    companyname
                }
            },
            hrid: {
                companyid: {
                    financing
                }
            },
            hrid: {
                companyid: {
                    companyarea
                }
            },
            experience,
            diploma,
            hrid: {
                hravatar
            },
            hrid: {
                hrname
            }
        } = item;
        const newitem = {
            name,
            slary,
            companyname,
            financing,
            hravatar,
            hrname,
            requires: {
                companyarea,
                experience,
                diploma,
            }
        };
        return newitem;

    });
    const res={data:newresult,msg:"获取参数成功",code:1001}
    ctx.body = res; 
}