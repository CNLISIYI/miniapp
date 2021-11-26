<template>
	<view class="bgf7">
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
				<view class="_p">点击编辑个人信息</view>
			</navigator>
			<view class="txt-box" v-else>
				<button
					type="default"
					class="_h4 login-btn"
					hover-class="none"
					open-type="getUserInfo"
					@getuserinfo="mpGetUserInfo"
				>
					未登录
					<view class="_p">点击授权登录</view>
				</button>
			</view>
			<view class="vip-p">普通会员</view>
		</view>
		<navigator class="vip-box" url="../vip/index">
			<view v-if="userdata.vip" class="clearfix">
				<view class="vip-l">
					<i class="iconfont">&#xe7c8;</i>
					<text class="_span">当前：黄金会员</text>
				</view>
				<view class="_p vl-p">点击查看尊享特权</view>
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
				<view class="_p">开通可享受会员特权，点击查看超多享受</view>
			</view>
		</navigator>
		<view class="mine-item">
			<text class="_h4">健康服务</text>
			<view class="menu-ul">
				<navigator
					url=""
					class="_li"
					v-for="(item, index) in menulist"
					:key="index"
				>
					<view class="icon-box">
						<view
							class="circle"
							:style="{ 'background-color': item.bg }"
						></view>
						<i class="iconfont" :style="{ color: item.color }">{{
							item.icon
						}}</i>
					</view>
					<text class="_p">{{ item.title }}</text>
				</navigator>
			</view>
		</view>
		<view class="mine-item">
			<text class="_h4">我的订单</text>
			<navigator url="" class="more"
				>查看全部<i class="iconfont">&#xe6f8;</i></navigator
			>
			<view class="order-ul">
				<navigator
					url=""
					class="_li"
					v-for="(item, index) in orderlist"
					:key="index"
				>
					<i class="iconfont">{{ item.icon }}</i>
					<text class="_p">{{ item.title }}</text>
				</navigator>
			</view>
		</view>
		<view class="avatar-box">
			<image src="../../static/home/avatar.png"></image>
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
		<AppFooter page="mine"></AppFooter>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userdata: {
				nickName: "",
				vip: 0,
			},
			menulist: [
				{ title: "家庭成员", bg: "#A28DE7", color: "#69B1E9", icon: "\ue731" },
				{ title: "健康记录", bg: "#45B780", color: "#45B780", icon: "\ue732" },
				{ title: "健康预约", bg: "#7197E7", color: "#6993E9", icon: "\ue72e" },
				{ title: "健康指导", bg: "#EF8182", color: "#9669E9", icon: "\ue730" },
				{ title: "地址管理", bg: "#EF9976", color: "#E97269", icon: "\ue768" },
			], //金刚区列表
			orderlist: [
				{ title: "待支付", icon: "\ue897" },
				{ title: "待收货", icon: "\ue937" },
				{ title: "已完成", icon: "\ue89a" },
				{ title: "已取消", icon: "\ue89e" },
			], //订单列表
			getphoneshow: false, //获取手机号弹窗
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
