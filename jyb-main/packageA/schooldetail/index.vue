<template>
	<view class="">
		<web-view :src="webUrl" @message="getWebviewMsg" :webview-styles="webviewStyles"></web-view>

		<div class="m-teacher-detail-js bgfff"><a class="m-module-title" href="javascript:;" title="">介绍</a>
			<dl class="clearfloat"><dt>教育背景：</dt>
				<dd>山东师范大学 音乐学键盘</dd>
			</dl>
			<dl class="clearfloat"><dt>所获荣誉：</dt>
				<dd>李斯特国际音乐节优秀指导教师，德国汉堡钢琴大赛优秀指导教师，第十届世界华人青年艺术节优秀指导教师，第五届KAWAI亚洲钢琴大赛优秀指导教师，第八届施坦威全国青少年钢琴比赛优秀指导教师</dd>
			</dl>
			<div>
				<!-- <img src="../img/info.png" alt=""> -->
				<p></p>
				<div class="cont-part">
					<div class="cont-title"></div>
					<div class="cont-editor"> 主攻钢琴&nbsp;</div>
				</div>
				<p></p>
			</div><span class="m-teacher-detail-line"></span>
		</div>
	</view>
</template>

<script>
import { recordTrackingMixin } from '../../common/js/mixins.js';
export default {
	mixins: [recordTrackingMixin],
		data() {
			return {
				webUrl: '', // https://m.jiaoyubao.cn/jn/edu/dazhixuexiao/campus_92.html
				webviewStyles: {
					progress: {
						color: '#1a8cff'
					}
				},
				shareTitle: '',
				shareContent: ','
			}
		},
		onLoad(opts) {
			let _this = this;
			// console.log(opts);
			if (opts && JSON.stringify(opts) != '{}') {
				_this.webUrl = opts.webUrl || `https://m.jiaoyubao.cn/${opts.city}/edu/${opts.agency}/campus_${opts.id}.html`;
			}
		},
		onShow() {
			// 微信分享到朋友圈功能
			// #ifdef MP-WEIXIN
			wx.showShareMenu({
				withShareTicket:true,
				menus:['shareAppMessage','shareTimeline']
			})
			// #endif
		},
		onShareAppMessage(res) {
			let _this = this;
			// console.log(res);

			return {
				title: _this.shareTitle,
				path: `/pages/schooldetail/index?webUrl=${res.webViewUrl}`,
				imageUrl: "https://static.jiaoyubao.cn/images/uniapp/share-logo.jpg",
				content: _this.shareContent,
			}
		},
		created() {

		},
		methods: {
			getWebviewMsg(e) {
				let _this = this;
				// console.log(e.detail.data[0].title);
				// console.log(e.detail.data[0].content);
				_this.shareTitle = e.detail.data[0].title;
				_this.shareContent = e.detail.data[0].content;
			}
		}
	}
</script>

<style>
</style>
