<template>
	<view :class="['m-page-content',!timeFlag && endTime!=''?'':'m-page-content-b112']">
		<!-- <view :class="['m-page-content',{'m-page-content-b112':timeFlag}] "> -->
		<!-- banner -->
		<div class="m-activity-banner">
			<div class="m-activity-img" v-if="activityBody">
				<!-- <img src="https://static.jiaoyubao.cn/images/site/default-huodong.png" alt=""> -->
				<img v-if="!activityBody.banner || activityBody.banner.length <= 0" src="https://static.jiaoyubao.cn/images/site/default-huodong.png"
				 alt="" />
				<img v-else :src="'https:' + activityBody.banner[0].bannerimage" alt="" />
			</div>
			<!-- 活动显示 -->
			<swiper class="swiper swiper-posi" :autoplay="true" :interval="2000" :duration="500" :circular="true" :vertical="true">
				<swiper-item v-for="(item,index) in actTipList" :key="index">
					<div class="actTip" style="top: 32upx;">
						<img :src="item.img" alt="">
						<div><span>{{item.name}}</span><em>刚刚参加了本活动</em></div>
					</div>
				</swiper-item>
			</swiper>
			<div class="audio" v-show="activityBody.backgroundmusic">
				<img :class="['icon-play',{ 'icon-play-rotate': !isPlaying }]" :src="playImage" @click="play">
			</div>
		</div>
		<!-- 活动内容 -->
		<div class="m-activity-content" v-if="activityBody">
			<div class="m-activity-t1">
				<h1>{{activityBody.activityname}}</h1>
				<div class="price-purchase-like">
					<span class="price"><text v-show="activityBody.saleprice>0">￥</text><text>{{activityBody.saleprice>0?activityBody.saleprice:'免费'}}</text><text
						 v-if="activityBody.originalprice">￥{{activityBody.originalprice}}</text></span>
					<div style="display: flex;justify-content: flex-start;margin-top: 17upx;">
						<span class="purchase">{{purchaseNum}}人已抢</span>
						<span class="like" @click="likeFun"><text :class="{'active':like}"></text><text>{{likeNum}}人喜欢</text></span>
					</div>
				</div>
				<div class="portrait">
					<div>
						<span class="por-l">TA们都在浏览</span>
						<ul class="head-por">
							<li v-for="(item,index) in headImg"><img :src="item.img" :key="index" alt=""></li>
							<li><span><img src="https://static.jiaoyubao.cn/images/uniapp/other.svg" alt=""></span></li>
						</ul>
					</div>
					<button open-type="share" hover-class="none" class="_a share-btn">邀请好友一起抢</button>
				</div>
				<div class="explain">活动说明：{{ activityBody.activityremark }}</div>
				<div v-html="activityBody.htmlContent" class="exp-con"></div>
			</div>
		</div>
		<div class="m-class m-activity-class bgfff" v-if="activityBody.products.length > 0">
			<view class="m-center-title">
				<span>适用课程({{ activityBody.products.length }})</span>
			</view>
			<ul :class="['m-class-list',{'m-class-list-overflow':updown.kc},activityBody.products.length <= 2?'pb32':'']">
				<li v-for="(item, index) in classList" :key="index">
					<navigator hover-class="none" class="flex-box _a" :url="'/packageA/classdetail/index?agency=' + agencyEname + '&id=' + item.id"
					 title="">
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
					<a hover-class="none" class="jyb-btn jyb-btn-blue m-jyb-call-btn" @click="makeTelPhone" :data-tel="telPhone"
					 :data-school="activityBody.cominfo.name" title="">立即咨询</a>
				</li>
			</ul>
			<div class="upDown" @click="updown.kc = !updown.kc" v-if="activityBody.products.length > 2"><text>{{updown.kc?'展开':'收起'}}({{ (activityBody.products.length-2)>0?activityBody.products.length-2:'0' }})</text><text
				 :class="['m-common-icon',updown.kc?'icon_bottom_no_bg':'icon_up_no_bg'] "></text></div>
		</div>
		<div class="m-class m-activity-class bgfff" style="margin-top: 20upx;padding: 60upx 0 0;" v-if="schoolList.length > 0">
			<view class="m-center-title">
				<span>适用校区</span>
			</view>
			<ul :class="['xq-list',{'xq-list-overflow':updown.xq}]">
				<li v-for="(item,index) in schoolList" :key="index">
					<navigator hover-class="none" class="qx-list-l" url="" title="">
						<div class="xq-tit">
							<h3>{{item.pointname}}</h3><span>{{item.minlength}}km</span><em v-if="nearest == index">距离最近</em>
						</div>
						<p class="ellipsis-1">{{item.pointaddress}}</p>
					</navigator>
					<div class="qx-list-zx" @click="makeTelPhone" :data-tel="telPhone">
						<image src="https://static.jiaoyubao.cn/images/uniapp/hdxq-xq-zx-icon.svg" mode=""></image><span>咨询</span>
					</div>
					<div class="qx-list-dh" @click="openLocationRoad" :data-x="item.map_x" :data-y="item.map_y" :data-pointaddress="item.pointaddress" :data-pointname="item.pointname">
						<image src="https://static.jiaoyubao.cn/images/uniapp/hdxq-xq-dh-icon.svg" mode=""></image><span>导航</span>
					</div>
				</li>
			</ul>
			<div class="upDown" @click="updown.xq = !updown.xq" v-if="schoolList.length > 2"><text>{{updown.xq?'展开':'收起'}}({{ (schoolList.length-2)>0?schoolList.length-2:'0' }})</text><text
				 :class="['m-common-icon',updown.xq?'icon_bottom_no_bg':'icon_up_no_bg'] "></text></div>
		</div>
		<!-- 优惠活动 -->
		<div class="m-class m-activity-class bgfff" style="margin-top: 20upx;padding: 60upx 24upx 0 30upx; " v-if="newActiveList.length > 0">
			<view class="m-center-title">
				<span>其他活动</span>
			</view>
			<div class="m-yh-active bgfff mtop10">
				<ul :class="['m-yh-list',{'m-yh-list-overflow':newhd}]">
					<block v-for="(item, index) in newActiveList" :key="index">
						<li v-if="item.activitycode == '012001001002'">
							<navigator hover-class="none" :url="'/packageB/activity/index?agency=' + agencyEname + '&activityId=' + item.id"
							 :data-aid="item.id" data-type="现金优惠" :data-title="item.activityname">
								<div class="yh-item-img">
									<img v-if="!item.banner || item.banner.length <= 0" src="https://static.jiaoyubao.cn/images/site/default-huodong.png"
									 alt="" />
									<img v-else :src="'https:' + item.banner[0].bannerimage" alt="" />
									<!-- <img src="img/activity.png" alt=""> -->
									<span class="quan">券</span>
								</div>
								<div class="yh-item-r">
									<h4>{{ item.activityname }}</h4>
									<div class="yh-item-fee">
										<p class="fee"><text v-if="item.saleprice>0">￥</text><span>{{item.saleprice>0?item.saleprice:'免费'}}</span></p>
										<p class="sec-fee del-fee"><text>￥</text><span>{{item.originalprice}}</span></p>
										<div class="purchase"><span>{{item.dealquantity!= undefined?item.dealquantity + item.purchaseNum:item.purchaseNum}}人已抢</span><i
											 class="icon-right-no-bg"></i></div>
									</div>
								</div>
							</navigator>
						</li>
						<li v-if="item.activitycode == '012001001001'">
							<navigator hover-class="none" :url="'/packageB/activity/index?agency=' + agencyEname + '&activityId=' + item.id"
							 :data-aid="item.id" data-type="限时折扣" :data-title="item.activityname">
								<div class="yh-item-img">
									<img v-if="!item.banner || item.banner.length <= 0" src="https://static.jiaoyubao.cn/images/site/default-huodong.png"
									 alt="" />
									<img v-else :src="'https:' + item.banner[0].bannerimage" alt="" />
									<!-- <img src="img/activity.png" alt=""> -->
									<span class="zhe">折</span>
								</div>
								<div class="yh-item-r">
									<h4>{{ item.activityname }}</h4>
									<div class="yh-item-fee">
										<p class="fee"><text v-if="item.saleprice>0">￥</text><span>{{item.saleprice>0?item.saleprice:'免费'}}</span></p>
										<p class="sec-fee zhe-fee"><text>{{item.discount}}</text><span>折</span></p>
										<div class="purchase"><span>{{item.dealquantity!= undefined?item.dealquantity + item.purchaseNum:item.purchaseNum}}人已抢</span><i
											 class="icon-right-no-bg"></i></div>
									</div>
								</div>
							</navigator>
						</li>
						<li v-if="item.activitycode == '012001002001'">
							<navigator hover-class="none" :url="'/packageB/activity/index?agency=' + agencyEname + '&activityId=' + item.id"
							 :data-aid="item.id" data-type="赠送活动" :data-title="item.activityname">
								<div class="yh-item-img">
									<img v-if="!item.banner || item.banner.length <= 0" src="https://static.jiaoyubao.cn/images/site/default-huodong.png"
									 alt="" />
									<img v-else :src="'https:' + item.banner[0].bannerimage" alt="" />
									<!-- <img src="img/activity.png" alt=""> -->
									<span class="zeng">赠</span>
								</div>
								<div class="yh-item-r">
									<h4>{{ item.activityname }}</h4>
									<div class="yh-item-fee">
										<p class="fee"><text v-if="item.saleprice>0">￥</text><span>{{item.saleprice>0?item.saleprice:'免费'}}</span></p>
										<p class="sec-fee del-fee" v-if="item.originalprice"><text>￥</text><span>{{item.originalprice}}</span></p>
										<div class="purchase"><span>{{item.dealquantity!= undefined?item.dealquantity + item.purchaseNum:item.purchaseNum}}人已抢</span><i
											 class="icon-right-no-bg"></i></div>
									</div>
								</div>
							</navigator>
						</li>
						<li v-if="item.activitycode == '012001002003'">
							<navigator hover-class="none" :url="'/packageB/activity/index?agency=' + agencyEname + '&activityId=' + item.id"
							 :data-aid="item.id" data-type="其他活动" :data-title="item.activityname">
								<div class="yh-item-img">
									<img v-if="!item.banner || item.banner.length <= 0" src="https://static.jiaoyubao.cn/images/site/default-huodong.png"
									 alt="" />
									<img v-else :src="'https:' + item.banner[0].bannerimage" alt="" />
									<!-- <img src="img/activity.png" alt=""> -->
									<span class="mian">免</span>
								</div>
								<div class="yh-item-r">
									<h4>{{ item.activityname }}</h4>
									<div class="yh-item-fee">
										<p class="fee"><text></text><span>免费</span></p>
										<!-- <p class="sec-fee del-fee"><text>￥</text><span>50</span></p> -->
										<div class="purchase"><span>{{item.dealquantity!= undefined?item.dealquantity + item.purchaseNum:item.purchaseNum}}人已抢</span><i
											 class="icon-right-no-bg"></i></div>
									</div>
								</div>
							</navigator>
						</li>
					</block>
				</ul>
				<div class="upDown" @click="newhd = !newhd" v-if="newActiveList.length > 3"><text>{{newhd?'展开':'收起'}}({{ (newActiveList.length-3)>0?newActiveList.length-3:'0' }})</text><text
					 :class="['m-common-icon',newhd?'icon_bottom_no_bg':'icon_up_no_bg'] "></text></div>
			</div>
		</div>
		<!-- <div :class="['foot',{'foot-h112':timeFlag}]"> -->
		<div :class="['foot',!timeFlag && endTime!=''?'':'foot-h112']">
			<div class="foot-t1" v-if="!timeFlag && endTime!=''">
				<span>距活动结束剩余：</span>
				<text class="fontArial">{{time}}</text>
			</div>
			<div class="foot-t2">
				<div class="t2-l">
					<navigator class="foot-home" :url="'/pages/agencyindex/index?agency='+agencyEname" hover-class="none"
					 role="navigation">
						<text class="m-common-icon active menu_index"></text>
						<span style="color: #FE5900;">主页</span>
					</navigator>
					<button type="primary" lang="zh_CN" open-type="getUserInfo" @getuserinfo="GetUserInfoshare" class="_a">
						<text class="m-common-icon icon_share"></text>
						<span>分享</span>
					</button>
					<navigator class="foot-kf" url="plugin://myPlugin/chat" hover-class="none" role="navigation">
						<text class="m-common-icon icon_listen_linear"></text>
						<span>客服</span>
					</navigator>
				</div>
				<!-- #ifdef MP-WEIXIN -->
				<navigator class="t2-r" v-if="!timeFlag && user.detail" :url="'/packageB/order/index?agency=' + agencyEname + '&activityId=' + activityId"><text
					 v-show="activityBody.saleprice>0">￥</text><span>{{activityBody.saleprice>0?activityBody.saleprice:''}}</span><em>立即抢购</em></navigator>
				<button class="t2-r" v-if="!timeFlag && !user.detail" type="primary" lang="zh_CN" open-type="getUserInfo"
				 @getuserinfo="mpGetUserInfo"><text v-show="activityBody.saleprice>0">￥</text><span>{{activityBody.saleprice>0?activityBody.saleprice:''}}</span><em>立即抢购</em></button>
				<div class="t2-r-end" v-if="timeFlag">此活动已结束</div>
				<!-- #endif -->
				<!-- #ifdef MP-BAIDU -->
				<div class="t2-r" @click="baiduTips"><text v-show="activityBody.saleprice>0">￥</text><span>{{activityBody.saleprice>0?activityBody.saleprice:''}}</span><em>立即抢购</em></div>
				<!-- #endif -->
			</div>
		</div>

		<div class="share-box" :animation="animationShare">
			<div class="share-content">
				<view class="share-content-box" v-if="!shareHB">
					<block v-for="(item,index) in bottomData" :key="index">
						<button v-if="item.name == 'wxhy'" open-type="share" hover-class="none" class="share-content-item">
							<image class="share-image" :src="item.icon" mode="aspectFill"></image>
							<text class="share-text">{{item.text}}</text>
						</button>
						<view v-else class="share-content-item" @click.stop="pyqFun(item,index)">
							<image class="share-image" :src="item.icon" mode="aspectFill"></image>
							<text class="share-text">{{item.text}}</text>
						</view>
					</block>
				</view>
				<view class="share-content-box" v-else>
					<view v-if="openSettingBtnHidden" class="share-content-item" @click="sharehbFun">
						<image class="share-image" src="https://static.jiaoyubao.cn/images/uniapp/hd-share-bc-icon.png" mode="aspectFill"></image>
						<text class="share-text">保存图片</text>
					</view>
					<button v-else @click="addressAgain" class="share-content-item">
						<image class="share-image" src="https://static.jiaoyubao.cn/images/uniapp/hd-share-bc-icon.png" mode="aspectFill"></image>
						<text class="share-text">保存图片</text>
					</button> 
				</view>
			</div>
			<view class="share-button-box">
				<div class="share-button" @click="shareClose">取消</div>
			</view>
		</div>
		<image v-if="share && shareHB" @load="HBimgLoad" class="share-hb-img" :src="HBUrl"
		 mode=""></image>
		<i class="mask" v-show="share" @click="shareClose"></i>
	</view>
