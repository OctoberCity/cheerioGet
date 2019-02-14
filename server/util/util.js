const cheerio = require("cheerio");
const AnyModel = require("../model/index");



//插入每个页面的信息职位的信息
exports.insertOnePageInfo = async (sres,city,position) => {
    const $ = cheerio.load(sres.text);
    const items = [];
    $('.job-list li').each(function (idx, element) {
        const $element = $(element);
        const infoObj = {};
        //TODO数据还没有详细分开
        $element.find($('.info-company   em')).text(','); //添加分隔符将em标签变成','
        $element.find($('.info-primary   em')).text(','); //添加分隔符将em标签变成','
        $element.find($('.info-publis   em')).text(','); //添加分隔符将em标签变成','
        infoObj.name = $element.find($('.job-title')).text();
        infoObj.slary = $element.find($('.red')).text();
        infoObj.companyname = $element.find($('.info-company .name  a')).text();
        infoObj.companyInfo = $element.find($('.info-company   p')).text().split(',');
        infoObj.jobInfo = $element.find($('.info-primary  p')).text().split(',');
        infoObj.hrinfo =$element.find('.info-publis  h3 ').text().split(',');
        infoObj.hrinfo.push($element.find('.info-publis img').attr('src'));
        items.push(infoObj);
    }); 
    const workposModel = new AnyModel('workpos');
    const hrModel = new AnyModel('hr');
    const companyModel = new AnyModel('company');
    const datalist = [];
    items.forEach(async(item) => { 
        datalist.push(insertCheerioData(item,workposModel,hrModel,companyModel,city,position));
     });
     return Promise.all(datalist);
}
    // 插入数据库操作
function insertCheerioData(item,workposModel,hrModel,companyModel,city,position){ 
        return  companyModel.insertMany({
            companyname: item.companyname,
            companyarea: item.jobInfo[0],
            scale:item.companyInfo[2],
            financing:item.companyInfo[1],
            industry:item.companyInfo[0],
            citycode:city 
        })
        .then((companyobj)=>{
           return  hrModel.insertMany({
                companyid:companyobj[0]._id,
                hrname:item.hrinfo[0],
                hravatar:item.hrinfo[2],
                hrposition:item.hrinfo[1]
            });
        })
        .then((hrobj)=>{
           return   workposModel.insertMany({
                hrid:hrobj[0]._id, 
                name:item.name,
                slary:item.slary,
                experience:item.jobInfo[1],
                diploma:item.jobInfo[1],
                positioncode:position

            }); 
        }); 
    }
