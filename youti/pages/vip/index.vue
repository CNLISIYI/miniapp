<template>
	<view>
		<view class="header-box clearfix">
			<view class="img-box">
				<image :src="userdata.avatarUrl"></image>
			</view>
			<navigator
				url="../myinfo/index"
				class="txt-box"
				v-if="userdata.nickName"
				hover-class="none"
			>
				<view class="_h4">{{ userdata.nickName }}</view>
				<view class="_p">普通会员</view>
			</navigator>
			<view class="txt-box" v-else>
				<button
					type="default"
					class="_h4 login-btn"
					hover-class="none"
					open-type="getUserInfo"
					@getuserinfo="mpGetUserInfo"
				>
					点击登录
				</button>
				<view class="_p">普通会员</view>
			</view>
			<view class="vip-box">
				<image class="bg-img" src="../../static/mine/grid.jpg"></image>
				<view v-if="userdata.vip" class="clearfix">
					<view class="vip-l">
						<i class="iconfont">&#xe7c8;</i>
						<text class="_span">当前：黄金会员</text>
					</view>
					<view class="_p vl-p">您已成为最高会员，享受全部会员特权</view>
				</view>
				<view v-else>
					<view class="clearfix">
						<view class="vip-l">
							<i class="iconfont col-ora">&#xe72a;</i>
							<text class="_span">当前：普通会员</text>
						</view>
						<view class="vip-r">
							<text class="_span">VIP：黄金会员</text>
							<i class="iconfont">&#xe7c8;</i>
						</view>
					</view>
					<view class="progress-box">
						<u-line-progress
							:percentage="50"
							:showText="false"
							:activeColor="'#ffffff'"
							:inactiveColor="'#6B809B'"
							height="5"
						></u-line-progress>
					</view>
					<view class="_p">升级黄金会员可享受会员特权，超多享受等你体验！</view>
				</view>
				<view class="vip-bottom clearfix">
					<view class="fl">
						<text class="num">199</text><text class="txt">/年</text>
					</view>
					<view class="fr">
						<view class="vip-btn">立即升级</view>
						<view class="pop">
							超值哦
							<view class="sj"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="power-box">
			<view class="_h4">会员尽享八种尊贵特权</view>
			<u-scroll-list :indicator="false">
				<view class="scroll-list">
					<view class="_li">
						<i class="iconfont">&#xe726;</i>
						<view class="_h5">会员免单</view>
						<view class="_p">专家解读</view>
					</view>
					<view class="_li">
						<i class="iconfont">&#xe7da;</i>
						<view class="_h5">最低4折</view>
						<view class="_p">精选健康套餐</view>
					</view>
					<view class="_li">
						<i class="iconfont">&#xe730;</i>
						<view class="_h5">指导卡</view>
						<view class="_p">VIP健康指导</view>
					</view>
					<view class="_li">
						<i class="iconfont">&#xe7ab;</i>
						<view class="_h5">体测卡</view>
						<view class="_p">专属一对一体测</view>
					</view>
				</view>
			</u-scroll-list>
			<view class="_text">
				开通会员期间可享受多重福利，并配有1对1专业人士进行健康跟踪指导，有任何问题也可随时联系工作人员。</view
			>
		</view>
		<view class="phone-pop" v-if="getphoneshow">
			<view class="contain">
				<text class="_p">您的账户尚未绑定手机号</text>
				<text class="_p">需绑定后再进行其他操作</text>
				<button
					class="btn"
					lang="zh_CN"
					open-type="getPhoneNumber"
					@getphonenumber="getPhoneNumber"
				>
					微信授权绑定
				</button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			getphoneshow: false, //获取手机号弹窗
			userdata: {
				nickName: "",
				vip: 1,
			},
		};
	},
	components: {},
	onLoad() {
		this.userdata = uni.getStorageSync("userInfo");
	},
	methods: {
		//获取用户信息
		mpGetUserInfo(result) {
			let _this = this;
			console.log(result);
			if (result.detail.errMsg !== "getUserInfo:ok") {
				this.$tools.toastShow("授权失败");
				//用户点击了取消授权
				return;
			} else {
				this.userdata = result.detail.userInfo;
				uni.setStorageSync("userInfo", result.detail.userInfo);
				console.log(result.detail);
				this.getphoneshow = true;
			}
		},
		// 绑定手机号
		getPhoneNumber(e) {
			let _this = this;
			if (
				e.detail.errMsg == "getPhoneNumber:fail user deny" ||
				e.detail.errMsg == "getPhoneNumber:fail:user deny"
			) {
				_this.tools.toastShow("授权失败");
			} else {
				console.log(e.detail);
				uni.navigateTo({
					url: "../myinfo/index",
				});
				this.getphoneshow = false;
				// _this.$apis.GetReportData({
				// 	data: JSON.stringify({
				// 		encryptedData: e.detail.encryptedData,
				// 		iv: e.detail.iv,
				// 		session_key: getApp().globalData.session_key,
				// 	}),
				// 	success: (res) => {
				// 		_this.getphoneshow = false;
				// 		if (res.code == "200") {
				// 			let phonenum = JSON.parse(res.data.data).purePhoneNumber;
				// 			if (phonenum) {
				// 				_this.userdata.mobile = phonenum;
				// 				uni.setStorageSync("userInfo", _this.userdata);
				// 				uni.navigateTo({
				// 					url: "pages/mine/index",
				// 				});
				// 			}
				// 		} else {
				// 			_this.$tools.toastShow(res.msg);
				// 		}
				// 	},
				// 	fail: (err) => {
				// 		_this.$tools.toastShow(err.msg);
				// 	},
				// });
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
