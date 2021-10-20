<!-- 机构相关页面-拨打电话 底部弹出层 -->
<!-- ———————————————————————————————————— 此页面废弃 ———————————————————————————————————— -->
<template>
	<view>
		<div class="m-fixed-form-mask"></div>
		<div class="m-fixed-phone-call fixed-call-slideDown">
			<div class="m-fixed-phone-call-title">
				<em>与</em><span class="ellipsis-1">{{detailobj.name}}</span><em>免费通话</em>
				<view class="m-fixed-form-close" title="" @click="closeTelPop">
					<img src="https://static.jiaoyubao.cn/images/mobile/icon-closed.svg" alt="">
				</view>
			</div>
			<div class="m-fixed-phone-call-tips">拨通后，需手动拨打分机号码</div>
			<div class="m-fixed-phone-call-num">{{detailobj.callcode}}</div>
			<div class="m-fixed-phone-call-btn" @click="makeTelPhone">立即拨打</div>
		</div>
	</view>
</template>

<script>
	export default {
		name: "tel-phone-pop",
		//属性
		props: {
			agency: {
				type: String, //属性类型
				value: ""
			},
			code: {
				type: String, //属性类型
				value: ""
			},
			detailobj: {
				type: Object,
				value: {
					callcode: '',
					name: ''
				}
			}
		},
		//组件生命周期
		created: function(e) {
	
		},
		methods: {
			closeTelPop(){
				let _this = this;
				_this.$emit('telPhonePopHide','');  
			},
			makeTelPhone(){
				uni.makePhoneCall({
					phoneNumber: getApp().globalData.tel400
				});		
			},
		}
	}
</script>

<style>
	/**
	 * 拨打电话
	 */
	.m-fixed-form-mask { width: 100%; height: 100%; position: fixed; z-index: 101; top: 0; left: 0; background: rgba(0, 0, 0, .6); }
	.m-fixed-phone-call { width: 100%; margin: auto; position: fixed; z-index: 200; bottom: 0; overflow: hidden; overflow: hidden; background: #fff; }
	.m-fixed-phone-call-title { height: 50px; display: -webkit-box; display: -moz-box; display: -ms-flexbox; display: flex; font-size: 16px; line-height: 50px; text-align: center; color: #262626; background: #f9f9f9; -webkit-box-pack: center; -moz-box-pack: center; -ms-flex-pack: center; justify-content: center; }
	.m-fixed-phone-call-title span, .m-fixed-phone-call-title em { display: inline-block; }
	.m-fixed-phone-call-title span { max-width: -moz-calc(100vw - 150px); max-width: calc(100vw - 150px); }
	.m-fixed-phone-call-tips { padding-top: 30px; font-size: 16px; line-height: 18px; text-align: center; color: #262626; background: #fff; }
	.m-fixed-phone-call-num { margin-top: 20px; font-size: 36px; text-align: center; color: #fe5467; }
	.m-fixed-phone-call-btn { width: 100%; height: 48px; margin: auto; margin-top: 30px; font-size: 16px; line-height: 48px; text-align: center; color: #e7f2fc; background: #1a8cff; }
	.m-fixed-form-close { width: 50px; height: 50px; position: absolute; top: 0; right: 0; }
	.m-fixed-form-close img { width: 18px; height: 18px; position: absolute; top: 15px; right: 16px; }
</style>
