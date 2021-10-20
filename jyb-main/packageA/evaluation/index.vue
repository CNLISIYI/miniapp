<template>
	<view class="agency-page-container">
		<!-- header -->
		<!-- <header-ele v-if="detailObj" :detailobj="detailObj" title="" :navtabitemshow="navTabItemShow"></header-ele> -->
		<!-- header-nav -->
		<header-nav :cityename="cityEname" :agencyename="agencyEname" rendertype="evaluation" :navtabitemshow="navTabItemShow"></header-nav>

		<div class="m-evaluation-top bgfff" v-if="detailObj">
			<div class="m-evaluation-score-box flex-box">
				<div class="m-evaluation-score-left flex-1 flex-box">
					<h3 class="fontArial">{{ (detailObj.star / 10).toFixed(1) }}</h3>
					<div>
						<em>{{ detailObj.star > 45 ? '超棒' : detailObj.star > 35 ? '很好' : '一般' }}</em>
						<br />
						<span>{{ detailObj.num_pj }}人评价</span>
					</div>
				</div>
				<div class="m-evaluation-score-right flex-1">
					<p>
						<span>环境：{{ (detailObj.star1 / 10).toFixed(1) }}分</span>
						<span>师资：{{ (detailObj.star2 / 10).toFixed(1) }}分</span>
					</p>
					<p>
						<span>服务：{{ (detailObj.star3 / 10).toFixed(1) }}分</span>
						<span>效果：{{ (detailObj.star4 / 10).toFixed(1) }}分</span>
					</p>
				</div>
			</div>
			<!-- header-tab -->
			<block v-if="evalTotal > 0 && evalSort.length > 0">
				<header-tab
					rendertype="link"
					page="evaluation"
					:cityename="cityEname"
					:agencyename="agencyEname"
					:total="evalTotal"
					:tabarr="evalSort"
					:active="labelCode"
				></header-tab>
			</block>
			<view style="width: 100%; height: 10px;" v-else></view>
		</div>
		<ul class="m-evaluation-content" v-if="evals && evals.length > 0">
			<li v-for="(item, index) in evals" :key="index">
				<div class="m-evaluation-item-header flex-box">
					<img class="m-evaluation-item-header-img" alt="" :src="'https:' + item.photo" v-if="item.photo" />
					<div class="m-evaluation-item-header-noimg" v-else>{{ item.user_name.substr(0, 1) }}</div>
					<div class="m-evaluation-item-msg flex-1">
						<div class="m-evaluation-item-title clearfloat">
							<h3 class="fl">{{ item.user_name }}</h3>
							<span class="fl">报名课程：{{ item.service_mc }}</span>
						</div>
						<div class="jyb-score">
							<div class="jyb-score-top" :style="'width:' + item.star * 2 + '%;'"><img src="https://static.jiaoyubao.cn/images/mobile/star-fill.svg" alt="" /></div>

							<div class="jyb-score-bottom"><img src="https://static.jiaoyubao.cn/images/mobile/star.svg" alt="" /></div>
						</div>
					</div>
				</div>
				<div class="m-evaluation-item-detail">
					<p v-html="item.content" style="max-height: 100%;"></p>
					<!-- <text class="_a m-evaluation-item-more" title="" @click='contentMore' :data-idx="index" :style="clickIdx == index ? 'display: none;' : ''">展开</text> -->
					<div class="m-evaluation-item-detail-img mtop16 m-watch-big-photo" v-if="item.images && item.images.length > 0">
						<!-- Swiper -->
						<div class="swiper-container com-swiper-container-outer" style="height: 70px;">
							<div class="swiper-wrapper clearfloat com-swiper-container flex-box" style="height: 90px;">
								<view class="_a swiper-slide" v-for="(o, i) in item.images" :key="i">
									<div class="swiper-zoom-container" :data-imgidx="i" :data-evalidx="index" @click="getPhotoClickIdx">
										<img class="_img" :src="'https:' + o.imgurl" mode="aspectFill" />
										<p></p>
									</div>
								</view>
							</div>
						</div>
					</div>
				</div>
				<p class="m-evaluation-item-time fontArial">{{ item.dt_pj }}</p>
			</li>
		</ul>

		<pagination :total="pageTotal" :idx="pageIdx" v-if="pageTotal > 1" @receiveChild="changePageIdx"></pagination>
		<!-- <div class="listpage" v-if="pageTotal > 1">
			<view :class="['_a', pageIdx == 1 ? 'disabled' : 'on']" @click="prePage">上一页</view>
				<span><i class="_i" style="color: #1184e1;">{{pageIdx}} </i> / <i class="_i" style="color: #999;"> {{pageTotal}}</i></span>
			<view :class="['_a', pageIdx == pageTotal ? 'disabled' : 'on']" @click="nextPage">下一页</view>
		</div> -->

		<!--
			底部模块
		-->
		<!-- 面包屑 -->
		<!-- <bread-crumbs v-if="detailObj && classObj" :detailobj="detailObj" :classobj="classObj"></bread-crumbs> -->

		<!-- 通用底部 -->
		<view class="footer-ele-padding"><footer-ele></footer-ele></view>

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
			pagename="evaluation"
			:detailobj="detailObj"
			:usermobile="usermobile"
		></footer-agency>
		
		<online-talk></online-talk>
	</view>
