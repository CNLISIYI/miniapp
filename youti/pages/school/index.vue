<template>
	<view class="school-body">
		<view class="img-t"
			><image src="../../static/mine/schoolt.jpg"></image
		></view>
		<view class="img-b"
			><image src="../../static/mine/schoolb.jpg"></image
		></view>
		<view class="form-box">
			<view class="input-box">
				<text class="_span">孩子姓名</text>
				<input
					type="text"
					placeholder="不超过10个字符"
					placeholder-style="color:'#999'"
					v-model="formname"
				/>
			</view>
			<view class="input-box">
				<text class="_span">孩子性别</text>
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
				<text class="_span">所在年级</text>
				<view class="picker-box" @click="levelshow = true">
					<input
						type="text"
						placeholder="选择年级"
						placeholder-style="color:'#999'"
						v-model="formlevel"
						disabled
					/>
					<i class="iconfont">&#xe6f8;</i>
				</view>
			</view>
			<view class="input-box">
				<text class="_span">学校名称</text>
				<view class="picker-box" @click="schoolshow = true">
					<input
						type="text"
						placeholder="选择学校名称"
						placeholder-style="color:'#999'"
						v-model="formschool"
						disabled
					/>
					<i class="iconfont">&#xe6f8;</i>
				</view>
			</view>
			<button class="sub-btn">提交</button>
		</view>
		<u-picker
			v-model="maleshow"
			mode="selector"
			:range="maleselect"
			@confirm="malepickdone"
		></u-picker>
		<u-picker
			v-model="levelshow"
			mode="selector"
			:range="levelselect"
			@confirm="levelpickdone"
		></u-picker>
		<u-picker
			v-model="schoolshow"
			mode="selector"
			:range="schoolselect"
			@confirm="schoolpickdone"
		></u-picker>
	</view>
</template>

<script>
export default {
	data() {
		return {
			maleshow: false,
			levelshow: false,
			schoolshow: false,
			maleselect: ["男", "女"],
			levelselect: [
				"一年级",
				"二年级",
				"三年级",
				"四年级",
				"五年级",
				"六年级",
				"七年级",
				"八年级",
				"九年级",
				"高一",
				"高二",
				"高三",
			],
			schoolselect: [
				"红山区第一小学",
				"红山区第三中学",
				"红山区四中",
				"松山二中",
			],
			formname: "",
			formmale: "",
			formlevel: "",
			formschool: "",
		};
	},
	components: {},
	onLoad() {},
	methods: {
		malepickdone(data) {
			this.formmale = this.maleselect[data];
		},
		levelpickdone(data) {
			this.formlevel = this.levelselect[data];
		},
		schoolpickdone(data) {
			this.formschool = this.schoolselect[data];
		},
	},
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
