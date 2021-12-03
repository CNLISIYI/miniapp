<template>
	<view class="pd15">
		<view class="_h2"
			>请填写真实信息以供健康查询时核实，避免因信息不符导致检查失败。</view
		>
		<view class="form-box">
			<view class="clearfix">
				<text class="_label _required">姓名</text>
				<view class="item-input">
					<input
						class="_input"
						type="text"
						v-model="formname"
						placeholder="请填写家庭成员真实姓名"
					/>
				</view>
			</view>
			<view class="clearfix">
				<text class="_label">手机号</text>
				<view class="item-input">
					<input
						class="_input"
						type="number"
						v-model="formmobile"
						placeholder="请输入手机号码"
						maxlength="11"
						@input="mobileInput"
					/>
				</view>
			</view>
			<view class="clearfix">
				<text class="_label _required">性别</text>
				<view class="item-input item-radio">
					<u-radio-group
						v-model="formgender"
						placement="row"
					>
						<u-radio activeColor="#19be6b" label="男" name="1">男</u-radio>
						<u-radio activeColor="#19be6b" label="女" name="2">女</u-radio>
					</u-radio-group>
				</view>
			</view>
			<view class="clearfix">
				<text class="_label _required">出生日期</text>
				<view class="item-input" @click="ageshow = true">
					<input
						class="_input"
						type="text"
						placeholder="选择出生日期"
						placeholder-style="color:'#999'"
						v-model="formage"
						disabled
					/>
					<i class="iconfont">&#xe6f8;</i>
				</view>
			</view>
			<view class="clearfix">
				<text class="_label _required">与本人关系</text>
				<view class="item-input" @click="lationshow = true">
					<input
						class="_input"
						type="text"
						placeholder="选择与本人关系"
						placeholder-style="color:'#999'"
						v-model="formlation"
						disabled
					/>
					<i class="iconfont">&#xe6f8;</i>
				</view>
			</view>
		</view>
		<view class="sub-btn">保存</view>
		<u-datetime-picker
			:show="ageshow"
			:value="pickervalue"
			mode="date"
			:minDate="new Date('1920-1-1').getTime()"
			:maxDate="new Date().getTime()"
			@confirm="confirm"
			@cancel="ageshow = false"
		></u-datetime-picker>
		<u-picker
			mode="selector"
			:show="lationshow"
			:columns="lationselect"
			keyName="label"
			@confirm="lationpickdone"
			@cancel="lationshow = false"
		></u-picker>
	</view>
</template>

<script>
export default {
	data() {
		return {
			formname: "",
			formmobile: "",
			formgender: "1",
			formage: "",
			formlation: "",
			lationselect: [
				[{
					label: "儿子",
					id: 1,
				},
				{
					label: "女儿",
					id: 2,
				},
				{
					label: "丈夫",
					id: 3,
				},
				{
					label: "妻子",
					id: 4,
				},
				{
					label: "父亲",
					id: 5,
				},
				{
					label: "母亲",
					id: 6,
				},]
			],
			lationshow: false,
			ageshow: false,
			pickervalue: Number(new Date()),
		};
	},
	components: {},
	onLoad() {},
	methods: {
		mobileInput(e) {
			this.$nextTick(() => {
				this.formmobile = e.detail.value.replace(/[^\d]/g, "");
			});
			// let _e = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, // 邮箱验证规则
			// 	_m = /^1[3456789]\d{9}$/; //手机号验证规则
		},
		// 选择日期
		confirm(e) {
			this.formage = uni.$u.timeFormat(e.value, "yyyy-mm-dd");
			this.pickervalue = e.value;
			this.ageshow = false;
		},
		// 选择关系
		lationpickdone(e) {
			console.log(e)
			this.formlation = e.value[0].label;
			this.lationshow = false;
		},
	},
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
