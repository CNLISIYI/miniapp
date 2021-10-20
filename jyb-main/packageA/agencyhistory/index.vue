<template>
	<view>
		<view class="history-null" v-show="isNullshow">
			<image src="https://static.jiaoyubao.cn/images/uniapp/zj-img-01@2x.png" mode=""></image>
			<text>暂无足迹</text>
			<navigator class="back-to-home" open-type="navigateBack" hover-class="none" url="/pages/index/index">去首页逛逛</navigator>
		</view>
		<scroll-view class="angency-history" scroll-with-animation="true" enable-back-to-top="true" v-show="!isNullshow">
			<dl class="list-dl" v-for="(dateItem, count) in dataArr" :key="count">
				<dt class="list-date">
					<div v-if="isEditshow" class="check-button">
						<image v-if="!dateItem.date.selected" src="https://static.jiaoyubao.cn/images/uniapp/select-un-checked.svg" mode="" :id="count" @click="selectDate"></image>
						<image v-else src="https://static.jiaoyubao.cn/images/uniapp/select-checked.svg" mode="" :id="count" @click="unselectDate"></image>
					</div>
					<text :class="isEditshow ? 'm-editlist-text' : ''">{{ dateItem.date.day }}</text>
				</dt>
				<dd v-for="(item, index) in dateItem.agency" :key="index" class="list-dd">
					<div v-if="isEditshow" class="check-button">
						<image v-if="!item.selected" src="https://static.jiaoyubao.cn/images/uniapp/select-un-checked.svg" mode="" @click="selectAgency" :id="[count, index]"></image>
						<image v-else src="https://static.jiaoyubao.cn/images/uniapp/select-checked.svg" mode="" @click="unselectAgency" :id="[count, index]"></image>
					</div>
					<navigator
						:class="isEditshow ? 'm-editlist-item' : 'm-list-item'"
						@tap="clickItem"
						:id="[count, index]"
						:url="isEditshow ? '' : '/pages/agencyindex/index?agency=' + item.comename"
						hover-class="none"
					>
						<div class="m-item-info flex-box">
							<div class="m-item-logo flex-box"><img class="_img" :src="'https:' + item.logo" alt="" mode="widthFix" /></div>
							<div class="flex-1">
								<div class="_span m-item-title ellipsis-1 ">
									<span>{{ item.comname }}</span>
									<span class="_span m-item-msg-score">{{ item.star }}分</span>
								</div>
								<block>
									<ul class="m-item-feature clearfloat">
										<view v-if="item.labelinfo.length > 0">
											<li class="_li" v-for="(labelItem, laIndex) in item.labelinfo" :key="laIndex">{{ labelItem.labelname }}</li>
										</view>
										<li class="_li" v-if="item.labelinfo.length < 3 || item.labelinfo.length==0">免费试听</li>
										<li class="_li" v-if="item.labelinfo.length == 1 || item.labelinfo.length==0">可预约上门</li>
									</ul>
								</block>
								<div>
									<span class="item-views">共浏览{{ item.views }}次</span>
								</div>
							</div>
						</div>
					</navigator>
				</dd>
			</dl>
			<div class="list-bottom">
				<div v-show="!isEditshow" class="list-edit" @click="isEditshow = true">编辑</div>
				<div v-show="isEditshow">
					<div class="select-all">
						<image v-if="!isCheckedAll" src="https://static.jiaoyubao.cn/images/uniapp/select-un-checked.svg" mode="" @click="selectAllAgen"></image>
						<image v-else src="https://static.jiaoyubao.cn/images/uniapp/select-checked.svg" mode="" @click="unSelectAllAgen"></image>
						<text>全选</text>
					</div>
					<p class="list-delete" @click="deleteAgency">删除</p>
				</div>
			</div>
		</scroll-view>
		
		<online-talk></online-talk>
	</view>
</template>

