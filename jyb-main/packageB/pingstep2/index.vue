<template>
	<view :class="[allstar || labelok || infook || inputfocus || photook ? 'pt40' : '','mainbox']" disableScroll="true">
		<view class="progress-box" v-if="allstar || labelok || infook || inputfocus || photook">
			<div class="_div">
				<!-- 打分 没选标签 -->
				<p v-if="!labelok && allstar">您评了{{ pscore }}分，给您的报名机构添加标签吧~</p>
				<!-- 打分 选标签 没写评价 -->
				<view v-else-if="!infook && labelok">
					<!-- 3分以下 -->
					<p v-if="pscore < 3">您评了{{ pscore }}分，向大家吐槽一下学习体验吧~</p>
					<!-- 3分以上 -->
					<p v-else>您评了{{ pscore }}分，向大家描述一下学习体验吧~</p>
				</view>
				<!-- 打分 选标签 写评价 没照片 -->
				<p v-else-if="!photook && infook && labelok">您评了{{ pscore }}分，向大家展示一下您的学习环境吧~</p>
				<!-- 没打分 没选标签 写评价或有照片 -->
				<p v-else-if="(photook || insteadtxt || inputfocus) && !allstar">您还没有给机构打分，不要忘记打分哦~</p>
				<!-- 打分 选标签 写评价 有照片 -->
				<p v-else style="text-align: center;">太棒了，提交即可分享您的学习体验~</p>
				<span class="progress-bg" :style="'width:' + progrsnum + '%'"></span>
			</div>
			<span class="progress-num">{{ progrsnum }}%</span>
		</view>
		<view class="agency-box">
			<div class="agen-img" v-if="agenurl"><image :src="'https:' + agenurl"></image></div>
			<div class="agen-detail">
				<h4 class="ellipsis">{{ optsForm.agenname }}</h4>
				<p class="agen-class ellipsis">{{ optsForm.lesson }}</p>
				<p>
					学习费用
					<span>¥{{ optsForm.fee }}</span>
				</p>
			</div>
			<navigator hover-class="none" open-type="navigateBack" class="agen-revise">修改</navigator>
		</view>
		<!-- <view class="input-fixed" v-if="inputfocus">大家都在问 “机构环境怎么样？” “交通方便吗？” “师资好不好？” “上课效果怎么样” “要不要选择这个机构”</view> -->
		<view class="step2-container">
			<view class="star-score-box">
				<view class="star-item" v-for="(item, index) in starArray" :key="index">
					<span class="star-title">{{ item.title }}</span>
					<ul>
						<li v-for="findex in [0, 1, 2, 3, 4]" :key="findex" :data-id="index" :data-num="findex" @click="starClick">
							<image :src="`https://static.jiaoyubao.cn/images/common/pj-xx-${item.imgUrl[findex]}.svg`"></image>
						</li>
					</ul>
					<p v-if="item.score > 0">
						{{ item.score }}分/
						<span v-if="item.score == 5">极好</span>
						<span v-else-if="item.score == 4">满意</span>
						<span v-else-if="item.score == 3">一般</span>
						<span v-else>较差</span>
					</p>
				</view>
				<view class="_hr" v-if="allstar" style="margin-top:20px;"></view>
			</view>
			<ul class="eva-label" v-if="allstar">
				<li v-for="(item, index) in labelArray" :key="index" :class="item.isChoose ? 'active' : ''" :id="index" @click="toggleLabel">{{ item.mc }}</li>
			</ul>
			<view class="eva-input-box">
				<view class="_hr"></view>
				<view class="input-fixed" v-if="inputfocus">大家都在问 “机构环境怎么样？” “交通方便吗？” “师资好不好？” “上课效果怎么样” “要不要选择这个机构”</view>
				<view class="eva-textarea">
					<view v-if="!videoFull">
						<textarea
							v-if="inputfocus"
							@input="infoInput"
							@focus="infoFocus"
							@blur="infoBlur"
							v-model="infotext"
							:auto-focus="autofocus"
							maxlength="-1"
							auto-height="true"
							cursor-spacing="160"
						/>
					</view>
					<view class="text-instead" v-if="!inputfocus && infotext" @click="inputShow">{{ insteadtxt }}</view>
					<view class="text-instead colorab" v-if="!inputfocus && !infotext" @click="inputShow">
						大家都在问 “机构环境怎么样？” “交通方便吗？” “师资好不好？” “上课效果怎么样” “要不要选择这个机构”
					</view>
					<span v-if="insteadtxt.length == 0 && infotext.length == 0">至少60个字</span>
					<span v-else-if="infotext.length < 60" :class="infook ? '' : 'over'">至少60个字，您还需要再输入{{ 60 - infotext.length }}个字</span>
					<span v-else>已写{{ infotext.length }}个字</span>
				</view>
			</view>
			<view class="eva-upload">
				<view v-if="photook" class="photo-item" v-for="(item, index) in photoArray" :key="index">
					<image :src="item" @click="viewPhotos" :data-id="index"></image>
					<view class="close" @click="deletePhoto" :data-id="index"><span class="icon-cross-no-bg"></span></view>
				</view>
				<!-- <view v-if="videoUrl" class="photo-item" >
					<video :src="videoUrl" controls="false" show-center-play-btn="false"></video>
					<view class="close" @click="deleteVideo">
						<span class="icon-cross-no-bg"></span>
					</view>
					<view class="open" @click="curVideoFullScreen">
						<image src="https://static.jiaoyubao.cn/images/common/pj-sp-bf.svg"></image>
					</view>
				</view> -->
				<view class="upload-item" @click="uploadPhoto" v-if="photoArray.length < 5">
					<image src="https://static.jiaoyubao.cn/images/common/pj-tp-icon.svg" mode=""></image>
					<p>上传照片</p>
				</view>
				<!-- <view class="upload-item" @click="uploadVideo">
					<image src="https://static.jiaoyubao.cn/images/common/pj-sp-icon.svg" mode=""></image>
					<p>上传视频</p>
				</view> -->
				<view class="upload-tips" v-if="!photook">
					<view class="_div"></view>
					<p>120字+3图</p>
					<span>点评奖金基础上+5元</span>
				</view>
				<view class="upload-txt" v-if="photook && infotext.length < 120">
					<p v-if="photoArray.length >= 3">再输入{{ 120 - infotext.length }}个字可在点评奖金基础上+5元</p>
					<p v-else>再输入{{ 120 - infotext.length }}个字+{{ 3 - photoArray.length }}张图可在点评奖金基础上+5元</p>
				</view>
				<view class="upload-txt" v-if="photook && infotext.length >= 120">
					<p v-if="photoArray.length < 3">再上传{{ 3 - photoArray.length }}张图片可在点评奖金基础上+5元</p>
				</view>
			</view>
		</view>
		<view class="eva-bottom">
			<view class="_div">
				<image src="https://static.jiaoyubao.cn/images/common/icon-quanwei.svg" mode=""></image>
				<span>教育宝非常重视点评的真实性</span>
			</view>
			<navigator hover-class="none" disabled="true" :class="[pscore > 0 && labelok && infotext.length >= 60 ? '' : 'un','_a']" @click="evaSubmit">提交</navigator>
		</view>
		<!-- 视频播放 -->
		<video-play v-if="videoFull" :videosrc="videoUrl" @closeVideo="closeVideoPop"></video-play>
	</view>
