<template>
	<view :style="pageBgColor" class="pageBg">
		<!-- 品牌入驻页面 -->
		<div class="ruzhu-main" v-show="isEntershow">
			<!-- 背景图片拼接 -->
			<div class="under">
				<img v-for="(item, i) in bgList" :key="index" :src="item" />
				<image src="https://static.jiaoyubao.cn/images/uniapp/enter_image/bg/img_39.png" class="last-img"></image>
			</div>
			<!-- 招生主页按钮 -->
			<div class="homepage">
				<a url="/pages/index/index" hover-class="none">
					<i class="menu-index-linear"></i>
					招生主页
				</a>
			</div>
			<!-- 页面主内容开始 -->
			<div class="maintain">
				<!-- 第一个立即申请按钮 -->
				<div class="worknow-1 worknow" @click="enterToForm"><a hover-class="none"></a></div>
				<!-- 教育宝简介开始 -->
				<div class="describe">
					<div class="describe-box">
						<div class="des-top">
							<p>
								教育宝是中国知名的教育培训第三方平台，致力于帮学员找课、帮机构招生，10年深耕，已服务500多万学员和6万多家教育机构。
								<a url="/pages/about/index" hover-class="none">详情>></a>
							</p>
							<span class="yuan"></span>
							<span class="yuan"></span>
							<span class="yuan"></span>
							<span class="yuan"></span>
						</div>
						<div class="des-bottom">
							<ul>
								<li>
									<span>51,207</span>
									<span>家</span>
									<p>机构</p>
								</li>
								<li>
									<span>531,272</span>
									<span>门</span>
									<p>课程</p>
								</li>
							</ul>
							<ul>
								<li>
									<span>3,668,392</span>
									<span>名</span>
									<p>学员</p>
								</li>
								<li>
									<span>209,461</span>
									<span>条</span>
									<p>评价</p>
								</li>
							</ul>
						</div>
					</div>
					<div class="jinbi"><img src="https://static.jiaoyubao.cn/images/uniapp/enter_image/money@3x.png" alt /></div>
				</div>
				<!-- 教育宝简介结束 -->

				<!-- 教育宝优势开始 -->
				<div class="sec-title"><img src="https://static.jiaoyubao.cn/images/uniapp/enter_image/youshi-title@3x.png" alt /></div>
				<div class="adv-out">
					<div class="advantage">
						<div class="advantage-box">
							<ul>
								<li class="clearfloat">
									<img src="https://static.jiaoyubao.cn/images/uniapp/enter_image/icon-01@3x.png" alt />
									<div class="li-head">
										<h3>低投入高回报</h3>
										<p>按效果付费低基础服务费</p>
									</div>
								</li>
								<li class="clearfloat">
									<img src="https://static.jiaoyubao.cn/images/uniapp/enter_image/icon-02@3x.png" alt />
									<div class="li-head">
										<h3>专业顾问服务</h3>
										<p>享专业顾问一对一服务</p>
									</div>
								</li>
								<li class="clearfloat">
									<img src="https://static.jiaoyubao.cn/images/uniapp/enter_image/icon-03@3x.png" alt />
									<div class="li-head">
										<h3>匹配精准流量</h3>
										<p>精准定位用户匹配大量学员</p>
									</div>
								</li>
								<li class="clearfloat">
									<img src="https://static.jiaoyubao.cn/images/uniapp/enter_image/icon-04@3x.png" alt />
									<div class="li-head">
										<h3>强势整合推广</h3>
										<p>强势整合各种宣传推广渠道</p>
									</div>
								</li>
								<li class="clearfloat">
									<img src="https://static.jiaoyubao.cn/images/uniapp/enter_image/icon-05@3x.png" alt />
									<div class="li-head">
										<h3>后台系统先进</h3>
										<p>系统简单易用便捷高效管理</p>
									</div>
								</li>
							</ul>
							<div class="tree"><img src="https://static.jiaoyubao.cn/images/uniapp/enter_image/tree@3x.png" alt /></div>
						</div>
					</div>
					<div class="pencil"><img src="https://static.jiaoyubao.cn/images/uniapp/enter_image/pencil@3x.png" alt /></div>
				</div>

				<!-- 教育宝优势结束 -->

				<!-- 平台合作流程开始 -->
				<div class="sec-title"><img src="https://static.jiaoyubao.cn/images/uniapp/enter_image/liucheng-title@3x.png" alt /></div>
				<div class="process">
					<div class="process-box">
						<p>- 简单4步，轻松加入教育宝 -</p>
						<ul class="clearfloat">
							<li>
								<h2>申请合作</h2>
								<span>立即点击申请合作</span>
								<img src="https://static.jiaoyubao.cn/images/uniapp/enter_image/jiantou-01@3x.png" alt />
							</li>
							<li>
								<h2>等待审核</h2>
								<span>审核信息与您联系</span>
								<img src="https://static.jiaoyubao.cn/images/uniapp/enter_image/jiantou-02@3x.png" alt />
							</li>
							<li>
								<h2>签订协议</h2>
								<span>审核资质签订协议</span>
								<img src="https://static.jiaoyubao.cn/images/uniapp/enter_image/jiantou-03@3x.png" alt />
							</li>
							<li>
								<h2>合作成功</h2>
								<span>页面上线开始招生</span>
							</li>
						</ul>
					</div>
				</div>
				<!-- 平台合作流程结束 -->

				<!-- 学员选择开始 -->
				<div class="sec-title"><img src="https://static.jiaoyubao.cn/images/uniapp/enter_image/xueyuan-title@3x.png" alt /></div>
				<div class="choose">
					<div class="choose-box">
						<p>- 优质的服务，众多学员选择适合的课程 -</p>
						<ul class="clearfloat">
							<li>
								<img src="https://static.jiaoyubao.cn/images/uniapp/enter_image/tx-01@3x.png" alt />
								<p>机构多，附近有几家机构，口碑评价师资情况都一目了然，选择方便快捷！</p>
							</li>
							<li>
								<p>在线免费预约试听，亲自了解了几家机构，和评价基本属实，可以放心选择！</p>
								<img src="https://static.jiaoyubao.cn/images/uniapp/enter_image/tx-02@3x.png" alt />
							</li>
							<li>
								<img src="https://static.jiaoyubao.cn/images/uniapp/enter_image/tx-03@3x.png" alt />
								<p>帮我选，服务佳！大品牌多、活动和课程都很全！</p>
							</li>
						</ul>
					</div>
					<div class="book"><img src="https://static.jiaoyubao.cn/images/uniapp/enter_image/book@3x.png" alt /></div>
				</div>
				<!-- 学员选择结束 -->

				<!-- 合作伙伴开始 -->
				<div class="sec-title"><img src="https://static.jiaoyubao.cn/images/uniapp/enter_image/hezuo-title@3x.png" alt /></div>
				<div class="par-out">
					<div class="partner">
						<div class="partner-box">
							<div class="company">
								<ul class="clearfloat">
									<li><img src="https://static.jiaoyubao.cn/images/uniapp/enter_image/jg-logo-01@3x.png" alt /></li>
									<li><img src="https://static.jiaoyubao.cn/images/uniapp/enter_image/jg-logo-02@3x.png" alt /></li>
									<li><img src="https://static.jiaoyubao.cn/images/uniapp/enter_image/jg-logo-03@3x.png" alt /></li>
									<li><img src="https://static.jiaoyubao.cn/images/uniapp/enter_image/jg-logo-04@3x.png" alt /></li>
								</ul>
								<ul class="clearfloat">
									<li><img src="https://static.jiaoyubao.cn/images/uniapp/enter_image/jg-logo-05@3x.png" alt /></li>
									<li><img src="https://static.jiaoyubao.cn/images/uniapp/enter_image/jg-logo-06@3x.png" alt /></li>
									<li><img src="https://static.jiaoyubao.cn/images/uniapp/enter_image/jg-logo-07@3x.png" alt /></li>
									<li class="more-company">
										<a href="#">
											<div class="dian">
												<span></span>
												<span></span>
												<span></span>
											</div>
											<span>更多企业</span>
										</a>
									</li>
								</ul>
							</div>
							<div class="worknow-2 worknow" @click="enterToForm">
								<a hover-class="none"><img src="https://static.jiaoyubao.cn/images/uniapp/enter_image/button@3x.png" alt /></a>
							</div>
							<div class="tree"><img src="https://static.jiaoyubao.cn/images/uniapp/enter_image/tree@3x.png" alt /></div>
						</div>
					</div>
					<div class="finger"><img src="https://static.jiaoyubao.cn/images/uniapp/enter_image/finger@3x.png" alt /></div>
				</div>
				<!-- 合作伙伴结束 -->
			</div>
		</div>

		<!-- 申请合作窗口 -->
		<div class="apply-main" v-show="isFormshow">
			<div class="page" data-page="home">
				<div class="apply-content hide-tabbar-on-scroll">
					<div class="list-block">
						<ul>
							<li>
								<div class="apply-title">
									<a class="apply-back"><i class="icon-left-no-bg" @click="naviBack"></i></a>
									<h1>品牌合作申请</h1>
								</div>
							</li>
							<li>
								<div class="item-content apply-city">
									<div class="item-title label">省市选择</div>
									<picker
										class="item-input city-picker"
										mode="multiSelector"
										@change="bindMultiPickerChange"
										@columnchange="bindMultiPickerColumnChange"
										@click="selectCity"
										:value="multiIndex"
										:range="multiArray"
									>
										<input disabled="true" placeholder="请选择城市" placeholder-style="color:#808080;" :value="citysName" />
									</picker>
									<a href="#"><i class="icon-right-no-bg"></i></a>
								</div>
							</li>
							<li>
								<div class="item-content apply-name">
									<div class="item-title label">机构名称</div>
									<div class="item-input"><input type="text" placeholder="请输入机构名称" placeholder-style="color:#808080;" v-model="organization" /></div>
								</div>
								<hr />
							</li>
							<li>
								<div class="item-content apply-user">
									<div class="item-title label">机构联系人</div>
									<div class="item-input"><input type="text" placeholder="请输入机构联系人" placeholder-style="color:#808080;" v-model="contact" /></div>
								</div>
								<hr />
							</li>
							<li>
								<div class="item-content apply-phone">
									<div class="item-title label">联系人电话</div>
									<div class="item-input"><input type="tel" placeholder="请输入联系人电话" placeholder-style="color:#808080;" v-model="telephone" /></div>
								</div>
							</li>
							<li>
								<div class="item-content">
									<div class="item-title label">网址</div>
									<div class="item-input"><input type="text" placeholder="请输入机构网址 (选填)" placeholder-style="color:#808080;" v-model="onlineAddress" /></div>
								</div>
							</li>
						</ul>
					</div>
					<div class="apply-submit" @click="applySubmitClick"><a hover-class="none">提交</a></div>
				</div>
			</div>
		</div>

		<!-- 申请成功窗口 -->
		<div class="apply-success" v-show="isSucshow">
			<div class="suc-logo"><i class="icon-check-block"></i></div>
			<h2>提交成功</h2>
			<p class="suc-text">感谢您的申请！若有需要我们的相关工作人员会与您联系，请保持手机通畅。</p>
			<div class="back-home"><a @click="backToHome" hover-class="none">回到教育宝首页</a></div>
			<div class="back-apply" @click="backToApply"><a hover-class="none">继续申请</a></div>
		</div>
		
		<online-talk></online-talk>
	</view>
