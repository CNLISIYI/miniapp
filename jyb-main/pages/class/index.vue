<template>
	<view class="m-common-container agency-page-container">
		<!-- header -->
		<!-- <header-ele v-if="detailObj" :detailobj="detailObj" title="" :navtabitemshow="navTabItemShow"></header-ele> -->
		<!-- header-nav -->
		<header-nav :cityename="cityEname" :agencyename="agencyEname" rendertype="class" :navtabitemshow="navTabItemShow"></header-nav>
		<!-- header-tab -->
		<block v-if="classes.length > 0 && classSort.length > 0">
			<header-tab rendertype="link" page="class" :cityename="cityEname" :agencyename="agencyEname" :total="classes.length" :tabarr="classesList" :active="sortId"></header-tab>
		</block>

		<!-- class list -->
		<div class="m-class m-list-container bgfff">
			<block v-if="classesList.length > 0">
				<block v-for="(item, index) in classesList" :key="index">
					<div class="m-list-container-item" v-if="(sortId == '' || sortId == item.id) && item.count > 0">
						<navigator v-if="classSort.length > 0" hover-class="none" open-type="redirect" class="_a m-module-title" :url="'/pages/class/index?agency='+agencyEname+'&id='+item.id" title="">
							{{item.name}}({{item.count}})<img class="m-module-more fr" src="https://static.jiaoyubao.cn/images/mobile/icon-rightarrow.svg" alt="">
						</navigator>

						<view v-if="classSort.length == 0" style="width: 100%; height: 20px;"></view>

						<class-item type="left-right" :cityename="cityEname" :agencyename="agencyEname" :classes="item.children"></class-item>
					</div>
				</block>
			</block>
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
			pagename="class"
			:detailobj="detailObj"
			:usermobile="usermobile">
		</footer-agency>
		
		<online-talk></online-talk>
	</view>
</template>

<script>
	import {footerMixin, navTabItemShowMixin, recordTrackingMixin} from '../../common/js/mixins.js'
	import { queryByAgency } from '../../common/js/url-monitor.js';
	export default {
		mixins: [footerMixin, navTabItemShowMixin, recordTrackingMixin],
		data() {
			return {
				cityEname : '',
				agencyEname: '',
				sortId: '',

				classSort: [], // 课程分组
				classes: [], // 课程列表
				classesList: [], // 课程列表(带分组)
				usermobile: ''
			}
		},
		async onLoad(opts) {
			let _this = this;
			// console.log(opts);
			if (opts && JSON.stringify(opts) != '{}') {
				_this.cityEname = await queryByAgency(opts.city, opts.agency);

				_this.agencyEname = opts.agency;
				_this.sortId = opts.id || '';
			}

			_this.getAgencyClassSort();
			// #ifndef MP-BAIDU
			_this.getFooterMixin();
			// #endif
			
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
		created() {
			let _this = this;

		},
		methods: {
			setPageInfoFn(){
				let _this = this;
				// #ifdef MP-BAIDU
					let titleStr = `【${_this.detailObj.name}学费】${_this.detailObj.nickname}多少钱_${_this.detailObj.nickname}价格-教育宝手机站`;
					swan.setPageInfo({
						title: titleStr,
						keywords: `${_this.detailObj.name}学费,${_this.detailObj.nickname}价格,${_this.detailObj.nickname}多少钱,${_this.detailObj.nickname}价格表`,
						description: `教育宝为您提供${_this.detailObj.name}学费价格查询，通过${_this.detailObj.nickname}价格表可以查询课程培训费用及开课时间等信息，想知道${_this.detailObj.nickname}多少钱，${_this.detailObj.nickname}学费多少，快速查询${_this.detailObj.nickname}最新报价，就上教育宝。`,
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

			// 获取机构的课程分组
			getAgencyClassSort(){
				let _this = this;
				let ajaxUrl = _this.$api.GetAgencyClassSort.url + "&key={comename:" + _this.agencyEname + "}";
				_this.$ajax2(_this.$api.GetAgencyClassSort, ajaxUrl, '获取课程分组', function(res) {
					if(res != 'error' && res.data.data && res.data.data.length > 0){ // 判断 res.data.XXX
						// console.log(res);
						_this.classSort = res.data.data;
					}else{
						// _this.tools.toastShow("暂无课程分组数据");
					}
					_this.getAgencyClasses();
				});
			},
			// 获取机构课程列表
			getAgencyClasses(){
				let _this = this;
				let ajaxUrl = _this.$api.GetAgencyClasses.url + "&key={comename:" + _this.agencyEname + "}";
				_this.$ajax2(_this.$api.GetAgencyClasses, ajaxUrl, '获取课程列表', function(res) {
					if(res != 'error' && res.data.data && res.data.data.length > 0){ // 判断 res.data.XXX
						_this.classes = res.data.data;
						_this.handleClassesList();
					}else{
						_this.tools.toastShow("暂无课程列表数据");
					}
				}, true);
			},
			// 处理课程列表添加分组
			handleClassesList(){
				let _this = this;
				// console.log(_this.classSort)
				_this.classSort.filter(item => {
					let newItemArr = _this.classes.filter(o => o.progroupid == item.id).sort((x,y)=>y.productrecommend-x.productrecommend); // 降序
					// console.log(newItemArr);
					_this.classesList.push({
						"id": item.id,
						"name": item.name,
						"count": newItemArr.length,
						"children": newItemArr,
					})
				});

				let otherItemArr = _this.classes.filter(o => o.progroupid == 0).sort((x,y)=>y.productrecommend-x.productrecommend);
				// console.log(otherItemArr);
				if(otherItemArr.length > 0){
					_this.classesList.push({
						"id": "0000",
						"name": "其他",
						"count": otherItemArr.length,
						"children": otherItemArr,
					})
				}
				// console.log(_this.classesList)
			},
		}
	}
</script>

<style lang="scss">
	// 每个页面公共css
	@import './index.scss';
</style>
