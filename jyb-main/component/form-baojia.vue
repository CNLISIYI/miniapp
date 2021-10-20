<template>
	<view class="">
		<div class="m-fixed-form-content">
			<div class="m-fixed-form-inner mtop30">
				<div class="m-jyb-form-group flex-box">
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
								>
									<view class="uni-input flex-1 m-jyb-input m-pop-input-city">{{ courseGroup[pickerCourseIdx] }}</view>
								</picker>
							</view>
						</view>
					</view>
				</div>
				<div class="m-jyb-form-group flex-box">
					<input
						type="text"
						v-model="formName"
						class="m-jyb-input flex-1 m-pop-input-name"
						value=""
						placeholder="请输入您的称呼"
						placeholder-style="color: #ababab; font-size: 15px;"
					/>
				</div>
				<div class="m-jyb-form-group flex-box">
					<input
						type="number"
						v-model="formPhone"
						class="m-jyb-input flex-1 m-pop-input-phone"
						value=""
						placeholder="请输入您的手机号"
						placeholder-style="color: #ababab; font-size: 15px;"
					/>
				</div>
				<p class="m-fixed-form-tips mtop16" style="text-align: left;">机构会通过电话与您联系，请保证电话真实畅通～</p>
			</div>
			<button :class="['m-jyb-btn', 'm-jyb-btn-blue', 'mt20', resetbtn ? 'reset-btn' : '']" @click="formSubmit">立即获取报价</button>
		</div>
	</view>
</template>

<script>
	// import { mapState } from 'vuex' // 注意别漏了引入

	export default {
		name: "form-baojia",
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
		},
		data(){
			return{
				formPhone: '',
				formName: '',
				pickerCourseIdx: 0,
				courseGroup: [],
			}
		},
		//组件生命周期
		created: function(e) {
			let _this = this;
			_this.filterArr();
		},
		// 引入 mapState 时使用
		// computed: {
		// 	...mapState([ // 获取数据
		// 		"returnTopNum"
		// 	]),
		// },
		methods: {
			// 表单提交
			formSubmit(){
				let _this = this;
				if(_this.formName == ''){
					_this.tools.toastShow('请输入您的称呼');
					return;
				}
				let isPhone = _this.tools.checkPhoneNum(_this.formPhone);
				if(!isPhone){
					_this.tools.toastShow('请正确输入手机号');
					return;
				}
				
				let classId = _this.course[_this.pickerCourseIdx].id;
				let className = _this.course[_this.pickerCourseIdx].class_name;
				
				_this.tools.loadingShow('提交请求...');
				uni.request({
					url: 'https://m.jiaoyubao.cn/comHandler.ashx',
					data: {
						action: 'getOffer',
						classname: encodeURIComponent(className),
						name: _this.formName,
						mobile: _this.formPhone,
						url: encodeURIComponent(`/pages/${_this.pagename}/index?angecy=${_this.agencyename}`), // 
						comid: _this.comid,
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
								title: '您已成功获取报价！',
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
								_this.tools.toastShow('获取报价失败');
							}
						}
					},
					fail: res => {
						// console.log('fail===' + JSON.stringify(res));
						_this.tools.toastShow('获取报价失败');
					},
					complete: () => {
						_this.tools.loadingHide();
					}
				});
			},
			// 数组筛选
			filterArr(){
				let _this = this;
				_this.courseGroup = _this.course.map(item => item.class_name);
				// console.log("courseGroup..");
				// console.log(_this.courseGroup);
			},
			// form
			bindPickerCourseChange(e) {
				let _this = this;
				// console.log('picker City 发送选择改变，携带值为', e.target.value);
				_this.pickerCourseIdx = e.target.value;
				// console.log("_this.pickerCourseIdx");
				// console.log(_this.pickerCourseIdx);
			},
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
