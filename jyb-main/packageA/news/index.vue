<template>
	<view class="">
		<!-- header -->
		<!-- <header-ele v-if="detailObj" :detailobj="detailObj" title="" :navtabitemshow="navTabItemShow"></header-ele> -->
		<!-- header-nav -->
		<header-nav :cityename="cityEname" :agencyename="agencyEname" rendertype="news" :navtabitemshow="navTabItemShow"></header-nav>
		
		<!-- 资讯列表 -->
		<news-item v-if="newsList.length > 0" :newslist="newsList" :cityename="cityEname" :agencyename="agencyEname"></news-item>

		<pagination :total="pageTotal" :idx="pageIdx" v-if="pageTotal > 1" @receiveChild="changePageIdx"></pagination>
		<!-- <div class="listpage" v-if="pageTotal > 1">
			<view :class="['_a', pageIdx == 1 ? 'disabled' : 'on']" @click="prePage">上一页</view>
				<span><i class="_i" style="color: #1184e1;">{{pageIdx}} </i> / <i class="_i" style="color: #999;"> {{pageTotal}}</i></span>
			<view :class="['_a', pageIdx == pageTotal ? 'disabled' : 'on']" @click="nextPage">下一页</view>
		</div> -->

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
			pagename="news"
			:detailobj="detailObj"
			:usermobile="usermobile">
		</footer-agency>
		
		<online-talk></online-talk>
	</view>
</template>

<script>
	import {footerMixin, navTabItemShowMixin, recordTrackingMixin} from '../../common/js/mixins.js';
	import { queryByAgency } from '../../common/js/url-monitor.js';
	export default {
		mixins: [footerMixin, navTabItemShowMixin, recordTrackingMixin],
		data() {
			return {
				cityEname : '',
				agencyEname: '',

				pageIdx: 1,
				newsList: [],
				newsTotal: 0,
				pageTotal: 10,
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

			_this.getNewsList();

			// #ifndef MP-BAIDU
			_this.getFooterMixin();
			// #endif
			
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
					let titleStr = `【${_this.detailObj.name}资讯动态】-教育宝手机站`;
					swan.setPageInfo({
						title: titleStr,
						keywords: `${_this.detailObj.name}资讯`,
						description: `教育宝为您提供${_this.detailObj.name}提供的各种资讯动态，您可以根据您的需求来查找信息。`,
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

			getNewsList(){
				let _this = this;
				_this.newsList = [];
				_this.newsTotal = 0;
				_this.pageTotal = 0;
				let ajaxUrl = _this.$api.GetAgencyNews.url + "&key={comename:" + _this.agencyEname + ",pagesize:15,page:"+ _this.pageIdx +"}";
				_this.$ajax2(_this.$api.GetAgencyNews, ajaxUrl, '获取资讯', function(res) {
					if (res != 'error' && res.data.data && res.data.data.length > 0) {
						// _this.nearSchool = res.data.data[0];

						_this.newsList = res.data.data;
						_this.newsTotal = res.data.rec;
						_this.pageTotal = res.data.maxpage;
					}
				}, true)
			},

			// 分页
			changePageIdx(res){
				let _this = this;
				if(res == 'add'){
					_this.pageIdx += 1;
				}else{
					_this.pageIdx -= 1;
				}

				_this.getNewsList();
			},
		}
	}
</script>

<style lang="scss">
	// 每个页面公共css
	// @import './index.scss';
</style>
