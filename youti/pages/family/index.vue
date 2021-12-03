<template>
	<view class="bgf7">
		<view class="fam-ul">
			<navigator url="../familyinfo/index" class="_li" v-for="(item,index) in familyList" :key="index" hover-class="none">
				<view class="_top">
					<text class="_h4">{{item.name}}</text>
					<view class="_span">{{$tools.changeRelation(item.relation)}}</view>
				</view>
				<view class="_bottom">
					<text>{{item.gentle==0?'女':'男'}}</text>
					<text>{{item.date}}</text>
				</view>
				<i class="iconfont">&#xe69e;</i>
			</navigator>
		</view>
		<navigator url="../familyinfo/index" class="add-btn" hover-class="none">
			<i class="iconfont">&#xe671;</i><text>添加成员</text>
		</navigator>
	</view>
</template>

<script>
export default {
	data() {
		return {
			familyList: [
				{ name: "张三", gentle: 0, date: "1989/10/18", relation: 1 },
				{ name: "李四", gentle: 1, date: "1989/10/18", relation: 3 },
				{ name: "王五", gentle: 0, date: "1989/10/18", relation: 2 },
			],
		};
	},
	components: {},
	onLoad() {},
	methods: {},
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
