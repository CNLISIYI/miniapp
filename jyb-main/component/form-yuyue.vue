<template>
	<view class="">
		<div class="m-fixed-form-content">
			<div class="m-fixed-form-inner mtop30">
				<!-- <div class="jyb-form-group">
					<div class="jyb-form jyb-weui-cascade-picker">
						<input type="text" class="jyb-input m-jyb-input-course" data-type="choose" readonly="" style="line-height: 18px;">
						<span class="jyb-notice m-jyb-notice-course">请选择课程</span>
						<img class="" src="https://static.jiaoyubao.cn/images/mobile/icon-rightarrow.svg" alt="">
					</div>
				</div>
				<div class="jyb-form-group mtop20">
					<div class="jyb-form jyb-weui-cascade-picker">
						<input type="text" class="jyb-input m-jyb-input-campus" data-type="choose" readonly="" style="line-height: 18px;">
						<span class="jyb-notice m-jyb-notice-campus">请选择校区</span>
						<img class="" src="https://static.jiaoyubao.cn/images/mobile/icon-rightarrow.svg" alt="">
					</div>
				</div> -->
				<!-- <div class="jyb-form-group mtop20">
					<div class="jyb-form">
						<input type="number" class="jyb-input m-jyb-input-phone" pattern="\d*" oninput="value=value.replace(/[^\d]/g,'');" style="line-height: 18px;">
						<span class="jyb-notice">请输入您的手机号</span>
					</div>
				</div> -->
				<div class="m-jyb-form-group flex-box">
					<!-- <input type="text" class="m-jyb-input flex-1 m-pop-input-city" value="济南市" placeholder="请选择城市" disabled="true"> -->
					<i class="m-common-icon icon_right_no_bg"></i>
					<view class="uni-list flex-1">
						<view class="uni-list-cell">
							<view class="uni-list-cell-db">
								<picker
									@change="bindPickerCourseChange"
									@columnchange="bindPickerCoursseColumnChange"
									mode="selector"
									:value="pickerCourseIdx"
									:range="courseGroup"
									style="font-size: 30rpx;"
								>
									<view class="uni-input flex-1 m-jyb-input m-pop-input-city">{{ courseGroup[pickerCourseIdx] }}</view>
								</picker>
							</view>
						</view>
					</view>
				</div>
				<div class="m-jyb-form-group flex-box">
					<!-- <input type="text" class="m-jyb-input flex-1 m-pop-input-class" value="" placeholder="请选择课程" disabled="true"> -->
					<i class="m-common-icon icon_right_no_bg"></i>
					<view class="uni-list flex-1">
						<view class="uni-list-cell">
							<view class="uni-list-cell-db">
								<picker
									@change="bindPickerCampusChange"
									@columnchange="bindPickerCampusColumnChange"
									mode="selector"
									:value="pickerCampusIdx"
									:range="campusGroup"
								>
									<view class="uni-input flex-1 m-jyb-input m-pop-input-class">
										{{ campusGroup[pickerCampusIdx] }}
									</view>
								</picker>
							</view>
						</view>
					</view>
				</div>
				<div class="m-jyb-form-group flex-box">
					<!-- <input type="number" class="m-jyb-input flex-1 m-pop-input-code" value="" placeholder="请输入短信验证码">
					<button class="m-jyb-btn-getcode">获取验证码</button> -->
					<!-- #ifdef MP-WEIXIN -->
					<input
						v-if="isgetphoneok"
						type="number"
						v-model="formPhone"
						class="m-jyb-input flex-1 m-pop-input-phone"
						value=""
						placeholder="请输入您的手机号"
						placeholder-style="color: #ababab; font-size: 15px;"
					/>
					<button v-else class="m-jyb-input flex-1 m-pop-input-phone" style="background: transparent;" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"></button>
					<!-- #endif -->
					<!-- #ifndef MP-WEIXIN -->
					<input
						type="number"
						v-model="formPhone"
						class="m-jyb-input flex-1 m-pop-input-phone"
						value=""
						placeholder="请输入您的手机号"
						placeholder-style="color: #ababab; font-size: 15px;"
					/>
					<!-- #endif -->
				</div>
				<p class="m-fixed-form-tips mtop16" style="text-align: left;">机构会通过电话与您联系，请保证电话真实畅通～</p>
			</div>
			<button :class="['m-jyb-btn', 'm-jyb-btn-blue', 'mt20', resetbtn ? 'reset-btn' : '']" @click="formSubmit">立即预约试听</button>
		</div>
	</view>
</template>

