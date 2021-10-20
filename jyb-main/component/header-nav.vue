<!-- 机构相关子页面-头部导航 -->
<!-- 吸顶 -->
<template>
	<view class="header-nav-fixed-outer">
		<scroll-view
			scroll-x="true"
			class="swiper-container com-swiper-container-outer m-swiper-nav m-class-list-swiper header-nav-fixed bgfff "
			style="height: 46px"
		>
			<div class="swiper-wrapper _div com-swiper-container-nav flex-box">
				<navigator hover-class="none" open-type="redirect" :url="`/pages/agencyindex/index?agency=${agencyename}`" class="_a swiper-slide">
					<span class="_span">
						首页
						<i class="_i"></i>
					</span>
				</navigator>
				<block v-for="(item, index) in navArr" :key="index">
					<block
						v-if="
							(navtabitemshow.classShow && item.url == 'class') ||
								(navtabitemshow.teacherShow && item.url == 'teacher') ||
								(navtabitemshow.evalShow && item.url == 'evaluation') ||
								(navtabitemshow.photoShow && item.url == 'photo') ||
								(navtabitemshow.schoolShow && item.url == 'school') ||
								(navtabitemshow.dataShow && item.url == 'datas') ||
								(navtabitemshow.newsShow && item.url == 'news')
						"
					>
						<navigator
							@click="clickTab"
							hover-class="none"
							open-type="redirect"
							:url="`${item.pageurl}/index?agency=${agencyename}`"
							:class="['_a', 'swiper-slide', rendertype == item.url ? 'active' : '']"
						>
							<span class="_span">
								{{ item.name }}
								<i class="_i"></i>
							</span>
						</navigator>
					</block>
					<block v-if="navtabitemshow.feeShow && item.url == 'fee'">
						<navigator
							hover-class="none"
							open-type="navigate"
							:url="`${item.pageurl}/index?agency=${agencyename}`"
							:class="['_a', 'swiper-slide', rendertype == item.url ? 'active' : '']"
						>
							<span class="_span">
								{{ item.name }}
								<i class="_i"></i>
							</span>
						</navigator>
					</block>
				</block>
				<navigator
					hover-class="none"
					open-type="redirect"
					:url="`/packageA/intro/index?agency=${agencyename}`"
					:class="['_a', 'swiper-slide', rendertype == 'intro' ? 'active' : '']"
				>
					<span class="_span">
						关于我们
						<i class="_i"></i>
					</span>
				</navigator>
				<!-- <navigator hover-class="none" open-type="reLaunch" url="/pages/agencyindex/index?city=jn&agency=jncgys" :class="['_a', 'swiper-slide', rendertype == 'class' ? 'active' : '']"><span class="_span">课程</span></navigator>
				<navigator hover-class="none" open-type="reLaunch" url="/pages/agencyindex/index?city=jn&agency=jncgys" :class="['_a', 'swiper-slide', rendertype == 'teacher' ? 'active' : '']"><span class="_span">教师</span></navigator>
				<navigator hover-class="none" open-type="reLaunch" url="/pages/agencyindex/index?city=jn&agency=jncgys" :class="['_a', 'swiper-slide', rendertype == 'eval' ? 'active' : '']"><span class="_span">评价</span></navigator>
				<navigator hover-class="none" open-type="reLaunch" url="/pages/agencyindex/index?city=jn&agency=jncgys" :class="['_a', 'swiper-slide', rendertype == 'photo' ? 'active' : '']"><span class="_span">相册</span></navigator>
				<navigator hover-class="none" open-type="reLaunch" url="/pages/agencyindex/index?city=jn&agency=jncgys" :class="['_a', 'swiper-slide', rendertype == 'school' ? 'active' : '']"><span class="_span">校区</span></navigator> -->
			</div>
		</scroll-view>
	</view>
</template>

