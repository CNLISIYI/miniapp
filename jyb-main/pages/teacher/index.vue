<template>
	<view class="agency-page-container">
		<!-- header -->
		<!-- <header-ele v-if="detailObj" :detailobj="detailObj" title="" :navtabitemshow="navTabItemShow"></header-ele> -->
		<!-- header-nav -->
		<header-nav :cityename="cityEname" :agencyename="agencyEname" rendertype="teacher" :navtabitemshow="navTabItemShow"></header-nav>

		<!-- 老师列表 -->
		<div class="m-html-teacher bgfff" v-if="teachers.length > 0">

			<teacher-item type="left-right" :cityename="cityEname" :agencyename="agencyEname" :teachers="teachers"></teacher-item>
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
			pagename="teacher"
			:detailobj="detailObj"
			:usermobile="usermobile">
		</footer-agency>
		
		<online-talk></online-talk>
	</view>
</template>

<script>
	import { footerMixin, agencyTeachersMixin, navTabItemShowMixin } from '../../common/js/mixins.js'
	import { queryByAgency } from '../../common/js/url-monitor.js';
	export default {
		mixins: [footerMixin, agencyTeachersMixin, navTabItemShowMixin],
		data() {
			return {
				cityEname: '',
				agencyEname: '',
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

			// #ifndef MP-BAIDU
			_this.getFooterMixin();
			// #endif
			
			_this.getAgencyTeachersMixin();
			_this.getNavTabItemShowMixin();
			
			// #ifdef MP-BAIDU
				await _this.getFooterMixin();
				_this.setPageInfoFn();
			// #endif
		},
		onShow() {
			// #ifdef MP-WEIXIN
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
					let titleStr = `【${_this.detailObj.name}老师】${_this.detailObj.nickname}老师怎么样_${_this.detailObj.nickname}老师推荐-教育宝手机站`;
					swan.setPageInfo({
						title: titleStr,
						keywords: `${_this.detailObj.name}老师,${_this.detailObj.nickname}老师怎么样,${_this.detailObj.nickname}老师`,
						description: `教育宝为您提供${_this.detailObj.name}老师查询，您可以查询${_this.detailObj.nickname}老师的开课时间、学员评价等信息，想知道${_this.detailObj.nickname}老师怎么样，${_this.detailObj.nickname}老师靠谱吗，快速查询${_this.detailObj.nickname}师资，就上教育宝。`,
						success: function() {
						},
						fail: function(err) {
						}
					});
					uni.setNavigationBarTitle({
						title: titleStr
					});
				// #endif
			}

		}
	}
</script>

<style lang="scss">
	// @import './index.scss';
</style>
