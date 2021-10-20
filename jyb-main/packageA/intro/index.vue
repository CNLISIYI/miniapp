<template>
	<view class="agency-page-container">
		<!-- header -->
		<!-- <header-ele v-if="detailObj" :detailobj="detailObj" title="" :navtabitemshow="navTabItemShow"></header-ele> -->
		<!-- header-nav -->
		<header-nav :cityename="cityEname" :agencyename="agencyEname" rendertype="intro" :navtabitemshow="navTabItemShow"></header-nav>
		
		<!-- 最近 校区  near-school -->
		<view class="intro-nearest" v-if="nearSchool != ''">
			<nearest-campus v-if="nearSchool != ''" :cityename="cityEname" :agencyename="agencyEname" :nearschool="nearSchool"
			 @receiveMakeTelPhone="makeTelPhone"></nearest-campus>
		</view>

		<!-- 简介 -->
		<div class="m-intro-container bgfff" v-show="intro">
			<h3 class="m-intro-title" v-if="detailObj">{{detailObj.nickname}}简介</h3>
			<div class="m-advantage-content" v-html="intro"></div>
		</div>

		<!-- form -->
		<div class="m-intro-form m-form-container bgfff mtop10">
			<div class="m-fixed-form-title"><img class="m-fixed-yy-img" src="https://static.jiaoyubao.cn/images/mobile/list-shiting.svg" alt=""><span>免费领取试听课程</span></div>

			<form-yuyue v-if="navTabItemClass.length > 0 && navTabItemSchool.length > 0 && detailObj" :course="navTabItemClass" :campus="navTabItemSchool" pagename="intro" :detailobj="detailObj"></form-yuyue>

		</div>

		<!--
			底部模块
		-->
		<!-- 面包屑 -->
		<!-- <bread-crumbs v-if="detailObj && classObj" :detailobj="detailObj" :classobj="classObj"></bread-crumbs> -->

		<!-- 通用底部 -->
		<view class="footer-ele-padding">
			<footer-ele></footer-ele>
		</view>

		<!-- 拨打电话底部弹出层 -->
		<tel-phone v-if="detailObj && telPhonePopShow" :detailobj="detailObj" @telPhonePopHide="telPhonePopHide"></tel-phone>

		<!-- 预约/咨询 -->
		<footer-agency
			@handlerTelPhone="makeTelPhone"
			:hasfee="hasFeeData"
			:cityename="cityEname"
			:agencyename="agencyEname"
			v-if="navTabItemClass.length > 0 && navTabItemSchool.length > 0 && detailObj"
			:course="navTabItemClass"
			:campus="navTabItemSchool"
			pagename="intro"
			:detailobj="detailObj"
			:usermobile="usermobile">
		</footer-agency>
		
		<online-talk></online-talk>
	</view>
</template>

<script>
	import {
		footerMixin,
		navTabItemShowMixin,
		nearestSchoolMixin, recordTrackingMixin
	} from '../../common/js/mixins.js';
	import { queryByAgency } from '../../common/js/url-monitor.js';
	export default {
		mixins: [footerMixin, navTabItemShowMixin, nearestSchoolMixin, recordTrackingMixin],
		data() {
			return {
				cityEname: '',
				agencyEname: '',

				intro: '',
				usermobile: ''
			}
		},
		async onLoad(opts) {
			let _this = this;
			// console.log(opts);
			if (opts && JSON.stringify(opts) != '{}') {
				_this.cityEname = await queryByAgency(opts.city, opts.agency);

				_this.agencyEname = opts.agency;
			}
			_this.getAgencyIntro();

			// #ifndef MP-BAIDU
			_this.getFooterMixin();
			// #endif
			
			_this.getNearestSchoolMixin();
			_this.getNavTabItemShowMixin();
			
			// #ifdef MP-BAIDU
				await _this.getFooterMixin();
				_this.setPageInfoFn();
			// #endif
		},
		onShow() {
			// 微信分享到朋友圈功能
			// #ifdef MP-WEIXIN
			wx.showShareMenu({
				withShareTicket:true,
				menus:['shareAppMessage','shareTimeline']
			})
			this.usermobile = uni.getStorageSync('userMobile') || '';
			// #endif
		},
		onShareAppMessage(res) {
			let _this = this;
		},
		created() {

		},
		methods: {
			setPageInfoFn(){
				let _this = this;
				// #ifdef MP-BAIDU
				// _this.requestTask.then(requestData => {
					let titleStr = `【${_this.detailObj.name}】${_this.detailObj.nickname}简介-教育宝手机站`;
					swan.setPageInfo({
						title: titleStr,
						keywords: `${_this.detailObj.name},${_this.detailObj.nickname}`,
						description: `${_this.detailObj.name}：提供最新${_this.detailObj.nickname}简介，${_this.detailObj.nickname}图片，${_this.detailObj.nickname}口碑问答等。${_this.detailObj.name}在线咨询、优惠报名尽在教育宝。`,
						success: function() {
						},
						fail: function(err) {
						}
					});
					uni.setNavigationBarTitle({
						title: titleStr
					});
				// })
				// #endif
			},

			// 获取机构简介
			getAgencyIntro() {
				let _this = this;
				let ajaxUrl = _this.$api.GetAgencyIntro.url + "&key={comename:" + _this.agencyEname + ",typebh:901016002003}";
				_this.$ajax2(_this.$api.GetAgencyIntro, ajaxUrl, '获取简介', function(res) {
					if (res.data && res.data.data && res.data.data.length > 0) {
						// let htmlStr = _this.tools.HTMLDecode(res.data.data[0].jj);
						// let htmlStr = _this.tools.escape2Html(res.data.data[0].jj);
						// _this.intro = _this.tools.delHtmlTag(htmlStr);
						_this.intro = _this.tools.UnicodeToAscii(_this.tools.escape2Html(res.data.data[0].jj)).replace(/<p/ig,
							'<p class="_p"').replace(/<img/ig, '<img class="_img"').replace(/<table/ig, '<table class="_table"');
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	// 每个页面公共css
	@import './index.scss';
</style>
