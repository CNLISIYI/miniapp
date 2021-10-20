<template>
	<scroll-view class="mainbody" scroll-y="true" style="height: 100%;" @scroll="pageScroll" :scroll-top="winscrollTop" enable-back-to-top="true">
		<div class="city-top" v-show="!isCitySearchshow">
			<div class="city-top-nav"></div>
			<a href="javascript:;" class="city-search-box" hover-class="none">
				<div class="city-top-search clearfix" @click="searchCity">
					<div class="search-blank"></div>
					<div class="search-icon"></div>
					<div class="search-input">输入城市名或拼音查询</div>
				</div>
			</a>
		</div>
		<div class="city-cont-list" v-show="!isCitySearchshow">
			<div class="city-position clearfix">
				<div class="fl city-position-name">
					当前：
					<span class="city-pname" v-show="isGPSshow">
						<navigator open-type="reLaunch" class="a" :url="clickThisCity" hover-class="none">{{ cityname }}</navigator>
					</span>
					<span class="city-pfail" v-show="!isGPSshow">定位失败</span>
				</div>
				<span class="fr city-gps" @click="getQueryParam">
					GPS定位
					<i class="icon-map-block"></i>
				</span>
			</div>
			<div class="city-history">
				<h5 class="city-list-title mt10">历史城市</h5>
				<ul class="city-his-box clearfix">
					<block v-if="searchRecord.length>0">
						<li v-for="(item, index) in searchRecord" @click="historyCitySubmit" :id="index" :key="index">
							<a hover-class="none">{{ item }}</a>
						</li>
					</block>
					<li v-else>
						<a hover-class="none">暂无</a>
					</li>
					
				</ul>
			</div>
			<div class="city-hot">
				<h5 class="city-list-title">热门城市</h5>
				<ul class="city-his-box clearfix">
					<li v-for="(item, index) in hotCitys" @click="hotCitySubmit" :id="index" :key="index">
						<a hover-class="none">{{ item.name }}</a>
					</li>
				</ul>
			</div>

			<div class="city-list">
				<h5 class="city-list-title">全部城市</h5>
				<dl class="city-list-all cityBar" v-for="(item, index) in flist" :id="index" :key="index">
					<dt>{{ sortList[index] }}</dt>
					<dd v-for="(fitem, findex) in flist[index]" :key="findex" @click="allCitySubmit" :id="[index, findex]">
						<a hover-class="none">{{ fitem }}</a>
					</dd>
				</dl>
			</div>
		</div>
		<div class="letter-scroll" v-show="isLetterScroshow">{{ letterWords }}</div>
		<!--右侧字母定位-->
		<div class="letter-fix stausBig" v-show="isFixshow">
			<ul class="wrap">
				<li v-for="(item, index) in sortList" :key="index" @click="jumpTag" :id="index" :class="Enum == index ? 'keyon' : ''">{{ item }}</li>
			</ul>
		</div>

		<!--弹层-->
		<div class="city-search-popbox" v-show="isCitySearchshow">
			<header class="m-common-header">
				<ul class="m-jyb-header m-jyb-header-fixed flex-box m-header-search_btn border-bottom-1px">
					<li class="m-header-input flex-box flex-1 pr8l14">
						<input
							type="search"
							placeholder="输入城市名或拼音查询"
							style="width:100px"
							:focus="searchFocus"
							name=""
							onsearch=""
							class="m_header_input flex-1 search-input"
							v-model="inputName"
							@input="inputCityName"
						/>
						<a class="icon_cross_block" v-show="isCityResultshow" @click="clearInput" hover-class="none"></a>
					</li>
					<li class="m-search-btns flex-box"><a class="m-search-btn-cancel" @click="naviBack" hover-class="none">取消</a></li>
				</ul>
			</header>
			<div class="city-search-result">
				<ul class="csearch-about-city" v-show="isCityResultshow">
					<li v-for="(item, index) in searchResult" :key="index" @click="citySubmit" :id="index">
						<a hover-class="none" :class="iskeyon ? 'keyon' : ''">{{ item }}</a>
					</li>
					<li v-show="isNoneshow"><a hover-class="none">未找到该搜索城市</a></li>
				</ul>
			</div>
		</div>

		<online-talk></online-talk>
	</scroll-view>
</template>

