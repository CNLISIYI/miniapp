<template>
	<view class="school-body">
		<view class="ignore-btn" @click="$tools.naviPrev()" hover-class="none">跳过</view>
		<view class="img-t"
			><image src="../../static/mine/schoolt.jpg"></image
		></view>
		<view class="img-b"
			><image src="../../static/mine/schoolb.jpg"></image
		></view>
		<view class="form-box">
			<view class="input-box">
				<text class="_span">真实姓名</text>
				<input
					type="text"
					placeholder="不超过10个字符"
					placeholder-style="color:'#999'"
					v-model="formname"
				/>
			</view>
			<view class="input-box">
				<text class="_span">性别</text>
				<view class="picker-box" @click="maleshow = true">
					<input
						type="text"
						placeholder="选择性别"
						placeholder-style="color:'#999'"
						v-model="formmale"
						disabled
					/>
					<i class="iconfont">&#xe6f8;</i>
				</view>
			</view>
			<view class="input-box">
				<text class="_span">出生日期</text>
				<view class="picker-box" @click="ageshow = true">
					<input
						type="text"
						placeholder="选择出生日期"
						placeholder-style="color:'#999'"
						v-model="formage"
						disabled
					/>
					<i class="iconfont">&#xe6f8;</i>
				</view>
			</view>
			<view class="input-box">
				<text class="_span">手机号</text>
				<input type="text" v-model="formphone" disabled="disabled" />
			</view>
			<button class="sub-btn">提交</button>
		</view>
		<u-picker
			mode="selector"
			:show="maleshow"
			:columns="maleselect"
			@confirm="malepickdone"
			@cancel="maleshow = false"
		></u-picker>
		<u-datetime-picker
			:show="ageshow"
			:value="pickervalue"
			mode="date"
			:minDate="new Date('1920-1-1').getTime()"
			:maxDate="new Date().getTime()"
			@confirm="confirm"
			@cancel="ageshow = false"
		></u-datetime-picker>
	</view>
</template>

<script>
export default {
	data() {
		return {
			maleshow: false,
			ageshow: false,
			maleselect: [["男", "女"]],
			formname: "",
			formmale: "",
			formage: "",
			pickervalue: Number(new Date()),
			formphone: getApp().globalData.phone,
		};
	},
	components: {},
	onLoad() {
		this.formmale = uni.getStorageSync("userInfo").gender ? "男" : "女";
	},
	methods: {
		// 选择性别
		malepickdone(e) {
			this.formmale = e.value[0];
			this.maleshow = false;
		},
		// 选择日期
		confirm(e) {
			this.formage = uni.$u.timeFormat(e.value, "yyyy-mm-dd");
			this.pickervalue = e.value;
			this.ageshow = false;
		},
	},
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
