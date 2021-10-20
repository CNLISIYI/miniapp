<template>
	<web-view :src="'https:' + downloadPath"></web-view>
</template>
<script>
export default {
	data() {
		return {
			downloadPath: '',
		};
	},
	onLoad(opts) {
		let _this = this;
		_this.downloadPath = opts.path
		let pages = getCurrentPages(); // 获取页面栈
		pages.map((item, index) => {
			if (item.route == 'pages/index/index') {
				item.$vm.localClass = [];
			}
		});
	},
	
};
</script>
