// 获取 机构详情
const getComAgencyDetail = ($this, cb) => {
	let _this = $this;
	let ajaxUrl = _this.$api.GetAgencyDetail.url + "&key={comename:" + _this.agencyEname + "}";
	_this.$ajax2(_this.$api.GetAgencyDetail, ajaxUrl, '获取机构详情', function(res) {
		if (res != 'error' && res.data.data && res.data.data.length > 0) {
			cb(res.data);
		}
	});
}

const getComClassDetail = ($this, cb) => {
	let _this = $this;
	let ajaxUrl = _this.$api.GetRelatedTuijian.url + "&key={comename:" + _this.agencyEname + "}";
	_this.$ajax2(_this.$api.GetRelatedTuijian, ajaxUrl, '获取对应类别', function(res) {
		if (res != 'error' && res.data.data && res.data.data.length > 0) {
			cb(res.data);
		}
	});
}

// 获取机构校区
const getComAgencySchools = ($this, cb, noLen, noLoading) => { // noLen 不需要距离(true) / 需要距离(false)
	let _this = $this;
	let isLoading = noLoading ? false : true; // noLoading 不需要loading(true) / 需要loading(false)
	let ajaxUrl = _this.$api.GetAgencySchools.url + "&key={comename:" + _this.agencyEname;
	if(!noLen){
		ajaxUrl += ",coordinate:"+ _this.lat +"_"+ _this.lng;
	}
	ajaxUrl += "}";
	_this.$ajax2(_this.$api.GetAgencySchools, ajaxUrl, '获取校区', function(res) {
		if (res != 'error' &&  res.data.data && res.data.data.length > 0) {
			// _this.nearSchool = res.data.data[0];
			cb(res.data);
		}
	}, isLoading)
}

// 获取机构校区 、 最近校区
const getComSchoolsDis = ($this, cb) => {
	let _this = $this;
	let ajaxUrl = _this.$api.getAgencyDistance.url + "&key={comename:" + _this.agencyEname + ",coordinate:"+ _this.lat +"_"+ _this.lng + "}";
	_this.$ajax2(_this.$api.getAgencyDistance, ajaxUrl, '获取校区距离', function(res) {
		if (res != 'error' &&  res.data.data && res.data.data.length > 0) {
			// _this.nearSchool = res.data.data[0];
			cb(res.data);
		}
	})
}

// 获取机构老师
const getComAgencyTeachers = ($this, cb, classId) => {
	let _this = $this;
	let ajaxUrl = _this.$api.GetAgencyTeachers.url + "&key={comename:" + _this.agencyEname;
	if(classId){
		ajaxUrl += ",productid:" + classId;
	}
	ajaxUrl += "}";
	_this.$ajax2(_this.$api.GetAgencyTeachers, ajaxUrl, '获取老师', function(res) {
		if (res != 'error' &&  res.data.data && res.data.data.length > 0) {
			// _this.nearSchool = res.data.data[0];
			cb(res.data);
		}
	}, true)
}

// 获取机构评价
const getComAgencyEvals = ($this, cb, evalPage, pageIdx, labelcode) => {
	let _this = $this;
	let ajaxUrl;
	let isLoading = evalPage ? true : false;
	if(evalPage){ // 评价列表页  // 控制查询评价列表家口传递的参数
		ajaxUrl = _this.$api.GetAgencyEvaluation.url + "&key={comename:" + _this.agencyEname;
		if(labelcode == ''){
			ajaxUrl += ",pagesize:15,page:"+ pageIdx;
		}else{
			ajaxUrl += ",labelcode:" + labelcode;
		}
	}else{
		ajaxUrl = _this.$api.GetAgencyEvaluation.url + "&key={comename:" + _this.agencyEname + ",pagesize:5";
	}
	ajaxUrl += "}";
	_this.$ajax2(_this.$api.GetAgencyEvaluation, ajaxUrl, '获取评价', function(res) {
		if (res != 'error' && res.data.data && res.data.data.length > 0) {
			// _this.nearSchool = res.data.data[0];
			cb(res.data);
		}
	}, isLoading)
}

