<template>
	<view class="agency-page-container">
		<!-- header -->
		<!-- <header-ele v-if="detailObj" :detailobj="detailObj" title="" :navtabitemshow="navTabItemShow"></header-ele> -->
		<!-- banner -->
		<div class="m-class-detail-banner bgfff" v-if="classDetail">
			<img class="_img m-class-imgbanner" :src="'https:'+classDetail.img">
		</div>
		<!-- detail info -->
		<div class="m-class-detail-info bgfff" v-if="classDetail">
			<h1 class="m-class-detail-title" v-if="classTitle">{{ tools.UnicodeToAscii(classTitle) }}</h1>
			<p class="m-class-detail-obj">{{classDetail.fitpeople}}</p>
			<div class="m-class-detail-course flex-box">
				<img class="_img" src="https://static.jiaoyubao.cn/images/mobile/list-cal.svg" alt="">
				<span class="_span flex-1">{{classDetail.class_mc}} · {{classDetail.banxing_mc}} · {{classDetail.timespan}}课时</span>
			</div>
			<div class="m-class-detail-price-activity">
				<dl class="m-class-detail-price clearfloat">
					<dt class="_dt fl">费用：</dt>
					<dd class="_dd fl">
						<view class="_a clearfloat m-jyb-call-btn" title="" @click="makeTelPhone">
							<!-- 有费用显示价格 -->
							<em class="_em fl" v-if="classDetail.price > 0">￥{{classDetail.price}}</em>
							<!-- 没有费用显示：一键咨询更多优惠信息 -->
							<img class="_img m-class-detail-zx fl" v-else src="https://static.jiaoyubao.cn/images/mobile/Group5.svg" alt="">
							<span class="_span fr">{{classDetail.service_num_dd}}人已咨询报名</span>
							<img class="_img m-class-detail-link-right" src="https://static.jiaoyubao.cn/images/mobile/icon-rightarrow.svg" alt="">
						</view>
					</dd>
				</dl>
				<dl class="m-other-activity-list clearfloat" v-if="activeList.length > 0">
					<dt class="_dt fl" style="position: absolute;">活动：</dt>
					<dd class="_dd fl" v-for="(item, index) in activeList" :key="index">
						<block v-if="item.activityversion && item.activityversion >= 2">
							<!-- 新活动 -->
							<navigator hover-class="none" class="_a newhd" title="" :url="'/packageB/activity/index?agency=' + agencyEname + '&activityId=' + item.id">
								<block v-if="item.activitycode == '012001001002'">
									<!-- 现金优惠 -->
									<span><text>{{item.saleprice}}</text>元</span>
									<p class="ellipsis-1">{{item.activityname}}</p>
								</block>
								<block v-else-if="item.activitycode == '012001001001'">
									<!-- 限时折扣 -->
									<span><text>{{item.discount}}</text>折</span>
									<p class="ellipsis-1">{{item.activityname}}</p>
								</block>
								<block v-else-if="item.activitycode == '012001002001'">
									<!-- 赠送活动 -->
									<span>赠送</span>
									<p class="ellipsis-1">{{item.activityname}}</p>
								</block>
								<block v-else-if="item.activitycode == '012001002003'">
									<!-- 其他活动 -->
									<span>0元</span>
									<p class="ellipsis-1">{{item.activityname}}</p>
								</block>
							</navigator>
						</block>
						<block v-else>
							<!-- 旧活动 -->
							<navigator hover-class="none" class="_a lowhd" title="" :url="'/packageA/agencyactivity/index?agency=' + agencyEname + '&activityId=' + item.id">
								<img class="m-activity-bg" src="https://static.jiaoyubao.cn/images/mobile/hd-bg.svg" alt="" />
								<font v-if="item.activitycode == '012001001002'">现金优惠</font>
								<font v-else-if="item.activitycode == '012001001001'">限時折扣</font>
								<font v-else>赠送活动</font>
								<span class="ellipsis-1 _span">{{ item.activityname }}</span>
								<!-- <img class="m-activity-link-right" src="https://static.jiaoyubao.cn/images/mobile/icon-rightarrow.svg" alt="" /> -->
							</navigator>
						</block>
					</dd>
						
				</dl>
				<!-- <dl class="m-class-detail-activity clearfloat">
					<dt class="_dt fl">活动：</dt>
					<dd class="_dd fl">
						<a class="_a clearfloat m-jyb-receive-quan-btn" href="javascript:;" title="">
							<img class="_img fl" src="https://static.jiaoyubao.cn/images/mobile/hd-bg.svg" alt=""><font class="_font">现金优惠</font><span class="_span fl ellipsis-1">课程参与年中大促全部课程促销优课程参与年中大促全部课程促销优...</span><img class="_img m-class-detail-link-right" src="https://static.jiaoyubao.cn/images/mobile/icon-rightarrow.svg" alt="">
						</a>
						<a class="_a clearfloat" href="javascript:;" title="">
							<img class="_img fl" src="https://static.jiaoyubao.cn/images/mobile/hd-bg.svg" alt=""><font class="_font">赠送活动</font><span class="_span fl ellipsis-1">预约试听赠送《雅思官方指南》</span>
						</a>
					</dd>
				</dl> -->
			</div>
		</div>
		<!-- 最近校区 -->
		<view class="class-detail-nearest mt10" v-if="nearSchool != ''">
			<nearest-campus :cityename="cityEname" :agencyename="agencyEname" :nearschool="nearSchool" @receiveMakeTelPhone="makeTelPhone"></nearest-campus>
		</view>
		<!-- 老师信息 -->
		<div class="m-class-teacher bgfff mtop10" v-if="teachers.length > 0">
			<a class="m-module-title" href="javascript:;" title="">老师信息</a>
			<ul>
				<li v-for="(item, index) in teachers" :key="index">
					<navigator hover-class="none" class="_a" :url="'/packageA/teacherdetail/index?id='+item.id" title="">
						<div class="m-class-teacher-info flex-box">
							<img class="m-class-teacher-header" :src="'https:'+item.photo" alt="">
							<div class="flex-1">
								<h3>{{item.name}}</h3>
								<span>{{item.subject}}·{{item.years}}年教龄</span>
							</div>
							<p>更多课程<img src="https://static.jiaoyubao.cn/images/mobile/icon-rightarrow.svg" alt=""></p>
						</div>
						<p class="m-class-teacher-intro">{{item.mainAttack}}</p>
					</navigator>
				</li>
			</ul>
		</div>
		<!-- 课程详情 -->
		<div class="m-class-feature  bgfff mtop10" v-if="classDetail && classDetail.demoNew">
			<a class="m-module-title" href="javascript:;" title="">课程详情</a>
			<div class="m-class-detail-box" :style="detailShowMore ? 'max-height:100%;' : 'max-height:400px;'" v-html="classDetail.demoNew"></div>
			<div class="m-class-detail-more" @click="showMoreDetail" v-show="detailMoreShow"><text class="_a">{{detailShowMore ? '收起' : '展开'}}</text></div>
		</div>
		<!-- 评价 -->
		<div class="m-evaluation m-class-evaluation bgfff mtop10" v-if="evals.length > 0">
			<navigator hover-class="none" :url="'/packageA/evaluation/index?agency='+agencyEname" class="_a m-module-title">学员评价({{detailObj.num_pj}})<img class="_img m-module-more fr" src="https://static.jiaoyubao.cn/images/mobile/icon-rightarrow.svg" alt=""></navigator>

			<pj-swiper-item :evaluations="evals" :cityename="cityEname" :agencyename="agencyEname"></pj-swiper-item>
		</div>
		<!-- 相关课程 -->
		<div class="m-class bgfff mtop10">
			<navigator hover-class="none" :url="'/pages/class/index?agency='+agencyEname" class="_a m-module-title">相关课程<img class="_img m-module-more fr" src="https://static.jiaoyubao.cn/images/mobile/icon-rightarrow.svg" alt=""></navigator>

			<class-item type="left-right" :cityename="cityEname" :agencyename="agencyEname" :classes="otherClasses"></class-item>
		</div>
		<!-- 小伙伴还看看了 -->
		<div class="m-class-other-watching bgfff mtop10">
			<text class="_a m-module-title">小伙伴还看了</text>
			<!-- Swiper -->
			<div class="swiper-container m-class-other-watching-list com-swiper-container-outer" style="height: 122px;">
				<div class="swiper-wrapper com-swiper-container flex-box" style="height: 140px;">
					<block v-for="(item, index) in otherWatching" :key="index">
						<navigator hover-class="none" :url="'/packageA/classdetail/index?agency=' + agencyEname + '&id=' + item.id" class="_a swiper-slide">
							<img :src="'https:'+item.img" alt="">
							<p>{{item.classname}}</p>
						</navigator>
					</block>
				</div>
			</div>
		</div>
		<!-- 接下来要看 -->
		<div class="m-next-recommend bgfff mtop10" v-if="false && industryObj">
			<a class="m-module-title" href="javascript:;" title="">接下来要看</a>
			<view class="m-next-recommend-swiper">
				<ul class="m-next-recommend-list clearfloat">
					<!-- 行业 -->
					<li class="_li">
						<navigator hover-class="none" :url="'/pages/agencylist/index?class='+industryObj.ename"  class="_a">{{detailObj.cityname}}{{industryObj.shortname}}培训</navigator>
					</li>
					<!-- 排行 -->
					<li class="_li" v-if="hasRanking">
						<!-- //m.jiaoyubao.cn/top/jn-shaoerbiaoyan/ -->
						<navigator hover-class="none" :url="'/pages/agencylist/index?class='+industryObj.ename" class="_a">{{detailObj.cityname}}{{industryObj.shortname}}培训排行</navigator>
					</li>
				</ul>
			</view>
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
			pagename="classdetail"
			:detailobj="detailObj"
			:usermobile="usermobile">
		</footer-agency>

		<online-talk></online-talk>
	</view>
