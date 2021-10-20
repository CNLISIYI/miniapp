<template>
	<view class="">
		<div class="listpage" v-if="total > 1">
			<view :class="['_a', idx == 1 ? 'disabled' : 'on']" @click="prePage">上一页</view>
				<span><i class="_i" style="color: #1184e1;">{{idx}} </i> / <i class="_i" style="color: #999;"> {{total}}</i></span>
			<view :class="['_a', idx == total ? 'disabled' : 'on']" @click="nextPage">下一页</view>
		</div>
	</view>
</template>

<script>
	// import { mapState } from 'vuex' // 注意别漏了引入
	
	export default {
		name: "pagination",
		//属性
		props: {
			total: {
				type: Number, //属性类型
				value: 0
			},
			idx: {
				type: Number, //属性类型
				value: 0
			},
		},
		//组件生命周期
		created: function(e) {
	
		},
		// 引入 mapState 时使用
		// computed: {
		// 	...mapState([ // 获取数据
		// 		"returnTopNum"
		// 	]),
		// },
		methods: {
			prePage() {
				let _this = this;
				if (_this.idx == 1) {
					return;
				}
				// _this.idx--;
				_this.$emit('receiveChild', 'minus');  
			},
			nextPage() {
				let _this = this;
				if (_this.idx == _this.total) {
					return;
				}
				// _this.idx++;
				_this.$emit('receiveChild', 'add');  
			},
		}
	}
</script>

<style lang="scss">
	.listpage { margin: 10px auto; padding: 0 70px; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; display: -moz-box; display: -ms-flexbox; display: flex; display: -webkit-box; display: -webkit-flex; overflow: hidden; font-size: 14px; line-height: 50px; color: #999; background-color: #fff; }
	.listpage a { cursor: pointer; color: #999; }
	.listpage a.on, .listpage a:hover { color: #1084e1; }
	.listpage a.disabled, .listpage a.disabled:hover { cursor: not-allowed; color: #ddd; }
	.listpage span { text-align: center; -moz-box-flex: 1; -ms-flex: 1; flex: 1; -webkit-box-flex: 1; }
	.listpage ._i{
		font-style:normal;
		display: inline-block;
	}
</style>
