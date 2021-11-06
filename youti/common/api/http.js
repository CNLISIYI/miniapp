import tools from "../js/util.js";

const http = (url, method, params) => {
	let data = {};
	if (params.data) {
		for (let key in params.data) { // 在这里判断传过来的参数值为null，就删除这个属性
			if (params.data[key] == null || params.data[key] == 'null') {
				delete params.data[key]
			}
		}
		data = {
			...params.data
		}
	}
	uni.request({
		url: 'https://member.qiyeai.com/api/' + url,
		method: method == 'post' ? 'post' : 'get',
		data,
		header: {
			token: getApp().globalData.token,
			'content-type': method == 'get' ? 'application/json' : 'application/x-www-form-urlencoded'
		},
		success(res) {
			params.success && params.success(res.data)
		},
		fail(err) {
			tools.toastShow('服务器内部错误')
			params.fail && params.fail(err)
		},
		complete() {
			setTimeout(() => {
				tools.loadingHide();
			}, 1500)
		}
	})

}

export default http
