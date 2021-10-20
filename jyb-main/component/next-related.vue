<!-- 相关XX / 接下来要XX (文字 swiper) -->
<template>
	<view>
		<!-- 不多于两条 -->
		<ul class="m-next-recommend-list clearfloat" v-if="tuijian.length <= 2">			
			<li class="_li" v-for="(item,index) in tuijian" :key="index">
				<navigator hover-class="none" :url="'/pages/agencylist/index?city='+cityename+'&class='+item.ename" class="_a" title="" >{{item.name}}</navigator>
			</li>
		</ul>

		<!-- 大于两条 -->
		<ul class="m-next-recommend-list swiper-wrapper clearfloat com-swiper-container flex-box" v-if="tuijian.length > 2">
			<li class="_li swiper-slide" v-for="(items,index) in tuijian" :key="index">
				<navigator hover-class="none" :url="'/pages/agencylist/index?city='+cityename+'&class='+item.ename" class="_a" title="" v-for="(item,idx) in tuijian" :key="idx" v-if="idx >= 2 * index && idx <= 2 * index + 1">{{item.name}}</navigator>
			</li>
		</ul>
	</view>
</template>

<script>
	// import { mapState } from 'vuex' // 注意别漏了引入

	export default {
		name: "next-related",
		//属性
		props: {
			cityename: { // city ename
				type: String,
				value: ""
			},
			tuijian: {
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
	
</style>
