### 表的字段 mongoose


#### - 公司 company
 - companyname       公司名称               String 
- companyarea       公司地址           Object 三级地址 市 区 街道
- scale             公司规模               string 
- financing         融资规模               string 
- industry          行业                   string
- avatar            头像地址               string
- citycode          公司城市code           Number
 


#### - 招聘职位 workpos
 - createtime        创建时间              Date
- pubtime           发布时间              Date
- status            职位状态（0,1,2,3）   Numer
- name              职位名称             string
- positioncode      职位code             Number
- slary             薪资                 string   
- experience         经验                  string
- diploma           学历                  string

####  - hr 暂时简写
 - hrid        主键                  ObjectId
 - hrname       hr名字               string
 - hravatar     hr头像               string
 - companyid   公司id               ObjectId   


#### - 行业(参数表)oldindustry
#### - 城市(参数表)city
#### - 职位(参数表)position