<script>
	// import { mapState } from 'vuex' // 注意别漏了引入

	export default {
		name: "form-yuyue",
		//属性
		props: {
			resetbtn:{
				type: Boolean,
				value: false
			},
			pagename: {
				type: String,
				value: ''
			},
			comid:{
				type: String,
				value: ''
			},
			cityename:{
				type: String,
				value: ''
			},
			agencyename:{
				type: String,
				value: ''
			},
			detailobj: {
				type: Object,
				value: {}
			},
			course: {
				type: Array, //属性类型
				value: []
			},
			campus: {
				type: Array, //属性类型
				value: []
			},
		},
		data(){
			return{
				formPhone: '',
				pickerCourseIdx: 0,
				courseGroup: [],
				pickerCampusIdx: 0,
				campusGroup: [],
				isgetphoneok: false
			}
		},
		//组件生命周期
		created: function(e) {
			let _this = this;
			// #ifdef MP-WEIXIN
			_this.formPhone = uni.getStorageSync('userMobile') || '';
			if(_this.formPhone) {
				_this.isgetphoneok = true;
			}
			else {
				_this.isgetphoneok = false;
			}
			// #endif
			_this.filterArr();
		},
		// 引入 mapState 时使用
		// computed: {
		// 	...mapState([ // 获取数据
		// 		"returnTopNum"
		// 	]),
		// },
		methods: {
			// 手机号授权
			getPhoneNumber(e) {
				let _this = this;
				_this.isgetphoneok = true;
				if (e.detail.errMsg == 'getPhoneNumber:fail user deny' || e.detail.errMsg == 'getPhoneNumber:fail:user deny') {
					_this.tools.toastShow('授权失败');
				}
				else {
					uni.request({
					  url: 'https://webapi.jiaoyubao.cn/decryptPhone/',
					  method: 'POST',
					  data: JSON.stringify({
						  encryptedData: e.detail.encryptedData,
						  iv: e.detail.iv,
						  session_key: uni.getStorageSync('userSession')
					  }),
					  dataType: 'json',
					  header: {
					    'content-type': 'application/json' 
					  },
					  success:function(res){
					    _this.formPhone = JSON.parse(res.data.data).purePhoneNumber;
						uni.setStorageSync('userMobile', _this.formPhone);
					  },
					  fail:function(res){
					  }
					})
				}
			},
			// 表单提交
			formSubmit(){
				let _this = this;
				let isPhone = _this.tools.checkPhoneNum(_this.formPhone);
				if(!isPhone){
					_this.tools.toastShow('请正确输入手机号');
					return;
				}

				let classId = _this.course[_this.pickerCourseIdx].id;
				let className = _this.course[_this.pickerCourseIdx].class_name;
				let schoolName = _this.campus[_this.pickerCampusIdx].pointname;

				_this.tools.loadingShow('提交请求...');
				uni.request({
					url: 'https://m.jiaoyubao.cn/comHandler.ashx',
					data: {
						action: 'audition',
						mobile: _this.formPhone,
						url: encodeURIComponent(`/pages/${_this.pagename}/index?angecy=${_this.agencyename}`), //
						comid: _this.comid,
						classId: 'p'+classId,
						classname: className,
						campus: schoolName,
						cookieid: getApp().globalData.g_userIdentity,
						unionid: getApp().globalData.unionid,
					},
					method: 'POST',
					header: {
						"content-type":"application/x-www-form-urlencoded" // 默认值
					},
					success: res => {
						if (res.data.result && res.data.result == '1') {
							// console.log('成功');
							// 提交成功！（换行）稍后顾问电话联系您，请耐心等待~
							uni.showModal({
								title: '您已成功预约！',
								content: '机构会通过电话与您联系，请保证手机通话畅通，平均5分钟得到答复',
								showCancel: false,
								confirmText: '我知道了',
								confirmColor: '#1a8cff',
								success: function (res) {
									if (res.confirm) {
										// console.log('用户点击确定');
										_this.$emit('popClose', '');
									}
								}
							});
						} else {
							if (res.data.description) {
								_this.tools.toastShow(res.data.description);
							} else {
								_this.tools.toastShow('预约失败');
							}
						}
					},
					fail: res => {
						// console.log('fail===' + JSON.stringify(res));
						_this.tools.toastShow('预约失败');
					},
					complete: () => {
						_this.tools.loadingHide();
					}
				});
			},
			// 数组筛选
			filterArr(){
				let _this = this;
				_this.courseGroup = _this.course.map(item => _this.tools.UnicodeToAscii(item.class_name));
				_this.campusGroup = _this.campus.map(item => item.pointname);
				// console.log("courseGroup..campusGroup");
				// console.log(_this.courseGroup);
				// console.log(_this.campusGroup);
			},
			// form
			bindPickerCourseChange(e) {
				let _this = this;
				// console.log('picker City 发送选择改变，携带值为', e.target.value);
				_this.pickerCourseIdx = e.target.value;
				// console.log("_this.pickerCourseIdx");
				// console.log(_this.pickerCourseIdx);
			},
			// bindPickerCoursseColumnChange(e) {
			// 	let _this = this;
			// 	// console.log(e.target);
			// 	if (e.target.column == 0) {
			// 		_this.$set(_this.pickerCourseIdx, 0, e.target.value);
			// 		_this.$set(_this.pickerCourseIdx, 1, 0);
			// 		_this.handlerCityPickerData();
			// 	} else {
			// 		_this.$set(_this.pickerCourseIdx, 1, e.target.value);
			// 	}
			// },
			// handlerCityPickerData() {
			// 	let _this = this;
			// 	_this.cityCodeGroup = dataArray.cityArr.filter(item => item.code.startsWith(dataArray.provinceArr[_this.pickerCourseIdx[0]].code));
			// 	let Group1 = _this.cityCodeGroup.map(item => item.name);
			// 	_this.$set(_this.courseGroup, 1, Group1);
			// },
			bindPickerCampusChange(e) {
				let _this = this;
				// console.log('picker Class 发送选择改变，携带值为', e.target.value);
				_this.pickerCampusIdx = e.target.value;
				// console.log("_this.pickerCampusIdx");
				// console.log(_this.pickerCampusIdx);
			},
			// bindPickerCampusColumnChange(e) {
			// 	let _this = this;
			// 	// console.log(e.target);
			// 	switch (e.target.column) {
			// 		case 0:
			// 			_this.$set(_this.pickerCampusIdx, 0, e.target.value);
			// 			_this.$set(_this.pickerCampusIdx, 1, 0);
			// 			_this.$set(_this.pickerCampusIdx, 2, 0);
			// 			_this.handlerClassPickerData();
			// 			break;
			// 		case 1:
			// 			_this.$set(_this.pickerCampusIdx, 1, e.target.value);
			// 			_this.$set(_this.pickerCampusIdx, 2, 0);
			// 			_this.handlerClassPickerData();
			// 			break;
			// 		case 1:
			// 			_this.$set(_this.pickerCampusIdx, 2, e.target.value);
			// 			break;
			// 		default:
			// 			break;
			// 	}
			// },
			// handlerClassPickerData() {
			// 	let _this = this;
			// 	let Group1 = dataArray.campusGroup[_this.pickerCampusIdx[0]].child.map(item => item.name);
			// 	_this.categoryCodeGroup = dataArray.campusGroup[_this.pickerCampusIdx[0]].child[_this.pickerCampusIdx[1]].child;
			// 	let Group2 = _this.categoryCodeGroup.map(item => item.name);
			// 	_this.$set(_this.campusGroup, 1, Group1);
			// 	_this.$set(_this.campusGroup, 2, Group2);
			// },
		}
	}
