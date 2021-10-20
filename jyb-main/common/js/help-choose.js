// 帮选课
export const helpChooseClass = {
    data(){
		return{
			cityGroup: [[], []],
			cityCodeGroup: [],
			categoryCodeGroup: [],
			categoryGroup: [[], [], []],
			pickerCityIdx: [8, 0],
			pickerClassIdx: [0, 0, 0],
			
			curPageUrl: '/packageA/xiaomi/index',
			timer: null, // 定时器名字
			countDownNum: 60, // 倒计时初始值
			helpChooseCode: ''
		}
	},
	mounted(){
		
	},
	methods: {
		getCityGroupCurCity() {
			let _this = this;
			let curProvinceCode = _this.cityCode.substr(0, 6);
			_this.cityGroup[0] = _this.dataArrayFromJson.provinceArr.map(item => item.name);
			for (let i = 0, len = _this.dataArrayFromJson.provinceArr.length; i < len; i++) {
				if (curProvinceCode == _this.dataArrayFromJson.provinceArr[i].code) {
					_this.$set(_this.pickerCityIdx, 0, i);
					_this.cityCodeGroup = _this.dataArrayFromJson.cityArr.filter(item => item.code.startsWith(_this.dataArrayFromJson.provinceArr[i].code));
					_this.cityGroup[1] = _this.cityCodeGroup.map(item => item.name);
				}
			}
		},
		// form
		bindPickerCityChange(e) {
			let _this = this;
			// console.log('picker City 发送选择改变，携带值为', e.target.value);
			this.pickerCityIdx = e.target.value;
		},
		bindPickerCityColumnChange(e) {
			let _this = this;
			// console.log(e.target);
			if (e.target.column == 0) {
				_this.$set(_this.pickerCityIdx, 0, e.target.value);
				_this.$set(_this.pickerCityIdx, 1, 0);
				_this.handlerCityPickerData();
			} else {
				_this.$set(_this.pickerCityIdx, 1, e.target.value);
			}
		},
		handlerCityPickerData() {
			let _this = this;
			_this.cityCodeGroup = _this.dataArrayFromJson.cityArr.filter(item => item.code.startsWith(_this.dataArrayFromJson.provinceArr[_this.pickerCityIdx[0]].code));
			let Group1 = _this.cityCodeGroup.map(item => item.name);
			_this.$set(_this.cityGroup, 1, Group1);
		},
		bindPickerClassChange(e) {
			let _this = this;
			// console.log('picker Class 发送选择改变，携带值为', e.target.value);
			_this.pickerClassIdx = e.target.value;
		},
		bindPickerClassColumnChange(e) {
			let _this = this;
			// console.log(e.target);
			switch (e.target.column) {
				case 0:
					_this.$set(_this.pickerClassIdx, 0, e.target.value);
					_this.$set(_this.pickerClassIdx, 1, 0);
					_this.$set(_this.pickerClassIdx, 2, 0);
					_this.handlerClassPickerData();
					break;
				case 1:
					_this.$set(_this.pickerClassIdx, 1, e.target.value);
					_this.$set(_this.pickerClassIdx, 2, 0);
					_this.handlerClassPickerData();
					break;
				case 1:
					_this.$set(_this.pickerClassIdx, 2, e.target.value);
					break;
				default:
					break;
			}
		},
		handlerClassPickerData() {
			let _this = this;
			let Group1 = _this.dataArrayFromJson.categoryGroup[_this.pickerClassIdx[0]].child.map(item => item.name);
			_this.categoryCodeGroup = _this.dataArrayFromJson.categoryGroup[_this.pickerClassIdx[0]].child[_this.pickerClassIdx[1]].child;
			let Group2 = _this.categoryCodeGroup.map(item => item.name);
			_this.$set(_this.categoryGroup, 1, Group1);
			_this.$set(_this.categoryGroup, 2, Group2);
			// console.log(_this.categoryCodeGroup);
		},
		// choose class pop 免费帮我选课
		chooseClassForFree() {
			let _this = this;
			// 验证选择或填写的内容的正确性
			// if (_this.formName == '') {
			// 	_this.tools.toastShow('请输入您的姓名');
			// 	return;
			// }
			if (!_this.tools.checkPhoneNum(_this.formPhone)) {
				_this.tools.toastShow('请正确输入手机号');
				return;
			}
			if (_this.helpChooseCode == '') {
				_this.tools.toastShow('请正确输入验证码');
				return;
			}
		
			// 验证 success
			_this.submitForm();
		},
		// 帮选课-获取验证码
		gethelpChooseCode(){
			let _this = this;
			if (!_this.tools.checkPhoneNum(_this.formPhone)) {
				_this.tools.toastShow('请正确输入手机号');
				// _this.createCode();
				return false;
			}
			_this.component.getSMSCode(_this, _this.curPageUrl, _this.formPhone, _this.IP, "help-choose-sms");
		},
		// 提交表单
		submitForm() {
			let _this = this;
			let cityEname = '';
			let classEname = '';
			let className = '';
			let phone = '';
			let ajaxUrl = '', ajaxMethod, ajaxHeader, ajaxData;
			if (_this.isRecommendInputshow) {
				cityEname = _this.cityEname;
				classEname = _this.recommendClassename;
				className = encodeURIComponent(_this.recommendClassname);
				phone = _this.recformPhone;
				
				ajaxUrl = 'https://m.jiaoyubao.cn/NationHandler.ashx';
				ajaxMethod = "GET";
				ajaxHeader = {};
				ajaxData = {
					action: 'mipoint',
					city: cityEname,
					edu: classEname,
					name: className,
					phone: phone,
					url: encodeURIComponent('/pages/index/index'),
					cookieid: getApp().globalData.g_userIdentity,
					unionid: getApp().globalData.unionid,
					rand: Math.random()
				}
			} else {
				cityEname = _this.cityCodeGroup[_this.pickerCityIdx[1]].ename;
				classEname = _this.categoryCodeGroup[_this.pickerClassIdx[2]].url;
				className = encodeURIComponent(_this.formName);
				phone = _this.formPhone;
				
				ajaxUrl = 'https://m.jiaoyubao.cn/h5Handler.ashx';
				ajaxHeader = {
					'content-type': "application/x-www-form-urlencoded"
				};
				ajaxMethod = "POST";
				ajaxData = {
					action: "helpchoose", 
					city: cityEname, 
					edu: classEname, 
					mobile: phone, 
			
					// name: "测试",
					code: _this.helpChooseCode, 
					flag:"help-choose-sms",
			
					url: encodeURIComponent(_this.curPageUrl),
					cookieid: getApp().globalData.g_userIdentity,
					unionid: getApp().globalData.unionid
					// rand: Math.random()
				}
			}
			_this.tools.loadingShow('提交请求...');
			uni.request({
				url: ajaxUrl,
				data: ajaxData,
				header: ajaxHeader,
				method: ajaxMethod,
				success: res => {
					// console.log(res);
					if (res.data.result && res.data.result == '1') {
						// console.log('成功');
						// 提交成功！（换行）稍后顾问电话联系您，请耐心等待~
						uni.showModal({
							title: '免费选课申请成功',
							content: '选课顾问稍后为您提供个性化的选课服务，请保持手机通话畅通。',
							showCancel: false,
							confirmText: '我知道了',
							confirmColor: '#1a8cff'
						});
						_this.formPhone = '';
						_this.formName = '';
						_this.recformPhone = '';
						_this.formCode = '';
						_this.helpChooseCode = '';
						if (_this.isRecommendInputshow){
							_this.getStayTime();
						}
					} else {
						if (res.data.description) {
							_this.tools.toastShow(res.data.description);
						} else {
							_this.tools.toastShow('请求失败');
						}
					}
				},
				fail: res => {
					// console.log('fail===' + JSON.stringify(res));
					_this.tools.toastShow('请求失败');
				},
				complete: () => {
					_this.tools.loadingHide();
					// _this.chooseClassPopIsShow = false;
					_this.handlerPopHide();
				}
			});
		},
		getStayTime() {
			let _this = this;
			_this.begainTime = new Date().getTime();
			uni.setStorageSync('localCloseTime', _this.begainTime);
		},
		handlerPopHide(){
			
		}
	}
}