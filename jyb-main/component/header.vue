<!-- 机构相关页面头部-含(index icon、title、search icon、dropdown menu) -->
<template>
	<view class="m-jyb-header-fixed-outer">
		<!-- header -->
		<ul class="m-jyb-header m-jyb-header-fixed flex-box border-bottom-1px">
			<!-- <li class="m-header-back flex-box mr10">
				<navigator hover-class="none" open-type="navigateBack" class="_a m-common-icon icon_left_no_bg"></navigator>
			</li> -->
			<li class="m-header-index flex-box mr20 mr58">
				<navigator hover-class="none" open-type="reLaunch" :url="'/pages/agencyindex/index?agency=' + detailobj.ename" class="_a m-common-icon menu_index_linear"></navigator>
			</li>
			<li class="m-header-title flex-box flex-1 ellipsis-1 mr20">
				<navigator hover-class="none" open-type="reLaunch" :url="'/pages/agencyindex/index?agency=' + detailobj.ename" class="_a ellipsis-1">{{ detailobj.name }}</navigator>
			</li>
			<li class="m-header-search flex-box mr10">
				<navigator hover-class="none" url="/packageA/search/index" class="_a m-common-icon icon_search_linear"></navigator>
			</li>
			<li class="m-header-menu flex-box">
				<text class="_a m-common-icon menu_linear" @click="toggleDropdown"></text>
			</li>
		</ul>
		<!-- header-dropdown-list -->
		<view class="m-nav-dropdown-mask" v-show="dropdownListShow" @click="toggleDropdown"></view>
		<ul class="m-nav-dropdown-list" v-show="dropdownListShow">
			<li class="_li">
				<navigator hover-class="none" open-type="reLaunch" :url="'/pages/agencyindex/index?agency=' + detailobj.ename" class="_a">
					<img class="_img" src="https://static.jiaoyubao.cn/images/common/menu-index.svg" alt=""><span class="_span">首页</span>
				</navigator>
			</li>
			<li class="_li" v-if="navtabitemshow.classShow">
				<navigator hover-class="none" open-type="redirect" :url="'/pages/class/index?agency=' + detailobj.ename" class="_a">
					<img class="_img" src="https://static.jiaoyubao.cn/images/common/menu-class.svg" alt=""><span class="_span">课程</span>
				</navigator>
			</li>
			<li class="_li" v-if="navtabitemshow.teacherShow">
				<navigator hover-class="none" open-type="redirect" :url="'/pages/teacher/index?agency=' + detailobj.ename" class="_a">
					<img class="_img" src="https://static.jiaoyubao.cn/images/common/menu-teacher.svg" alt=""><span class="_span">教师</span>
				</navigator>
			</li>
			<li class="_li" v-if="navtabitemshow.evalShow">
				<navigator hover-class="none" open-type="redirect" :url="'/packageA/evaluation/index?agency=' + detailobj.ename" class="_a">
					<img class="_img" src="https://static.jiaoyubao.cn/images/common/menu-evaluation.svg" alt=""><span class="_span">评价</span>
				</navigator>
			</li>
			<li class="_li" v-if="navtabitemshow.photoShow">
				<navigator hover-class="none" open-type="redirect" :url="'/pages/photo/index?agency=' + detailobj.ename" class="_a">
					<img class="_img" src="https://static.jiaoyubao.cn/images/common/menu-photo.svg" alt=""><span class="_span">相册</span>
				</navigator>
			</li>
			<li class="_li" v-if="navtabitemshow.schoolShow">
				<navigator hover-class="none" open-type="redirect" :url="'/pages/school/index?agency=' + detailobj.ename" class="_a">
					<img class="_img" src="https://static.jiaoyubao.cn/images/common/menu-school.svg" alt=""><span class="_span">校区</span>
				</navigator>
			</li>
			<li class="_li" v-if="navtabitemshow.newsShow">
				<navigator hover-class="none" open-type="redirect" :url="'/packageA/news/index?agency=' + detailobj.ename" class="_a">
					<img class="_img" src="https://static.jiaoyubao.cn/images/common/menu-news.svg" alt=""><span class="_span">资讯</span>
				</navigator>
			</li>
			<li class="_li" v-if="navtabitemshow.dataShow">
				<navigator hover-class="none" open-type="redirect" :url="'/packageA/datas/index?agency=' + detailobj.ename" class="_a">
					<img class="_img" src="https://static.jiaoyubao.cn/images/common/menu-data.svg" alt=""><span class="_span">资料</span>
				</navigator>
			</li>
			<li class="_li">
				<navigator hover-class="none" open-type="redirect" :url="'/packageA/intro/index?agency=' + detailobj.ename" class="_a">
					<img class="_img" src="https://static.jiaoyubao.cn/images/common/menu-intro.svg" alt=""><span class="_span">简介</span>
				</navigator>
			</li>
		</ul>
	</view>
</template>

<script>
	export default {
		name: "header",
		//属性
		props: {
			navtabitemshow: {
				type: Object,
				value: {}
			},
			title: {
				type: String, //属性类型
				value: ""
			},
			detailobj: {
				type: Object,
				value: {}
			}
		},
		data() {
			return {
				dropdownListShow: false,
			}
		},
		//组件生命周期
		created: function(e) {

		},
		methods: {
			toggleDropdown(){
				let _this = this;
				_this.dropdownListShow = !_this.dropdownListShow;
			}
		}
	}
</script>

<style lang="scss">
	.m-jyb-header-fixed-outer{ @include pt(44px); }
	.m-jyb-header-fixed{ z-index: 999; }
	.mr58{ @include mr(58px); }
	.m-nav-dropdown-list { width: 110px; height: auto; position: fixed; z-index: 999; top: 44px; right: 0; background: #fff;    /*box-shadow: 0px 1px 1px #d9d9da;*/ }
	.m-nav-dropdown-list ._li ._a { width: 100%; height: 50px; padding-left: 20px; display: -webkit-box; display: -moz-box; display: -ms-flexbox; display: flex; -webkit-box-pack: center; -moz-box-pack: center; -ms-flex-pack: center; justify-content: center; -webkit-box-align: center; -moz-box-align: center; -ms-flex-align: center; align-items: center; }
	.m-nav-dropdown-list ._li ._a ._img { width: 22px; height: 22px; }
	.m-nav-dropdown-list ._li ._a ._span { height: 50px; margin-left: 11px; display: inline-block; font-size: 14px; line-height: 50px; color: #262626; -webkit-box-flex: 1; -moz-box-flex: 1; -ms-flex: 1; flex: 1; }
	.m-nav-dropdown-list ._li + ._li ._a ._span { border-top: .5px solid #eee; }
	.m-nav-dropdown-mask { width: 100%; height: 100%; position: fixed;left: 0; top: 0; z-index: 998; opacity: .6; background: #000; cursor: pointer;}

</style>
