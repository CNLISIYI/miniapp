<template>
	<div class="m-common-container m-contact-container flex-box-column">
		<!-- 通用头部 -->
		<!-- #ifdef H5 -->
			<header-title title="联系我们"></header-title>
		<!-- #endif -->
		<main class="m-common-main flex-1">
			<span class="_span">教育宝（济南邦赢信息技术有限公司）</span>
			<p class="_p">电 话：<text @click="makeTellPhone" class="_a" data-tel="400-601-2788">400-601-2788</text>&nbsp;&nbsp;&nbsp;<text @click="makeTellPhone" class="_a ml8" data-tel="0531-87060627">0531-87060627</text>(周一至周六 09:00-17:00 接听)</p>
			<p class="_p">地 址：济南市历山路36号齐鲁师范学院利宝产业大厦5F</p>
			<p class="_p">邮 编：250062</p>
			<p class="_p">邮箱：<text class="_a" href="mailto:edu@bangying.com">edu@bangying.com</text></p>
		</main>

		<!-- common footer -->
		<footer-nav idx="1"></footer-nav>
		
		<online-talk></online-talk>
	</div>
</template>

<script>
import { recordTrackingMixin } from '../../common/js/mixins.js';
export default {
	mixins: [recordTrackingMixin],
		data() {
			return {

			}
		},
		onLoad() {
			let pages = getCurrentPages(); // 获取页面栈
			pages.map((item, index) => {
				if( item.route == 'pages/index/index') {
					item.$vm.localClass = [];
				}
			});
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
		methods: {
			makeTellPhone(e) {
				let _this = this;
				let phoneNum = e.currentTarget.dataset.tel;
				uni.makePhoneCall({
					phoneNumber: phoneNum
				});
			}
		}
	}
</script>

<style lang="scss">
	// 每个页面公共css
	@import './index.scss';
</style>
