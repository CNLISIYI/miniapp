import { generateGUID } from "./generateGUID.js";


// 获取 footer 所需数据
export const footerMixin = {
    data () {
        return {
			//// 底部模块 start
			detailObj: '',
			classObj: '',
			telPhonePopShow: false,
			//// 底部模块 end 
		}
    },
	mounted(){
		// console.log("mounted");
		
	},
    methods: {
		getFooterMixin(){
			let _this = this;
			return new Promise(resolve => {
				_this.component.getComAgencyDetail(_this, function(res){
					// console.log(res.data[0]);
					_this.detailObj = res.data[0];
					
					// #ifndef MP-BAIDU
					uni.setNavigationBarTitle({
						title: _this.tools.UnicodeToAscii(_this.detailObj.nickname)
					});
					// #endif
					// // #ifdef MP-BAIDU
					// if(resolve){
					resolve();
					// }
					// // #endif
				
				})
				_this.component.getComClassDetail(_this, function(res){
					// console.log(res.data);
					_this.classObj = res.data.filter(item => item.jb == 2)[0];
				})
			})
		},
        //// 底部模块 start
        // 拨打电话
        makeTelPhone() {
        	let _this = this;
			
			//// 微信小程序环境 执行下面埋点代码
			// -- 20200821 [去掉微信小程序环境的条件编译] -- 百度小程序通用
				// 点击拨打电话的用户统计
				let callcode = _this.detailObj.callcode ? _this.detailObj.callcode : '',
					comename = _this.detailObj.ename ? _this.detailObj.ename : '',
					classid = _this.productId ? _this.productId : '';
				_this.telTrackRecordFn(callcode, comename, classid)
			// 
			
        	// console.log(_this.tools.getPlatform());
        	if (_this.tools.getPlatform() == 'ios') {
				let callNumber = _this.detailObj.callcode ? getApp().globalData.tel400 + ',' + _this.detailObj.callcode : getApp().globalData.tel400;
        		uni.makePhoneCall({
        			phoneNumber: callNumber
        		});
        	} else {
        		// _this.telPhonePopShow = true;
				let callNumber = _this.detailObj.callcode ? getApp().globalData.tel400 + ',,' + _this.detailObj.callcode : getApp().globalData.tel400;
				uni.makePhoneCall({
					phoneNumber: callNumber
				});
        	}
        },
        telPhonePopHide() {
        	this.telPhonePopShow = false;
        },
        //// 底部模块 end
    }
}

// 获取最近校区
export const nearestSchoolMixin = {
    data () {
        return {
			nearSchool : '', // 最近校区
			lat: '',
			lng: '',
		}
    },
	mounted(){
		// console.log("mounted");
		
	},
    methods: {
		getNearestSchoolMixin(){
			let _this = this;
			_this.location.getCurCityEname(_this, function(res){
				_this.lat = res.location.lat;
				_this.lng = res.location.lng;
				_this.getNearestSchool();
			});
		},
        getNearestSchool(){
			let _this = this;
			_this.component.getComSchoolsDis(_this, function(res){
				// console.log(res.data);
				_this.nearSchool = res.data[0];
				// console.log(_this.nearSchool.minlength);
				_this.nearSchool.minlength = (Number(_this.nearSchool.minlength) / 1000).toFixed(2);
			})
		}
    }
}

// 获取老师列表
export const agencyTeachersMixin = {
    data () {
        return {
			teachers: [],
		}
    },
	mounted(){
		// console.log("mounted");
		
	},
    methods: {
        getAgencyTeachersMixin(classId){
			let _this = this;
			_this.component.getComAgencyTeachers(_this, function(res){
				// console.log(res.data);
				_this.teachers = res.data;
				_this.teachers.filter(item => {
					let subject = item.teacherclass.filter(o => o.jb == 3)[0].name;
					let htmlStr = _this.tools.escape2Html(item.content);
					let mainAttack = _this.tools.delHtmlTag(htmlStr);
					let years = Number((new Date()).getFullYear()) - Number(item.workstartyear);
					
					
					item.subject = subject;
					item.mainAttack = mainAttack;
					item.years = years;
				})
				
				if(_this.teacherFilter){
					_this.handleTeacherFilter();
				}
			}, classId)
		}
    }
}

