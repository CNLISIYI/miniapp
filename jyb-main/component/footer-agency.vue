<!-- 机构相关页面底部-btn -->
<template>
	<view>
		<!-- #ifndef MP-BAIDU -->
			<div class="m-footer-blank"></div>
			<div class="m-footer-fixed flex-box bgfff">
				<view class="message-pop" v-if="popshow">
					<view v-if="total==0" class="message">
						<p @click="openKefu">我是教育宝客服，很高兴为您服务！</p>
						<span class="icon-cross-no-bg" @click="closePop"></span>
					</view>
					<view v-else-if="message" class="message">
						<p @click="openKefu">{{message}}</p>
						<span class="icon-cross-no-bg" @click="closePop"></span>
					</view>	
					<view class="triangle"></view>
				</view>
				<!-- <view class="_a m-footer-yuyue m-jyb-receive-yuyue-btn" title="" @click="yuyueFormShowFn">
					<img src="https://static.jiaoyubao.cn/images/mobile/list-shiting.svg" alt="">
					<p>约试听</p>
				</view> -->
				<view class="_a m-footer-yuyue m-jyb-receive-yuyue-btn" @click="handlerTelPhone">
					<img src="https://static.jiaoyubao.cn/images/mobile/shiting.svg" alt="">
					<p>电话咨询</p>
				</view>
				<block v-if="hasfee && !isFeepage">
					<!-- #ifdef MP-WEIXIN -->
					<navigator v-if="usermobile" hover-class="none" :url="'/packageA/fee/index?agency='+agencyename" class="_a m-footer-tel flex-1 m-jyb-call-btn">
						<h3>真实学费</h3>
						<p>报名学员的真实费用</p>
					</navigator>
					<button v-else open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" class="_a m-footer-tel flex-1 m-jyb-call-btn">
						<h3>真实学费</h3>
						<!-- <p>看看别人花了多少钱</p> -->
						<p>报名学员的真实费用</p>
					</button>
					<!-- #endif -->
					<!-- #ifndef MP-WEIXIN -->
					<navigator hover-class="none" :url="'/packageA/fee/index?agency='+agencyename" class="_a m-footer-tel flex-1 m-jyb-call-btn">
						<h3>真实学费</h3>
						<p>报名学员的真实费用</p>
					</navigator>
					<!-- #endif -->
				</block>
				<block v-else>
					<view v-if="!isFeepage" class="_a m-footer-tel flex-1 m-jyb-call-btn" @click="baojiaFormShowFn">
						<!-- <h3>真实学费</h3>
						<p>获取最低报价</p> -->
						<h3>获取报价</h3>
						<p>索取课程的最低折扣价</p>
					</view>
				</block>
				<!-- <view class="_a m-footer-online flex-1" title="" @click="handlerTelPhone">
					<h3>电话咨询</h3>
					<p>本机构老师接听</p>
				</view> -->
				<!-- #ifndef MP-BAIDU -->
				<navigator class="_a m-footer-online flex-1" hover-class="none" url="plugin://myPlugin/chat">
					<h3>在线客服</h3>
					<p>教育宝客服为您服务</p>
				</navigator>
				<!-- #endif -->
				<!-- #ifdef MP-BAIDU -->
				<navigator class="_a m-footer-online flex-1" hover-class="none" url="/packageA/onlinetalk/index">
					<h3>在线客服</h3>
					<p>教育宝客服为您服务</p>
				</navigator>
				<!-- #endif -->
			</div>

			<div class="m-fixed-form-mask" v-if="yuyueFormShow || baojiaFormShow" @click="yuyueFormHideFn"></div>
			<div class="m-fixed-form-outer m-form-container fixed-form-slideDown" v-if="yuyueFormShow || baojiaFormShow" :animation="animationData">
				<div class="m-fixed-form-title">
					<block v-if="yuyueFormShow">
						<img class="m-fixed-yy-img" src="https://static.jiaoyubao.cn/images/mobile/list-shiting.svg" alt=""><span>免费预约试听</span>
					</block>
					<block v-if="baojiaFormShow">
						<img class="m-fixed-yy-img" src="https://static.jiaoyubao.cn/images/mobile/list-cal.svg" alt=""><span>获取课程最低报价</span>
					</block>
					<view class="_a m-fixed-form-close" @click="yuyueFormHideFn"><img src="https://static.jiaoyubao.cn/images/mobile/icon-closed.svg" alt=""></view>
				</div>
				<view class="footer-form-container">
					<block v-if="yuyueFormShow">
						<form-yuyue :course="course" :campus="campus" :pagename="pagename" :comid="comId" :cityename="cityename" :agencyename="agencyename" resetbtn="true" @popClose="yuyueFormHideFn"></form-yuyue>
					</block>
					<block v-if="baojiaFormShow">
						<form-baojia :course="course" :pagename="pagename" :comid="comId" :cityename="cityename" :agencyename="agencyename" resetbtn="true" @popClose="yuyueFormHideFn"></form-baojia>
					</block>
				</view>
			</div>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		name: "footer-agency",
		data(){
			return{
				yuyueFormShow: false,
				baojiaFormShow: false,
				animationData: {},
				comId: '',
				total: 0,
				message: '',
				formPhone: ''
			}
		},
		//属性
		props: {
			hasfee: {
				type: Boolean,
				value: false
			},
			isFeepage: {
				type: Boolean,
				value: false
			},
			cityename: {
				type: String, //属性类型
				value: ''
			},
			agencyename: {
				type: String, //属性类型
				value: ''
			},
			course: {
				type: Array, //属性类型
				value: []
			},
			campus: {
				type: Array, //属性类型
				value: []
			},
			pagename: {
				type: String, //属性类型
				value: ''
			},
			detailobj: {
				type: Object, //属性类型
				value: {}
			},
			usermobile: {
				type: String,
				value: ''
			}
		},
		//组件生命周期
		created: function(e) {
			let _this = this;
			_this.total = uni.getStorageSync('total') || 0;
			_this.message = uni.getStorageSync('message') || '我是教育宝客服，很高兴为您服务！';
			// #ifndef MP-BAIDU
			setInterval(function(){
				const myPluginInterface = requirePlugin('myPlugin');
				myPluginInterface._$onunread(res => {
					if(res.total>_this.total) {
						_this.popshow = true;
					}
					_this.total = res.total;
					_this.message = res.message.content;
				});
				uni.setStorageSync('total', _this.total);
				uni.setStorageSync('message', _this.message);
			},1000)
			_this.popshow = true;
			// #endif
		},
		mounted() {
			let _this = this;
			let animation = uni.createAnimation({
				duration: 500,
				timingFunction: 'ease',
			})

			_this.animation = animation;

			// console.log("_this.detailobj");
			// console.log(_this.detailobj);
			_this.comId = _this.detailobj.id;
		},
		destroyed() {
		},
		methods: {
			getPhoneNumber(e) {
				let _this = this;
				if (e.detail.errMsg == 'getPhoneNumber:fail user deny' || e.detail.errMsg == 'getPhoneNumber:fail:user deny') {
					_this.tools.toastShow('授权失败');
					uni.navigateTo({
						url:`/packageA/fee/index?agency=${_this.agencyename}`
					})
				}
				else {
					console.log(uni.getStorageSync('userSession'))
					uni.request({
					  url: 'https://webapi.jiaoyubao.cn/decryptPhone/',
					  method: 'POST',
					  data: JSON.stringify({
						  encryptedData: e.detail.encryptedData,
						  iv: e.detail.iv,
						  session_key: uni.getStorageSync('userSession'),
					  }),
					  dataType: 'json',
					  header: {
					    'content-type': 'application/json' 
					  },
					  success:function(res){
						_this.formPhone = JSON.parse(res.data.data).purePhoneNumber;
						uni.setStorageSync('userMobile', _this.formPhone);
					    uni.navigateTo({
					    	url:`/packageA/fee/index?agency=${_this.agencyename}`
					    })
					  },
					  fail:function(res){
					  }
					})
				}
			},
			handlerTelPhone() {
				let _this = this;
				_this.$emit('handlerTelPhone', '');
			},
			yuyueFormShowFn() {
				let _this = this;
				_this.yuyueFormShow = true;
				setTimeout(function() {
					_this.animation.bottom(0).step();
					_this.animationData = _this.animation.export();
				}, 50);
			},
			baojiaFormShowFn() {
				let _this = this;
				_this.baojiaFormShow = true;
				setTimeout(function() {
					_this.animation.bottom(0).step();
					_this.animationData = _this.animation.export();
				}, 50);
			},
			yuyueFormHideFn(){
				let _this = this;
				_this.animation.bottom('-350px').step();
				_this.animationData = _this.animation.export();
				setTimeout(function() {
					_this.yuyueFormShow = false;
					_this.baojiaFormShow = false;
				}, 400);
			},
			closePop() {
				this.popshow = false;
			},
			openKefu() {
				// #ifndef MP-BAIDU
				uni.navigateTo({
					url: "plugin://myPlugin/chat"
				})
				// #endif
			}
		}
	}
