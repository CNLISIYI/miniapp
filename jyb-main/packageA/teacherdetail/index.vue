<template>
	<view class="agency-page-container">
		<!-- <web-view :src="webUrl" @message="getWebviewMsg" :webview-styles="webviewStyles"></web-view> -->
		<scroll-view scroll-y="true" class="scroll-Y" @scroll="agencyPageScroll" :scroll-top="scrollTop" scroll-with-animation="true" enable-back-to-top="true">
			<div :class="['m-teacher-detail-container', scrollTop44 || telPhonePopShow ? '' : 'm-teacher-detail-transition']">
				<!-- header -->
				<!-- <header-ele v-if="detailObj" :detailobj="detailObj" title="" :navtabitemshow="navTabItemShow"></header-ele> -->
				<div class="m-teacher-detail-intro bgfff br4" v-if="teacherObj">
					<div class="m-teacher-detail-header">
						<img class="_img" alt="" :src="'https:'+teacherObj.photo" style="display: block;"></div>
					<h2>{{teacherObj.name}}</h2>
					<p v-if="teacherObj.labelStr">风格：{{teacherObj.labelStr}}</p>
					<ul class="flex-box">
						<li v-if="teacherObj.subject">
							<h3>{{teacherObj.subject}}</h3><span>科目</span>
						</li>
						<li v-if="teacherObj.years">
							<h3>{{teacherObj.years}}年</h3><span>教龄</span>
						</li>
						<li v-if="teacherObj.products.length > 0">
							<h3>{{teacherObj.products.length}}</h3><span>课程</span>
						</li>
					</ul>
				</div>
				<ul class="jyb-tab jyb-tab-style1 jyb-tab-allowclick clearfloat" >
					<li :class="clickIdx == 0 ? 'jyb-tab-cur' : ''" @click="jumpIntro"><text class="_a">介绍</text></li>
					<li :class="clickIdx == 1 ? 'jyb-tab-cur' : ''" @click="jumpClass" v-if="teacherClasses.length > 0"><text class="_a" >课程</text></li>
				</ul>
			</div>
			<!-- 介绍 -->
			<div class="m-teacher-detail-js bgfff"><a class="m-module-title" href="javascript:;" title="">介绍</a>
				<dl class="clearfloat" v-if="teacherObj.educationStr">
					<dt>教育背景：</dt>
					<dd>{{teacherObj.educationStr}}</dd>
				</dl>
				<dl class="clearfloat" v-if="teacherObj.honorStr">
					<dt>所获荣誉：</dt>
					<dd>{{teacherObj.honorStr}}</dd>
				</dl>
				<div class="main-attack" v-if="teacherObjMainAttack">{{ tools.UnicodeToAscii(teacherObjMainAttack) }}</div>
				<span class="m-teacher-detail-line"></span>
			</div>

			<!-- 课程 -->
			<div class="m-class m-teacher-detail-kc bgfff" v-if="teacherClasses.length > 0">
				<a class="m-module-title" href="javascript:;" title="">课程({{teacherClasses.length}})</a>

				<class-item type="left-right" :cityename="cityEname" :agencyename="agencyEname" :classes="teacherClasses"></class-item>
			</div>

			<!-- 热门老师 -->
			<div class="m-html-teacher m-detail-teacher bgfff mtop10">
				<a class="m-module-title" href="javascript:;" title="">热门老师</a>

				<teacher-item type="left-right" :cityename="cityEname" :agencyename="agencyEname" :teachers="teachers"></teacher-item>
			</div>

			<!--
				底部模块
			-->
			<!-- 面包屑 -->
			<!-- <bread-crumbs v-if="detailObj && classObj" :detailobj="detailObj" :classobj="classObj"></bread-crumbs> -->

			<!-- 通用底部 -->
			<view class="footer-ele-padding">
				<footer-ele></footer-ele>
			</view>

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
				pagename="teacherdetail"
				:detailobj="detailObj"
				:usermobile="usermobile">
			</footer-agency>

		</scroll-view>
		
		<online-talk></online-talk>

	</view>
</template>