// 获取评价列表
export const agencyEvalsMixin = {
    data () {
        return {
			evals: [],
		}
    },
	mounted(){
		// console.log("mounted");
		
	},
    methods: {
        getAgencyEvalsMixin(){
			let _this = this;
			_this.component.getComAgencyEvals(_this, function(res){
				// console.log(res.data);
				for (let i = 0, len = res.data.length; i < len; i++) {
					res.data[i].dt_pj = _this.tools.getDate(res.data[i].dt_pj);
					res.data[i].content = res.data[i].content.replace(/\n/g, '<br>');
				}
				_this.evals = res.data;
				
			})
		},
    }
}

// 获取评价分组
export const evalSortMixin = {
    data () {
        return {
			evalSort: [],
		}
    },
	mounted(){
		// console.log("mounted");
		
		
		// let res = {"result":"1","sFileName":"100407/B969832094184C6D2DD7A44E437C4D06.txt","sFileTime":"2019-10-18 11:06:49","cacheMinutes":3720,"time_cache":"15.5812毫秒/2019-10-18 11:06:49:662","data":[{"code":"901250001","name":"内容丰富","count":6,"weight":475},{"code":"901250002","name":"通俗易懂","count":2,"weight":474},{"code":"901250003","name":"值得学习","count":4,"weight":473},{"code":"901250004","name":"收获颇多","count":4,"weight":472},{"code":"901250005","name":"学习环境舒适","count":7,"weight":471},{"code":"901250006","name":"教师水平很高","count":5,"weight":470},{"code":"901250007","name":"推荐学习","count":4,"weight":469},{"code":"901250009","name":"课程实用性强","count":1,"weight":467},{"code":"901250010","name":"因材施教","count":1,"weight":466}]};
		// _this.evalSort = res.data;
		// _this.evalSort.sort((x,y)=>y.count-x.count); // 降序
		// _this.evalSort.filter(item => {
		// 	item.id = item.code;
		// })
		
	},
    methods: {
        getEvalSortMixin(){
			let _this = this;
			_this.component.getComEvalSort(_this, function(res){
				_this.evalSort = res.data;
				_this.evalSort.sort((x,y)=>y.count-x.count); // 降序
				_this.evalSort.filter(item => {
					item.id = item.code;
				})
			})
		}
    }
}

// 获取课程列表(相关课程)
export const agencyClassesMixin = {
    data () {
        return {
			otherClasses: [],
		}
    },
	mounted(){
		// console.log("mounted");
		
	},
    methods: {
        getAgencyClassesMixin(){
			let _this = this;
			_this.component.getComAgencyClasses(_this, function(res){
				// console.log(res.data);
				// console.log(_this)
				// console.log("8888888888888888888888888888")
				_this.otherClasses = res.data.filter(item => item.id != _this.productId && item.class_name != _this.classTitle).slice(0, 3)
			})
		},
    }
}

// 获取课程列表(老师详情页课程)
export const teacherClassesMixin = {
    data () {
        return {
			classes:[],
			teacherClasses: [],
		}
    },
	mounted(){
		// console.log("mounted");
		
	},
    methods: {
        getTeacherClasses(){
			let _this = this;
			_this.component.getComAgencyClasses(_this, function(res){
				// console.log(res.data);
				// _this.otherClasses = res.data.filter(item => item.productId != _this.productId).slice(0, 3)
				_this.classes = res.data;
				_this.handleClassFilter();
			})
		},
		handleClassFilter(){
			let _this = this;
			let flag;
			_this.teacherProducts.filter(item => {
				flag = true;
				_this.classes.filter(o => {
					if(item.id == o.id){
						_this.teacherClasses.push(o);
						flag = false;
					}
				})
				if(flag){
					_this.teacherClasses.push({
						id: item.id,
						img: '',
						class_name: item.name,
						class_mc: '',
						banxing_mc: '',
						price: ''
					})
				}
			})
			
		}
    }
}

