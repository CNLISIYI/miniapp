<template>
	<view class="video-play-container  flex-box-column">
		<main class="video-play-inner flex-1 flex-box">
			<video :src="videosrc" autoplay="true"></video>
		</main>
		<view class="video-play-blank"></view>
		<text class="video-play-close" @click="closeParVideoPop"></text>
	</view>
</template>

<script>
	// import { mapState } from 'vuex' // 注意别漏了引入
	
	export default {
		name: "video-play",
		//属性
		props: {
			videosrc: {
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
			closeParVideoPop(){
				this.$emit('closeVideo','');  
			}
		}
	}
</script>

<style lang="scss">
	.video-play-container{
		position: fixed;
		width: 100vw;
		height: 100vh;
		left: 0;
		top: 0;
		z-index: 99999;
		@include bgc(rgba(0, 0, 0, .9));
		video{
			width: 100%;
		}
	}
	.video-play-inner{
		width: 100%;
		height: 100%;
	}
	.video-play-blank{
		width: 100%;
		height: 160rpx;
	}
	.video-play-close{
		width: 38px; height: 38px;
		position: absolute;
		left: 50%;
		bottom: 160rpx;
		transform: translateX(-50%);
		display: inline-block;
		-webkit-mask: url(https://static.jiaoyubao.cn/images/common/icon-cross-linear.svg) no-repeat;
		mask: url(https://static.jiaoyubao.cn/images/common/icon-cross-linear.svg) no-repeat;
		background-color: #fff;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	}
</style>
