import axios from 'axios'
const baseURL = '127.0.0.1:7001'// 后端服务IP地址，前端默认8080
export function get (url, data, responseType) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: url,
      params: data,
      baseURL: baseURL
      // timeout : 3000,
      // headers: {
      // 	'Content-Type': 'application/x-www-form-urlencoded',
      // 	// 'token': store.state.token
      // },
      // // withCredentials : true, //带cookie请求
      // transformRequest: [function(data) {
      // 	let ret = ''
      // 	for(let it in data) {
      // 		ret += it + '=' + data[it] + '&'
      // 	}
      // 	return ret
      // }],
      // responseType: responseType || 'json',
      // xsrfCookieName: 'XSRF-TOKEN',
      // xsrfHeaderName: 'X-XSRF-TOKEN',
      // cancelToken: new CancelToken(c => { // 强行中断请求要用到的,中断以错误形式报出，不影响使用
      // 	cancel = c
      // })

    }).then(res => {
      if (res.code === '1001') {
        resolve(res)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