// 获取类别下的课程列表(小伙伴还看了)
export const ClassUnderCategoryMixin = {
    data () {
        return {
			otherWatching: [],
		}
    },
	mounted(){
		// console.log("mounted");
		
	},
    methods: {
        getClassUnderCategory(){
			let _this = this;
			_this.component.getComClassUnderCategory(_this, function(res){
				// console.log(res.data);
				_this.otherWatching = res.data;
			})
		}
    }
}

// 根据课程获取其 行业 and 排行
export const industryAndRankingMixin = {
    data () {
        return {
			industryObj: '',
			rankingArr: '',
			hasRanking: false,
		}
    },
	mounted(){
		// console.log("mounted");
		
		
		// let res = {"result":"1","sFileName":"100224/363EA2EA8B5B446C91D51B3A704AE2AB.txt","sFileTime":"2019-10-17 10:27:07","cacheMinutes":1440,"time_cache":"15.6111毫秒/2019-10-17 10:27:07:365","data":[{"id":614,"code":"500004","name":"文体艺术","ename":"caiyi","fmc":"","shortname":"文体艺术","jb":2,"xu":292,"blnshow":1,"stylename":""},{"id":4808,"code":"500004028","name":"少儿表演培训","ename":"shaoerbiaoyan","fmc":"少儿表演","shortname":"少儿表演","jb":3,"xu":1404,"blnshow":1,"stylename":""}]}
		// let resdata = [{"id":614,"code":"500004","name":"文体艺术","ename":"caiyi","fmc":"","shortname":"文体艺术","jb":2,"xu":292,"blnshow":1,"stylename":""},{"id":4808,"code":"500004028","name":"少儿表演培训","ename":"shaoerbiaoyan","fmc":"少儿表演","shortname":"少儿表演","jb":3,"xu":1404,"blnshow":1,"stylename":""}]
		// _this.industryObj = resdata.sort((x,y)=>y.jb-x.jb)[0]; // 降序
		
		// _this.getAgencyRelatedIndustry();
	},
    methods: {
		getIndustryAndRankingMixin(){
			let _this = this;
			_this.component.GetComClassRelatedIndustry(_this, function(res){
				// console.log(res.data);
				_this.industryObj = res.data.sort((x,y)=>y.jb-x.jb)[0]; // 降序
				
				_this.getAgencyRelatedIndustry();
			})
		},
        getAgencyRelatedIndustry(){
			let _this = this;
			_this.component.getComAgencyRelatedIndustry(_this, function(res){
				// console.log(res.data);
				_this.rankingArr = res.data;
				_this.getHasRanking();
			})
		},
		getHasRanking(){
			let _this = this;
			_this.rankingArr.forEach((item,index) => { // 索引值为 第二个参数
				if(item.code == _this.industryObj.code){
					_this.hasRanking = true;
				}
			})
		}
    }
}

// 获取机构相册
export const agencyPhotoMixin = {
    data () {
        return {
			photos: [],
			photoCopy: [],
			photoSort: [],
		}
    },
	mounted(){
		// console.log("mounted");
		
	},
    methods: {
        getAgencyPhotoMixin(){
			let _this = this;
			_this.component.getComAgencyPhoto(_this, function(res){
				// console.log(res.data);
				let photosCopy = res.data;
				let isExist = [];
				res.data.forEach((o, i) => {
					_this.photos.push(o);
					_this.photoCopy.push(o);
				})
				
				photosCopy.sort((x,y)=>x.groupcode-y.groupcode); // 升序
				photosCopy.forEach((o, i) => {
					if(isExist.indexOf(o.groupcode) == -1){
						isExist.push(o.groupcode);
						_this.photoSort.push({
							id: o.groupcode,
							name: o.groupname,
							count:''
						})
					}
				})
			})		
		}
    }
}

