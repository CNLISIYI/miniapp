<template>
	<view class="uni-padding-wrap">
		<view class="page-section swiper">
			<view class="page-section-spacing swiper-container m-evaluation-list mtop18">
				<swiper class="swiper swiper-wrapper" previous-margin="10px" next-margin="10px">
					<swiper-item class="swiper-slide" v-for="(item,index) in evaluations" :key="index">
						<navigator hover-class="none" :url="'/packageA/evaluation/index?agency='+agencyename" title="">
							<div class="m-evaluation-item-header flex-box">
								<img  v-if="item.photo && item.photo != ''" :src="'https:'+item.photo" alt="">
								<div v-else class="m-evaluation-item-header-noimg" style="width: 32px;height: 32px;line-height: 32px;">{{item.user_name.substr(0,1)}}</div>
								<span>{{item.user_name}}</span>
								<div class="jyb-score">
									<div class="jyb-score-top" :style="'width:'+ item.star * 2 +'%'">
										<img  src="https://static.jiaoyubao.cn/images/mobile/star-fill.svg" alt="">
									</div>
									<div class="jyb-score-bottom">
										<img  src="https://static.jiaoyubao.cn/images/mobile/star.svg" alt="">
									</div>
								</div>
							</div>
							<p class="ellipsis-4 content" v-html="tools.UnicodeToAscii(item.content)"></p>
							<span class="time">{{item.dt_pj}}</span>
						</navigator>
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
	// import { mapState } from 'vuex' // 注意别漏了引入
	
	export default {
		name: "pj-swiper-item",
		//属性
		props: {
			evaluations: {
				type: Array, //属性类型
				value: ""
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
	.m-evaluation-list {
		width: -moz-calc(100% + 32px); width: calc(100% + 32px); margin-left: -16px; 
		uni-swiper, .swiper-wrapper {
			height: 189px;
		}
	}
	.m-evaluation-list .swiper-slide { width: 310px!important; height: 189px!important; padding: 16px; border-right: 10px solid #fff; display: inline-block; -moz-border-radius: 4px; border-radius: 4px; background: #f5f6f7; position: relative; }
	.m-evaluation-item-header { -webkit-box-pack: left; -moz-box-pack: left; -ms-flex-pack: left; justify-content: left; }
	.m-evaluation-item-header > img { width: 32px; height: 32px; -moz-border-radius: 50%; border-radius: 50%; }
	.m-evaluation-item-header > span { margin-left: 8px; display: block; font-size: 12px; text-align: center; color: #595959; }
	.m-evaluation-list .swiper-slide p.content { max-height: 88px; margin-top: 11px; font-size: 14px; line-height: 22px; letter-spacing: -.1px; color: #262626; }
	.ellipsis-4 { display: -webkit-box; overflow: hidden; white-space: normal !important; text-overflow: ellipsis; word-wrap: break-word; -webkit-line-clamp: 4; -webkit-box-orient: vertical; }
	.m-evaluation-list .swiper-slide span.time { height: 18px; margin-top: 8px; display: block; font-family: arial; font-size: 11px; line-height: 18px; text-align: left; color: #ababab; position: absolute; left: 16px; bottom: 16px; }
	.m-evaluation-return { height: 30px; line-height: 30px; }
	.m-evaluation-return p { font-size: 13px; color: #595959; }
	.m-evaluation-return .jyb-btn { width: 83px; height: 30px; padding: 0; font-size: 13px; font-weight: normal; line-height: 28px; -moz-border-radius: 15px; border-radius: 15px; }
	@media screen and (max-width:320px) {
	    .m-evaluation-list .swiper-slide { width: 250px; }
	    .m-evaluation-return .jyb-btn { width: 64px; font-size: 12px; }
	}
	.m-evaluation-return .jyb-btn-blue { margin-left: 6px; }
	
	/*暂无评价数据*/
	.m-evaluation-none { margin-top: 29px; margin-bottom: 30px; text-align: center; }
	.m-evaluation-none img { width: 178px; height: 62px; display: inline-block; }
	.m-evaluation-none  p { width: 100%; height: 20px; font-size: 14px; line-height: 20px; letter-spacing: 0; color: #8c8c8c; }
	
</style>
