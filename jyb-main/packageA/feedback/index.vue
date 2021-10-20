<template>
	<view class="form-maintain">
		<div class="m-common-container m-feedback-container flex-box-column">
			<!-- 通用头部 -->
			<main class="m-common-main" v-show="!isSucShow" catchtouchmove="doNothing">
				<textarea class="m-feedback-textarea" placeholder="请输入反馈内容…" placeholder-style="color:#808080;" v-model="feedText" focus="true"></textarea>
				<input class="m-feedback-input" type="tel" placeholder="为了方便回复，请留下手机号码" placeholder-style="color:#808080;" v-model="phoneNumber" @input="mobileInput" />
				<button class="m-jyb-btn-large m-jyb-btn-blue m-feedback-btn" @click="feedbackSubmit">提交</button>
			</main>
		</div>
		<!-- 提交成功 -->
		<div class="m-feedback-success flex-box-column" v-show="isSucShow">
			<span class="m-common-icon icon_check_block"></span>
			<span class="feedback-success-title mt20">提交成功</span>
			<span class="feedback-success-tips">感谢您的反馈！若有需要相关工作人员会与您联系，请保持手机通畅。</span>
			<navigator url="/pages/index/index" class="m-jyb-btn-large m-jyb-btn-link m-jyb-btn-blue mt15">回到教育宝首页</navigator>
			<button class="m-jyb-btn-large m-jyb-btn-blue-line mt15 m-feedback-return" @click="backToFeed">继续反馈</button>
		</div>
		
		<online-talk></online-talk>
	</view>
</template>

<script>
import { recordTrackingMixin } from '../../common/js/mixins.js';
export default {
	mixins: [recordTrackingMixin],
	data() {
		return {
			webUrl: '', // https://m.jiaoyubao.cn/feedback/
			webviewStyles: {
				progress: {
					color: '#1a8cff'
				}
			},
			shareTitle: '',
			shareContent: ',',
			isSucShow: false,
			feedText: '',
			phoneNumber: ''
		};
	},
	onLoad(opts) {
		// /packageA/feedback/index?feedback=1
		let _this = this;
		// console.log(opts);
		if (opts && JSON.stringify(opts) != '{}') {
			_this.webUrl = opts.webUrl || 'https://m.jiaoyubao.cn/feedback/';
		}
		let pages = getCurrentPages(); // 获取页面栈
		pages.map((item, index) => {
			if( item.route == 'pages/index/index') {
				item.$vm.localClass = [];
			}
		});
	},
	onShareAppMessage(res) {
		let _this = this;
		// console.log(res);
		return {
			title: _this.shareTitle,
			path: `/packageA/feedback/index?webUrl=${res.webViewUrl}`,
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
		feedbackSubmit(event) {
			let _this = this;
			let isPhoneRight = _this.tools.checkPhoneNum(_this.phoneNumber);
			let P_Tongji_SessionID = P_Tongji_SessionID || '';
			// 提交成功之后显示
			if (_this.feedText) {
				if (isPhoneRight) {
					uni.request({
						url: 'https://m.jiaoyubao.cn/NationHandler.ashx',
						data: {
							action: 'feedback',
							phone: _this.phoneNumber,
							url: encodeURIComponent(_this.webUrl),
							// cookieid: P_Tongji_SessionID,
							cookieid: getApp().globalData.g_userIdentity,
							unionid: getApp().globalData.unionid,
							content: encodeURIComponent(_this.feedText),
							rand: Math.random()
						},
						success: function(res) {
							if (res.statusCode == '200') {
								_this.tools.loadingShow('提交中');
								setTimeout(function() {
									_this.tools.loadingHide();
									_this.feedText = '';
									_this.phoneNumber = '';
									_this.isSucShow = true;
								}, 1500);
							} else {
								_this.tools.toastShow('提交失败，发生未知异常');
							}
						},
						dataType: JSON
					});
				}
				if (isPhoneRight == false) {
					_this.tools.toastShow('请输入正确的手机号');
				}
			}
			// 提交之前，判断输入内容的正确性3
			else {
				_this.tools.toastShow('反馈内容不能为空');
			}
		},
		backToFeed() {
			this.isSucShow = false;
			this.feedText = '';
			this.phoneNumber = '';
		},
		naviBack() {
			uni.navigateBack({
				delta: 1
			});
		},
		mobileInput(e) {
			let _this = this;
			_this.phoneNumber = e.detail.value;
		}
	}
};
</script>

<style lang="scss">
@import '../../common/css/jyb-ui.scss';
@import './index.scss';
</style>