// 
export const navTabItemShowMixin = {
    data () {
        return {
			navTabItemShow: {
				classShow: false,
				teacherShow: false,
				evalShow: false,
				feeShow: false,
				photoShow: false,
				schoolShow: false,
				newsShow: false,
				dataShow: false,
			},
			navTabItemClass: [],
			newsDetailClass: [],
			navTabItemSchool: [],
			hasFeeData: false,
		}
    },
	mounted(){
		// console.log("mounted");
		
	},
    methods: {
		getNavTabItemShowMixin(){
			let _this = this;
			_this.getClassShow(); // 课程
			_this.getTeacherShow(); // 老师
			_this.getEvalShow(); // 评价
			_this.getFeeShow(); // 评价
			_this.getPhotoShow(); // 相册
			_this.getSchoolShow(); // 校区
			_this.getNewsShow(); // 资讯
			_this.getDataShow(); // 资料
		},
        getClassShow(){
			let _this = this;
			_this.component.getComAgencyClasses(_this, function(res){
				if(res.data.length > 0){
					_this.navTabItemShow.classShow = true;
					_this.navTabItemClass = res.data;
					_this.newsDetailClass = res.data.slice(0, 5);
				}
			})	
		},
		getTeacherShow(){
			let _this = this;
			let ajaxUrl = _this.$api.GetAgencyTeachers.url + "&key={comename:" + _this.agencyEname + ",page:0}";
			_this.$ajax2(_this.$api.GetAgencyTeachers, ajaxUrl, '获取老师', function(res) {
				if(res.data.rec > 0){
					_this.navTabItemShow.teacherShow = true;
				}
			})
		},
		getEvalShow(){
			let _this = this;
			let ajaxUrl = _this.$api.GetAgencyEvaluation.url + "&key={comename:" + _this.agencyEname + ",page:0}";
			_this.$ajax2(_this.$api.GetAgencyEvaluation, ajaxUrl, '获取评价', function(res) {
				if(res.data.rec > 0){
					_this.navTabItemShow.evalShow = true;
				}
			})
		},
		getFeeShow(){
			let _this = this;
			let ajaxUrl = _this.$api.GetAgencyFee.url + "&key={comename:" + _this.agencyEname + ",page:0}";
			_this.$ajax2(_this.$api.GetAgencyFee, ajaxUrl, '获取学费数据', function(res) {
				if(res.data.rec > 0){
					_this.navTabItemShow.feeShow = true;
					_this.hasFeeData = true;
				}
			})
		},
		getPhotoShow(){
			let _this = this;
			let ajaxUrl = _this.$api.GetAgencyAlbum.url + "&key={comename:" + _this.agencyEname + ",page:0}";
			_this.$ajax2(_this.$api.GetAgencyAlbum, ajaxUrl, '获取相册', function(res) {
				if(res.data.rec > 0){
					_this.navTabItemShow.photoShow = true;
				}
			})
		},
		getSchoolShow(){
			let _this = this;
			_this.component.getComAgencySchools(_this, function(res){
				if(res.data.length > 0){
					_this.navTabItemShow.schoolShow = true;
					_this.navTabItemSchool = res.data;
				}
			}, true, true)	
		},
		getNewsShow(){
			let _this = this;
			let ajaxUrl = _this.$api.GetAgencyNews.url + "&key={comename:" + _this.agencyEname + ",page:0}";
			_this.$ajax2(_this.$api.GetAgencyNews, ajaxUrl, '获取资讯', function(res) {
				if(res.data.rec > 0){
					_this.navTabItemShow.newsShow = true;
				}
			})
		},
		getDataShow(){
			let _this = this;
			let ajaxUrl = _this.$api.GetAgencyDatas.url + "&key={comename:" + _this.agencyEname + ",page:0}";
			_this.$ajax2(_this.$api.GetAgencyDatas, ajaxUrl, '获取资料', function(res) {
				if(res.data.rec > 0){
					_this.navTabItemShow.dataShow = true;
				}
			})
		},
    }
}

