<template>
	<view class="m-common-container m-search-industry flex-box-column">
		<!-- 通用头部 -->
		<header class="m-common-header">
			<ul class="m-jyb-header m-jyb-header-fixed flex-box m-header-search_btn border-bottom-1px">
				<li class="m-header-input flex-box flex-1 pr8l14">
					<input
						class="m_header_input flex-1"
						style="width:100px"
						focus
						type="search"
						placeholder="请输入课程或机构名称"
						focus="true"
						name=""
						onsearch=""
						@input="searchInput"
						v-model="searchText"
					/>
					<a class="icon_cross_block" v-show="isSearchListshow" @click="clearInput" hover-class="none"></a>
				</li>
				<li class="m-search-btns flex-box">
					<a
						class="m-search-btn-query"
						v-show="isSearchListshow"
						hover-class="none"
						@click="SearchSubmit"
						:url="'/pages/agencylist/index?city=' + cityename + '&word=' + searchText"
					>
						搜索
					</a>
					<a class="m-search-btn-cancel" v-show="!isSearchListshow" @click="naviBack" hover-class="none">取消</a>
				</li>
			</ul>
		</header>
		<main class="m-common-main flex-1">
			<!-- 热门搜索 -->
			<div class="m-search-hot">
				<h3 class="m-search-box-title">热门搜索</h3>
				<ul class="clearfloat">
					<li><a @click="hotSearch" id="中小学辅导" hover-class="none" :url="'/pages/agencylist/index?city=' + cityename + '&word=中小学辅导'">中小学辅导</a></li>
					<li><a @click="hotSearch" id="少儿英语" hover-class="none" :url="'/pages/agencylist/index?city=' + cityename + '&word=少儿英语'">少儿英语</a></li>
					<li><a @click="hotSearch" id="雅思" hover-class="none" :url="'/pages/agencylist/index?city=' + cityename + '&word=雅思'">雅思</a></li>
					<li><a @click="hotSearch" id="托福" hover-class="none" :url="'/pages/agencylist/index?city=' + cityename + '&word=托福'">托福</a></li>
					<li><a @click="hotSearch" id="早教" hover-class="none" :url="'/pages/agencylist/index?city=' + cityename + '&word=早教'">早教</a></li>
					<li><a @click="hotSearch" id="会计证" hover-class="none" :url="'/pages/agencylist/index?city=' + cityename + '&word=会计证'">会计证</a></li>
					<li><a @click="hotSearch" id="建造师" hover-class="none" :url="'/pages/agencylist/index?city=' + cityename + '&word=建造师'">建造师</a></li>
					<li><a @click="hotSearch" id="化妆" hover-class="none" :url="'/pages/agencylist/index?city=' + cityename + '&word=化妆'">化妆</a></li>
					<li><a @click="hotSearch" id="韩语" hover-class="none" :url="'/pages/agencylist/index?city=' + cityename + '&word=韩语'">韩语</a></li>
					<li><a @click="hotSearch" id="日语" hover-class="none" :url="'/pages/agencylist/index?city=' + cityename + '&word=日语'">日语</a></li>
				</ul>
			</div>
			<!-- 历史搜索 -->
			<div class="m-search-history">
				<h3 class="m-search-box-title">
					历史搜索
					<a class="m-search-history-del m-common-icon icon_del_linear fr" @click="deletHistory" hover-class="none"></a>
				</h3>
				<ul class="clearfloat">
					<li v-for="item in searchRecord" :key="index">
						<a hover-class="none" :url="'/pages/agencylist/index?city=' + cityename + '&word=' + item">{{ item }}</a>
					</li>
				</ul>
			</div>
			<!-- 有内容输入的情况 -->
			<ul class="m-search-result-list" v-show="isSearchListshow">
				<li class="flex-box" v-for="(item, index) in searchResult" @click="ListSubmit" :id="index" :key="index">
					<a class="keyon" hover-class="none" >{{ searchText }}</a>
					<a class="flex-1 ellipsis-1" hover-class="none">{{ item }}</a>
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
			webUrl: '', // https://m.jiaoyubao.cn/search/?city=jn
			webviewStyles: {
				progress: {
					color: '#1a8cff'
				}
			},
			cityname: '',
			cityename: '',
			shareTitle: '',
			shareContent: ',',
			isSearchListshow: false,
			searchText: '',
			searchRecord: [],
			searchResult: [],
		};
	},
	onLoad(opts) {
		// /packageA/search/index?city='+cityEname
		let _this = this;
		// console.log(opts);
		if (opts && JSON.stringify(opts) != '{}') {
			_this.webUrl = opts.webUrl || 'https://m.jiaoyubao.cn/search/?city=' + opts.city;
	 		_this.searchText = opts.word || '';
			if(_this.searchText !== '') {
				_this.getResultList();
			}
		} 
		_this.cityename = opts.city;
		_this.cityname = opts.cityname || '';
		let pages = getCurrentPages(); // 获取页面栈
		pages.map((item, index) => {
			if( item.route == 'pages/index/index') {
				item.$vm.localClass = [];
			}
		});
		_this.searchRecord = uni.getStorageSync('searchRecord') || [];
	},
	onShow() {
		let _this = this;
		if(_this.searchText !== '') {
			_this.getResultList();
		}
	},
	onShareAppMessage(res) {
		let _this = this;
		// console.log(res);
		return {
			title: _this.shareTitle,
			path: `/packageA/search/index?webUrl=${res.webViewUrl}`,
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
			_this.getResultList();
			if (event.detail.value == '') {
				_this.isSearchListshow = false;
				_this.searchResult.length = 0;
			}
		},
		getResultList() {
			let _this =this;
			uni.request({
				method: 'GET',
				url: 'https://m.jiaoyubao.cn/NationHandler.ashx?action=getRelateWords&word=' + _this.searchText + '&cityename=' + _this.cityename,
				data: {},
				success: function(result) {
					_this.searchResult = result.data.data;
					for (let i = 0; i < result.data.data.length; i++) {
						_this.searchResult[i] = _this.searchResult[i].split(_this.searchText)[1];
					}
					_this.isSearchListshow = true;
				}
			});
		},
		clearInput() {
			this.searchText = '';
			this.isSearchListshow = false;
		},
		naviBack() {
			uni.navigateBack({
				delta: 1
			});
		},
		hotSearch(e) {
			let _this = this;
			if (_this.searchRecord.indexOf(e.currentTarget.id) == -1) {
				if (_this.searchRecord.length < 20) {
					_this.searchRecord.unshift(e.currentTarget.id);
				} else {
					_this.searchRecord.pop();
					_this.searchRecord.unshift(e.currentTarget.id);
				}
			}
			uni.setStorageSync('searchRecord', _this.searchRecord);
		},
		SearchSubmit() {
			let _this = this;
			if (_this.searchText == '') {
				_this.tools.toastShow('请输入搜索内容');
			} else {
				if (_this.searchRecord.indexOf(_this.searchText) == -1) {
					if (_this.searchRecord.length < 20) {
						_this.searchRecord.unshift(_this.searchText);
					} else {
						_this.searchRecord.pop();
						_this.searchRecord.unshift(_this.searchText);
					}
				}
			}
			uni.setStorageSync('searchRecord', _this.searchRecord);
		},
		ListSubmit(e) {
			let _this = this;
			if (_this.searchRecord.indexOf(_this.searchText + _this.searchResult[e.currentTarget.id]) == -1) {
				if (_this.searchRecord.length < 20) {
					_this.searchRecord.unshift(_this.searchText + _this.searchResult[e.currentTarget.id]);
				} else {
					_this.searchRecord.pop();
					_this.searchRecord.unshift(_this.searchText + _this.searchResult[e.currentTarget.id]);
				}
			}
			uni.navigateTo({
			    url: '/pages/agencylist/index?city=' + _this.cityename + '&word=' + (_this.searchText + _this.searchResult[e.currentTarget.id]).toString()
			});
			uni.setStorageSync('searchRecord', _this.searchRecord);
		}
	}
};
</script>

<style lang="scss">
@import './index.scss';
</style>
