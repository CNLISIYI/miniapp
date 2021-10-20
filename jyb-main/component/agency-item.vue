<template>
	<ul class="m-other-watching-list">
		<li v-for="(item,index) in agencyothers" :key="index">
			<navigator hover-class="none" class="clearfloat" :url="'/pages/agencyindex/index?agency='+item.comename">
				<div class="m-other-watching-img fl"><img  :src="'https:'+item.picurl" alt=""></div>
				<div class="m-other-watching-info fl">
					<h3>{{item.comname}}</h3>
					<p class="m-other-watching-msg ellipsis-1">{{item.maintitle}}</p>
					<div class='flex-box'>
						<div class="jyb-score">
							<div class="jyb-score-top" :style="'width:'+ item.star * 2 +'%'">
								<img  src="https://static.jiaoyubao.cn/images/mobile/star-fill.svg" alt="">
							</div>
							<div class="jyb-score-bottom">
								<img  src="https://static.jiaoyubao.cn/images/mobile/star.svg" alt="">
							</div>
						</div>
						<span>（{{item.num_pj}}条评价）</span>
					</div>
					<!-- <p class="m-other-watching-features"><span>资深外教</span><span>主题活动</span><span>网上答疑</span></p> -->
					<p class="m-other-watching-school flex-box"><img  src="https://static.jiaoyubao.cn/images/mobile/location-sign.png" alt="">{{item.num_xq}}个校区</p>
				</div>
			</navigator>
		</li>
	</ul>
</template>

<script>
	// import { mapState } from 'vuex' // 注意别漏了引入
	
	export default {
		name: "agency-item",
		//属性
		props: {
			agencyothers: {
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
	.m-other-watching-list { margin-top: 18px; }
	.m-other-watching-list li { min-height: 90px; margin-top: 12px; padding-bottom: 19px; border-bottom: .5px solid #eee; }
	.m-other-watching-list li:first-child { margin-top: 0; }
	.m-other-watching-list li:last-child { border-bottom: 0; }
	.m-other-watching-img { width: 90px; height: 90px; padding: 5px; position: relative; border: .5px solid #eee; -moz-border-radius: 4px; border-radius: 4px; background: #fff; }
	.m-other-watching-img img { max-width: 80px; max-height: 80px; position: absolute; z-index: 10; top: 50%; left: 50%; -webkit-transform: translate(-50%, -50%); -moz-transform: translate(-50%, -50%); -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%); }
	.m-other-watching-info { width: -moz-calc(100% - 104px); width: calc(100% - 104px); margin-left: 12px; }
	.m-other-watching-info h3 { min-height: 24px; font-size: 17px; font-weight: 600; line-height: 24px; color: #262626; }
	.m-other-watching-info > p { width: 100%; min-height: 17px; font-size: 12px; line-height: 17px; letter-spacing: 0; color: #666; }
	.m-other-watching-msg { margin-top: 2px; }
	.m-other-watching-info > div { height: 16px; margin-top: 5px; -webkit-box-pack: left; -moz-box-pack: left; -ms-flex-pack: left; justify-content: left; }
	.m-other-watching-info .jyb-score { margin-left: 0; }
	.m-other-watching-info > div span { font-size: 11px; color: #8c8c8c; }
	.m-other-watching-features { margin-top: 10px; }
	.m-other-watching-features span { height: 16px; margin-right: 5px; margin-bottom: 8px; padding: 0 5px; display: inline-block; font-size: 11px; line-height: 16px; letter-spacing: 0; color: #666; border: .5px solid #d9d9da; -moz-border-radius: 2px; border-radius: 2px; }
	.m-other-watching-school { height: 20px; font-size: 11px !important; line-height: 20px; color: #666; -webkit-box-pack: left; -moz-box-pack: left; -ms-flex-pack: left; justify-content: left; }
	.m-other-watching-school img { width: 14px; height: 14px; margin-right: 4px; }
	.m-other-watching-activity { margin-top: 5px; }
	.m-other-watching-activity span { height: 14px; margin-right: 4px; padding: 0 3px; display: inline-block; font-size: 10px;font-weight: lighter; line-height: 13.5px; color: #fe1940; border: .5px solid #fe1940; -moz-border-radius: 2px; border-radius: 2px; }
	
</style>
