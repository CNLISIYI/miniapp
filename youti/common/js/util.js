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

// 转换关系
const changeRelation = (value) => {
	let label = ''
	switch (parseInt(value)) {
		case 0:
			label = '本人'
			break
		case 1:
			label = '儿子'
			break
		case 2:
			label = '女儿'
			break
		case 3:
			label = '丈夫'
			break
		case 4:
			label = '妻子'
			break
		case 5:
			label = '父亲'
			break
		case 6:
			label = '母亲'
			break
		default:
			label = ''
			break;
	}
	return label;
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

// 退后
const naviPrev = () => {
	uni.navigateBack({
		delta: 1
	});
}

module.exports = {
	loadingShow,
	loadingHide,
	toastShow,
	ymdToDate,
	pastDate,
	changeRelation,
	naviPrev,
}