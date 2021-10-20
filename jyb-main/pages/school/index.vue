<template>
	<view class="agency-page-container">
		<!-- header -->
		<!-- <header-ele v-if="detailObj" :detailobj="detailObj" title="" :navtabitemshow="navTabItemShow"></header-ele> -->
		<!-- header-nav -->
		<header-nav :cityename="cityEname" :agencyename="agencyEname" rendertype="school" :navtabitemshow="navTabItemShow"></header-nav>

		<!-- map -->
		<view v-if="lat && lng" class="map-box">
			<map
				id="myMap"
				:latitude="lat"
				:longitude="lng"
				:markers="markerList"
				show-location="true"
				show-compass="true"
				show-scale="true"
				style="width: 750rpx; height: 450rpx;"
			></map>
			<view class="m-map-error" @click="goToMapError">
				<image class="_img" src="https://static.jiaoyubao.cn/images/common/error_icon.svg" alt="">
				<span>报错</span>
			</view>
		</view>
		
		<!-- header-tab -->
		<view class="school-sort-box" v-if="schoolSort.length > 0">
			<header-tab
				rendertype="link"
				page="school"
				:cityename="cityEname"
				:agencyename="agencyEname"
				:tabarr="schoolSort"
				:active="sortId"
				:schoolScrLeft="schoolScrLeft"
				@clickTabItem="chooseTabItem"
			></header-tab>
		</view>

		<!-- school-list -->
		<view class="m-school bgfff" v-if="schoolList && schoolList.length > 0">
			<school-item
				:cityename="cityEname"
				:agencyename="agencyEname"
				:schools="schoolList"
				hasactive="true"
				:sortid="schoolId"
				@receiveMakeTelPhone="makeTelPhone"
				@clickSchoolItem="chooseSchoolItem"
			></school-item>
		</view>

		<!--
			底部模块
		-->
		<!-- 面包屑 -->
		<!-- <bread-crumbs v-if="detailObj && classObj" :detailobj="detailObj" :classobj="classObj"></bread-crumbs> -->

		<!-- 通用底部 -->
		<view class="footer-ele-padding"><footer-ele></footer-ele></view>

		<!-- 拨打电话底部弹出层 -->
		<tel-phone v-if="detailObj && telPhonePopShow" :detailobj="detailObj" @telPhonePopHide="telPhonePopHide"></tel-phone>

		<online-talk></online-talk>
	</view>
</template>

