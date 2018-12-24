
import axios from './z-axios'
// 获取职位列表,职位（技术），城市，公司要求，薪水，文凭，暂时只做地区和技术岗的查询。
exports.getPosition = (position, city, company, salary, diplomaReq) => {
  const param = {
    position, city, company, salary, diplomaReq
  }
  return new Promise((resolve, reject) => {
    axios()
  })
}
