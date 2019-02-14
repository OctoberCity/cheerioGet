import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store' 
import router from "../router"
var CancelToken = axios.CancelToken
var source = CancelToken.source()//中断路由跳转的时候没哟完成的请求
var cancel
var baseURL = 'http://127.0.0.1:7001'


// http request 请求拦截器
axios.interceptors.request.use(
	// config => {
	// 	return config;
	// },
	// error => {
	// 	Message.error('请求出错,请刷新页面');
	// 	return Promise.reject(error);
	// }
);

// http response 响应拦截器
axios.interceptors.response.use(
	response => {   
		if(response.data.code==1004) {
            Message.error('没有token');
            router.push({path:'/login'});

		} else{
            return response;
		}
	},
	error => {
        
		Message.error('请求出错,请刷新页面');
		return Promise.reject(error)
	}
)
/**
 * 封装form-data格式文件参数上传请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function upfrom(url, data) {
	let datag = new FormData();

	for(let key in data) {
		datag.append(key, data[key])
	}
	return new Promise((resolve, reject) => {
		axios({
			method: 'post',
			url: url,
			baseURL: baseURL,
			headers: {
                'Authorization': 'Bearer '+store.state.token
            },
            cancelToken: new CancelToken(c => { // 强行中断请求要用到的,中断以错误形式报出，不影响使用
				cancel = c
			}),
			data: datag
		}).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}
/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data) {
	return new Promise((resolve, reject) => {
		axios({
			method: 'post',
			url: url,
			data: data,
			baseURL: baseURL, 
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer '+store.state.token
            			},
			// withCredentials : true, //带cookie请求
			transformRequest: [function(data) {
				let ret = ''
				for(let it in data) {
					ret += it + '=' + data[it] + '&'
				}
				return ret
			}],
			xsrfCookieName: 'XSRF-TOKEN',
			xsrfHeaderName: 'X-XSRF-TOKEN',
			cancelToken: new CancelToken(c => { // 强行中断请求要用到的,中断以错误形式报出，不影响使用
				cancel = c
			})
		}).then(res => {
			if(!res) resolve(0)
			if(res.data.code == 1 || res.data.code == 1001) {
				resolve(res.data, res.data.msg)
			}
		}).catch(err => {
			reject(err)
		})

	})
}

/**
 * 封装get请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, data, responseType) {
	return new Promise((resolve, reject) => { 
		axios({
			method: 'get',
			url: url,
			params: data,
            baseURL: baseURL, 
			headers: {
				'Authorization': 'Bearer '+store.state.token
			}, 
			responseType: responseType || 'json',
			xsrfCookieName: 'XSRF-TOKEN',
            xsrfHeaderName: 'X-XSRF-TOKEN',
            cancelToken: new CancelToken(c => { // 强行中断请求要用到的,中断以错误形式报出，不影响使用
				cancel = c
			})
		
		}).then(res => { 
			if(res.data.code == 1001) {
				resolve(res.data);
			}
			if(responseType) {
                console.log("成功的请求");

				resolve(res.data)
			}
		}).catch(err => { 
			reject(err)
		})

	})
}