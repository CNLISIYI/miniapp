<template>
	<view>
		<quick-skeleton
			:show="showSkeleton"
			ref="skeleton"
			catchtouchmove="true"
			fixed="true"
			loading="chiaroscuro"
			selector="skeleton"
			bgcolor="#FFF"
			style="overflow: hidden;"
		></quick-skeleton>
		<div class="m-page-content agency-page-container skeleton">
			<!-- header-nav -->
			<div id="m-jyb-top-nav"></div>

			<!-- index-agency-intro -->
			<!-- 骨架屏开始 -->
			<div class="m-index-agency-intro-outer" v-show="showSkeleton">
				<!-- 头部导航 -->
				<div class="m-index-agency-intro-header flex-box">
					<div class="m-index-agency-intro-search flex-1 flex-box skeleton-radius" style="width: 598rpx; background: #f5f6f7;">
						<navigator class="_a jump-search flex-1"></navigator>
					</div>
					<div class="header-share-box skeleton-radius" style="width: 48rpx; background: #f5f6f7;"><button class="_a" style="background-image: none;"></button></div>
				</div>
				<!-- 机构信息 -->
				<div class="m-index-agency-intro-top flex-box clearfloat" style="background: rgba(255, 255, 255, 1);">
					<div class="m-index-agency-intro-img skeleton-rect" style="background: #f5f6f7;border: none;"></div>
					<div class="m-index-agency-intro-info flex-1">
						<h1><navigator class="_a ellipsis-1 skeleton-rect" style="width: 480rpx; height: 52rpx; background: #f5f6f7;"></navigator></h1>
						<div class="flex-box skeleton-rect" style="width: 260rpx; height: 30rpx; background: #f5f6f7;"></div>
						<p class="skeleton-rect" style="width: 440rpx; height: 30rpx; background: #f5f6f7;"></p>
					</div>
				</div>
				<!-- tab -->
				<ul class="m-index-agency-intro-nav flex-box skeleton-rect" style="background: #f5f6f7;"></ul>
			</div>
			<!-- 骨架屏结束 -->
			<div class="m-index-agency-intro-outer" v-show="!showSkeleton">
				<img class="m-index-agency-intro-bg" v-if="photos.length > 0" :src="'https:' + photos[0].masterimage" alt="" />
				<!-- 头部导航 -->
				<div class="m-index-agency-intro-header flex-box">
					<div class="m-index-agency-intro-search flex-1 flex-box">
						<img src="https://static.jiaoyubao.cn/images/mobile/nav-search-white.svg" alt="" />
						<navigator open-type="redirect" url="/packageA/search/index" hover-class="none" class="_a jump-search flex-1">
							请输入机构或课程名称
						</navigator>
					</div>
					<div class="header-share-box"><button open-type="share" hover-class="none" class="_a bds_more"></button></div>
				</div>
				<!-- 机构信息 -->
				<div class="m-index-agency-intro-top flex-box clearfloat" v-if="detailObj">
					<div class="m-index-agency-intro-img"><img :src="'https:' + detailObj.picurl" alt="" /></div>
					<div class="m-index-agency-intro-info flex-1">
						<h1>
							<navigator hover-class="none" :url="'/packageA/intro/index?agency=' + agencyEname" class="_a ellipsis-1">
								{{ detailObj.name }}
							</navigator>
							<img class="m-index-agency-intro-info-right" src="https://static.jiaoyubao.cn/images/mobile/index-top-right.svg" alt="" />
						</h1>
						<div class="flex-box">
							<!-- <img  src="https://static.jiaoyubao.cn/images/mobile/tag-renzheng.svg" alt=""> -->
							<!-- 星星常驻 -->
							<div class="jyb-score ">
								<div class="jyb-score-top" :style="'width:' + detailObj.star * 2 + '%'">
									<img src="https://static.jiaoyubao.cn/images/mobile/star-fill.svg" alt="" />
								</div>
								<div class="jyb-score-bottom"><img src="https://static.jiaoyubao.cn/images/mobile/star.svg" alt="" /></div>
							</div>
							<!-- 有评分显示, 没有评论时，显示：234人来过 -->
							<p class="flex-1 ">{{ detailObj.num_pj }}条评论</p>
						</div>
						<!-- 下面4项评分常驻，没有取默认分数 -->
						<p class="">
							<span>环境:{{ (detailObj.star1 / 10).toFixed(1) }}</span>
							<span>师资:{{ (detailObj.star2 / 10).toFixed(1) }}</span>
							<span>服务:{{ (detailObj.star3 / 10).toFixed(1) }}</span>
							<span>效果:{{ (detailObj.star4 / 10).toFixed(1) }}</span>
						</p>
						<!-- 无评分显示 -->
						<!-- <p>234人来过</p> -->
					</div>
				</div>
				<!-- tab -->
				<ul class="m-index-agency-intro-nav flex-box ">
					<li class="flex-1 active">
						<navigator hover-class="none" open-type="reLaunch" class="_a" :url="'/pages/index/index?agency=' + agencyEname">
							首页
							<span></span>
						</navigator>
					</li>
					<li class="flex-1" v-if="detailObj.comtype == 1 && classesNum > 0">
						<navigator hover-class="none" class="_a" :url="'/pages/class/index?agency=' + agencyEname">
							课程
							<span></span>
						</navigator>
					</li>
					<li class="flex-1" v-if="teacherNum > 0">
						<navigator hover-class="none" class="_a" :url="'/pages/teacher/index?agency=' + agencyEname">
							教师
							<span></span>
						</navigator>
					</li>
					<li class="flex-1" v-if="evaluations.length > 0">
						<navigator hover-class="none" class="_a" :url="'/packageA/evaluation/index?agency=' + agencyEname">
							评价
							<span></span>
						</navigator>
					</li>
					<li class="flex-1" v-if="photos.length > 2">
						<navigator hover-class="none" class="_a" :url="'/pages/photo/index?agency=' + agencyEname">
							相册
							<span></span>
						</navigator>
					</li>
					<li class="flex-1" v-if="schoolsNum > 0">
						<navigator hover-class="none" class="_a" :url="'/pages/school/index?agency=' + agencyEname">
							校区
							<span></span>
						</navigator>
					</li>
				</ul>
			</div>
			<!-- 相册 -->
			<!-- 骨架屏开始 -->
			<div class="m-watch-big-photo m-watch-big-pic-container skeleton-rect" v-show="showSkeleton" style="width: 750rpx; height: 172rpx; background: #f5f6f7;"></div>
			<!-- 骨架屏结束 -->
			<div class="m-watch-big-photo m-watch-big-pic-container" v-if="photos.length + videos.length > 2">
				<!-- Swiper -->
				<view class="uni-padding-wrap">
					<view class="page-section swiper swiper-container">
						<view class="page-section-spacing swiper-wrapper clearfloat com-swiper-container-outer" style="height: 66px;">
							<view class="swiper com-swiper-container flex-box" style="height: 86px;padding: 0 10px;">
								<block v-if="videos.length > 0">
									<view
										class="swiper-slide swiper-slide-click swiper-slide-video"
										v-for="(item, index) in videos"
										:key="index"
										:data-src="'https:' + item.mediaurl"
										@click="curVideoFullScreen"
									>
										<img :src="'https:' + item.snapshoturl" />
										<i class="video-pause-btn"></i>
									</view>
								</block>
								<block v-if="photos.length > 0">
									<view
										:data-swiper-slide-index="index"
										@click="getPhotoClickIdx"
										class="swiper-slide swiper-slide-click"
										v-for="(item, index) in photos"
										:key="index"
									>
										<img :src="'https:' + item.masterimage" />
										<p>{{ item.mastertitle }}</p>
									</view>
									<view :data-swiperindex="photos.length" class="swiper-slide swiper-slide-more">
										<navigator hover-class="none" class="more-url flex-box" :url="'/pages/photo/index?agency=' + agencyEname">
											查看全部>>
										</navigator>
									</view>
								</block>
							</view>
						</view>
					</view>
				</view>
			</div>
			<!-- 最近 校区  near-school -->
			<nearest-campus
				class=""
				v-if="nearSchool != ''"
				:cityename="cityEname"
				:agencyename="agencyEname"
				:nearschool="nearSchool"
				@receiveMakeTelPhone="makeTelPhone"
			></nearest-campus>

			<!-- 优惠活动 -->
			<div class="m-yh-active bgfff mtop10" v-if="newActiveList.length > 0">
				<view class="m-module-title " title="">优惠活动</view>
			    <ul :class="['m-yh-list',{'m-yh-list-overflow':newhd}]">
					<block v-for="(item, index) in newActiveList" :key="index">
						<li v-if="item.activitycode == '012001001002'">
							<navigator hover-class="none"
							 :url="'/packageB/activity/index?agency=' + agencyEname + '&activityId=' + item.id"
							 :data-aid="item.id"
							 data-type="现金优惠"
							 :data-title="item.activityname">
								<div class="yh-item-img">
									<img v-if="!item.banner || item.banner.length <= 0" src="https://static.jiaoyubao.cn/images/site/default-huodong.png" alt="" />
									<img v-else :src="'https:' + item.banner[0].bannerimage" alt="" />
									<!-- <img src="img/activity.png" alt=""> -->
									<span class="quan">券</span>
								</div>
								<div class="yh-item-r">
									<h4>{{ item.activityname }}</h4>
									<div class="yh-item-fee">
										<p class="fee"><text v-if="item.saleprice>0">￥</text><span>{{item.saleprice>0?item.saleprice:'免费'}}</span></p>
										<p class="sec-fee del-fee"><text>￥</text><span>{{item.originalprice}}</span></p>
										<div class="purchase"><span>{{item.dealquantity!= undefined?item.dealquantity + item.purchaseNum:item.purchaseNum}}人已抢</span><i class="icon-right-no-bg"></i></div>
									</div>
								</div>
							</navigator>
						</li>
						<li v-if="item.activitycode == '012001001001'">
							<navigator hover-class="none"
							 :url="'/packageB/activity/index?agency=' + agencyEname + '&activityId=' + item.id"
							 :data-aid="item.id"
							 data-type="限时折扣"
							 :data-title="item.activityname">
								<div class="yh-item-img">
									<img v-if="!item.banner || item.banner.length <= 0" src="https://static.jiaoyubao.cn/images/site/default-huodong.png" alt="" />
									<img v-else :src="'https:' + item.banner[0].bannerimage" alt="" />
									<!-- <img src="img/activity.png" alt=""> -->
									<span class="zhe">折</span>
								</div>
								<div class="yh-item-r">
									<h4>{{ item.activityname }}</h4>
									<div class="yh-item-fee">
										<p class="fee"><text v-if="item.saleprice>0">￥</text><span>{{item.saleprice>0?item.saleprice:'免费'}}</span></p>
										<p class="sec-fee zhe-fee"><text>{{item.discount}}</text><span>折</span></p>
										<div class="purchase"><span>{{item.dealquantity!= undefined?item.dealquantity + item.purchaseNum:item.purchaseNum}}人已抢</span><i class="icon-right-no-bg"></i></div>
									</div>
								</div>
							</navigator>
						</li>
						<li v-if="item.activitycode == '012001002001'">
							<navigator hover-class="none"
							 :url="'/packageB/activity/index?agency=' + agencyEname + '&activityId=' + item.id"
							 :data-aid="item.id"
							 data-type="赠送活动"
							 :data-title="item.activityname">
								<div class="yh-item-img">
									<img v-if="!item.banner || item.banner.length <= 0" src="https://static.jiaoyubao.cn/images/site/default-huodong.png" alt="" />
									<img v-else :src="'https:' + item.banner[0].bannerimage" alt="" />
									<!-- <img src="img/activity.png" alt=""> -->
									<span class="zeng">赠</span>
								</div>
								<div class="yh-item-r">
									<h4>{{ item.activityname }}</h4>
									<div class="yh-item-fee">
										<p class="fee"><text v-if="item.saleprice>0">￥</text><span>{{item.saleprice>0?item.saleprice:'免费'}}</span></p>
										<p class="sec-fee del-fee" v-if="item.originalprice"><text>￥</text><span>{{item.originalprice}}</span></p>
										<div class="purchase"><span>{{item.dealquantity!= undefined?item.dealquantity + item.purchaseNum:item.purchaseNum}}人已抢</span><i class="icon-right-no-bg"></i></div>
									</div>
								</div>
							</navigator>
						</li>
						<li v-if="item.activitycode == '012001002003'">
							<navigator hover-class="none"
							 :url="'/packageB/activity/index?agency=' + agencyEname + '&activityId=' + item.id"
							 :data-aid="item.id"
							 data-type="其他活动"
							 :data-title="item.activityname">
								<div class="yh-item-img">
									<img v-if="!item.banner || item.banner.length <= 0" src="https://static.jiaoyubao.cn/images/site/default-huodong.png" alt="" />
									<img v-else :src="'https:' + item.banner[0].bannerimage" alt="" />
									<!-- <img src="img/activity.png" alt=""> -->
									<span class="mian">免</span>
								</div>
								<div class="yh-item-r">
									<h4>{{ item.activityname }}</h4>
									<div class="yh-item-fee">
										<p class="fee"><text></text><span>免费</span></p>
										<!-- <p class="sec-fee del-fee"><text>￥</text><span>50</span></p> -->
										<div class="purchase"><span>{{item.dealquantity!= undefined?item.dealquantity + item.purchaseNum:item.purchaseNum}}人已抢</span><i class="icon-right-no-bg"></i></div>
									</div>
								</div>
							</navigator>
						</li>
					</block>
			    </ul>
				<div class="upDown" @click="newhd = !newhd" v-if="newActiveList.length > 3"><text>{{newhd?'展开':'收起'}}({{ (newActiveList.length-3)>0?newActiveList.length-3:'0' }})</text><text :class="['m-common-icon',newhd?'icon_bottom_no_bg':'icon_up_no_bg'] " ></text></div>
			</div>
			<!-- 热门活动 -->
			<!-- 骨架屏开始 -->
			<div class="m-popular-activity bgfff mtop10" style="padding-bottom: 0rpx;" v-show="showSkeleton">
				<view class="m-module-title skeleton-rect" style="background: #f5f6f7; margin-bottom: 32rpx;"></view>
				<ul class="m-popular-activity-list skeleton-rect" style="background: #f5f6f7; width: 686rpx; height: 188rpx;"></ul>
			</div>
			<!-- 骨架屏结束 -->
			<!-- 默认最多显示2个 -->
			<div class="m-popular-activity bgfff mtop10" v-if="isHaveDpj == 1">
				<view class="m-module-title " title="">热门活动</view>
				<ul :class="hideMoreActive">
					<li class="flex-box" v-for="(item, index) in activeList" :key="index">
						<span class="m-popular-activity-position position-left"></span>
						<span class="m-popular-activity-position position-right"></span>
						<block v-if="item.activitycode == 012001001002">
							<img src="https://static.jiaoyubao.cn/images/mobile/hd-youhui.svg" alt="" />
							<text class="_a flex-1 ellipsis-1">{{ item.activityname }}</text>
							<navigator
								v-if="item.isdetail == 1"
								:url="'/packageA/agencyactivity/index?agency=' + agencyEname + '&activityId=' + item.id"
								class="jyb-btn jyb-btn-red m-jyb-call-btn"
								:data-aid="item.id"
								data-type="现金优惠"
								:data-title="item.activityname"
								hover-class="none"
							>
								查看
							</navigator>
							<button v-else class="jyb-btn jyb-btn-red m-jyb-call-btn" :data-aid="item.id" data-type="现金优惠" :data-title="item.activityname" @tap="makeTelPhone">
								领取
							</button>
						</block>
						<block v-else-if="item.activitycode == 012001001001">
							<img src="https://static.jiaoyubao.cn/images/mobile/hd-icon-zekou.svg" alt="" />
							<text class="_a flex-1 ellipsis-1">{{ item.activityname }}</text>
							<navigator
								v-if="item.isdetail == 1"
								:url="'/packageA/agencyactivity/index?agency=' + agencyEname + '&activityId=' + item.id"
								class="jyb-btn jyb-btn-red m-jyb-call-btn"
								:data-aid="item.id"
								data-type="限时折扣"
								:data-title="item.activityname"
								hover-class="none"
							>
								查看
							</navigator>
							<button v-else class="jyb-btn jyb-btn-red m-jyb-call-btn" :data-aid="item.id" data-type="限时折扣" :data-title="item.activityname" @tap="makeTelPhone">
								领取
							</button>
						</block>
						<block v-else="item.activitycode == 012001002001">
							<img src="https://static.jiaoyubao.cn/images/mobile/hd-icon-zengpin.svg" alt="" />
							<text class="_a flex-1 ellipsis-1">{{ item.activityname }}</text>
							<navigator
								v-if="item.isdetail == 1"
								:url="'/packageA/agencyactivity/index?agency=' + agencyEname + '&activityId=' + item.id"
								class="jyb-btn jyb-btn-red m-jyb-call-btn"
								:data-title="item.activityname"
								hover-class="none"
							>
								查看
							</navigator>
							<button v-else class="jyb-btn jyb-btn-red m-jyb-call-btn" @click="makeTelPhone">咨询</button>
						</block>
					</li>
					<li class="flex-box" v-if="isHaveDpj == 1">
						<span class="m-popular-activity-position position-left"></span>
						<span class="m-popular-activity-position position-right"></span>
						<img src="https://static.jiaoyubao.cn/images/mobile/hd-youhui.svg" alt="" />
						<view hover-class="Wnone" class="_a flex-1 ellipsis-1">教育宝额外帮您省钱：平均45元，最高115元！</view>
						<navigator
							hover-class="none"
							url="../../packageB/ping/index?ping=1"
							class="jyb-btn jyb-btn-red m-jyb-receive-quan-btn"
							data-aid="1"
							data-type="现金优惠"
							data-title=""
						>
							点评
						</navigator>
					</li>
					<li class="flex-box" v-if="activeListLength % 2 == 1">
						<span class="m-popular-activity-position position-left"></span>
						<span class="m-popular-activity-position position-right"></span>
						<img src="https://static.jiaoyubao.cn/images/mobile/hd-icon-zengpin.svg" alt="" />
						<text class="_a flex-1 ellipsis-1">立即领取{{ detailObj.nickname }}免费试听名额</text>
						<button class="jyb-btn jyb-btn-red m-jyb-call-btn" @click="makeTelPhone">领取</button>
					</li>
				</ul>
				<a v-if="moreButtonshow" hover-class="none" class="activity-list-show-more" @click="showMoreActive">
					<img src="https://static.jiaoyubao.cn/images/mobile/icon-more-arrow.svg" alt="" />
				</a>
			</div>
			<!-- 课程 -->
			<!-- 骨架屏开始 -->
			<div class="m-class bgfff mtop10 " v-show="showSkeleton">
				<navigator hover-class="none" class="m-module-title skeleton-rect" style="background: #f5f6f7;"></navigator>
				<ul class="m-class-list">
					<li>
						<navigator hover-class="none" class="_a flex-box">
							<div class="m-class-img skeleton-rect" style="background: #f5f6f7;"><img /></div>
							<div class="m-class-intro flex-1">
								<h3 class="ellipsis-1 skeleton-rect" style="background: #f5f6f7;"></h3>
								<p class="ellipsis-1 skeleton-rect" style="background: #f5f6f7;"></p>
								<div class="flex-box skeleton-rect" style="background: #f5f6f7;"></div>
							</div>
						</navigator>
					</li>
					<li>
						<navigator hover-class="none" class="_a flex-box">
							<div class="m-class-img skeleton-rect" style="background: #f5f6f7;"><img /></div>
							<div class="m-class-intro flex-1">
								<h3 class="ellipsis-1 skeleton-rect" style="background: #f5f6f7;"></h3>
								<p class="ellipsis-1 skeleton-rect" style="background: #f5f6f7;"></p>
								<div class="flex-box skeleton-rect" style="background: #f5f6f7;"></div>
							</div>
						</navigator>
					</li>
					<li>
						<navigator hover-class="none" class="_a flex-box">
							<div class="m-class-img skeleton-rect" style="background: #f5f6f7;"><img /></div>
							<div class="m-class-intro flex-1">
								<h3 class="ellipsis-1 skeleton-rect" style="background: #f5f6f7;"></h3>
								<p class="ellipsis-1 skeleton-rect" style="background: #f5f6f7;"></p>
								<div class="flex-box skeleton-rect" style="background: #f5f6f7;"></div>
							</div>
						</navigator>
					</li>
				</ul>
			</div>
			<!-- 骨架屏结束 -->
			<div class="m-class bgfff mtop10 " v-if="detailObj.comtype == 1 && classesNum > 0">
				<navigator hover-class="none" class="m-module-title" :url="'/pages/class/index?agency=' + agencyEname" title="">
					课程({{ classesNum }})
					<img class="m-module-more fr" src="https://static.jiaoyubao.cn/images/mobile/icon-rightarrow.svg" alt="" />
				</navigator>

				<!-- 课程列表 -->
				<class-item type="left-right" :cityename="cityEname" :agencyename="agencyEname" :classes="classes"></class-item>
			</div>

			<!-- 老师 -->
			<div class="m-teacher m-teacher-swiper-outer bgfff mtop10 " v-if="teacherNum > 0">
				<navigator hover-class="none" class="m-module-title" :url="'/pages/teacher/index?agency=' + agencyEname" title="">
					老师({{ teacherNum }})
					<img class="m-module-more fr" src="https://static.jiaoyubao.cn/images/mobile/icon-rightarrow.svg" alt="" />
				</navigator>

				<teacher-item type="up-down" :cityename="cityEname" :agencyename="agencyEname" :teachers="teachers"></teacher-item>
			</div>

			<!-- 机构简介 -->
			<div class="m-agency-intro bgfff mtop10 " v-if="intro != ''">
				<navigator hover-class="none" class="m-module-title" :url="'/packageA/intro/index?agency=' + agencyEname" title="">
					机构简介
					<img class="m-module-more fr" src="https://static.jiaoyubao.cn/images/mobile/icon-rightarrow.svg" alt="" />
				</navigator>
				<navigator hover-class="none" :url="'/packageA/intro/index?agency=' + agencyEname" title="">
					<p class="ellipsis-6">{{ tools.UnicodeToAscii(intro) }}</p>
					<!-- <p class="ellipsis-6" type="text" v-html="intro"></p> -->
				</navigator>
			</div>

			<!-- 校区 -->
			<div class="m-school bgfff mtop10 " v-if="schoolsNum > 1">
				<navigator hover-class="none" class="m-module-title" :url="'/pages/school/index?agency=' + agencyEname" title="">
					校区({{ schoolsNum }})
					<img class="m-module-more fr" src="https://static.jiaoyubao.cn/images/mobile/icon-rightarrow.svg" alt="" />
				</navigator>

				<school-item :cityename="cityEname" :agencyename="agencyEname" :schools="schools" @receiveMakeTelPhone="makeTelPhone"></school-item>
			</div>
			<div class="m-school bgfff mtop10 " v-if="schoolsNum == 1">
				<navigator hover-class="none" class="m-module-title" url="" title="">校区(1)</navigator>
				<school-item :cityename="cityEname" :agencyename="agencyEname" :schools="schools" @receiveMakeTelPhone="makeTelPhone"></school-item>
				<!-- map -->
				<view v-if="lat && lng">
					<map
						id="myMap"
						:latitude="lat"
						:longitude="lng"
						:markers="markerList"
						show-location="true"
						show-compass="true"
						show-scale="true"
						style="width: 91vw; height: 320rpx;"
					></map>
				</view>
			</div>

			<!-- 校区 一个校区 -->

			<!-- 评价 -->
			<div class="m-evaluation bgfff mtop10 " v-if="evaluations.length > 0">
				<navigator hover-class="none" class="m-module-title" :url="'/packageA/evaluation/index?agency=' + agencyEname" title="">
					评价({{ detailObj.num_pj }})
					<img class="m-module-more fr" src="https://static.jiaoyubao.cn/images/mobile/icon-rightarrow.svg" alt="" />
				</navigator>
				<div class="m-evaluation-score flex-box">
					<div class="m-evaluation-score-l flex-box">
						<h3>{{ (detailObj.star / 10).toFixed(1) }}</h3>
						<div>
							<span>{{ detailObj.star > 45 ? '超棒' : detailObj.star > 35 ? '很好' : '一般' }}</span>
							<p>{{ detailObj.num_pj }}人评价</p>
						</div>
					</div>
					<ul class="m-evaluation-score-r flex-1" v-if="evalDataTotal > 0">
						<block v-for="(item, index) in evalLevelData" :key="index">
							<li class="flex-box">
								<span>{{ item.level == 1 ? '好评' : item.level == 2 ? '中评' : '差评' }}</span>
								<div class="flex-1">
									<p class="m-evaluation-bar-outer"></p>
									<p class="m-evaluation-bar-inner" :style="'width:' + Math.round((item.num / evalDataTotal) * 100) + '%;'"></p>
								</div>
								<span>{{ Math.round((item.num / evalDataTotal) * 100) }}%</span>
							</li>
						</block>
					</ul>
				</div>
				<!-- Swiper -->
				<pj-swiper-item :evaluations="evaluations" :cityename="cityEname" :agencyename="agencyEname"></pj-swiper-item>
			</div>

			<!-- 评价 暂无评价数据 -->

			<!-- 学费 -->
			<div class="m-evaluation m-fee bgfff mtop10 " v-if="feeNum > 0">
				<!-- 下面所有 a标签 都链接到学费页面 -->
				<navigator hover-class="none" :url="'/packageA/fee/index?agency=' + agencyEname" class="m-module-title" title="">
					学费({{ feeNum }})
					<img class="m-module-more fr" src="https://static.jiaoyubao.cn/images/mobile/icon-rightarrow.svg" alt="" />
				</navigator>
				<ul class="m-fee-list mtop30">
					<li v-for="(item, index) in feeList" :key="index">
						<navigator hover-class="none" :url="'/packageA/fee/index?agency=' + agencyEname" class="flex-box">
							<div class="m-fee-item-msg flex-1">
								<div class="clearfloat">
									<em class="fl">{{ item.user_name }}</em>
									<span class="fr" v-if="!isPriceView">
										<img v-for="i of item.imgLen" :key="i" class="m-fee-zz fl" src="https://static.jiaoyubao.cn/images/mobile/fee-zhezhao.png" alt="" />
										{{ item.newPrice }}元
									</span>
									<span class="fr" v-else>{{ item.priceStr }}元</span>
								</div>
								<p>
									<em class="fontArial fl">{{ item.dt_baoming }}</em>
									<span class="ellipsis-1">报名课程：{{ item.service_mc }}</span>
									<i class="m-fee-check-btn fr">查看学费</i>
								</p>
							</div>
						</navigator>
					</li>
				</ul>
			</div>

			<!-- 资料/资讯 -->
			<div class="m-news-data bgfff mtop10 " v-if="newsDatas.length > 0">
				<!-- 有tab切换时显示 -->
				<ul class="jyb-tab jyb-tab-style1 jyb-tab-allowclick clearfloat flex-box" v-if="newsDatas.length == 2">
					<li :class="newsDatasIdx == index ? 'jyb-tab-cur' : ''" v-for="(item, index) in newsDatas" :key="index" :data-idx="index" @click="changeTabIdx">
						<text class="_a m-module-title">{{ item.title }}</text>
					</li>
					<navigator hover-class="none" :url="newsDatas[newsDatasIdx].url" class="_a flex-1 m-module-title fr" title="">
						<img class="m-module-more fr" src="https://static.jiaoyubao.cn/images/mobile/icon-rightarrow.svg" alt="" />
					</navigator>
				</ul>
				<!-- 无tab切换时显示, 当内容多于四条时显示右箭头 -->
				<navigator hover-class="none" :url="newsDatas[0].url" v-if="newsDatas.length == 1" class="_a m-module-title" title="">
					{{ newsDatas[0].title }}
					<img class="m-module-more fr" src="https://static.jiaoyubao.cn/images/mobile/icon-rightarrow.svg" alt="" />
				</navigator>

				<div class="m-news-data-container">
					<!-- 资料 -->
					<block>
						<ul class="m-news-data-list" v-show="newsDatasIdx == 0">
							<li class="ellipsis-1" v-for="(item, idx) in newsDatas[0].data" :key="idx">
								<navigator
									hover-class="none"
									class="_a"
									:url="'/packageA/' + newsDatas[0].urlType + '/index?id=' + item.id + '&agency=' + agencyEname"
									title=""
								>
									{{ item.title }}
								</navigator>
							</li>
						</ul>
					</block>
					<!-- 资讯 -->
					<block v-if="newsDatas.length > 1">
						<ul class="m-news-data-list" v-show="newsDatasIdx == 1">
							<li class="ellipsis-1" v-for="(item, idx) in newsDatas[1].data" :key="idx">
								<navigator
									hover-class="none"
									class="_a"
									:url="'/packageA/' + newsDatas[1].urlType + '/index?id=' + item.id + '&agency=' + agencyEname"
									title=""
								>
									{{ item.title }}
								</navigator>
							</li>
						</ul>
					</block>
				</div>
			</div>

			<!-- 小伙伴都看了 -->
			<div class="m-other-watching bgfff mtop10 " v-if="agencyOthers.length > 0">
				<view class="m-module-title" title="">小伙伴都看了</view>

				<agency-item :agencyothers="agencyOthers"></agency-item>
			</div>

			<!-- 相关推荐 -->
			<div class="m-next-recommend bgfff mtop10" v-if="false && tuijian.length > 0">
				<view class="m-module-title" title="">相关推荐</view>

				<view class="m-next-recommend-swiper"><next-related :cityename="cityEname" :tuijian="tuijian"></next-related></view>
			</div>

			<!-- 视频播放 -->
			<video-play v-if="videoSrc" :videosrc="videoSrc" @closeVideo="closeVideoPop"></video-play>

			<!--
			底部模块
			-->
			<!-- 面包屑 -->
			<!-- <bread-crumbs v-if="detailObj && classObj" :detailobj="detailObj" :classobj="classObj"></bread-crumbs> -->

			<!-- 通用底部 -->
			<view class="footer-ele-padding"><footer-ele></footer-ele></view>

			<!-- 拨打电话底部弹出层 -->
			<tel-phone v-if="detailObj && telPhonePopShow" :detailobj="detailObj" @telPhonePopHide="telPhonePopHide"></tel-phone>

			<!-- 预约/咨询 -->
			<footer-agency
				@handlerTelPhone="makeTelPhone"
				:hasfee="hasFeeData"
				:cityename="cityEname"
				:agencyename="agencyEname"
				v-if="navTabItemClass.length > 0 && navTabItemSchool.length > 0 && detailObj"
				:course="navTabItemClass"
				:campus="navTabItemSchool"
				pagename="agencyindex"
				:detailobj="detailObj"
				:usermobile="usermobile"
			></footer-agency>
		</div>

		<online-talk></online-talk>
	</view>
