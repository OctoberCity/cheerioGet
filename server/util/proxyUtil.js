const superagent = require("superagent");
// 处理代理
exports.superproxy = (url) => {
    return new Promise((resolve, reject) => {
        superagent.get(url)
            .end(function (err, sres) {
                if (err) {
                    resolve(err);

//                    reject(err);
                } 
                resolve(sres);
            });
    });
}