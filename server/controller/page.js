// 更具所选的城市开始爬取城市的数据
exports.pushPageData = async (ctx) => {
    const {
        city,
        position
    } = ctx.query;
    const params = {
        city,
        position
    };
    const hashdata = await ctx.redis.hlen(`pre${city}_${position}`);
   await ctx.redis.lpush("province_position", `pre${city}_${position}`);
    if (hashdata === 0) {  
        // 启动爬取进程
         ctx.workprocess.send({
             message: '有新的点单来了',
             type: 2,
             params
         }); 
    } 
    ctx.body = {
        code: 1001,
        isExxits:true // 可以开始使用socket读取进度
    };
}