<script>

export default {
	globalData: {
		// token: "Rj1/cheqhpRSNqWMdQU2ClcSmXWaBQQmVQO3jHAB5rMU2gkDHju1h4AF3GmaDtyY",
		token: "",
		session_key: "",
		phone: '15353388485',
	},
	onLaunch: function () {
		// 检查小程序版本更新
		this.updateProgram();
		// 获取登录状态

		// wx.login({
		// 	success: (responce) => {
		// 		this.getCode(responce.code)
		// 	},
		// 	fail: (error) => {
		// 		console.log("登录失败");
		// 	},
		// });
	},
	onShow: function () {},
	onHide: function () {},
	methods: {
		// 检查更新
		updateProgram() {
			// uni.getUpdateManager 微信小程序在 1.9.90 才可用，请注意兼容
			const updateManager = uni.getUpdateManager();

			updateManager.onCheckForUpdate(function (res) {
				// 请求完新版本信息的回调
				console.log("有无更新", res.hasUpdate);
			});

			updateManager.onUpdateReady(function () {
				uni.showModal({
					title: "更新提示",
					content: "新版本已经准备好，是否马上重启小程序？",
					success: function (res) {
						if (res.confirm) {
							// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
							updateManager.applyUpdate();
						}
					},
				});
			});

			updateManager.onUpdateFailed(function () {
				// 新的版本下载失败
				uni.showModal({
					// 新的版本下载失败
					title: "已经有新版本了哟~",
					content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~",
				});
			});
		},
		// 检查登录
		getCode(code) {
			let _this = this;
			// $apis.GetUserLog({
			// 	data: {
			// 		code,
			// 	},
			// 	success: (res) => {
			// 		console.log(res.body)
			// 		_this.$options.globalData.userinfo = res.body;
			// 		_this.$options.globalData.session_key = res.body.session_key;
			// 	},
			// 	fail: (err) => {
			// 		this.$tools.toastShow(err.msg);
			// 	},
			// });
		},
	},
};
</script>

<style lang="scss">
/*每个页面公共css */
@import "@/uni_modules/uview-ui/index.scss";
@import "./common/css/reset.css";
@import "./common/css/public.scss";
</style>
