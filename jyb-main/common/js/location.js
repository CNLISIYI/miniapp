import translate from './locationtranslate.js';
import tools from "./util.js";

// 获取城市列表
const getCityList = ($this) => {
	let _this = $this;
	_this.$ajax(_this.$api.GetCityList, {}, '获取城市列表', function(res) {

	})
}

// 定位
const getGPSLocation = ($this, cb, ifReset) => {
	let _this = $this;
	if (ifReset) {
		// console.log("定位--getGPSLocation");
		uni.getSetting({
			success(res) {
				// console.log("getSetting success");
				if (!res.authSetting['scope.userLocation']) {
					console.log("userLocation--未授权");
					// 未授权 进入设置页面
					// 打开小程序设置页（uni.openSetting）接口调整 TODO
					uni.openSetting({
						success: (res) => {
							// console.log("未授权 进入了设置页面");
							res.authSetting = {
								"scope.userLocation": true
							}
							getUniLocation(_this, cb);
						},
						fail(res) {
							// console.log('未授权 没有进入了设置页面')
							cb({data:[{
								citycode: "100011001",
								cityename: "bj",
								cityname: "北京"
							}]})
						}
					})
				}
			}
		})
	} else {
		getUniLocation(_this, cb);
	}
}

// uni api
const getUniLocation = ($this, cb) => {
	let _this = $this;
	// console.log("uni api--getLocation");
	tools.loadingShow("定位中...");
	uni.getLocation({
		type: 'wgs84',
		success: function(res) {
			let lat = res.latitude;
			let lng = res.longitude;
			let speed = res.speed;
			let accuracy = res.accuracy;
			// console.log(res);
			translatePoint(_this, lng, lat, cb);
			tools.loadingHide();
		},
		fail: function(res) {
			// 获取位置失败
			// console.log("获取位置失败");
			getGPSLocation(_this, cb, true);
			tools.loadingHide();
			// tools.toastShow('获取位置失败！');
			console.log('获取位置失败！------------------');
		}
	})
}

// 经纬度转换
const translatePoint = ($this, x, y, cb) => {
	let _this = $this;
	let ajaxUrl = 'https://api.map.baidu.com/ag/coord/convert?from=0&to=4&x=' + x + '&y=' + y; // 经纬度转换
	let opts = {
		method: 'GET'
	};
	_this.$ajax2(opts, ajaxUrl, '经纬度转换', function(res) {
		getDetailsLocation(_this, translate.base64ToString(res.data.x), translate.base64ToString(res.data.y), cb)
	});
}

// https://apis.map.qq.com/ws/coord/v1/translate?locations=36.684142007376,117.05722293043&type=3&key=3XRBZ-JBYKP-Y3MDS-VZUOL-BIUIS-X2BGJ
// 经纬度转换
const convertBDToGCJ = ($this, x, y, cb) => {
	let _this = $this;
	let ajaxUrl = `https://apis.map.qq.com/ws/coord/v1/translate?locations=${y},${x}&type=3&key=3XRBZ-JBYKP-Y3MDS-VZUOL-BIUIS-X2BGJ`; // 经纬度转换
	let opts = {
		method: 'GET'
	};
	_this.$ajax2(opts, ajaxUrl, '经纬度转换', function(res) {
		// console.log(res);
	});
}


// 根据经纬度 获取详细地址
const getDetailsLocation = ($this, x, y, cb) => {
	let _this = $this;
	let ajaxUrl = _this.$api.GetDetailsLocation.url + "&key={coordinate:" + y + "_" + x + "}";
	_this.$ajax2(_this.$api.GetDetailsLocation, ajaxUrl, '获取详细地址', function(res) {
		cb(res.data);
	}, true);
}

// 获取当前城市
const getCurCity = () => {

}


// 获取当前城市
const getCurCityEname = ($this, cb) => {
	let _this = $this;
	// 获取城市信息
	let today = new Date().getHours(); //每周一刷新定位
	let lasttime = uni.getStorageSync('localCityTime') || 0;
	// console.log('上一次定位时间:' + lasttime)
	tools.getStorage("loacations", function(res) {
		// console.log(res);
		if (res.data && res.data.data && res.data.data.length > 0 && (today-lasttime>0 && today-lasttime<1) ) {
			cb(res.data);
		} else {
			uni.setStorageSync('localCityTime', today);
			// console.log('刷新定位时间' + uni.getStorageSync('localCityTime'))
			getGPSLocation(_this, function(res) {
				tools.setStorage("loacations", res);
				cb(res);
			});
		}
	});
}

module.exports = {
	getCityList,
	getGPSLocation,
	translatePoint,
	convertBDToGCJ,
	getDetailsLocation,
	getCurCity,
	getCurCityEname,
}