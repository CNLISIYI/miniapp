<template>
	<view>
		<view class="search-box">
			<i class="iconfont">&#xe8ed;</i>
			<input
				type="text"
				placeholder="请输入搜索关键字"
				v-modle="searchword"
				placeholder-style="color: #999"
			/>
		</view>
		<view class="list-nav">
			<view
				:class="['_li', navidx == index ? 'on' : '']"
				v-for="(item, index) in navList"
				:key="index"
				@click="changeNav(index)"
			>
				{{ item }}
			</view>
		</view>
		<view class="news-ul">
			<view class="_li" v-for="(item, index) in newsList" :key="index">
				<navigator
					class="_a clearfix"
					url="../newsdetail/index"
					hover-class="none"
				>
					<image :src="item.thumb"></image>
					<text class="_h4">{{ item.title }}</text>
					<view class="clearfix">
						<text class="_p fl">{{ item.date }}</text>
						<text class="_p fr">{{ item.views }}阅读量</text>
					</view>
				</navigator>
			</view>
		</view>
		<u-back-top :scroll-top="scrollTop"></u-back-top>
		<AppFooter page="news"></AppFooter>
	</view>
</template>

<script>
export default {
	data() {
		return {
			scrollTop: 0, //页面滚动
			searchword: "", //搜索关键词
			navList: ["精选", "小儿疾病", "高血压","精选", "小儿疾病", "高血压"], //导航
			navidx: 0, //导航idx
			newsList: [
				{
					thumb: "../../static/home/pic2.png",
					title: "三餐不规律，肠胃总干事不舒服，有必要做胃镜检查吗？",
					views: "236",
					date: "2021/01/22",
				},
				{
					thumb: "../../static/home/pic2.png",
					title: "三餐不规律，肠胃总干事不舒服，有必要做胃镜检查吗？",
					views: "236",
					date: "2021/01/22",
				},
				{
					thumb: "../../static/home/pic2.png",
					title: "三餐不规律，肠胃总干事不舒服，有必要做胃镜检查吗？",
					views: "236",
					date: "2021/01/22",
				},
                {
					thumb: "../../static/home/pic2.png",
					title: "三餐不规律，肠胃总干事不舒服，有必要做胃镜检查吗？",
					views: "236",
					date: "2021/01/22",
				},
				{
					thumb: "../../static/home/pic2.png",
					title: "三餐不规律，肠胃总干事不舒服，有必要做胃镜检查吗？",
					views: "236",
					date: "2021/01/22",
				},
				{
					thumb: "../../static/home/pic2.png",
					title: "三餐不规律，肠胃总干事不舒服，有必要做胃镜检查吗？",
					views: "236",
					date: "2021/01/22",
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