</template>

<script>
import {ipGetMixin, recordTrackingMixin} from '../../common/js/mixins.js';
export default {
	mixins: [ipGetMixin, recordTrackingMixin],
	data() {
		return {
			webUrl: '', // https://m.jiaoyubao.cn/enter/
			webviewStyles: {
				progress: {
					color: '#1a8cff'
				}
			},
			shareTitle: '',
			shareContent: ',',
			pageBgColor: 'background-color:#30a9fa',
			isEntershow: true,
			isFormshow: false,
			isSucshow: false,
			bgList: [],
			multiIndex: [0, 0],
			multiArray: [[], []],
			provinceArray: [],
			cityArray: [],
			cityeArray: [],
			citysName: '',
			cityseName: '',
			organization: '',
			contact: '',
			telephone: '',
			onlineAddress: '',
			flag: 0,
		};
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
	onLoad(opts) {
		// /packageA/enter/index?enter=1
		let _this = this;
		// console.log(opts);
		if (opts && JSON.stringify(opts) != '{}') {
			_this.webUrl = opts.webUrl || 'https://m.jiaoyubao.cn/enter/';
		}
		for (let i = 1; i < 39; i++) {
			_this.bgList.push('https://static.jiaoyubao.cn/images/uniapp/enter_image/bg/img_' + i + '.png');
		}
		_this.getProvince();
		_this.getCity();
		let pages = getCurrentPages(); // 获取页面栈
		pages.map((item, index) => {
			if( item.route == 'pages/index/index') {
				item.$vm.localClass = [];
			}
		});
	},
	onShareAppMessage(res) {
		let _this = this;
		// console.log(res);
		return {
			title: _this.shareTitle,
			path: `/packageA/enter/index?webUrl=${res.webViewUrl}`,
			imageUrl: 'https://static.jiaoyubao.cn/images/uniapp/share-logo.jpg',
			content: _this.shareContent
		};
	},
	created() {},
	methods: {
		getProvince() {
			let _this = this;
			_this.$ajax(_this.$api.GetProvinceList, {}, '获取省分列表', function(res) {
				if (res.data && res.data.data && res.data.data.length > 0) {
					_this.provinceArray = res.data.data;
				}
				for (let i = 0; i < _this.provinceArray.length; i++) {
					_this.multiArray[0].push(_this.provinceArray[i].name);
				}
			});
		},
		getCity() {
			let _this = this;
			_this.$ajax(_this.$api.GetCityList, {}, '获取城市列表', function(res) {
				if (res.data && res.data.data && res.data.data.length > 0) {
					_this.cityArray = res.data.data;
				}
				let item = {}
				for (let i = 0; i < _this.cityArray.length; i++) {
					item = {
						cname: _this.cityArray[i].name,
						cename: _this.cityArray[i].ename
					}
					_this.cityeArray.push(item);
				}
				_this.multiArray[1].push(_this.cityArray[0].name);
			});
		},
		selectCity() {
			let _this = this;
			if(_this.flag == 0) {
				_this.citysName = '北京 北京';
			}
		},
		bindMultiPickerColumnChange(e) {
			let _this = this;
			_this.flag = 1;
			_this.multiIndex[e.detail.column] = e.detail.value;
			switch (e.detail.column) {
				case 0: {
					_this.multiArray[1].length = 0;
					_this.multiIndex[1] = 0;
					if (e.detail.value >= 0) {
						_this.multiIndex[0] = e.detail.value;
						for (let j = 0; j < _this.cityArray.length; j++) {
							if (_this.cityArray[j].code.indexOf(_this.provinceArray[e.detail.value].code) == 0) {
								_this.multiArray[1].push(_this.cityArray[j].name);
							}
						}
					}
					break;
				}
				case 1: {
					_this.multiIndex[1] = e.detail.value;
					break;
				}
			}
			_this.citysName = _this.multiArray[0][_this.multiIndex[0]] + ' ' + _this.multiArray[1][_this.multiIndex[1]];
		},
		bindMultiPickerChange(e) {
			this.multiIndex = e.detail.value;
		},
		getWebviewMsg(e) {
			let _this = this;
			// console.log(e.detail.data[0].title);
			// console.log(e.detail.data[0].content);
			_this.shareTitle = e.detail.data[0].title;
			_this.shareContent = e.detail.data[0].content;
		},
		backToHome() {
			uni.redirectTo({
			    url: '/pages/index/index'
			});
		},
		enterToForm() {
			let _this = this;
			_this.isEntershow = false;
			_this.isFormshow = true;
			_this.pageBgColor = 'background-color:#f7f8f9';
		},
		naviBack() {
			let _this = this;
			_this.isEntershow = true;
			_this.isFormshow = false;
		},
		backToApply() {
			let _this = this;
			_this.isFormshow = true;
			_this.isSucshow = false;
		},
		applySubmitClick() {
			let _this = this;
			let isRight = _this.tools.checkPhoneNum(_this.telephone);
			let P_Tongji_SessionID = P_Tongji_SessionID || '';
			let newcityArr = _this.citysName.split(' ');
			if(_this.flag == 0) {
				_this.cityeName = 'bj';
			}
			else {
				_this.cityeArray.map(item => {
					if (item.cname == newcityArr[1]) {
						_this.cityeName = item.cename;
					}
				});
			}
			// console.log(_this.cityeName)
			if (!isRight) {
				_this.tools.toastShow('请输入正确的手机号');
			}
			if (_this.contact == '') {
				_this.tools.toastShow('请输入机构联系人');
			}
			if (_this.organization == '') {
				_this.tools.toastShow('请输入机构名称');
			}
			if (_this.citysName == '') {
				_this.tools.toastShow('请选择城市');
			}
			if (isRight && _this.contact !== '' && _this.organization !== '' && _this.citysName !== '') {
				let fromPlatform;
				let uid = '';
				// #ifdef MP-BAIDU
					fromPlatform = "百度小程序";
					uid = getApp().globalData.unionid_bd,
				// #endif
				// #ifdef MP-WEIXIN
					fromPlatform = "微信小程序";
					uid = getApp().globalData.unionid_wx,
				// #endif
				uni.request({
					url: 'https://api14data.jiaoyubao.cn/form/?action=100001',
					data: {
						formtype: '018002',
						city: _this.cityeName,
						areaname: _this.citysName,
						comname: encodeURIComponent(_this.organization), // _this.organization,
						phone: _this.telephone,
						name: _this.contact,
						cookieid: P_Tongji_SessionID,
						ip: _this.IP || 'undefined',
						unionid: uid,
						url: encodeURIComponent(_this.webUrl) || encodeURIComponent(`https://m.jiaoyubao.cn/enter/`),
						demo : `教育宝, ${fromPlatform}, 申请合作表单，电话：${_this.telephone}, 机构网址：${encodeURIComponent(_this.onlineAddress)}`,
					},
					method: 'GET',
					success: function(res) {
						if (res.statusCode == '200') {
							_this.tools.loadingShow('提交中');
							setTimeout(function() {
								_this.tools.loadingHide();
								_this.citysName = '';
								_this.organization = '';
								_this.contact = '';
								_this.telephone = '';
								_this.onlineAddress = '';
								_this.isSucshow = true;
								_this.isFormshow = false;
							}, 1500);
						} else {
							if (res.data.description) {
								_this.tools.toastShow(res.data.description);
							} else {
								_this.tools.toastShow('提交失败，请稍后重试');
							}
						}
					},
					dataType: JSON
				});
			}
		}
	}
};
</script>

<style lang="scss">
@import 'index.scss';
</style>