// 获取机构评价数量
const getComAgencyEvalsNum = ($this, cb) => {
	let _this = $this;
	let ajaxUrl = _this.$api.GetAgencyEvaluation.url + "&key={comename:" + _this.agencyEname + ",page:0}";
	_this.$ajax2(_this.$api.GetAgencyEvaluation, ajaxUrl, '获取评价数量', function(res) {
		if (res != 'error') {
			cb(res.data);
		}
	})
}

// 获取评价分组
const getComEvalSort = ($this, cb) => {
	let _this = $this;
	let ajaxUrl = _this.$api.GetEvaluationSort.url + "&key={comename:" + _this.agencyEname + "}";
	_this.$ajax2(_this.$api.GetEvaluationSort, ajaxUrl, '获取评价分组', function(res) {
		if (res != 'error' && res.data.data && res.data.data.length > 0) { // 判断 res.data.XXX
			cb(res.data);
		}
	});
}

// 获取机构课程
const getComAgencyClasses = ($this, cb) => {
	let _this = $this;
	let ajaxUrl = _this.$api.GetAgencyClasses.url + "&key={comename:" + _this.agencyEname + "}";
	_this.$ajax2(_this.$api.GetAgencyClasses, ajaxUrl, '获取课程', function(res) {
		if (res != 'error' && res.data.data && res.data.data.length > 0) { // 判断 res.data.XXX
			cb(res.data);
		}
	});
}

// 获取类别下的课程
const getComClassUnderCategory = ($this, cb) => {
	let _this = $this;
	// + ",classename:"+ _this.classObj.ename 
	let ajaxUrl = _this.$api.GetClassUnderCategory.url + "&key={comename:" + _this.agencyEname +",pagesize:10}";
	_this.$ajax2(_this.$api.GetClassUnderCategory, ajaxUrl, '获取类别下的课程', function(res) {
		if (res != 'error' && res.data.data && res.data.data.length > 0) { // 判断 res.data.XXX
			cb(res.data);
		}
	});
}

// 获取机构科目/课程相关行业信息
const GetComClassRelatedIndustry = ($this, cb) => {
	let _this = $this;
	let ajaxUrl = _this.$api.GetClassRelatedIndustry.url + "&key={productid:" + _this.productId +"}";
	_this.$ajax2(_this.$api.GetClassRelatedIndustry, ajaxUrl, '获取相关行业', function(res) {
		if (res != 'error' && res.data.data && res.data.data.length > 0) { // 判断 res.data.XXX
			cb(res.data);
		}
	});
}

// 获取机构相关行业信息
const getComAgencyRelatedIndustry = ($this, cb) => {
	let _this = $this;
	let ajaxUrl = _this.$api.GetRelatedTuijian.url + "&key={comename:" + _this.agencyEname + ",classcomcount:5}";
	_this.$ajax2(_this.$api.GetRelatedTuijian, ajaxUrl, '获取排行榜', function(res) {
		if (res != 'error' && res.data.data && res.data.data.length > 0) {
			cb(res.data);
		}
	});
}

// 获取机构相册
const getComAgencyPhoto = ($this, cb) => {
	let _this = $this;
	let ajaxUrl = _this.$api.GetAgencyAlbum.url + "&key={comename:" + _this.agencyEname + ",page:1,pagesize:100}";
	_this.$ajax2(_this.$api.GetAgencyAlbum, ajaxUrl, '获取相册', function(res) {
		if (res != 'error' && res.data.data && res.data.data.length > 0) {
			cb(res.data);
		}
	}, true);
}

// 获取短信验证码
const getSMSCode = ($this, url, phone, ip, flagType, cb) => {
	let _this = $this;
	// console.log("获取验证码");
	let flag = flagType ? flagType : "xcx-sms-fee";
	let urlStr = encodeURIComponent(url);
	let ajaxUrl = _this.$api.PostMessageCode.url + "&key={mobile:"+ phone +",flag:"+ flag +",url:"+ urlStr +",length:4,ip:"+ ip +"}";
	_this.$ajax2(_this.$api.PostMessageCode, ajaxUrl, '生成短信验证码', function(res) {
	   if(res.data.result != 1){
		   _this.tools.toastShow('生成短信验证码失败');
		   return;
	   }
	   // 倒计时
	   _this.component.countDown(_this, 60);
	}, true);
}

