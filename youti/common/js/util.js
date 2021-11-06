// y-m-d转年月日
const ymdToDate = (str) => {
	const date = new Date(str);
	let year = date.getFullYear(),
		month = date.getMonth() + 1,
		day = date.getDate();
	month = month > 9 ? month : "0" + month;
	day = day > 9 ? day : "0" + day;
	return `${year}年${month}月${day}日`;
}
// 过去日期
const pastDate = (nums) => {
	let now = new Date().getTime(),
		past = new Date(now - 24 * 60 * 60 * 1000 * nums),
		year = past.getFullYear(),
		month = past.getMonth() + 1,
		day = past.getDate();
	month = month > 9 ? month : "0" + month;
	day = day > 9 ? day : "0" + day;
	return `${year}-${month}-${day}`
}

// 转换渠道
const changeType = (str) => {
	if (str == '360') {
		return '360'
	} else if (str == 'baidu') {
		return '百度'
	} else if (str == 'sm') {
		return '神马'
	} else if (str == 'sogou') {
		return '搜狗'
	}
}
// 转换状态
const toStatus = (item) => {
	if (item.status == '1') {
		if (item.channel_type == 'baidu') {
			if (item.tj_status == 21) {
				return {
					v: '有效',
					c: 'green'
				}
			} else if (item.tj_status == 22) {
				return {
					v: '暂停时段',
					c: 'red'
				}
			} else if (item.tj_status == 23) {
				return {
					v: '暂停推广',
					c: 'red'
				}
			} else if (item.tj_status == 24) {
				return {
					v: '撞线',
					c: 'red'
				}
			} else if (item.tj_status == 25) {
				return {
					v: '账户撞线',
					c: 'red'
				}
			} else {
				return {
					v: '暂停',
					c: ''
				}
			}
		} else if (item.channel_type == '360') {
			return {
				v: '有效',
				c: 'green'
			}
		} else if (item.channel_type == 'sogou') {
			if (item.tj_status == 11) {
				return {
					v: '有效',
					c: 'green'
				}
			} else if (item.tj_status == 12) {
				return {
					v: '暂停时段',
					c: 'red'
				}
			} else if (item.tj_status == 13) {
				return {
					v: '撞线',
					c: 'red'
				}
			} else if (item.tj_status == 14) {
				return {
					v: '账户撞线',
					c: 'red'
				}
			} else if (item.tj_status == 15) {
				return {
					v: '非投放时段',
					c: 'red'
				}
			}

		} else if(item.channel_type == 'sm'){ 
			if (item.tj_status == 0){
				return {
					v: '暂停',
					c: 'green'
				}
			} else if (item.tj_status == 1){
				return {
					v: '账户撞线',
					c: 'red'
				}
			} else if (item.tj_status == 2){
				return {
					v: '撞线',
					c: 'red'
				}
			} else if (item.tj_status == 3){
				return {
					v: '非投放时段',
					c: 'red'
				}
			} else if (item.tj_status == 4){
				return {
					v: '有效',
					c: 'red'
				}
			}
		}
	} else {
		return {
			v: '暂停',
			c: 'red'
		}
	}
}

// loading show
const loadingShow = (str) => {
	uni.showLoading({
		title: str,
		mask: true
	});
}

// loading hide
const loadingHide = () => {
	uni.hideLoading();
}

// 提示
const toastShow = str => {
	uni.showToast({
		title: str,
		mask: true,
		icon: 'none',
		duration: 2000
	});
}

module.exports = {
	loadingShow,
	loadingHide,
	toastShow,
	ymdToDate,
	pastDate,
	changeType,
	toStatus
}