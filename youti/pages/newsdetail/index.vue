<template>
	<view class="bgf7">
		<view class="detail-box">
			<view class="_h4">减肥的道路上，除了饮食和运动，这一点也很重要！</view>
			<text class="_p">2021-09-13</text>
			<view class="rich-box">
				<p>
					肥胖和身体质量指数（BMI）的关系密不可分。BMI的计算方法，是体重的千克数除以身高米数的平方，比如一个人体重70千克，身高一米八，那他的BMI就是70除以1.8的平方，大概是21.6左右。
					阿曼达·哈里斯特和劳拉·哈布斯-泰特是美国俄克拉荷马州立大学的两位教授，她们的研究方向主要是儿童和青少年的肥胖问题，以及其中与人类发展和家庭科学有关的视角。
				</p>
				<image src="../../static/home/pic.png"></image>
				<p>
					而在儿童和青少年当中，因为不断发育的身体状态，用一个固定的门槛来衡量肥胖比较困难，所以一般会看TA在青少年整个群体当中的比例。在有些国家和地区的定义当中，如果TA的BMI指数高过百分之95的其他青少年，那就会被划定为肥胖。
				</p>
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
	</view>
</template>

<script>
export default {
	data() {
		return {
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
			],
		};
	},
	components: {},
	onLoad() {},

	methods: {},
};
</script>

<style lang="scss" scoped>
.detail-box {
    padding: 20upx;
    background-color: #fff;
	._h4 {
		display: block;
		font-size: 34upx;
		font-family: PingFang SC;
		color: #222222;
		margin-bottom: 30upx;
	}
	._p {
        display: block;
		font-size: 26upx;
		color: #999999;
		line-height: 1;
		margin-bottom: 40upx;
	}
}
.rich-box {
    padding: 0 10upx;
	p {
		font-size: 14px;
		font-family: PingFang SC;
		font-weight: 400;
		color: #555555;
		line-height: 21px;
	}
	image {
		width: 100%;
		margin: 30upx auto;
	}
}
.news-ul {
    background-color: #fff;
    margin-top: 20upx;
    padding-bottom: 70upx;
}
</style>