</template>

<script>
import { recordTrackingMixin } from '../../common/js/mixins.js';
export default {
	mixins: [recordTrackingMixin],
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
			// 机构相关
			agenurl: '',
			optsObj: {},
			optsForm: {},
			// 进度
			progrsnum: 0,
			pscore: 0,
			// 星级评价
			starArray: [
				{
					title: '环境',
					imgUrl: ['mr', 'mr', 'mr', 'mr', 'mr'],
					score: 0
				},{
					title: '师资',
					imgUrl: ['mr', 'mr', 'mr', 'mr', 'mr'],
					score: 0
				},{
					title: '服务',
					imgUrl: ['mr', 'mr', 'mr', 'mr', 'mr'],
					score: 0
				},{
					title: '效果',
					imgUrl: ['mr', 'mr', 'mr', 'mr', 'mr'],
					score: 0
				}
			],
			allstar: false,
			// 评价标签
			labelArrayCopy: [
				{ mc: '值得学习', bh: '901250003' },
				{ mc: '通俗易懂', bh: '901250002' },
				{ mc: '内容丰富', bh: '901250001' },
				{ mc: '收获颇多', bh: '901250004' },
				{ mc: '学习环境舒适', bh: '901250005' },
				{ mc: '课程实用性强', bh: '901250009' },
				{ mc: '学习氛围好', bh: '901250008' },
				{ mc: '推荐学习', bh: '901250007' },
				{ mc: '因材施教', bh: '901250010' },
				{ mc: '教师水平高', bh: '901250006' },
				{ mc: '课程单调', bh: '901250500' },
				{ mc: '没有学习氛围', bh: '901250501' },
				{ mc: '教师水平一般', bh: '901250502' },
				{ mc: '学习环境差', bh: '901250503' },
				{ mc: '课程实用性不强', bh: '901250504' },
				{ mc: '收获较小', bh: '901250505' },
				{ mc: '学习效果不好', bh: '901250506' },
				{ mc: '教师不认真', bh: '901250507' },
				{ mc: '服务态度差', bh: '901250508' }
			],
			labelArray: [],
			thisidx: -1,
			labelok: false,
			// 输入评价
			inputfocus: false,
			infotext: '',
			insteadtxt: '',
			autofocus: false,
			infook: false,
			// 上传照片
			photook: false,
			photoArray: [],
			videoUrl: '',
			videoFull: false,
			// 提交
			upPhotoArr: [],
			upLabelArr: [],
		};
	},
	onLoad(opts) {
		let _this = this;
		_this.optsForm = JSON.parse(opts.userform);
		_this.optsObj = JSON.parse(opts.userid);
		_this.labelArray.map(item => {
			item.isChoose = false;
		});
		if (_this.optsForm.agenename) {
			_this.getAgencyDetail();
		} else {
			_this.agenurl = '';
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
		// 获取机构详情
		getAgencyDetail() {
			let _this = this;
			let ajaxUrl = _this.$api.GetAgencyDetail.url + '&key={comename:' + _this.optsForm.agenename + '}';
			_this.$ajax2(_this.$api.GetAgencyDetail, ajaxUrl, '获取机构详情', function(res) {
				if (res.data && res.data.data && res.data.data.length > 0) {
					_this.agenurl = res.data.data[0].picurl;
				}
			},true);
		},
		// 选择星级
		starClick(e) {
			let _this = this;
			let thisId = e.currentTarget.dataset.id;
			let thisNum = e.currentTarget.dataset.num;
			let newImg = ['mr', 'mr', 'mr', 'mr', 'mr'];
			for (let i = 0; i <= thisNum; i++) {
				newImg[i] = thisNum + 1;
			}
			let thisItem = {
				title: _this.starArray[thisId].title,
				imgUrl: newImg,
				score: thisNum + 1
			};
			_this.starArray.splice(thisId, 1, thisItem);
			// 平均分
			_this.allstar = true;
			let scoresum = 0;
			_this.starArray.map(item => {
				scoresum += item.score;
				if (item.score == 0) {
					_this.allstar = false;
				}
			});
			_this.pscore = (scoresum / 4).toFixed(1);
			if (_this.pscore >= 3) {
				_this.labelArray = _this.labelArrayCopy.slice(0, 10);
			} else {
				_this.labelArray = _this.labelArrayCopy.slice(10, _this.labelArrayCopy.length);
			}
			_this.findLabelFun();
			_this.progrsNumFun();
		},
		// 选择标签
		toggleLabel(e) {
			let _this = this;
			let thisitem = _this.labelArray[e.currentTarget.id];
			if (!thisitem.isChoose) {
				thisitem.isChoose = true;
				_this.labelArray.splice(e.currentTarget.id, 1, thisitem);
			} else {
				thisitem.isChoose = false;
				_this.labelArray.splice(e.currentTarget.id, 1, thisitem);
			}
			_this.findLabelFun();
			_this.progrsNumFun();
		},
		// 输入评价相关事件
		infoInput(e) {
			let _this = this;
			_this.infotext = e.detail.value.replace(/\s\s/g, '');
			_this.insteadtxt = _this.infotext;
			_this.infoOver60Fun();
			_this.progrsNumFun();
		},
		infoFocus(e) {
			let _this = this;
			_this.inputfocus = true;
		},
		infoBlur() {
			let _this = this;
			_this.inputfocus = false;
			_this.autofocus = false;
			_this.insteadtxt = '';
			if (_this.infotext == '') {
				_this.insteadtxt = '';
			} else {
				_this.insteadtxt = _this.infotext;
			}
			_this.infoOver60Fun();
		},
		inputShow() {
			let _this = this;
			_this.insteadtxt = '';
			_this.inputfocus = true;
			_this.autofocus = true;
		},
		// 上传照片
		uploadPhoto() {
			let _this = this;
			uni.chooseImage({
				count: 5 - _this.photoArray.length, //默认9
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
								thisurl.then(function (result) { 
									_this.uploadBase64(encodeURIComponent(result).replace(/\+/g,'%2B'))
								})
							}
						});
					});
					_this.progrsNumFun();
				}
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
			// _this.photoOkFun();
			_this.progrsNumFun();
		},
		
		// // 上传视频
		// uploadVideo(){
		// 	let _this = this;
		// 	if(!_this.videoUrl) {
		// 		uni.chooseVideo({
		// 		    count: 1,
		// 		    sourceType: ['camera', 'album'],
		// 		    success: function (res) {
		// 				_this.photook = true;
		// 		        _this.videoUrl = res.tempFilePath;
		// 				_this.progrsNumFun();
		// 		    }
		// 		});
		// 	}
		// 	else {
		// 		_this.tools.toastShow("最多上传1个视频");
		// 	}
		// },
		// // 删除视频
		// deleteVideo() {
		// 	let _this = this;
		// 	_this.videoUrl = "";
		// 	_this.photoOkFun();
		// 	_this.progrsNumFun();
		// },
		// // 视频全屏
		// curVideoFullScreen() {
		// 	this.videoFull = true;
		// },
		// // 关闭视频
		// closeVideoPop() {
		// 	this.videoFull = false;
		// },
		// 提交
		evaSubmit() {
			let _this = this;
			_this.labelArray.map((item,index)=> {
				if(item.isChoose) {
					_this.upLabelArr.push(`${item.bh}-${item.mc}`);
				}
			})
			uni.request({
				url: "https://ping.jiaoyubao.cn/api/ApiHandler.ashx",
				data: {
					action: 'UpdateEvaluateInfo',
					guid: _this.optsObj.guid,
					aid: _this.optsObj.aid,
					pjid: _this.optsObj.pjid,
					ordernumber: _this.optsObj.ordernumber,
					star1: _this.starArray[0].score * 10,
					star2: _this.starArray[1].score * 10,
					star3: _this.starArray[2].score * 10,
					star4: _this.starArray[3].score * 10,
					tabs: _this.upLabelArr.toString(),
					images: _this.upPhotoArr.toString(),
					content: _this.insteadtxt
				},
				method: 'POST',
				header: {
					"content-type":"application/x-www-form-urlencoded" // 默认值
				},
				success: function(res) {
					if(res.data.result == 1) {
						uni.navigateTo({
							url: "../pingdone/index"
						});
					}
					else {
						_this.tools.toastShow(res.data.description)
					}
				},
				dataType: 'json'
			});
		},
		// 判断标签是否选中函数
		findLabelFun() {
			let _this = this;
			_this.labelok = false;
			_this.labelArray.map(item => {
				if (item.isChoose) {
					_this.labelok = true;
				}
			});
		},
		// 判断字数
		infoOver60Fun() {
			let _this = this;
			if (_this.insteadtxt.length >= 60) {
				_this.infook = true;
			} else {
				_this.infook = false;
			}
		},
		// 判断视频
		photoOkFun() {
			let _this = this;
			if (!_this.videoUrl && _this.photoArray.length < 1) {
				_this.photook = false;
			} else {
				_this.photook = true;
			}
		},
		// 进度百分比函数
		progrsNumFun() {
			let _this = this;
			if (_this.allstar) {
				_this.progrsnum = 20;
				if (_this.labelok) {
					_this.progrsnum = 40;
					if (_this.infook) {
						_this.progrsnum = 70;
						if (_this.photook) {
							_this.progrsnum = 100;
						}
					} else {
						_this.progrsnum = 40;
						if (_this.photook) {
							_this.progrsnum = 70;
						}
					}
				} else {
					_this.progrsnum = 20;
					if (_this.infook) {
						_this.progrsnum = 50;
						if (_this.photook) {
							_this.progrsnum = 80;
						}
					} else {
						_this.progrsnum = 20;
						if (_this.photook) {
							_this.progrsnum = 50;
						}
					}
				}
			} else {
				_this.progrsnum = 0;
				if (_this.infook) {
					_this.progrsnum = 30;
					if (_this.photook) {
						_this.progrsnum = 60;
					}
				} else {
					_this.progrsnum = 0;
					if (_this.photook) {
						_this.progrsnum = 60;
					}
				}
			}
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
