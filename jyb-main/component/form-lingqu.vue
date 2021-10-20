<template>
	<view class="footer-form-container">
		<div class="m-fixed-form-content" v-show="isFormshow">
			<div class="m-fixed-form-inner mtop30">
				<div class="m-fixed-form-activity mtop20">
					<dl class="clearfloat">
						<img class="m-activity-bg" src="https://static.jiaoyubao.cn/images/mobile/hd-bg.svg" alt="" />
						<font v-if="activitybody.activitycode == '012001001002'">现金优惠</font>
						<font v-else-if="activitybody.activitycode == '012001001001'">限時折扣</font>
						<font v-else>赠送活动</font>
						<span class="flex-1 ellipsis-1">{{ activitybody.activityname }}</span>
					</dl>
				</div>
				<div class="m-jyb-form-group flex-box">
					<i class="m-common-icon icon_right_no_bg"></i>
					<view class="uni-list flex-1">
						<view class="uni-list-cell">
							<view class="uni-list-cell-db">
								<picker
									class="form-picker"
									@change="bindPickerCourseChange"
									@columnchange="bindPickerCoursseColumnChange"
									mode="selector"
									:value="pickerCourseIdx"
									:range="courseGroup"
								>
									<text v-if="classplaceholder" class="jyb-notice m-jyb-notice-course">请选择课程</text>
									<view v-else class="uni-input flex-1 m-jyb-input m-pop-input-city">{{ courseGroup[pickerCourseIdx] }}</view>
								</picker>
							</view>
						</view>
					</view>
				</div>
				<div class="m-jyb-form-group flex-box">
					<input
						type="number"
						v-model="formPhone"
						class="m-jyb-input flex-1 m-pop-input-phone"
						value=""
						placeholder="请输入您的手机号"
						placeholder-style="color: #ababab; font-size: 30rpx;"
					/>
				</div>
				<div class="m-jyb-form-group flex-box">
					<input
						type="number"
						v-model="formCode"
						class="m-jyb-input flex-1 m-pop-input-code"
						value=""
						placeholder="请输入4位验证码"
						placeholder-style="color: #ababab; font-size: 30rpx;"
					/>
					<button v-if="!isTimershow" class="mobile-code-btn" @click="getCode">获取验证码</button>
					<button v-else class="mobile-code-btn m-login-disabled" disabled="true">重新获取({{ codetimer }}s)</button>
				</div>
				<p class="m-fixed-form-tips mtop16">您将收到优惠短信，凭优惠券短信报名即可享受优惠哦</p>
			</div>
			<button v-if="!isSubmitok" :class="['m-jyb-btn', 'm-jyb-btn-blue', 'mt20', resetbtn ? 'reset-btn' : '']" @click="formSubmit">发送优惠券到手机</button>
			<button v-else :class="['m-jyb-btn', 'm-jyb-btn-blue', 'mt20', resetbtn ? 'reset-btn' : '']">
				<image src="https://static.jiaoyubao.cn/images/ajax_loading.gif" class="m-common-icon icon_loading" mode=""></image>
			</button>
		</div>
		<div class="m-fixed-form-content" v-show="!isFormshow">
			<div class="m-fixed-form-inner form-get-success">
				<image src="https://static.jiaoyubao.cn/images/uniapp/green-success.svg" mode="" class="green-success"></image>
				<h4>优惠领取成功</h4>
				<p>您的手机将收到优惠短信，凭优惠券短信报名即可享受优惠哦</p>
				<div class="m-success-line"><span></span></div>
				<text>如有任何疑问可致电：400-029-0997转{{ detailobj.callcode }}</text>
			</div>
		</div>
	</view>
</template>