// 获取随机码
export const randomCodeMixin = {
    data(){
		return{
			codeStr: '',
		}
	},
	mounted(){
	//刚进入页面随机先获取一个
		// this.createCode()
	},
	methods: {
		checkCode(code, random, cb) {
			// let code, _this = this;
			// //首先默认code为空字符串
			// code = '';
			// //设置长度，这里看需求，我这里设置了4
			// let codeLength = 4;
			// //设置随机字符
			// let random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
			// //循环codeLength 我设置的4就是循环4次
			// for (let i = 0; i < codeLength; i++) {
			// 	//设置随机数范围,这设置为0 ~ 36
			// 	let index = Math.floor(Math.random() * 36);
			// 	//字符串拼接 将每次随机的字符 进行拼接
			// 	code += random[index];
			// }
			// //将拼接好的字符串赋值给展示的code
			// _this.codeStr = code;
			
			let _this = this;
			_this.tools.loadingShow("正在验证...");
			uni.request({
				url: "https://api14data.jiaoyubao.cn/genimage/",
				method : "GET",
				data:{
					op:'',
					key: "ViewFee" + random,
					code: code,
				},
				success: (r) => {
					// console.log(r);
					cb(r);
					// if(r.data.result == 1){
					// 	return true;
					// }else{
					// 	return false;
					// }
				},
				fail : (res) => {
					
				},
				complete : () => {
					_this.tools.loadingHide();
				}
			});
		}
	}
}

