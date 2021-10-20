<template>
	<view>
		<div class="swiper-container com-swiper-container-outer" v-if="type == 'up-down'" style="height: 137px;">
			<ul class="m-teacher-list swiper-wrapper clearfloat com-swiper-container flex-box" style="height: 157px;">
				<li class="swiper-slide" v-for="(item,index) in teachers" :key="index">
					<navigator hover-class="none" class="_a flex-box" :url="'/packageA/teacherdetail/index?id='+item.id" title="">
						<img :src="'https:'+item.photo" alt="">
						<h3  class="ellipsis-1" style="max-width: 70px; margin: 10px auto 0;">{{item.name}}</h3>
						<p class="ellipsis-1" style="max-width: 70px;">{{item.teacherclass[item.teacherclass.length -1].name}}</p>
					</navigator>
				</li>
			</ul>
		</div>
		<ul class="m-html-teacher-list"  v-if="type == 'left-right'">
			<li v-for="(item, index) in teachers" :key="index">
				<navigator hover-class="none" class="_a clearfloat" :url="'/packageA/teacherdetail/index?id='+item.id" :title="item.name">
					<img class="m-html-teacher-item-img fl" :src="'https:'+item.photo" alt="">
					<div class="m-html-teacher-item-info fl">
						<h3>{{item.name}}</h3>
						<p class="ellipsis-1">{{item.subject}}·{{item.years}}年教龄</p>
						<p class="ellipsis-1">{{item.mainAttack}}</p>
					</div>
				</navigator>
			</li>
		</ul>
	</view>
</template>

<script>
	// import { mapState } from 'vuex' // 注意别漏了引入

	export default {
		name: "teacher-item",
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
			teachers: {
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
	.m-teacher-list .swiper-slide {
		width: 90px!important; height: 120px!important; margin-top: 17px; padding-right: 20px; float: left;
		&:first-child{
			width: 110px !important;
			@include pl(20px);
		}
	}
	.m-teacher-list .swiper-slide:nth-child(4n+1) { margin-left: 0; }
	.m-teacher-list ._a { width: 100%; flex-direction: column; -webkit-box-orient: vertical; -webkit-box-direction: normal; -moz-box-orient: vertical; -moz-box-direction: normal; -ms-flex-direction: column; }
	.m-teacher-list img { width: 70px; height: 70px; -moz-border-radius: 50%; border-radius: 50%; }
	.m-teacher-list h3 { height: 20px; margin-top: 10px; font-size: 14px; font-weight: 600; line-height: 20px; letter-spacing: 0; color: #323232; }
	.m-teacher-list p { height: 16px; margin-top: 4px; font-size: 11px; line-height: 16px; color: #666; }


	.m-html-teacher-list { padding-left: 16px; }
	.m-html-teacher-list li { padding: 16px 10px 19px 0; border-bottom: .5px solid #eee; }
	.m-html-teacher-list li:last-child { border-bottom: 0; }
	.m-html-teacher-item-img { width: 56px; height: 56px; -moz-border-radius: 50%; border-radius: 50%; }
	.m-html-teacher-item-info { width: -moz-calc(100% - 66px); width: calc(100% - 66px); margin-left: 10px; padding-top: 4px; }
	.m-html-teacher-item-info h3 { height: 24px; font-size: 17px; font-weight: 600; line-height: 24px; letter-spacing: 0; color: #262626; }
	.m-html-teacher-item-info p { width: 100%; height: 18px; margin-top: 4px; font-size: 13px; line-height: 18px; letter-spacing: 0; color: #8c8c8c; }
	.m-html-teacher-item-info .cont-editor { width: 100%; height: 18px; margin-top: 4px; overflow: hidden; font-size: 13px; line-height: 18px; white-space: nowrap; letter-spacing: 0; text-overflow: ellipsis; color: #8c8c8c; }

</style>
