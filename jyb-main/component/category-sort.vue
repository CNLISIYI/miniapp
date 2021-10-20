<!-- 类别-三级筛选 -->
<template>
	<div class="m-list_pop m-list_pop-category">
		<div class="m-list_pop-inner flex-box">
			<ul class="m-category-left">
				<li :class="index == idx[0] ? 'active' : ''" v-for="(item,index) in category" :key="index" :data-idx="index" data-sort="0" @click="clickCategory"><text class="_a">{{item.name}}</text></li>
			</ul>
			<div class="m-category-middle">
				<ul>
					<li :class="index == idx[1] ? 'active' : ''" v-for="(item,index) in category[idx[0]].child" :key="index" :data-idx="index" data-sort="1" @click="clickCategory"><text class="_a">{{item.name}}</text></li>
				</ul>
			</div>
			<div class="m-category-right">
				<div class="m-category-right-item">
					<ul>
						<li :class="index == idx[2] ? 'active' : ''" v-for="(item,index) in category[idx[0]].child[idx[1]].child" :key="index" :data-idx="index" :data-ename="item.url" :data-name="item.name" data-sort="2" @click="clickCategory"><text class="_a">{{item.name}}</text></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
		export default {
		name: "category-sort",
		//属性
		props: {
			category: {
				type: Array,
				value: []
			},
			idx: {
				type: Array,
				value: []
			},
		},
		//组件生命周期
		created: function(e) {
	
		},
		methods: {
			clickCategory(e) {
				let _this = this;
				let data = {
					sort : e.currentTarget.dataset.sort,
					idx : e.currentTarget.dataset.idx,
				}
				if(e.currentTarget.dataset.sort == 2){
					data.ename = e.currentTarget.dataset.ename;
					let curName = e.currentTarget.dataset.name;
					if(curName == "全部"){
						data.name = _this.category[_this.idx[0]].child[_this.idx[1]].name;
					}else{
						data.name = curName;
					}
				}
				_this.$emit('clickCategory', data);
			},
		}
	}
</script>

<style>
</style>
