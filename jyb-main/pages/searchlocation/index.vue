<template>
	<view class="m-common-container m-search-location flex-box-column">
		<!-- 通用头部 -->
		<header class="m-common-header">
			<ul class="m-jyb-header m-jyb-header-fixed flex-box m-header-search_btn border-bottom-1px">
				<li class="m-header-input flex-box flex-1 p5-10">
					<a hover-class="none" url="/pages/locationcitys1/index" class="_a flex-box">
						<span class="m-location-city m-header-location-name ellipsis-1">
							{{ cityName }}
							<i class="m-common-icon icon_bottom_no_bg"></i>
						</span>
					</a>
					<input
						class="m_header_input flex-1"
						style="width:100px"
						autofocus
						type="search"
						placeholder="小区/写字楼/商圈等"
						focus="true"
						name=""
						onsearch=""
						@input="searchInput"
						v-model="searchText"
					/>
					<a class="icon_cross_block" href="javascript:;" v-show="isSearchListshow" @click="clearInput" hover-class="none"></a>
				</li>
				<li class="m-search-btns flex-box"><a class="m-search-btn-cancel" title="" @click="naviBack" hover-class="none">取消</a></li>
			</ul>
		</header>
		<main class="m-common-main flex-1">
			<!-- 历史搜索 -->
			<div class="m-search-history">
				<h3 class="m-search-box-title">
					历史搜索
					<a class="m-search-history-del m-common-icon icon_del_linear fr" @click="deletHistory" hover-class="none"></a>
				</h3>
				<ul class="clearfloat">
					<li v-for="item in searchRecord" :key="index">
						<a hover-class="none" @click="clickHistory">{{ item }}</a>
					</li>
				</ul>
			</div>
			<!-- 有内容输入的情况 -->
			<ul class="m-search-result-list" v-show="isSearchListshow">
				<li class="flex-box" v-for="(item, index) in searchResuArr" :key="index" @click="SearchSubmit" :id="index">
					<a hover-class="none" :class="item == searchText ? 'keyon flex-1 ellipsis-1' : 'flex-1 ellipsis-1'">{{ item }}</a>
				</li>
			</ul>
		</main>
		
		<online-talk></online-talk>
	</view>
</template>

<script>
import { recordTrackingMixin } from '../../common/js/mixins.js';
export default {
	mixins: [recordTrackingMixin],
	data() {
		return {
			webUrl: '', // https://m.jiaoyubao.cn/searchlocation/?city=jn
			webviewStyles: {
				progress: {
					color: '#1a8cff'
				}
			},
			cityEname: '',
			cityName: '', // 城市中文
			shareTitle: '',
			shareContent: ',',
			isSearchListshow: false,
			searchText: '',
			searchRecord: [],
			searchResult: [],
			searchResuArr: []
		};
	},
	onLoad(opts) {
		// /pages/searchlocation/index?city='+cityEname
		let _this = this;
		// console.log(opts);
		if (opts && JSON.stringify(opts) != '{}') {
			_this.webUrl = opts.webUrl || 'https://m.jiaoyubao.cn/searchlocation/?city=' + opts.city;
		}
		_this.searchRecord = uni.getStorageSync('searchLocation') || [];
		_this.cityName = opts.city;
		_this.cityEname = opts.cityename;
	},
	onShareAppMessage(res) {
		let _this = this;
		// console.log(res);
		return {
			title: _this.shareTitle,
			path: `/pages/searchlocation/index?webUrl=${res.webViewUrl}`,
			imageUrl: 'https://static.jiaoyubao.cn/images/uniapp/share-logo.jpg',
			content: _this.shareContent
		};
	},

	created() {},
	methods: {
		getWebviewMsg(e) {
			let _this = this;
			// console.log(e.detail.data[0].title);
			// console.log(e.detail.data[0].content);
			_this.shareTitle = e.detail.data[0].title;
			_this.shareContent = e.detail.data[0].content;
		},
		deletHistory() {
			let _this = this;
			if (_this.searchRecord.length == 0) {
				_this.tools.toastShow('还没有搜索历史！');
			} else {
				uni.showModal({
					title: '提示',
					content: '确认删除全部历史记录？',
					success: function(sm) {
						if (sm.confirm) {
							// console.log('确认删除');
							uni.clearStorageSync('searhRecord');
							_this.searchRecord = [];
						} else if (sm.cancel) {
							// console.log('取消删除');
						}
					}
				});
			}
		},
		searchInput(event) {
			let _this = this;
			uni.request({
				method: 'GET',
				url: 'https://m.jiaoyubao.cn/NationHandler.ashx',
				data: {
					action: 'getBuilding',
					word: encodeURIComponent(event.detail.value),
					cityname: encodeURIComponent(_this.cityName)
				},
				success: function(result) {
					_this.searchResult = result.data.data;
					_this.isSearchListshow = true;
					if (_this.searchText == '') {
						_this.searchResuArr.length = 0;
						_this.isSearchListshow = false;
					} else {
						_this.searchResuArr.length = 0;
						for (let i = 0; i < 10; i++) {
							_this.searchResuArr.push(_this.searchResult[i].name);
							// console.log(_this.searchResuArr[i]);
						}
					}
				}
			});
		},
		clearInput() {
			this.searchText = '';
			this.isSearchListshow = false;
		},
		clickHistory() {
			let _this = this;
			_this.tools.loadingShow('切换中');
			setTimeout(function() {
				_this.tools.loadingHide();
			}, 1500);
			uni.redirectTo({
				url: '/pages/index/index?city=' + _this.cityEname
			});
		},
		naviBack() {
			uni.navigateBack({
				delta: 1
			});
		},
		SearchSubmit(e) {
			let _this = this;
			// console.log(e);
			if (_this.searchRecord.indexOf(_this.searchResuArr[e.currentTarget.id]) == -1) {
				if (_this.searchRecord.length < 20) {
					_this.searchRecord.unshift(_this.searchResuArr[e.currentTarget.id]);
				} else {
					_this.searchRecord.pop();
					_this.searchRecord.unshift(_this.searchResuArr[e.currentTarget.id]);
				}
			}
			uni.setStorageSync('searchLocation', _this.searchRecord);
			_this.tools.loadingShow('切换中');
			setTimeout(function() {
				_this.tools.loadingHide();
			}, 1500);
			uni.redirectTo({
				url: '/pages/index/index?city=' + _this.cityEname
			});
		}
	}
};
</script>

<style lang="scss">
@import './index.scss';
</style>
