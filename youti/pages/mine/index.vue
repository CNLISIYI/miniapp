<template>
	<view>
		<button
			type="default"
			class="sub-btn"
			hover-class="none"
			open-type="getUserInfo"
			@getuserinfo="mpGetUserInfo"
		>
			登录
		</button>
		<AppFooter></AppFooter>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	components: {},
	onLoad() {},
	methods: {
		//获取用户信息
		mpGetUserInfo(result) {
			let _this = this;
			if (result.detail.errMsg !== "getUserInfo:ok") {
				this.$tools.toastShow("授权失败");
				//用户点击了取消授权
				return;
			} else {
			}
		},
	},
};
</script>

<style lang="scss" scoped>
</style>
