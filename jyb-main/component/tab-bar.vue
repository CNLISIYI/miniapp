<template>
	<ul class="tab-bar-container m-jyb-footer flex-box-around">
	    <li :class="['m-footer-item', item.ename == activeurl ? 'active' : '']" v-for="(item,index) in tabBars" :key="index">
			<view class="flex-box-column" v-if="item.ename == activeurl">
				<span class="m-common-icon" :class="item.icon"></span>
				<span class="m-footer-title">{{item.name}}</span>
			</view>
			<navigator hover-class="none" open-type="navigate" :url="item.url" class="flex-box-column" v-else>
				<span class="m-common-icon" :class="item.icon"></span>
				<span class="m-footer-title">{{item.name}}</span>
			</navigator>
			<view class="tips" v-if="item.ename == 'chat' && total > 0">{{total}}</view>
	    </li>
	</ul>
</template>

<script>
	// import { mapState } from 'vuex' // 注意别漏了引入
	// import DATracker from './common/js/DaTracker.js'
	export default {
		name: "tab-bar",
		//属性
		props: {
			activeurl: {
				type: String, //属性类型
				value: ""
			},
		},
		data(){
			return {
				tabBars:[
					{
						url:'/pages/index/index',
						ename: 'index',
						icon: 'menu_index_linear2',
						name: '首页'
					},
					{
						url:'/packageA/category/index',
						ename: 'category',
						icon: 'menu_sort_linear',
						name: '全部类别'
					},
					{
						url:'/packageA/xiaomi/index',
						ename: 'xiaomi',
						icon: 'menu_choose_class_linear',
						name: '帮选课'
					},
					{
						url:'plugin://myPlugin/chat',
						ename: 'chat',
						icon: 'icon_listen_linear',
						name: '在线客服'
					}
				],
				total: 0,
				message: ''
			}
		},
		//组件生命周期
		created: function(e) {
			let _this = this;
			var myPluginInterface = requirePlugin('myPlugin');
			var appId = 'tIqTai1WMgV';
			myPluginInterface.__configAppId(appId);
			myPluginInterface._$configAppKeySync('69e53d90b67dbaf7c700543b1a551994');
			// myPluginInterface.__configDomain("https://qiyukf.com"); // 1.1.1版本以前需要手动配置下七鱼服务器域名
			
			setInterval(function(){
				const myPluginInterface = requirePlugin('myPlugin');
				myPluginInterface._$onunread(res => {
				  _this.total = res.total;
				  _this.message = res.message.content;
				});
				// // console.log('当前未读消息总数: ', _this.total)
			},1000)
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
	.tab-bar-container{
		width: 100vw;
	}
	.m-common-icon {
		background-color: #ABABAB;
	}
	.m-footer-item {
		position: relative;
	}
	.tips {
		position: absolute;
		right: 4px;
		top: 0;
		width: 16px;
		height: 16px;
		background-color: red;
		color: #FFFFFF;
		font-size: 11px;
		line-height: 16px;
		text-align: center;
		border-radius: 50%;
	}
	@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
		.tab-bar-container {
			height: 164upx;
			padding-bottom: 64upx;
		}
	}
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
		.tab-bar-container {
			height: 164upx;
			padding-bottom: 64upx;
		}
	}
	
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
		.tab-bar-container {
			height: 164upx;
			padding-bottom: 64upx;
		}
	}
</style>
