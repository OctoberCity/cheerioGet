import axios from 'axios'

var baseURL = 'http://192.168.17.126:7001'

/**
 * 封装get请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get (url, data, responseType) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: url,
      params: data,
      baseURL: baseURL,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      responseType:'json',
    }).then(res => {  
        resolve(res) 
    }).catch(err => {
      reject(err)
    })
  })
}
