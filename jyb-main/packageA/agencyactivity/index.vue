<template>
	<view class="m-page-content">
		<!-- header-nav -->
		<!-- <div id="m-jyb-top-nav"></div> -->

		<!-- banner -->
		<div class="m-activity-banner">
			<div class="m-activity-img">
				<img v-if="activityBody.banner.length <= 0" src="https://static.jiaoyubao.cn/images/site/default-huodong.png" alt="" />
				<img v-else :src="'https:' + activityBody.banner[0].bannerimage" alt="" />
			</div>
			<!-- 倒计时 -->
			<uni-countdown :day="dd" :hour="hh" :minute="mm" :second="ss" v-if="activityBody.endtime !== ''"></uni-countdown>
		</div>
		<!-- 活动内容 -->
		<div class="m-activity-content bgfff">
			<h1>{{ activityBody.activityname }}</h1>
			<span>活动说明：{{ activityBody.activityremark }}</span>
			<div class="m-intro-line"><span></span></div>
			<div v-html="activityBody.htmlContent"></div>
		</div>
		<!-- 适用课程 -->
		<!--   -->
		<div class="m-class m-activity-class bgfff" v-if="activityBody.products.length > 0">
			<view class="m-center-title">
				<span>适用课程({{ activityBody.products.length }})</span>
			</view>
			<ul class="m-class-list">
				<li v-for="(item, index) in classList" :key="index">
					<navigator hover-class="none" class="flex-box _a" :url="'/packageA/classdetail/index?agency=' + agencyEname + '&id=' + item.id" title="">
						<div class="m-class-img"><img :src="'https:' + item.img" alt="" /></div>
						<div class="m-class-intro flex-1">
							<h3 class="ellipsis-1">{{ item.class_name }}</h3>
							<p class="ellipsis-1">{{ item.class_mc }} · {{ item.banxing_mc }}</p>
							<div class="flex-box" v-if="item.price == 0">
								<span>请询价</span>
								<i>赠品</i>
							</div>
							<div class="flex-box" v-else>
								<em>￥{{ item.price }}</em>
								<i>折扣</i>
							</div>
						</div>
					</navigator>
					<a hover-class="none" class="jyb-btn jyb-btn-blue m-jyb-call-btn" @click="makeTelPhone" :data-tel="telPhone" :data-school="activityBody.cominfo.name" title="">立即咨询</a>
				</li>
			</ul>
		</div>
		<!-- other activity -->
		<div class="m-other-activity bgfff mtop10" v-if="otheractive.length > 0">
			<view class="m-center-title"><span style="width: 150rpx;">其他活动</span></view>
			<ul class="m-other-activity-list">
				<li v-for="(oitem, oindex) in otheractive" :key="oindex">
					<navigator hover-class="none" class="flex-box _a" title="" :url="'/packageA/agencyactivity/index?agency=' + agencyEname + '&activityId=' + oitem.id">
						<img class="m-activity-bg" src="https://static.jiaoyubao.cn/images/mobile/hd-bg.svg" alt="" />
						<font v-if="oitem.activitycode == '012001001002'">现金优惠</font>
						<font v-else-if="oitem.activitycode == '012001001001'">限時折扣</font>
						<font v-else>赠送活动</font>
						<span class="flex-1 ellipsis-1">{{ oitem.activityname }}</span>
						<img class="m-activity-link-right" src="https://static.jiaoyubao.cn/images/mobile/icon-rightarrow.svg" alt="" />
					</navigator>
				</li>
			</ul>
		</div>
		<!-- 通用底部 -->
		<view class="footer-ele-padding"><footer-ele></footer-ele></view>
		<!-- 拨打电话底部弹出层 -->
		<tel-phone v-if="detailObj && telPhonePopShow" :detailobj="detailObj" @telPhonePopHide="telPhonePopHide"></tel-phone>
		<!-- 立即领取底部弹出层 -->
		<div class="m-fixed-form-mask" v-show="lingquFormShow" @click="lingquFormHideFn"></div>
		<div class="m-fixed-form-outer m-form-container fixed-form-slideDown" v-show="lingquFormShow" :animation="animationData">
			<div class="m-fixed-form-title">
				<span>免费领取优惠</span>
				<view class="_a m-fixed-form-close" @click="lingquFormHideFn"><img src="https://static.jiaoyubao.cn/images/mobile/icon-closed.svg" alt="" /></view>
			</div>
			<form-lingqu
				:course="classList"
				:courseGroup="courseGroup"
				pagename="agencyactivity"
				:comid="comId"
				:cityename="cityEname"
				:agencyename="agencyEname"
				resetbtn="true"
				:detailobj="detailObj"
				:activitybody="activityBody"
				@popClose="lingquFormHideFn"
			></form-lingqu>
		</div>

		<!-- 底部btn -->
		<div class="m-activity-btn-box">
			<button v-if="isOvershow <= 0 && activityBody.endtime !== ''" class="jyb-btn jyb-btn-gray activity-stop-show" style="z-index: 9999;">活动已结束</button>
			<block v-else>
				<div class="m-activity-btn-inner activity-stop-hide flex-box" v-if="activityBody.activitycode == '012001002001'">
					<button class="jyb-btn jyb-btn-light flex-1 m-jyb-call-btn" :data-tel="telPhone" :data-school="activityBody.cominfo.name" @click="makeTelPhone">
						电话咨询
					</button>
				</div>
				<div class="m-activity-btn-inner activity-stop-hide flex-box" v-else>
					<button class="jyb-btn jyb-btn-light flex-1 m-jyb-call-btn" :data-tel="telPhone" :data-school="activityBody.cominfo.name" @click="makeTelPhone">
						电话咨询
					</button>
					<button class="jyb-btn jyb-btn-blue flex-1 m-jyb-receive-quan-btn" @click="lingquFormShowFn">领取优惠</button>
				</div>
			</block>
		</div>
		
		<online-talk></online-talk>
	</view>
