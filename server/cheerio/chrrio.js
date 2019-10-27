const EventEmitter = require('events');
const Redis = require("ioredis");
const Sequelize = require('sequelize');
const superagent = require('superagent');
const unique = require('node-uuid');
class Chrrio extends EventEmitter {
    constructor(redis, sequelize) {
        super();
        // init redis
        if (redis instanceof Redis) {
            this.redis = redis
        } else {
            this.redis = new Redis({
                port: redis.port,
                host: redis.host,
            });
        }
        // init mysql-sequelize
        if (sequelize instanceof Sequelize) {
            this.sequelize = sequelize
        } else {
            this.sequelize = new Sequelize(
                sequelize.database,
                sequelize.username,
                sequelize.password, {
                dialect: sequelize.dialect,
                host: sequelize.host,
                port: sequelize.port,
            });
        }


        /*** 
         *  register redis===>
         * allProxy 代理池中所有的ip代理
         * usingProxy 正在使用的代理池
         * forbidProxy  禁止使用的代理 
         ***/

        // 监听代理失效
        this.on('forbidProxy', (ip) => {

        });
    }

    // 取出可用代理
    pullProxy() {

    }

    // 取出正在使用的代理
    pullUseingProxy() {

    }

    //初始化/更新全部代理
    initAllProxy() { }


    /***
     * 关于查询条件的处理
     * https://www.zhipin.com/common/data/city.json 城市数据
     * https://www.zhipin.com/common/data/position.json 职位数据
     * 
     */
    // 获得省级集合中是否还有数据，重启时确认继续爬取
    findRedisProvinceWork() {

    }
    // 移除省级集合某个省级并销毁省级队列
    removeProvinceWork(province) { }

    // 获取某个省级中市级单位是否还有多少
    findRedisCityWork(province) {

    }






    /***
     * 业务操作
     * 
     */

    // 插入更新position 至数据库
    updatePos() {
        superagent.get('https://www.zhipin.com/common/data/position.json').end((err, res) => {
            const data = res.body.data;
            const allPosition = [];
            function fixData(parent, arr) {
                for (let i = 0; i < arr.length; i++) {
                    const id = unique();
                    allPosition.push({
                        id,
                        parents: parent,
                        code: arr[i].code,
                        name: arr[i].name
                    });  
                    if (arr[i].subLevelModelList) { 
                        fixData(id, arr[i].subLevelModelList);
                    }
                }
            }
            fixData(0, data); 
            // 插入数据库
        })
    }
    // 插入更新city 至数据库
    async   updateCity() {
        superagent.get('https://www.zhipin.com/common/data/city.json').end((err, res) => {
            const data = res.body.data;
            const allPosition = [];
            function fixData(parent, arr) {
                for (let i = 0; i < arr.length; i++) {
                    const id = unique();
                    allPosition.push({
                        id,
                        parents: parent,
                        code: arr[i].code,
                        name: arr[i].name
                    });  
                    if (arr[i].subLevelModelList) { 
                        fixData(id, arr[i].subLevelModelList);
                    }
                }
            }
            fixData(0, data); 
            // 插入数据库
        })
    }


    // 插入一页的数据至数据库
    insertOnePageInfo(sres, city, position) {
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
            infoObj.hrinfo = $element.find('.info-publis  h3 ').text().split(',');
            infoObj.hrinfo.push($element.find('.info-publis img').attr('src'));
            items.push(infoObj);
        });
        // 判断是不是有下一页
        const noNext = $('.page .next').hasClass("disabled");
        const current = $('.page .cur').html();
        //TODO批量插入数据 

        if (noNext) {// 如果没有下一页
            //  `https://www.zhipin.com/c${city}-p${position}/?page=${++current}&ka=page-${++current}`
            this.addWorkToQueue();
        }
    }


























}
module.exports = Chrrio