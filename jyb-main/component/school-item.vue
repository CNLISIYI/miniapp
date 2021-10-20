<template>
	<ul class="m-school-list">
		<li :class="['flex-box', hasactive == 'true' && ((sortid == '' && index == 0) || item.id == sortid) ? 'active' : '']" v-for="(item, index) in schools" :key="index">
			<!-- :url="'/pages/school/index?city='+cityename+'&agency='+agencyename+'&id='+item.areacode+'&schoolId='+item.id" -->
			<view hover-class="none" class="m-school-item flex-1 flex-box" title="" @click="clickSchoolItem" :data-id="item.id" :data-areacode="item.areacode">
				<!-- <img  src="https://static.jiaoyubao.cn/images/mobile/map-num.svg" alt=""> -->
				<img class="img-active-hide" src="https://static.jiaoyubao.cn/images/mobile/map-num.svg" alt="" />
				<img class="img-active-show" src="https://static.jiaoyubao.cn/images/mobile/map-num-fill.svg" alt="" />
				<span class="m-school-item-num">{{ index + 1 }}</span>
				<div class="m-school-item-intro flex-1">
					<h3>
						{{ item.pointname }}
						<span v-if="item.minlength > 0">(距您{{ item.minlength }}km)</span>
					</h3>
					<p class="ellipsis-1">{{ item.pointaddress }}</p>
				</div>
			</view>
			<!-- <view class="m-school-tel m-jyb-call-btn" @click="sendParMakeTelPhone" title=""><img src="https://static.jiaoyubao.cn/images/mobile/icon-phone.svg" alt="" /></view> -->
			<view class="m-school-btn m-school-zx" @click="sendParMakeTelPhone" title="">
				<image class="_img" src="https://static.jiaoyubao.cn/images/common/hdxq-xq-zx-icon.svg" alt="" />
				<span>咨询</span>
			</view>
			<view class="m-school-btn m-school-dh" @click="openLocationRoad" :data-x="item.map_x" :data-y="item.map_y" :data-pointaddress="item.pointaddress" :data-pointname="item.pointname">
				<image class="_img" src="https://static.jiaoyubao.cn/images/common/hdxq-xq-dh-icon.svg" alt="" />
				<span>路线</span>
			</view>
		</li>
	</ul>
</template>

<script>
// import { mapState } from 'vuex' // 注意别漏了引入

export default {
	name: 'school-item',
	//属性
	props: {
		hasactive: {
			type: String,
			value: 'false'
		},
		sortid: {
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
		schools: {
			type: Array, //属性类型
			value: []
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
		sendParMakeTelPhone() {
			let _this = this;
			_this.$emit('receiveMakeTelPhone', '');
		},
		clickSchoolItem(e) {
			let _this = this;
			let data = {
				id: e.currentTarget.dataset.id,
				areacode: e.currentTarget.dataset.areacode
			};
			_this.$emit('clickSchoolItem', data);
		},
		openLocationRoad(e) {
			let obj = this.bd_decrypt(e.currentTarget.dataset.y, e.currentTarget.dataset.x);
			uni.getLocation({
			 type: 'gcj02', //返回可以用于uni.openLocation的经纬度
			 success (res) {
			   const latitude = obj.lat;
			   const longitude = obj.lon;
			   const name = e.currentTarget.dataset.pointname;
			   const address = e.currentTarget.dataset.pointaddress;
			   uni.openLocation({
			     latitude,
			     longitude,
				 name,
				 address,
			     scale: 18
			   })
			 }
			})
		},
		// 百度地图坐标转腾讯地图坐标
		bd_decrypt: function(bdLat, bdLon) {
			let PI = 3.14159265358979324;
			let x_pi = (3.14159265358979324 * 3000.0) / 180.0;
			let x = bdLon - 0.0065,
				y = bdLat - 0.006;
			let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
			let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
			let gcjLon = z * Math.cos(theta);
			let gcjLat = z * Math.sin(theta);
			// // console.log(gcjLat, gcjLon);
			return { lat: gcjLat, lon: gcjLon };
		},
	}
};
</script>

<style lang="scss">
.m-school-list {
	margin-top: 9px;
}
.m-school-list li {
	width: auto;
	margin-left: 24px;
	padding: 13px 15px 14px 0;
	position: relative;
	border-bottom: 0.5px solid #eee;
}
.m-school-list li:last-child {
	border-bottom: 0;
}
.m-school-tel {
	width: 44px;
	height: 24px;
	margin-right: 5px;
	padding-left: 20px;
	display: inline-block;
	border-left: 0.5px solid #eee;
}
.m-school-tel img {
	width: 100%;
	height: 100%;
}
.m-school-item {
	position: relative;
}
.m-school-item > img {
	width: 24px;
	height: 24px;
	position: absolute;
	top: 8px;
	left: -24px;
}
.m-school-item-num {
	width: 20px;
	position: absolute;
	z-index: 11;
	top: 11px;
	left: -22px;
	display: inline-block;
	font-size: 12px;
	text-align: center;
	color: #d9d9da;
}
.m-school-item-intro {
	margin-left: 8px;
}
.m-school-item-intro h3 {
	height: 24px;
	font-size: 15px;
	line-height: 24px;
	color: #262626;
	font-weight: 600;
}
.m-school-item-intro h3 span {
	font-size: 14px;
	color: #ababab;
}
.m-school-item-intro p {
	width: -moz-calc(100vw - 180px);
	width: calc(100vw - 180px);
	height: 18px;
	margin-top: 1px;
	font-size: 12px;
	line-height: 18px;
	color: #595959;
}

.img-active-hide,
.m-school-list li.active .img-active-show {
	display: block;
}
.img-active-show,
.m-school-list li.active .img-active-hide {
	display: none;
}
.m-school-list li.active .m-school-item-num {
	color: #fff;
}
.m-school-list li.active h3,
.m-school-list li.active h3 span {
	color: #1a8cff;
}

.m-school-btn {text-align: center;}
.m-school-btn ._img {width: 64upx; height: 64upx;line-height: 1;font-size: 0;}
.m-school-btn span {font-size: 22upx; color: #1A8CFF;line-height: 1;margin-top: 4upx;}
.m-school-zx {margin-right: 40upx;}

</style>
