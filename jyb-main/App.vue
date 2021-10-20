<script>
	export default {
		globalData: {
			unionid_wx: 74, // 没有代理的情况下，使用这个默认值
			unionid_bd: 0, // 没有代理的情况下，使用这个默认值  首次进入到机构首页 75
			tel400: 4000290997, // 通过接口获取不到的话，使用这个默认值
			g_userIdentity: ''
		},
		onLaunch: function() {
			let _this = this;
			// console.log('App Launch');

			// 检查小程序版本更新
			_this.updateProgram();

			//// 微信小程序环境 执行下面获取400电话代码
			// #ifdef MP-WEIXIN
				// 获取400电话
				let ajaxUrl = _this.$api.GetTel400.url + "&key={unionid:" + _this.$options.globalData.unionid_wx + "}";
				_this.$ajax2(_this.$api.GetTel400, ajaxUrl, '获取400电话', function(res) {
					if (res != 'error' && res.data.data && res.data.data.length > 0) {
						// console.log(res.data.result);
						console.log(res.data.data[0].u400);
						let newTel400 = res.data.data[0].u400;
						_this.$options.globalData.tel400 = newTel400.replace(/-/ig, '');
						console.log(_this.$options.globalData.tel400);
					}
				}, false);
			// #endif

			// 获取城市列表
			// _this.location.getCityList(_this);

			// #ifdef MP-BAIDU
							
				// 关注小程序
				if (swan.canIUse('showFavoriteGuide')) {
					// 最低支持版本 3.20.4
					swan.showFavoriteGuide({
						type: 'bar',
						content: '一键关注教育宝小程序',
						success(res) {
							// console.log('关注成功：', res);
						},
						fail(err) {
							// console.log('关注失败：', err);
						}
					})
				}
				// 获取400电话
				let ajaxUrl = _this.$api.GetTel400.url + "&key={unionid:" + _this.$options.globalData.unionid_bd + "}";
				_this.$ajax2(_this.$api.GetTel400, ajaxUrl, '获取400电话', function(res) {
					if (res != 'error' && res.data.data && res.data.data.length > 0) {
						// console.log(res.data.result);
						console.log(res.data.data[0].u400);
						let newTel400 = res.data.data[0].u400;
						_this.$options.globalData.tel400 = newTel400.replace(/-/ig, '');
						console.log(_this.$options.globalData.tel400);
					}
				}, false);
			// #endif
		},
		onShow: function() {
			// console.log('App Show'); 
		},
		onHide: function() {
			console.log('App Hide');
			uni.removeStorageSync('firstEntryPage');
		},
		methods: {
			// 检查更新
			updateProgram() {
				let _this = this;
				// uni.getUpdateManager 微信小程序在 1.9.90 才可用，请注意兼容
				const updateManager = uni.getUpdateManager()

				updateManager.onCheckForUpdate(function(res) {
					// 请求完新版本信息的回调
					console.log(res.hasUpdate)
				})

				updateManager.onUpdateReady(function() {
					uni.showModal({
						title: '更新提示',
						content: '新版本已经准备好，是否马上重启小程序？',
						success: function(res) {
							if (res.confirm) {
								// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
								updateManager.applyUpdate()
							}
						}
					})
				})

				updateManager.onUpdateFailed(function() {
					// 新的版本下载失败
					uni.showModal({ // 新的版本下载失败
                        title: '已经有新版本了哟~',
                        content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
                    })
				})
			},
		}
	}
</script>

<style lang="scss">
	// 每个页面公共css
	@import './common/css/m-reset.css';
	@import './common/css/jyb-ui.scss';
</style>