</script>

<style lang="scss">
	.message-pop {
		position: absolute;
		top: -48px;
		right: 8px;
		max-width: calc(100vw - 16px);
		height: 40px;
		padding: 0 16px;
		background: #FFFFFF;
		border-radius: 20px;
		box-shadow: 0 2px 6px rgba($color: #000000, $alpha: 0.1);
	}
	.message {
		font-size: 0;
	}
	.m-footer-fixed .message-pop p {
		display: inline-block;
		max-width: 604upx;
		font-size: 28upx;
		color: #262626;
		line-height: 40px;
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.m-footer-fixed .message-pop span {
		@include icon-mask(icon-cross-no-bg);
		float: right;
		width: 16px;
		height: 16px;
		background: #8C8C8C;
		margin: 12px 0 0 8px;
	}
	.message-pop .triangle{
		position: absolute;
		right: 30px;
		bottom: -5;
		width: 0;
		height: 0;
		border-width: 0px 0px 5px 10px;
		border-style: solid;
		border-color: transparent transparent #FFFFFF;
		transform: rotate(180deg);
	}
	.m-jyb-bottom-blank {
		width: 100%;
		height: 20px;
	}

	.m-footer-blank {
		width: 100%;
		height: 54px;
	}

	.m-footer-fixed {
		width: 100%;
		height: 56px;
		position: fixed;
		padding-right: 8px;
		z-index: 100;
		bottom: 0;
		left: 0;
		border-top: .5px solid #e1e1e1;
	}

	.m-footer-fixed ._a {
		height: 40px;
		display: block;
		text-align: center;
	}

	.m-footer-fixed h3 {
		margin-top: 5px;
		font-size: 15px;
		line-height: 20px;
	}

	.m-footer-fixed p {
		font-size: 10px;
		font-weight: normal;
		line-height: 1;
	}

@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
	.m-footer-fixed {
		height: 168upx;
		padding-bottom: 68upx;
	}
}
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
	.m-footer-fixed {
		height: 168upx;
		padding-bottom: 68upx;
	}
}

