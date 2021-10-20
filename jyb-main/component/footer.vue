<!-- 底部-含(导航、版权、电话) -->
<template>
	<!-- footer -->
	<div class="m-H5-v3-footer">
		<ul class="_ul m-jyb-footer-link flex-box border-bottom-1px">
			<li class="_li"><navigator url="/packageA/about/index" class="_a" hover-class="none">关于我们</navigator></li>
			<li class="_li"><navigator url="/packageA/contact/index" class="_a" hover-class="none">联系我们</navigator></li>
			<li class="_li"><navigator url="/packageA/enter/index?enter=1" class="_a" hover-class="none">品牌合作</navigator></li>
			<li class="_li"><navigator url="/packageB/ping/index?ping=1" class="_a" hover-class="none">点评奖金</navigator></li>
			<li class="_li"><navigator url="/packageA/feedback/index?feedback=1" class="_a" hover-class="none">意见反馈</navigator></li>
		</ul>
		<div class="m-jyb-copyright">
			<!-- <p class="_p">copyright &copy;济南邦赢信息技术有限公司 版权所有</p> -->
			<p class="_p">copyright &copy; 教育宝 Jiaoyubao.cn 版权所有</p>
			
			<!-- #ifdef MP-BAIDU -->
				<p class="_p">联系电话：400-601-2788</p>
			<!-- #endif -->
			
			<!-- #ifdef MP-WEIXIN -->
				<p class="_p _a" @click="navigatToCeo">找老板吐槽</p>
			<!-- #endif -->
		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			navigatToCeo() {
				uni.navigateToMiniProgram({
				  appId: 'wx34b0738d0eef5f78',
				  path: 'pages/forms/publish?token=FgDotD',
				})
			}
		}
	}
</script>

<style lang="scss">
	.m-H5-v3-footer{ @include mt(10px); }
	.m-bottom-nav { margin: 15px 20px 0; padding-bottom: 11px; overflow: hidden; border-bottom: .5px solid #eee; }
	.m-bottom-nav li { width: 20%; height: 17px; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; float: left; font-size: 11px; line-height: 17px; text-align: center; color: #323232; border-right: .5px solid #e1e1e1; }
	.m-bottom-nav li:last-child { border-right: 0; }
	.m-bottom-nav li a { font-size: 12px; color: #595959; }
	
	.m-copyright { margin-top: 14px; padding-bottom: 4px; }
	.m-copyright { font-size: 12px; text-align: center; color: #595959; }
	.m-copyright-tel { margin-top: 6px; }
	.m-jyb-copyright ._a {text-decoration: underline;}
</style>
