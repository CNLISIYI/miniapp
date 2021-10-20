<template>
	<view class="agency-page-container">
		<!-- header -->
		<!-- <header-ele v-if="detailObj" :detailobj="detailObj" title="" :navtabitemshow="navTabItemShow"></header-ele> -->
		<div class="m-fee-top flex-box bgfff">
			<p class="flex-1">直接了解更详情的学费信息</p>
			<text class="_a jyb-btn jyb-btn-blue m-jyb-call-btn" @click="makeTelPhone">立即咨询</text>
		</div>

		<!-- 真实成交学费数据 -->
		<div class="m-fee-container bgfff">
			<h1>真实成交学费数据</h1>
			<!-- 默认显示模糊涂层 -->
			<div class="m-fee-img" v-if="!isLogin"><img src="https://static.jiaoyubao.cn/images/mobile/xuefei-bg.png" alt="" /></div>
			<!-- 登录后显示 -->
			<div class="m-fee-inner" v-if="isLogin">
				<!-- 学费柱状图 -->
				<div class="m-fee-bar-box">
					<ul class="clearfloat" :style="isShowMore ? 'max-height: 100%;' : ''">
						<block v-for="(item, index) in transactionData" :key="index">
							<li :style="'width:' + (item.avgprice / maxAvgpriceNum) * 100 + '%;'">
								<p class="clearfloat">
									<em class="ellipsis-1 fl">{{ item.name }}</em>
									<span class="fr">{{ item.minprice }} / {{ item.avgprice }}</span>
								</p>
								<div class="m-fee-bar-outer"><div :style="'width:' + (item.minprice / item.avgprice) * 100 + '%;'" class="m-fee-bar-inner"></div></div>
							</li>
						</block>
					</ul>
					<div class="m-fee-bar-watch-more" v-if="transactionData.length > 5 && !isShowMore"><text class="_a" @click="showMoreData">展开</text></div>
					<div class="m-fee-bar-sign flex-box">
						<p class="m-fee-bar-lower flex-1 flex-box">
							<em></em>
							<span>最低学费(元)</span>
						</p>
						<p class="m-fee-bar-aver flex-1 flex-box">
							<em></em>
							<span>平均学费(元)</span>
						</p>
					</div>
				</div>

				<!-- 报名课程学费列表 -->
				<ul class="m-fee-list mtop30">
					<li class="flex-box" v-for="(item, index) in feeList" :key="index">
						<div class="m-fee-item-msg flex-1">
							<div class="clearfloat">
								<em class="fl">{{ item.user_name }}</em>
								<span class="fr">{{ item.service_price }}元</span>
							</div>
							<p>
								<em class="fontArial fl">{{ item.dt_baoming }}</em>
								<span>报名课程：{{ item.service_mc }}</span>
							</p>
						</div>
					</li>
				</ul>

				<pagination :total="pageTotal" :idx="pageIdx" v-if="pageTotal > 1" @receiveChild="changePageIdx"></pagination>
			</div>
		</div>
		<!-- 学费-默认显示 -->
		<div class="m-fee-mask" v-if="!isLogin"></div>
		<div class="m-fee-form" v-if="!isLogin">
			<p>验证手机号即可查看真实学费</p>
			<div class="m-fixed-form-inner m-fee-form-inner">
				<div class="jyb-form-group">
					<div class="jyb-form">
						<input type="number" class="jyb-input m-jyb-input-phone" v-model="phoneVal" placeholder="请输入您的手机号" />
					</div>
				</div>
				<!-- <div class="jyb-form-group jyb-form-large jyb-login-type">
					<div class="jyb-form jyb-form-has-btn jyb-form-code">
						<input type="text" class="jyb-input jyb-code-input" v-model="codeVal" placeholder="请输入图形验证码">
						<view class="jyb-btn font12 mobile-code-btn" hover-class="none" @click.stop="createCode">
							<image :src="'https://api14data.jiaoyubao.cn/genimage/?op=&key=ViewFee' + randomKey + '&code='" mode=""></image>
						</view>
					</div>
				</div> -->
				<div class="jyb-form-group jyb-form-large jyb-login-type">
					<div class="jyb-form jyb-form-has-btn jyb-form-code">
						<input type="number" class="jyb-input jyb-code-input" v-model="SMSCodeVal" placeholder="请输入短信验证码" />
						<button class="jyb-btn font12 SMS-code-btn count-down" hover-class="none" v-if="timer">{{ countDownNum }}s后重试</button>
						<button class="jyb-btn font12 SMS-code-btn" hover-class="none" @click.stop="getCodeFn" v-else>获取验证码</button>
					</div>
				</div>
			</div>
			<div class="m-fee-form-btns flex-box mtop20">
				<navigator hover-class="none" open-type="navigateBack" class="_a m-fee-form-cancel-btn flex-1">取消</navigator>
				<text class="_a m-fee-form-login-btn flex-1" @click="checkCodeFn">验证</text>
			</div>
		</div>

		<!--
			底部模块
		-->
		<!-- 面包屑 -->
		<!-- <bread-crumbs v-if="detailObj && classObj" :detailobj="detailObj" :classobj="classObj"></bread-crumbs> -->

		<!-- 通用底部 -->
		<view class="footer-ele-padding"><footer-ele></footer-ele></view>

		<!-- 拨打电话底部弹出层 -->
		<tel-phone v-if="detailObj && telPhonePopShow" :detailobj="detailObj" @telPhonePopHide="telPhonePopHide"></tel-phone>

		<!-- 预约/咨询 -->
		<footer-agency
			@handlerTelPhone="makeTelPhone"
			:hasfee="hasFeeData"
			:cityename="cityEname"
			:agencyename="agencyEname"
			v-if="navTabItemClass.length > 0 && navTabItemSchool.length > 0 && detailObj"
			:course="navTabItemClass"
			:campus="navTabItemSchool"
			pagename="class"
			:detailobj="detailObj"
			:isFeepage="isFeepage"
		></footer-agency>

		<online-talk></online-talk>
	</view>