@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
	.m-footer-fixed {
		height: 150upx;
		padding-bottom: 50upx;
	}
}
	.m-footer-yuyue {
		width: 67px;
		background: #fff;
	}

	.m-footer-yuyue img {
		// width: 20px;
		// height: 20px;
		// margin-top: 6px;
		width: 24px;
		height: 24px;
		display: inline-block;
	}

	.m-footer-yuyue p {
		height: 16px;
		margin-top: -3px;
		font-size: 11px;
		font-weight: normal;
		line-height: 12px;
		color: #262626;
	}

	.m-footer-tel {
		color: #1a8cff;
		background: #e6f4ff;
		border-radius: 20px 0 0 20px;
		-webkit-box-shadow: inset 0 0 0 0 #e1e1e1;
		-moz-box-shadow: inset 0 0 0 0 #e1e1e1;
		box-shadow: inset 0 0 0 0 #e1e1e1;
	}

	.m-footer-online {
		color: #fff;
		background: #1a8cff;
		border-radius: 0 20px 20px 0;
		-webkit-box-shadow: inset 0 0 0 0 #e1e1e1;
		-moz-box-shadow: inset 0 0 0 0 #e1e1e1;
		box-shadow: inset 0 0 0 0 #e1e1e1;
	}

	.m-fixed-form-mask { width: 100%; height: 100%; position: fixed; z-index: 101; top: 0; left: 0; background: rgba(0, 0, 0, .6); }
	.m-fixed-form-outer { width: 100%; /*min-height: 180px;*/ height: auto; position: fixed; z-index: 200; bottom: -350px; left: 0; background: #fff; }

	.m-fixed-form-close { width: 50px; height: 50px; position: absolute; top: 0; right: 0; }
	.m-fixed-form-close img { width: 18px; height: 18px; position: absolute; top: 15px; right: 16px; }

	.m-fixed-form-outer .jyb-btn { width: 100%; height: 48px; font-size: 16px; font-weight: 600; color: #e7f2fc; -moz-border-radius: 0; border-radius: 0; }

	.footer-form-container{
		padding: 0 24px;
	}
</style>
