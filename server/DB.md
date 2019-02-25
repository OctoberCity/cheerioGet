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



 #####  -resume 简历
 - resumeName  简历名字             String
 - resumeSize  简历大小             String
 - resumeType  简历类型             Number(1:pdf,2:doc,3:docx)//暂时只支持  
 - uploadTime  简历上传时间         Date
 - userid      用户id              string 
 - path        存储路径(包括新的名字)  string 
 - state       状态（1:存在，0:删除）Number 


#####  - userWantPos
- userid      用户id               objectId
- citycode    城市code             Number
- slary       薪资                 Object:{start,end} //是一个范围
- industry    行业                 string // 暂时没有行业的选项
- position    职位                 Number // 职业code 

                           




- ### 一下是参数表，由爬取的的文件直接录入
#### - 行业(参数表)oldindustry
#### - 城市(参数表)city
#### - 职位(参数表)position





