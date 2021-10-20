<template>
	<div class="m-common-container m-index-container flex-box-column">
		<!-- #ifndef MP-BAIDU -->
		<quick-skeleton :show="showSkeleton" ref="skeleton" catchtouchmove="true" fixed="true" loading="chiaroscuro" selector="skeleton" bgcolor="#FFF"></quick-skeleton>
		<!-- 骨架屏开始 -->
		<main class="m-common-main flex-1 skeleton" v-show="showSkeleton" style="background-color: #fff;">
			<!-- header -->
			<ul class="m-jyb-header m-jyb-header-fixed m-header-logo_input flex-box">
				<li class="_li m-header-logo flex-box mr15 skeleton-radius"></li>
				<li class="_li m-header-input flex-box flex-1 ellipsis-1 mr15 skeleton-radius"></li>
				<li class="_li m-header-location flex-box skeleton-radius">
					<a class="_a flex-box">
						<span class="m-header-location-name ellipsis-1">{{ cityName }}</span>
					</a>
				</li>
			</ul>
			<!-- banner -->
			<div class="m-index-banner-outer">
				<div class="m-index-banner-content" style="background-image: none;"><div class="m-index-banner-data flex-box-around skeleton-radius"></div></div>
			</div>
			<div class="m-index-main-content">
				<div class="m-index-menu-nav">
					<view class="m-menu-nav-swiper swiper-container uni-padding-wrap">
						<view class="page-section swiper">
							<view class="page-section-spacing">
								<swiper class="swiper-wrapper swiper">
									<swiper-item class="swiper-slide m-menu-nav-inner clearfloat" v-for="(itemArr, index) in category" :key="index">
										<navigator class="_a" hover-class="none" v-for="(item, idx) in itemArr" :key="idx">
											<img class="_img skeleton-radius" />
											<span class="_span"></span>
										</navigator>
									</swiper-item>
								</swiper>
							</view>
						</view>
					</view>
				</div>
				<!-- choose-class -->
				<div class="m-index-choose-class skeleton-rect"></div>
				<!-- 点评/投诉帮 -->
				<div class="m-index-features flex-box">
					<navigator hover-class="none" url="../../packageB/ping/index?ping=1" class="_a m-features-dp flex-1 skeleton-rect"></navigator>
					<navigator hover-class="none" url="/packageA/feedback/index?feedback=1" class="_a m-features-ts flex-1 skeleton-rect"></navigator>
				</div>
				<!-- 类别模块 -->
				<div class="m-index-common-sort">
					<navigator class="index-common-sort-header flex-box skeleton-rect"></navigator>
					<div class="index-common-sort-list clearfloat">
						<navigator class="_a flex-box-column" v-for="(item, idx) in items.subclass" :key="idx">
							<img class="_img skeleton-radius" />
							<span class="_span"></span>
						</navigator>
					</div>
				</div>
			</div>
		</main>
		<!-- 骨架屏结束 -->
		<!-- #endif -->
		
		<!-- #ifdef MP-BAIDU -->
		<main class="m-common-main flex-1">
		<!-- #endif -->
		<!-- #ifndef MP-BAIDU -->
		<main class="m-common-main flex-1" v-show="!showSkeleton">
		<!-- #endif -->
			<!-- header -->
			<ul class="m-jyb-header m-jyb-header-fixed m-header-logo_input flex-box">
				<li class="_li m-header-logo flex-box mr15">
					<view class="_a" hover-class="none"><img class="_img" src="https://static.jiaoyubao.cn/images/common/mark-jyb-logo.svg" alt="" /></view>
				</li>
				<li class="_li m-header-input flex-box flex-1 ellipsis-1 mr15">
					<span class="m-common-icon icon_search_linear"></span>
					<navigator :url="'/packageA/search/index?cityname=' + cityName + '&city=' + cityEname" hover-class="none" class="m-header-input-txt ellipsis-1">
						请输入机构或课程名称
					</navigator>
				</li>
				<li class="m-header-history flex-box mr10"><a class="m-common-icon icon_history_linear" hover-class="none" url="/packageA/agencyhistory/index"></a></li>
				<li class="_li m-header-location flex-box ">
					<a :url="'/pages/locationcitys1/index?city=' + cityName + '&cityename=' + cityEname" hover-class="none" href="#" class="_a flex-box">
						<span class="m-header-location-name ellipsis-1">{{ cityName }}</span>
						<i class="m-common-icon icon_bottom_no_bg"></i>
					</a>
				</li>
			</ul>
			<!-- banner -->
			<div class="m-index-banner-outer">
				<div class="m-index-banner-content">
					<div class=" banner-rect"></div>
					<!-- <div class="m-index-banner-swiper swiper-container">
						<div class="swiper-wrapper">
							<a hover-class="none" href="javascript:;" class="swiper-slide m-index-banner-inner m-index-banner--blue">
								<img class="_img" src="https://static.jiaoyubao.cn/images/uniapp/banner.jpg" alt="" />
							</a>
						</div>
						<div class="swiper-pagination flex-box "></div>
					</div> -->
					<!-- 最新统计 -->
					<swiper v-if="bannerDataLength>1" class="m-index-banner-data" autoplay="true" interval="5000" circular="true" vertical="true">
						<swiper-item class="flex-box-around" @click="goToNotice">
							<div class="flex-box">
								<span class="_span m-common-icon menu-choose-class-linear"></span>
								<span class="_span index-banner-data-name">最新公告</span>
							</div>
							<div class="flex-box" style="max-width: 500rpx;">
								<span class="_span ellipsis-1">关于不法分子冒充教育宝收取“家教信息费”的声明</span>
							</div>
							<div class="flex-box">
								<span class="_span m-common-icon icon-right-no-bg"></span>
							</div>
						</swiper-item>
						<swiper-item class="flex-box-around">
							<div class="flex-box">
								<span class="_span m-common-icon icon_chart_linear"></span>
								<span class="_span index-banner-data-name">最新统计</span>
							</div>
							<div class="flex-box">
								<span class="_span fontArial">{{ curStatistics.companynum.toLocaleString() }}</span>
								<span class="_span">家机构</span>
							</div>
							<div class="flex-box">
								<span class="_span fontArial">{{ curStatistics.productnum.toLocaleString() }}</span>
								<span class="_span">门课程</span>
							</div>
							<div class="flex-box">
								<span class="_span fontArial">{{ curStatistics.membernum.toLocaleString() }}</span>
								<span class="_span">位学员</span>
							</div>
						</swiper-item>
					</swiper>
					<div v-else class="m-index-banner-data flex-box-around">
						<div class="flex-box">
							<span class="_span m-common-icon icon_chart_linear"></span>
							<span class="_span index-banner-data-name">最新统计</span>
						</div>
						<div class="flex-box">
							<span class="_span fontArial">{{ curStatistics.companynum.toLocaleString() }}</span>
							<span class="_span">家机构</span>
						</div>
						<div class="flex-box">
							<span class="_span fontArial">{{ curStatistics.productnum.toLocaleString() }}</span>
							<span class="_span">门课程</span>
						</div>
						<div class="flex-box">
							<span class="_span fontArial">{{ curStatistics.membernum.toLocaleString() }}</span>
							<span class="_span">位学员</span>
						</div>
					</div>
				</div>
			</div>
			<div class="m-index-main-content">
				<!-- menu-nav -->
				<div class="m-index-menu-nav">
					<view class="m-menu-nav-swiper swiper-container uni-padding-wrap">
						<view class="page-section swiper">
							<view class="page-section-spacing">
								<swiper
									class="swiper-wrapper swiper"
									indicator-dots="true"
									:autoplay="isautoplay"
									circular="true"
									indicator-color="rgba(217, 217, 218, .4)"
									indicator-active-color="#ffc200"
								>
									<swiper-item class="swiper-slide m-menu-nav-inner clearfloat" v-for="(itemArr, index) in category" :key="index">
										<navigator :url="item.router + '&city=' + cityEname" class="_a" hover-class="none" v-for="(item, idx) in itemArr" :key="idx">
											<img class="_img " :src="item.img" alt="" />
											<span class="_span">{{ item.name }}</span>
										</navigator>
									</swiper-item>
								</swiper>
							</view>
						</view>
					</view>
				</div>
				<!-- choose-class -->
				<div class="m-index-choose-class ">
					<div class="m-choose-class-title flex-box">
						<i class="_i m-choose-class-l"></i>
						<span class="_span">平台资深顾问一对一免费选课</span>
						<i class="_i m-choose-class-r"></i>
					</div>
					<p class="m-choose-class-tips">15分钟臻选3个优质机构和课程</p>
					<div class="m-choose-class-intro flex-box-around">
						<span class="_span flex-box">
							<i class="m-common-icon menu_teacher"></i>
							{{g_jyb_guwen}}+顾问
						</span>
						<span class="_span flex-box">
							<i class="m-common-icon menu_index"></i>
							{{g_jyb_cooperation}}万+机构
						</span>
						<span class="_span flex-box">
							<i class="m-common-icon menu_class"></i>
							{{g_jyb_product}}万+课程
						</span>
					</div>
					<!-- <a hover-class="none" class="m-choose-class-link" href="#" @click="chooseClassPopShow">免费帮我选课</a> -->
					<!-- #ifdef MP-WEIXIN -->
					<button v-if="formPhone" class="m-choose-class-link" @click="chooseClassPopShow">免费帮我选课</button>
					<button v-else class="m-choose-class-link" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" @click="chooseClassPopShow">免费帮我选课</button>
					<!-- #endif -->
					<!-- #ifndef MP-WEIXIN -->
					<button class="m-choose-class-link" @click="chooseClassPopShow">免费帮我选课</button>
					<!-- #endif -->
					<p class="m-choose-class-num flex-box" v-if="countToArr.length > 0">
						<block v-for="(item, index) in countToArr" :key="index">
							<span class="_span">{{ item }}</span>
						</block>
						&nbsp;人今日找到满意的课程
					</p>
				</div>
				<!-- 点评/投诉帮 -->
				<div class="m-index-features flex-box">
					<navigator hover-class="none" url="../../packageB/ping/index?ping=1" class="_a m-features-dp flex-1 ">
						<span class="_span m-features-title">点评奖金</span>
						<span class="_span m-features-tips">评价获得随机红包</span>
						<img class="_img" src="https://static.jiaoyubao.cn/images/uniapp/index-tu-06.png" alt="" />
						<i class="_i">已有{{ curStatistics.commentnum.toLocaleString() }}人评价</i>
					</navigator>
					<!-- <button hover-class="none" class="_a m-features-ts flex-1 " type="primary" size="40"
							:session-from="'nickName='+ userInfo.nickName +'|avatarUrl='+userInfo.avatarUrl+'|referrerTitle='+ysf.title+'|ysf.config='+ysf.config" open-type="contact">
						<span class="_span m-features-title" style="text-align: left;">教育投诉帮</span>
						<span class="_span m-features-tips" style="text-align: left;">教育宝行业投诉帮扶中心</span>
						<img class="_img" src="https://static.jiaoyubao.cn/images/uniapp/index-tu-07.png" alt="" />
					</button> -->
					<navigator hover-class="none" url="/packageA/feedback/index?feedback=1" class="_a m-features-ts flex-1 ">
						<span class="_span m-features-title">教育投诉帮</span>
						<span class="_span m-features-tips">教育行业投诉中心</span>
						<img class="_img" src="https://static.jiaoyubao.cn/images/uniapp/index-tu-07.png" alt="" />
					</navigator>
				</div>
				<!-- 类别模块 -->
				<div class="m-index-common-sort" v-for="(items, index) in subclass" :key="index">
					<navigator :url="items.router + '&city=' + cityEname" hover-class="none" class="index-common-sort-header flex-box ">
						<span class="index-common-sort-title flex-1" :class="'index-sort--' + items.color">{{ items.maincategory }}</span>
						<span class="index-common-sort-more flex-box">
							更多
							<i class="m-common-icon icon_right_block"></i>
						</span>
					</navigator>
					<div class="index-common-sort-list clearfloat">
						<navigator
							:url="'/pages/agencylist/index?class=' + item.url + '&city=' + cityEname"
							hover-class="none"
							href="#"
							class="_a flex-box-column"
							v-for="(item, idx) in items.subclass"
							:key="idx"
						>
							<img class="_img " :src="item.img" alt="" />
							<span class="_span ">{{ item.name }}</span>
						</navigator>
					</div>
				</div>
				<navigator url="/packageA/haoxue/index" hover-class="none" class="haoxue-outer">
					<div class="haoxue-left"></div>
					<h4>教育宝联手百度知了好学</h4>
					<div class="haoxue-right">
						<span class="_span">了解详情</span>
						<span class="_span m-common-icon icon-right-no-bg"></span>
					</div>
				</navigator>
				<!-- common footer -->
				<footer-ele></footer-ele>
			</div>
		</main>
		<!-- choose class pop -->
		<div class="m-common-mask" v-show="chooseClassPopIsShow" @click="handlerPopHide">
			<div class="icon_down_thin_no_bg-out"><span class="m-common-icon icon_down_thin_no_bg" v-if="chooseClassPopIsShow"></span></div>
		</div>
		<div class="m-pop-choose-class" :animation="animationData">
			<div class="m-index-choose-class">
				<div class="m-choose-class-title flex-box">
					<i class="_i m-choose-class-l"></i>
					<span class="_span">平台资深顾问一对一免费选课</span>
					<i class="_i m-choose-class-r"></i>
				</div>
				<p class="m-choose-class-tips">15分钟臻选3个优质机构和课程</p>
			</div>
			<!-- form -->
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
				<div class="m-choose-base-title flex-box">
					<i class="_i"></i>
					<span>优选依托</span>
					<i class="_i"></i>
				</div>
				<div class="m-choose-base-con flex-box">
					<div class="_div m-choose-base-info">
						<span class="_span">行业权威平台</span>
						<p class="_p">深耕互联网+教育{{g_jyb_years}}年，深受教育用户信赖的第三方平台</p>
					</div>
					<div class="_div flex-1 flex-box"><img class="m-choose-base-pic1" src="https://static.jiaoyubao.cn/h5/img/index-tu-01.png" alt="" /></div>
				</div>
				<div class="m-choose-base-con flex-box">
					<div class="_div flex-1 flex-box"><img class="m-choose-base-pic2" src="https://static.jiaoyubao.cn/images/uniapp/index-tu-02.png" alt="" /></div>

					<div class="_div m-choose-base-info">
						<span class="_span">{{g_jyb_transaction}}万+真实成交价数据</span>
						<p class="_p">积累数百万真实用户的评级、评价和成交价，公开透明的数据更精准</p>
					</div>
				</div>
				<div class="m-choose-base-con flex-box">
					<div class="_div m-choose-base-info">
						<span class="_span">{{g_jyb_cooperation}}万品牌合作机构</span>
						<p class="_p">覆盖全国上百个城市{{g_jyb_cooperation}}0000多家品牌机构，老师好，学校多，课程全</p>
					</div>
					<div class="_div flex-1 flex-box"><img class="m-choose-base-pic3" src="https://static.jiaoyubao.cn/images/uniapp/index-tu-03.png" alt="" /></div>
				</div>
				<div class="m-choose-base-con flex-box">
					<div class="_div flex-1 flex-box"><img class="m-choose-base-pic4" src="https://static.jiaoyubao.cn/images/uniapp/index-tu-04.png" alt="" /></div>

					<div class="_div m-choose-base-info">
						<span class="_span">1对1平台顾问</span>
						<p class="_p">百余名资深的教育顾问，站在第三方的角度，快速为您定制一对一的个性化解决方案</p>
					</div>
				</div>
			</div>
		</div>
		<!-- 推荐课程 -->
		<div class="m-pop-recommend-bg" v-if="overTenMinute && recommendClassPopIsShow && isNewScan">
			<div class="m-pop-recommend-class">
				<div class="m-recommend-class-bg">
					<span class="m-common-icon icon_cross_linear" @click="recommendPopHide" style="height:50px;"></span>
					<img class="_img" src="https://static.jiaoyubao.cn/images/uniapp/index-tu-05@3x.png" alt="" />
				</div>
				<div class="m-recommend-class-con">
					<div class="m-recommend-class-header">
						<span class="_span m-recommend-header-title">没有找到满意的课程？</span>
						<span class="_span m-recommend-header-tips">让教育宝课程顾问为您甄选吧</span>
					</div>
					<span class="m-recommend-class-tips">猜您对以下课程感兴趣</span>
					<view class="m-recommend-scroll">
						<scroll-view scroll-x="true" class="m-recommend-class-list _div">
							<a
								hover-class="none"
								:class="['_a', index == recommendIdx ? 'active' : '']"
								v-for="(item, index) in localClass"
								:key="index"
								:data-idx="index"
								:data-name="item.name"
								:data-ename="item.ename"
								@click="chooseRecommend"
							>
								{{ item.name }}
							</a>
						</scroll-view>
					</view>
					<div class="m-recommend-inputbox" v-show="isRecommendInputshow">
						<div class="inputbox-phone inputbox">
							<span>手机号</span>
							<input type="number" v-model="recformPhone" placeholder="隐私保护中，仅平台可见" />
						</div>
						<div class="inputbox-code inputbox">
							<span>验证码</span>
							<input type="number" v-model="formCode" placeholder="请输入短信验证码" />
							<button v-if="!isTimershow" class="m-recommend-getcode" @click="getCode">获取验证码</button>
							<button v-else class="m-recommend-getcode m-login-disabled" disabled="true">重新获取({{ codetimer }}s)</button>
						</div>
					</div>
					<button class="m-recommend-class-btn m-jyb-btn m-jyb-btn-blue" @click="recommendClass">免费帮我选课</button>
					<div class="m-choose-class-intro flex-box-around">
						<span class="_span flex-box">
							<i class="m-common-icon menu_teacher"></i>
							1对1服务
						</span>
						<span class="_span flex-box">
							<i class="m-common-icon menu_index"></i>
							15分钟选3家
						</span>
						<span class="_span flex-box">
							<i class="m-common-icon menu_class"></i>
							50万+课程
						</span>
					</div>
				</div>
			</div>
		</div>
		<!-- #ifdef MP-BAIDU -->
		<!-- <show-favorite-guide></show-favorite-guide> -->
		<!-- #endif -->

		<!-- 客服聊天 -->
		<!-- <button open-type="contact" show-message-card="true">客服</button> -->

		<!-- online-talk 组件： 适用百度小程序，在其他平台不显示 -->
		<online-talk></online-talk>
		
		<!-- tabBar -->
		<!-- #ifdef MP-WEIXIN -->
		<tab-bar-el activeurl="index" style="z-index:99;"></tab-bar-el>
		<!-- #endif -->
	</div>
