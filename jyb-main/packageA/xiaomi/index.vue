<template>
	<view class="m-common-container m-index-container flex-box-column">
		<!-- <web-view :src="webUrl" @message="getWebviewMsg" :webview-styles="webviewStyles"></web-view> -->

		<!-- choose class pop -->
		<div class="m-pop-choose-class">
			<div class="banner-container">
				<img src="https://static.jiaoyubao.cn/images/uniapp/bx-banner@2x.png" alt="">
                <p class="tips">{{g_jyb_guwen}}名资深顾问团队{{g_jyb_years}}年服务{{g_jyb_member}}万+学员</p>
				<swiper class="swiper edu-data-swiper" autoplay="true" interval="2000" circular="true" vertical="true" acceleration="true">
					<swiper-item>
						<view class="swiper-item flex-box uni-bg-red">
							<p class="flex-1 ellipsis-1"><span>131****6572</span>成功预约<span>摄影培训</span>免费选课服务</p>
							<img src="https://static.jiaoyubao.cn/images/uniapp/icon-arrow-white.svg" alt="">
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item flex-box uni-bg-green">
							<p class="flex-1 ellipsis-1"><span>171****6572</span>成功预约<span>全脑开发课程</span>免费选课服务</p>
							<img src="https://static.jiaoyubao.cn/images/uniapp/icon-arrow-white.svg" alt="">
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item flex-box uni-bg-blue">
							<p class="flex-1 ellipsis-1"><span>132****2053</span>成功预约<span>早教课程</span>免费选课服务</p>
							<img src="https://static.jiaoyubao.cn/images/uniapp/icon-arrow-white.svg" alt="">
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item flex-box uni-bg-blue">
							<p class="flex-1 ellipsis-1"><span>150****6572</span>成功预约<span>考研培训</span>免费选课服务</p>
							<img src="https://static.jiaoyubao.cn/images/uniapp/icon-arrow-white.svg" alt="">
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item flex-box uni-bg-blue">
							<p class="flex-1 ellipsis-1"><span>139****4520</span>成功预约<span>英语夏令营</span>免费选课服务</p>
							<img src="https://static.jiaoyubao.cn/images/uniapp/icon-arrow-white.svg" alt="">
						</view>
					</swiper-item>
				</swiper>
			</div>
			<div class="content-container">
				<!-- form -->
				<!-- <div class="m-pop-choose-class-form">
					<div class="m-pop-form-inner">
						<div class="m-jyb-form-group flex-box">
							<input type="text" class="m-jyb-input flex-1 m-pop-input-city" value="济南市" placeholder="请选择城市" readonly="">
							<i class="m-common-icon icon_right_no_bg"></i>
						</div>
						<div class="m-jyb-form-group flex-box">
							<input type="text" class="m-jyb-input flex-1 m-pop-input-class" value="少儿英语" placeholder="请选择课程" readonly="">
							<i class="m-common-icon icon_right_no_bg"></i>
						</div>
						<div class="m-jyb-form-group flex-box">
							<input type="number" class="m-jyb-input flex-1 m-pop-input-phone" value="" placeholder="请输入您的手机号码，隐私保护">
						</div>
						<div class="m-jyb-form-group flex-box">
							<input type="number" class="m-jyb-input flex-1 m-pop-input-code" value="" placeholder="请输入短信验证码">
							<button class="m-jyb-btn-getcode">获取验证码</button>
						</div>
						<a href="javascript:;" class="m-jyb-btn m-jyb-btn-blue help-choose-btn mt20">免费帮我选课</a>
					</div>
				</div> -->
				
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
						<!-- <div class="m-jyb-form-group flex-box">
							<input
								type="text"
								v-model="formName"
								class="m-jyb-input flex-1 m-pop-input-name"
								value=""
								placeholder="请输入您的姓名，隐私保护"
								placeholder-style="color: #ababab; font-size: 15px;"
							/>
						</div> -->
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
						<div class="m-jyb-form-group help-choose-code flex-box flex-box">
							<input 
								type="number" 
								class="m-jyb-input flex-1" 
								v-model="helpChooseCode" 
								placeholder="请输入短信验证码" 
								placeholder-style="color: #ababab; font-size: 15px;"/>
							<button class="get-sms-btn count-down" hover-class="none" v-if="timer">{{ countDownNum }}s后重试</button>
							<button class="get-sms-btn" hover-class="none" @click.stop="gethelpChooseCode" v-else>获取验证码</button>
						</div>
						<button class="m-jyb-btn m-jyb-btn-blue mt20" @click="chooseClassForFree">免费帮我选课</button>
					</div>
				</div>
				
				<!-- 优选依托 -->
				<div class="m-pop-choose-base mt30">
					<div class="m-choose-base-title flex-box"><i></i><span>优选依托</span><i></i></div>
					<div class="m-choose-base-con flex-box">
						<div class="m-choose-base-info">
							<span>行业权威平台</span>
							<p>深耕互联网+教育{{g_jyb_years}}年，深受教育用户信赖的第三方平台</p>
						</div>
						<div class="flex-1 flex-box"><img class="m-choose-base-pic1" src="https://static.jiaoyubao.cn/h5/img/index-tu-01.png" alt=""></div>
					</div>
					<div class="m-choose-base-con flex-box">
						<div class="flex-1 flex-box"><img class="m-choose-base-pic2" src="https://static.jiaoyubao.cn/h5/img/index-tu-02.png" alt=""></div>
						<div class="m-choose-base-info">
							<span>{{g_jyb_transaction}}万+真实成交价数据</span>
							<p>积累数百万真实用户的评级、评价和成交价，公开透明的数据更精准</p>
						</div>
					</div>
					<div class="m-choose-base-con flex-box">
						<div class="m-choose-base-info">
							<span>{{g_jyb_cooperation}}万品牌合作机构</span>
							<p>覆盖全国上百个城市{{g_jyb_cooperation}}0000多家品牌机构，老师好，学校多，课程全</p>
						</div>
						<div class="flex-1 flex-box"><img class="m-choose-base-pic3" src="https://static.jiaoyubao.cn/h5/img/index-tu-03.png" alt=""></div>
					</div>
					<div class="m-choose-base-con flex-box">
						<div class="flex-1 flex-box"><img class="m-choose-base-pic4" src="https://static.jiaoyubao.cn/h5/img/index-tu-04.png" alt=""></div>
						<div class="m-choose-base-info">
							<span>1对1平台顾问</span>
							<p>百余名资深的教育顾问，站在第三方的角度，快速为您定制一对一的个性化解决方案 </p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</view>
	
