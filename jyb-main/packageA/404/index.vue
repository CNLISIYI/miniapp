<template>
	<view>
		<view class="false-container">			
			<div class="phone-img"></div>
			<h2 class="phone-title">抱歉!  您访问的页面找不到啦...</h2>
			<p class="phone-p">可能原因：网址错误，网址已失效</p>
			<navigator hover-class="none" open-type="reLaunch" url="/pages/index/index" class="phone-a">返回教育宝首页</navigator>
			<view class="phone-tel" @click="makeTelPhone">联系客服：400-601-2788</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(opts) {
			let _this = this;
			// console.log(opts);
			if (opts && JSON.stringify(opts) != '{}') {
				
			}
		},
		created() {

		},
		methods: {
			// 拨打电话
			makeTelPhone(e) {
				let _this = this;
				uni.makePhoneCall({
					phoneNumber: "4006012788" //仅为示例
				});
			},
		}
	}
</script>

<style lang="scss">
	.false-container{	width: 100vw; height: 100vh; padding-top:15%; box-sizing: border-box; }
	.phone-img{width:150px;height:114px;background:url(https://static.jiaoyubao.cn/m/images/404_iphone@2x.png) top center no-repeat;background-size:100% 100%;margin:0 auto 15px auto;}
	.phone-title{margin-bottom:5px;font-size:18px;line-height:25px;color:#666;text-align:center;}
	.phone-p{margin-bottom:20px;font-size:14px;line-height:20px;text-align:center;color: #999;}
	.phone-a{display:block;width:178px;height:40px;background-color:#1a8cff;margin:0 auto;line-height:40px;font-size:14px;color:#fff;text-align:center;font-weight:bold;border-radius: 4px;}
	.phone-a:hover{background-color:#1a8fee;color:#fff;}
	.phone-tel{position:absolute;bottom:30px;left:0;z-index:2;width:100%;height:18px;font-size:12px;color:#999;text-align:center;line-height: 18px;}
</style>
