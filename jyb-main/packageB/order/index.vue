<template>
	<view class="m-page-content">
		<div class="commodity-det">
			<div class="com-school"><text class="m-common-icon menu_index"></text><span>{{ detailObj.name }}</span></div>
			<div class="activity">
				<img v-if="!activityBody.banner || activityBody.banner.length <= 0" src="https://static.jiaoyubao.cn/images/site/default-huodong.png"
				 alt="" />
				<img v-else :src="'https:' + activityBody.banner[0].bannerimage" alt="" />
				<div class="activity-r">
					<text class="ellipsis-1">{{activityBody.activityname}}</text>
					<span class="price"><text>￥</text><text>{{activityBody.saleprice}}</text><text v-if="activityBody.originalprice">￥{{activityBody.originalprice}}</text></span>
				</div>
			</div>
			<div class="commodity-number">
				<span>数量</span>
				<div class="com-num">
					<image @click="numReduce" :src="minNumImg" mode=""></image>
					<span>{{minNum}}</span>
					<image @click="numIncrease" src="https://static.jiaoyubao.cn/images/uniapp/hd-dd-add-icon.svg" mode=""></image>
				</div>
			</div>
		</div>
		<ul class="money-phone">
			<li><span>实付金额</span><text>￥{{money}}</text></li>
			<li>
				<span>手机号码</span>
				<block v-if="phoneFlag2">
					<button class="btn-phone" v-if="!phoneFlag" lang="zh_CN" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取手机号码</button>
					<div style="display: flex;justify-content: flex-start;" v-if="phoneFlag"><text>{{phone}}</text><i class='m-common-icon icon_modify_block' @click="phoneCustom"></i></div>
					
				</block>
				<block v-if="!phoneFlag2">
					<input class="phone-ipt" type="number" hold-keyboard="true" confirm-type="done" focus v-model="user.mobile" value=""
					placeholder="请输入手机号" placeholder-style="color:#ABABAB;" />
				</block>
			</li>
			<li v-if="!phoneFlag2">
				<span>验证码</span>
				<div>
					<input type="number" v-model="qrCode" value="" placeholder="请输入验证码" placeholder-style="color:#ABABAB;" />
					<i></i>
					<button class="codebtn" style="color: #595959;" hover-class="none" v-if="timer">{{ countDownNum }}s后重试</button>
					<button class="codebtn" hover-class="none" @click.stop="codebtn" v-else>获取验证码</button>
				</div>
				
			</li>
		</ul>
		<div class="payment">
			<span>支付方式</span>
			<div>
				<image src="https://static.jiaoyubao.cn/images/uniapp/hd-dd-wechat-icon.svg" mode=""></image>
				<span>微信支付</span>
			</div>
		</div>
		<div class="clause">
			<div @click="this.checkbox = !this.checkbox;">
				<image :src="checkboxImg" mode=""></image>
				<span>已阅读并同意</span>
			</div>
			<navigator hover-class="none" url="/packageB/clause/index">《教育宝随时退服务条款》</navigator>
		</div>
		<div class="submit" v-show="payFlag" @click="submitPay"><text>￥</text><text>{{money}}</text><text>提交订单</text></div>
		<div class="submit" v-show="!payFlag"><text>￥</text><text>{{money}}</text><text>提交订单</text></div>
	</view>
</template>

