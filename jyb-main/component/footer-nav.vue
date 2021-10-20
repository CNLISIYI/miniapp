<!-- 底部-导航 -->
<template>
	<footer class="m-common-footer">
	    <ul class="_ul m-jyb-footer-link m-jyb-footer-fixed flex-box">
	        <li :class="['_li', idx == index ? 'active' : '']" :key="index" v-for="(item,index) in navList"><navigator hover-class="none" :url="item.url" class="_a">{{item.name}}</navigator></li>
	    </ul>
	</footer>
</template>

<script>
	export default {
		name: "footer-nav",
		//属性
		props: {
			idx: {
				type: String, //属性类型
				value: '0'
			},
		},
		data () {
			return {
				navList : [{
					url : '/packageA/about/index',
					name : "关于我们"
				},{
					url : '/packageA/contact/index',
					name : "联系我们"
				},{
					url : '/packageA/enter/index?enter=1',
					name : "品牌合作"
				},{
					url : '/packageB/ping/index?ping=1',
					name : "点评奖金"
				},{
					url : '/packageA/feedback/index?feedback=1',
					name : "意见反馈"
				}]
			}
		},
		//组件生命周期
		created: function(e) {

		},
		methods: {

		}
	}
</script>

<style>
</style>
