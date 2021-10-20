<template>
	<!-- 此页已废弃 -->
	<view class="m-common-container m-select-location flex-box-column">
		<!-- 通用头部 -->
		<header class="m-common-header">
			<ul class="m-jyb-header m-jyb-header-fixed flex-box m-header-location_search border-bottom-1px">
				<li class="m-header-input flex-box flex-1 ml10 mr12 pr8l14">
					<a hover-class="none" :url="'/pages/locationcitys1/index?city=' + cityname+'&cityename='+cityename" class="_a flex-box">
						<span class="m-location-city m-header-location-name ellipsis-1">
							{{ cityname }}
							<i class="m-common-icon icon_bottom_no_bg"></i>
						</span>
					</a>
					<span class="m-common-icon icon_search_linear"></span>
					<a class="m-loction-link m-header-input-txt ellipsis-1 flex-box flex-1" :url="'/pages/searchlocation/index?city=' + cityname+'&cityename='+cityename" hover-class="none">
						小区/写字楼/商圈等
					</a>
				</li>
			</ul>
		</header>
		<main class="m-common-main flex-1">
			<!-- 1.基于当前的定位，选择区域、商圈 -->
			<div class="m-location-based-cur">
				<!-- 当前定位 -->
				<div class="m-location-current">
					<span class="m-location-subtitle">当前定位</span>
					<div class="m-location-cur-inner flex-box">
						<span class="m-location-cur-position flex-1" @click="clickGpsLoction">{{ locationData }}</span>
						<a class="m-location-cur-reset flex-box" @click="getQueryParam" hover-class="none">
							<span class="m-common-icon icon_distance_block"></span>
							<span>重新定位</span>
						</a>
					</div>
				</div>
				<!-- 更多位置 -->
				<div class="m-location-more">
					<span class="m-location-subtitle">更多位置</span>
					<ul class="m-location-area clearfloat">
						<li v-for="(item, index) in cityArray[0]" :key="index" @click="chooseArea" :id="index" :class="cityIndex[0] == index ? 'keyon' : ''">
							<a hover-class="none">{{ item }}</a>
						</li>
					</ul>
					<div class="m-location-place-container">
						<ul class="m-location-place clearfloat">
							<li v-for="(item, index) in cityArray[1]" :key="index" @click="chooseBusiness" :id="index" :class="linum == index ? 'keyon' : ''">
								<a hover-class="none">{{ item }}</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
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
			webUrl: '', // https://m.jiaoyubao.cn/location/?city=jn
			webviewStyles: {
				progress: {
					color: '#1a8cff'
				}
			},
			shareTitle: '',
			shareContent: ',',
			locationData: '',
			GPScity: '',
			cityename: '',
			cityname: '',
			cityArea: '',
			cityBusiness: '',
			areaArr: [],
			businessArr: [],
			cityIndex: [0, 0],
			cityArray: [[], []],
			linum: 0,
			lat: '',
			ing: ''
		};
	},

	onLoad(opts) {
		// /pages/location/index?city='+cityEname
		let _this = this;
		// console.log(opts);
		if (opts && JSON.stringify(opts) != '{}') {
			_this.location.getGPSLocation(_this, function(res) {
				_this.cityArray[0].length = 0;
				_this.cityArray[1].length = 0;
				let part = /内(\d*)米$/;
				let locationStr = res.recommended_location_description.match(part);
				_this.locationData = res.recommended_location_description.split(locationStr[0])[0];
				_this.GPScity = res.data[0].cityename;
				_this.cityename = opts.cityename || '';
				_this.cityname = opts.city || '';
				// 经纬度
				_this.lat = res.location.lat;
				_this.lng = res.location.lng;
				_this.getCityArea();
				_this.getCityBusiness();
			});
		}
		// uni.setStorageSync('HistoryBusiness', _this.cityname);
	},
	onShareAppMessage(res) {
		let _this = this;
		return {
			title: _this.shareTitle,
			path: `/pages/location/index?webUrl=${res.webViewUrl}`,
			imageUrl: 'https://static.jiaoyubao.cn/images/uniapp/share-logo.jpg',
			content: _this.shareContent
		};
	},

	created() {
	},
	methods: {
		getQueryParam() {
			let _this = this;
			// 获取城市信息
			_this.location.getGPSLocation(_this, function(res) {
				_this.cityArray[0].length = 0;
				_this.cityArray[1].length = 0;
				let part = /内(\d*)米$/;
				let locationStr = res.recommended_location_description.match(part);
				_this.locationData = res.recommended_location_description.split(locationStr[0])[0];
				// 当前城市
				_this.GPScity = res.data[0].cityename;
				_this.cityename = res.data[0].cityename;
				_this.cityname = res.data[0].cityname;
				// 经纬度
				_this.lat = res.location.lat;
				_this.lng = res.location.lng;
				_this.getCityArea();
				_this.getCityBusiness();
			});
		},
		// 获取行政区
		getCityArea() {
			let _this = this;
			let ajaxUrl = _this.$api.GetCurArea.url + '&key={cityename:' + _this.cityename + '}';
			_this.$ajax2(_this.$api.GetCurArea, ajaxUrl, '获取行政区', function(res) {
				if (res.data && res.data.data && res.data.data.length > 0) {
					_this.cityArea = res.data.data;
				}
				for (let i = 0; i < _this.cityArea.length; i++) {
					_this.cityArray[0].push(_this.cityArea[i].name);
				}
			});
		},
		// 获取商圈
		getCityBusiness() {
			let _this = this;
			let ajaxUrl = _this.$api.GetCurBusiness.url + '&key={cityename:' + _this.cityename + '}';
			_this.$ajax2(_this.$api.GetCurBusiness, ajaxUrl, '获取商圈', function(res) {
				if (res.data && res.data.data && res.data.data.length > 0) {
					_this.cityBusiness = res.data.data;
				}
				for (let j = 0; j < _this.cityBusiness.length; j++) {
					if (_this.cityBusiness[j].code.indexOf(_this.cityArea[0].code) == 0) {
						_this.cityArray[1].push(_this.cityBusiness[j].name);
					}
				}
			});
		},
		getWebviewMsg(e) {
			let _this = this;
			// console.log(e.detail.data[0].title);
			// console.log(e.detail.data[0].content);
			_this.shareTitle = e.detail.data[0].title;
			_this.shareContent = e.detail.data[0].content;
		},
		clickGpsLoction() {
			uni.redirectTo({
			  url: '/pages/index/index?city=' + this.GPScity
			})
		},
		chooseArea(e) {
			let _this = this;
			// console.log(e);
			_this.cityIndex[0] = e.currentTarget.id;
			_this.cityIndex[1] = 0;
			_this.linum = 0;
			_this.cityArray[1].length = 0;
			for (let j = 0; j < _this.cityBusiness.length; j++) {
				if (_this.cityBusiness[j].code.indexOf(_this.cityArea[_this.cityIndex[0]].code) == 0) {
					_this.cityArray[1].push(_this.cityBusiness[j].name);
				}
			}
			if (_this.cityArray[1] == '') {
				_this.cityArray[1].push('全部商圈');
			}
		},
		chooseBusiness(e) {
			let _this = this;
			_this.cityIndex[1] = e.currentTarget.id;
			_this.linum = _this.cityIndex[1];
			_this.tools.loadingShow('切换中');
			setTimeout(function() {
				_this.tools.loadingHide();
			}, 1500);
			uni.redirectTo({
				url: '/pages/index/index?city=' + _this.cityename
			});
		},
	}
};
</script>

<style lang="scss">
@import 'index.scss';
</style>