<script>
	import { queryByAgency } from '../../common/js/url-monitor.js';
	import {ipGetMixin} from '../../common/js/mixins.js';
	import md5 from '../../common/js/md5.js';
	// import * as consts from '../../common/js/const.js'; 
	export default {
		mixins: [ipGetMixin],
		data() {
			return {
				agencyEname: '',
				cityEname: '',
				activityId: '',
				minNumImg: 'https://static.jiaoyubao.cn/images/uniapp/hd-dd-de-off-icon.svg',
				minNum: 1, //购买件数
				money: '',
				phoneFlag: false, //是否获取过手机号
				phoneFlag2: true, //是否展示手机号输入框
				phone: '',
				qrCode:'',
				timer: null, // 定时器名字
				countDownNum: 60, // 倒计时初始值
				checkbox: true,
				payFlag: true,
				user: {
					mobile: '',
					code: '',
					imageCode: '',
					detail: '',
					uservipid: '',
				},
				platForm:'',//设备信息 用于判断是安卓 苹果 和 电脑端
				pageUrl: '',
				activityBody: {},
				detailObj: {},
				orderNumber:'',//订单号
			};
		},
		computed: {
			checkboxImg() {
				return this.checkbox ? 'https://static.jiaoyubao.cn/images/uniapp/hd-dd-tk-icon.svg' :
					'https://static.jiaoyubao.cn/images/uniapp/hd-dd-tk-off-icon.svg';
			}
		},
		watch: {
			user: {
				handler: function(newVal, oldVal) {
					var tel = String(newVal.mobile);
					// this.phone = tel.substr(0, 3) + "****" + tel.substr(7);//暂时不需要隐藏手机号了
					this.phone = tel;
					if (tel.length == 11) {
						this.phoneFlag = true;
					} else {
						this.phoneFlag = false;
					}
				},
				deep: true
			},
			minNum(newVal, oldVal) {
				console.log(newVal)
				this.money = ((this.activityBody.saleprice * 100) * newVal / 100);
			}
		},
		onShow() {
			let _this = this;
			// #ifdef MP-WEIXIN
			// 获取用户手机号
			// this.user.mobile = uni.getStorageSync('userMobile') || '';
			// 获取用户的信息
			this.user.detail = uni.getStorageSync('userDetail') || '';
			// 获取教育宝会员id
			this.user.uservipid = uni.getStorageSync('uservipid') || '';
			wx.getSystemInfo({
			  success (res) {
				let pla = '';
				if(res.platform == "windows"){
					pla = 'PC';
				}else if(res.platform == "ios"){
					pla = 'IOS';
				}else if(res.platform == "android"){
					pla = 'android';
				}else if(res.platform == "devtools"){
					pla = '模拟器';
				}
				_this.platForm = pla;
				// _this.tools.toastShow(pla);
			  }
			})
			// #endif
			let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
			let curRoute = routes[routes.length - 1].route // 获取当前页面路由，也就是最后一个打开的页面路由
			this.pageUrl = curRoute;
		},
		async onLoad(opts) {
			let _this = this;
			console.log(opts);
			if (opts && JSON.stringify(opts) != '{}') {
				_this.agencyEname = opts.agency;
				_this.cityEname = await queryByAgency(opts.city, opts.agency);
				_this.activityId = opts.activityId;
			}
			// #ifdef MP-WEIXIN
			// 获取用户手机号
			this.user.mobile = uni.getStorageSync('userMobile') || '';
			// #endif
			this.getActivitiesDetail();
		},
		mounted() {

		},
		methods: {
			numIncrease() { //增加
				this.minNum += 1;
				this.minNumImg = 'https://static.jiaoyubao.cn/images/uniapp/hd-dd-de-on-icon.svg';
			},
			numReduce() { //减小
				if (this.minNum <= 1) {
					this.minNumImg = 'https://static.jiaoyubao.cn/images/uniapp/hd-dd-de-off-icon.svg';
				} else {
					this.minNum -= 1;
					if (this.minNum <= 1) {
						this.minNumImg = 'https://static.jiaoyubao.cn/images/uniapp/hd-dd-de-off-icon.svg';
					}
				}

			},
			checkboxFun() {
				this.checkbox = !this.checkbox;
			},
			formateNum(num) {
				num = Number(num)
				if (num >= 1000) {
					return num
				} else if (num < 1000 && num > 100) {
					return `0${num}`
				} else if (num < 100 && num > 10) {
					return `00${num}`
				} else {
					return `000${num}`
				}
			},
			random(min, max) {
				var randomNum = parseInt(Math.random() * (max - min + 1) + min);
				return randomNum
			},
			// inputFun(e) {
			// 	if (!this.tools.checkPhoneNum(e.detail.value)) {
			// 		this.tools.toastShow('请正确输入手机号');
			// 		return;
			// 	} else {
			// 		this.user.mobile = e.detail.value;
			// 		this.phoneFlag2 = true;
			// 	}
			// },
			// 手机号授权
			getPhoneNumber(e) {
				let _this = this;
				if (e.detail.errMsg == 'getPhoneNumber:fail user deny' || e.detail.errMsg == 'getPhoneNumber:fail:user deny') {
					_this.tools.toastShow('授权失败');
					_this.phoneFlag2 = false;
				} else {
					uni.request({
						url: 'https://webapi.jiaoyubao.cn/decryptPhone/',
						method: 'POST',
						data: JSON.stringify({
							encryptedData: e.detail.encryptedData,
							iv: e.detail.iv,
							session_key: uni.getStorageSync('userSession')
						}),
						dataType: 'json',
						header: {
							'content-type': 'application/json'
						},
						success: function(res) {
							let phonenum = JSON.parse(res.data.data).purePhoneNumber;
							if (phonenum) {
								_this.user.mobile = phonenum;
								_this.phoneFlag = true;
								uni.setStorageSync('userMobile', phonenum);
							}
						},
						fail: function(res) {}
					})
				}
			},
			phoneCustom(){
				let _this = this;
				uni.showModal({
				    content: '确定要修改手机号？',
				    success: function (res) {
				        if (res.confirm) {
				            _this.phoneFlag2 = false;
				            _this.phone = '';
				            _this.user.mobile = '';
				        }
				    }
				});
			},
			// 获取活动详情
			getActivitiesDetail() {
				let _this = this;
				let ajaxUrl = _this.$api.GetActivitiesDetail.url + '&key={activityid:' + _this.activityId +
					'&tdsourcetag=s_pcqq_aiomsg}';
				_this.$ajax2(_this.$api.GetActivitiesDetail, ajaxUrl, '获取活动详情', function(res) {
					_this.activityBody = res.data.body;
					// console.log(res.data.body.saleprice)
					if (!res.data.body.saleprice || res.data.body.saleprice == 0) {
						//没有价格或者价格为0
						_this.money = '0';
					} else {
						_this.money = res.data.body.saleprice;
					}
					_this.getAgencyDetail();
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
						if (res.data && res.data.data && res.data.data.length > 0) {
							_this.detailObj = res.data.data[0];
						}
					},
					true
				);
			},
			//获取验证码
			codebtn(){
				let _this = this;
				if (!this.tools.checkPhoneNum(_this.user.mobile)) {
					this.tools.toastShow('请正确输入手机号');
					return;
				}else{
					//获取验证码
					_this.component.getSMSCode(_this, _this.pageUrl, _this.user.mobile, _this.IP, "xcx-sms-fee");
				}
			},
			// 提交订单
			submitPay() {
				let _this = this;
				if (!this.tools.checkPhoneNum(_this.user.mobile)) {
					this.tools.toastShow('请正确输入手机号');
					return;
				} else if (!_this.checkbox) {
					this.tools.toastShow('请仔细阅读服务条款并同意');
					return;
				} else if(_this.phoneFlag2){//获取的微信手机号
					_this.vipLogin();
				}else if(_this.qrCode != ''){//自己输入的手机号
					_this.payFlag = false;
					_this.component.checkSMSCode(_this, false, _this.user.mobile, _this.qrCode,function(res){
						if(res.result == 1){//验证码验证通过
							_this.vipLogin();
						}else{
							_this.tools.toastShow('验证码输入错误');
							_this.payFlag = true;
						}
					});
				}else{
					_this.tools.toastShow('请输入验证码');
					return;
				}
			},
			//会员登录注册
			vipLogin(){
				let _this = this;
				uni.showLoading({
				    title: '请求中...'
				});
				if (!_this.user.uservipid) {
					console.log('注册登录开始')
					uni.request({ //会员登录注册
						url: 'https://api14data.jiaoyubao.cn/member/api/Member/loginRegister',
						method: 'POST',
						data: {
							mobile: _this.user.mobile,
							openid: _this.user.detail.openId,
							unionid: _this.user.detail.unionId,
							nickname: _this.user.detail.nickName,
							headimgurl: _this.user.detail.avatarUrl,
							way: 'miniprogram'
						},
						dataType: 'json',
						header: {
							'content-Type': 'application/x-www-form-urlencoded'
						},
						success: function(res) {
							if (res.data.result == 1) { //成功
								uni.setStorageSync('uservipid', res.data.extra);
								console.log('注册登录结束')
								_this.placeAnOrder();//下单
							} else { //失败
								uni.hideLoading();
								_this.payFlag = true;
								uni.showModal({
									title: "注册失败",
									content: "请联系教育宝平台客服400-601-2788",
									showCancel: false,
									confirmText: "确定"
								})
							}
						},
						fail: function(res) {}
					})
				} else {
					_this.placeAnOrder();//下单
				}
			},
			// 下单
			placeAnOrder(){
				let _this = this
				console.log('下单开始')
				let orderNumber = new Date().getTime() + '' + _this.formateNum(_this.random(1, 9999));
				_this.orderNumber = orderNumber;
				let datas = {
					action: '100000',
					os: '116',
					name: _this.user.detail.nickName,
					phone: _this.user.mobile,
					comid: _this.activityBody.comid,
					activityid: _this.activityBody.id,
					ip: _this.IP,
					url: _this.pageUrl,
					openid: _this.user.detail.openId,
					paycode: orderNumber,
					payprice: _this.money,
					payquantity: _this.minNum,
				};
				let MD5 = md5(JSON.stringify(datas));
				datas.md5 = MD5;
				datas.time = parseInt(new Date().getTime() / 1000);
				let keyMd5 = md5(_this.consts.KEY);
				// 各参数的值按顺序的串
				// let signStr = Object.values(datas).join("");//微信PC端有兼容性问题
				let signStr = '';
				for (let key in datas) {
					signStr += datas[key];
				}
				// md5 sign
				let signMd5 = md5(signStr + keyMd5);
				datas.sign = signMd5;
				// console.log(datas)
				uni.request({ //下单
					url: 'https://webapi.jiaoyubao.cn/postForm/',
					method: 'POST',
					data: JSON.stringify(datas),
					dataType: 'json',
					success: function(res) {
						if (res.data.status == 200) { //成功
							// console.log(res)
							if(_this.money != 0){//如果价格不为0
								// if(_this.platForm == 'PC'){
								// 	uni.showModal({
								// 		title: "请求支付失败",
								// 		content: "PC端小程序支付正在开发中，请使用手机打开，更多问题请联系教育宝平台客服400-601-2788",
								// 		showCancel: false,
								// 		confirmText: "确定"
								// 	})
								// }else{
									
								// }
								console.log('下单结束');
								console.log('发送支付请求');
								uni.request({ //发送支付请求
									url: 'https://api-weixin.jiaoyubao.cn/MiniProgram/apipay/pay.aspx',
									method: 'POST',
									data:{
										openid: _this.user.detail.openId,
										ordercode: _this.orderNumber,
										price: _this.money,
									},
									dataType: 'json',
									header: {
										'content-Type': 'application/x-www-form-urlencoded'
									},
									success: function(res) {
										if (res.data.errcode == 1) { //成功
										console.log('支付请求结束');
										console.log('调用微信支付窗口');
											uni.hideLoading();
											_this.payFlag = true;
											uni.requestPayment({
												provider: 'wxpay',
												// orderInfo:res.data.o.package,
												timeStamp: res.data.o.timeStamp,
												nonceStr: res.data.o.nonceStr,
												package: res.data.o.package,
												signType: 'MD5',
												paySign: res.data.o.paySign,
												success: function (res) {
													_this.countActivity();//添加购买人数
													uni.navigateTo({
														url: '/packageB/payresult/index?city=' + _this.cityEname + '&agency=' + _this.agencyEname + '&activityId=' + _this.activityId + '&flag=success',
													});
												},
												fail: function (err) {
													uni.navigateTo({
														url: '/packageB/payresult/index?city=' + _this.cityEname + '&agency=' + _this.agencyEname + '&activityId=' + _this.activityId + '&flag=error',
													});
												}
											});
										} else { //失败
											uni.hideLoading();
											_this.payFlag = true;
											uni.showModal({
												title: "请求支付失败",
												content: "请联系教育宝平台客服400-601-2788",
												showCancel: false,
												confirmText: "确定"
											})
										}
									},
									fail: function(res) {}
								})
								
							}else{//价格为0不走支付
								_this.countActivity();//添加购买人数
								uni.hideLoading();
								_this.payFlag = true;
								uni.navigateTo({
									url: '/packageB/payresult/index?city=' + _this.cityEname + '&agency=' + _this.agencyEname + '&activityId=' + _this.activityId + '&flag=success',
								});
							}
						} else { //失败
							uni.hideLoading();
							_this.payFlag = true;
							uni.showModal({
								title: "下单失败",
								content: "请联系教育宝平台客服400-601-2788",
								showCancel: false,
								confirmText: "确定"
							})
							
						}
					},
					fail: function(res) {}
				})
			},
			// 添加活动购买计数
			countActivity(){
				let _this = this;
				let ajaxUrl = _this.$api.SetActivity.url + '&key={kv:company_activity_sale,code:'+_this.activityBody.id+',userid:'+_this.IP+',expires:0}';
				_this.$ajax2(_this.$api.SetActivity, ajaxUrl, '活动购买人数+1', function(res) {
					if(res.data.result == '1'){}
				});
			},
		}
	}
</script>

<style lang="scss">
	// 每个页面公共css
	@import './index.scss';
</style>
