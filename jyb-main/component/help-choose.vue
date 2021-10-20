<template>
	<!-- 帮选课组件 -- 废弃 -->
	<view class="">
		<div class="m-pop-choose-class-form">
			<div class="m-pop-form-inner">
				<div class="m-jyb-form-group flex-box">
					<!-- <input type="text" class="m-jyb-input flex-1 m-pop-input-city" value="济南市" placeholder="请选择城市" disabled="true"> -->
					<i class="m-common-icon icon_right_no_bg"></i>
					<view class="uni-list flex-1">
						<view class="uni-list-cell">
							<view class="uni-list-cell-db">
								<picker
									@change="bindPickerCityChange"
									@columnchange="bindPickerCityColumnChange"
									mode="multiSelector"
									:value="pickerCityIdx"
									:range="cityGroup"
								>
									<view class="uni-input flex-1 m-jyb-input m-pop-input-city">{{ cityGroup[1][pickerCityIdx[1]] }}</view>
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
									@change="bindPickerClassChange"
									@columnchange="bindPickerClassColumnChange"
									mode="multiSelector"
									:value="pickerClassIdx"
									:range="categoryGroup"
								>
									<view class="uni-input flex-1 m-jyb-input m-pop-input-class">
										{{ categoryGroup[2][pickerClassIdx[2]] == '全部' ? categoryGroup[1][pickerClassIdx[1]] : categoryGroup[2][pickerClassIdx[2]] }}
									</view>
								</picker>
							</view>
						</view>
					</view>
				</div>
				<div class="m-jyb-form-group flex-box">
					<!-- <input type="number" class="m-jyb-input flex-1 m-pop-input-phone" value="" placeholder="请输入您的手机号码，隐私保护"> -->
					<input
						type="text"
						v-model="formName"
						class="m-jyb-input flex-1 m-pop-input-name"
						value=""
						placeholder="请输入您的姓名，隐私保护"
						placeholder-style="color: #ababab; font-size: 15px;"
					/>
				</div>
				<div class="m-jyb-form-group flex-box">
					<!-- <input type="number" class="m-jyb-input flex-1 m-pop-input-code" value="" placeholder="请输入短信验证码">
					<button class="m-jyb-btn-getcode">获取验证码</button> -->
					<input
						type="number"
						v-model="formPhone"
						class="m-jyb-input flex-1 m-pop-input-phone"
						value=""
						placeholder="请输入您的手机号码，隐私保护"
						placeholder-style="color: #ababab; font-size: 15px;"
					/>
				</div>
				<button class="m-jyb-btn m-jyb-btn-blue mt20" @click="chooseClassForFree">免费帮我选课</button>
			</div>
		</div>
	</view>
</template>

<script>
	// import { mapState } from 'vuex' // 注意别漏了引入
	
	export default {
		name: "tem-name",
		//属性
		props: {
			pickercityidx: { // pickerCityIdx
				type: Array, //属性类型
				value: []
			},
			citygroup: { // cityGroup
				type: Array, //属性类型
				value: []
			},
			pickerclassidx: { // pickerClassIdx
				type: Array, //属性类型
				value: []
			},
		},
		data(){
			return {
				formName: '',
				formPhone: '',
			}
		},
		//组件生命周期
		created: function(e) {
	
		},
		// 引入 mapState 时使用
		// computed: {
		// 	...mapState([ // 获取数据
		// 		"returnTopNum"
		// 	]),
		// },
		methods: {
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
				_this.cityCodeGroup = dataArray.cityArr.filter(item => item.code.startsWith(dataArray.provinceArr[_this.pickerCityIdx[0]].code));
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
				let Group1 = dataArray.categoryGroup[_this.pickerClassIdx[0]].child.map(item => item.name);
				_this.categoryCodeGroup = dataArray.categoryGroup[_this.pickerClassIdx[0]].child[_this.pickerClassIdx[1]].child;
				let Group2 = _this.categoryCodeGroup.map(item => item.name);
				_this.$set(_this.categoryGroup, 1, Group1);
				_this.$set(_this.categoryGroup, 2, Group2);
				// console.log(_this.categoryCodeGroup);
			},
			// choose class pop 免费帮我选课
			chooseClassForFree() {
				let _this = this;
				// 验证选择或填写的内容的正确性
				if (_this.formName == '') {
					_this.tools.toastShow('请输入您的姓名');
					return;
				}
				if (!_this.tools.checkPhoneNum(_this.formPhone)) {
					_this.tools.toastShow('请正确输入手机号');
					return;
				}
			
				// 验证 success
				_this.submitForm();
			},
			// 提交表单
			submitForm() {
				let _this = this;
				let cityEname = '';
				let classEname = '';
				let className = '';
				let phone = '';
				if (_this.isRecommendInputshow) {
					cityEname = _this.cityEname;
					classEname = _this.recommendClassename;
					className = encodeURIComponent(_this.recommendClassname);
					phone = _this.recformPhone;
				} else {
					cityEname = _this.cityCodeGroup[_this.pickerCityIdx[1]].ename;
					classEname = _this.categoryCodeGroup[_this.pickerClassIdx[2]].url;
					className = encodeURIComponent(_this.formName);
					phone = _this.formPhone;
				}
				_this.tools.loadingShow('提交请求...');
				uni.request({
					url: 'https://m.jiaoyubao.cn/NationHandler.ashx',
					data: {
						action: 'mipoint',
						city: cityEname,
						edu: classEname,
						name: className,
						phone: phone,
						url: encodeURIComponent('/pages/index/index'),
						cookieid: getApp().globalData.g_userIdentity,
						unionid: getApp().globalData.unionid,
						rand: Math.random()
					},
					method: 'GET',
					success: res => {
						// console.log(res);
						if (res.data.result && res.data.result == '1') {
							// console.log('成功');
							// 提交成功！（换行）稍后顾问电话联系您，请耐心等待~
							uni.showModal({
								title: '提交成功！',
								content: '稍后顾问电话联系您，请耐心等待',
								showCancel: false,
								confirmText: '我知道了',
								confirmColor: '#1a8cff'
							});
							_this.formPhone = '';
							_this.formName = '';
							_this.recformPhone = '';
							_this.formCode = '';
							_this.getStayTime();
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
		}
	}
</script>

<style lang="scss">
	.m-pop-choose-class-form { width: 100%; min-height: 200upx; padding: 10upx 12upx; box-shadow: 0 0 16upx 0 rgba(0, 121, 207, .20); @include bgc(#fff); @include bdr(16upx); }
	.m-pop-form-inner { width: 100%; height: 100%; padding: 28upx 30upx 32upx; border: 2upx solid #e2f3ff; @include bdr(16upx); }
</style>
