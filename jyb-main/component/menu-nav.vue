<!-- 机构列表页-菜单(带动画效果) -->
<template>
	<div class="m-jyb-fixed-mask">
		<div class="m-jyb-fixed-outer" :animation="animationData">
			<div class="m-jyb-fixed-title flex-box">
				<span class="flex-1">教育宝平台功能直达</span>
				<text @click="closeMenuPop" id="close" class="m-common-icon icon_cross_no_bg"></text>
			</div>
			<div class="m-jyb-fixed-nav">
				<div class="flex-box m-jyb-fixed-list">
					<navigator hover-class="none" url="/pages/index/index" open-type="reLaunch" class="_a flex-1 flex-box-column">
						<i class="_i m-common-icon menu_index_linear"></i>
						<span class="_span">首页</span>
					</navigator>
					<navigator hover-class="none" url="/packageA/category/index?pid=0" class="_a flex-1 flex-box-column">
						<i class="_i m-common-icon menu_sort_linear"></i>
						<span class="_span">培训行业</span>
					</navigator>
					<navigator hover-class="none" url="/xiaomi/index/xiaomi/index?xiaomi=1" class="_a flex-1 flex-box-column">
						<i class="_i m-common-icon menu_choose_class_linear"></i>
						<span class="_span">帮选课</span>
					</navigator>
					<navigator hover-class="none" url="/packageB/ping/index?ping=1" class="_a flex-1 flex-box-column">
						<i class="_i m-common-icon icon_money_linear"></i>
						<span class="_span">点评奖金</span>
					</navigator>
				</div>
				<div class="flex-box m-jyb-fixed-list mt15">
					<navigator hover-class="none" url="/packageA/enter/index?enter=1" class="_a flex-1 flex-box-column">
						<i class="_i m-common-icon menu_class"></i>
						<span class="_span">品牌合作</span>
					</navigator>
					<navigator hover-class="none" url="/packageA/feedback/index?feedback=1" class="_a flex-1 flex-box-column">
						<i class="_i m-common-icon menu_evaluation"></i>
						<span class="_span">意见反馈</span>
					</navigator>
					<navigator hover-class="none" url="/packageA/about/index" class="_a flex-1 flex-box-column">
						<i class="_i m-common-icon menu_intro"></i>
						<span class="_span">关于我们</span>
					</navigator>
					<navigator hover-class="none" url="/packageA/contact/index" class="_a flex-1 flex-box-column">
						<i class="_i m-common-icon icon_video_play_linear"></i>
						<span class="_span">联系我们</span>
					</navigator>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "menu-nav",
		//属性
		props: {
			
		},
		data(){
			return {
				animationData: {},
			}
		},
		//组件生命周期
		created: function(e) {
			
		},
		mounted() {
			let _this = this;
			let animation = uni.createAnimation({
				duration: 500,
				timingFunction: 'ease',
			})
			
			_this.animation = animation;
			// #ifdef MP-BAIDU
			setTimeout(function(){	
			// #endif
				_this.animation.top(0).step();
				_this.animationData = _this.animation.export();
			// #ifdef MP-BAIDU
			},10);
			// #endif
		},
		methods: {
			closeMenuPop(){
				let _this = this;
				_this.animation.top('-300px').step();
				_this.animationData = _this.animation.export();
				setTimeout(function() {
					_this.$emit('menuPopHide','');  
				}, 400);
			},
		}
	}
</script>

<style lang="scss">
	.m-jyb-fixed-outer {
		position: relative;
		top: -300px;
	}
</style>
