<template>
	<view class="">
		<!-- #ifdef MP-BAIDU -->
			<view class="online-talk-btn" @click="onlineTalkClick"></view>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
			<!-- <button class="online-talk-btn" open-type="contact"></button> -->
		<!-- #endif -->
	</view>
</template>

<script>
	// import { mapState } from 'vuex' // 注意别漏了引入
	
	export default {
		name: "online-talk",
		//属性
		props: {
			name: {
				type: String, //属性类型
				value: ""
			},
		},
		//组件生命周期
		created: function(e) {
	
		},
		// 引入 mapState 时使用
		// computed: {
		// 	...mapState([ // 获取数据
		// 		"returnTopNum"
		// 	]),
		// },
		methods: {
			onlineTalkClick(){
				let pages = getCurrentPages();    //获取加载的页面
				let currentPage = pages[pages.length - 1];  //获取当前页面的对象
				// console.log(currentPage);
				let url = currentPage.route;  //当前页面url
				let options = currentPage.options;   //获取url中所带的参数
				//拼接url的参数
				let urlPage = url + '?';
				for (let key in options) {
					let value = options[key]
					urlPage += key + '=' + value + '&';
				}
				urlPage = urlPage.substring(0, urlPage.length - 1);
				// console.log(urlPage);
				// console.log(encodeURIComponent(urlPage));
				uni.navigateTo({
					url: '/packageA/onlinetalk/index?from=' + encodeURIComponent(urlPage)
				});
			}
		}
	}
</script>

<style lang="scss">
	.online-talk-btn{
		width: 60px;
		height: 72px;
		@include fixed(fixed, auto, auto, 24upx, 200upx);
		z-index: 2000;
		background:url(https://static.jiaoyubao.cn/images/mobile/yiliaotong-kf.png) no-repeat center center;
		background-size:100%;
	}
	@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
		.online-talk-btn{
			bottom: 260upx;
		}
	}
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
		.online-talk-btn{
			bottom: 260upx;
		}
	}
	
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
		.online-talk-btn{
			bottom: 260upx;
		}
	}
</style>
