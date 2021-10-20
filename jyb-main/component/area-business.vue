<!-- 商圈-二级筛选 -->
<template>
	<div :class="['m-list_pop', position == 'list-pop-business' ? 'm-list_pop-business' : position == 'location-select' ? 'jyb-location-select flex-box' : '' ]">
		<div class="m-list_pop-inner flex-box">
			<ul class="m-category-left">
				<li :class="index == areaIdx ? 'active' : ''" v-for="(item,index) in area" :key="index" :data-name="item.name" :data-ename="item.ename" :data-idx="index" @click="clickArea">
					<text class="_a" href="javascript:;">{{item.name}}</text>
				</li>
			</ul>
			<div class="m-category-middle flex-1">
				<ul>
					<li :class="index == businessIdx ? 'active' : ''" v-for="(item,index) in business" :key="index" :data-name="item.name" :data-ename="item.ename" :data-idx="index" @click="clickBusiness">
						<text class="_a" href="javascript:;">{{item.name}}</text>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "area-business",
		//属性
		props: {
			position:{
				type: String,
				value: "list-pop-business" // location-select
			},
			area: {
				type: Array,
				value: []
			},
			business: {
				type: Array,
				value: []
			},
			areaIdx: {
				type: Number,
				value: 0
			},
			businessIdx: {
				type: Number,
				value: 0
			},
		},
		//组件生命周期
		created: function(e) {

		},
		methods: {
			clickArea(e) {
				let _this = this;
				let data = {
					name : e.currentTarget.dataset.name,
					ename : e.currentTarget.dataset.ename,
					idx : e.currentTarget.dataset.idx,
				}
				_this.$emit('chooseArea', data);
			},
			clickBusiness(e) {
				let _this = this;
				let data = {
					name : e.currentTarget.dataset.name,
					ename : e.currentTarget.dataset.ename,
					idx : e.currentTarget.dataset.idx,
				}
				_this.$emit('chooseBusiness', data);
			},
		}
	}
</script>

<style lang="scss">
	.jyb-location-select{
		.m-list_pop-inner{
			height: calc(100vh - 348rpx);
			top: 348rpx;
		}
	}
</style>
