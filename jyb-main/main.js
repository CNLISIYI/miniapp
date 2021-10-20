import './common/js/mtj-wx-sdk.js';
//// 目前只在微信小程序使用
// #ifdef MP-WEIXIN
// import DATracker from 'common/js/DaTracker.js';
// DATracker.init( '69e53d90b67dbaf7c700543b1a551994', {
// 	appid: 'wx3ced73f6d17e57e3',
// 	onPageShow: function ( datracker, router, page ) {
// 		datracker.track_pageview( {
// 			data: page.data.ysf
// 		} );
// 	}
// } );

// #endif

import Vue from 'vue'
import App from './App'

import tools from "./common/js/util";
import location from "./common/js/location";
import component from "./common/js/component";
import * as consts from './common/js/const.js'; 
import $http from "./common/js/http";
import $http2 from "./common/js/http2";
import ApiSetting from "./common/js/apisetting.js";

import footerEle from "./component/footer.vue"
import footerNav from "./component/footer-nav.vue"
import footerAgency from "./component/footer-agency.vue"
import headerEle from "./component/header.vue"
import headerNav from "./component/header-nav.vue"
import headerTab from "./component/header-tab.vue"
import headerTitle from "./component/header-title.vue"
import telPhone from "./component/tel-phone-pop.vue"
import menuNav from "./component/menu-nav.vue"

import classItem from "./component/class-item.vue"
import teacherItem from "./component/teacher-item.vue"
import schoolItem from "./component/school-item.vue"
import agencyItem from "./component/agency-item.vue"
import agencySift from "./component/agency-sift.vue"
import pjSwiperItem from "./component/pj-swiper-item.vue"
import breadCrumbs from "./component/bread-crumbs.vue"
import nearestCampus from "./component/nearest-campus.vue"
import nextRelated from "./component/next-related.vue"
import FormYuyue from "./component/form-yuyue.vue"
import FormLingqu from "./component/form-lingqu.vue"
import FormBaojia from "./component/form-baojia.vue"
import newsItem from "./component/news-item.vue"
import Pagination from "./component/pagination.vue"
import videoPlay from "./component/video-play.vue"
import onlineTalk from "./component/online-talk.vue"

import quickSkeleton from "./component/quick-skeleton.vue"
import uniCountdown from "./component/uni-countdown.vue"
// import showFavoriteGuide from "./component/show-favorite-guide.vue"


Vue.prototype.tools = tools;
Vue.prototype.consts = consts;
Vue.prototype.location = location;
Vue.prototype.component = component;

Vue.prototype.$ajax = $http;
Vue.prototype.$ajax2 = $http2;
Vue.prototype.$api = ApiSetting;

// #ifdef MP-WEIXIN
import TabBarEl from "./component/tab-bar.vue"
Vue.component( "TabBarEl", TabBarEl );
// #endif

Vue.component( "footerEle", footerEle );
Vue.component( "footerNav", footerNav );
Vue.component( "footerAgency", footerAgency );
Vue.component( "headerEle", headerEle );
Vue.component( "headerNav", headerNav );
Vue.component( "headerTab", headerTab );
Vue.component( "headerTitle", headerTitle );
Vue.component( "telPhone", telPhone );
Vue.component( "menuNav", menuNav );

Vue.component( "classItem", classItem );
Vue.component( "teacherItem", teacherItem );
Vue.component( "schoolItem", schoolItem );
Vue.component( "agencyItem", agencyItem );
Vue.component( "agencySift", agencySift );
Vue.component( "pjSwiperItem", pjSwiperItem );
Vue.component( "breadCrumbs", breadCrumbs );
Vue.component( "nearestCampus", nearestCampus );
Vue.component( "nextRelated", nextRelated );
Vue.component( "FormYuyue", FormYuyue );
Vue.component( "FormLingqu", FormLingqu );
Vue.component( "FormBaojia", FormBaojia );
Vue.component( "newsItem", newsItem );
Vue.component( "Pagination", Pagination );
Vue.component( "videoPlay", videoPlay );
Vue.component( "onlineTalk", onlineTalk );

Vue.component( "quickSkeleton", quickSkeleton );
Vue.component( "uniCountdown", uniCountdown );
// Vue.component("showFavoriteGuide", showFavoriteGuide);

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue( {
	...App
} )
app.$mount()