<script>
import { footerMixin, navTabItemShowMixin, recordTrackingMixin } from '../../common/js/mixins.js';
import { queryByAgency } from '../../common/js/url-monitor.js';
export default {
	mixins: [footerMixin, navTabItemShowMixin, recordTrackingMixin],
	data() {
		return {
			cityEname: '',
			agencyEname: '',
			sortId: 'all',
			schoolId: '',
			lat: '',
			lng: '',
			schoolList: [],
			schoolSort: [],
			markerList: [],
			schoolArr: [],
			isNearbyIn: false,
			thisItem: {}
		};
	},
	onReady: function(e) {
		this.mapCtx = uni.createMapContext('myMap');
		// this.mapCtx.moveToLocation();
	},
	async onLoad(opts) {
		let _this = this;
		// console.log(opts);
		if (opts && JSON.stringify(opts) != '{}') {
			_this.cityEname = await queryByAgency(opts.city, opts.agency);

			_this.agencyEname = opts.agency;
			_this.sortId = opts.id || 'all';
			_this.schoolId = opts.schoolId || '';
		}
		if (!opts.schoolId) {
			_this.isNearbyIn = false;
		}
		else {
			_this.isNearbyIn = true;
		}
		// console.log(_this.isNearbyIn);
		_this.getFooterMixin();
		_this.getNavTabItemShowMixin();

		// 获取城市信息
		_this.location.getCurCityEname(_this, async function(res) {
			if(res.location){
				_this.lat = res.location.lat;
				_this.lng = res.location.lng;
			}
			// #ifndef MP-BAIDU
			_this.getSchoolData();
			// #endif
			
			// #ifdef MP-BAIDU
				await _this.getSchoolData();
				_this.setPageInfoFn();
			// #endif
		});
	},
	onShow() {
		
	},
	onShareAppMessage(res) {
		let _this = this;
	},
	created() {},
	methods: {
		goToMapError() {
			let _this = this;
			let school = '';
			if(_this.schoolId) {
				_this.schoolList.map(item => {
					if(item.id == _this.schoolId) {
						school = item.pointname;
					}
				})
			}
			else {
				school = _this.schoolList[0].pointname;
			}
			uni.navigateTo({
				url: `../../packageB/maperror/index?school=${school}&agency=${_this.agencyEname}`
			})
		},
		setPageInfoFn(){
			let _this = this;
			// #ifdef MP-BAIDU
				let titleStr = `【${_this.detailObj.name}地址】${_this.detailObj.nickname}电话_${_this.detailObj.nickname}分校-教育宝手机站`;
				swan.setPageInfo({
					title: titleStr,
					keywords: `${_this.detailObj.name}地址,${_this.detailObj.nickname}电话,${_this.detailObj.nickname}分校,${_this.detailObj.nickname}校区`,
					description: `教育宝为您提供${_this.detailObj.name}${_this.schoolList.length}家校区的机构地址、机构电话，此外您还可以查看${_this.detailObj.nickname}的地图、公交交通线路，快速查询${_this.detailObj.nickname}电话地址，就上教育宝。`,
					success: function() {
					},
					fail: function(err) {
					}
				});
				uni.setNavigationBarTitle({
					title: titleStr
				});
			// #endif
		},
		getSchoolData() {
			let _this = this;
			return new Promise(resolve => {
				// _this.mapCtx = uni.createMapContext('myMap');
				_this.component.getComAgencySchools(
					_this,
					function(res) {
						_this.schoolArr = res.data;
						
						// schoolList
						if (_this.sortId != 'all') {
							let firstItem = res.data.find(item => item.areacode == _this.sortId);
							for (let i = 0; i < res.data.length; i++) {
								if (res.data[i].areaename == firstItem.areaename) {
									_this.schoolList.push(res.data[i]);
								}
							}
						} else {
							_this.schoolList = res.data;
						}
						
						// thisItem
						if (_this.schoolId) {
							_this.thisItem = res.data.find(item => item.id == _this.schoolId);
						}else{
							_this.thisItem = res.data[0];
						}
							
						// _this.filterSchoolData();
				
						_this.getSchoolSort();
						_this.getConvertBDToGCJ(resolve);
					},
					true
				);
			})
		},
		getConvertBDToGCJ(resolve) {
			let _this = this;
			_this.schoolList.forEach((item, index) => {
				// console.log(item.map_y, item.map_x);
				let obj = _this.bd_decrypt(item.map_y, item.map_x);
				
				// console.log(obj);
				item.lat = obj.lat;
				item.lng = obj.lon;
				_this.$set(_this.schoolList, index, item);
			});
			// // #ifdef MP-BAIDU
			if(resolve){
				resolve();
			}
			// // #endif
			_this.filterSchoolData();
		},
		// 百度地图坐标转腾讯地图坐标
		bd_decrypt: function(bdLat, bdLon) {
			let PI = 3.14159265358979324;
			let x_pi = (3.14159265358979324 * 3000.0) / 180.0;
			let x = bdLon - 0.0065,
				y = bdLat - 0.006;
			let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
			let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
			let gcjLon = z * Math.cos(theta);
			let gcjLat = z * Math.sin(theta);
			// // console.log(gcjLat, gcjLon);
			return { lat: gcjLat, lon: gcjLon };
		},
		filterSchoolData() {
			let _this = this;

			_this.schoolList.forEach((item, index) => {
				let calloutObj = {
					content: item.pointname,
					color: "#ffffff",
					fontSize: 12,
					borderRadius: 18,
					bgColor: '#1a8cff99',
					padding: 8,
					display: 'ALWAYS', // 'BYCLICK',
					textAlign: 'centerBYCLICK'
				};

				let num = index + 1;
				let iconPathStr = 'https://static.jiaoyubao.cn/images/uniapp/map-red.png';
				if (_this.thisItem.id == item.id) {
					iconPathStr = 'https://static.jiaoyubao.cn/images/uniapp/map-blue@2x.png';
				}
				let labelObj = {
					content: num < 10 ? ' ' + num : '' + num,
					width: 36,
					color: "#ffffff",
					fontSize: 14,
					textAlign: 'center',
					borderWidth: 0,
					// anchorX: -8,
					// anchorY: -30
				};
				// #ifdef MP-WEIXIN
					labelObj.anchorX = -2;
					labelObj.anchorY = -30;
				// #endif
				
				// #ifdef MP-BAIDU
					labelObj.x = 6;
					labelObj.y = 10;
					labelObj.bgColor = "#ffffff00";
				// #endif

				_this.markerList.push({
					id: item.areacode,
					latitude: item.lat, // item.map_y,
					longitude: item.lng, // item.map_x,
					iconPath: iconPathStr,
					width: 36,
					height: 36,
					callout: calloutObj,
					label: labelObj
				});
				
			});
			if (_this.isNearbyIn) {
				setTimeout(function() {
					// longitude	Number	否	经度 ，App 2.6.8、H5、仅微信小程序 2.8.0+ 支持
					// latitude	Number	否	纬度 ，App 2.6.8、H5、仅微信小程序 2.8.0+ 支持
					_this.lat = _this.thisItem.lat;
					_this.lng = _this.thisItem.lng;
					// _this.mapCtx.moveToLocation();
				}, 1000);
			} else {
				setTimeout(function() {
					_this.lat = _this.schoolList[0].lat;
					_this.lng = _this.schoolList[0].lng;
					// _this.mapCtx.moveToLocation();
				}, 1000);
			}
		},
		// 获取学校 区分类
		getSchoolSort() {
			let _this = this;
			let isExist = [];
			_this.schoolArr.forEach((o, i) => {
				if (isExist.indexOf(o.areacode) == -1) {
					isExist.push(o.areacode);
					_this.schoolSort.push({
						id: o.areacode,
						areacode: o.areacode,
						name: o.areacode ? o.areaname : '其他',
						count: 1
					});
				} else {
					_this.schoolSort.filter(item => {
						if (item.areacode == o.areacode) {
							item.count += 1;
						}
					});
				}
			});
		},
		chooseTabItem(data) {
			let _this = this;
			_this.sortId = data.areacode;
			_this.schoolList = [];
			_this.isNearbyIn = false;
			if (data.areacode == 'all') {
				_this.sortId = 'all';
				_this.schoolList = _this.schoolArr;
			} else if (data.areacode == '') {
				_this.sortId = 'other';
				for (let j = 0; j < _this.schoolArr.length; j++) {
					if (_this.schoolArr[j].areacode == '') {
						_this.schoolList.push(_this.schoolArr[j]);
					}
				}
			} else {
				let newList = [];
				for (let i = 0; i < _this.schoolArr.length; i++) {
					if (_this.schoolArr[i].areacode == data.areacode) {
						newList.push(_this.schoolArr[i]);
					}
				}
				_this.schoolList = newList;
			}
			_this.thisItem = _this.schoolList[0];
			_this.schoolId = _this.schoolList[0].id;
			// _this.mapCtx = uni.createMapContext('myMap');
			_this.getConvertBDToGCJ();
		},
		chooseSchoolItem(data) {
			console.log(data)
			let _this = this;
			_this.sortId = data.areacode;
			_this.schoolId = data.id;
			_this.schoolList = [];
			if (_this.sortId != 'all') {
				let newList = [];
				for (let i = 0; i < _this.schoolArr.length; i++) {
					if (_this.schoolArr[i].areacode == data.areacode) {
						newList.push(_this.schoolArr[i]);
					}
					if (_this.schoolArr[i].id == _this.schoolId) {
						_this.thisItem = _this.schoolArr[i];
						_this.isNearbyIn = true;
					}
				}
				_this.schoolList = newList;
			}
			// _this.mapCtx = uni.createMapContext('myMap');
			_this.getConvertBDToGCJ();
		}
	}
};
</script>

<style lang="scss">
@import './index.scss';
</style>