<script>
import ipGetMixin from '../common/js/mixins.js';
export default {
	mixins: ipGetMixin,
	name: 'form-lingqu',
	//属性
	props: {
		resetbtn: {
			type: Boolean,
			value: false
		},
		pagename: {
			type: String,
			value: ''
		},
		comid: {
			type: String,
			value: ''
		},
		cityename: {
			type: String,
			value: ''
		},
		agencyename: {
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
		courseGroup: {
			type: Array, //属性类型
			value: []
		},
		activitybody: {
			type: Object,
			value: {}
		}
	},
	data() {
		return {
			formPhone: '',
			formCode: '',
			pickerCourseIdx: 0,
			// courseGroup: [],
			lingquFormShow: false,
			classplaceholder: true,
			codetimer: 60,
			isTimershow: false,
			isSubmitok: false,
			isFormshow: true
		};
	},
	//组件生命周期
	onLoad() {
	},

	methods: {
		// 表单提交
		formSubmit() {
			let _this = this;
			let isPhone = _this.tools.checkPhoneNum(_this.formPhone);
			if (_this.classplaceholder) {
				_this.tools.toastShow('请选择课程');
				return;
			}
			if (!isPhone) {
				_this.tools.toastShow('请正确输入手机号');
				return;
			}
			if (_this.formCode == '' || _this.formCode.length != 4) {
				_this.tools.toastShow('请正确输入验证码');
				return;
			}

			if (!_this.classplaceholder && isPhone && _this.formCode !== '') {
				_this.isSubmitok = true;
				_this.checkMessage();
			}
		},
		// 发送优惠券短信
		getActivityNotice() {
			let _this = this;
			let classId = _this.course[_this.pickerCourseIdx].id;
			let endTime = '';
			if (_this.activitybody.endtime !== '') {
				let dayarr = _this.activitybody.endtime.slice(0, 10).split('/');
				endTime = `${dayarr[0]}年${dayarr[1]}月${dayarr[2]}日`;
			} else {
				endTime = '长期有效';
			}
			let activityName = '';
			if (_this.activitybody.activitycode == '012001001002') {
				activityName = _this.activitybody.discount + '元' + _this.activitybody.activitytypename;
			} else if (_this.activitybody.activitycode == '012001001001') {
				activityName = _this.activitybody.discount + '折' + _this.activitybody.activitytypename;
			} else {
				activityName = _this.activitybody.activityname;
			}
			let cookieid = typeof P_Tongji_SessionID == 'undefined' ? '' : P_Tongji_SessionID;
			// let notice = `通知：您索取的${_this.detailobj.name}${activityName}，券码：*****，有效期：${endTime},详情以网站和机构说明为准。机构电话:400-029-0997转${
			// 	_this.detailobj.callcode
			// }如有问题请致电教育宝客服4006012788[教育宝]`;
			let reqUrl = encodeURIComponent(`/packageA/agencyactivity/index?angecy=${_this.agencyename}&activityId=${_this.activitybody.id}`);
			uni.request({
				url: `https://m.jiaoyubao.cn/edu/comHandler.ashx`,
				dataType: 'json',
				method: 'post',
				data: {
					os: 11,
					action: 'getactivity',
					mobile: _this.formPhone,
					code: _this.formCode,
					aid: _this.activitybody.id,
					pid: 'p' + classId,
					comename: _this.agencyename,
					url: reqUrl,
					flag:'jghd-sms',
					// content: notice,
					cookieid: getApp().globalData.g_userIdentity,
					unionid: getApp().globalData.unionid,
				},
				header: {
					"content-type":"application/x-www-form-urlencoded" // 默认值
				},
				success: res => {
					// console.log(res);
					if (res.data.result && res.data.result == '1') {
						// console.log('成功');
						setTimeout(function() {
							_this.isSubmitok = false;
							_this.isFormshow = false;
						}, 2000);
					} else {
						_this.isSubmitok = false;
						if (res.data.description) {
							_this.tools.toastShow(res.data.description);
						} else {
							_this.tools.toastShow('发生异常，请稍后重试');
						}
					}
				},
				fail: res => {
					// console.log('fail===' + JSON.stringify(res));
					_this.tools.toastShow('未知错误');
				}
			});
		},
		// 发送验证码按钮
		getCode() {
			let _this = this;
			let isPhone = _this.tools.checkPhoneNum(_this.formPhone);
			if (!isPhone) {
				_this.tools.toastShow('请正确输入手机号');
				return;
			} else {
				_this.sendMessage();
			}
		},
		// 发送短信验证码接口
		sendMessage() {
			let _this = this;
			let urlStr = encodeURIComponent('/packageA/agencyactivity/index');
			let ajaxUrl = _this.$api.PostMessageCode.url + '&key={mobile:' + _this.formPhone + ',flag:jghd-sms,url:' + urlStr + ',length:4,ip:' + _this.IP + '}';
			_this.$ajax2(
				_this.$api.PostMessageCode,
				ajaxUrl,
				'生成短信验证码',
				function(res) {
					if (res.data.result != 1) {
						_this.tools.toastShow('生成短信验证码失败');
						return;
					} else {
						_this.yanTimerOut();
					}
				},
				true
			);
		},
		// 验证短信验证码
		checkMessage() {
			let _this = this;
			let ajaxUrl = _this.$api.GetCodeCheck.url + '&key={mobile:' + _this.formPhone + ',code:' + _this.formCode + ',flag:jghd-sms}';
			_this.$ajax2(
				_this.$api.GetCodeCheck,
				ajaxUrl,
				'验证短信验证码',
				function(res) {
					if (res.data.result != 1) {
						_this.tools.toastShow('请输入正确的验证码');
						_this.isSubmitok = false;
					} else {
						_this.getActivityNotice();
					}
				},
				true
			);
		},
		// 验证码定时器
		yanTimerOut() {
			var yantimer;
			let _this = this;
			if (yantimer) {
				clearInterval(yantimer);
			}
			_this.isTimershow = true;
			_this.codetimer = 60;
			yantimer = setInterval(function() {
				_this.codetimer--;
				if (_this.codetimer < 0) {
					_this.codetimer = 60;
					_this.isTimershow = false;
					clearInterval(yantimer);
				}
			}, 1000);
		},
		bindPickerCourseChange(e) {
			let _this = this;
			_this.classplaceholder = false;
			// console.log('picker City 发送选择改变，携带值为', e.target.value);
			_this.pickerCourseIdx = e.target.value;
			// console.log('_this.pickerCourseIdx');
			// console.log(_this.pickerCourseIdx);
		}
	}
};
</script>

<style lang="scss">
.m-fixed-form-inner .jyb-form {
	width: 750upx;
}
.m-fixed-form-inner .jyb-input {
	height: 88upx;
	font-size: 30upx;
	line-height: 88upx;
	-moz-border-radius: 8upx;
	border-radius: 8upx;
}

.m-fixed-form-inner .m-jyb-input {
	width: 100%;
}
.form-picker,
.m-pop-input-city {
	height: 88upx;
	line-height: 88upx;
}
.m-jyb-notice-course {
	width: 610upx;
	height: 36upx;
	position: absolute;
	top: 18upx;
	left: 24upx;
	font-size: 30upx;
	line-height: 36upx;
	color: #ababab;
}

.mtop20 {
	margin-top: 40upx;
	margin-bottom: 40upx;
}
.m-activity-bg {
	width: 108upx;
	height: 36upx;
	display: inline-block;
	vertical-align: text-bottom;
}
.m-fixed-form-activity dl {
	position: relative;
}
.m-fixed-form-activity font {
	width: 108upx;
	height: 36upx;
	position: absolute;
	top: 0;
	left: 0;
	font-size: 22upx;
	line-height: 38upx;
	text-align: center;
	color: #fe5467;
}
.m-fixed-form-activity span {
	display: inline-block;
	width: 510upx;
	margin-left: 12upx;
	font-size: 28upx;
	line-height: 36upx;
	color: #262626;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.m-fixed-form-inner .jyb-notice {
	top: 26upx;
	font-size: 31upx;
}

.m-fixed-form-inner .jyb-form-has-btn {
	-moz-border-radius: 8upx;
	border-radius: 8upx;
}
.m-fixed-form-inner .jyb-form-has-btn .jyb-btn {
	width: 198upx;
	height: 84upx;
	padding: 0;
	font-size: 30upx;
	font-weight: normal;
	text-align: center;
	color: #1a8cff;
	-moz-border-radius: 8upx;
	border-radius: 8upx;
}
.m-fixed-form-inner .jyb-form-has-btn .jyb-input {
	height: 84upx;
	line-height: 84upx;
}
.jyb-form-has-btn:hover {
	border-color: #1a8cff;
}
.m-fixed-form-inner .jyb-form-group.mtop16,
.m-fixed-form-inner .jyb-form-group.mtop20 {
	margin-top: 12upx;
}

.m-fixed-form-inner .jyb-form-has-btn .jyb-btn:disabled {
	width: auto;
	min-width: 198upx;
	padding: 0 24upx;
	color: #ababab;
}

.m-fixed-form-tips {
	font-size: 24upx;
	line-height: 34upx;
	color: #595959;
}
.m-pop-input-code {
	width: 430upx;
	height: 84upx;
	line-height: 84upx;
}
.mobile-code-btn:before {
	width: 2upx;
	height: 48upx;
	margin-top: -24upx;
	position: absolute;
	z-index: 10;
	top: 50%;
	left: 0;
	display: block;
	content: '';
	background: #d9d9d9;
}
.mobile-code-btn {
	width: 210upx;
	height: 84upx;
	background: #fff;
	line-height: 88upx;
	padding-left: 20upx;
	font-size: 30upx;
	font-weight: normal;
	text-align: center;
	color: #1a8cff;
	-moz-border-radius: 8upx;
	border-radius: 8upx;
}
.m-login-disabled {
	color: #ababab;
	background-color: #ffffff !important;
	font-size: 28upx;
}
.m-jyb-btn-blue.reset-btn {
	width: 788upx;
	height: 96upx;
	@include ml(-54upx);
	@include mt(60upx);
	@include lh(96upx);
	border: 0;
	@include bdr(0);
	@include fs(32upx);
	@include fw();
}
.green-success {
	display: block;
	width: 120upx;
	height: 120upx;
	margin: 48upx auto 32upx;
}
.form-get-success {
	padding-bottom: 48upx;
}
.form-get-success h4 {
	margin-bottom: 16upx;
	font-size: 40upx;
	font-weight: 600;
	color: #262626;
	text-align: center;
	line-height: 52upx;
}
.form-get-success p {
	display: block;
	width: 606upx;
	margin: 0rpx auto 127rpx;
	font-size: 28upx;
	color: #8c8c8c;
	text-align: center;
	line-height: 44upx;
}
.form-get-success text {
	display: block;
	font-size: 26upx;
	color: #8c8c8c;
	letter-spacing: 0;
	text-align: center;
}
.m-success-line {
	height: 2upx;
	padding: 37upx 0upx;
	background: #fff;
}
.m-success-line span {
	width: 100%;
	height: 2upx;
	display: inline-block;
	float: left;
	background: #eee;
}
.icon_loading {
	margin-top: 20rpx;
	padding-right: 10rpx;
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
	.m-jyb-btn-blue.reset-btn {
		@include mb(68upx);
	}
}
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
	.m-jyb-btn-blue.reset-btn {
		@include mb(68upx);
	}
}

@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
	.m-jyb-btn-blue.reset-btn {
		@include mb(68upx);
	}
}
</style>