<script>
import { recordTrackingMixin } from '../../common/js/mixins.js';
export default {
	mixins: [recordTrackingMixin],
	data() {
		return {
			// 位置相关
			cityename: '',
			cityname: '', // 城市中文
			dataArr: [],
			isEditshow: false,
			isCheckedAll: false,
			isNullshow: false,
			localDate: [],
			localAgency: [],
			localDatas: { date: {}, agency: [] }
		};
	},
	components: {},
	onReady() {},
	onLoad(opts) {
		let _this = this;
		// console.log(opts);
		_this.localDate = uni.getStorageSync('localDate') || [];
		_this.localAgency = uni.getStorageSync('localAgency') || [];
		_this.getLocalData();
		if (_this.localDate.length <= 0 && _this.localAgency.length <= 0) {
			_this.isNullshow = true;
		}
		let pages = getCurrentPages(); // 获取页面栈
		pages.map((item, index) => {
			if( item.route == 'pages/index/index') {
				item.$vm.localClass = [];
			}
		});
	},
	onShow() {},
	onShareAppMessage(res) {
		let _this = this;
		return {
			title: '',
			path: `/pages/location/index?webUrl=${res.webViewUrl}`,
			imageUrl: 'https://static.jiaoyubao.cn/images/uniapp/share-logo.jpg',
			content: ''
		};
	},
	created() {},
	methods: {
		getLocalData() {
			let _this = this;
			// console.log(_this.localDate);
			// console.log(_this.localAgency);
			for (let i = 0; i < _this.localDate.length; i++) {
				_this.localDatas = { date: {}, agency: [] };
				_this.localDatas.date = _this.localDate[i];
				for (let j = 0; j < _this.localAgency.length; j++) {
					if (_this.localAgency[j].date.day == _this.localDate[i].day) {
						_this.localAgency[j].clickFlag = 0;
						_this.localDatas.agency.push(_this.localAgency[j]);
					}
				}
				_this.dataArr.push(_this.localDatas);
			}
		},
		clickItem(e) {
			let _this = this;
			let idArr = e.currentTarget.id.split(',');
			let dayCount = idArr[0];
			let agenCount = idArr[1];
			if (_this.isEditshow) {
				// console.log(_this.dataArr[dayCount].agency[agenCount].clickFlag);
				_this.dataArr[dayCount].agency[agenCount].clickFlag++;
				if (_this.dataArr[dayCount].agency[agenCount].clickFlag % 2 == 1) {
					// _this.selectAgency(e);
					let allSelected = 0;
					_this.dataArr[dayCount].agency[agenCount].selected = true;
					for (let i = 0; i < _this.dataArr[dayCount].agency.length; i++) {
						if (_this.dataArr[dayCount].agency[i].selected == true) {
							allSelected++;
						}
					}
					if (allSelected == _this.dataArr[dayCount].agency.length) {
						_this.dataArr[dayCount].date.selected = true;
					}
					_this.selectAll();
				}
				if (_this.dataArr[dayCount].agency[agenCount].clickFlag % 2 == 0) {
					// _this.unselectAgency(e);
					let allSelected2 = 0;
					_this.dataArr[dayCount].agency[agenCount].selected = false;
					for (let i = 0; i < _this.dataArr[dayCount].agency.length; i++) {
						if (_this.dataArr[dayCount].agency[i].selected == false) {
							allSelected2++;
						}
					}
					if (allSelected2 == _this.dataArr[dayCount].agency.length) {
						_this.dataArr[dayCount].date.selected = false;
					}
					_this.unselectAll();
				}
			} else {
				let views = _this.dataArr[dayCount].agency[agenCount].views;
				let today = {
					day: new Date().getMonth() + 1 + '月' + new Date().getDate() + '日',
					selected: false
				};
				let thisItem = {
					logo: _this.dataArr[dayCount].agency[agenCount].logo,
					comid: _this.dataArr[dayCount].agency[agenCount].comid,
					comname: _this.dataArr[dayCount].agency[agenCount].comname,
					comename: _this.dataArr[dayCount].agency[agenCount].comename,
					star: _this.dataArr[dayCount].agency[agenCount].star,
					views: views,
					labelinfo: _this.dataArr[dayCount].agency[agenCount].labelinfo.slice(0, 3),
					date: today,
					cityename: _this.dataArr[dayCount].agency[agenCount].cityename,
					selected: false
				};
				let m = 0;
				while (m < _this.localDate.length) {
					if (_this.localDate[m].day == today.day) {
						_this.localDate.splice(m, 1);
						m++;
					} else {
						m++;
					}
				}
				_this.localDate.unshift(today);
				uni.setStorageSync('localDate', _this.localDate);
				if(_this.dataArr[dayCount].agency[agenCount].date.day == today.day) {
					for (let n = 0; n < _this.localAgency.length; n++) {
						if (_this.localAgency[n].comid == thisItem.comid) {
							_this.localAgency[n].views++;
							thisItem.views = _this.localAgency[n].views;
							if(_this.localAgency[n].date.day == today.day) {
								_this.localAgency.splice(n, 1);
							}
						}
					}
				}
				else{
					thisItem.date = today;
					for (let n = 0; n < _this.localAgency.length; n++) {
						if (_this.localAgency[n].comid == thisItem.comid) {
							_this.localAgency[n].views++;
							thisItem.views = _this.localAgency[n].views;
							if(_this.localAgency[n].date.day == today.day) {
								_this.localAgency.splice(n, 1);
							}
						}
					}
				}
				_this.localAgency.unshift(thisItem);
				uni.setStorageSync('localAgency', _this.localAgency);
			}
		},
		selectAllAgen() {
			let _this = this;
			_this.isCheckedAll = true;
			for (let i = 0; i < _this.dataArr.length; i++) {
				_this.dataArr[i].date.selected = true;
				for (let j = 0; j < _this.dataArr[i].agency.length; j++) {
					_this.dataArr[i].agency[j].selected = true;
				}
			}
		},
		unSelectAllAgen() {
			let _this = this;
			_this.isCheckedAll = false;
			for (let i = 0; i < _this.dataArr.length; i++) {
				_this.dataArr[i].date.selected = false;
				for (let j = 0; j < _this.dataArr[i].agency.length; j++) {
					_this.dataArr[i].agency[j].selected = false;
				}
			}
		},
		selectDate(e) {
			let _this = this;
			_this.dataArr[e.currentTarget.id].date.selected = true;
			for (let j = 0; j < _this.dataArr[e.currentTarget.id].agency.length; j++) {
				_this.dataArr[e.currentTarget.id].agency[j].selected = true;
			}
			_this.selectAll();
		},
		unselectDate(e) {
			let _this = this;
			_this.dataArr[e.currentTarget.id].date.selected = false;
			for (let j = 0; j < _this.dataArr[e.currentTarget.id].agency.length; j++) {
				_this.dataArr[e.currentTarget.id].agency[j].selected = false;
			}
			_this.unselectAll();
		},
		selectAgency(e) {
			let _this = this;
			let idArr = e.currentTarget.id.split(',');
			let dayCount = idArr[0];
			let agenCount = idArr[1];
			let allSelected = 0;
			_this.dataArr[dayCount].agency[agenCount].selected = true;
			_this.dataArr[dayCount].agency[agenCount].clickFlag++;
			for (let i = 0; i < _this.dataArr[dayCount].agency.length; i++) {
				if (_this.dataArr[dayCount].agency[i].selected == true) {
					allSelected++;
				}
			}
			if (allSelected == _this.dataArr[dayCount].agency.length) {
				_this.dataArr[dayCount].date.selected = true;
			}
			_this.selectAll();
		},
		unselectAgency(e) {
			let _this = this;
			let idArr = e.currentTarget.id.split(',');
			let dayCount = idArr[0];
			let agenCount = idArr[1];
			let allSelected = 0;
			_this.dataArr[dayCount].agency[agenCount].selected = false;
			_this.dataArr[dayCount].agency[agenCount].clickFlag++;
			for (let i = 0; i < _this.dataArr[dayCount].agency.length; i++) {
				if (_this.dataArr[dayCount].agency[i].selected == false) {
					_this.dataArr[dayCount].date.selected = false;
				}
			}
			_this.unselectAll();
		},
		selectAll() {
			let _this = this;
			let allSelected = 0;
			for (let i = 0; i < _this.dataArr.length; i++) {
				if (_this.dataArr[i].date.selected == true) {
					allSelected++;
				}
			}
			if (allSelected == _this.dataArr.length) {
				_this.isCheckedAll = true;
			}
		},
		unselectAll() {
			let _this = this;
			let allSelected = 0;
			for (let i = 0; i < _this.dataArr.length; i++) {
				if (_this.dataArr[i].date.selected == false) {
					_this.isCheckedAll = false;
				}
			}
		},
		deleteAgency() {
			let _this = this;
			let newDateArr = [];
			let newAgencyArr = [];
			uni.showModal({
				title: '提示',
				content: '确认删除所选记录？',
				success: function(sm) {
					if (sm.confirm) {
						// console.log('确认删除');
						for (let i = 0; i < _this.dataArr.length; i++) {
							if (_this.dataArr[i].date.selected == false) {
								newDateArr.push(_this.dataArr[i].date);
							}
							for (let j = 0; j < _this.dataArr[i].agency.length; j++) {
								if (_this.dataArr[i].agency[j].selected == false) {
									newAgencyArr.push(_this.dataArr[i].agency[j]);
								}
							}
						}
						_this.localDate = newDateArr;
						_this.localAgency = newAgencyArr;
						uni.clearStorageSync('localDate');
						uni.clearStorageSync('localAgency');
						uni.setStorageSync('localDate', _this.localDate);
						uni.setStorageSync('localAgency', _this.localAgency);
						_this.dataArr.length = 0;
						_this.getLocalData();
						_this.isEditshow = false;
						if (_this.localDate.length <= 0 && _this.localAgency.length <= 0) {
							_this.isNullshow = true;
						}
					} else if (sm.cancel) {
						// console.log('取消删除');
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
// 每个页面公共css
@import './index.scss';
</style>