</template>

<script>
import quickSkeleton from '../../component/quick-skeleton.vue';
import { peopleAddOnMixin, ipGetMixin, globalDataGetMixin, recordTrackingMixin } from '../../common/js/mixins.js';
import { helpChooseClass } from '../../common/js/help-choose.js';
import dataArray from '../../common/data/data';
export default {
	mixins: [peopleAddOnMixin, ipGetMixin, helpChooseClass, globalDataGetMixin, recordTrackingMixin],
	data() {
		return {
			ysf:{title: '首页'},
			// 当前城市
			cityName: '',
			cityEname: '',
			cityCode: '',
			// page show or hide
			chooseClassPopIsShow: false,
			recommendClassPopIsShow: false,
			isNewScan: true,
			overTenMinute: true,
			isRecommendInputshow: false,
			animationData: {},
			// 最新统计
			curStatistics: {
				commentnum: 210966,
				companynum: 54670,
				membernum: 4128969,
				productnum: 561925
			},
			jyb_years: 10,  // 教育宝周年
			jyb_transaction: 500, // 万条成交价数据
			jyb_cooperation: 6,  // 万家合作机构
			bannerDataLength: 2,
			// 类别(大类)
			category: [],
			isautoplay: false,
			// 类别(小类)
			subclass: [],
			// page info
			companynum: 100,
			commentnum: 500,
			// form
			
			formName: '',
			formPhone: '',
			recformPhone: '',
			formCode: '',
			codetimer: 60,
			isTimershow: false,
			ischangeCity: false,
			cityArea: [],
			showSkeleton: true,
			localClass: [],
			recommendIdx: 0,
			recommendClassname: '',
			recommendClassename: '',
			userInfo: {},
			ysf:{},
			begainTime: '',
			session_key: '',
			openid: '',
			unionid: '',
		};
	},
	components: {
		quickSkeleton,
	},
	onReady() {
		let _this = this;
		// #ifndef MP-BAIDU
		_this.showSkeleton = true;
		_this.$refs.skeleton.attachedAction();
		_this.$refs.skeleton.readyAction();
		setTimeout(function() {
			_this.showSkeleton = false;
		}, 2000);
		// #endif
	},
	onLoad(opts) {
		// console.log('index onLoad');
		let _this = this;		
		_this.getCurStatistics();
		
		_this.dataArrayFromJson = dataArray;

		_this.category = dataArray.categoryArr;
		_this.subclass = dataArray.subclassArr;
		
		_this.categoryGroup[0] = dataArray.categoryGroup.map(item => item.name);
		_this.categoryGroup[1] = dataArray.categoryGroup[0].child.map(item => item.name);
		_this.categoryCodeGroup = dataArray.categoryGroup[0].child[0].child;
		_this.categoryGroup[2] = _this.categoryCodeGroup.map(item => item.name);

		// console.log(opts);
		if (opts && JSON.stringify(opts) != '{}') {
			_this.cityEname = opts.city || '';
			// _this.cityName = uni.getStorageSync('changeCityName');
			dataArray.cityArr.map(item => {
				if (item.ename == _this.cityEname) {
					_this.cityName = item.name;
					_this.cityCode = item.code;
				}
			});
			// #ifdef MP-BAIDU
			_this.setCurPageTitle();
			// #endif
			_this.getCurCityStatistics();

			_this.getCityGroupCurCity();
		} else {
			// 获取城市信息
			_this.location.getCurCityEname(_this, function(res) {
				console.log(res)
				_this.cityName = res.data[0].cityname;
				_this.cityEname = res.data[0].cityename;
				_this.cityCode = res.data[0].citycode;

				// #ifdef MP-BAIDU
				_this.setCurPageTitle();
				// #endif
				_this.getCurCityStatistics();

				_this.getCityGroupCurCity();
			});
		}
		// _this.localClass = [];
		// uni.setStorageSync('localClass', _this.localClass);
		// // console.log(_this.localClass);
		uni.setStorageSync('total', 0);
		uni.setStorageSync('message', '我是教育宝客服，很高兴为您服务！');
		
		//// 目前只在微信小程序使用
		// #ifdef MP-WEIXIN
		// _this.onlineChat();
		// #endif
	},
	onShow() {
		let _this = this;
		let animation = uni.createAnimation({
			duration: 500,
			timingFunction: 'ease'
		});
		_this.animation = animation;
		// 判断是否有浏览内容
		if (_this.localClass.length > 0) {
			_this.recommendClassPopIsShow = true;
			_this.recommendIdx = 0;
			_this.recommendClassname = _this.localClass[0].name;
			_this.recommendClassename = _this.localClass[0].ename;
		}
		// 判断距离上次显示是否超过10分钟
		let localTime = uni.getStorageSync('localCloseTime') || 0;
		if(new Date().getTime() - localTime >= 600000) {
			_this.overTenMinute = true;
		}
		else {
			_this.overTenMinute = false;
		}
		// console.log('是否超过十分钟',_this.overTenMinute)
		// console.log('是否有浏览内容',_this.recommendClassPopIsShow)
		// console.log('是否有新纪录',_this.isNewScan)
		
		_this.curPageUrl = '/pages/index/index';
		_this.timer = null;
		
		// 微信分享到朋友圈功能
		// #ifdef MP-WEIXIN
		wx.showShareMenu({
			withShareTicket:true,
			menus:['shareAppMessage','shareTimeline']
		})
		// 获取用户手机号
		_this.userLogin();
		_this.formPhone = uni.getStorageSync('userMobile') || '';
		// #endif
	},
	onShareAppMessage(res) {
		let _this = this;
		// console.log(res);
		return {
			title: `【${_this.cityName}教育宝】${_this.cityName}培训学校_培训辅导班_教育培训机构`,
			path: '/pages/index/index',
			imageUrl: 'https://static.jiaoyubao.cn/images/uniapp/share-logo.jpg',
			content: `${_this.cityName}教育宝客观公正的为您推荐${_this.cityName}${_this.companynum}家培训机构排名，精选英语、K12、会计、IT、留学等行业的${
				_this.commentnum
			}条点评，真实反映培训学校的实力，为您了解课程、价格和排名提供依据，${_this.cityName}培训机构哪家好，教育宝帮你找。`
		};
	},
	created() {
		// console.log('index created');
	},

	methods: {
		// 跳转到公告页面
		goToNotice() {
			uni.navigateTo({
				url: '/pages/notice/index'
			})
		},
		// 登录授权
		userLogin() {
			let _this = this;
			wx.login({
			    success: res => {
					uni.request({
						url: 'https://webapi.jiaoyubao.cn/decryptPhone/getkey/',
						method: 'POST',
						data: JSON.stringify({code: res.code}),
						dataType: 'json',
						header: {
						  'content-type': 'application/json' 
						},
						success: res => {
							console.log(res)
							_this.session_key = res.data.data.session_key;
							_this.openid = res.data.data.openid;
							_this.unionid = res.data.data.unionid;
							uni.setStorageSync('userSession', _this.session_key);
							uni.setStorageSync('userOpenid', _this.openid);
							uni.setStorageSync('userUnionid', _this.unionid);
						},
					})
				}
			});
		},
		// 手机号授权
		getPhoneNumber(e) {
			let _this = this;
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
					  session_key: _this.session_key
				  }),
				  dataType: 'json',
				  header: {
				    'content-type': 'application/json' 
				  },
				  success:function(res){
				    _this.formPhone = JSON.parse(res.data.data).purePhoneNumber;
					// _this.tools.toastShow(_this.formPhone);
					uni.setStorageSync('userMobile', _this.formPhone);
				  },
				  fail:function(res){
				  }
				})
			}
			
		},
		// 在线客服
		// onlineChat() {
		// 	let _this = this;
		// 	var myPluginInterface = requirePlugin('myPlugin');
		// 	var appId = 'adg7CvWyqoq';
		// 	myPluginInterface.__configAppId(appId);
		// 	myPluginInterface._$configAppKey('69e53d90b67dbaf7c700543b1a551994');
		// 	myPluginInterface.__configDomain("https://qiyukf.com"); // 1.1.1版本以前需要手动配置下七鱼服务器域名
			
		// 	_this.ysf = {
		// 	      title: '首页',
		// 	      config: JSON.stringify({
		// 	        // "userId": 'weixi',  // 用户唯一标识
		// 	        "data": JSON.stringify([
		// 	            // { "key": "email", "value": "13800000000@163.com" },
		// 	          ])
		// 	      })
		// 	    }
			
		// 	_this.userInfo = {
		// 	        nickName: '我是第一名',
		// 			// avatarUrl: 'plugin://myPlugin/chat',
		// 			avatarUrl: 'pages/index/index',
		// 	      }
		// 	myPluginInterface._$setUserInfo(_this.userInfo);
		// },
		// 推荐课程弹窗
		recommendClass() {
			let _this = this;
			if (_this.isRecommendInputshow) {
				if (!_this.tools.checkPhoneNum(_this.recformPhone)) {
					_this.tools.toastShow('请正确输入手机号');
					return;
				} else if (_this.formCode.length == 0 || _this.formCode.length > 4) {
					_this.tools.toastShow('请正确输入验证码');
					return;
				} else {
					// 验证 success
					_this.checkMessage();
				}
			} else {
				_this.isRecommendInputshow = true;
			}
		},
		recommendPopHide() {
			let _this = this;
			_this.recommendClassPopIsShow = false;
			_this.isRecommendInputshow = false;
			_this.getStayTime();
		},
		chooseRecommend(e) {
			let _this = this;
			_this.recommendIdx = e.currentTarget.dataset.idx;
			_this.recommendClassname = e.currentTarget.dataset.name;
			_this.recommendClassename = e.currentTarget.dataset.ename;
		},
		// 发送验证码按钮
		getCode() {
			let _this = this;
			if (!_this.tools.checkPhoneNum(_this.recformPhone)) {
				_this.tools.toastShow('请正确输入手机号');
				return;
			} else {
				_this.sendMessage();
			}
		},
		// 发送短信验证码接口
		sendMessage() {
			let _this = this;
			let urlStr = encodeURIComponent('/pages/index/index');
			let ajaxUrl = _this.$api.PostMessageCode.url + '&key={mobile:' + _this.recformPhone + ',flag:mfxk-sms,url:' + urlStr + ',length:4,ip:' + _this.IP + '}';
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
			let ajaxUrl = _this.$api.GetCodeCheck.url + '&key={mobile:' + _this.recformPhone + ',code:' + _this.formCode + ',flag:mfxk-sms}';
			_this.$ajax2(
				_this.$api.GetCodeCheck,
				ajaxUrl,
				'验证短信验证码',
				function(res) {
					if (res.data.result != 1) {
						_this.tools.toastShow('请输入正确的验证码');
					} else {
						_this.submitForm();
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
		// 客服
		contactCB(e) {
			// console.log(e.detail);
		},
		
		// 设置当前页title
		setCurPageTitle() {
			let _this = this;
			let titleStr = `【${_this.cityName}教育宝】`;
			// #ifdef MP-BAIDU
			titleStr = `【${_this.cityName}教育宝】${_this.cityName}培训学校_培训辅导班_教育培训机构排名手机站`;
			// #endif
			uni.setNavigationBarTitle({
				title: titleStr
			});
		},
		// 设置页面基础信息
		setPageInfo() {
			let _this = this;

			swan.setPageInfo({
				title: `【${_this.cityName}教育宝】${_this.cityName}培训学校_培训辅导班_教育培训机构排名手机站`,
				keywords: `${_this.cityName}培训机构,${_this.cityName}培训学校,${_this.cityName}培训班,${_this.cityName}教育培训`,
				description: `${_this.cityName}教育宝客观公正的为您推荐${_this.cityName}${_this.companynum}家培训机构排名，精选英语、K12、会计、IT、留学等行业的${
					_this.commentnum
				}条点评，真实反映培训学校的实力，为您了解课程、价格和排名提供依据，${_this.cityName}培训机构哪家好，教育宝帮你找。`,
				image: ['https://static.jiaoyubao.cn/images/uniapp/banner.jpg'],
				success: function() {
					// console.log('setPageInfo success');
				},
				fail: function(err) {
					// console.log('setPageInfo fail', err);
				}
			});
		},
		// 获取当前城市最新统计
		getCurCityStatistics() {
			let _this = this;
			let ajaxUrl = _this.$api.GetCurStatistics.url + '&key={unionid:0,cityename:' + _this.cityEname + '}';
			_this.$ajax2(_this.$api.GetCurStatistics, ajaxUrl, '获取城市统计', function(res) {
				_this.companynum = _this.companynum + res.data.data[0].companynum;
				_this.commentnum = _this.commentnum + res.data.data[0].commentnum;

				// #ifdef MP-BAIDU
				_this.setPageInfo();
				// #endif
			});
		},
		// 获取最新统计
		getCurStatistics() {
			let _this = this;
			let ajaxObj = {};
			let ajaxUrl = _this.$api.GetCurStatistics.url + '&key={unionid:0}';
			_this.$ajax2(
				_this.$api.GetCurStatistics,
				ajaxUrl,
				'获取最新统计',
				function(res) {
					_this.curStatistics = res.data.data[0];
				},
				true
			);
		},
	
		// choose class pop show
		chooseClassPopShow() {
			let _this = this;
			_this.chooseClassPopIsShow = true;
			_this.animation.top('96rpx').step();
			_this.animationData = _this.animation.export();
		},
		// pop hide
		handlerPopHide() {
			let _this = this;
			_this.chooseClassPopIsShow = false;
			_this.recommendClassPopIsShow = false;
			_this.isRecommendInputshow = false;
			_this.animation.top('100vh').step();
			_this.animationData = _this.animation.export();
		}
	}
};
</script>

<style lang="scss">
// 每个页面公共css
@import './index.scss';
</style>
