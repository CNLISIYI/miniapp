<template>
	<view class="news-body m-common-container">
		<div class="news-content">
			<div class="news-content-header">
				<h1>关于不法分子冒充教育宝收取“家教信息费”的声明</h1>
				<div class="news-date">
					<span>发布时间：</span>
					<span class="release-time">2020年02月04日</span>
				</div>
				<div class="about-line"></div>
			</div>
			<div class="news-content-detail">
				<p>
					教育宝平台是济南邦赢信息技术有限公司旗下的教育第三方服务平台。近期，教育宝平台收到部分用户反馈：有不法分子利用QQ、微信群等联络方式，冒充教育宝平台工作人员，以提供家教信息为诱饵，收取用户数百元不等的信息费，收费后联系异常。
				</p>
				<p>
					为此，教育宝平台特做声明如下：（1）教育宝平台未向任何用户提供“有偿家教信息”等服务；（2）教育宝平台收款账户仅支持对公账户，凡是以个人收款（包括银行账号、微信、支付宝等）均属于其个人行为，与教育宝平台无任何关系；（3）用户（包括从业者及家长）遇有任何不确定的问题，请及时联系教育宝官方平台进行确认，以免上当受骗。教育宝平台联系方式：400-601-2788、0531-87060627，微信：18660183302。
				</p>
				<p>
					任何单位或个人未经教育宝平台授权，均不得使用教育宝及教育宝平台的名义提供有偿信息或服务。否则，教育宝平台将对任何侵权、欺诈行为进行严厉打击。与此同时，教育宝平台也呼吁合作伙伴、用户及广大消费者共同监督，积极向教育宝平台提供线索，举报此类不良行为，共同营造良好的营商环境。
				</p>
				<p>特此声明！</p>
				<div class="notice-bottom">
					<span>济南邦赢信息技术有限公司</span>
					<span>2020年2月4日</span>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
import { recordTrackingMixin } from '../../common/js/mixins.js';
export default {
	mixins: [recordTrackingMixin],
	data() {
		return {
			shareTitle: '',
			shareContent: ',',
		};
	},
	onLoad(opts) {
		let _this = this;
		// console.log(opts);
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
	onShareAppMessage(res) {
		let _this = this;
		// console.log(res);
		return {
			title: _this.shareTitle,
			path: `/notice/index/notice/index?webUrl=${res.webViewUrl}`,
			imageUrl: 'https://static.jiaoyubao.cn/images/uniapp/share-logo.jpg',
			content: _this.shareContent
		};
	},
	created() {},
	methods: {
	}
};
</script>

<style lang="scss">
@import '../../common/css/jyb-ui.scss';
@import './index.scss';
</style>
