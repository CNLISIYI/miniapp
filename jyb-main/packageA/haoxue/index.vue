<template>
	<web-view src="https://m.jiaoyubao.cn/zhiliaohaoxue/"></web-view>
</template>
<script>
export default {
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
};
</script>