</template>

<script>
import { footerMixin, evalSortMixin, navTabItemShowMixin, recordTrackingMixin } from '../../common/js/mixins.js';
import { queryByAgency } from '../../common/js/url-monitor.js';
export default {
	mixins: [footerMixin, evalSortMixin, navTabItemShowMixin, recordTrackingMixin],
	data() {
		return {
			cityEname: '',
			agencyEname: '',
			labelCode: '',

			clickIdx: -1,

			pageIdx: 1,
			evals: [],
			evalTotal: 0,
			pageTotal: 0,
			usermobile: ''
		};
	},
	async onLoad(opts) {
		let _this = this;
		// console.log(opts);
		if (opts && JSON.stringify(opts) != '{}') {
			_this.cityEname = await queryByAgency(opts.city, opts.agency);

			_this.agencyEname = opts.agency;
			_this.labelCode = opts.id || '';
		}

		_this.getEvalList();
		_this.getEvalNum();

		// #ifndef MP-BAIDU
		_this.getFooterMixin();
		// #endif
		
		_this.getEvalSortMixin();
		_this.getNavTabItemShowMixin();
		
		// #ifdef MP-BAIDU
			await _this.getFooterMixin();
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
	},
	methods: {
		setPageInfoFn(){
			let _this = this;
			// #ifdef MP-BAIDU
			// _this.requestTask.then(requestData => {
				let titleStr = `【${_this.detailObj.name}怎么样】${_this.detailObj.nickname}口碑怎么样_${_this.detailObj.nickname}好不好-教育宝手机站`;
				swan.setPageInfo({
					title: titleStr,
					keywords: `${_this.detailObj.name}怎么样,${_this.detailObj.nickname}口碑怎么样${_this.detailObj.nickname}好不好,${_this.detailObj.nickname}如何`,
					description: `想知道${_this.detailObj.name}怎么样，教育宝为您提供${_this.detailObj.nickname}真实学员的口碑评价，关于${_this.detailObj.nickname}如何的信息，包括${_this.detailObj.nickname}到底怎么样，${_this.detailObj.nickname}好不好，${_this.detailObj.nickname}靠谱吗，让您全面了解${_this.detailObj.name}怎么样。`,
					success: function() {
					},
					fail: function(err) {
					}
				});
				uni.setNavigationBarTitle({
					title: titleStr
				});
			// })
			// #endif
		},
		getEvalList() {
			let _this = this;
			_this.evals = [];
			_this.pageTotal = 0;

			_this.component.getComAgencyEvals(
				_this,
				function(res) {
					// console.log(res.data);
					for (let i = 0, len = res.data.length; i < len; i++) {
						res.data[i].dt_pj = _this.tools.getDate(res.data[i].dt_pj);
						res.data[i].content = res.data[i].content.replace(/\n/g, '<br>');
					}
					_this.evals = res.data;
					_this.pageTotal = res.maxpage;
				},
				true,
				_this.pageIdx,
				_this.labelCode
			);
		},
		getEvalNum() {
			let _this = this;
			_this.component.getComAgencyEvalsNum(_this, function(res) {
				_this.evalTotal = res.rec;
			});
		},
		// 评价图片点击功能
		getPhotoClickIdx(e) {
			let _this = this;
			let idx = e.currentTarget.dataset.imgidx;
			let evalidx =  e.currentTarget.dataset.evalidx;
			let imgs = [];
			for(let i = 0; i<_this.evals[evalidx].images.length;i++){
				if (_this.evals[evalidx].images[i].imgurl.startsWith('http:') || _this.evals[evalidx].images[i].imgurl.startsWith('https:')) {
					imgs.push(_this.evals[evalidx].images[i].imgurl)
				}
				else {
					imgs.push('https:' + _this.evals[evalidx].images[i].imgurl)
				}
			}
			_this.tools.imgPreview(imgs, idx);
		},
		// 分页
		changePageIdx(res) {
			let _this = this;
			if (res == 'add') {
				_this.pageIdx += 1;
			} else {
				_this.pageIdx -= 1;
			}

			_this.getEvalList();
		},
		// 展开
		contentMore(e) {
			let _this = this;
			// console.log(e);
			let index = e.currentTarget.dataset.idx;
			_this.clickIdx = index;
		}
	}
};
</script>

<style lang="scss">
// 每个页面公共css
@import './index.scss';
</style>
