<template>
	<div class="m-list_pop m-list_pop-category">
		<div class="m-list_pop-inner" style="padding: 3vh 0vw 3vh 4vw;">
			<p class="m-category-sifttitle">机构特色</p>
			<ul class="m-category-sift">
				<button
					v-for="(item, index) in siftList"
					:key="index"
					:data-idx="index"
					:data-name="item.mc"
					:data-ename="item.emc"
					:data-check="item.checked"  
					:checked="item.checked"
					@tap="clickSift"
					:class="['_li', item.checked ? 'active' : '']"
				>
					<text class="_a">{{ item.mc }}</text>
				</button>
			</ul>
			<div class="m-intro-line"><span></span></div>
			<div class="flex-box" style="padding-bottom:15px">
				<view hover-class="none" class="_a jyb-btn flex-1 clear-sift" @click="clearSift">清除筛选</view>
				<view hover-class="none" class="_a jyb-btn flex-1 jyb-btn-blue done-sift" @click="chooseSiftDone">完成</view>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'agency-sift',
	//属性
	props: {
		sift: {
			type: Array,
			value: []
		},
	},
	data() {
		return {
			siftChoose: [],
			siftList: this.sift,
			itemidx: []
		};
	},
	//组件生命周期
	created: function(e) {
		
	},
	methods: {
		clickSift(e) {
			let _this = this;
			_this.siftList[e.currentTarget.dataset.idx].checked = !_this.siftList[e.currentTarget.dataset.idx].checked;
		},
		// 清空
		clearSift(e) {
			let _this = this;
			_this.siftList.map((item, index) => {
				item.checked = false;
			});
			_this.siftChoose = [];
			_this.$emit('clearSift', _this.siftChoose);
		},
		chooseSiftDone(e) {
			let _this = this;
			_this.siftList.map((item, index) => {
				if (item.checked) {
					_this.siftChoose.push(item);
				}
			});
			_this.$emit('chooseSiftDone', _this.siftChoose);
		},
		
	}
};
</script>

<style lang="scss">
.m-category-sifttitle {
	font-size: 24upx;
	color: #ababab;
	line-height: 24upx;
	text-align: left;
}
.m-category-sift {
	width: 660upx;
	height: 65vh;
	padding-top: 2.4vh;
	padding-bottom: 60upx;
	overflow-y: auto;
}
.m-category-sift li {
	float: left;
	width: 26.4vw;
	height: 5.4vh;
	margin-right: 2.4vw;
	margin-bottom: 1.3vh;
	border-radius: 8upx;
	background-color: #fafbfc;
}
.m-category-sift text {
	display: block;
	font-size: 26upx;
	line-height: 5.4vh;
	text-align: center;
	color: #595959;
}
.m-category-sift .active {
	background-color: #e6f7ff;
}
.m-category-sift .active text {
	color: #1a8cff;
	font-weight: bold;
}
.m-intro-line {
	width: 100%;
	height: 2upx;
	padding: 32upx 30upx 32upx 0px;
	background: #fff;
}
.m-intro-line span {
	width: 100%;
	height: 2upx;
	display: inline-block;
	float: left;
	background: #eee;
}
.jyb-btn {
	width: 100%;
	height: 80upx;
	line-height: 80upx;
	border: 1px solid #e5e8ed;
	font-size: 30upx;
	font-weight: 400;
	color: #262626;
	-moz-border-radius: 44upx;
	border-radius: 44upx;
}
.jyb-btn-blue {
	margin-left: 18upx;
	margin-right: 30upx;
	background-color: #1a8cff;
	color: #ffffff;
}
</style>
