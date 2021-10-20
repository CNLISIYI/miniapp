<template>
	<view class="m-common-container m-new-category flex-box-column">
		<!-- 通用头部 -->
		<header class="m-common-header">
			<ul class="m-jyb-header m-jyb-header-fixed flex-box border-bottom-1px">
				<!-- <li class="m-header-back flex-box">
					<navigator hover-class="none" open-type="navigateBack" class="m-common-icon icon_left_no_bg"></navigator>
				</li> -->
				<navigator url="/packageA/search/index" hover-class="none" class="m-header-input flex-box flex-1 ml10 mr12">
					<span class="m-common-icon icon_search_linear"></span>
					<view class="m-header-input-txt ellipsis-1">请输入机构或课程名称</view>
				</navigator>
			</ul>
		</header>
		<main class="m-common-main flex-1 flex-box">
			<div class="new-category-inner new-category-left">
				<view
					:class="['_a', index == firstLevelIdx ? 'active' : '']"
					v-for="(item, index) in categoryGroup"
					:key="index"
					:data-idx="index"
					:data-code="item.code"
					@click="switchCategoryGroup"
				>
					{{ item.name }}
				</view>
			</div>
			<div class="new-category-inner new-category-right flex-1">
				<!-- 热门推荐 -->
				<div class="new-category-item" v-if="hotClassGroup.length > 0">
					<span class="new-category-item-title">热门推荐</span>
					<div class="new-category-item-con new-category-item--hot clearfloat">
						<div class="new-category-item-row fl flex-box" v-for="(items, index) in hotClassGroup" :key="index">
							<navigator
								hover-class="none"
								:url="'/pages/agencylist/index?class=' + item.url + '&city=' + cityEname"
								class="_a"
								v-for="(item, idx) in hotClassGroup"
								:key="idx"
								v-if="idx >= 3 * index && idx <= 3 * index + 2"
							>
								<img class="_img" :src="item.hotImg" alt="" />
								<span class="_span">{{ item.name }}</span>
							</navigator>
						</div>
					</div>
				</div>
				<!-- 其他分类 -->
				<div class="new-category-item" v-for="(items, index) in categoryGroup[firstLevelIdx].child" :key="index">
					<span class="new-category-item-title">{{ items.name }}</span>
					<div class="new-category-item-con clearfloat">
						<div class="new-category-item-row fl flex-box" v-for="(iitem, i) in items.child" :key="i">
							<!-- {{index}}-{{i}}-{{idx}} -->
							<navigator
								hover-class="none"
								:url="'/pages/agencylist/index?class=' + item.url + '&city=' + cityEname"
								class="_a"
								v-for="(item, idx) in items.child"
								:key="idx"
								v-if="idx >= 3 * i && idx <= 3 * i + 2"
							>
								{{ item.name }}
							</navigator>
						</div>
					</div>
				</div>
			</div>
		</main>
		
		<online-talk></online-talk>
	</view>
</template>