<script>
export default {
	name: 'header-nav',
	//属性
	props: {
		navtabitemshow: {
			type: Object,
			value: {}
		},
		rendertype: {
			type: String, //属性类型
			value: ''
		},
		cityename: {
			type: String, //属性类型
			value: ''
		},
		agencyename: {
			type: String, //属性类型
			value: ''
		},
	
	},
	data() {
		return {
			// 主页、课程、教师、真实评价、真实学费、校区、知识资料、资讯、关于我们
			navArr: [
				// { url: 'agencyindex', name: '首页' },
				{ url: 'class', pageurl: '/pages/class', name: '课程' },
				{ url: 'teacher', pageurl: '/pages/teacher', name: '教师' },
				{ url: 'evaluation', pageurl: '/packageA/evaluation', name: '真实评价' },
				{ url: 'fee', pageurl: '/packageA/fee', name: '真实学费' },
				{ url: 'photo', pageurl: '/pages/photo', name: '相册' },
				{ url: 'school', pageurl: '/pages/school', name: '校区' },
				{ url: 'datas', pageurl: '/packageA/datas', name: '知识资料' },
				{ url: 'news', pageurl: '/packageA/news', name: '资讯' }
				// { url: 'intro', name: '关于我们' },
			],
		};
	},
	//组件生命周期
	created: function(e) {
	},
	methods: {
		clickTab(e) {
			// console.log(e);
		},
	}
};
</script>

<style lang="scss">
.header-nav-fixed-outer {
	@include pt(45px);
}
.header-nav-fixed {
	width: 100vw;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 999;
}
.m-class-list-swiper {
	border-bottom: 0.5px solid #eee;
}
.m-class-list-swiper ._a.active {
	font-size: 14px;
	font-weight: 600;
	color: #1a8cff;
}
.m-class-list-swiper ._a {
	width: auto !important;
	height: 45px; /*padding: 0 16px;*/
	font-size: 15px;
	line-height: 45px;
	color: #595959;
}
.m-class-list-swiper .m-swiper-line {
	width: 30px;
	height: 3px;
	position: absolute;
	bottom: 0;
	bottom: 0;
	left: 16px;
	-moz-border-radius: 2px;
	border-radius: 2px;
	background: #1a8cff;
}
// /*.m-nav-fixed-outer{padding-top: 46px;}*/
// /*.m-nav-fixed-outer .m-swiper-nav { width: 100%; position: fixed; z-index: 997; top: 44px; left: 0; }*/
.m-swiper-nav .swiper-wrapper {
	position: relative;
	height: 45px;
}
.m-swiper-nav .swiper-wrapper.flex-box > a {
	padding: 0 20px;
	// -webkit-box-flex: 1;
	// -moz-box-flex: 1;
	// -ms-flex: 1;
	// flex: 1;
	text-align: center;
}
// .m-swiper-nav .swiper-wrapper.flex-box > a span{ height: 45px; display: inline-block; border-bottom: 3px solid #fff;}
.m-swiper-nav .swiper-wrapper.flex-box > a span {
	height: 45px;
	display: inline-block;
	position: relative;
	._i {
		width: 100%;
		height: 3px;
		position: absolute;
		bottom: 0;
		left: 0;
		border-radius: 1.5px;
		background-color: #fff;
	}
}
// .m-swiper-nav .swiper-wrapper.flex-box > a.active span{border-color: #1a8cff;}
.m-swiper-nav .swiper-wrapper.flex-box > a.active ._i {
	background-color: #1a8cff;
}
.m-swiper-nav .m-swiper-line {
	display: none !important;
}
.m-swiper-nav .m-swiper-line {
	display: none;
}
.m-swiper-tab.swiper-container {
	background: #fff;
}
.m-swiper-tab.swiper-container .swiper-wrapper {
	margin-top: 20px;
	margin-bottom: 20px;
}
.m-swiper-tab.swiper-container .swiper-slide:first-child {
	margin-left: 15px;
}
.m-swiper-tab-fixed {
	padding-top: 60px;
}
.m-swiper-tab-fixed .m-swiper-tab.swiper-container {
	width: 100%;
	height: 49px;
	position: fixed;
	z-index: 997;
	top: 44px;
	left: 0;
}
.m-swiper-tab-fixed .m-swiper-tab.swiper-container .swiper-wrapper {
	margin-top: 0;
	margin-bottom: 0;
	padding-top: 10px;
	padding-bottom: 9px;
}
.com-swiper-container-outer {
	overflow: hidden;
}
.com-swiper-container-nav {
	white-space: nowrap;
	justify-content: flex-start; 
	align-items: flex-start;
}
.m-class-list-swiper ._a {
	float: left;
	padding: 0 20px;
}
</style>
