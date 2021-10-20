<template>
	<web-view :src="onlineUrl"></web-view>
</template>

<script>
	// import { mapState } from 'vuex' // 注意别漏了引入
	
	export default {
		data() {
			return {
				frompage: '',
				onlineUrl: '',
			}
		},
		onLoad(opts) {
			let _this = this;
			console.log(opts);
			if (opts && JSON.stringify(opts) != '{}') {
				if(opts.from){
					_this.frompage = encodeURIComponent(opts.from);
				}
				
				if(getApp().globalData.unionid_bd == 75){
					console.log("_this.isQyShow");
					_this.onlineUrl = "https://m.jiaoyubao.cn/qiyu/qiyu.html"; // "https://jiaoyubao.qiyukf.com/client?k=69e53d90b67dbaf7c700543b1a551994"; // 
				}else{
					_this.onlineUrl = 'https://prd15.easyliao.com/live/chat.do?c=12627&g=20350&ref=https://99dqkt.smartapps.cn/' + _this.frompage;
				}
			}
			
			uni.setNavigationBarTitle({
				title: "在线客服"
			});
			
			uni.miniProgram.postMessage({data:{title:'教育宝'} });
		},
		created() {

		},
		// 引入 mapState 时使用
		// computed: {
		// 	...mapState([ // 获取数据
		// 		"returnTopNum"
		// 	]),
		// },
		methods: {
			
		}
	}
</script>

<style lang="scss">
	// 每个页面公共css
	// @import './index.scss';
</style>
