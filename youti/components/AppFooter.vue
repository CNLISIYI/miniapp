<template>
	<view class="app-footer">
		<navigator
			class="_li"
			hover-class="none"
			url="../index/index"
			open-type="redirect"
		>
			<i v-if="page == 'home'" class="on iconfont">&#xe750;</i>
			<i v-else class="iconfont">&#xe751;</i>
			<text :class="page == 'home' ? 'on' : ''">首页</text>
		</navigator>
		<navigator
			class="_li"
			hover-class="none"
			url="../shop/index"
			open-type="redirect"
		>
			<i v-if="page == 'shop'" class="on iconfont">&#xe778;</i>
			<i v-else class="iconfont">&#xe736;</i>
			<text :class="page == 'shop' ? 'on' : ''">商城</text>
		</navigator>
		<navigator
			class="_li"
			hover-class="none"
			url="../news/index"
			open-type="redirect"
		>
			<i v-if="page == 'news'" class="on iconfont">&#xe934;</i>
			<i v-else class="iconfont">&#xe935;</i>
			<text :class="page == 'news' ? 'on' : ''">百科</text>
		</navigator>
		<navigator
			class="_li"
			hover-class="none"
			url="../mine/index"
			open-type="redirect"
		>
			<i v-if="page == 'mine'" class="on iconfont">&#xe75d;</i>
			<i v-else class="iconfont">&#xe75e;</i>
			<text :class="page == 'mine' ? 'on' : ''">我的</text>
		</navigator>
	</view>
</template>

<script>
export default {
	name: "AppFooter",
	data() {
		return {};
	},
	props: {
		page: {
			type: String,
			default: "home",
		},
	},
	mounted() {},

	methods: {},
};
</script>

<style lang="scss" scoped>
.app-footer {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100vw;
	height: 100upx;
	background: #ffffff;
	box-shadow: 0px 0px 10upx 0px rgba(0, 0, 0, 0.07);
	padding: 15upx 0 8upx;
	display: flex;
	flex-flow: wrap;
	justify-content: center;
	z-index: 999;
	._li {
		flex: 1;
		text-align: center;
	}
	text {
		font-size: 22upx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		line-height: 1;
	}
	.iconfont {
		display: block;
		font-size: 40upx;
		margin-bottom: 6upx;
		line-height: 1;
		font-weight: 400;
		color: #999999;
	}
	.on {
		color: #45b780;
	}
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
	.app-footer {
		height: 168upx;
	}
}
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
	.app-footer {
		height: 168upx;
	}
}

@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
	.app-footer {
		height: 168upx;
	}
}
</style>
