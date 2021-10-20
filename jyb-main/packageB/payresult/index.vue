<template>
	<view class="m-page-content">
		<div class="icon-result">
			<text :class="['m-common-icon',flag=='success'?'icon_check_block success':'icon_attention_block error']"></text>
			<span></span>
		</div>
		<div class="pay-det">
			<span v-if="flag == 'success'">支付成功</span>
			<span v-else>支付失败</span>
			<p v-if="flag == 'success'">您已完成支付，确认结果将以短信形式发送至您的手机</p>
			<p v-else>支付失败，请尝试返回上一级页面重新提交订单支付</p>
			<!-- <div v-if="flag == 'success'">我知道了</div> -->
			<!-- <navigator v-if="flag == 'success'" hover-class="none" :url="'/packageB/activity/index?city=' + cityEname + '&agency=' + agencyEname + '&activityId=' + activityId">我知道了</navigator> -->
			<navigator v-if="flag == 'success'" hover-class="none" open-type="navigateBack" delta="2">我知道了</navigator>
			<navigator v-else hover-class="none" open-type="navigateBack" delta="1">重新支付</navigator>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				agencyEname: '',
				cityEname: '',
				activityId: '',
				flag:'',
			};
		},
		onLoad(opts) {
			let _this = this;
			if (opts && JSON.stringify(opts) != '{}') {
				_this.agencyEname = opts.agency;
				_this.cityEname = opts.city;
				_this.activityId = opts.activityId;
				_this.flag = opts.flag;
			}
		},
	}
</script>

<style lang="scss">
// 每个页面公共css
	@import './index.scss';
</style>
