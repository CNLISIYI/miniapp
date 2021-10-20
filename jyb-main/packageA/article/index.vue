<template>
	<view class="agency-page-container">
		<!-- header -->
		<!-- <header-ele v-if="detailObj" :detailobj="detailObj" title="" :navtabitemshow="navTabItemShow"></header-ele> -->

		<!-- 详情 -->
		<div class="m-info-detail-container bgfff" v-if="newsDetail">
			<h1>{{newsDetail.title}}</h1>
			<p class="m-info-detail-msg"><span>{{newsDetail.articleTime}}</span></p>
			<div class="m-info-detail-summary clearfloat mtop20"><img class="fl" src="https://static.jiaoyubao.cn/images/mobile/tag-yinhao.png" alt="">
				<p class="fl">{{newsDetail.introduction}}</p>
			</div>
			<div class="m-info-detail-article" v-html="newsDetail.htmlContent"></div>
		</div>

		<!-- 相关资讯 -->
		<div class="m-info-detail-tj bgfff mtop10" v-if="otherNews.length > 0">
			<a class="m-module-title" href="javascript:;" title="">相关资讯</a>
			<news-item :newslist="otherNews" :cityename="cityEname" :agencyename="agencyEname"></news-item>
		</div>

		<!-- 相关课程 -->
		<div class="m-class bgfff mtop10" v-if="newsDetailClass.length > 0">
			<navigator hover-class="none" open-type="redirect" :url="'/pages/class/index?agency=' + agencyEname" class="_a m-module-title">相关课程<img class="m-module-more fr" src="https://static.jiaoyubao.cn/images/mobile/icon-rightarrow.svg" alt=""></navigator>

			<class-item type="left-right" :cityename="cityEname" :agencyename="agencyEname" :classes="newsDetailClass"></class-item>
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

		<online-talk></online-talk>
	</view>
</template>

<script>
	import { queryByAgency } from '../../common/js/url-monitor.js';
	import {footerMixin, navTabItemShowMixin, recordTrackingMixin} from '../../common/js/mixins.js'
	export default {
		mixins: [footerMixin, navTabItemShowMixin, recordTrackingMixin],
		data() {
			return {
				cityEname : '',
				agencyEname: '',
				newsId: '',

				newsDetail: '',
				otherNews: [],
			}
		},
		onShow() {
			// 微信分享到朋友圈功能
			// #ifdef MP-WEIXIN
			wx.showShareMenu({
				withShareTicket:true,
				menus:['shareAppMessage','shareTimeline']
			})
			// #endif
		},
		async onLoad(opts) {
			let _this = this;
			console.log(opts);
			if (opts && JSON.stringify(opts) != '{}') {

				_this.cityEname = await queryByAgency(opts.city, opts.agency);
				_this.agencyEname = opts.agency;

				_this.newsId = opts.id;
			}
			// // console.log(_this.webUrl);
			// #ifndef MP-BAIDU
			_this.getArticleDetail();
			// #endif
			// #ifdef MP-BAIDU
			_this.requestTask = new Promise((resolve, reject) => {
				_this.getArticleDetail(resolve);
				// resolve();
			});
			// #endif

			_this.getOtherNews();

			_this.getFooterMixin();
			_this.getNavTabItemShowMixin();
		},
		onShow() {
			let _this = this;
			// #ifdef MP-BAIDU
			_this.requestTask.then(requestData => {
				let titleStr = `${_this.newsDetail.title}-${_this.detailObj.name}-教育宝手机站`;
				swan.setPageInfo({
					title: titleStr,
					// keywords: keywords,
					description: _this.newsDetail.introduction,
					articleTitle: _this.newsDetail.title,
					// image: ['https://static.jiaoyubao.cn/images/uniapp/banner.jpg'],
					success: function() {
						// console.log('setPageInfo success');
					},
					fail: function(err) {
						// console.log('setPageInfo fail', err);
					}
				});

				uni.setNavigationBarTitle({
					title: titleStr
				});
			})
			// #endif
		},
		onShareAppMessage(res) {
			let _this = this;
		},
		created() {

		},
		methods: {
			getArticleDetail(resolve) {
				let _this = this;
				let ajaxUrl = _this.$api.GetAgencyNewsDetail.url + "&key={articleid:" + _this.newsId + "}";
				_this.$ajax2(_this.$api.GetAgencyNewsDetail, ajaxUrl, '获取资讯详情', function(res) {
					if (res != 'error' && res.data.body) {
						_this.newsDetail = res.data.body;
						_this.newsDetail.articleTime = _this.tools.getDate(_this.newsDetail.createtime);
						_this.newsDetail.htmlContent = _this.tools.UnicodeToAscii(_this.tools.escape2Html(_this.newsDetail.content)).replace(/<p/ig, '<p class="_p"').replace(/<img/ig, '<img class="_img"').replace(/<table/ig, '<table class="_table"');

						// #ifdef MP-BAIDU
							if(resolve){
								resolve();
							}
						// #endif
					}
				}, true);
			},
			getOtherNews(){
				let _this = this;
				let ajaxUrl = _this.$api.GetAgencyNews.url + "&key={comename:" + _this.agencyEname + ",pagesize:6,page:1}";
				_this.$ajax2(_this.$api.GetAgencyNews, ajaxUrl, '获取资讯', function(res) {
					if (res != 'error' && res.data.data && res.data.data.length > 0) {
						_this.otherNews = res.data.data.filter(item => item.id != _this.newsId);
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './index.scss';
</style>
