<template>
	<view class="">
		<div class="m-error-top">
			<div class="error-school error-input">
				<span class="error-title">地点名称</span>
				<input type="text" :value="schoolName" disabled />
			</div>
			<div class="error-type">
				<span class="error-title">问题类型</span>
				<div class="error-type-list">
					<p :class="[ index==typeIdx ? 'on' : '' , index==0 ? 'mr15' : '' ]" v-for="(item,index) in typeArray" :key="index" :data-id="index" @click="chooseType">{{item}}</p>
				</div>
			</div>
			<div class="error-phone error-input">
				<span class="error-title">联系电话</span>
				<input type="number" placeholder="请输入您的手机号" v-model="userPhone" maxlength="11"/>
			</div>
		</div>
		<div class="bg-gray"></div>
		<div class="m-error-bottom">
			<textarea maxlength="300" placeholder="请描述您遇到的问题" v-model="errorText"></textarea>
			<view v-if="photook" class="photo-item" v-for="(item, index) in photoArray" :key="index">
				<image :src="item" @click="viewPhotos" :data-id="index"></image>
				<view class="close" @click="deletePhoto" :data-id="index"><span class="icon-cross-no-bg"></span></view>
			</view>
			<view class="upload-item" @click="uploadPhoto" v-if="photoArray.length < 3">
				<img src="https://static.jiaoyubao.cn/images/common/Upload_icon.svg" alt="" />
				<span>上传照片</span>
			</view>
			<button class="m-error-btn" @click="submitForm">提交</button>
		</div>
		<div class="error-success" v-if="isFormSuccess">
			<i class="icon-check-block"></i>
			<h4>感谢您的提交</h4>
			<p>我们会根据您提供的信息进行核实和修正<br>您的一个信息将对他人带来方便，再次感谢</p>
			<view @click="naviBack" class="_a">返回</view>
		</div>
	</view>
</template>

<script>
import { queryByAgency } from '../../common/js/url-monitor.js';
import {ipGetMixin,recordTrackingMixin} from '../../common/js/mixins.js';
import dataArray from '../../common/data/data';
export default {
	mixins: [ipGetMixin,recordTrackingMixin],
	data() {
		return {
			webUrl: '', 
			webviewStyles: {
				progress: {
					color: '#1a8cff'
				}
			},
			shareTitle: '',
			shareContent: ',',
			photoArray: [],
			upPhotoArr: [],
			photook: false,
			schoolName: '',
			cityEName: '',
			cityName: '',
			agencyEName:'',
			typeArray: ['地点不正确','已停业关店','其他'],
			typeName: '地点不正确',
			typeIdx: 0,
			userPhone: '',
			errorText: '',
			isFormSuccess: false,
			cityCode: ''
		};
	},
	async onLoad(opts) {
		let _this = this;
		_this.schoolName = opts.school || '';
		_this.cityEName = await queryByAgency(opts.city, opts.agency);
		_this.agencyEName = opts.agency || '';
		if(opts.cityename) {
			dataArray.cityArr.map(item => {
				if (item.ename == _this.cityEName) {
					_this.cityName = item.name;
					_this.cityCode = item.code;
				}
			});
		}
		else {
			// 获取城市信息
			_this.location.getCurCityEname(_this, function(res) {
				_this.cityName = res.data[0].cityname;
				_this.cityEName = res.data[0].cityename;
				_this.cityCode = res.data[0].citycode;
			});
		}
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
		chooseType(e) {
			let _this = this;
			let idx = e.target.dataset.id;
			_this.typeIdx = idx;
			_this.typeName = _this.typeArray[idx];
		},
		submitForm() {
			let _this = this;
			let P_Tongji_SessionID = P_Tongji_SessionID || '';
			let fromPlatform;
			let uid = '';
			// #ifdef MP-BAIDU
				fromPlatform = "百度小程序";
				uid = getApp().globalData.unionid_bd,
			// #endif
			// #ifdef MP-WEIXIN
				fromPlatform = "微信小程序";
				uid = getApp().globalData.unionid_wx,
			// #endif
			uni.request({
				url: 'https://api14data.jiaoyubao.cn/form/?action=100001',
				data: {
					formtype: '018001004',
					city: _this.cityEName,
					areaname: _this.cityName,
					citycode: _this.cityCode,
					comname: _this.agencyEName,
					phone: _this.userPhone,
					url: encodeURIComponent(`https://m.jiaoyubao.cn/${_this.cityEName}/edu/${_this.agencyEName}/map/`),
					cookieid: P_Tongji_SessionID,
					ip: _this.IP,
					unionid: uid,
					demo: `教育宝${fromPlatform}，地图纠错表单，电话：${_this.userPhone}, 校区地点：${_this.schoolName}, 问题类型：${_this.typeName}, 描述：${_this.errorText}, 图片：${_this.upPhotoArr}`,
				},
				method: 'GET',
				// header: {
				// 	"content-type":"application/x-www-form-urlencoded" // 默认值
				// },
				dataType: JSON,
				success: function(res) {
					if(JSON.parse(res.data).result == 1) {
						_this.isFormSuccess = true;
					}
				}
			})
		},
		naviBack() {
			uni.navigateBack({
				delta: 1
			});
		},
		// 上传照片
		uploadPhoto() {
			let _this = this;
			uni.chooseImage({
				count: 3 - _this.photoArray.length, //默认9
				sourceType: ['camera', 'album'],
				success: function(res) {
					_this.photook = true;
					res.tempFilePaths.map(item => {
						_this.photoArray.push(item);
						// 获取图片格式
						uni.getImageInfo({
							src: item,
							success: function(image) {
								// 图片url转base64
								let thisurl = _this.base64({ url: item, type: image.type });
								thisurl.then(function(result) {
									_this.uploadBase64(encodeURIComponent(result).replace(/\+/g, '%2B'));
								});
							}
						});
					});
				},
			});
		},
		// 预览照片
		viewPhotos(e) {
			let _this = this;
			let idx = e.currentTarget.dataset.id;
			_this.tools.imgPreview(_this.photoArray, idx);
		},
		// 删除照片
		deletePhoto(e) {
			let _this = this;
			let thisidx = e.currentTarget.dataset.id;
			_this.photoArray.splice(thisidx, 1);
			_this.upPhotoArr.splice(thisidx, 1);
		},
		// 上传图片到服务器
		uploadBase64(file) {
			let _this = this;
			uni.request({
				url: 'https://ping.jiaoyubao.cn/api/imgUpload.ashx',
				data: {
					file: file
				},
				method: 'POST',
				header: {
					'content-type': 'application/x-www-form-urlencoded' // 默认值
				},
				success: function(res) {
					if (res.data.result == 1) {
						_this.upPhotoArr.push(res.data.data);
					} else {
						_this.tools.toastShow(res.data.description);
					}
				},
				dataType: 'json'
			});
		},
		//传入图片路径，返回base64
		base64({ url, type }) {
			return new Promise((resolve, reject) => {
				uni.getFileSystemManager().readFile({
					filePath: url, //选择图片返回的相对路径
					encoding: 'base64', //编码格式
					success: res => {
						resolve('data:image/' + type.toLocaleLowerCase() + ';base64,' + res.data);
					},
					fail: res => reject(res.errMsg)
				});
			});
		}
	}
};
</script>

<style lang="scss">
@import 'index.scss';
</style>
