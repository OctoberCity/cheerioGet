const EventEmitter = require('events');
const Redis = require("ioredis");
const Sequelize = require('sequelize');
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

        // 取出可用代理
        async function pullProxy() {}

        // 取出正在使用的代理
        async function pullUseingProxy() {

        }

        //初始化/更新全部代理
        async function initAllProxy() {}


        /***
         * 关于查询条件的处理
         * https://www.zhipin.com/common/data/city.json 城市数据
         * https://www.zhipin.com/common/data/position.json 职位数据
         * 
         */

        // 添加需要爬取的条件至队列
        async function addWorkToQueue() {

        }
        // 获取需要爬取的条件至队列
        async function getWorkToQueue() {}
        // 查询某条件下是否还有任务
        async function checkfinish() {
            
        }





        /***
         * 业务操作
         * 
         */

        // 插入更新position 至数据库
        async function updatePos() {

        }
        // 插入更新city 至数据库
        async function updateCity() {

        }


        // 插入一页的数据至数据库
        async function insertOnePageInfo(sres, city, position) {
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
            // 批量插入数据 
            if (!noNext) {
                //  `https://www.zhipin.com/c${city}-p${position}/?page=${++current}&ka=page-${++current}`
                this.addWorkToQueue();
            }
        }




















    }





}
module.exports = Chrrio