</template>

<script>
	import { footerMixin, nearestSchoolMixin, agencyTeachersMixin, agencyEvalsMixin, agencyClassesMixin, ClassUnderCategoryMixin, industryAndRankingMixin, navTabItemShowMixin, recordTrackingMixin } from '../../common/js/mixins.js';
	import { queryById } from '../../common/js/url-monitor.js';
	export default {
		mixins: [footerMixin, nearestSchoolMixin, agencyTeachersMixin, agencyEvalsMixin, agencyClassesMixin, ClassUnderCategoryMixin, industryAndRankingMixin, navTabItemShowMixin, recordTrackingMixin],
		data() {
			return {
				cityEname: '',
				agencyEname: '',
				productId: '',
				activeList: [],
				classDetail: '',
				classTitle: '',
				detailShowMore: false, //'400px',

				detailMoreShow: true,
				usermobile: ''
			}
		},
		async onLoad(opts) {
			let _this = this;
			console.log(opts);
			if (opts && JSON.stringify(opts) != '{}') {
				let resolveObj = await queryById("classDetail", opts.city, opts.agency, opts.id);
				_this.cityEname = resolveObj.city;
				_this.agencyEname = resolveObj.agency;
				_this.productId = opts.id;

			}
			await _this.getFooterMixin();
			// #ifndef MP-BAIDU
			_this.getClassDetail();
			// #endif
			
			_this.getAgencyTeachersMixin(_this.productId);
			_this.getNearestSchoolMixin();
			_this.getAgencyEvalsMixin();
			_this.getAgencyClassesMixin();
			_this.getIndustryAndRankingMixin();
			_this.getNavTabItemShowMixin();
			
			// #ifdef MP-BAIDU
				await _this.getClassDetail();
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
		},
		created() {
			let _this = this;
			setTimeout(function(){
				_this.getClassUnderCategory();
			}, 2000)
		},
		methods: {
			setPageInfoFn(){
				let _this = this;
				let titleStr = `【${_this.detailObj.cityname}${_this.tools.UnicodeToAscii(_this.classTitle)}】${_this.detailObj.cityname}${_this.tools.UnicodeToAscii(_this.classTitle)}价格_${_this.detailObj.cityname}${_this.detailObj.nickname}-教育宝手机站`;
				swan.setPageInfo({
					title: titleStr,
					keywords: `${_this.detailObj.cityname}${_this.tools.UnicodeToAscii(_this.classTitle)},${_this.detailObj.cityname}${_this.tools.UnicodeToAscii(_this.classTitle)},${_this.detailObj.cityname}${_this.tools.UnicodeToAscii(_this.classTitle)}价格,${_this.detailObj.nickname}${_this.tools.UnicodeToAscii(_this.classTitle)}`,
					description: `教育宝推荐机构${_this.detailObj.name}提供${_this.detailObj.cityname}${_this.tools.UnicodeToAscii(_this.classTitle)}、${_this.detailObj.cityname}${_this.tools.UnicodeToAscii(_this.classTitle)}的学费价格、课程安排和口碑评价。此外还可以查询${_this.detailObj.cityname}${_this.tools.UnicodeToAscii(_this.classTitle)}多少钱，${_this.detailObj.cityname}${_this.tools.UnicodeToAscii(_this.classTitle)}哪家好等信息，找${_this.tools.UnicodeToAscii(_this.classTitle)}，来${_this.detailObj.name}。`,
					success: function() {
					},
					fail: function(err) {
					}
				});
				uni.setNavigationBarTitle({
					title: titleStr
				});
			},
			// 获取课程详情
			getClassDetail(){
				let _this = this;
				return new Promise(resolve => {
					let ajaxUrl = _this.$api.GetAgencyClassDetail.url + "&key={productid:" + _this.productId + "}";
					_this.$ajax2(_this.$api.GetAgencyClassDetail, ajaxUrl, '获取课程详情', function(res) {
						if(res != 'error' && res.data.data && res.data.data.length > 0){ // 判断 res.data.XXX
							_this.classDetail = res.data.data[0];
							_this.classTitle = res.data.data[0].class_name;
							let demoNew = '';
							if(_this.classDetail.demo){
								demoNew = _this.tools.UnicodeToAscii(_this.tools.escape2Html(_this.classDetail.demo)).replace(/<p/ig, '<p class="_p"').replace(/<img/ig, '<img class="_img"').replace(/<table/ig, '<table class="_table"');
							}
							_this.classDetail.demoNew = demoNew;
					
							// // #ifdef MP-BAIDU
							resolve();
							// // #endif
					
							_this.resetRenderHeight();
						}else{
							_this.tools.toastShow("暂无数据");
						}
					}, true);
					_this.getAgencyActivities();
				})
				
			},
			// 获取机构活动列表
			getAgencyActivities() {
				let _this = this;
				let ajaxUrl = _this.$api.GetAgencyActivities.url + '&key={comename:' + _this.agencyEname + '}';
				_this.$ajax2(_this.$api.GetAgencyActivities, ajaxUrl, '获取机构活动', function(res) {
					// _this.activeList = res.data.data;
					// _this.activeList.slice(0,2)
					let list = [],data = res.data.data;
					for (var i = 0; i < data.length; i++) {
						for (var j = 0; j < data[i].products.length; j++) {
							if(data[i].products[j].productid == _this.productId){
								list.push(data[i]);
							}
						}
					}
					_this.activeList = list;
				});
			},
			resetRenderHeight(){
				let _this = this;
				setTimeout(() => {
					let query = uni.createSelectorQuery();
					query.select('.m-class-detail-box').boundingClientRect(rect=>{
					  let height = rect.height;
					  // console.log("height");
					  // console.log(height);
					  if(height < 400){
						  _this.detailMoreShow = false;
					  }
					}).exec();
				},3000)
			},

			// 展开/收起
			showMoreDetail(){
				let _this = this;
				_this.detailShowMore = !_this.detailShowMore;
			}
		}
	}
</script>

<style lang="scss">
	// 每个页面公共css
	@import './index.scss';
</style>
