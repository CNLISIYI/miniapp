<!-- 面包屑 -->
<template>
	<ul class="m-list-breadnav bgfff mtop10 clearfloat">
		<li><navigator hover-class="none" open-type="reLaunch" class="_a" url="/pages/index/index">教育宝</navigator><img  src="https://static.jiaoyubao.cn/images/mobile/icon-rightarrow.svg" alt=""></li>
		<li><navigator hover-class="none" open-type="reLaunch" class="_a" url="/pages/index/index">{{cityname}}</navigator><img  src="https://static.jiaoyubao.cn/images/mobile/icon-rightarrow.svg" alt=""></li>
		<li v-if="classename != ''"><navigator hover-class="none" class="_a" :url="'/pages/agencylist/index?class='+classename">{{classname}}</navigator><img  src="https://static.jiaoyubao.cn/images/mobile/icon-rightarrow.svg" alt=""></li>
		<li><navigator hover-class="none" class="_a">{{agencyname}}</navigator></li>
	</ul>
</template>

<script>
	// import { mapState } from 'vuex' // 注意别漏了引入
	
	export default {
		name: "bread-crumbs",
		//属性
		props: {
			isajax: {
				type: Boolean,
				value: false
			},
			detailobj: {
				type: Object, //属性类型
				value: {}
			},
			classobj: {
				type: Object, //属性类型
				value: {}
			},
		},
		data(){
			return {
				cityname : '',
				agencyname : '',
				classename : '',
				classname : '',
			}
		},
		//组件生命周期
		created: function(e) {
			
		},
		mounted() {
			let _this = this;
			// console.log("_this.detailobj");
			// console.log(_this.detailobj);
			// console.log(_this.classobj);
			if(!_this.isajax){				
				_this.cityname = _this.detailobj.cityname;
				_this.agencyname = _this.detailobj.name;
				_this.classename = _this.classobj.ename;
				_this.classname = _this.classobj.name;
			}else{
				// 请求接口，获取渲染所需数据
				
				
				// _this.cityname = "北京";
				// _this.agencyname = "大智";
				// _this.classename = "yingyu";
				// _this.classname = "英语";
			}
		},
		// 引入 mapState 时使用
		// computed: {
		// 	...mapState([ // 获取数据
		// 		"returnTopNum"
		// 	]),
		// },
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.m-list-breadnav { height: 40px; padding: 11px 0 11px 13px; line-height: 18px; }
	.m-list-breadnav li { margin-left: 3px; display: -webkit-box; display: -moz-box; display: -ms-flexbox; display: flex; float: left; }
	.m-list-breadnav li:first-child { margin-left: 0; }
	.m-list-breadnav li a { display: inline-block; font-size: 12px; line-height: 18px; text-align: left; letter-spacing: 0; color: #323232; }
	.m-list-breadnav li img { width: 10px; height: 18px; margin-left: 3px; display: inline-block; }
	.m-list-breadnav li:hover > a { color: #1a8cff; }
</style>
