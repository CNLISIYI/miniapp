<template>
	<view>
		<view class="nav-top" :style="'height:' + topheight + 'px'">
			<view class="navcity">
				<span>赤峰市</span><i class="iconfont">&#xe600;</i>
			</view>
			<view class="navtitle">优体健康管理</view>
		</view>
		<view class="home-main autopb" :style="'padding-top:' + mainpt + 'px'">
			<u-swiper :list="bannerlist"></u-swiper>
			<view class="homenav-box">
				<navigator class="_a" url="" hover-class="none">
					<image src="../../static/home/iconl.png"></image>
					<text class="_h4">健康管理预约</text>
					<text class="_p">随时预约简单快捷</text>
				</navigator>
				<navigator class="_a" url="" hover-class="none">
					<image src="../../static/home/iconr.png"></image>
					<text class="_h4">健康报告查询</text>
					<text class="_p">专业医生专业建议</text>
				</navigator>
			</view>
			<view class="avatar-box">
				<image src="../../static/home/avatar.png"></image>
			</view>
			<view class="home-title clearfix">
				<text class="_h4">健康保险</text>
				<navigator url="../insurance/index" class="more" hover-class="none"
					><text>更多</text><i class="iconfont">&#xe677;</i></navigator
				>
			</view>
			<view class="homeinsu-ul">
				<view class="_li" v-for="(item, index) in insuList" :key="index">
					<navigator url="../insudetail/index" hover-class="none">
						<image :src="item.thumb"></image>
						<text>{{ item.title }}</text>
					</navigator>
				</view>
			</view>
			<view class="home-title clearfix">
				<text class="_h4">优选商城</text>
				<navigator url="../shop/index" class="more" hover-class="none"
					><text>更多</text><i class="iconfont">&#xe677;</i></navigator
				>
			</view>
			<navigator class="_a shop-img" url="../shop/index" hover-class="none">
				<image src="../../static/home/shoppic.png"></image>
			</navigator>
			<view class="homenav-box homeshop-nav">
				<navigator class="_a" url="" hover-class="none">
					<image src="../../static/home/shopl.png"></image>
					<text class="_h4">关爱父母</text>
					<text class="_p">最实在的孝心</text>
				</navigator>
				<navigator class="_a" url="" hover-class="none">
					<image src="../../static/home/shopr.png"></image>
					<text class="_h4">运动专区</text>
					<text class="_p">会员特惠</text>
				</navigator>
			</view>
			<view class="home-title clearfix">
				<text class="_h4">健康百科</text>
				<navigator url="../news/index" class="more" hover-class="none"
					><text>更多</text><i class="iconfont">&#xe677;</i></navigator
				>
			</view>
			<view class="homenews-ul">
				<view class="_li" v-for="(item, index) in newsList" :key="index">
					<navigator
						class="_a clearfix"
						url="../newsdetail/index"
						hover-class="none"
					>
						<image :src="item.thumb"></image>
						<text class="_h4">{{ item.title }}</text>
						<text class="_p">{{ item.views }}阅读</text>
					</navigator>
				</view>
			</view>
			<u-loadmore :status="status" />
		</view>
		<AppFooter></AppFooter>
	</view>
</template>

<script>
export default {
	data() {
		return {
			topheight: 48, //导航栏高度
			mainpt: 42,
			bannerlist: [
				require("../../static/home/banner.png"),
				require("../../static/home/banner.png"),
				require("../../static/home/banner.png"),
			],
			bannerData: [
				{ image: "../../static/home/banner.png", link: "" },
				{ image: "../../static/home/banner.png", link: "" },
				{ image: "../../static/home/banner.png", link: "" },
			],
			insuList: [
				{ thumb: "../../static/home/pic.png", title: "家庭健康保险" },
				{ thumb: "../../static/home/pic.png", title: "小朋友疾病保险" },
				{ thumb: "../../static/home/pic.png", title: "老人疾病保险" },
			],
			newsList: [
				{
					thumb: "../../static/home/pic2.png",
					title: "三餐不规律，肠胃总干事不舒服，有必要做胃镜检查吗？",
					views: "236",
				},
				{
					thumb: "../../static/home/pic2.png",
					title: "三餐不规律，肠胃总干事不舒服，有必要做胃镜检查吗？",
					views: "236",
				},
				{
					thumb: "../../static/home/pic2.png",
					title: "三餐不规律，肠胃总干事不舒服，有必要做胃镜检查吗？",
					views: "236",
				},
			],
			status: "loadmore", //加载更多
			page: 0, //底部百科页码
		};
	},
	components: {},
	onLoad() {
		const menu = uni.getMenuButtonBoundingClientRect();
		this.topheight = parseInt(menu.top + menu.height + 6);
		this.mainpt = parseInt(menu.top + menu.height + 10);
	},
	onReachBottom() {
		if (this.page >= 3) return;
		this.status = "loading";
		this.page = ++this.page;
		setTimeout(() => {
			this.newsList.push({
				thumb: "../../static/home/pic2.png",
				title: "三餐不规律，肠胃总干事不舒服，有必要做胃镜检查吗？",
				views: "236",
			});
			if (this.page >= 3) this.status = "nomore";
			else this.status = "loading";
		}, 500);
	},
	methods: {},
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
