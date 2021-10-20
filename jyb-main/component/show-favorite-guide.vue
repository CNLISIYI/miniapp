<!-- 添加到我的小程序引导 -->
<template>
	<view class="">
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(opts) {
			
		},
		created() {
		},
		mounted() {
			// console.log("添加到我的小程序");
			swan.showFavoriteGuide({
			    type: 'bar',
			    content:'一键添加到我的小程序',
			    success(res) {
			        // console.log('添加成功：', res);
			    },
			    fail(err) {
			        // console.log('添加失败：', err);
			    }
			})
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	
</style>
