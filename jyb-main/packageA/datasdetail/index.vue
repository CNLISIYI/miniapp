<template>
	<view class="agency-page-container">
		<!-- header -->
		<!-- <header-ele v-if="detailObj" :detailobj="detailObj" title="" :navtabitemshow="navTabItemShow"></header-ele> -->

		<!-- 详情 -->
		<div class="m-knowledge-detail bgfff" v-if="datasDetail">
			<div class="m-knowledge-detail-top">
				<h1>{{ datasDetail.title }}</h1>
			</div>
			<div class="m-knowledge-detail-container" v-html="datasDetail.htmlContent"></div>
			<div class="m-knowledge-download" v-if="dataFilePath">
				<table>
					<thead>
						<tr>
							<th>文件名</th>
							<th class="set-width">文件大小</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{{ dataFileName }}</td>
							<td>{{ dataFileSize }}</td>
						</tr>
					</tbody>
				</table>
				<h3>下载地址</h3>
				<!-- <navigator :url="'../downloadfiles/index?path='+dataFilePath" hover-class="none"> -->
					<button class="jyb-btn" @click="downloadFiles">
						<img src="https://static.jiaoyubao.cn/images/mobile/icon-download.svg" alt="" />
						本地下载
					</button>
				<!-- </navigator> -->
			</div>
		</div>

		<!-- 相关资料 -->
		<div class="m-news-data m-knowledge-detail-data bgfff mtop10" v-if="otherDatas.length > 0">
			<a class="m-module-title" href="javascript:;">相关资料</a>
			<div class="m-news-data-container">
				<!-- 资料 -->
				<ul class="m-news-data-list">
					<li class="ellipsis-1" v-for="(item, index) in otherDatas" :key="index">
						<navigator hover-class="none" open-type="navigate" :url="`/packageA/datasdetail/index?id=${item.id}`" class="_a">
							{{ item.title }}
						</navigator>
					</li>
				</ul>
			</div>
		</div>

		<!--
			底部模块
		-->
		<!-- 面包屑 -->
		<!-- <bread-crumbs v-if="detailObj && classObj" :detailobj="detailObj" :classobj="classObj"></bread-crumbs> -->

		<!-- 通用底部 -->
		<view class="footer-ele-padding"><footer-ele></footer-ele></view>

		<online-talk></online-talk>
	</view>
</template>