// 倒计时
const countDown = ($this, num) => {
    let _this = $this;
	//获取倒计时初始值
    let countDownNum = _this.countDownNum;
    //如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面
    _this.timer = setInterval(function () {//这里把setInterval赋值给变量名为timer的变量
        //每隔一秒countDownNum就减一，实现同步
        countDownNum--;
        //然后把countDownNum存进data，好让用户知道时间在倒计着
        _this.countDownNum = countDownNum
        //在倒计时还未到0时，这中间可以做其他的事情，按项目需求来
        if (countDownNum == 0) {
			//这里特别要注意，计时器是始终一直在走的，如果你的时间为0，那么就要关掉定时器！不然相当耗性能
			//因为timer是存在data里面的，所以在关掉时，也要在data里取出后再关闭
			clearInterval(_this.timer);
			_this.timer = '';
			_this.countDownNum = num;
			//关闭定时器之后，可作其他处理codes go here
        }
      }, 1000)
}

// 验证短信验证码
const checkSMSCode = ($this, isSubmit, phone, code,  cb) => {
	let _this = $this;
	// console.log("验证短信验证码");
	// 提交表单
	let ajaxUrl = _this.$api.GetCodeCheck.url + "&key={mobile:"+ phone + ",code:" + code +",flag:xcx-sms-fee}";
	_this.$ajax2(_this.$api.GetCodeCheck, ajaxUrl, '验证短信验证码', function(res) {
	   
	   if(isSubmit){
		   // console.log("提交表单");
		   _this.component.requestSubmit(_this);
		   let pages = getCurrentPages(); // 获取页面栈
		   let prevPage = pages.find(item => item.route == 'pages/agencyindex/index');
		   prevPage.$vm.isPriceView = true;
	   }
	   if(typeof cb === "function"){
		   cb(res.data);
	   }
	   
	}, true);
}

// fee 学费页面 表单提交
const requestSubmit = ($this, cb) => {
	let _this = $this;
	let fromPlatform;
	// #ifdef MP-BAIDU
		fromPlatform = "百度小程序"
	// #endif
	// #ifdef MP-WEIXIN
		fromPlatform = "微信小程序"
	// #endif
	// console.log("requestSubmit");
	_this.tools.loadingShow("提交验证");
	uni.request({
		url: "https://api14data.jiaoyubao.cn/form/?action=100001",
		method : "GET",
		data: {
			formtype: '018003',
			phone: _this.phoneVal,
			comname: encodeURIComponent(_this.detailObj.nickname), // comname
			comid:_this.detailObj.id,
			citycode: _this.cityCode,
			areaname: _this.detailObj.cityname, // 地区名称 
			address: _this.detailObj.cityname, // 详细地址
			// demo : "教育宝, 小程序, 学员查	看更多成交，电话：" + _this.phoneVal + '， -- ' + fromPlatform,
			demo : `教育宝, ${fromPlatform}, 学员查看更多成交价表单，电话：${_this.phoneVal}`,
			ip: _this.IP,
			unionid: getApp().globalData.unionid,
			// url: encodeURIComponent('/packageA/fee/index'),
			url: encodeURIComponent(`https://m.jiaoyubao.cn/${_this.cityEname}/edu/${_this.agencyEname}/dealfee.html`),
		},
		success: (res) => {
			if(res.data.result == 1){
				_this.isLogin = true;
				
				let nowTime = (new Date()).getTime();
				uni.setStorageSync('loginStateStart', nowTime);
			}else{
				if(res.data.description) {
					_this.tools.toastShow(res.data.description);
				}
				else {
					_this.tools.toastShow('验证失败');
				}
			}
		},
		fail : (res) => {
			_this.tools.toastShow('验证失败');
		},
		complete : () => {
			_this.tools.loadingHide();
		}
	});
}

module.exports = {
	getComAgencyDetail,
	getComClassDetail,
	getComAgencySchools,
	getComSchoolsDis,
	getComAgencyTeachers,
	getComAgencyEvals,
	getComAgencyEvalsNum,
	getComEvalSort,
	getComAgencyClasses,
	getComClassUnderCategory,
	GetComClassRelatedIndustry,
	getComAgencyRelatedIndustry,
	getComAgencyPhoto,
	getSMSCode,
	checkSMSCode,
	requestSubmit,
	countDown,
}