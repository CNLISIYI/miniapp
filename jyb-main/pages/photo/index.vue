<template>
	<view class="agency-page-container">
		<!-- header -->
		<!-- <header-ele v-if="detailObj" :detailobj="detailObj" title="" :navtabitemshow="navTabItemShow"></header-ele> -->
		<!-- header-nav -->
		<header-nav :cityename="cityEname" :agencyename="agencyEname" rendertype="photo" :navtabitemshow="navTabItemShow"></header-nav>
		<!-- header-tab -->
		<block v-if="photoSort.length > 0">
			<header-tab
				rendertype="click-element"
				page="photo"
				:cityename="cityEname"
				:agencyename="agencyEname"
				:tabarr="photoSort"
				:active="sortId"
				@receiveFromChild="photoSortChange"
			></header-tab>
		</block>

		<!-- photo list -->
		<div class="m-photo-outer m-list-container bgfff" v-if="photos && photos.length > 0">
			<div class="m-watch-big-photo m-photo-mini-list">
				<!-- Swiper -->
				<div class="swiper-container">
					<div class="swiper-wrapper clearfloat">
						<block v-for="(item, index) in videos" :key="index" v-if="isVideoshow">
							<view class="_a swiper-slide swiper-slide-click" v-if="videos.length > 0" :data-src="'https:' + item.mediaurl" @click="curVideoFullScreen">
								<div class="swiper-zoom-container swiper-slide-video">
									<img :src="'https:' + item.snapshoturl" />
									<i class="video-pause-btn"></i>
									<p>视频</p>
								</div>
							</view>
						</block>
						<block v-for="(item, index) in photos" :key="index">
							<view class="_a swiper-slide" v-if="sortId == '' || sortId == item.groupcode" :data-imgidx="index" @click="getPhotoClickIdx">
								<div class="swiper-zoom-container" v-if="item.mastersort">
									<img :src="'https:' + item.masterimage" />
									<p>推荐主图</p>
								</div>
								<div class="swiper-zoom-container" v-if="!item.mastersort">
									<img :src="'https:' + item.imageurl" />
									<p>{{ item.imagetitle }}</p>
								</div>
							</view>
						</block>
					</div>
				</div>
			</div>
		</div>

		<!-- 视频播放 -->
		<video-play v-if="videoSrc" :videosrc="videoSrc" @closeVideo="closeVideoPop"></video-play>
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
import { footerMixin, agencyPhotoMixin, navTabItemShowMixin, recordTrackingMixin } from '../../common/js/mixins.js';
import { queryByAgency } from '../../common/js/url-monitor.js';
export default {
	mixins: [footerMixin, agencyPhotoMixin, navTabItemShowMixin, recordTrackingMixin],
	data() {
		return {
			cityEname: '',
			agencyEname: '',
			sortId: '',
			detailObj: '',
			masterphotos: [],
			videos: [],
			photos: [],
			videoSrc: '',
			isVideoshow: true,
		};
	},
	async onLoad(opts) {
		let _this = this;
		// console.log(opts);
		if (opts && JSON.stringify(opts) != '{}') {
			_this.cityEname = await queryByAgency(opts.city, opts.agency);

			_this.agencyEname = opts.agency;
		}
		_this.getAgencyDetail();
		// #ifndef MP-BAIDU
		_this.getFooterMixin();
		// #endif
		
		_this.getAgencyPhotoMixin();
		_this.getNavTabItemShowMixin();
		
		// #ifdef MP-BAIDU
			await _this.getFooterMixin();
			_this.setPageInfoFn();
		// #endif
	},
	onShow() {
		
	},
	onShareAppMessage(res) {
		let _this = this;
	},
	created() {},
	methods: {
		setPageInfoFn(){
			let _this = this;
			// #ifdef MP-BAIDU
				let titleStr = `【${_this.detailObj.name}】${_this.detailObj.nickname}相册-教育宝手机站`;
				swan.setPageInfo({
					title: titleStr,
					keywords: `${_this.detailObj.name},济南${_this.detailObj.nickname},济南${_this.detailObj.nickname}相册`,
					description: `${_this.detailObj.nickname}教学环境、教师风采、上课、活动、集体照等相册展示。`,
					success: function() {
					},
					fail: function(err) {
					}
				});
				uni.setNavigationBarTitle({
					title: titleStr
				});
			// #endif
		},
		curVideoFullScreen(e) {
			// console.log(e);
			this.videoSrc = e.currentTarget.dataset.src;
		},
		closeVideoPop() {
			this.videoSrc = '';
		},
		// 获取机构详情
		getAgencyDetail() {
			let _this = this;
			let ajaxUrl = _this.$api.GetAgencyDetail.url + '&key={comename:' + _this.agencyEname + '}';
			_this.$ajax2(
				_this.$api.GetAgencyDetail,
				ajaxUrl,
				'获取机构详情',
				function(res) {
					if (res.data && res.data.data && res.data.data.length > 0) {
						_this.detailObj = res.data.data[0];
						if (res.data.data[0].video.length > 0) {
							_this.videos = res.data.data[0].video;
						}
						if (res.data.data[0].masterimage.length > 0) {
							_this.photos = res.data.data[0].masterimage;
							_this.masterphotos = res.data.data[0].masterimage;
						}
						_this.photoCopy.map((item, index) => {
							if (_this.sortId == '' || _this.sortId == item.groupcode) {
								_this.photos.push(item);
							}
						});
					}
				},
				true
			);
		},

		photoSortChange(id) {
			let _this = this;
			_this.sortId = id == -1 ? '' : id;
			// console.log(_this.sortId);
			if (_this.sortId == '') {
				_this.photos = [];
				_this.photos = _this.masterphotos;
				_this.isVideoshow = true;
			} else {
				_this.photos = [];
				_this.isVideoshow = false;
			}
			_this.photoCopy.map((item, index) => {
				if (_this.sortId == item.groupcode) {
					_this.photos.push(item);
				}
			});
		},
		// 获得相册 idx
		getPhotoClickIdx(e) {
			// 2019.11.06 添加图片预览功能
			let _this = this;
			let idx = e.currentTarget.dataset.imgidx;
			// console.log(_this.photos);
			if (_this.sortId == '') {
				let imgs = [];
				let Arrlength = _this.photos.length - _this.photoCopy.length;
				for (let i = 0; i < Arrlength; i++) {
					if (_this.photos[i].mastersort) {
						imgs.push('https:' + _this.photos[i].masterimage);
					}
				}
				_this.photoCopy.map((item, index) => {
					imgs.push('https:' + item.imageurl);
				});
				_this.tools.imgPreview(imgs, idx);
			} else {
				let imgs = _this.photos.map((item, index) => {
					if (_this.sortId == '' || _this.sortId == item.groupcode) {
						if (item.imageurl.startsWith('http:') || item.imageurl.startsWith('https:')) {
							return item.imageurl;
						}
						return 'https:' + item.imageurl;
					}
				});
				_this.tools.imgPreview(imgs, idx);
			}
		}
	}
};
</script>

<style lang="scss">
// 每个页面公共css
@import './index.scss';
</style>
