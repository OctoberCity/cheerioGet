# cheerioGet

#### 项目介绍
爬取boss直聘的数据，前后分离，前台使用vue全家桶，后台使用koa,部署使用docker

#### 使用说明

本项目采用前后台分离，前台项目在boss,后台项目在server中

1. 启动后台项目
> cd server
> node run start

2. 启动后台项目
> cd boss
> node run dev

3. 因为加了校验，暂时没写注册功能，可将 校验删除。
- 前端代码校验注释,在router/index.js将路由守卫注释
- 后端代码校验注释，在app.js jwt校验部分

 


#### 关于查询连接
https://www.zhipin.com/job_detail/?query=node.js&scity=100010000&industry=&position=

- 获取首页，城市列表(全国级城市)
> https://www.zhipin.com/common/data/city.json

- 获取首页职位类型列表，包括一，二，三等数据
> https://www.zhipin.com/common/data/position.json

- 获取首页职称分类列表数据（行业）
> https://www.zhipin.com/common/data/oldindustry.json


###### 首页搜索框页面搜索链接(四个查询条件，query:查询内容，scity：城市，industry:行业，postion:职能定位，其中query查询职能以及公司)
> https://www.zhipin.com/job_detail/?query=node.js&scity=101010100&industry=&position=(搜索框加了查询内容node.js)
> https://www.zhipin.com/job_detail/?query=+&scity=101210100&industry=&position=100114(搜索框没加查询东西)
> https://www.zhipin.com/c101210100-p100114/h_101210100/?page=2&ka=page-next(点击下一页，page也跟着变,热门职业)。
> https://www.zhipin.com/c101210100-p100114/h_101210100/?page=2&ka=page-next(点击下一页，page也跟着变,热门职业)。


###### 思路
获取了三种资源（city,position,industry）之后，组装成如下链接方式，page和ka=page-next的两个分页参数暂时不管，将此链接作为一个大的并发请求，每次多个，直到city以及position全部实现完毕。
> https://www.zhipin.com/job_detail/?query=&scity=101010100&industry=&position=100202

某次条件查询分页（第二页的查询条件）
> https://www.zhipin.com/c101010100-p100202/h_101010100/?page=2&ka=page-2

所以我们的查询请求格式如下
> 'https://www.zhipin.com/c'+city+'-p'+position+'/h_'+city/?page=num&ka=page-num

- 部分页面展示

![]()