</script>

<style lang="scss">
	.m-fixed-form-inner .jyb-form { width: 100%; }
	.m-fixed-form-inner .jyb-input { height: 44px; font-size: 15px; line-height: 44px; -moz-border-radius: 4px; border-radius: 4px; }

	.m-fixed-form-inner .m-jyb-input{ width: 100%; }

	.m-fixed-form-inner .jyb-notice { top: 13px; font-size: 15px; }

	.m-fixed-form-inner .jyb-form-has-btn { -moz-border-radius: 4px; border-radius: 4px; }
	.m-fixed-form-inner .jyb-form-has-btn .jyb-btn { width: 99px; height: 42px; padding: 0; font-size: 15px; font-weight: normal; text-align: center; color: #1a8cff; -moz-border-radius: 4px; border-radius: 4px; }
	.m-fixed-form-inner .jyb-form-has-btn .jyb-input { height: 42px; line-height: 42px; }
	.jyb-form-has-btn:hover { border-color: #1a8cff; }
	.m-fixed-form-inner .jyb-form-group.mtop16, .m-fixed-form-inner .jyb-form-group.mtop20 { margin-top: 6px; }
	.m-fixed-form-inner .jyb-form-has-btn .m-login-disabled { cursor: not-allowed; color: #ababab; }

	.m-fixed-form-inner .jyb-form-has-btn .jyb-btn:disabled { width: auto; min-width: 99px; padding: 0 12px; color: #ababab; }

	.m-fixed-form-tips { font-size: 12px; line-height: 17px; color: #595959; }


	.m-jyb-btn-blue.reset-btn{
		width: 100vw;
		height: 96upx;
		@include ml(-24px);
		@include mt(30px);
		@include lh(96upx);
		border: 0;
		@include bdr(0);
		@include fs(32upx);
		@include fw();

	}
</style>
