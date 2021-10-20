<template>
	<view class="apply-main">
		<div class="list-block">
			<ul>
				<li>
					<div class="item-content apply-city">
						<div class="item-title label">机构所在城市</div>
						<picker
							class="city-picker"
							mode="multiSelector"
							@change="bindMultiPickerChange"
							@columnchange="bindMultiPickerColumnChange"
							:value="multiIndex"
							:range="multiArray"
						>
						<!-- @click="selectCity" -->
							<input disabled="true" placeholder-style="color:#ababab;" placeholder="请选择城市" :value="citysName" />
						</picker>
						<a hover-class="none" href="javascript:;" class="icon"><i class="icon-right-no-bg"></i></a>
					</div>
					<hr />
				</li>
				<li>
					<div class="item-content apply-agency" @click="chooseAgency">
						<div class="item-title label">机构课程信息</div>
						<div class="agency-input">
							<p v-if="infoname.name">{{ infoname.name }}</p>
							<p v-if="infoschool.name">{{ infoschool.name }}</p>
							<p v-if="infolesson.name">{{ infolesson.name }}</p>
							<p v-if="infotime">报名时间 {{ infotime }}</p>
							<p v-else>{{ infotime }}</p>
							<span :class="['agency-error', infoname || infoschool || infolesson || infotime ? '' : 'mt20']" v-if="agencyerror">您还没有填写完毕,请继续完善</span>
						</div>
						<a hover-class="none" href="javascript:;" class="icon"><i class="icon-right-no-bg"></i></a>
					</div>
				</li>
				<li>
					<div class="item-content apply-fee">
						<div class="item-title label">学习费用</div>
						<input @input="numberInput" type="number" placeholder-style="color:#ababab;" placeholder="请输入您学习课程的总费用" v-model="learnfeeyuan" @focus="focusFee" @blur="finishFee"/>
					</div>
				</li>
				<li>
					<div class="item-content apply-name">
						<div class="item-title label">您的姓名</div>
						<input @input="nameInput" type="text" placeholder-style="color:#ababab;" placeholder="请输入您的姓名" v-model="username" />
					</div>
					<hr />
				</li>
				<li>
					<div class="item-content apply-phone">
						<div class="item-title label">报名电话</div>
						<input @input="telInput" type="tel" maxlength="11" placeholder-style="color:#ababab;" :placeholder="`若与${phonenum}一致可不填写`" v-model="telephone" />
					</div>
				</li>
			</ul>
		</div>
		<a hover-class="none" :disabled="isformok ? true : false" :class="['apply-submit', isformok ? ' ' : 'un-submit']" @click="applySubmitClick">下一步</a>
		<div class="mask" v-if="agenformshow" @click="closeform"></div>
		<div :class="['agency-form', agenformshow ? 'slideup' : 'slidedown']" v-if="agenformshow">
			<div class="form-title" :style="">
				<span>选择机构课程信息</span>
				<span class="icon-cross-no-bg" @click="closeform"></span>
			</div>
			<div class="form-info">
				<!-- 选择机构 -->
				<div class="agen-name-box infoitem-box" v-if="nameshow">
					<div class="agen-item-head" v-if="!searchname">
						<div class="info-circle"></div>
						<h4 v-if="!infoname.name" :class="namelistshow || isnameinput ? 'maxwidth' : ''" @click="reviseName">请选择报名机构名称</h4>
						<h4 v-else :class="[namelistshow || isnameinput ? 'maxwidth' : '', 'on']" v-model="infoname.name" @click="reviseName">{{ infoname.name }}</h4>
						<div v-if="namelistshow" class="info-notfind" @click="openSearchName">
							<span>没找到？手动输入</span>
							<span class="icon-plus-linear"></span>
						</div>
						<div v-if="isnameinput" class="info-notfind" @click="openSearchName">
							<span>修改机构名称</span>
							<span class="icon-modify-linear"></span>
						</div>
					</div>
					<ul class="agen-item-list" v-if="!searchname && namelistshow">
						<li :class="nameitem == index ? 'active' : ''" v-for="(item, index) in agenlistArr" @click="agenListClick" :data-value="item" :data-id="index" :key="index">
							{{ item.name }}
						</li>
					</ul>
					<div class="search-box" v-if="searchname">
						<div class="search-input">
							<input
								type="text"
								value=""
								@input="sagenInput"
								v-model="snamein"
								auto-focus="true"
								placeholder="请输入报名机构名称"
								placeholder-style="color:#ABABAB;"
								adjust-position="false"
								@confirm="nameConfirm"
							/>
							<span class="cancel" @click="nameCancel">取消</span>
						</div>
						<view class="back-choose" v-if="snamein == ''" @click="backNameChoose">
							<span>暂不输入，去选择</span>
							<span class="icon-right-no-bg"></span>
						</view>
						<ul class="search-list" v-if="snamein !== '' && snamelist">
							<li class="_li" v-for="(item, index) in snamelist" :key="index" v-html="item.name" :data-value="item" :data-id="index" @click="sagenListClick"></li>
						</ul>
					</div>
				</div>
				<!-- 选择校区 -->
				<div class="agen-school-box infoitem-box" v-if="schoolshow">
					<div class="agen-item-head" v-if="!searchschool">
						<view v-if="allinput">
							<div class="info-circle"></div>
							<view v-if="!infoschool.name" class="allinput" @click="openSearchSchool">
								<h4>请输入学习校区</h4>
								<view class="_hr"></view>
							</view>
							<h4 v-else class="maxwidth on" v-model="infoschool.name" @click="openSearchSchool">{{ infoschool.name }}</h4>
							<div v-if="infoschool.name" class="info-notfind" @click="openSearchSchool">
								<span>修改校区名称</span>
								<span class="icon-modify-linear"></span>
							</div>
						</view>
						<view v-else>
							<div class="info-circle"></div>
							<h4 v-if="!infoschool.name" :class="schoollistshow || isschoolinput ? 'maxwidth' : ''" @click="reviseSchool">请选择学习校区</h4>
							<h4 v-else :class="[schoollistshow || isschoolinput ? 'maxwidth' : '', 'on']" v-model="infoschool.name" @click="reviseSchool">{{ infoschool.name }}</h4>
							<div v-if="!allinput && schoollistshow" class="info-notfind" @click="openSearchSchool">
								<span>没找到？手动输入</span>
								<span class="icon-plus-linear"></span>
							</div>
							<div v-if="isschoolinput" class="info-notfind" @click="openSearchSchool">
								<span>修改校区名称</span>
								<span class="icon-modify-linear"></span>
							</div>
						</view>
					</div>
					<ul class="agen-item-list" v-if="!searchschool && schoollistshow">
						<li
							:class="schoolitem == index ? 'active' : ''"
							v-for="(item, index) in schoollistArr"
							@click="schoolListClick"
							:data-value="item"
							:data-id="index"
							:key="index"
						>
							{{ item.name }}
							<p>{{ item.area }}</p>
						</li>
					</ul>
					<div class="search-box" v-if="searchschool">
						<div class="search-input">
							<input
								type="text"
								value=""
								@input="sschoolInput"
								v-model="sschoolin"
								auto-focus="true"
								placeholder="请输入学习校区"
								placeholder-style="color:#ABABAB;"
								adjust-position="false"
								@confirm="schoolConfirm"
							/>
							<span class="cancel" @click="schoolCancel">取消</span>
						</div>
						<view class="back-choose" v-if="sschoolin == '' && (!allinput)" @click="backSchoChoose">
							<span>暂不输入，去选择</span>
							<span class="icon-right-no-bg"></span>
						</view>
						<ul class="search-list" v-if="sschoolin !== '' && sschoollist">
							<li class="_li" v-for="(item, index) in sschoollist" :key="index" v-html="item.name" :data-value="item" :data-id="index" @click="sschoolListClick"></li>
						</ul>
					</div>
				</div>
				<!-- 选择课程 -->
				<div class="agen-lesson-box infoitem-box" v-if="lessonshow">
					<div class="agen-item-head" v-if="!searchlesson">
						<view v-if="allinput">
							<div class="info-circle"></div>
							<view v-if="!infolesson.name" class="allinput" @click="openSearchLesson">
								<h4>请输入学习课程</h4>
								<view class="_hr"></view>
							</view>
							<h4 v-else class="maxwidth on" v-model="infolesson" @click="openSearchLesson">{{ infolesson.name }}</h4>
							<div v-if="infolesson.name" class="info-notfind" @click="openSearchLesson">
								<span>修改学习课程</span>
								<span class="icon-modify-linear"></span>
							</div>
						</view>
						<view v-else>
							<div class="info-circle"></div>
							<h4 v-if="!infolesson.name" :class="lessonlistshow || islessoninput ? 'maxwidth' : ''" @click="reviseLesson">请选择学习课程</h4>
							<h4 v-else :class="[lessonlistshow || islessoninput ? 'maxwidth' : '', 'on']" v-model="infolesson" @click="reviseLesson">{{ infolesson.name }}</h4>
							<div v-if="!allinput && lessonlistshow" class="info-notfind" @click="openSearchLesson">
								<span>没找到？手动输入</span>
								<span class="icon-plus-linear"></span>
							</div>
							<div v-if="islessoninput" class="info-notfind" @click="openSearchLesson">
								<span>修改学习课程</span>
								<span class="icon-modify-linear"></span>
							</div>
						</view>
					</div>
					<ul class="agen-item-list" v-if="!searchlesson && lessonlistshow">
						<li
							:class="lessonitem == index ? 'active' : ''"
							v-for="(item, index) in lessonlistArr"
							@click="lessonListClick"
							:data-value="item"
							:data-id="index"
							:key="index"
						>
							{{ item.name }}
						</li>
					</ul>
					<div class="search-box" v-if="searchlesson">
						<div class="search-input">
							<input
								type="text"
								value=""
								@input="slessonInput"
								v-model="slessonin"
								auto-focus="true"
								placeholder="请输入课程名称"
								placeholder-style="color:#ABABAB;"
								adjust-position="false"
								@confirm="lessonConfirm"
							/>
							<span class="cancel" @click="lessonCancel">取消</span>
						</div>
						<view class="back-choose" v-if="slessonin == '' && (!allinput)" @click="backLessChoose">
							<span>暂不输入，去选择</span>
							<span class="icon-right-no-bg"></span>
						</view>
						<ul class="search-list" v-if="slessonin !== '' && slessonlist">
							<li class="_li" v-for="(item, index) in slessonlist" :key="index" v-html="item.name" :data-value="item" :data-id="index" @click="slessonListClick"></li>
						</ul>
					</div>
				</div>
				<!-- 选择报名时间 -->
				<div class="agen-time-box infoitem-box" v-if="timeshow">
					<div class="agen-item-head">
						<div :class="['info-circle', istimeok ? 'bgblue' : '']"></div>
						<picker class="time-picker" mode="date" start="1999-01-01" :end="today" @change="datePickerBindchange" :value="infotime">
							<input
								:class="infotime == '' ? '' : 'on'"
								disabled="true"
								placeholder-style="color:#595959;font-size:15px"
								placeholder="请选择报名时间"
								:value="infotime"
								adjust-position="false"
							/>
							<span class="icon-right-no-bg"></span>
						</picker>
					</div>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