<script>
// import { mapState } from 'vuex' // 注意别漏了引入
import { queryById } from '../../common/js/url-monitor.js';
import { footerMixin, navTabItemShowMixin, recordTrackingMixin } from '../../common/js/mixins.js';
export default {
	mixins: [footerMixin, navTabItemShowMixin, recordTrackingMixin],
	data() {
		return {
			cityEname: '',
			agencyEname: '',

			datasId: '280',
			datasDetail: '',
			otherDatas: [],
			datasContent: '',
			dataFilePath: '',
			dataFileName: '',
			dataFileSize: ''
		};
	},
	async onLoad(opts) {
		let _this = this;
		// console.log(opts);
		if (opts && JSON.stringify(opts) != '{}') {
			let resolveObj = await queryById("datasDetail", opts.city, opts.agency, opts.id);
			_this.cityEname = resolveObj.city;
			_this.agencyEname = resolveObj.agency;

			_this.datasId = opts.id;
		}
		_this.getFooterMixin();

		// #ifndef MP-BAIDU
		_this.getArticleDetail();
		// #endif
		// #ifdef MP-BAIDU
		_this.requestTask = new Promise((resolve, reject) => {
			_this.getArticleDetail(resolve);
		});
		// #endif
		_this.getOtherNews();
		_this.getNavTabItemShowMixin();
	},
	onShow() {
		let _this = this;
		// #ifdef MP-BAIDU
		_this.requestTask.then(requestData => {
			let titleStr = `${_this.datasDetail.title}-${_this.detailObj.name}-教育宝手机站`;
			swan.setPageInfo({
				title: titleStr,
				// keywords: ``,
				description: _this.datasContent,
				articleTitle: _this.datasDetail.title,
				// image: ['https://static.jiaoyubao.cn/images/uniapp/banner.jpg'],
				success: function() {
					// console.log('setPageInfo success');
				},
				fail: function(err) {
					// console.log('setPageInfo fail', err);
				}
			});
			uni.setNavigationBarTitle({
				title: titleStr
			});
		});
		// #endif
		

		// 微信分享到朋友圈功能
		// #ifdef MP-WEIXIN
		wx.showShareMenu({
			withShareTicket:true,
			menus:['shareAppMessage','shareTimeline']
		})
		// #endif

	},
	created() {},
	// 引入 mapState 时使用
	// computed: {
	// 	...mapState([ // 获取数据
	// 		"returnTopNum"
	// 	]),
	// },
	methods: {
		getArticleDetail(resolve) {
			let _this = this;
			let ajaxUrl = _this.$api.GetAgencyDatasDetail.url + '&key={knowledgeid:' + _this.datasId + '}';
			// console.log(ajaxUrl);
			_this.$ajax2(
				_this.$api.GetAgencyDatasDetail,
				ajaxUrl,
				'获取资料详情',
				function(res) {
					if (res != 'error' && res.data.body) {
						_this.datasDetail = res.data.body;
						if(res.data.body.knowledgefiles && res.data.body.knowledgefiles.length > 0){							
							let fileObj = res.data.body.knowledgefiles[0];
							_this.dataFilePath = fileObj.filepath;
							_this.dataFileName = fileObj.filename;
							_this.dataFileSize = _this.changeSize(fileObj.filesize);
						}
						_this.datasDetail.htmlContent = _this.tools
							.UnicodeToAscii(_this.tools.escape2Html(_this.datasDetail.content))
							.replace(/<p/gi, '<p class="_p"')
							.replace(/<img/gi, '<img class="_img"')
							.replace(/<table/gi, '<table class="_table"');
						let datasContentStr = _this.tools.delHtmlTag(_this.datasDetail.htmlContent);
						_this.datasContent = datasContentStr.substr(0, 100);
						// #ifdef MP-BAIDU
						if (resolve) {
							resolve();
						}
						// #endif
					}
					// if(res.data.body.knowledgefiles)
				},
				true
			);
		},
		getOtherNews() {
			let _this = this;
			let ajaxUrl = _this.$api.GetAgencyDatas.url + '&key={comename:' + _this.agencyEname + ',pagesize:6,page:1}';
			_this.$ajax2(_this.$api.GetAgencyDatas, ajaxUrl, '获取资料', function(res) {
				if (res != 'error' && res.data.data && res.data.data.length > 0) {
					_this.otherDatas = res.data.data.filter(item => item.id != _this.datasId);
				}
			});
		},
		downloadFiles() {
			let _this = this;
			uni.getSavedFileList({
				success(res) {
					res.fileList.forEach((val, key) => {
						// 删除存储的垃圾数据
						uni.removeSavedFile({
							filePath: val.filePath
						});
					});
				}
			});
			console.log(_this.dataFilePath)
			uni.showLoading({
			    title: '下载中...'
			});
			uni.downloadFile({
				url: 'https:' + _this.dataFilePath,
				success: function(res) {
					const tempFilePath = res.tempFilePath;
					// 保存文件
					uni.saveFile({
						tempFilePath,
						success: function(res) {
							const savedFilePath = res.savedFilePath;
							uni.hideLoading();
							// 打开文件
							wx.openDocument({
								filePath: savedFilePath,
								success: function(res) {
									_this.tools.toastShow('打开文档成功');
								}
							});
						},
						fail: function(err) {
							uni.hideLoading();
							_this.tools.toastShow('保存失败：', err);
						}
					});
				},
				fail: function(err) {
					_this.tools.toastShow('下载失败：', err);
				}
			});
		},
		changeSize(limit) {
			let size = '';
			if (limit < 0.1 * 1024) {
				//小于0.1KB，则转化成B
				size = limit.toFixed(2) + 'B';
			} else if (limit < 0.1 * 1024 * 1024) {
				//小于0.1MB，则转化成KB
				size = (limit / 1024).toFixed(2) + 'KB';
			} else if (limit < 0.1 * 1024 * 1024 * 1024) {
				//小于0.1GB，则转化成MB
				size = (limit / (1024 * 1024)).toFixed(2) + 'MB';
			} else {
				//其他转化成GB
				size = (limit / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
			}
			let sizeStr = size + ''; //转成字符串
			let index = sizeStr.indexOf('.'); //获取小数点处的索引
			let dou = sizeStr.substr(index + 1, 2); //获取小数点后两位的值
			if (dou == '00') {
				//判断后两位是否为00，如果是则删除00
				return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);
			}
			return size;
		}
	}
};
</script>

<style lang="scss">
// 每个页面公共css
@import './index.scss';
</style>
