<template>
	<view>
		<!-- 点评金首页 -->
		<div class="page-container" v-show="isMainshow" catchtouchmove="doNothing">
			<img class="page-title" src="https://static.jiaoyubao.cn/images/uniapp/ping_image/title.png" />
			<img class="xiaoren" src="https://static.jiaoyubao.cn/images/uniapp/ping_image/xiaoren.png" />
			<img class="hbao-yu" src="https://static.jiaoyubao.cn/images/uniapp/ping_image/yuansu.png" />
			<!-- 领取规则和咨询 -->
			<ul class="get-gift">
				<li class="get-rule"><a @click="isMainshow = false" hover-class="none">领取规则</a></li>
				<li class="get-asking"><a url="plugin://myPlugin/chat" hover-class="none">领取咨询</a></li>
			</ul>
			<!-- 申领红包 -->
			<div class="page-main">
				<div class="main-top">
					<div class="main-topbox clearfloat">
						<div class="topbox-logo"><img src="https://static.jiaoyubao.cn/images/uniapp/ping_image/logo.png" alt /></div>
						<div class="topbox-t">点评立即获得</div>
						<div class="topbox-m">随机红包</div>
						<view class="news-list" v-if="isaniok">
							<view class="firtotop">{{ listArr[index] }}</view>
							<view class="sectofir">{{ listArr2[index] }}</view>
							<view class="thitosec">{{ listArr3[index] }}</view>
							<view class="fortothi">{{ listArr4[index] }}</view>
						</view>
						<view class="news-list" v-if="!isaniok">
							<view>{{ listArrCopy[0] }}</view>
							<view>{{ listArrCopy[1] }}</view>
							<view>{{ listArrCopy[2] }}</view>
							<view>{{ listArrCopy[3] }}</view>
						</view>
					</div>
				</div>
			</div>
			<!-- 红包底部 -->
			<div class="main-bottom">
				<div class="bg-wan"><img src="https://static.jiaoyubao.cn/images/uniapp/ping_image/bg1.png" alt /></div>
				<div class="bg-xian">
					<div class="bottom-box">
						<div class="bottom-title">
							<hr />
							<span>点评金领取流程</span>
							<hr />
						</div>
						<div class="get-process clearfloat">
							<ul>
								<li>
									<div class="process-img"><img src="https://static.jiaoyubao.cn/images/uniapp/ping_image/liucheng-1.png" alt /></div>
									<span>填写联系方式</span>
								</li>
								<li>
									<div class="process-img"><img src="https://static.jiaoyubao.cn/images/uniapp/ping_image/liucheng-2.png" alt /></div>
									<span>填写评价</span>
								</li>
								<li>
									<div class="process-img"><img src="https://static.jiaoyubao.cn/images/uniapp/ping_image/liucheng-3.png" alt /></div>
									<span>关注公众号</span>
								</li>
								<li>
									<div class="process-img"><img src="https://static.jiaoyubao.cn/images/uniapp/ping_image/liucheng-4.png" alt /></div>
									<span>领红包</span>
								</li>
							</ul>
						</div>
						<div class="get-now-box">
							<!-- #ifdef MP-WEIXIN -->
							<button v-if="user.mobile" class="get-now" @click="openGetPop">马上申领</button>
							<button v-else open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" class="get-now" @click="openGetPop">马上申领</button>
							<!-- #endif -->
							<!-- #ifndef MP-WEIXIN -->
							<button class="get-now" @click="openGetPopBD">马上申领</button>
							<!-- #endif -->
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 领取规则 -->
		<div class="rule-page" v-if="!isMainshow" catchtouchmove="doNothing">
			<div class="rule-box">
				<a hover-class="none" class="close-rule" @click="isMainshow = true"><i class="icon-cross-block"></i></a>
				<div class="rule-title">
					<hr />
					<span>活动规则</span>
					<hr />
				</div>
				<ul>
					<i></i>
					<li>请确认您曾通过本站与认证机构取得首次联系；</li>
					<i></i>
					<li>请确认您已在本站指定网点报名缴费，并在报名90日内申领点评奖金；</li>
					<i></i>
					<li>教育宝平台将在合作机构审核确认后7个工作日内向您的微信账户付款，奖金将根据实际报名学费进行核算。</li>
				</ul>
				<div class="rule-bottom">
					<h3>咨询问题或查询申领状态请点击</h3>
					<a url="../../packageA/feedback/index" class="get-state" hover-class="none">这里</a>
				</div>
				<p class="rule-tell">或致电：400-601-2788(09:00-17:00）</p>
			</div>
		</div>

		<!-- 申领联系方式 -->
		<div class="input-pop" v-if="isGetshow">
			<div class="pop-main">
				<ul>
					<li><h2>联系方式</h2></li>
					<li class="pop-phone"><input type="number" placeholder="请输入手机号码" v-model="user.mobile" maxlength="11" /></li>
					<hr />
					<!-- <li class="pop-yan image-yan">
						<input type="text" placeholder="输入图中验证码" v-model="user.imageCode" />
						<button hover-class="none" class="send-yan" @click="imageYan"><image :src="imageYanSrc"></image></button>
					</li>
					<hr /> -->
					<li class="pop-yan">
						<input type="number" placeholder="输入短信验证码" v-model="user.code" maxlength="6" />
						<button hover-class="none" class="send-yan" @click="sendYan" :disabled="yanDisable">{{ sendYantext }}</button>
					</li>
					<hr />
				</ul>
				<div class="pop-btn">
					<button class="pop-back" @click="isGetshow = false">返回</button>
					<!-- <button class="pop-now" @click="getHbNow">马上申领</button> -->
					<button class="pop-now" @click="getHbNow">马上申领</button>
				</div>
				<div class="pop-p-error"><span class="error-text"></span></div>
			</div>
		</div>
	</view>
</template>

<script>
import { ipGetMixin, recordTrackingMixin } from '../../common/js/mixins.js';
export default {
	mixins: [ipGetMixin, recordTrackingMixin],
	data() {
		return {
			webUrl: '', // https://ping.jiaoyubao.cn/m/
			webviewStyles: {
				progress: {
					color: '#1a8cff'
				}
			},
			shareTitle: '',
			shareContent: ',',
			isMainshow: true,
			isGetshow: false,
			user: {
				mobile: '',
				code: '',
				imageCode: ''
			},
			sendYantext: '发送验证码',
			usersName: [
				'赵',
				'钱',
				'孙',
				'李',
				'周',
				'吴',
				'郑',
				'王',
				'冯',
				'陈',
				'褚',
				'蒋',
				'卫',
				'沈',
				'韩',
				'杨',
				'朱',
				'秦',
				'尤',
				'许',
				'何',
				'吕',
				'施',
				'张',
				'孔',
				'曹',
				'严',
				'华',
				'金',
				'魏',
				'陶',
				'姜',
				'戚',
				'谢',
				'邹',
				'喻'
			],
			usersMoney: [9.9, 19.9, 29.9, 39.9, 49.9, 59.9, 69.9, 79.9, 89.9, 99.9],
			listArr: ['郭**获得了9.9元奖金', '李**获得了29.9元奖金', '赵**获得了99.9元奖金', '钱**获得了39.9元奖金'],
			listArr2: [],
			listArr3: [],
			listArr4: [],
			listArrCopy: ['李**获得了29.9元奖金', '赵**获得了99.9元奖金', '钱**获得了39.9元奖金', '郭**获得了9.9元奖金'],
			newList: [],
			index: 0,
			yanDisable: false,
			successUrl: '',
			imageYanSrc: '',
			isaniok: true,
			resObj: {},
			touchStartTime: '',
			touchEndTime: ''
		};
	},
	onLoad(opts) {
		// /pages/ping/index?ping=1
		let _this = this;
		// console.log(opts);
		if (opts && JSON.stringify(opts) != '{}') {
			_this.webUrl = opts.webUrl || 'https://ping.jiaoyubao.cn/m/';
		}
		let pages = getCurrentPages(); // 获取页面栈
		pages.map((item, index) => {
			if (item.route == 'pages/index/index') {
				item.$vm.localClass = [];
			}
		});
		_this.isaniok = false;
		_this.listTimerOut();
	},
	onShow() {
		uni.hideLoading();
		// 微信分享到朋友圈功能
		// #ifdef MP-WEIXIN
		wx.showShareMenu({
			withShareTicket: true,
			menus: ['shareAppMessage', 'shareTimeline']
		});
		// 获取用户手机号
		this.user.mobile = uni.getStorageSync('userMobile') || '';
		// #endif
	},
	onShareAppMessage(res) {
		let _this = this;
		// console.log(res);
		return {
			title: _this.shareTitle,
			path: `/pages/ping/index?webUrl=${res.webViewUrl}`,
			imageUrl: 'https://static.jiaoyubao.cn/images/uniapp/share-logo.jpg',
			content: _this.shareContent
		};
	},
	created() {},
	methods: {
		getPhoneNumber(e) {
			let _this = this;
			if (e.detail.errMsg == 'getPhoneNumber:fail user deny' || e.detail.errMsg == 'getPhoneNumber:fail:user deny') {
				_this.tools.toastShow('授权失败');
				_this.isGetshow = true;
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
						_this.user.mobile = JSON.parse(res.data.data).purePhoneNumber;
						uni.setStorageSync('userMobile', _this.user.mobile);
						_this.userLoginWithPhone();
					},
					fail: function(res) {}
				});
			}
		},
		getWebviewMsg(e) {
			let _this = this;
			_this.shareTitle = e.detail.data[0].title;
			_this.shareContent = e.detail.data[0].content;
		},
		listTimerOut(e) {
			let _this = this;
			for (var i = 0; i < 35; i++) {
				_this.newList[i] = `${_this.usersName[i]}**获得了${_this.usersMoney[parseInt(Math.random() * 10)]}元奖金`;
			}
			setInterval(function() {
				_this.listArr.push(_this.newList[parseInt(Math.random() * 35)]);
				_this.listArr2 = _this.listArr.slice(1);
				_this.listArr3 = _this.listArr2.slice(1);
				_this.listArr4 = _this.listArr3.slice(1);
				_this.index++;
				_this.isaniok = true;
			}, 2000);
		},
		openGetPop() {
			let _this = this;
			if (_this.user.mobile) {
				_this.isGetshow = false;
				_this.userLoginWithPhone();
			}
			// _this.imageYan();
		},
		openGetPopBD() {
			let _this = this;
			_this.isGetshow = true;
		},
		// 授权手机号后用户登陆
		userLoginWithPhone() {
			let _this = this;
			uni.request({
				url: 'https://ping.jiaoyubao.cn/api/ApiHandler.ashx',
				data: {
					action: 'StartEvaluate_MiniProgram',
					tel: _this.user.mobile,
					openid: uni.getStorageSync('userMobile') || '',
					unionid: uni.getStorageSync('userMobile') || ''
				},
				method: 'POST',
				header: {
					'content-type': 'application/x-www-form-urlencoded' // 默认值
				},
				success: function(res) {
					if (res.data.result == 1) {
						_this.resObj = JSON.parse(res.data.data);
						uni.showLoading({
							title: '正在获取订单'
						});
						_this.getUserId();
					} else {
						uni.hideLoading();
						_this.tools.toastShow(res.data.description);
					}
				},
				dataType: 'json'
			});
		},
		// 获取图形验证码
		// imageYan() {
		// 	let _this = this;
		// 	_this.imageYanSrc = 'https://api14data.jiaoyubao.cn/genimage/?op=&key=' + _this.generateRandomAlphaNum(7) + '&tdsourcetag=s_pcqq_aiomsg';
		// },
		// 验证图形验证码
		// validate() {
		// 	let _this = this;
		// 	let inputCode = _this.user.imageCode.toLowerCase();
		// 	if (inputCode.length <= 0) {
		// 		_this.tools.toastShow('请输入验证码');
		// 	} else {
		// 		uni.request({
		// 			url: _this.imageYanSrc + '&code=' + _this.user.imageCode,
		// 			success: function(res) {
		// 				// console.log(res);
		// 				if (res.data.result == 1) {
		// 					_this.sendMessage();
		// 					_this.yanTimerOut();
		// 					_this.yanDisable = true;
		// 				} else {
		// 					_this.tools.toastShow('验证码有误');
		// 					_this.imageYan(); //刷新验证码
		// 					_this.user.imageCode = '';
		// 				}
		// 			},
		// 			dataType: 'json'
		// 		});
		// 	}
		// },
		// 发送短信验证码接口
		sendMessage() {
			let _this = this;
			let urlstr = encodeURIComponent('/pages/ping/index');
			let ajaxUrl = `${_this.$api.PostMessageCode.url}&key={mobile:${_this.user.mobile},flag:jyb_user_login,length:4,url:${urlstr},ip:${_this.IP}}`;
			_this.$ajax2(
				_this.$api.PostMessageCode,
				ajaxUrl,
				'发送短信中',
				function(res) {
					if (res.data.result != 1) {
						_this.tools.toastShow('生成短信验证码失败');
					}
				},
				true
			);
		},
		// 用户登陆
		userLogin() {
			let _this = this;
			uni.request({
				url: 'https://ping.jiaoyubao.cn/api/ApiHandler.ashx',
				data: {
					action: 'StartEvaluate',
					tel: _this.user.mobile,
					code: _this.user.code,
					type: 'mini'
				},
				method: 'POST',
				header: {
					'content-type': 'application/x-www-form-urlencoded' // 默认值
				},
				success: function(res) {
					if (res.data.result == 1) {
						_this.resObj = JSON.parse(res.data.data);
						uni.showLoading({
							title: '正在获取订单'
						});
						_this.getUserId();
					} else {
						uni.hideLoading();
						_this.tools.toastShow(res.data.description);
					}
				},
				dataType: 'json'
			});
		},
		// 获取会员id
		getUserId() {
			let _this = this;
			uni.request({
				url: 'https://ping.jiaoyubao.cn/api/ApiHandler.ashx',
				data: {
					action: 'GetEvaluate',
					guid: _this.resObj.guid
				},
				method: 'POST',
				header: {
					'content-type': 'application/x-www-form-urlencoded' // 默认值
				},
				success: function(res) {
					if (res.data.result == 1) {
						_this.resObj.uid = JSON.parse(res.data.data).user_memberid;
						uni.navigateTo({
							url: `../pingstep1/index?mobile=${_this.user.mobile}&userid=${JSON.stringify(_this.resObj)}`
						});
					} else {
						_this.tools.toastShow(res.data.description);
					}
				},
				dataType: 'json'
			});
		},
		// 点击发送验证码
		sendYan() {
			let _this = this;
			let isTelRight = _this.tools.checkPhoneNum(_this.user.mobile);
			if (!isTelRight) {
				_this.tools.toastShow('请输入正确的手机号码');
			} else {
				_this.sendMessage();
				_this.yanTimerOut();
				_this.yanDisable = true;
			}
		},
		// 点击领取
		getHbNow(e) {
			let _this = this;
			let isTelRight = _this.tools.checkPhoneNum(_this.user.mobile);
			// if ((_this.user.imageCode = '')) {
			// 	_this.tools.toastShow('请输入图形验证码');
			// }
			if (!isTelRight) {
				_this.tools.toastShow('请输入正确的手机号码');
			}
			uni.showLoading({
				title: '正在验证'
			});
			_this.userLogin();
		},
		// 验证码定时器
		yanTimerOut() {
			var yantimer;
			let _this = this;
			if (yantimer) {
				clearInterval(yantimer);
			}
			var codeTime = 60;
			yantimer = setInterval(function() {
				_this.sendYantext = codeTime + 's后重发';
				codeTime--;
				if (codeTime < 0) {
					codeTime = 60;
					_this.sendYantext = '发送验证码';
					clearInterval(yantimer);
					_this.yanDisable = false;
				}
			}, 1000);
		}
		// 6位随机码
		// generateRandomAlphaNum(len) {
		// 	let rdmString = '';
		// 	for (
		// 		;
		// 		rdmString.length < len;
		// 		rdmString += Math.random()
		// 			.toString(36)
		// 			.substr(2)
		// 	);
		// 	return rdmString.substr(0, len);
		// }
	}
};
</script>

<style lang="scss">
@import 'index.scss';
</style>