import {ipGetMixin, recordTrackingMixin} from '../../common/js/mixins.js';
export default {
	mixins: [ipGetMixin, recordTrackingMixin],
	data() {
		return {
			webUrl: '', // https://m.jiaoyubao.cn/pingstep1/
			webviewStyles: {
				progress: {
					color: '#1a8cff'
				}
			},
			shareTitle: '',
			shareContent: ',',
			optsObj: {},
			orderArr: [],
			// 城市选择
			multiIndex: [0, 0],
			multiArray: [[], []],
			provinceArray: [],
			cityArray: [],
			cityeArray: [],
			citysName: '',
			cityseName: '',
			citycode: '',
			flag: 0,
			// 表单项
			learnfee: '',
			learnfeeyuan: '',
			telephone: '',
			phonenum: '',
			phonecopy: '',
			username: '',
			agencyerror: false,
			isformok: false,
			// 机构信息
			agenformshow: false,
			agenename: '',
			agenObj: {},
			allinput: false,
			// 选择机构名称
			nameshow: true,
			infoname: {},
			namelistshow: true,
			isnameinput: false,
			searchname: false,
			nameitem: -1,
			agenlistArr: [],
			// 搜索机构名称
			snamein: '',
			snamelist: [],
			snamelistcopy: [],
			// 选择机构校区
			schoolshow: false,
			infoschool: {},
			schoollistshow: true,
			isschoolinput: false,
			searchschool: false,
			schoolitem: -1,
			schoollistArr: [],
			// 搜索机构校区
			sschoolin: '',
			sschoollist: [],
			sschoollistcopy: [],
			// 选择机构课程
			lessonshow: false,
			infolesson: {},
			lessonlistshow: true,
			islessoninput: false,
			searchlesson: false,
			lessonitem: -1,
			lessonlistArr: [],
			// 搜索课程名称
			slessonin: '',
			slessonlist: [],
			slessonlistcopy: [],
			// 选择上课时间
			timeshow: false,  
			infotime: '',
			istimeok: false,
			today: ''
		};
	},
	onLoad(opts) {
		let _this = this;
		// console.log(opts)
		_this.optsObj = JSON.parse(opts.userid);
		// 手机号
		_this.phonecopy = opts.mobile;
		_this.phonenum = opts.mobile.substr(0, 3) + '****' + opts.mobile.substr(7);
		// 最大日期
		_this.today = new Date().toLocaleDateString();
		_this.getProvince();
		_this.getCity();
		// 默认城市
		_this.getQueryParam();
		// 获取订单
		_this.getOrder();
	},
	onShareAppMessage(res) {
		let _this = this;
		// console.log(res);
		return {
			title: _this.shareTitle,
			path: `/pages/enter/index?webUrl=${res.webViewUrl}`,
			imageUrl: 'https://static.jiaoyubao.cn/images/uniapp/share-logo.jpg',
			content: _this.shareContent
		};
	},
	created() {},
	methods: {
		// 获取订单
		getOrder() {
			let _this = this;
			let ajaxUrl = _this.$api.GetUserOrder.url + '&key={memberid:' + _this.optsObj.uid + '}';
			_this.$ajax2(_this.$api.GetUserOrder, ajaxUrl, '', function(res) {
				_this.orderArr = res.data.data;
				_this.orderArr.map((item,index) => {
					if(item.cityename == 'zxke') {
						_this.orderArr.splice(index, 1);
					}
					else {
						let nameli = {
							name: item.companyname,
							ename: item.companyename,
							// id: item.id	
						}
						_this.agenlistArr.push(nameli);
					}
				})
				_this.snamelistcopy = _this.agenlistArr;
			},true);
		},
		// 获取机构校区列表
		getAgencySchool() {
			let _this = this;
			_this.schoollistshow = true;
			_this.schoollistArr = [];
			_this.sschoollistcopy = [];
			let ajaxUrl = _this.$api.GetAgencySchools.url + '&key={comename:' + _this.infoname.ename + '}';
			_this.$ajax2(_this.$api.GetAgencySchools, ajaxUrl, '获取校区', function(res) {
				if (res.data && res.data.data && res.data.data.length > 0) {
					res.data.data.map((item,index) => {
						let schoolli = {
							name: item.pointname,
							area: item.pointaddress,
							id: item.id
						}
						_this.schoollistArr.push(schoolli)
					})
					_this.sschoollistcopy = _this.schoollistArr;
				}
			});
		},
		// 获取机构课程列表
		getAgencyClasses() {
			let _this = this;
			_this.lessonlistshow = true;
			_this.lessonlistArr = [];
			_this.slessonlistcopy = [];
			let ajaxUrl = _this.$api.GetAgencyClasses.url + '&key={comename:' + _this.infoname.ename + '}';
			_this.$ajax2(_this.$api.GetAgencyClasses, ajaxUrl, '获取课程', function(res) {
				if (res.data && res.data.data && res.data.data.length > 0) {
					let classList = res.data.data.sort((x,y)=>y.productrecommend-x.productrecommend).sort((x,y)=>y.productrecommendweight-x.productrecommendweight); // 降序
					classList.map((item,index) => {
						let lessonli = {
							name: item.class_name,
							id: item.id
						}
						_this.lessonlistArr.push(lessonli)
					})
					_this.slessonlistcopy = _this.lessonlistArr;
				}
			});
		},
		getQueryParam() {
			let _this = this;
			// 获取城市信息
			_this.location.getGPSLocation(_this, function(res) {
				// 当前城市
				_this.citysName = res.data[0].cityname;
				_this.cityseName = res.data[0].cityename;
				_this.citycode = res.data[0].citycode;
			});
		},
		// 获取联动省份
		getProvince() {
			let _this = this;
			_this.$ajax(_this.$api.GetProvinceList, {}, '获取省分列表', function(res) {
				if (res.data && res.data.data && res.data.data.length > 0) {
					_this.provinceArray = res.data.data;
				}
				for (let i = 0; i < _this.provinceArray.length; i++) {
					_this.multiArray[0].push(_this.provinceArray[i].name);
				}
			});
		},
		// 获取联动城市
		getCity() {
			let _this = this;
			_this.$ajax(_this.$api.GetCityList, {}, '获取城市列表', function(res) {
				if (res.data && res.data.data && res.data.data.length > 0) {
					_this.cityArray = res.data.data;
				}
				let item = {};
				for (let i = 0; i < _this.cityArray.length; i++) {
					item = {
						cname: _this.cityArray[i].name,
						cename: _this.cityArray[i].ename,
						code: _this.cityArray[i].code
					};
					_this.cityeArray.push(item);
				}
				_this.multiArray[1].push(_this.cityArray[0].name);
			});
		},
		// 二级联动响应事件
		bindMultiPickerColumnChange(e) {
			let _this = this;
			_this.flag = 1;
			_this.multiIndex[e.detail.column] = e.detail.value;
			switch (e.detail.column) {
				case 0: {
					_this.multiArray[1].length = 0;
					_this.multiIndex[1] = 0;
					if (e.detail.value >= 0) {
						_this.multiIndex[0] = e.detail.value;
						for (let j = 0; j < _this.cityArray.length; j++) {
							if (_this.cityArray[j].code.indexOf(_this.provinceArray[e.detail.value].code) == 0) {
								_this.multiArray[1].push(_this.cityArray[j].name);
							}
						}
					}
					break;
				}
				case 1: {
					_this.multiIndex[1] = e.detail.value;
					break;
				}
			}
			_this.citysName = _this.multiArray[1][_this.multiIndex[1]];
			_this.cityeArray.map(item => {
				if (item.cname == _this.citysName) {
					_this.cityeName = item.cename;
					_this.citycode = item.code;
				}
			});
		},
		// 二级联动选择事件
		bindMultiPickerChange(e) {
			this.multiIndex = e.detail.value;
		},
		// 分享
		getWebviewMsg(e) {
			let _this = this;
			_this.shareTitle = e.detail.data[0].title;
			_this.shareContent = e.detail.data[0].content;
		},
		// 填写机构相关信息按钮
		chooseAgency() {
			let _this = this;
			_this.agenformshow = true;
			_this.nameshow = true;
			if(_this.infoname.name) {
				_this.schoolshow = true;
				if(_this.infoschool.name) {
					_this.lessonshow = true;
					if(_this.infolesson.name) {
						_this.timeshow = true;
					}
				}
			}
		},
		// 关闭机构信息
		closeform() {
			let _this = this;
			_this.agenformshow = false;
			_this.closeSearchFun();
			_this.errorShowFunc();
		},
		// 选择列表中的内容
		agenListClick(e) {
			let _this = this;
			_this.infoname = e.currentTarget.dataset.value;
			_this.nameitem = e.currentTarget.dataset.id;
			_this.changeAllinputFun();
			_this.deletAllinputFun();
			_this.getAgencySchool();
			_this.namelistshow = false;
			_this.schoolshow = true;
		},
		schoolListClick(e) {
			let _this = this;
			_this.infoschool = e.currentTarget.dataset.value;
			_this.schoolitem = e.currentTarget.dataset.id;
			_this.getAgencyClasses();
			_this.schoollistshow = false;
			_this.lessonshow = true;
		},
		lessonListClick(e) {
			let _this = this;
			_this.infolesson = e.currentTarget.dataset.value;
			_this.lessonitem = e.currentTarget.dataset.id;
			_this.lessonlistshow = false;
			_this.timeshow = true;
		},
		// 打开输入界面
		openSearchName(e) {
			let _this = this;
			_this.namelistshow = false;
			_this.searchname = true;
			_this.unshowFunc();
			_this.nameshow = true;
		},
		openSearchSchool(e) {
			let _this = this;
			_this.schoollistshow = false;
			_this.searchschool = true;
			_this.unshowFunc();
			_this.schoolshow = true;
		},
		openSearchLesson(e) {
			let _this = this;
			_this.lessonlistshow = false;
			_this.searchlesson = true;
			_this.unshowFunc();
			_this.lessonshow = true;
		},
		// 点击输入完成
		nameConfirm() {
			let _this = this;
			_this.infoname.name = _this.snamein;
			_this.snamelistcopy.map((item,index) => {
				if(item.name.indexOf(_this.snamein) !== -1) {
					_this.infoname.ename = item.ename;
					_this.allinput = false;
					_this.getAgencySchool();
				}
				else {
					_this.infoname.ename = '';
					_this.allinput = true;
				}
			})
			_this.changeAllinputFun();
			_this.isnameinput = true;
			_this.nameNextFun();
		},
		schoolConfirm() {
			let _this = this;
			_this.infoschool.name = _this.sschoolin;
			if(_this.sschoollistcopy.length>0) {
				_this.sschoollistcopy.map((item,index) => {
					if(item.name.indexOf(_this.sschoolin) !== -1) {
						_this.infoschool.area = item.area;
						_this.infoschool.id = item.id;
					}
					else {
						_this.infoschool.area = '';
						_this.infoschool.id = 0;
					}
				})
			}
			_this.getAgencyClasses();
			_this.isschoolinput = true;
			_this.schoolNextFun();
		},
		lessonConfirm() {
			let _this = this;
			_this.infolesson.name = _this.slessonin;
			if(_this.slessonlistcopy.length>0) {
				_this.slessonlistcopy.map((item,index) => {
					if(item.name.indexOf(_this.slessonin) !== -1) {
						_this.infolesson.id = item.id;
					}
					else {
						_this.infolesson.id = 0;
					}
				})
			}
			_this.islessoninput = true;
			_this.lessonNextFun();
		},
		// 输入数据
		sagenInput(e) {
			let _this = this;
			let thistxt = e.detail.value;
			_this.snamein = thistxt;
			_this.snamelist = [];
			_this.snamelistcopy.map((item, index) => {
				let newitem = _this.tools.UnicodeToAscii(_this.tools.escape2Html(item.name.replace(new RegExp(thistxt, 'g'), '<span class="_span">' + thistxt + '</span>')));
				if(item.name.indexOf(thistxt) !== -1) {
					let thisli = {
						name: newitem,
						id: index,
						ename: item.ename,
					}
					_this.snamelist.push(thisli);
				}
			});
		},
		sschoolInput(e) {
			let _this = this;
			let thistxt = e.detail.value;
			_this.sschoolin = thistxt;
			_this.sschoollist = [];
			_this.sschoollistcopy.map((item, index) => {
				let newitem = _this.tools.UnicodeToAscii(_this.tools.escape2Html(item.name.replace(new RegExp(thistxt, 'g'), '<span class="_span">' + thistxt + '</span>')));
				if(item.name.indexOf(thistxt) !== -1) {
					let thisli = {
						name: newitem,
						id: index,
						pointid: item.id || 0
					}
					_this.sschoollist.push(thisli);
				}
			});
		},
		slessonInput(e) {
			let _this = this;
			let thistxt = e.detail.value;
			_this.slessonin = thistxt;
			_this.slessonlist = [];
			_this.slessonlistcopy.map((item, index) => {
				let newitem = _this.tools.UnicodeToAscii(_this.tools.escape2Html(item.name.replace(new RegExp(thistxt, 'g'), '<span class="_span">' + thistxt + '</span>')));
				if(item.name.indexOf(thistxt) !== -1) {
					let thisli = {
						name: newitem,
						id: index
					}
					_this.slessonlist.push(thisli);
				}
			});
		},
		// 返回选择
		backNameChoose() {
			let _this = this;
			_this.closeSearchFun();
			_this.nameshow = true;
			_this.namelistshow = true;
			_this.isnameinput = false;
			if (_this.infoschool.name) {
				_this.schoolshow = true;
				if (_this.infolesson.name) {
					_this.lessonshow = true;
					if(_this.infotime) {
						_this.timeshow = true;
					}
				}
			}
		},
		backSchoChoose() {
			let _this = this;
			_this.closeSearchFun();
			_this.nameshow = true;
			_this.schoolshow = true;
			_this.schoollistshow = true;
			_this.isschoolinput = false;
			if (_this.infolesson.name) {
				_this.lessonshow = true;
				if(_this.infotime !== '') {
					_this.timeshow = true;
				}
			}
		},
		backLessChoose() {
			let _this = this;
			_this.closeSearchFun();
			_this.nameshow = true;
			_this.schoolshow = true;
			_this.lessonshow = true;
			_this.lessonlistshow = true;
			_this.islessoninput = false;
			if(_this.infotime !== '') {
				_this.timeshow = true;
			}
		},
		// 取消输入
		nameCancel() {
			let _this = this;
			if(_this.isnameinput) {
				_this.nameshow = true;
				_this.nameCancelFun();
			}
			else {
				_this.namelistshow = true;
				_this.nameCancelFun();
			}
		},
		schoolCancel() {
			let _this = this;
			if(_this.isschoolinput) {
				_this.schoolshow = true;
				_this.schoCancelFun()
			}
			else {
				_this.schoollistshow = true;
				_this.schoCancelFun()
			}
		},
		lessonCancel() {
			let _this = this;
			if(_this.islessoninput) {
				_this.lessonshow = true;
				_this.lessCancelFun()
			}
			else {
				_this.lessonlistshow = true;
				_this.lessCancelFun()
			}
		},
		// 选择联想列表中的内容
		sagenListClick(e) {
			let _this = this;
			let thisidx = e.currentTarget.dataset.id;
			_this.snamein = _this.snamelistcopy[_this.snamelist[thisidx].id].name;
			_this.infoname = _this.snamelistcopy[_this.snamelist[thisidx].id];
			_this.changeAllinputFun();
			_this.deletAllinputFun();
			_this.getAgencySchool();
			_this.isnameinput = true;
			_this.nameNextFun();
		},
		sschoolListClick(e) {
			let _this = this;
			let thisidx = e.currentTarget.dataset.id;
			_this.sschoolin = _this.sschoollistcopy[_this.sschoollist[thisidx].id].name;
			_this.infoschool = _this.sschoollistcopy[_this.sschoollist[thisidx].id];
			_this.getAgencyClasses();
			_this.isschoolinput = true;
			_this.schoolNextFun();
		},
		slessonListClick(e) {
			let _this = this;
			let thisidx = e.currentTarget.dataset.id;
			_this.slessonin = _this.slessonlistcopy[_this.slessonlist[thisidx].id].name;
			_this.infolesson = _this.slessonlistcopy[_this.slessonlist[thisidx].id];
			_this.islessoninput = true;
			_this.lessonNextFun();
		},
		// 点击重新选择
		reviseName() {
			let _this = this;
			if (!_this.isnameinput) {
				_this.namelistshow = true;
			}
		},
		reviseSchool() {
			let _this = this;
			if (!_this.isschoolinput) {
				_this.schoollistshow = true;
			}
		},
		reviseLesson() {
			let _this = this;
			if (!_this.islessoninput) {
				_this.lessonlistshow = true;
			}
		},
		// 选择时间
		datePickerBindchange(e) {
			let _this = this;
			_this.infotime = e.detail.value;
			if (_this.infotime != '') {
				_this.istimeok = true;
				_this.agenformshow = false;
			}
			_this.errorShowFunc();
		},
		// 关闭搜索函数
		closeSearchFun() {
			let _this = this;
			_this.searchname = false;
			_this.searchschool = false;
			_this.searchlesson = false;
		},
		// 清空输入框函数
		clearInput() {
			let _this = this;
			_this.snamein = '';
			_this.sschoolin = '';
			_this.slessonin = '';
		},
		// 关闭选择函数
		unshowFunc() {
			let _this = this;
			_this.nameshow = false;
			_this.schoolshow = false;
			_this.lessonshow = false;
			_this.timeshow = false;
		},
		// 错误提示函数
		errorShowFunc() {
			let _this = this;
			if (_this.infoname && _this.infoschool && _this.infolesson && _this.infotime) {
				_this.agencyerror = false;
			} else {
				_this.agencyerror = true;
			}
		},
		// 判断下一步函数
		nameNextFun() {
			let _this = this;
			_this.searchname = false;
			_this.schoolshow = true;
			if (!_this.infoschool.name) {
				_this.schoollistshow = true;
			} else if (!_this.infolesson.name) {
				_this.schoollistshow = false;
				_this.lessonshow = true;
			} else {
				_this.schoollistshow = false;
				_this.lessonshow = true;
				_this.lessonlistshow = false;
				_this.timeshow = true;
			}
		},
		schoolNextFun() {
			let _this = this;
			_this.searchschool = false;
			_this.nameshow = true;
			_this.namelistshow = false;
			_this.lessonshow = true;
			if (!_this.infolesson.name) {
				_this.lessonlistshow = true;
			} else {
				_this.lessonlistshow = false;
				_this.timeshow = true;
			}
		},
		lessonNextFun() {
			let _this = this;
			_this.searchlesson = false;
			_this.nameshow = true;
			_this.schoolshow = true;
			_this.timeshow = true;
		},
		// 取消判断函数
		nameCancelFun() {
			let _this = this;
			_this.nameNextFun();
			if(!_this.infoname.name) {
				_this.schoolshow = false;
			}
		},
		schoCancelFun() {
			let _this = this;
			_this.schoolNextFun();
			if(!_this.infoschool.name) {
				_this.lessonshow = false;
			}
		},
		lessCancelFun() {
			let _this = this;
			_this.lessonNextFun();
			if(!_this.infolesson.name) {
				_this.timeshow = false;
			}
		},
		// 输入机构名时改变逻辑
		changeAllinputFun() {
			let _this = this;
			if(_this.allinput) {
				_this.infoschool = {};
				_this.infolesson = {};
				_this.schoollistshow = false;
				_this.schoollistArr = [];
				_this.lessonlistshow = false;
				_this.lessonlistArr = [];
			}
		},
		deletAllinputFun() {
			let _this = this;
			_this.allinput = false;
			_this.infoschool = {};
			_this.infolesson = {};
			_this.isschoolinput = false;
			_this.islessoninput = false;
			_this.clearInput();
		},
		// 控制按钮可否点击
		forminput() {
			let _this = this;
			let isRight = _this.tools.checkPhoneNum(_this.telephone);
			if (_this.telephone == '') {
				isRight = true;
			}
			if (isRight && _this.username && _this.learnfee && !_this.agencyerror && _this.citysName) {
				_this.isformok = true;
			} else {
				_this.isformok = false;
			}
		},
		// 学费输入事件
		numberInput(e) {
			let _this = this;
			_this.learnfee = _this.validateNumber(e.detail.value);
			_this.forminput();
		},
		focusFee() {
			let _this = this;
			_this.learnfeeyuan = _this.learnfee;
		},
		finishFee() {
			let _this = this;
			if(_this.learnfee) {
				_this.learnfeeyuan = _this.learnfee + '元';
			}
		},
		// 姓名输入事件
		nameInput() {
			let _this = this;
			_this.forminput();
		},
		// 电话输入事件
		telInput(e) {
			let _this = this;
			_this.telephone = _this.validateNumber(e.detail.value);
			_this.forminput();
		},
		// 控制数字格式函数
		validateNumber(val) {
			return val.replace(/\D/g, '');
		},
		// 下一步按钮
		applySubmitClick() {
			let _this = this;
			let ordercode = 0;
			if (_this.isformok) {
				_this.orderArr.map((item,index) => {
					if(item.companyid == _this.infoname.id) {
						ordercode = item.ordercode;
					}
					else {
						ordercode = 0;
					}
				})
				uni.request({
					url: "https://ping.jiaoyubao.cn/api/ApiHandler.ashx",
					data: {
						action: 'UpdateSignupInfo',
						guid: _this.optsObj.guid,
						aid: _this.optsObj.aid,
						pjid: _this.optsObj.pjid,
						citybh: _this.citycode,
						schoolname: _this.infoname.name,
						schoolid: _this.infoname.id || 0,
						ordrcode: ordercode || 0,
						campusname: _this.infoschool.name,
						servicename: _this.infolesson.name,
						serviceid: _this.infolesson.id || 0,
						signuptime: _this.infotime,
						price: _this.learnfee,
						stuname: _this.username,
						telephone: _this.telephone || _this.phonecopy
					},
					method: 'POST',
					header: {
						"content-type":"application/x-www-form-urlencoded" // 默认值
					},
					success: function(res) {
						// console.log(res.data)
						if(res.data.result == 1) {
							let formitem = {
								agenename: _this.infoname.ename,
								agenname: _this.infoname.name,
								lesson: _this.infolesson.name,
								fee: _this.learnfee,
							}
							uni.navigateTo({
								url: `../pingstep2/index?userform=${JSON.stringify(formitem)}&userid=${JSON.stringify(_this.optsObj)}`
							});
						}
						else {
							_this.tools.toastShow(res.data.description)
						}
						
					},
					dataType: 'json'
				});
				
			}
		}
	}
};
</script>

<style lang="scss">
@import 'index.scss';
</style>
