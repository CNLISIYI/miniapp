<template>
	<view class="">
		<ul class="m-info-list">
			<li v-for="(item, index) in newslist" :key="index">
				<navigator hover-class="none" open-type="navigate" :url="`/packageA/article/index?id=${item.id}&agency=${agencyename}`" class="_a clearfloat">
					<block v-if="item.articleimage == ''">
						<!-- 右侧无图 -->
						<h3 class="ellipsis-2">{{item.title}}</h3>
						<p class="ellipsis-2">{{item.introduction}}</p>
						<span>{{item.createtime}}</span>
					</block>
					<block v-else>
						<!-- 左文右图 -->
						<div class="m-info-item-left">
							<h3 class="ellipsis-2">{{item.title}}</h3>
							<span>{{item.createtime}}</span>
						</div>
						<img :src="'https:'+item.articleimage" alt="">
					</block>
				</navigator>
			</li>
		</ul>
	</view>
</template>

<script>
	// import { mapState } from 'vuex' // 注意别漏了引入

	export default {
		name: "news-item",
		//属性
		props: {
			cityename: { // city ename
				type: String,
				value: ""
			},
			agencyename: { // agency ename
				type: String,
				value: ""
			},
			newslist: {
				type: Array, //属性类型
				value: []
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

		}
	}
</script>

<style lang="scss">
	.m-info-list { padding: 0 16px; }
	.m-info-list li { padding: 16px 0; border-bottom: .5px solid #eee; }
	.m-info-list li:last-child { border-bottom: 0; }
	.m-info-list h3 { max-height: 48px; font-size: 17px; font-weight: 600; line-height: 24px; letter-spacing: 0; color: #262626; }
	.m-info-list p { width: 100%; max-height: 40px; margin-top: 5px; font-size: 14px; line-height: 20px; letter-spacing: 0; color: #595959; }
	.m-info-list span { height: 17px; margin-top: 10px; display: block; font-size: 12px; line-height: 17px; letter-spacing: 0; color: #8c8c8c; }
	.m-info-item-left { width: -moz-calc(100% - 133px); width: calc(100% - 133px); height: 68px; position: relative; float: left; }
	.m-info-list img { width: 113px; height: 68px; margin-left: 20px; float: right; -moz-border-radius: 4px; border-radius: 4px; }
</style>
