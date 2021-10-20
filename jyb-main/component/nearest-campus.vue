<!-- 机构相关页面-最近校区 -->
<template>
	<div class="m-index-near-school bgfff">
	    <div class="m-index-near-school-inner flex-box">
	        <p class="flex-1">最近校区：<navigator hover-class="none" :url="'/pages/school/index?agency=' + agencyename + '&id=' + nearschool.areacode+ '&schoolId=' + nearschool.id" class="_a"><em class="ellipsis-1">{{nearschool.pointname}}</em><block v-if="nearschool.minlength > 0">(距您{{nearschool.minlength}}km)</block></navigator></p>
			<view class="m-jyb-call-btn" @click="sendParMakeTelPhone" title=""><img  src="https://static.jiaoyubao.cn/images/mobile/icon-phone.svg" alt=""></view>
		</div>
	</div>
</template>

<script>
	// import { mapState } from 'vuex' // 注意别漏了引入
	
	export default {
		name: "nearest-campus",
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
			nearschool: { // 最近校区相关信息
				type: Object,
				value: {}
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
			sendParMakeTelPhone(){
				let _this = this;
				_this.$emit('receiveMakeTelPhone','');  
			}
		}
	}
</script>

<style lang="scss">
	.m-index-near-school { padding: 0 16px 12px; line-height: 25px; }
	.m-index-near-school-inner { padding-top: 13px; border-top: .5px solid #eee; }
	.m-index-near-school p { font-size: 14px; color: #595959; border-right: .5px solid #eee; }
	.m-index-near-school a { font-size: 13px; color: #262626; display: inline;}
	.m-index-near-school em { max-width: -moz-calc(100vw - 212px); max-width: calc(100vw - 212px); margin-right: 2px; display: -webkit-inline-box; display: -moz-inline-box; display: -ms-inline-flexbox; display: inline-flex; font-size: 14px; }
	.m-index-near-school img { width: 24px; height: 24px; margin-right: 8px; margin-left: 17px; }
	
</style>