</template>

<script>
	import { globalDataGetMixin, ipGetMixin, recordTrackingMixin } from '../../common/js/mixins.js';
	import { helpChooseClass } from '../../common/js/help-choose.js';
	import dataArray from '../../common/data/data';
	export default {
		mixins: [helpChooseClass, globalDataGetMixin, recordTrackingMixin],
		data() {
			return {
				// webUrl : '', // https://m.jiaoyubao.cn/xiaomi/
				// webviewStyles: {
				//     progress: {
				//         color: '#1a8cff'
				//     }
				// },
				// shareTitle: '',
				// shareContent : ','
				
				// 当前城市
				cityName: '',
				cityEname: '',
				cityCode: '',
				// form
				formName: '',
				formPhone: '',
			}
		},
		onLoad(opts) {
			// /packageA/xiaomi/index?xiaomi=1
			let _this = this;
			// console.log(opts);
			
			_this.dataArrayFromJson = dataArray;
			_this.categoryGroup[0] = dataArray.categoryGroup.map(item => item.name);
			_this.categoryGroup[1] = dataArray.categoryGroup[0].child.map(item => item.name);
			_this.categoryCodeGroup = dataArray.categoryGroup[0].child[0].child;
			_this.categoryGroup[2] = _this.categoryCodeGroup.map(item => item.name);
			
			_this.cityEname = uni.getStorageSync('changeCityEname');
			
			if(_this.cityEname){
				dataArray.cityArr.map(item => {
					if (item.ename == _this.cityEname) {
						_this.cityName = item.name;
						_this.cityCode = item.code;
					}
				});
				
				_this.getCityGroupCurCity();
			}else{
				// 获取城市信息
				_this.location.getCurCityEname(_this, function(res) {
					_this.cityName = res.data[0].cityname;
					_this.cityEname = res.data[0].cityename;
					_this.cityCode = res.data[0].citycode;

					_this.getCityGroupCurCity();
				});
			}
			
		},
		// onShareAppMessage(res) {
		// 	let _this = this;
		// 	// console.log(res);
			
		// 	return {
		// 		title: _this.shareTitle,
		// 		path: `/packageA/xiaomi/index?webUrl=${res.webViewUrl}`,
		// 		imageUrl : "https://static.jiaoyubao.cn/images/uniapp/share-logo.jpg",
		// 		content : _this.shareContent,
		// 	}
		// },
		created() {

		},
		methods: {
			// getWebviewMsg(e){
			// 	let _this = this;
			// 	// console.log(e.detail.data[0].title);
			// 	// console.log(e.detail.data[0].content);
			// 	_this.shareTitle = e.detail.data[0].title;
			// 	_this.shareContent = e.detail.data[0].content;
			// }
		}
	}
</script>

<style lang="scss">
	// 每个页面公共css
	@import './index.scss';
</style>
