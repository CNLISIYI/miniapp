<template>
	<view class="insu-body autopb">
		<image :src="detaildata.thumb" class="img-box"></image>
		<view class="bgbox">
			<view class="_h3">{{ detaildata.title }}</view>
			<text class="intro">{{ detaildata.intro }}</text>
		</view>
		<view class="bgbox">
			<view class="_h4">保障计划</view>
			<view class="_ul">
				<view
					class="_li"
					v-for="(item, index) in detaildata.params"
					:key="index"
				>
					<text class="_span">{{ item.n }}</text>
					<text class="_p">{{ item.v }}</text>
				</view>
			</view>
		</view>
		<view class="bgbox">
			<view class="_h4">产品说明</view>
			<view class="rich-box" v-html="detaildata.content"></view>
		</view>
		<view class="footer-box clearfix">
			<view class="fee">
				<text class="_p">250</text><text class="_span">元/月起</text>
			</view>
			<navigator url="" class="sub-btn">立即预约</navigator>
		</view>
		<u-back-top :scroll-top="scrollTop"></u-back-top>
	</view>
</template>

<script>
export default {
	data() {
		return {
			scrollTop: 0, //页面滚动
			detaildata: {
				thumb: "../../static/home/pic2.png",
				title: "三餐不规律，肠胃总干事不舒服，有必要做胃镜检查吗？",
				intro: "住院能报销，最高能报400万",
				fee: "10049",
				sell: "2900",
				params: [
					{ n: "成长关爱金", v: "20%基本保额" },
					{ n: "成家立业金", v: "已交保费和现金价值的较大值" },
					{ n: "身故保障金", v: "20%基本保额" },
					{ n: "成长关爱金", v: "20%基本保额" },
				],
				content: "<p>详细详细</p>",
			},
		};
	},
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
	},
	components: {},
	onLoad() {},

	methods: {},
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
