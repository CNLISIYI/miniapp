<!-- 机构相关子页面-头部 tab 切换 -->
<template>
	<div class="m-swiper-tab-box">
		<div class="m-evaluation-tab-outer m-swiper-tab swiper-container">
			<view class="com-swiper-container-outer" style="height: 30px; padding-right: 15px;">
				<ul class="m-evaluation-tab swiper-wrapper com-swiper-container flex-box clearfloat" style="height: 50px;">
					<block v-if="rendertype == 'link'">
						<li v-if="page == 'school'" :class="['swiper-slide', active == 'all' ? 'active' : '']" key="-1">
							<!-- :url="'/pages/' + page + '/index?agency=' + agencyename + '&id='" -->
							<view hover-class="none" class="_a" data-areacode="all" data-name="全部" @click="clickTabItem">
								全部
								<text v-if="total">({{ total }})</text>
							</view>
						</li>
						<li v-else :class="['swiper-slide', active == '' ? 'active' : '']" key="-1">
							<navigator hover-class="none" open-type="redirect" :url="'/pages/' + page + '/index?agency=' + agencyename + '&id='" class="_a">
								全部
								<text v-if="total">({{ total }})</text>
							</navigator>
						</li>
						<block v-if="page == 'school'">
							<li
								:class="['swiper-slide', active == item.areacode || (active == 'other' && index == tabarr.length - 1) ? 'active' : '']"
								v-for="(item, index) in tabarr"
								:key="index"
								style="float: left;"
							>
								<!-- :url="'/pages/' + page + '/index?agency=' + agencyename + '&id=' + item.areacode" -->
								<view hover-class="none" :data-areacode="item.areacode" :data-name="item.name" @click="clickTabItem" class="_a">
									{{ item.name }}
									<text v-if="item.count">({{ item.count }})</text>
								</view>
							</li>
						</block>
						<block v-else>
							<li :class="['swiper-slide', active == item.id ? 'active' : '']" v-for="(item, index) in tabarr" :key="index" style="float: left;">
								<navigator
									hover-class="none"
									open-type="redirect"
									:url="'/pages/' + page + '/index?agency=' + agencyename + '&id=' + item.id"
									class="_a"
								>
									{{ item.name }}
									<text v-if="item.count">({{ item.count }})</text>
								</navigator>
							</li>
						</block>
					</block>

					<block v-else>
						<li :class="['swiper-slide', active == '' ? 'active' : '']" key="-1">
							<view class="_a" @click="tabChange" data-id="-1">
								全部
								<text v-if="total">({{ total }})</text>
							</view>
						</li>
						<li
							v-if="page == 'school'"
							:class="['swiper-slide', active == item.areacode ? 'active' : '']"
							v-for="(item, index) in tabarr"
							:key="index"
							@click="tabChange"
							:data-id="item.id"
							:data-name="item.name"
						>
							<view class="_a">
								{{ item.name }}
								<text v-if="item.count && total > 0">({{ total }})</text>
							</view>
						</li>
						<li v-else :class="['swiper-slide', active == item.id ? 'active' : '']" v-for="(item, index) in tabarr" :key="index" @click="tabChange" :data-id="item.id">
							<view class="_a">
								{{ item.name }}
								<text v-if="item.count && total > 0">({{ total }})</text>
							</view>
						</li>
					</block>
				</ul>
			</view>
		</div>
	</div>
</template>

<script>
// import { mapState } from 'vuex' // 注意别漏了引入

export default {
	name: 'header-tab',
	//属性
	props: {
		rendertype: {
			type: String, //属性类型
			value: '' // link or click-element
		},
		page: {
			type: String,
			value: ''
		},
		cityename: {
			// city ename
			type: String,
			value: ''
		},
		agencyename: {
			// agency ename
			type: String,
			value: ''
		},
		total: {
			type: Number,
			value: 0
		},
		tabarr: {
			type: Array,
			value: []
		},
		active: {
			type: String,
			value: ''
		}
	},
	//组件生命周期
	created: function(e) {},
	// 引入 mapState 时使用
	// computed: {
	// 	...mapState([ // 获取数据
	// 		"returnTopNum"
	// 	]),
	// },
	methods: {
		tabChange(e) {
			let _this = this;
			let id = e.currentTarget.dataset.id;
			_this.$emit('receiveFromChild', id);
		},
		clickTabItem(e) {
			let _this = this;
			let data = {
				name: e.currentTarget.dataset.name,
				areacode: e.currentTarget.dataset.areacode
			};
			_this.$emit('clickTabItem', data);
		}
	}
};
</script>

<style lang="scss">
.m-evaluation-tab-outer {
	@include pt(20px);
	@include pb(20px);
	@include bgc(#fff);
}
.m-evaluation-tab {
	height: 30px;
}
.m-evaluation-tab ._li {
	width: auto;
	height: 30px;
	display: inline-block;
	float: left;
	@include mr(10px);
	line-height: 30px;
	text-align: center;
	-moz-border-radius: 15px;
	border-radius: 15px;
	background: #f5f6f7;
	&:first-child {
		margin-left: 15px;
	}
}
.m-evaluation-tab ._li ._a {
	padding: 0 20px;
	display: block;
	font-size: 12px;
	color: #595959;
}
.m-evaluation-tab ._li.active {
	background: #1a8cff;
}
.m-evaluation-tab ._li.active ._a {
	color: #fff;
}
@media screen and (max-width: 320px) {
	.m-evaluation-top {
		padding: 16px 6px 20px;
	}
	.m-evaluation-score-right p span + span {
		margin-left: 4px;
	}
	.m-evaluation-tab {
		width: -moz-calc(100% + 6px);
		width: calc(100% + 6px);
	}
}
</style>
