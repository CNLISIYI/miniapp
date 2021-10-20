<template>
	<view>		
		<!-- 左图右文 -->
		<ul class="m-class-list" v-if="type == 'left-right'">
			<li v-for="(item,index) in classes" :key="index">
				<navigator hover-class="none" class="_a flex-box" :url="'/packageA/classdetail/index?agency=' + agencyEname + '&id=' + item.id" title="">
					<div class="m-class-img">
						<img v-if="item.productrecommend == 1" class="m-class-tuijian-sign" src="https://static.jiaoyubao.cn/images/mobile/tag-tuijian.svg" alt="">
						<img  :src="item.img ? 'https:'+item.img : 'https://img.jiaoyubao.cn/product/images/'+ item.id +'.jpg'"  alt="">
					</div>
					<div class="m-class-intro flex-1">
						<h3 class="ellipsis-1">{{tools.UnicodeToAscii(item.class_name)}}</h3>
						<p class="ellipsis-1">{{item.class_mc}} · {{item.banxing_mc}}</p>
						<div class="flex-box" v-if="item.price == 0"><span>请询价</span></div>
						<div class="flex-box" v-else><em>￥{{item.price}}</em></div>
					</div>
				</navigator>
			</li>
		</ul>
		<!-- 上图下标题 -->
	</view>
</template>

<script>
	// import { mapState } from 'vuex' // 注意别漏了引入
	
	export default {
		name: "class-item",
		//属性
		props: {
			type: { // 布局结构 'left-right' or 'up-down'
				type: String,
				value: ''
			},
			cityename: { // city ename
				type: String,
				value: ""
			},
			agencyename: { // agency ename
				type: String,
				value: ""
			},
			classes: {
				type: Array,
				value: []
			}
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
			
		}
	}
</script>

<style lang="scss">
	.m-class-list ._a { width: 100%; }
	.m-class-list li { margin-top: 24px; }
	.m-class-list li:first-child { margin-top: 17px; }
	.m-class-img { width: 130px; height: 78px; position: relative; }
	.m-class-img img { width: 100%; height: 100%; -moz-border-radius: 4px; border-radius: 4px; }
	.m-class-img  .m-class-tuijian-sign { width: 39px; height: 20px; position: absolute; top: 0; left: 0; -moz-border-radius: 0; border-radius: 0; }
	.m-class-intro { margin-left: 10px; }
	.m-class-intro h3 { width: -moz-calc(100vw - 172px); width: calc(100vw - 172px); height: 22px; font-size: 17px; line-height: 22px; color: #262626; }
	.m-class-intro p { width: -moz-calc(100vw - 172px); width: calc(100vw - 172px); height: 17px; margin-top: 3px; font-size: 12px; line-height: 17px; color: #8c8c8c; }
	.m-class-intro div { height: 20px; margin-top: 16px; font-size: 12px; line-height: 20px; color: #8c8c8c; -webkit-box-pack: left; -moz-box-pack: left; -ms-flex-pack: left; justify-content: left; }
	.m-class-intro em { font-family: arial; font-size: 14px; color: #fe1940; }
	.m-class-intro i { width: 26px; height: 14px; margin-left: 4px; display: inline-block; font-size: 11px; font-weight: lighter;line-height: 13.5px; text-align: center; color: #fe1940; border: .5px solid #fe1940; -moz-border-radius: 2px; border-radius: 2px; }
	
</style>