</template>

<script>
import { footerMixin, navTabItemShowMixin, randomCodeMixin, ipGetMixin, recordTrackingMixin } from '../../common/js/mixins.js';
import { queryByAgency } from '../../common/js/url-monitor.js';
import dataArray from '../../common/data/data';
export default {
	mixins: [footerMixin, navTabItemShowMixin, randomCodeMixin, ipGetMixin, recordTrackingMixin],
	data() {
		return {
			cityEname: '',
			cityCode: '',
			agencyEname: '',

			isLogin: false,
			isFeepage: true,
			
			pageIdx: 1,
			pageTotal: 0,
			feeList: [],
			feeTotal: 0,
			transactionData: [],
			maxAvgpriceNum: 0,
			isShowMore: false,

			phoneVal: '',
			codeVal: '',
			SMSCodeVal: '',
			randomKey: 0,

			timer: '', // 定时器名字
			countDownNum: 60 // 倒计时初始值
		};
	},
	async onLoad(opts) {
		let _this = this;
		// console.log(opts);
		if (opts && JSON.stringify(opts) != '{}') {
			_this.cityEname = await queryByAgency(opts.city, opts.agency);

			_this.agencyEname = opts.agency;

			dataArray.cityArr.map(item => {
				if (item.ename == _this.cityename) {
					_this.cityCode = item.code;
				}
			});
		}
		_this.getAgencyFee();
		_this.getTransactionData();

		_this.getFooterMixin();
		_this.getNavTabItemShowMixin();

		let loginState = uni.getStorageSync('loginStateStart');
		// console.log('get loginStateStart');
		// console.log(loginState);
		if (loginState) {
			let nowTime = new Date().getTime();
			let diff = nowTime - loginState;
			// console.log(diff);
			if (diff < 1800000) {
				// 登录状态保存半小时
				_this.isLogin = true;
			}
		}
	},
	onShow() {
		let _this = this;
		// 微信分享到朋友圈功能
		// #ifdef MP-WEIXIN
		wx.showShareMenu({
			withShareTicket:true,
			menus:['shareAppMessage','shareTimeline']
		})
		// 用户授权手机号
		_this.phoneVal = uni.getStorageSync('userMobile') || '';
		if(_this.phoneVal) {
			_this.isLogin = true;
		}
		// #endif
	},
	onShareAppMessage(res) {
		let _this = this;
	},
	created() {},
	methods: {
		// 获取验证码
		getCodeFn() {
			let _this = this;
			_this.checkForm();
		},
		// 验证-提交表单
		checkCodeFn() {
			let _this = this;
			_this.checkForm('submit');
		},
		checkForm(typeStr) {
			let _this = this;
			if (!_this.tools.checkPhoneNum(_this.phoneVal)) {
				_this.tools.toastShow('请正确输入手机号');
				// _this.createCode();
				return false;
			}

			if (typeStr == 'submit') {
				if (_this.SMSCodeVal == '' && _this.SMSCodeVal.length != 4) {
					_this.tools.toastShow('请正确输入短信验证码');
					// _this.createCode();
					// _this.codeVal = '';
					return false;
				}
				// 验证短信验证码
				_this.component.checkSMSCode(_this, true, _this.phoneVal, _this.SMSCodeVal);
			} else {
				// if (_this.codeVal == '' && _this.codeVal.length != 4) {
				// 	_this.tools.toastShow('请正确输入图形验证码');
				// 	_this.createCode();
				// 	return false;
				// }
				// _this.checkCode(_this.codeVal, _this.randomKey, function(r){
				// if(r.data.result == 1){
				// 获取短信验证码
				_this.component.getSMSCode(_this, '/packageA/fee/index', _this.phoneVal, _this.IP);
				// }else{
				// 	_this.tools.toastShow('请正确输入图形验证码');
				// 	_this.createCode();
				// 	_this.codeVal = '';
				// 	return false;
				// }
				// })
			}
		},
		// 展示全部
		showMoreData() {
			let _this = this;
			// console.log('showMoreData');
			_this.isShowMore = true;
		},
		// 真是成交数据
		getTransactionData() {
			let _this = this;
			let ajaxUrl = _this.$api.getTransactionData.url + '&key={comename:' + _this.agencyEname + '}';
			_this.$ajax2(_this.$api.getTransactionData, ajaxUrl, '获取成交数据', function(res) {
				if (res != 'error' && res.data.data && res.data.data.length > 0) {
					// 判断 res.data.XXX
					_this.transactionData = res.data.data.filter(item => item.code.length <= 9);
					// 计算最大平均值
					let avgpriceArr = _this.transactionData.map(item => item.avgprice);
					let maxAvgprice = Math.max.apply(null, avgpriceArr);
					// console.log(avgpriceArr);
					// console.log(maxAvgprice);
					if (maxAvgprice > 1000) {
						_this.maxAvgpriceNum = Math.ceil(maxAvgprice / 1000) * 1000;
					} else {
						_this.maxAvgpriceNum = Math.ceil(maxAvgprice / 100) * 100;
					}
				} else {
					_this.tools.toastShow('暂无数据');
				}
			});
		},
		getAgencyFee() {
			let _this = this;
			let ajaxUrl = _this.$api.GetAgencyFee.url + '&key={comename:' + _this.agencyEname + ',pagesize:10,page:' + _this.pageIdx + '}';
			_this.$ajax2(
				_this.$api.GetAgencyFee,
				ajaxUrl,
				'获取学费信息',
				function(res) {
					if (res != 'error' && res.data.data && res.data.data.length > 0) {
						// 判断 res.data.XXX
						_this.feeList = res.data.data;
						_this.pageTotal = res.data.maxpage;
						_this.feeTotal = res.data.rec;
					} else {
						_this.tools.toastShow('暂无数据');
					}
				},
				true
			);
		},
		// 分页
		changePageIdx(res) {
			let _this = this;
			if (res == 'add') {
				_this.pageIdx += 1;
			} else {
				_this.pageIdx -= 1;
			}

			_this.getAgencyFee();
		}
	}
};
</script>

<style lang="scss">
// 每个页面公共css
@import './index.scss';
</style>
