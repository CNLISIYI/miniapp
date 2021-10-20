<template>
	<div class="m-common-container m-about-container flex-box-column">
		<!-- 通用头部 -->
		<!-- #ifdef H5 -->
		<header-title title="关于我们"></header-title>
		<!-- #endif -->

		<main class="m-common-main flex-1">
			<img class="_img" src="https://img.jiaoyubao.cn/2017/09/19/1450297790.jpg" alt="" />
			<p class="_p">教育宝是中国教育培训行业知名的第三方平台，致力于发现和传播各类好教育，帮学员找课、帮机构招生，打造公正、透明、真实的教育第三方平台。</p>
			<p class="_p">
				深耕互联网+教育服务10年，教育宝现已经开通北京、上海、广州、深圳、济南、青岛、天津、南京、郑州、石家庄、杭州、成都和武汉等30多个省会级城市分站，签约服务着6万多家教育机构，已累计为500多万学员提供帮助。教育宝已成为教育培训市场动态的风向标，是行业从业者和参加培训者的重要参考平台。
			</p>
			<p class="_p">
				通过商业模式创新，教育宝分别为学员家长解决“找课难、决策成本高”的痛点，为教育机构解决“招生难、获客成本高”的痛点。教育宝自2010年创立之初便倡导按结果付费的商业模式，大大降低了教育机构的获客成本和风险，引领中国教育培训市场良性发展。教育宝为教育行业打造“线上撮合、线下考察交费”的O2O模式，该模式非常符合用户习惯，在为用户提供便利的同时，使供需双方沟通透彻、交易放心。
			</p>
			<img class="_img mt10" src="https://img.jiaoyubao.cn/2017/09/19/1450299661.jpg" alt="" />
			<p class="_p">
				教育宝隶属于济南邦赢信息技术有限公司，公司核心团队拥有15年以上互联网平台技术开发背景，自主研发了平台级大数据排名算法、在线教育录播和直播系统、即时通讯软件（IM）、在线互动社区系统、身边搜课系统等，已拥有20余项软件著作权和持续创新研发能力。公司现为国家级高新技术企业、软件企业，拥有增值电信业务经营许可证、ISO质量管理体系认证、知识产权管理体系认证，曾获得中国互联网络新闻中心品牌影响力网络教育机构、山东省商务厅商业模式创新奖、济南市市场监管局重合同守信用企业等荣誉。
			</p>
		</main>

		<!-- common footer -->
		<footer-nav idx="0"></footer-nav>

		<online-talk></online-talk>
	</div>
</template>

<script>
import { recordTrackingMixin } from '../../common/js/mixins.js';
export default {
	mixins: [recordTrackingMixin],
	onLoad() {
		let pages = getCurrentPages(); // 获取页面栈
		pages.map((item, index) => {
			if (item.route == 'pages/index/index') {
				item.$vm.localClass = [];
			}
		});
	},
	onShow() {
		// 微信分享到朋友圈功能
		// #ifdef MP-WEIXIN
		wx.showShareMenu({
			withShareTicket: true,
			menus: ['shareAppMessage', 'shareTimeline']
		});
		// #endif
	}
};
</script>

<style lang="scss">
// 每个页面公共css
@import './index.scss';
</style>