</template>

<script>
import { navTabItemShowMixin, recordTrackingMixin } from '../../common/js/mixins.js';
import { queryByAgency } from '../../common/js/url-monitor.js';
import dataArray from '../../common/data/data';
import quickSkeleton from '../../component/quick-skeleton.vue';
export default {
	mixins: [navTabItemShowMixin, recordTrackingMixin],
	data() {
		return {
			ysf:{title: '机构详情页'},
			// show or hide
			telPhonePopShow: false,
			activityShow: false,
			// param
			agencyEname: '', // 'jnxhd', // 'dazhixuexiao',
			lat: '',
			lng: '',
			markerList: [],
			classObj: '',
			cityEname: '',
			cityName: '',
			// 接口返回数据
			detailObj: '',
			evalScore: 4.9,
			photos: [],
			videos: [],
			videoSrc: '',
			// photosArr: [],
			teachers: [],
			teacherNum: 0,
			classes: [],
			classesNum: 0,
			nearSchool: '', // 最近校区
			schools: [],
			schoolsNum: 0,
			feeList: [],
			feeNum: 0,
			intro: '',
			agencyOthers: [],
			evaluations: [],
			evalLevel: [
				{
					Group: 1,
					starnummin: 40,
					starnummax: 51,
					title: '好评'
				},
				{
					Group: 2,
					starnummin: 30,
					starnummax: 40,
					title: '中评'
				},
				{
					Group: 3,
					starnummin: 0,
					starnummax: 30,
					title: '差评'
				}
			],
			evalLevelData: [{ level: 1, num: 0 }, { level: 2, num: 0 }, { level: 3, num: 0 }],
			evalDataTotal: 0,
			telBase: getApp().globalData.tel400,
			telPhone: '',
			antelPhone: '',
			newsDatas: [],
			newsDatasIdx: 0,
			tuijian: [],
			showSkeleton: true,
			// 活动数据
			activeList: [],
			newActiveList: [],
			isHaveDpj: 0,
			activeListLength: 0,
			hideMoreActive: 'm-popular-activity-list',
			moreButtonshow: false,
			isPriceView: false,
			usermobile: '',
			newhd:true
		};
	},
	components: {
		quickSkeleton
	},
	onReady() {
		let _this = this;
		_this.$refs.skeleton.attachedAction();
		_this.$refs.skeleton.readyAction();
		
	},
	async onLoad(opts) {
		console.log(opts)
		let _this = this;
		// console.log(opts);
		if (opts && JSON.stringify(opts) != '{}') {
			// 获取机构英文名
			_this.agencyEname = opts.agency;
			
			// 根据机构英文名 获取城市
			_this.cityEname = await queryByAgency(opts.city, opts.agency); // opts.city;
			console.log("_this.cityEname", _this.cityEname);
			dataArray.cityArr.map(item => {
				if (item.ename == _this.cityEname) {
					_this.cityName = item.name;
				}
			});
		} else {
			// _this.tools.toastShow('获取位置失败！');
		}
		// console.log(_this.cityEname);
		// 获取城市信息
		_this.location.getCurCityEname(_this, function(res) {
			_this.cityEname = _this.cityEname || res.data[0].cityename;
			_this.cityName = _this.cityName || res.data[0].cityname;
			if(res.location){
				_this.lat = res.location.lat;
				_this.lng = res.location.lng;
			}
			_this.queryFn();
		});
		// _this.tools.getStorage("classobj", function(res){
		// 	_this.classObj = res.data;
		// });
		_this.component.getComClassDetail(_this, function(res) {
			// // console.log(res.data);
			_this.classObj = res.data.filter(item => item.jb == 2)[0];
		});

		_this.getNavTabItemShowMixin();
		_this.getAgencyActivities();
		_this.hideMoreActive = _this.activeListLength > 2 ? 'activity-maxheight m-popular-activity-list' : 'm-popular-activity-list';

		let loginState = uni.getStorageSync('loginStateStart');
		if (loginState) {
			let nowTime = new Date().getTime();
			let diff = nowTime - loginState;
			if (diff < 1800000) {
				_this.isPriceView = true;
			} else {
				_this.isPriceView = false;
			}
		} else {
			_this.isPriceView = false;
		}
		// _this.isPriceView = uni.getStorageSync('isPriceView') || false;
	},
	onShow() {
		// 微信分享到朋友圈功能
		// #ifdef MP-WEIXIN
			wx.showShareMenu({
				withShareTicket:true,
				menus:['shareAppMessage','shareTimeline']
			})
			this.usermobile = uni.getStorageSync('userMobile') || '';
		// #endif
	},
	onShareAppMessage(res) {
		let _this = this;
		// console.log(res);
		return {
			title: `【${_this.detailObj.name}】${_this.tools.UnicodeToAscii(_this.detailObj.nickname)}主页_地址电话_学费价格-教育宝手机站`,
			path: `/pages/agencyindex/index?agency=${_this.agencyEname}&city=${_this.cityEname}`,
			imageUrl: `https:${_this.photos[0].masterimage}`,
			content: `${_this.detailObj.name},${_this.cityName}${_this.tools.UnicodeToAscii(_this.detailObj.nickname)},${_this.cityName}${_this.tools.UnicodeToAscii(
				_this.detailObj.nickname
			)}学费价格,${_this.cityName}${_this.tools.UnicodeToAscii(_this.detailObj.nickname)}地址电话`
		};
	},
	created() {
		let _this = this;
	},
	methods: {
		showMoreActive() {
			let _this = this;
			_this.hideMoreActive = 'm-popular-activity-list';
			_this.moreButtonshow = false;
		},
		curVideoFullScreen(e) {
			// console.log(e);
			this.videoSrc = e.currentTarget.dataset.src;
		},
		closeVideoPop() {
			this.videoSrc = '';
		},
		// 设置当前页title
		setCurPageTitle() {
			let _this = this;
			let titleStr = _this.tools.UnicodeToAscii(_this.detailObj.nickname);
			// #ifdef MP-BAIDU
			// titleStr = `【${_this.detailObj.name}】${_this.tools.UnicodeToAscii(_this.detailObj.nickname)}主页_地址电话_学费价格-教育宝手机站`;
			titleStr = "机构主页";
			// #endif
			uni.setNavigationBarTitle({
				title: titleStr
			});
		},
		// 设置页面基础信息
		setPageInfo(getPageInfoClass) {
			let _this = this;

			swan.setPageInfo({
				title: `【${_this.detailObj.name}】${_this.tools.UnicodeToAscii(_this.detailObj.nickname)}主页_地址电话_学费价格-教育宝手机站`,
				keywords: `想了解${_this.detailObj.name}怎么样？${_this.detailObj.maintitle}，涵盖${getPageInfoClass}，点击查看${_this.cityName}${_this.tools.UnicodeToAscii(
					_this.detailObj.nickname
				)}学费价格、最新课程、老师介绍、点评评价，此外还提供${_this.cityName}${_this.tools.UnicodeToAscii(_this.detailObj.nickname)}简介、官网、地址、电话等信息。`,
				description: `${_this.detailObj.name},${_this.cityName}${_this.tools.UnicodeToAscii(_this.detailObj.nickname)},${_this.cityName}${_this.tools.UnicodeToAscii(
					_this.detailObj.nickname
				)}学费价格,${_this.cityName}${_this.tools.UnicodeToAscii(_this.detailObj.nickname)}地址电话`,
				image: ['https:' + _this.photos[0].masterimage],
				success: function() {
					// console.log('setPageInfo success');
				},
				fail: function(err) {
					// console.log('setPageInfo fail', err);
				}
			});
		},
		queryFn() {
			let _this = this;
			_this.getAgencyDetail();
			_this.getAgencyIntro();
			_this.getAgencyTeachers();
			_this.getAgencyClasses();
			_this.getAgencyNews();
			_this.getAgencyDatas();
			_this.getAgencySchools();
			_this.getAgencyFee();
			_this.getAgencyUnderCategory();
			_this.getAgencyEvaluation();
			_this.getRelatedTuijian();
			_this.getEvalLevel();
		},
		// 拨打电话
		makeTelPhone(e) {
			let _this = this;
			
			//// 微信小程序环境 执行下面埋点代码
			// -- 20200821 [去掉微信小程序环境的条件编译] -- 百度小程序通用
				// 点击拨打电话的用户统计
				let callcode = _this.detailObj.callcode ? _this.detailObj.callcode : '',
					comename = _this.detailObj.ename ? _this.detailObj.ename : '',
					classid = '';
				_this.telTrackRecordFn(callcode, comename, classid)
			// 
			
			// console.log(_this.tools.getPlatform());
			if (_this.tools.getPlatform() == 'ios') {
				uni.makePhoneCall({
					phoneNumber: _this.telPhone //仅为示例
				});
			} else {
				// _this.telPhonePopShow = true;
				uni.makePhoneCall({
					phoneNumber: _this.antelPhone //仅为示例
				});
			}
		},
		telPhonePopHide() {
			this.telPhonePopShow = false;
		},
		// 资讯/资料 tab 切换
		changeTabIdx(e) {
			let _this = this;
			let _idx = e.currentTarget.dataset.idx;
			// console.log(_idx);
			_this.newsDatasIdx = _idx;
		},
		// 获得相册 idx
		getPhotoClickIdx(e) {
			// 20190808 暂时去掉图片预览
			// let _this = this;
			// // console.log(e.currentTarget.dataset.swiperSlideIndex);
			// let idx = e.currentTarget.dataset.swiperSlideIndex;
			// _this.previewimage(idx);

			// 2019.11.06 添加图片预览功能
			let _this = this;
			let idx = e.currentTarget.dataset.swiperSlideIndex;
			let imgs = _this.photos.map((item, index) => {
				if (item.masterimage.startsWith('http:') || item.masterimage.startsWith('https:')) {
					return item.masterimage;
				}
				return 'https:' + item.masterimage;
			});

			_this.tools.imgPreview(imgs, idx);
		},
		// 预览图片
		// previewimage(idx) {
		// 	let _this = this;
		// 	uni.previewImage({
		// 		urls: _this.photosArr,
		// 		current: Number(idx)
		// 	});
		// },
		// 获取机构详情
		getAgencyDetail() {
			let _this = this;
			let ajaxUrl = _this.$api.GetAgencyDetail.url + '&key={comename:' + _this.agencyEname + '}';
			_this.$ajax2(
				_this.$api.GetAgencyDetail,
				ajaxUrl,
				'获取机构详情',
				function(res) {
					// console.log(res.data);
					if (res.data && res.data.data && res.data.data.length > 0) {
						_this.detailObj = res.data.data[0];
						_this.detailObj.name = _this.tools.UnicodeToAscii(_this.detailObj.name);
						if (_this.detailObj.attribute.length > 0) {
							for (let i = 0; i < _this.detailObj.attribute.length; i++) {
								if (_this.detailObj.attribute[i].typecode == '901035005') {
									_this.isHaveDpj = 1;
									_this.activeListLength += 1;
								}
							}
						} else {
							_this.isHaveDpj = 0;
							_this.activeListLength += 0;
						}
						_this.moreButtonshow = _this.activeListLength > 2 ? true : false;
						_this.hideMoreActive = _this.activeListLength > 2 ? 'activity-maxheight m-popular-activity-list' : 'm-popular-activity-list';
						_this.jybCodeStatistics();
						_this.telPhone = _this.telBase + ',' + res.data.data[0].callcode;
						_this.antelPhone = _this.telBase + ',,' + res.data.data[0].callcode;
						if (res.data.data[0].video.length > 0) {
							_this.videos = res.data.data[0].video;
						}
						if (res.data.data[0].masterimage.length > 0) {
							_this.photos = res.data.data[0].masterimage;
						}
						// console.log(_this.detailObj);
						_this.setCurPageTitle();
						// 隐藏骨架屏
						_this.showSkeleton = false;
					}
					_this.getAgencyAlbum();
				},
				true
			);
		},
		jybCodeStatistics() {
			// console.log('================代码统计，日志收集====================');
			let _this = this;
			let nowDate = _this.tools.formatSecond(new Date());
			let urlStr = 'pages/agencyindex/index?agency=' + _this.agencyEname;
			let collectionArr = [];
			let collections = 'jiaoyubaoxcx_browse_jyb_' + _this.agencyEname;
			collectionArr.push(collections);
			let param = {
				domain: 'xcx.jiaoyubao.cn',
				url: encodeURIComponent(urlStr),
				trackCollection: collectionArr,
				trackTime: nowDate,
				uid: '0'
			};
			// console.log(param);
			uni.request({
				url: 'https://view.jiaoyubao.cn/LogCollection/LogCollectionAnalysis?param=' + JSON.stringify(param),
				method: 'GET',
				success: res => {
					// console.log('success' + res);
				},
				fail: res => {
					// console.log('fail' + res);
				}
			});
		},
		// 获取机构简介
		getAgencyIntro() {
			let _this = this;
			let ajaxUrl = _this.$api.GetAgencyIntro.url + '&key={comename:' + _this.agencyEname + ',typebh:901016002003}';
			// console.log(ajaxUrl)
			_this.$ajax2(_this.$api.GetAgencyIntro, ajaxUrl, '获取简介', function(res) {
				if (res.data && res.data.data && res.data.data.length > 0) {
					// let htmlStr = _this.tools.HTMLDecode(res.data.data[0].jj);
					let htmlStr = _this.tools.escape2Html(res.data.data[0].jj);
					_this.intro = _this.tools.delHtmlTag(htmlStr);
				}
			});
		},
		// 获取机构相册列表
		getAgencyAlbum() {
			let _this = this;
			let ajaxUrl = _this.$api.GetAgencyAlbum.url + '&key={comename:' + _this.agencyEname + ',pagesize:4}';
			_this.$ajax2(_this.$api.GetAgencyAlbum, ajaxUrl, '获取相册', function(res) {
				if (res.data && res.data.data && res.data.data.length > 0) {
					for (let i = 0, len = res.data.data.length; i < len; i++) {
						_this.photos.push({
							masterimage: res.data.data[i].imageurl,
							mastertitle: res.data.data[i].imagetitle
						});
						// _this.photosArr.push(res.data.data[i].imageurl);
					}
				}
			});
		},
		// 获取机构老师列表
		getAgencyTeachers() {
			let _this = this;
			let ajaxUrl = _this.$api.GetAgencyTeachers.url + '&key={comename:' + _this.agencyEname + '}';
			_this.$ajax2(_this.$api.GetAgencyTeachers, ajaxUrl, '获取老师', function(res) {
				if (res.data && res.data.data && res.data.data.length > 0) {
					_this.teachers = res.data.data;
					_this.teacherNum = res.data.rec;
				}
			});
		},
		// 获取机构活动列表
		getAgencyActivities() {
			let _this = this;
			let ajaxUrl = _this.$api.GetAgencyActivities.url + '&key={comename:' + _this.agencyEname + '}';
			_this.$ajax2(_this.$api.GetAgencyActivities, ajaxUrl, '获取机构活动', function(res) {
				for (let i = 0; i < res.data.data.length; i++) {
					// res.data.data[0].activityversion = 2;
					// res.data.data[1].activityversion = 2;
					if(res.data.data[i].activityversion && res.data.data[i].activityversion >= 2){//新活动
						_this.newActiveList.push(res.data.data[i]);
						_this.GETPurchaseNumSale(res.data.data[i].id);
					}else{//旧活动
						_this.activeList.push(res.data.data[i]);
					}
				}
				_this.activeListLength += _this.activeList.length;
				_this.moreButtonshow = _this.activeListLength > 2 ? true : false;
				_this.hideMoreActive = _this.activeListLength > 2 ? 'activity-maxheight m-popular-activity-list' : 'm-popular-activity-list';
			});
		},
		//获取活动购买计数
		GETPurchaseNumSale(codeID){
			let _this = this;
			let ajaxUrl = _this.$api.GETActivity.url + '&key={kv:company_activity_sale,code:'+codeID+'}';
			_this.$ajax2(_this.$api.GETActivity, ajaxUrl, '获取活动购买人数', function(res) {
				if(res.data.result == '1'){
					for (let i = 0; i < _this.newActiveList.length; i++) {
						if(_this.newActiveList[i].id == codeID){
							_this.$set(_this.newActiveList[i], 'purchaseNum', res.data.number);
						}
					}
				}
			});
		},
		// 获取机构课程列表
		getAgencyClasses() {
			let _this = this;
			let ajaxUrl = _this.$api.GetAgencyClasses.url + '&key={comename:' + _this.agencyEname + '}';
			// console.log(ajaxUrl);
			_this.$ajax2(_this.$api.GetAgencyClasses, ajaxUrl, '获取课程', function(res) {
				if (res.data && res.data.data && res.data.data.length > 0) {
					// 先根据 productrecommend      再以 productrecommendweight 排序
					let classList = res.data.data.sort((x,y)=>y.productrecommend-x.productrecommend).sort((x,y)=>y.productrecommendweight-x.productrecommendweight); // 降序
					_this.classesNum = classList.length;
					_this.classes = classList.slice(0, 3);
				}
			});
		},
		// 获取机构校区
		bd_decrypt: function(bdLat, bdLon) {
			let PI = 3.14159265358979324;
			let x_pi = (3.14159265358979324 * 3000.0) / 180.0;
			let x = bdLon - 0.0065,
				y = bdLat - 0.006;
			let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
			let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
			let gcjLon = z * Math.cos(theta);
			let gcjLat = z * Math.sin(theta);
			return { lat: gcjLat, lon: gcjLon };
		},
		getAgencySchools() {
			let _this = this;
			_this.mapCtx = uni.createMapContext('myMap');
			let ajaxUrl = _this.$api.GetAgencySchools.url + '&key={comename:' + _this.agencyEname + ',coordinate:' + _this.lat + '_' + _this.lng + '}';
			_this.$ajax2(_this.$api.GetAgencySchools, ajaxUrl, '获取校区', function(res) {
				if (res.data && res.data.data && res.data.data.length > 0) {
					_this.schoolsNum = res.data.data.length;
					_this.nearSchool = res.data.data[0];
					// console.log(res.data.data);
					_this.schools = res.data.data.slice(1, 4);
					if (_this.schoolsNum == 1) {
						let obj = _this.bd_decrypt(res.data.data[0].map_y, res.data.data[0].map_x);
						_this.$set(res.data.data[0], 'lat', obj.lat);
						_this.$set(res.data.data[0], 'lng', obj.lon);
						let calloutObj = {
							content: res.data.data[0].pointname,
							color: '#fff',
							fontSize: '12px',
							borderRadius: '18px',
							bgColor: '#1a8cff99',
							padding: '8px',
							display: 'ALWAYS', // 'BYCLICK',
							textAlign: 'centerBYCLICK'
						};
						let iconPathStr = 'https://static.jiaoyubao.cn/images/uniapp/map-blue@2x.png';
						let labelObj = {
							content: '1',
							width: '36px',
							color: '#fff',
							fontSize: '14px',
							textAlign: 'center',
							borderWidth: 0,
							anchorX: '-2px',
							anchorY: '-30px'
						};
						_this.markerList.push({
							id: res.data.data[0].areacode,
							latitude: res.data.data[0].lat,
							longitude: res.data.data[0].lng,
							iconPath: iconPathStr,
							width: '36px',
							height: '36px',
							callout: calloutObj,
							label: labelObj
						});
						setTimeout(function() {
							_this.mapCtx.moveToLocation({ longitude: res.data.data[0].lng, latitude: res.data.data[0].lat });
						}, 1000);
					}
				}
			});
		},
		
		// 获取机构学费
		getAgencyFee() {
			let _this = this;
			let ajaxUrl = _this.$api.GetAgencyFee.url + '&key={comename:' + _this.agencyEname + ',pagesize:3}';
			_this.$ajax2(_this.$api.GetAgencyFee, ajaxUrl, '获取学费', function(res) {
				if (res.data && res.data.data && res.data.data.length > 0) {
					_this.feeNum = res.data.rec;
					for (let i = 0; i < res.data.data.length; i++) {
						let arr = new Array();
						let priceStr = res.data.data[i].service_price.toString();
						let priceLen = priceStr.length;
						let imgLen = Math.ceil(priceLen / 2);
						let newPrice = priceStr.substr(imgLen);
						arr.length = imgLen;
						// console.log(priceLen);
						_this.feeList.push({
							id: res.data.data[i].id,
							company_id: res.data.data[i].company_id,
							service_id: res.data.data[i].service_id,
							service_mc: res.data.data[i].service_mc,
							service_price: res.data.data[i].service_price,
							user_name: res.data.data[i].user_name,
							tel: res.data.data[i].tel,
							point_name: res.data.data[i].point_name,
							dt_baoming: res.data.data[i].dt_baoming.replace(/-/g, '/'),
							lesson_info: res.data.data[i].lesson_info,
							cityename: res.data.data[i].cityename,
							comename: res.data.data[i].comename,
							company_mc: res.data.data[i].company_mc,
							service_price1: res.data.data[i].service_price1,
							imgLen: arr,
							newPrice: newPrice,
							priceStr: priceStr
						});
					}
					// _this.feeList = res.data.data.slice(0, 3);
				}
			});
		},
		// 获取机构资讯
		getAgencyNews() {
			let _this = this;
			let ajaxUrl = _this.$api.GetAgencyNews.url + '&key={comename:' + _this.agencyEname + ',pagesize:4}';
			_this.$ajax2(_this.$api.GetAgencyNews, ajaxUrl, '获取资讯', function(res) {
				if (res.data && res.data.data && res.data.data.length > 0) {
					_this.newsDatas.push({
						title: '机构资讯',
						url: '/packageA/news/index?agency=' + _this.agencyEname,
						type: 'n',
						urlType: 'article',
						data: res.data.data // dataCopy
					});
				}
			});
		},
		// 获取机构资料
		getAgencyDatas() {
			let _this = this;
			let ajaxUrl = _this.$api.GetAgencyDatas.url + '&key={comename:' + _this.agencyEname + ',pagesize:4}';
			_this.$ajax2(_this.$api.GetAgencyDatas, ajaxUrl, '获取资料', function(res) {
				if (res.data && res.data.data && res.data.data.length > 0) {
					_this.newsDatas.push({
						title: '知识资料',
						url: '/packageA/datas/index?agency=' + _this.agencyEname,
						type: 'k',
						urlType: 'datasdetail',
						data: res.data.data // dataCopy
					});
				}
			});
		},
		// 获取机构小伙伴还看了
		getAgencyUnderCategory() {
			let _this = this;
			let ajaxUrl = _this.$api.GetAgencyUnderCategory.url + '&key={comename:' + _this.agencyEname + ',cityename:' + _this.cityEname + ',pagesize:4}';
			_this.$ajax2(_this.$api.GetAgencyUnderCategory, ajaxUrl, '小伙伴还看了', function(res) {
				if (res.data && res.data.data && res.data.data.length > 0) {
					for (let i = 0; i < res.data.data.length; i++) {
						// console.log(res.data.data[i].comename);
						if (res.data.data[i].comename == _this.agencyEname) {
							res.data.data.splice(i, 1);
						}
					}
					_this.agencyOthers = res.data.data;
				}
			});
		},
		// 获取相关推荐
		getRelatedTuijian() {
			let _this = this;
			let ajaxUrl = _this.$api.GetRelatedTuijian.url + '&key={comename:' + _this.agencyEname + ',pagesize:4}';
			_this.$ajax2(_this.$api.GetRelatedTuijian, ajaxUrl, '获取相关推荐', function(res) {
				_this.activityShow = true;

				if (res.data && res.data.data && res.data.data.length > 0) {
					_this.tuijian = res.data.data.filter(item => item.jb == 3 || item.jb == 4).slice(0, 10);
					// _this.tuijian = res.data.data.slice(0,10);

					// #ifdef MP-BAIDU
					// console.log('#ifdef MP-BAIDU');

					let jb3 = res.data.data.filter(item => item.jb == 3);
					let weightDownArr = jb3.sort(_this.weightDown);
					let productcountDownArr = weightDownArr.sort(_this.productcountDown);
					let getPageInfoClass = productcountDownArr.slice(0, 3).map(x => {
						return x.name;
					});
					// console.log('getPageInfoClass==' + getPageInfoClass);
					_this.setPageInfo(getPageInfoClass);
					// #endif
				} else {
					// #ifdef MP-BAIDU
					// console.log('#ifdef MP-BAIDU');
					_this.setPageInfo('');
					// #endif
				}
			});
		},
		weightDown(x, y) {
			return y.weight - x.weight;
		},
		productcountDown(x, y) {
			return y.productcount - x.productcount;
		},
		// 获取评价
		getAgencyEvaluation(isGetLevel, obj, idx) {
			let _this = this;
			let ajaxUrl;
			if (isGetLevel) {
				// 获取等级
				ajaxUrl =
					_this.$api.GetAgencyEvaluation.url + '&key={comename:' + _this.agencyEname + ',page:0,starnummin:' + obj.starnummin + ',starnummax:' + obj.starnummax + '}';
			} else {
				ajaxUrl = _this.$api.GetAgencyEvaluation.url + '&key={comename:' + _this.agencyEname + ',pagesize:5}';
			}
			_this.$ajax2(_this.$api.GetAgencyEvaluation, ajaxUrl, '获取评价', function(res) {
				if (isGetLevel) {
					_this.$set(_this.evalLevelData[idx], 'num', res.data.rec);
					_this.evalDataTotal += Number(res.data.rec);
					// console.log('_this.evalDataTotal===' + _this.evalDataTotal);
				} else {
					if (res.data && res.data.data && res.data.data.length > 0) {
						for (let i = 0, len = res.data.data.length; i < len; i++) {
							res.data.data[i].dt_pj = _this.tools.getDate(res.data.data[i].dt_pj);
							res.data.data[i].content = res.data.data[i].content.replace(/\n/g, '<br>');
						}
						_this.evaluations = res.data.data;
					}
				}
			});
		},
		// 获取评价等级
		getEvalLevel() {
			let _this = this;
			for (let i = 0, len = _this.evalLevel.length; i < len; i++) {
				_this.getAgencyEvaluation(true, _this.evalLevel[i], i);
			}
		}
	}
};
</script>

<style lang="scss">
// 每个页面公共css
@import './index.scss';
</style>