<script>
import { recordTrackingMixin } from '../../common/js/mixins.js';
export default {
	mixins: [recordTrackingMixin],
	data() {
		return {
			webUrl: '', // https://m.jiaoyubao.cn/location/?city=jn
			webviewStyles: {
				progress: {
					color: '#1a8cff'
				}
			},
			shareTitle: '',
			shareContent: ',',
			lat: '',
			lng: '',
			cityename: '',
			cityname: '', // 城市中文
			isGPSshow: true,
			isNoneshow: false,
			isFixshow: true,
			isLetterScroshow: false,
			isCitySearchshow: false,
			isCityResultshow: false,
			inputName: '',
			// searchBar: 'city-top-title',
			list: [],
			elist: [],
			plist: [],
			flist: [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
			sortList: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'],
			listTop: [],
			listTopArr: [],
			letterWords: 'A',
			winscrollTop: 0,
			hotCitys: [
				{
					name: '北京',
					ahref: 'bj'
				},
				{
					name: '上海',
					ahref: 'sh'
				},
				{
					name: '广州',
					ahref: 'gz'
				},
				{
					name: '深圳',
					ahref: 'sz'
				},
				{
					name: '天津',
					ahref: 'tj'
				},
				{
					name: '重庆',
					ahref: 'cq'
				},
				{
					name: '济南',
					ahref: 'jn'
				},
				{
					name: '杭州',
					ahref: 'hz'
				},
				{
					name: '青岛',
					ahref: 'qd'
				},
				{
					name: '郑州',
					ahref: 'zz'
				},
				{
					name: '石家庄',
					ahref: 'sjz'
				},
				{
					name: '西安',
					ahref: 'xa'
				},
				{
					name: '成都',
					ahref: 'cd'
				},
				{
					name: '武汉',
					ahref: 'wh'
				},
				{
					name: '沈阳',
					ahref: 'sy'
				},
				{
					name: '厦门',
					ahref: 'xm'
				},
				{
					name: '贵阳',
					ahref: 'gy'
				},
				{
					name: '昆明',
					ahref: 'km'
				},
				{
					name: '长沙',
					ahref: 'cs'
				},
				{
					name: '宁波',
					ahref: 'nb'
				},
				{
					name: '合肥',
					ahref: 'hf'
				},
				{
					name: '苏州',
					ahref: 'su'
				},
				{
					name: '大连',
					ahref: 'dl'
				},
				{
					name: '南京',
					ahref: 'nj'
				}
			],
			searchResult: [],
			searchRecord: [],
			ResultEname: [],
			clickCityName: '',
			Enum: 0,
			clickThisCity: '',
			searchFocus: false,
			iskeyon: false
		};
	},

	onLoad(opts) {
		// /pages/location/index?city='+cityEname
		let _this = this;
		// console.log(opts);
		if (opts && JSON.stringify(opts) != '{}') {
			_this.cityename = opts.cityename || '';
			_this.cityname = opts.city || '';
		} else {
			// _this.tools.toastShow('获取位置失败！');
		}
		_this.searchRecord = uni.getStorageSync('HistoryLocation') || [];
		_this.getQueryParam();
		let pages = getCurrentPages(); // 获取页面栈
		pages.map((item, index) => {
			if (item.route == 'pages/index/index') {
				item.$vm.localClass = [];
			}
		});
	},
	mounted() {
		this.testData();
	},
	destroyed() {},
	onShareAppMessage(res) {
		let _this = this;
		return {
			title: _this.shareTitle,
			path: `/pages/location/index?webUrl=${res.webViewUrl}`,
			imageUrl: 'https://static.jiaoyubao.cn/images/uniapp/share-logo.jpg',
			content: _this.shareContent
		};
	},

	created() {},

	methods: {
		getQueryParam() {
			let _this = this;
			// 获取城市信息
			_this.location.getGPSLocation(_this, function(res) {
				// console.log(res);
				// 当前城市
				_this.cityename = _this.cityename || res.data[0].cityename;
				_this.cityname = res.data[0].cityname;
				// 经纬度
				_this.lat = res.location.lat;
				_this.lng = res.location.lng;
				_this.clickThisCity = '/pages/index/index?city=' + res.data[0].cityename + '&cityname=' + res.data[0].cityname;
			});
		},
		pageScroll(e) {
			let _this = this;
			_this.topsData();
			// if (e.detail.scrollTop > 5) {
			// 	_this.searchBar = 'city-top-title top-title-fix';
			// } else {
			// 	_this.searchBar = 'city-top-title';
			// }
			if (e.detail.scrollTop <= _this.listTopArr[0]) {
				_this.Enum = 0;
			}
			if (e.detail.scrollTop >= _this.listTopArr[0]) {
				_this.isLetterScroshow = true;
				for (let i = 0; i < _this.sortList.length; i++) {
					if (e.detail.scrollTop >= _this.listTopArr[i]) {
						_this.letterWords = _this.sortList[i];
						_this.Enum = i;
					}
				}
			} else {
				_this.isLetterScroshow = false;
			}
		},
		clearInput() {
			this.inputName = '';
			this.isCityResultshow = false;
			this.searchResult.length = 0;
		},
		naviBack() {
			this.isCitySearchshow = false;
			this.isFixshow = true;
			this.winscrollTop = 0;
			this.searchFocus = false;
		},
		searchCity() {
			this.isCitySearchshow = true;
			this.isFixshow = false;
			this.inputName = '';
			this.searchResult.length = 0;
			this.ResultEname.length = 0;
			this.searchFocus = true;
		},
		historyCitySubmit(e) {
			let _this = this;
			let tips = 0;
			for (let i = 0; i < _this.list.length; i++) {
				if (_this.searchRecord[e.currentTarget.id] == _this.list[i]) {
					tips = i;
				}
			}
			_this.cityname = _this.searchRecord[e.currentTarget.id];
			_this.cityename = _this.elist[tips];
			_this.goToCity2();
		},
		hotCitySubmit(e) {
			let _this = this;
			_this.cityname = _this.hotCitys[e.currentTarget.id].name;
			_this.cityename = _this.hotCitys[e.currentTarget.id].ahref;
			if (_this.searchRecord.indexOf(_this.hotCitys[e.currentTarget.id].name) == -1) {
				if (_this.searchRecord.length < 4) {
					_this.searchRecord.unshift(_this.hotCitys[e.currentTarget.id].name);
				} else {
					_this.searchRecord.pop();
					_this.searchRecord.unshift(_this.hotCitys[e.currentTarget.id].name);
				}
			}
			uni.setStorageSync('HistoryLocation', _this.searchRecord);
			_this.goToCity2();
		},
		allCitySubmit(e) {
			let _this = this;
			let tips = 0;
			let idArr = e.currentTarget.id.split(',');
			let thisCity = _this.flist[idArr[0]][idArr[1]];
			for (let i = 0; i < _this.list.length; i++) {
				if (thisCity == _this.list[i]) {
					tips = i;
				}
			}
			_this.cityname = thisCity;
			_this.cityename = _this.elist[tips];
			if (_this.searchRecord.indexOf(thisCity) == -1) {
				if (_this.searchRecord.length < 4) {
					_this.searchRecord.unshift(thisCity);
				} else {
					_this.searchRecord.pop();
					_this.searchRecord.unshift(thisCity);
				}
			}
			uni.setStorageSync('HistoryLocation', _this.searchRecord);
			_this.goToCity2();
		},
		citySubmit(e) {
			let _this = this;
			if (_this.searchRecord.indexOf(_this.searchResult[e.currentTarget.id]) == -1) {
				if (_this.searchRecord.length < 4) {
					_this.searchRecord.unshift(_this.searchResult[e.currentTarget.id]);
				} else {
					_this.searchRecord.pop();
					_this.searchRecord.unshift(_this.searchResult[e.currentTarget.id]);
				}
			}
			uni.setStorageSync('HistoryLocation', _this.searchRecord);
			_this.cityname = _this.searchResult[e.currentTarget.id];
			_this.cityename = _this.ResultEname[e.currentTarget.id];
			_this.goToCity2();
		},
		inputCityName(e) {
			let _this = this;
			let thisInput = e.detail.value;
			_this.isCityResultshow = true;
			if (e.detail.value.length <= 0) {
				_this.isCityResultshow = false;
				_this.searchResult.length = 0;
				_this.ResultEname.length = 0;
			} else {
				_this.searchResult.length = 0;
				_this.ResultEname.length = 0;
				for (let i = 0; i < _this.list.length; i++) {
					if (_this.list[i].indexOf(thisInput) == 0 || _this.elist[i].indexOf(thisInput.toLowerCase()) == 0 || _this.plist[i].indexOf(thisInput.toLowerCase()) == 0) {
						_this.searchResult.unshift(_this.list[i]);
						_this.ResultEname.unshift(_this.elist[i]);
						if (_this.list[i] == thisInput || _this.elist[i] == thisInput.toLowerCase() || _this.plist[i] == thisInput.toLowerCase()) {
							_this.iskeyon = true;
						} else {
							_this.iskeyon = false;
						}
					}
				}
				if (_this.searchResult.length == 0) {
					_this.isNoneshow = true;
				} else {
					_this.isNoneshow = false;
				}
			}
		},
		// 跳转城市
		goToCity2() {
			let _this = this;
			uni.setStorageSync('changeCityName', _this.cityname);
			uni.setStorageSync('changeCityEname', _this.cityename);
			uni.reLaunch({
				url: '/pages/index/index?city=' + _this.cityename + '&cityname=' + _this.cityname
			});
		},
		// 获取城市
		testData() {
			let _this = this;
			_this.$ajax(_this.$api.GetCityList, {}, '获取城市列表', function(res) {
				// console.log(res.data);
				for (let i = 0; i < res.data.data.length; i++) {
					_this.list.push(res.data.data[i].name);
					_this.elist.push(res.data.data[i].ename);
					_this.plist.push(res.data.data[i].pinyin);
					for (let j = 0; j < res.data.data.length; j++) {
						let cityFirstName = res.data.data[j].pinyin.substr(0, 1);
						if (_this.sortList[i] == cityFirstName.toUpperCase()) {
							_this.flist[i].push(res.data.data[j].name);
						}
					}
				}
				// console.log(_this.flist);
			});
		},
		// 获取高度
		topsData() {
			let _this = this;
			let query = uni.createSelectorQuery();
			query.selectAll('.cityBar').boundingClientRect();
			query.selectViewport().scrollOffset();
			query.exec(function(res) {
				for (let i = 0; i < res[0].length; i++) {
					_this.listTop.push(res[0][i].top);
				}
			});
			_this.listTopArr = _this.listTop.slice(0, 22);
		},
		jumpTag(e) {
			let flag = 0;
			let _this = this;
			_this.Enum = e.currentTarget.id;
			_this.topsData();
			_this.winscrollTop = _this.listTopArr[_this.Enum];
		}
	}
};
</script>

<style lang="scss">
@import 'index.scss';
</style>
