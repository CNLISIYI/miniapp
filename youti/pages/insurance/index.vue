<template>
	<view class="bgf7">
		<view class="list-nav">
			<view
				:class="['_li', navidx == index ? 'on' : '']"
				v-for="(item, index) in navList"
				:key="index"
				@click="changeNav(index)"
			>
				<text>{{ item }}</text>
				<text class="_span"></text>
			</view>
		</view>
		<view class="insu-ul">
			<view class="_li" v-for="(item, index) in newsList" :key="index">
				<navigator
					class="_a clearfix"
					url="../insudetail/index"
					hover-class="none"
				>
					<image :src="item.thumb"></image>
					<text class="_h4">{{ item.title }}</text>
					<text class="_p">{{ item.intro }}</text>
					<view class="label-box">
						<text
							class="_span"
							v-for="(litem, lindex) in item.label"
							:key="lindex"
							>{{ litem }}</text
						>
					</view>
					<view class="fee-box">
						<view class="fee"
							><text class="num">¥{{ item.fee }}</text
							><text class="_span">/年</text></view
						>
						<text class="_span">已售{{ item.sell }}+</text>
					</view>
				</navigator>
			</view>
		</view>
		<u-back-top :scroll-top="scrollTop"></u-back-top>
	</view>
</template>

<script>
export default {
	data() {
		return {
			scrollTop: 0, //页面滚动
			navList: ["精选", "小儿疾病", "高血压", "高血压"], //导航
			navidx: 0, //导航idx
			newsList: [
				{
					thumb: "../../static/home/pic2.png",
					title: "三餐不规律，肠胃总干事不舒服，有必要做胃镜检查吗？",
					intro: "住院能报销，最高能报400万",
					label: ["不限医保", "不限医保"],
					fee: "10049",
					sell: "2900",
				},
				{
					thumb: "../../static/home/pic2.png",
					title: "三餐不规律，肠胃总干事不舒服，有必要做胃镜检查吗？",
					intro: "住院能报销，最高能报400万",
					label: ["不限医保", "不限医保"],
					fee: "10049",
					sell: "2900",
				},
				{
					thumb: "../../static/home/pic2.png",
					title: "三餐不规律，肠胃总干事不舒服，有必要做胃镜检查吗？",
					intro: "住院能报销，最高能报400万",
					label: ["不限医保", "不限医保"],
					fee: "10049",
					sell: "2900",
				},
				{
					thumb: "../../static/home/pic2.png",
					title: "三餐不规律，肠胃总干事不舒服，有必要做胃镜检查吗？",
					intro: "住院能报销，最高能报400万",
					label: ["不限医保", "不限医保"],
					fee: "10049",
					sell: "2900",
				},
				{
					thumb: "../../static/home/pic2.png",
					title: "三餐不规律，肠胃总干事不舒服，有必要做胃镜检查吗？",
					intro: "住院能报销，最高能报400万",
					label: ["不限医保", "不限医保"],
					fee: "10049",
					sell: "2900",
				},
				{
					thumb: "../../static/home/pic2.png",
					title: "三餐不规律，肠胃总干事不舒服，有必要做胃镜检查吗？",
					intro: "住院能报销，最高能报400万",
					label: ["不限医保", "不限医保"],
					fee: "10049",
					sell: "2900",
				},
				{
					thumb: "../../static/home/pic2.png",
					title: "三餐不规律，肠胃总干事不舒服，有必要做胃镜检查吗？",
					intro: "住院能报销，最高能报400万",
					label: ["不限医保", "不限医保"],
					fee: "10049",
					sell: "2900",
				},
				{
					thumb: "../../static/home/pic2.png",
					title: "三餐不规律，肠胃总干事不舒服，有必要做胃镜检查吗？",
					intro: "住院能报销，最高能报400万",
					label: ["不限医保", "不限医保"],
					fee: "10049",
					sell: "2900",
				},
			],
		};
	},
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
	},
	components: {},
	onLoad() {},

	methods: {
		changeNav(index) {
			this.navidx = index;
		},
	},
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
