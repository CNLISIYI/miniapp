<template>
	<view class="ping-success-outer">
		<view class="suc-img">
			<image src="https://static.jiaoyubao.cn/images/uniapp/pj-tijcg-img@3x.png" mode=""></image>
		</view>
		<h4>评价提交成功</h4>
		<p>奖金会通过<span>“教育宝公众号”</span>发放到您的微信钱包里，请点击领取按钮，并回复<span style="color:#1A8CFF;">“奖金”</span>领取。</p>
		<button class="suc-btn" hover-class="none" open-type="contact">领取点评奖金</button>
		<navigator class="go-kefu" hover-class="none" url="plugin://myPlugin/chat">有疑问？咨询在线客服</navigator>
	</view>
</template>

<script>
import { recordTrackingMixin } from '../../common/js/mixins.js';
export default {
	mixins: [recordTrackingMixin],
	data() {
		return {
			webUrl: '', // https://m.jiaoyubao.cn/pingdone/
			webviewStyles: {
				progress: {
					color: '#1a8cff'
				}
			},
			shareTitle: '',
			shareContent: ',',
		};
	},
	onLoad(opts) {
		let _this = this;
	},
	onShareAppMessage(res) {
		let _this = this;
		// console.log(res);
		return {
			title: _this.shareTitle,
			path: `/pages/enter/index?webUrl=${res.webViewUrl}`,
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
@import 'index.scss';
</style>