<script>
import dataArray from '../../common/data/data';
import { recordTrackingMixin } from '../../common/js/mixins.js';
export default {
	mixins: [recordTrackingMixin],
	data() {
		return {
			cityEname: '',
			cityName: '',
			firstLevelIdx: 0,
			secondLevelIdx: 0,
			categoryGroup: [],
			hotClassGroup: []
		};
	},
	onShow() {
		// 微信分享到朋友圈功能
		// #ifdef MP-WEIXIN
		wx.showShareMenu({
			withShareTicket:true,
			menus:['shareAppMessage','shareTimeline']
		})
		// #endif
	},
	onLoad(opts) {
		let _this = this;
		// console.log(opts);
		// if (opts && opts.pid) {
		if (opts && JSON.stringify(opts) != '{}') {
			_this.firstLevelIdx = opts.pid || 0;
			_this.cityEname = opts.city;
			dataArray.cityArr.map(item => {
				if (item.ename == _this.cityEname) {
					_this.cityName = item.name;
				}
			});
		}

		let code = 500008;
		_this.categoryGroup = dataArray.categoryGroup;
		if (_this.firstLevelIdx != 0) {
			code = _this.categoryGroup[_this.firstLevelIdx].code;
		}

		// 获取城市信息
		_this.location.getCurCityEname(_this, function(res) {
			_this.cityEname = _this.cityEname || res.data[0].cityename;
			_this.cityName = _this.cityName || res.data[0].cityname;

			// _this.getHotCourse(_this.firstLevelIdx, code);

			// #ifdef MP-BAIDU
			_this.setCurPageTitle();
			_this.setPageInfo();
			// #endif
		});

		setTimeout(function() {
			_this.getHotCourse(_this.firstLevelIdx, '');
		}, 500);
		
		let pages = getCurrentPages(); // 获取页面栈
		pages.map((item, index) => {
			if( item.route == 'pages/index/index') {
				item.$vm.localClass = [];
			}
		});
	},
	onShareAppMessage(res) {
		let _this = this;
		// console.log(res);
		return {
			title: `【${_this.cityName}教育宝】课程分类_深受用户喜爱的教育培训第三方平台`,
			path: `/packageA/category/index?pid=${_this.firstLevelIdx}`,
			imageUrl: 'https://static.jiaoyubao.cn/images/uniapp/share-logo.jpg',
			content: ``
		};
	},
	created() {
		let _this = this;
	},
	methods: {
		// 设置当前页title
		setCurPageTitle() {
			let _this = this;
			let titleStr = `【${_this.cityName}教育宝】课程分类`;
			// #ifdef MP-BAIDU
			titleStr = `【${_this.cityName}教育宝】课程分类_深受用户喜爱的教育培训第三方平台`;
			// #endif
			uni.setNavigationBarTitle({
				title: titleStr
			});
		},
		// 设置页面基础信息
		setPageInfo() {
			let _this = this;

			swan.setPageInfo({
				title: `【${_this.cityName}教育宝】课程分类_深受用户喜爱的教育培训第三方平台`,
				keywords: `行业列表`,
				description: ``,
				image: ['https://static.jiaoyubao.cn/images/uniapp/banner.jpg'],
				success: function() {
					// console.log('setPageInfo success');
				},
				fail: function(err) {
					// console.log('setPageInfo fail', err);
				}
			});
		},
		// 切换一级菜单
		switchCategoryGroup(e) {
			let _this = this;
			let idx = e.currentTarget.dataset.idx;
			let code = e.currentTarget.dataset.code;
			// // console.log(idx, code);
			_this.firstLevelIdx = idx;

			// 获取热门课程
			_this.hotClassGroup = [];
			// _this.getHotCourse(code);
			_this.getHotCourse(idx, code);
		},
		// 热门课程改为固定 20190807
		getHotCourse(idx, code) {
			let _this = this;
			let clickPar = dataArray.subclassArr.filter(item => item.idx == idx);
			// _this.hotClassGroup = clickPar[0].subclass.slice(0, 6);
			let newArr = clickPar[0].subclass.slice(0, 6);
			// console.log(newArr);
			for (let i = 0, len = newArr.length; i < len; i++) {
				_this.hotClassGroup.push(newArr[i]);
			}
		},

		// // 获取热门课程 GetHotCourse
		// getHotCourse(code) {
		// 	let _this = this;
		// 	// {
		// 	// 	cityename: 'bj', // TODO 取当前城市的 ename
		// 	// 	groupclassid: 510001 // 固定参数
		// 	// }
		// 	let ajaxUrl = _this.$api.GetHotCourse.url + "&key={cityename:" + _this.cityEname + ",groupclassid:510001}";
		// 	_this.$ajax2(_this.$api.GetHotCourse, ajaxUrl, '获取热门课程', function(res) {
		// 		// res.data.data;
		// 		if (res.data && res.data.data && res.data.data.length > 0) {
		// 			_this.handlerHotClassData(res.data.data, code);
		// 		}
		// 	}, true)
		// },
		// handlerHotClassData(arr, code) {
		// 	let _this = this;
		// 	let newArr = arr.filter((item) => item.isshow2 && item.level == 3 && item.code.startsWith(code)).slice(0, 6);
		// 	// console.log(newArr);
		// 	_this.hotClassGroup = newArr;
		// },

		// 该方法 - 已废弃
		getCurGroupNum(totalnum) {
			let _this = this;
			let num = totalnum > 3 ? Math.ceil(totalnum / 3) : 1;
			return num;
		}
	},
	computed: {}
};
</script>

<style lang="scss">
// 每个页面公共css
@import './index.scss';

uni-page-wrapper {
	height: 100vh !important;
}
</style>