</template>

<script>
import { queryByAgency } from '../../common/js/url-monitor.js';
import uniCountdown from '../../component/uni-countdown.vue';
import dataArray from '../../common/data/data';
import { recordTrackingMixin } from '../../common/js/mixins.js';
export default {
	mixins: [recordTrackingMixin],
	data() {
		return {
			// param
			agencyEname: '', // 'jnxhd', // 'dazhixuexiao',
			lat: '',
			lng: '',
			cityEname: '',
			cityName: '',
			activityId: '',
			today: '',
			dd: 0,
			hh: 0,
			mm: 0,
			ss: 0,
			telBase: getApp().globalData.tel400,
			telPhone: '',
			antelPhone: '',
			telPhonePopShow: false,
			lingquFormShow: false,
			isOvershow: 0,
			comId: '',
			animationData: {},
			courseGroup: [],
			// 接口返回数据
			detailObj: '',
			activityBody: {},
			allClass: [],
			classList: [],
			otheractive: []
		};
	},
	components: {
		uniCountdown
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
	async onLoad(opts) {
		let _this = this;
		console.log(opts);
		if (opts && JSON.stringify(opts) != '{}') {
			_this.agencyEname = opts.agency;
			_this.cityEname = await queryByAgency(opts.city, opts.agency);
			_this.activityId = opts.activityId;
			dataArray.cityArr.map(item => {
				if (item.ename == _this.cityEname) {
					_this.cityName = item.name;
				}
			});
		}
		_this.getActivitiesDetail();
		// 获取城市信息
		_this.location.getCurCityEname(_this, function(res) {
			_this.cityEname = _this.cityEname || res.data[0].cityename;
			_this.cityName = _this.cityName || res.data[0].cityname;
			if(res.location){
				_this.lat = res.location.lat;
				_this.lng = res.location.lng;
			}
			
			_this.getAgencyDetail();
		});
	},
	onShareAppMessage(res) {
		let _this = this;
		// console.log(res);
		return {
			title: `【${_this.detailObj.name}】${_this.tools.UnicodeToAscii(_this.detailObj.nickname)}主页_地址电话_学费价格-教育宝手机站`,
			path: `/pages/agencyindex/index?agency=${_this.agencyEname}&city=${_this.cityEname}`,
			imageUrl: `https:${_this.photos[0].masterimage}`,
			content: `${_this.detailObj.name},${_this.cityName}${_this.tools.UnicodeToAscii(_this.detailObj.nickname)},${_this.cityName}${_this.tools.UnicodeToAscii(
				_this.detailObj.nickname
			)}学费价格,${_this.cityName}${_this.tools.UnicodeToAscii(_this.detailObj.nickname)}地址电话`
		};
	},
	created() {},
	mounted() {
		let _this = this;
		let animation = uni.createAnimation({
			duration: 500,
			timingFunction: 'ease'
		});
		_this.animation = animation;
		_this.comId = _this.detailObj.id;
	},
	methods: {
		// 设置当前页title
		setCurPageTitle() {
			let _this = this;
			let titleStr = _this.tools.UnicodeToAscii(_this.detailObj.nickname);
			// #ifdef MP-BAIDU
			titleStr = `【${_this.detailObj.name}】${_this.tools.UnicodeToAscii(_this.detailObj.nickname)}主页_地址电话_学费价格-教育宝手机站`;
			// #endif
			uni.setNavigationBarTitle({
				title: titleStr
			});
		},
		// 设置页面基础信息
		setPageInfo(getPageInfoClass) {
			let _this = this;
			swan.setPageInfo({
				title: `【${_this.detailObj.name}】${_this.tools.UnicodeToAscii(_this.detailObj.nickname)}主页_地址电话_学费价格-教育宝手机站`,
				keywords: `想了解${_this.detailObj.name}怎么样？${_this.detailObj.maintitle}，涵盖${getPageInfoClass}，点击查看${_this.cityName}${_this.tools.UnicodeToAscii(
					_this.detailObj.nickname
				)}学费价格、最新课程、老师介绍、点评评价，此外还提供${_this.cityName}${_this.tools.UnicodeToAscii(_this.detailObj.nickname)}简介、官网、地址、电话等信息。`,
				description: `${_this.detailObj.name},${_this.cityName}${_this.tools.UnicodeToAscii(_this.detailObj.nickname)},${_this.cityName}${_this.tools.UnicodeToAscii(
					_this.detailObj.nickname
				)}学费价格,${_this.cityName}${_this.tools.UnicodeToAscii(_this.detailObj.nickname)}地址电话`,
				image: ['https://static.jiaoyubao.cn/images/site/default-huodong.png'],
				success: function() {
					// console.log('setPageInfo success');
				},
				fail: function(err) {
					// console.log('setPageInfo fail', err);
				}
			});
		},

		// 拨打电话
		makeTelPhone(e) {
			let _this = this;
			
			//// 微信小程序环境 执行下面埋点代码
			// -- 20200821 [去掉微信小程序环境的条件编译] -- 百度小程序通用
				// 点击拨打电话的用户统计
				let callcode = _this.detailObj.callcode ? _this.detailObj.callcode : '',
					comename = _this.detailObj.ename ? _this.detailObj.ename : '',
					classid = '';
				_this.telTrackRecordFn(callcode, comename, classid)
			// -- 20200821 [去掉微信小程序环境的条件编译] -- 百度小程序通用
			
			// console.log(_this.tools.getPlatform());
			if (_this.tools.getPlatform() == 'ios') {
				uni.makePhoneCall({
					phoneNumber: _this.telPhone //仅为示例
				});
			} else {
				// _this.telPhonePopShow = true;
				uni.makePhoneCall({
					phoneNumber: _this.antelPhone //仅为示例
				});
			}
		},
		telPhonePopHide() {
			this.telPhonePopShow = false;
		},
		// 获取活动详情
		getActivitiesDetail() {
			let _this = this;
			let ajaxUrl = _this.$api.GetActivitiesDetail.url + '&key={activityid:' + _this.activityId + '&tdsourcetag=s_pcqq_aiomsg}';
			_this.$ajax2(_this.$api.GetActivitiesDetail, ajaxUrl, '获取活动详情', function(res) {
				_this.activityBody = res.data.body;
				// console.log(res.data.body);
				_this.activityBody.htmlContent = _this.tools
					.UnicodeToAscii(_this.tools.escape2Html(_this.activityBody.content))
					.replace(/&#39;/gi, "'")
					.replace(/<p/gi, '<p class="_p"')
					.replace(/<img/gi, '<img class="_img"')
					.replace(/<table/gi, '<table class="_table"');

				_this.getTimeCount();
				_this.getAgencyClasses();
				_this.getAgencyActivities();
			});
		},
		// 获取倒计时时间
		getTimeCount() {
			let _this = this;
			_this.today = _this.tools.formatSecond(new Date());
			let msTimes = new Date(_this.activityBody.endtime).getTime() - new Date(_this.today).getTime();
			_this.dd = Math.floor(msTimes / (24 * 3600 * 1000));
			let leave1 = msTimes % (24 * 3600 * 1000);
			_this.hh = Math.floor(leave1 / (3600 * 1000));
			let leave2 = leave1 % (3600 * 1000);
			_this.mm = Math.floor(leave2 / (60 * 1000));
			let leave3 = leave2 % (60 * 1000);
			_this.ss = Math.round(leave3 / 1000);
			_this.isOvershow = msTimes;
		},
		// 获取机构课程列表
		getAgencyClasses() {
			let _this = this;
			let ajaxUrl = _this.$api.GetAgencyClasses.url + '&key={comename:' + _this.agencyEname + '}';
			_this.$ajax2(_this.$api.GetAgencyClasses, ajaxUrl, '获取课程', function(res) {
				if (res.data && res.data.data && res.data.data.length > 0) {
					_this.allClass = res.data.data;
					_this.activityBody.products.map((pitem, pindex) => {
						_this.allClass.map((aitem, aindex) => {
							if (aitem.id == pitem.productid) {
								_this.classList.push(aitem);
							}
						});
					});
					_this.classList.map((item, index) => {
						_this.courseGroup.push(item.class_name);
					});
				}
			});
		},
		// 获取机构活动列表
		getAgencyActivities() {
			let _this = this;
			let ajaxUrl = _this.$api.GetAgencyActivities.url + '&key={comename:' + _this.agencyEname + '}';
			_this.$ajax2(_this.$api.GetAgencyActivities, ajaxUrl, '获取机构活动', function(res) {
				// console.log(res.data.data);
				_this.otheractive = res.data.data;
				_this.otheractive.map((item, index) => {
					if (item.id == _this.activityId) {
						_this.otheractive.splice(index, 1);
					}
				});
			});
		},
		// 获取机构详情
		getAgencyDetail() {
			let _this = this;
			let ajaxUrl = _this.$api.GetAgencyDetail.url + '&key={comename:' + _this.agencyEname + '}';
			_this.$ajax2(
				_this.$api.GetAgencyDetail,
				ajaxUrl,
				'获取机构详情',
				function(res) {
					// console.log(res.data.data);
					if (res.data && res.data.data && res.data.data.length > 0) {
						_this.detailObj = res.data.data[0];
						_this.telPhone = _this.telBase + ',' + res.data.data[0].callcode;
						_this.antelPhone = _this.telBase + ',,' + res.data.data[0].callcode;
						console.log(_this.detailObj);
						_this.setCurPageTitle();
					}
				},
				true
			);
		},
		lingquFormHideFn() {
			let _this = this;
			_this.animation.bottom('-350px').step();
			_this.animationData = _this.animation.export();
			setTimeout(function() {
				_this.lingquFormShow = false;
				_this.telPhonePopShow = false;
			}, 400);
		},
		lingquFormShowFn() {
			let _this = this;
			_this.lingquFormShow = true;
			setTimeout(function() {
				_this.animation.bottom(0).step();
				_this.animationData = _this.animation.export();
			}, 100);
		}
	}
};
</script>

<style lang="scss">
// 每个页面公共css
@import './index.scss';
</style>