</template>

<script>
	import { queryByAgency } from '../../common/js/url-monitor.js';
	import uniCountdown from '../../component/uni-countdown.vue';
	import dataArray from '../../common/data/data';
	import {
		recordTrackingMixin
	} from '../../common/js/mixins.js';
	import {
		ipGetMixin
	} from '../../common/js/mixins.js';
	export default {
		mixins: [recordTrackingMixin, ipGetMixin],
		data() {
			return {
				// param
				agencyEname: '', // 'jnxhd', // 'dazhixuexiao',
				lat: '',
				lng: '',
				cityEname: '',
				cityName: '',
				activityId: '',
				actTip: true, //banner左侧弹出谁谁购买
				actTipCon: {},
				actTipList: [],
				headImg: [],
				animationShare: {},
				isPlaying: false,
				isPlayEnd: false,
				// audioUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3',
				audioUrl: '',
				telBase: getApp().globalData.tel400,
				telPhone: '',
				antelPhone: '',
				courseGroup: [],
				detailObj: '',
				activityBody: null,
				allClass: [],
				classList: [],
				schoolList: [],
				newActiveList: [],
				activeList: [],
				nearest: -1,
				updown: {
					kc: true,
					xq: true
				}, //页面的几个展开收起
				time: '',
				endTime: '',
				timeFlag: false, //活动是否结束
				user: {
					mobile: '',
					code: '',
					imageCode: '',
					detail: '',
				},
				userInfo: '',
				newhd: true,
				like: false,
				likeNum: 0,
				purchaseNum: 0,
				bottomData: [{
						text: '分享微信好友',
						icon: 'https://static.jiaoyubao.cn/images/uniapp/hd-share-vx-icon.png',
						name: 'wxhy'
					},
					{
						text: '生成分享海报',
						icon: 'https://static.jiaoyubao.cn/images/uniapp/hd-share-pyq-icon.png',
						name: 'wxpyq'
					},
				],
				share: false,
				shareHB: false,
				openSettingBtnHidden: true, //是否授权
				HBUrl: ''
			};
		},
		computed: {
			playImage() {
				return this.isPlaying ? "https://static.jiaoyubao.cn/images/uniapp/hdxq-music-on-icon.svg" :
					"https://static.jiaoyubao.cn/images/uniapp/hdxq-music-off-icon.svg"
			}
		},
		onShow() {
			let _this = this;
			// #ifdef MP-WEIXIN
			// if(!uni.getStorageSync('userSession')){
			_this.userLogin();
			// }
			// 获取用户手机号
			this.user.mobile = uni.getStorageSync('userMobile') || '';
			// 获取用户的信息
			this.user.detail = uni.getStorageSync('userDetail') || '';
			// #endif
			setTimeout(function() {
				_this.pause();
				_this.play();
			}, 500)
			_this.GETPurchaseNum();
			//判断之前是拒绝过微信相册授权
			uni.getSetting({
				success(res) {
					if (!res.authSetting['scope.writePhotosAlbum']) {
						let Setting = uni.getStorageSync('Setting') || '';
						if(Setting != ''){
							_this.openSettingBtnHidden = false;
						}
					}
				}
			})
		},
		async onLoad(opts) {
			let _this = this;
			console.log(opts);
			if (opts && JSON.stringify(opts) != '{}') {
				if (opts.agency && opts.activityId) {
					_this.cityEname = await queryByAgency(opts.city, opts.agency);
					_this.agencyEname = opts.agency;
					_this.activityId = opts.activityId;
				} else {
					// _this.cityEname = decodeURIComponent(opts.d);
					_this.agencyEname = decodeURIComponent(opts.j);
					_this.cityEname = await queryByAgency('', _this.agencyEname);
					_this.activityId = decodeURIComponent(opts.h);
				}
				dataArray.cityArr.map(item => {
					if (item.ename == _this.cityEname) {
						_this.cityName = item.name;
					}
				});
			}
			// 获取城市信息
			_this.location.getCurCityEname(_this, function(res) {
				_this.cityEname = _this.cityEname || res.data[0].cityename;
				_this.cityName = _this.cityName || res.data[0].cityname;
				_this.lat = res.location.lat;
				_this.lng = res.location.lng;
				_this.getAgencyDetail();
				_this.getAgencySchools();
			});
			// 获取活动详情
			_this.getActivitiesDetail();
			_this.randomImg();
			_this.randomName();
			_this.likeGetFun();
			
			_this.GETActivityNum();

		},
		onShareAppMessage(res) {
			let _this = this;
			// console.log(`https://img.jiaoyubao.cn/hdshare/?bw=https:${_this.activityBody.banner[0].bannerimage}&w=500&h=300&pw=${_this.activityBody.saleprice}_${_this.activityBody.originalprice}_${_this.activityBody.dealquantity}_${_this.activityBody.hotquantity}`);
			return {
				title: `${_this.activityBody.activityname}`,
				path: `/packageB/activity/index?agency=${_this.agencyEname}&city=${_this.cityEname}&activityId=${_this.activityId}`,
				imageUrl: `https://img.jiaoyubao.cn/hdshare/?bw=https:${_this.activityBody.banner[0].bannerimage}&w=500&h=300&pw=${_this.activityBody.saleprice}_${_this.activityBody.originalprice}_${_this.purchaseNum}_${_this.likeNum}&${Date.now()}`,
				// content: `${_this.detailObj.name},${_this.cityName}${_this.tools.UnicodeToAscii(_this.detailObj.nickname)},${_this.cityName}${_this.tools.UnicodeToAscii(
				// 	_this.detailObj.nickname
				// )}学费价格,${_this.cityName}${_this.tools.UnicodeToAscii(_this.detailObj.nickname)}地址电话`
			};
		},
		onShareTimeline(res) {
			let _this = this;
			return {
				title: `${_this.activityBody.activityname}`,
				path: `/packageB/activity/index?agency=${_this.agencyEname}&city=${_this.cityEname}&activityId=${_this.activityId}`,
				imageUrl: `https://img.jiaoyubao.cn/hdshare/?bw=https:${_this.activityBody.banner[0].bannerimage}&w=500&h=300&pw=${_this.activityBody.saleprice}_${_this.activityBody.originalprice}_${_this.purchaseNum}_${_this.likeNum}&${Date.now()}`,
			}
		},
		created() {},
		mounted() {
			let _this = this;
			let animation = uni.createAnimation({
				duration: 300,
				timingFunction: 'ease'
			});
			_this.animation = animation;
		},
		methods: {
			// 生成随机数
			random(min, max, num) {
				let randomNum = [],
					flag = false;
				for (var i = 0; i < num; i++) {
					flag = false;
					var randomnum = parseInt(Math.random() * (max - min + 1) + min);
					for (let j = 0; j < randomNum.length; j++) {
						if (randomNum[j] == randomnum) {
							i--;
							flag = true;
						}
					}
					if (flag == false) {
						randomNum.push(randomnum)
					}
				}
				return randomNum
			},
			// 4个头像随机
			randomImg() {
				let _this = this;
				let arr = this.random(1, 30, 4),
					headImgs = [];
				for (let i = 0; i < arr.length; i++) {
					headImgs.push({
						img: 'https://static.jiaoyubao.cn/images/uniapp/headImg/' + arr[i] + '.png'
					});
				}
				this.headImg = headImgs;
				//去掉第四个展示自己的头像
				// uni.getSetting({
				//   success (res){
				// 	if (res.authSetting['scope.userInfo']) {
				// 	  // 已经授权，可以直接调用 getUserInfo 获取头像昵称
				// 	  uni.getUserInfo({
				// 		success: function(res) {
				// 		  // console.log(res.userInfo)
				// 		  _this.headImg[headImgs.length-1].img = res.userInfo.avatarUrl; 
				// 		}
				// 	  })
				// 	}
				//   }
				// })
			},
			//头像和名字随机
			randomName() {
				let arrName = ['饕餮少女', '一夜奈良山', '若即若离', '超甜的布丁', '稳走感情路', '陪你演戏', '伸手挽明月', '听梦的风尘女', '牛奶煮萝莉', '君心似我心', '风里有诗句',
					'陈情匿旧酒', '杯酒挽歌', '梦在深巷', '被风吹过灼思', '暮色上浓妆', '独留清风醉', '南馆潇湘', '绿水无忧', '指上菁芜', '嘴角的樱桃汁', '我正好喜欢', '益达学妹', '凉水参合',
					'倒影年华', '遗留的忧伤', '流年絮语', '花开一夜', '忽而相遇', '被冲淡的悲伤'
				];
				let arr = this.random(1, 30, 20),
					headNameImgs = [];
				for (let i = 0; i < arr.length; i++) {
					headNameImgs.push({
						img: 'https://static.jiaoyubao.cn/images/uniapp/headImg/' + arr[i] + '.png',
						name: arrName[arr[i] - 1]
					});
					if (i == 0) {
						this.actTipCon = {
							img: 'https://static.jiaoyubao.cn/images/uniapp/headImg/' + arr[i] + '.png',
							name: arrName[arr[i] - 1]
						};
					}
				}
				this.actTipList = headNameImgs;
				// this.actTipFun();
			},
			//banner左侧弹出谁谁购买
			// actTipFun(){
			// 	let _this = this;
			// 	let i = 1;
			// 	let iLength = _this.actTipList.length;
			// 	let flag = true;
			// 	setInterval(function(){
			// 		if(flag){
			// 			_this.animation.translateY('-10px').opacity('0').step();
			// 			_this.animationData = _this.animation.export();
			// 			setTimeout(function(){
			// 				_this.animation.translateY('10px').opacity('0').step();
			// 				_this.animationData = _this.animation.export();
			// 				if(i >= iLength-1){
			// 					_this.actTipCon = _this.actTipList[i]
			// 					i++;
			// 					i = 0;
			// 				}else{
			// 					_this.actTipCon = _this.actTipList[i]
			// 					i++;
			// 				}
			// 			},600)
			// 		}else{
			// 			_this.animation.translateY('0px').opacity('1').step();
			// 			_this.animationData = _this.animation.export();
			// 		}
			// 		flag = !flag;
			// 	},1500)
			// },
			// banner右侧音乐
			createAudio() {
				var innerAudioContext = this._audioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = false;
				innerAudioContext.loop = true;
				innerAudioContext.src = this.audioUrl;
				innerAudioContext.onPlay(() => {
					// console.log('开始播放');
				});
				innerAudioContext.onTimeUpdate((e) => {
					if (this._isChanging === true) {
						return;
					}
					this.currentTime = innerAudioContext.currentTime || 0;
					this.duration = innerAudioContext.duration || 0;
				});
				innerAudioContext.onEnded(() => {
					this.currentTime = 0;
					this.isPlaying = false;
					this.isPlayEnd = true;
				});
				innerAudioContext.onError((res) => {
					this.isPlaying = false;
					console.log(res.errMsg);
					console.log(res.errCode);
				});
				return innerAudioContext;
			},
			play() {
				if (this.isPlaying) {
					this.pause();
					return;
				}
				this.isPlaying = true;
				this._audioContext.play();
				this.isPlayEnd = false;
			},
			pause() {
				this._audioContext.pause();
				this.isPlaying = false;
			},
			// 登录授权
			userLogin() {
				let _this = this;
				wx.login({
					success: res => {
						uni.request({
							url: 'https://webapi.jiaoyubao.cn/decryptPhone/getkey/',
							method: 'POST',
							data: JSON.stringify({
								code: res.code
							}),
							dataType: 'json',
							header: {
								'content-type': 'application/json'
							},
							success: res => {
								_this.session_key = res.data.data.session_key;
								_this.openid = res.data.data.openid;
								_this.unionid = res.data.data.unionid;
								uni.setStorageSync('userSession', _this.session_key);
								uni.setStorageSync('userOpenid', _this.openid);
								uni.setStorageSync('userUnionid', _this.unionid);
							},
						})
					}
				});
			},
			//获取用户信息
			mpGetUserInfo(result) {
				let _this = this;
				// console.log('mpGetUserInfo', result);
				if (result.detail.errMsg !== 'getUserInfo:ok') {
					this.tools.toastShow('授权失败');
					//用户点击了取消授权
					return;
				} else {
					uni.request({
						url: 'https://webapi.jiaoyubao.cn/decryptPhone/',
						method: 'POST',
						data: JSON.stringify({
							encryptedData: result.detail.encryptedData,
							iv: result.detail.iv,
							session_key: uni.getStorageSync('userSession')
						}),
						dataType: 'json',
						header: {
							'content-type': 'application/json'
						},
						success: function(res) {
							let userDet = JSON.parse(res.data.data);
							if (res.data.status == '200') {
								uni.setStorageSync('userDetail', userDet);
								uni.navigateTo({
									url: '/packageB/order/index?agency=' + _this.agencyEname + '&activityId=' +
										_this.activityId,
								});
							}
						}
					})

				}
			},
			// 分享获取用户信息
			GetUserInfoshare(result) {
				let _this = this;
				if (result.detail.errMsg !== 'getUserInfo:ok') {
					this.tools.toastShow('授权失败');
					//用户点击了取消授权
					return;
				} else {
					console.log(result)
					_this.userInfo = result.detail;
					_this.share = true;
					_this.animation.translateY('-328rpx').opacity('1').step();
					_this.animationShare = _this.animation.export();
				}
			},
			shareClose() {
				let _this = this;
				_this.share = false;
				_this.shareHB = false;
				uni.hideLoading();
				_this.animation.translateY('0upx').opacity('0').step();
				_this.animationShare = _this.animation.export();
			},
			pyqFun(item, index) {
				let _this = this;
				_this.shareHB = true;
				uni.showLoading({
					title: '海报生成中...'
				});
				//生成海报
				_this.HBUrl = `https://img.jiaoyubao.cn/hdshare/?bw=https:${_this.activityBody.banner[0].bannerimage}&update=1&w=500&h=300&pw=${_this.activityBody.saleprice}_${_this.activityBody.originalprice}_${_this.purchaseNum}_${_this.likeNum}_${_this.userInfo.userInfo.avatarUrl.replace(/_/g,"~!~")}_${_this.userInfo.userInfo.nickName.replace(/_/g,"~!~")}_${_this.activityBody.activityname.replace(/_/g,"~!~")}_https://webapi.jiaoyubao.cn/weChat/wxacode.php?scene=d=${_this.cityEname}%26j=${_this.agencyEname}%26h=${_this.activityId}%26page=packageB/activity/index`;
			},
			HBimgLoad(){
				uni.hideLoading();
			},
			// 保存海报
			sharehbFun() {
				let _this = this;
				uni.getSetting({//获取授权信息
					success(res) {
						if (!res.authSetting['scope.writePhotosAlbum']) {
							uni.authorize({//调起微信授权，如果之前授权通过则不弹出授权窗口
								scope: 'scope.writePhotosAlbum',
								success() {//这里是用户同意授权后的回调
									_this.saveImgToLocal();
								},
								fail() { //这里是用户拒绝授权后的回调
									uni.setStorageSync('Setting', 'false');
									_this.openSettingBtnHidden = false;
								}
							})
						} else { //用户已经授权过了
							_this.saveImgToLocal();
						}
					}
				}) 
			},
			//点击按钮跳到微信设置权限页面
			addressAgain(){
				let _this = this;
				uni.openSetting({
				  success(res) {
				    console.log(res.authSetting)
					if (res.authSetting['scope.writePhotosAlbum']) {
						_this.openSettingBtnHidden = true;
					}else{
						_this.openSettingBtnHidden = false;
					}
				  }
				});
			},
			//保存海报
			saveImgToLocal(){
				let _this = this;
				uni.showLoading({
					title: '正在保存...'
				});
				uni.downloadFile({
				    url: _this.HBUrl,
				    success: (res) => {
				        if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: function(e) {
									uni.hideLoading();
									uni.showToast({
									    title: '保存成功',
										icon :'success'
									});
								},
								fail: function(e){
									uni.hideLoading();
									uni.showToast({
									    title: '保存失败',
										icon :'none'
									});
								}
							});
				        }
				    }
				});
			},
			// 倒计时
			timeDown() {
				const endTime = new Date(this.endTime)
				const nowTime = new Date();
				let leftTime = parseInt((endTime.getTime() - nowTime.getTime()) / 1000)
				let Time = parseInt((endTime.getTime() - nowTime.getTime()))
				let d = parseInt(leftTime / (24 * 60 * 60))
				// let h = this.formate(parseInt(leftTime/(60*60)%24))
				let h = this.formate(parseInt(leftTime / (24 * 60 * 60) * 24))
				let m = this.formate(parseInt(leftTime / 60 % 60))
				let s = this.formate(parseInt(leftTime % 60))
				let mi = this.formate(parseInt((Time % 1000) / 10))
				if (leftTime <= 0) {
					this.timeFlag = true
				}
				// this.time = `${d}天${h}小时${m}分${s}秒${mi}毫秒`
				this.time = `${h} : ${m} : ${s} : ${mi}`
			},
			formate(time) {
				if (time >= 10) {
					return time
				} else {
					return `0${time}`
				}
			},
			formateTime(time) {
				if (time >= 100) {
					return time
				} else if (time < 100 && time > 10) {
					return `0${time}`
				} else {
					return `00${time}`
				}
			},
			// 获取活动详情
			getActivitiesDetail() {
				let _this = this;
				let ajaxUrl = _this.$api.GetActivitiesDetail.url + '&key={activityid:' + _this.activityId +
					'&tdsourcetag=s_pcqq_aiomsg}';
				_this.$ajax2(_this.$api.GetActivitiesDetail, ajaxUrl, '获取活动详情', function(res) {
					_this.activityBody = res.data.body;
					_this.endTime = res.data.body.endtime;
					_this.audioUrl = res.data.body.backgroundmusic;
					_this.activityBody.htmlContent = _this.tools
						.UnicodeToAscii(_this.tools.escape2Html(_this.activityBody.content))
						.replace(/&#39;/gi, "'")
						.replace(/<p/gi, '<p class="_p"')
						.replace(/<img/gi, '<img class="_img"')
						.replace(/<table/gi, '<table class="_table"');
					if (_this.endTime) {
						let time = setInterval(() => {
							if (_this.timeFlag == true) {
								clearInterval(time)
							}
							_this.timeDown()
						}, 50)
					} else {
						// 如果没有返回时间则默认表示此活动为长期活动
						_this.timeFlag = false;
					}
					_this.getAgencyClasses();
					_this.getAgencyActivities();
					// _this.mergeshareimg();
					// 音乐
					_this._isChanging = false;
					_this._audioContext = null;
					_this.createAudio();
					_this.pause();
					_this.play();
					_this.GETActivityNum();
					_this.GETPurchaseNum();
					setTimeout(function() {
						_this.countActivity();
					}, 3000)
				});
			},
			// 添加活动计数
			countActivity() {
				let _this = this;
				let ajaxUrl = _this.$api.SetActivity.url + '&key={kv:company_activity_uv,code:' + _this.activityBody.id +
					',userid:' + _this.IP + ',expires:0}';
				_this.$ajax2(_this.$api.SetActivity, ajaxUrl, '活动喜欢人数+1', function(res) {
					if (res.data.result == '1') {}
				});
			},
			//获取活动计数
			GETActivityNum() {
				let _this = this;
				let ajaxUrl = _this.$api.GETActivity.url + '&key={kv:company_activity_uv,code:' + _this.activityId + '}';
				_this.$ajax2(_this.$api.GETActivity, ajaxUrl, '获取喜欢人数', function(res) {
					if (res.data.result == '1') {
						if (_this.activityBody.hotquantity != undefined) {
							_this.likeNum = _this.activityBody.hotquantity + res.data.number;
						} else {
							_this.likeNum = res.data.number;
						}
					}
				});
			},
			//获取活动购买计数
			GETPurchaseNum() {
				let _this = this;
				let ajaxUrl = _this.$api.GETActivity.url + '&key={kv:company_activity_sale,code:' + _this.activityId + '}';
				_this.$ajax2(_this.$api.GETActivity, ajaxUrl, '获取活动购买人数', function(res) {
					if (res.data.result == '1') {
						if (_this.activityBody.dealquantity != undefined) {
							_this.purchaseNum = _this.activityBody.dealquantity + res.data.number;
						} else {
							_this.purchaseNum = res.data.number;
						}
					}
				});
			},
			likeFun() {
				let _this = this;
				if (!_this.like) {
					_this.likeNum += 1;
					_this.like = true;
					let likehdID = uni.getStorageSync('likehdID') || [];
					likehdID.push(_this.activityId);
					uni.setStorageSync('likehdID', Array.from(new Set(likehdID)));
				}
			},
			likeGetFun() {
				let _this = this;
				let likehdID = uni.getStorageSync('likehdID') || [];
				for (let i = 0; i < likehdID.length; i++) {
					if (likehdID[i] == _this.activityId) {
						_this.like = true;
					}
				}
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
			// 获取机构详情
			getAgencyDetail() {
				let _this = this;
				let ajaxUrl = _this.$api.GetAgencyDetail.url + '&key={comename:' + _this.agencyEname + '}';
				_this.$ajax2(
					_this.$api.GetAgencyDetail,
					ajaxUrl,
					'获取机构详情',
					function(res) {
						// console.log(res.data);
						if (res.data && res.data.data && res.data.data.length > 0) {
							_this.detailObj = res.data.data[0];
							_this.telPhone = _this.telBase + ',' + res.data.data[0].callcode;
							_this.antelPhone = _this.telBase + ',,' + res.data.data[0].callcode;
							console.log(_this.detailObj);
							// _this.setCurPageTitle();
						}
					},
					true
				);
			},
			// 获取适用校区
			getAgencySchools() {
				let _this = this;
				let ajaxUrl = _this.$api.GetAgencySchools.url + '&key={comename:' + _this.agencyEname + ',coordinate:' + _this.lat +
					'_' + _this.lng + '}';
				_this.$ajax2(_this.$api.GetAgencySchools, ajaxUrl, '获取校区', function(res) {
					if (res.data && res.data.data && res.data.data.length > 0) {
						if (!_this.activityBody.activitycampus || _this.activityBody.activitycampus.length <= 0) {
							_this.schoolList = res.data.data;
						} else {
							for (let i = 0; i < _this.activityBody.activitycampus.length; i++) {
								let _item = _this.activityBody.activitycampus[i].pointid;
								for (var j = 0; j < res.data.data.length; j++) {
									if (res.data.data[j].id == _item) {
										_this.schoolList.push(res.data.data[j]);
									}
								}
							}
						}
						let num = 0,
							Oi = 0;
							console.log(_this.schoolList)
							// bMapToQQMap
						for (let i = 0; i < _this.schoolList.length; i++) {
							if (i == 0) {
								num = _this.schoolList[i].minlength;
								Oi = i;
							} else if (_this.schoolList[i].minlength < num) {
								num = _this.schoolList[i].minlength;
								Oi = i;
							}
							let mapY = _this.schoolList[i].map_y,mapX = _this.schoolList[i].map_x;
							// console.log(mapY,mapX);
							// lng == mapX
							// lat == mapY
							// _this.bMapToQQMap(mapX,mapY,function(lng, lat){
							// 	// console.log(lng,lat)
							// 	_this.schoolList[i].map_x = lng;
							// 	_this.schoolList[i].map_y = lat;
							// });
							// console.log(mapY,mapX);
						}
						_this.nearest = Oi;
					}
				});
			},
			//百度地图和腾讯地图经纬度转换
			bMapToQQMap(lng, lat, cb) {
			    if (lng == null || lng == '' || lat == null || lat == '')
			        return [lng, lat];
			    var x_pi = 3.14159265358979324;
			    var x = parseFloat(lng) - 0.0065;
			    var y = parseFloat(lat) - 0.006;
			    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
			    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
			    var lng = (z * Math.cos(theta)).toFixed(7);
			    var lat = (z * Math.sin(theta)).toFixed(7);
				cb(lng, lat);
			    // return [lng, lat];
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
			// 获取机构活动列表
			getAgencyActivities() {
				let _this = this;
				let ajaxUrl = _this.$api.GetAgencyActivities.url + '&key={comename:' + _this.agencyEname + '}';
				_this.$ajax2(_this.$api.GetAgencyActivities, ajaxUrl, '获取机构活动', function(res) {
					for (let i = 0; i < res.data.data.length; i++) {
						// res.data.data[0].activityversion = 2;
						// res.data.data[1].activityversion = 2;
						if (_this.activityId == res.data.data[i].id) {
							continue;
						}
						if (res.data.data[i].activityversion && res.data.data[i].activityversion >= 2) { //新活动
							_this.newActiveList.push(res.data.data[i]);
							_this.GETPurchaseNumSale(res.data.data[i].id);
						} else { //旧活动
							_this.activeList.push(res.data.data[i]);
						}
					}
				});
			},
			//获取活动购买计数
			GETPurchaseNumSale(codeID) {
				let _this = this;
				let ajaxUrl = _this.$api.GETActivity.url + '&key={kv:company_activity_sale,code:' + codeID + '}';
				_this.$ajax2(_this.$api.GETActivity, ajaxUrl, '获取活动购买人数', function(res) {
					if (res.data.result == '1') {
						for (let i = 0; i < _this.newActiveList.length; i++) {
							if (_this.newActiveList[i].id == codeID) {
								_this.$set(_this.newActiveList[i], 'purchaseNum', res.data.number);
							}
						}
					}
				});
			},
			toMap(latitude, longitude) {
				uni.getLocation({
					type: 'BD09',
					success: res => {
						console.log('location success', res)
						uni.openLocation({
							latitude: latitude,
							longitude: longitude,
							scale: 18
						})
					}
				})
			},
			openLocationRoad(e) {
				let obj = this.bd_decrypt(e.currentTarget.dataset.y, e.currentTarget.dataset.x);
				uni.getLocation({
				 type: 'gcj02', //返回可以用于uni.openLocation的经纬度
				 success (res) {
				   const latitude = obj.lat;
				   const longitude = obj.lon;
				   const name = e.currentTarget.dataset.pointname;
				   const address = e.currentTarget.dataset.pointaddress;
				   uni.openLocation({
				     latitude,
				     longitude,
					 name,
					 address,
				     scale: 18
				   })
				 }
				})
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
			baiduTips() {
				uni.showModal({
					content: "该活动暂时只在微信小程序开放",
					showCancel: false,
					confirmText: "确定"
				})
			}
		},
		onHide() {
			this.pause();
		},
		onUnload() {
			this.pause();
		}
	};
</script>

<style lang="scss">
	// 每个页面公共css
	@import './index.scss';
</style>
