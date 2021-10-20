<!-- 头部-title(含 返回) -->
<template>
	<header class="m-common-header">
		<ul class="_ul m-jyb-header m-jyb-header-fixed flex-box border-bottom-1px">
			<li class="_li m-header-back flex-box mr10">
				<navigator hover-class="none" open-type="navigateBack" class="m-common-icon icon_left_no_bg"></navigator>
			</li>
			<li class="_li m-header-title flex-box flex-1 ellipsis-1 mr38"><text class="_a">{{title}}</text></li>
		</ul>
	</header>
</template>

<script>
	export default {
		name: "header-title",
		//属性
		props: {
			title: {
				type: String, //属性类型
				value: ""
			},
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
