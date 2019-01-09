module.exports = {
    financing: {
        paramType: '融资阶段',
        selOnlyOne: false,
        data: ['未融资', '天使轮', 'A轮', 'B轮', 'C轮', 'D轮以及以上', '已上市', '不需要融资']
    },
    scale: {
        paramType: '人员规模',
        selOnlyOne: false,
        data: ['0-20', '20-99人', '100-499人', '500-999人', '1000-9999人', '10000人以上']
    },
    education: {
        paramType: '学历',
        selOnlyOne: false,
        data: ['初中以及以下', '中专/中绩效', ' 高中', '大专', '本科', '硕士', '博士']
    },
    experience: {
        paramType: '经验',
        selOnlyOne: false,
        data: ['应届毕业生', '一年以下', '1-3年', '3-5年', '5-10年', '10年以上']
    },
    slary:{
        paramType: '薪水',
        selOnlyOne: true,
        data: ['3k以下', '3-5k', '5-10k', '10-20k', '20-50k', '50k以上']
    }
}