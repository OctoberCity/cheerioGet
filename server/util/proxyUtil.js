const superagent = require("superagent");
// 处理代理
exports.superproxy = (url) => { 
    return new Promise((resolve, reject) => {
        superagent.get(url)
            .end(function (err, sres) {
                if (err) {
                    resolve(err); 
                } 
                resolve(sres);
            });
    });
}

//将传入的方法处理成promise
exports.promiseProxy =(fun)=>{
    return new Promise((resolve,reject) =>{
         const result=fun();
         resolve(result); 
    });
}