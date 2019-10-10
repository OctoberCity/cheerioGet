const Chrrio = require('./chrrio');
const redisConf = {
    host: '192.168.17.180',
    port: '6379'
}
const mysqlConf = {
    database: 'chrrio',
    username: 'root',
    password: '123456',
    host: '192.168.17.180',
    port: '3306',
    dialect: 'mysql'
}
const chrrio = new Chrrio(redisConf, mysqlConf);
let isEnd = true;
process.on('message', (info) => {
    switch (info.type) {
        case 1: // 工作做完
            isEnd = false;
            break;
    }
})
while (isEnd) {
    work();
}



function work() {


}








// process.on('uncaughtException',()=>{
//      process.send('message');
// });