// 获取IP
export const ipGetMixin = {
    data(){
		return{
			IP: '',
		}
	},
	mounted(){
		this.getCurIp();
	},
	methods: {
		getCurIp(){
			let _this = this;
			uni.request({
				url: "https://pv.sohu.com/cityjson?ie=utf-8",
				method : "GET",
				success: (res) => {
					// console.log(res);
					let ipstr = res.data.split(' ')[4].replace(/\"/ig,'').replace(',', '');
					// console.log(ipstr);
					_this.IP = ipstr;
				},
				fail : (res) => {
					
				},
				complete : () => {
					
				}
			});
		}
	}
}

// 帮我选课,人数累加
export const peopleAddOnMixin = {
    data(){
		return{
			count: 0,
			countToArr: [],
			targetCount: 0,
			countStep: 2,
			countDelay: 20,
			timer: null,
			animateTimer: null,
			startHour: 7,
			stopHour: 23,
			startCount: !1,
		}
	},
	// mounted(){
	onShow(){
		this.initCount();
	},
	onHide(){
		this.desctoryed();
	},
	methods: {
		desctoryed: function() {
			this.cleaerTimer()
		},
		initCount: function() { // 计算初始值
			let timeNowStr = new Date,
				timeDate = new Date("".concat(timeNowStr.getFullYear(), "/").concat(timeNowStr.getMonth() + 1, "/").concat(timeNowStr.getDate())),
				timeStart = new Date(timeDate.setHours(this.startHour)).getTime(),
				timeEnd = new Date(timeDate.setHours(this.stopHour)).getTime(),
				timeNowNum = Date.now(),
				timeNumber = ((timeNowNum = timeNowNum > timeEnd ? timeEnd : timeNowNum) - timeStart) / 1e3; // 秒数差
			// console.log("timeNowStr, timeDate, timeStart, timeEnd, timeNowNum, timeNumber");
			// console.log(timeNowStr, timeDate, timeStart, timeEnd, timeNowNum, timeNumber);
			this.startCount = timeNumber > 0, this.count = timeNumber > 0 ? Math.round(timeNumber / this.countDelay * this.countStep - 1) : 0, this.createTimer()
			// console.log("initCount this.count");
			// console.log(this.count);
			this.getNumToArr();
		},
		cleaerTimer: function() {
			clearInterval(this.timer), this.timer = null
		},
		createTimer: function() {
			let _this = this;
			_this.timer && clearInterval(_this.timer), _this.timer = setInterval((function() {
				let nowHours = (new Date).getHours();
				nowHours >= _this.startHour && nowHours < _this.stopHour ? _this.startCount ? _this.stepAddon(Math.ceil(Math.random() * _this.countStep)) : _this.initCount() : nowHours < _this.startHour ? _this.count = 0 : _this.timer && _this.cleaerTimer()
			}), 1e3 * _this.countDelay)
		},
		stepAddon: function(num) { // 累加
			let _this = this;
			if (num > 0) {
				this.animateTimer ? (clearInterval(this.animateTimer), this.animateTimer = null, this.targetCount += num, num = this.targetCount - this.count) : this.targetCount = this.count + num;
				let newNum = (this.countDelay - .5) / num * 1e3;
				newNum = newNum >= 150 ? 150 : newNum, this.animateTimer = setInterval((function() {
					num--, _this.count += 1, num <= 0 && (clearInterval(_this.animateTimer), _this.animateTimer = null)
				}), newNum)
			}
			// // console.log("stepAddon this.count");
			// // console.log(this.count);
			_this.getNumToArr();
		},
		getNumToArr(){
			let _this = this;
			if(_this.count > 0){				
				let numToStr = _this.count.toString();
				_this.countToArr = numToStr.split("");
			}
		},
	}
}

// 获取全局数据


// 全局变量
// commentnum: 270223  // 评论
// companynum: 61994 // 机构
// membernum: 5280951 // 学员
// orderpricenum: 656268 // 真实成交价数据
// productnum: 652477 // 课程
export const globalDataGetMixin = {
    data(){
		return{
			g_jyb_years: 10,  // 教育宝周年
			g_jyb_guwen: 200, // 顾问 200+
			g_jyb_cooperation: 6,  // 万+机构
			g_jyb_product: 60, // 万+课程
			g_jyb_transaction: 65, // 万+真实成交价数据
			g_jyb_member: 500
		}
	},
	mounted(){
		this.getGlobalData();
	},
	methods: {
		getGlobalData(){
			let _this = this;
			let ajaxUrl = _this.$api.GetCurStatistics.url + '&key={unionid:0}';
			_this.$ajax2(
				_this.$api.GetCurStatistics,
				ajaxUrl,
				'获取最新统计',
				function(res) {
					// console.log('获取最新统计 -- mixins');
					_this.g_jyb_years = new Date().getFullYear() - 2010;
					_this.g_jyb_cooperation = parseInt(res.data.data[0].companynum / 10000);
					_this.g_jyb_product = parseInt(res.data.data[0].productnum / 100000) * 10;
					_this.g_jyb_transaction = parseInt(res.data.data[0].orderpricenum / 10000);
					_this.g_jyb_member = parseInt(res.data.data[0].membernum / 1000000) * 100;
				},
				false
			);
		}
	}
}

// 用户跟踪记录
export const recordTrackingMixin = {
    data(){
		return{
			param:{ // 用户访问参数
				"landUrl": "", // 落地页
				"unionId": 74, // 联盟编号 [暂时默认]
				"userIdentity": "", // 访问用户的唯一标识
			},
			userParam:{ // 用户注册参数
				"userIdentity": "", // 用户的唯一标识
				"userSourceType": 1, // 用户的来源类型：WeChat = 1, Alipay = 2,  Baidu = 3, NetPage = 0 
				"unionId": 74, // 来源联盟编号 [暂时默认]
			},
			telUrl: '', // tel 
		}
	},
	mounted(){
		let _this = this;
		
		//// 微信小程序环境 执行下面埋点代码
		//  -- 20200821 [去掉微信小程序环境的条件编译] -- 百度小程序通用
		
			// 1.判断是否存在 guid：localStorage 获取
			//// 没有 guid：generateGUID() 获取
			let guid_str;
			_this.tools.getStorage("local_guid_str", function(res){
				// console.log(res);
				if(res != "error" && res.data){
					guid_str = res.data;
				}else{
					guid_str = generateGUID();
				}
				
				_this.tools.setStorage("local_guid_str", guid_str);
				_this.param.userIdentity = guid_str;
				getApp().globalData.g_userIdentity = guid_str;
				_this.userParam.userIdentity = guid_str;
				
				// console.log(guid_str);
				
				// 2.获取页面栈：landUrl、fromUrl
				_this.getPageUrl();
				
				// 3.跟踪记录
				// _this.trackRecordFn();
			})
			
			// this.getGlobalData();
		
		//
	},
	methods: {
		// 获取页页面路径
		getPageUrl(){
			let _this = this;
			let pages = getCurrentPages();    //获取加载的页面
			let curPage = pages[pages.length - 1];  //获取当前页面的对象
			let curUrl = curPage.route;  //当前页面url
			let curOpts = curPage.options;   //获取url中所带的参数
			_this.param.landUrl = _this.getUrlParam(curUrl, curOpts);
			_this.telUrl = curUrl;
			
			// #ifdef MP-BAIDU
				let qyPage = pages[0];  //获取当前页面的对象
				let qyUrl = curPage.route;  //当前页面page路径
				// 百度小程序判断：首次进入的是否为机构首页
				let firstEntryPage = uni.getStorageSync('firstEntryPage');
				if(!firstEntryPage){
					if(pages.length == 1 && qyUrl == "pages/index/index"){
						getApp().globalData.unionid_bd = 75;
						console.log("jiaoyubao");
						uni.setStorageSync('firstEntryPage', "jiaoyubao");
					}else{
						console.log("others");
						uni.setStorageSync('firstEntryPage', "others");
					}
				}
			// #endif
			
			if(pages.length > 1){
				let prePage = pages[pages.length - 2];  //获取当前页面的对象
				let preUrl = prePage.route;  //当前页面url
				let preOpts = prePage.options;   //获取url中所带的参数
				
				_this.param.fromUrl = _this.getUrlParam(preUrl, preOpts);
			}
			
			
			// 3.跟踪记录
			_this.trackRecordFn();
		},
		//拼接url的参数
		getUrlParam(url, options){
			let _this = this;
			let urlPage = url + '?';
			for (let key in options) {
				let value = options[key]
				urlPage += key + '=' + value + '&';
			}
			return urlPage.substring(0, urlPage.length - 1);
		},
		// 记录轨迹
		trackRecordFn(){
			let _this = this;
			
			// 20200821 记录百度小程序的访问轨迹
			// #ifdef MP-BAIDU
				_this.param.unionId = 0;
				_this.userParam.userSourceType = 3;
				_this.userParam.unionId = 0;
			// #endif
			
			uni.request({
				url: _this.$api.TrackRecord.url,
				method : _this.$api.TrackRecord.method,
				data: {
					param: JSON.stringify(_this.param),
					userParam: JSON.stringify(_this.userParam)
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
				},
				success: (res) => {
					console.log(res);
					
				},
				fail : (res) => {
					
				},
				complete : () => {
					
				}
			});
		},
		// 点击拨打电话时的用户行为统计
		telTrackRecordFn(callcode, comename, classid){
			// #call400?number400=4000290997&queuename=123456&comename=smpx&productid=12345
			let _this = this;
			
			// 20200821 记录百度小程序的拨打电话时的用户行为统计
			// #ifdef MP-BAIDU
				_this.param.unionId = 0;
				_this.userParam.userSourceType = 3;
				_this.userParam.unionId = 0;
			// #endif
			
			let telParam = {
				"landUrl": `#call400?number400=${getApp().globalData.tel400}&queuename=${callcode}&comename=${comename}&productid=${classid}`,
				"unionId": _this.param.unionId,
				"userIdentity": _this.param.userIdentity
			}
			uni.request({
				url: _this.$api.TrackRecord.url,
				method : _this.$api.TrackRecord.method,
				data: {
					param: JSON.stringify(telParam),
					userParam: JSON.stringify(_this.userParam)
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
				},
				success: (res) => {
					console.log(res);
					
				},
				fail : (res) => {
					
				},
				complete : () => {
					
				}
			});
		}
	}
}