<script>
	import { footerMixin, agencyTeachersMixin, teacherClassesMixin, navTabItemShowMixin, recordTrackingMixin } from '../../common/js/mixins.js';
	import { getAgencyParam } from '../../common/js/url-monitor.js';
	export default {
		mixins: [footerMixin, agencyTeachersMixin, teacherClassesMixin, navTabItemShowMixin, recordTrackingMixin],
		data() {
			return {
				// webUrl : '', // https://m.jiaoyubao.cn/jn/edu/dazhixuexiao/teacher_3173.html
				// webviewStyles: {
				//     progress: {
				//         color: '#1a8cff'
				//     }
				// },
				// shareTitle: '',
				// shareContent : ','

				cityEname: '',
				agencyEname: '',
				teacherId: 4831,
				scrollTop44: false,
				teacherObj: '',
				teacherObjMainAttack: '',

				teacherFilter: true,

				teacherProducts:[],

				clickIdx:0,
				scrollTop: 0,
				baseEleHeight: 290,
				jsEleHeight:0,
				usermobile: ''
			}
		},
		async onLoad(opts) {
			let _this = this;
			console.log(opts);
			if (opts && JSON.stringify(opts) != '{}') {
				_this.teacherId = opts.id;
				let resolveObj = await getAgencyParam("teacherDetail", opts.city, opts.agency, opts.id);
				
				_this.cityEname = resolveObj.city,
				_this.agencyEname = resolveObj.agency;

			}
			_this.getFooterMixin();

			// #ifndef MP-BAIDU
			_this.getTeacherDetail();
			// #endif
			// // #ifdef MP-BAIDU
			// _this.requestTask = new Promise((resolve, reject) => {
			// 	_this.getTeacherDetail(resolve);
			// 	// resolve();
			// });
			// // #endif
			_this.getAgencyTeachersMixin();
			_this.getNavTabItemShowMixin();
			
			// #ifdef MP-BAIDU
				await _this.getTeacherDetail();
				_this.setPageInfoFn();
			// #endif
		},
		onShow() {
			// 微信分享到朋友圈功能
			// #ifdef MP-WEIXIN
			wx.showShareMenu({
				withShareTicket:true,
				menus:['shareAppMessage','shareTimeline']
			})
			this.usermobile = uni.getStorageSync('userMobile') || '';
			// #endif
		},
		onShareAppMessage(res) {
			let _this = this;
			// // console.log(res);

			// return {
			// 	title: _this.shareTitle,
			// 	path: `/packageA/teacherdetail/index?webUrl=${res.webViewUrl}`,
			// 	imageUrl : "https://static.jiaoyubao.cn/images/uniapp/share-logo.jpg",
			// 	content : _this.shareContent,
			// }
		},
		created() {
			let _this = this;

		},
		methods: {
			// getWebviewMsg(e){
			// 	let _this = this;
			// 	// console.log(e.detail.data[0].title);
			// 	// console.log(e.detail.data[0].content);
			// 	_this.shareTitle = e.detail.data[0].title;
			// 	_this.shareContent = e.detail.data[0].content;
			// }
			setPageInfoFn(){
				let _this = this;
				// #ifdef MP-BAIDU
				// _this.requestTask.then(requestData => {
					let titleStr = `【${_this.teacherObj.name}】${_this.detailObj.name}${_this.teacherObj.name}老师-教育宝手机站`;
					swan.setPageInfo({
						title: titleStr,
						keywords: `橙果${_this.teacherObj.name},${_this.detailObj.name}${_this.teacherObj.name}`,
						description: `教育宝为您提供${_this.detailObj.name}${_this.teacherObj.name}老师信息，您可以查询到${_this.teacherObj.name}老师的课程安排、开课时间、学员评价等信息。`,
						// articleTitle: _this.newsDetail.title,
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
				// })
				// #endif
			},

			agencyPageScroll: function(e) {
				let _this = this;
				if(e.detail.scrollTop > 44){
					_this.scrollTop44 = true;
				}else{
					// console.log(e);
					_this.scrollTop44 = false;
				}
				if(e.detail.scrollTop > 300){
					_this.clickIdx = 1;
				}else{
					_this.clickIdx = 0;
				}
			},
			jumpIntro(){
				let _this = this;
				_this.scrollTop = _this.baseEleHeight;
				_this.clickIdx = 0;
			},
			jumpClass(){
				let _this = this;
				_this.scrollTop = _this.baseEleHeight + _this.jsEleHeight;
				_this.clickIdx = 1;
			},
			resetRenderHeight(){
				let _this = this;
				setTimeout(() => {
					let query = uni.createSelectorQuery();
					query.select('.m-teacher-detail-js').boundingClientRect(rect=>{
					  let height = rect.height;
					  // console.log("height");
					  // console.log(height);
					  _this.jsEleHeight = height;
					}).exec();
				},3000)
			},
			getTeacherDetail(){
				let _this = this;

				return new Promise(resolve => {
					let ajaxUrl = _this.$api.GetTeacherDetail.url + "&key={teacherid:" + _this.teacherId + "}";
					_this.$ajax2(_this.$api.GetTeacherDetail, ajaxUrl, '获取老师详情', function(res) {
						if(res != 'error' && res.data.body){ // 判断 res.data.XXX
							// console.log(res.data.body);
							_this.teacherObj = res.data.body;
							let subject = _this.teacherObj.teacherclass.filter(o => o.jb == 3)[0].name || '';
							let years = Number((new Date()).getFullYear()) - Number(_this.teacherObj.workstartyear) || '';
							let honorStr = _this.teacherObj.honor.map(o => o.name).join("，") || '';
							let educationStr = _this.teacherObj.education.map(o => o.schoolname + ' ' + o.special).join("，") || '';
							let labelStr = _this.teacherObj.label.map(o => o.name).join("，") || '';
							let htmlStr = _this.tools.escape2Html(_this.teacherObj.content) || '';
							let mainAttack = _this.tools.delHtmlTag(htmlStr) || '';
					
							_this.teacherObj.subject = subject;
							_this.teacherObj.years = years;
							_this.teacherObj.honorStr = honorStr;
							_this.teacherObj.educationStr = educationStr;
							_this.teacherObj.labelStr = labelStr;
							_this.teacherObj.mainAttack = mainAttack;
							_this.teacherObjMainAttack = mainAttack;
					
							if(_this.teacherObj.products.length > 0){
								_this.teacherProducts = _this.teacherObj.products;
								_this.getTeacherClasses();
							}
							// // #ifdef MP-BAIDU
							// 	if(resolve){
							resolve();
							// 	}
							// // #endif
							_this.resetRenderHeight();
						}else{
							_this.tools.toastShow("暂无数据");
						}
					}, true);
				})

			},
			// 老师筛选
			handleTeacherFilter(){
				let _this = this;
				_this.teachers = _this.teachers.filter(item => item.id != _this.teacherObj.id && item.name != _this.teacherObj.name).slice(0, 3);
			},

		}
	}
</script>

<style lang="scss">
	@import './index.scss';
</style>
