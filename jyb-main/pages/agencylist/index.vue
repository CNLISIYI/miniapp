<template>
	<div class="m-common-container m-list_index-container flex-box-column">
		<quick-skeleton :show="showSkeleton" ref="skeleton" catchtouchmove="true" fixed="true" loading="chiaroscuro" selector="skeleton" bgcolor="#FFF"></quick-skeleton>
		<scroll-view scroll-y="true" class="scroll-Y skeleton" @scroll="agencyPageScroll" scroll-with-animation="true" enable-back-to-top="true">
			<main
				:class="[
					'm-common-main',
					'flex-1',
					areaBusinessShow || categorySortShow || sortShow || siftShow || menuPopShow ? 'm-over-hidden' : '',
					menuPopShow ? 'jyb-filter-blur' : ''
				]"
			>
				<!-- 通用头部 -->
				<header class="m-common-header">
					<ul class="_ul m-jyb-header m-header-logo_input flex-box">
						<!-- <li class="_li m-header-logo flex-box mr20">
							<navigator hover-class="none" open-type="reLaunch" url="/pages/index/index" class="_a">
								<img class="_img" src="https://static.jiaoyubao.cn/m/images/logo.svg" alt="" />
							</navigator>
						</li> -->
						<!-- <li :class="['_li', 'm-header-input', 'flex-box', 'flex-1', !isSearchPage ? 'mr20' : 'mr4']"> -->
						<li class="_li m-header-input flex-box flex-1 mr4 skeleton-radius" v-show="showSkeleton" style="width: 686rpx; background: #f5f6f7;"></li>
						<li class="_li m-header-input flex-box flex-1 mr4" v-show="!showSkeleton">
							<block v-if="!isSearchPage">
								<span class="_span m-common-icon icon_search_linear"></span>
								<navigator url="'/packageA/search/index" hover-class="none" class="_a m-header-input-txt">请输入机构或课程名称</navigator>
							</block>
							<block v-else>
								<navigator @click="clickSearch" hover-class="none" class="flex-box flex-1">
									<!-- <input class="m_header_input flex-1" v-model="searchword" type="search" disabled="true" placeholder="请输入机构或课程名称" name="" @confirm="searchWordConfirm" confirm-type="search"> -->
									<view v-if="searchword != ''" class="_input m_header_input flex-1">{{ searchword }}</view>
									<view v-else class="_input m_header_input flex-1" style="text-align: center;">
										<span class="_span m-common-icon icon_search_linear" style="vertical-align: middle;"></span>
										<span class="_a m-header-input-txt">请输入机构或课程名称</span>
									</view>
									<view class="m-header-input-close flex-box" @click.stop="clearInput" v-show="searchword">
										<navigator
											open-type="navigateBack"
											url="'/packageA/search/index?word="
											class="_span m-common-icon icon_cross_block m_header_input_close"
										></navigator>
									</view>
								</navigator>
							</block>
						</li>
					</ul>
				</header>
				<div :class="['m-list_index-tab-outer', scrollTop108 ? 'fixed-outer' : '']">
					<div class="m-list_index-tab skeleton-rect" v-show="showSkeleton" style="width: 686rpx; background: #f5f6f7;"></div>
					<div class="m-list_index-tab" v-show="!showSkeleton">
						<div class="m-tab-top border-bottom-1px flex-box ">
							<div class="m-tab-top-line"></div>
							<ul class="_ul m-tab-top-right flex-1 flex-box">
								<li
									:class="[
										'_li',
										'flex-1',
										'flex-box',
										'm-list-change-business',
										areaBusinessShow || cityBusinessIdx !== -1 ? 'active' : '',
										areaBusinessShow ? 'icontrans' : ''
									]"
									data-class="business"
									@click="clickTab"
								>
									<text class="_a ellipsis-1">{{ businessname }}</text>
									<span class="m-common-icon icon_down_solid"></span>
								</li>
								<li
									:class="[
										'_li',
										'flex-1',
										'flex-box',
										'm-list-change-category',
										categorySortShow || classname !== '类别' ? 'active' : '',
										categorySortShow ? 'icontrans' : ''
									]"
									data-class="category"
									@click="clickTab"
								>
									<text class="_a ellipsis-1" href="javascript:;">{{ classname }}</text>
									<span class="m-common-icon icon_down_solid"></span>
								</li>
								<li
									:class="['_li', 'flex-1', 'flex-box', 'm-list-change-sort', sortShow || sortIdx == 1 ? 'active' : '', sortShow ? 'icontrans' : '']"
									data-class="sort"
									@click="clickTab"
								>
									<text class="_a ellipsis-1" href="javascript:;">{{ sortname }}</text>
									<span class="m-common-icon icon_down_solid"></span>
								</li>
								<li
									:class="['_li', 'flex-1', 'flex-box', 'm-list-change-sift', siftShow || selectsift ? 'active' : '', siftShow ? 'icontrans' : '']"
									data-class="sift"
									@click="clickTab"
								>
									<text class="_a ellipsis-1" href="javascript:;">筛选</text>
									<span class="m-common-icon icon_down_solid"></span>
								</li>
							</ul>
						</div>
						<div class="m-tab-bottom" v-show="!(areaBusinessShow || categorySortShow)">
							<ul class="_ul">
								<li
									class="_li"
									v-for="(item, index) in categoryArr[categoryIdx[0]].child[categoryIdx[1]].child"
									:key="index"
									:data-idx="index"
									:data-ename="item.url"
									:data-name="item.name"
									@click="parChooseCategory"
								>
									<a hover-class="none" class="_a" href="javascript:;">{{ item.name }}</a>
								</li>
							</ul>
						</div>

						<!-- 商圈弹层 -->
						<area-business
							:area="cityArea"
							:business="businessToChild"
							:areaIdx="cityAreaIdx"
							:businessIdx="cityBusinessIdx"
							@chooseArea="chooseCityArea"
							@chooseBusiness="chooseCityBusiness"
							v-if="areaBusinessShow"
						></area-business>

						<!-- 课程类别弹层 -->
						<category-sort :category="categoryArr" :idx="categoryIdx" v-if="categorySortShow" @clickCategory="chooseCategory"></category-sort>

						<!-- 排序弹层 -->
						<div
							v-if="sortShow"
							:class="['m-list_pop', position == 'list-pop-sort' ? 'm-list_pop-sort' : position == 'location-select' ? 'jyb-location-select flex-box' : '']"
							style="z-index: 99999;"
						>
							<div class="m-list_pop-inner flex-box">
								<ul class="m-category-left" style="width: 100%;margin-left: 20rpx">
									<li :class="sortIdx == 0 ? 'active' : ''" data-name="智能排序" data-ename="znsort" data-idx="0" data-type="1" @click="changeSortType">
										<text class="_a" href="javascript:;">智能排序</text>
									</li>
									<block v-if="lat !=''">
										<li :class="sortIdx == 1 ? 'active' : ''" data-name="距离优先" data-ename="jlsort" data-idx="1" data-type="2" @click="changeSortType">
											<text class="_a" href="javascript:;">距离优先</text>
										</li>
									</block>
									<block v-else>
										<button @click="addressAgain" :class="sortIdx == 1 ? 'active' : ''" data-name="距离优先" data-ename="jlsort" data-idx="1" data-type="2">
											<text class="_a" href="javascript:;">距离优先</text>
										</button> 
									</block>
								</ul>
							</div>
						</div>

						<!-- 筛选弹层 -->
						<agency-sift v-if="siftShow" :sift="siftList" @clearSift="clearSiftItem" @chooseSiftDone="chooseSiftItem"></agency-sift>
					</div>
				</div>
				<!-- 附近机构 -->
				<!-- <div class="m-list_index-nearby mt10" v-if="nearAgencyStr != '' && isNearbyShow && agencyList.length > 0 && !isSearchPage && listSortType != 1">
					<text href="javascript:;" class="_a m-list_index-nearby-close m-common-icon icon_cross_no_bg" @click="closeNearBy"></text>
					<div class="m-nearby-title flex-box" @click="clickNearModel">
						<span class="_span">身边1km内的机构</span>
						<span class="m-common-icon icon_right_linear"></span>
					</div>
					<div class="m-nearby-agency ellipsis-1" @click="clickNearModel">{{ tools.UnicodeToAscii(nearAgencyStr) }}</div>
					<view href="javascript:;" class="_a m-nearby-modify flex-box" @click="locationSelectShow">
						<span class="m-common-icon icon_modify_linear"></span>
						{{ address }}
					</view>
				</div>
 -->
				<!-- list -->
				<!-- 骨架屏开始 -->
				<div class="" v-show="showNewSkeleton">
					<div class="m-list_index-list newskeleton">
						<navigator hover-class="none" class="_a m-list-item m-item-multi-pic">
							<div class="m-item-info flex-box">
								<div class="m-item-logo flex-box " style="background: #f5f6f7;border: none;"><img class="_img" mode="widthFix" /></div>
								<div class="flex-1">
									<span class="_span m-item-title ellipsis-1 " style="background: #f5f6f7;height: 26px;"></span>
									<div class="m-item-msg flex-box ellipsis-1 " style="background: #f5f6f7;height: 15px;"></div>
								</div>
							</div>
							<ul class="m-item-feature clearfloat " style="background: #f5f6f7;"></ul>
							<ul class="m-item-photos flex-box clearfloat " style="background: #f5f6f7;">
								<li class="_li"><img class="_img" mode="widthFix" /></li>
								<li class="_li"><img class="_img" mode="widthFix" /></li>
								<li class="_li"><img class="_img" mode="widthFix" /></li>
							</ul>
							<div class="m-item-class flex-box" style="background: #f5f6f7;height: 20px;"></div>
						</navigator>
					</div>
					<div class="m-list_index-list newskeleton">
						<navigator hover-class="none" class="_a m-list-item m-item-multi-pic">
							<div class="m-item-info flex-box">
								<div class="m-item-logo flex-box " style="background: #f5f6f7;border: none;"><img class="_img" mode="widthFix" /></div>
								<div class="flex-1">
									<span class="_span m-item-title ellipsis-1 " style="background: #f5f6f7;height: 26px;"></span>
									<div class="m-item-msg flex-box ellipsis-1 " style="background: #f5f6f7;height: 15px;"></div>
								</div>
							</div>
							<ul class="m-item-feature clearfloat " style="background: #f5f6f7;"></ul>
							<ul class="m-item-photos flex-box clearfloat " style="background: #f5f6f7;">
								<li class="_li"><img class="_img" mode="widthFix" /></li>
								<li class="_li"><img class="_img" mode="widthFix" /></li>
								<li class="_li"><img class="_img" mode="widthFix" /></li>
							</ul>
							<div class="m-item-class flex-box" style="background: #f5f6f7;height: 20px;"></div>
						</navigator>
					</div>
					<div class="m-list_index-list newskeleton">
						<navigator hover-class="none" class="_a m-list-item m-item-multi-pic">
							<div class="m-item-info flex-box">
								<div class="m-item-logo flex-box " style="background: #f5f6f7;border: none;"><img class="_img" mode="widthFix" /></div>
								<div class="flex-1">
									<span class="_span m-item-title ellipsis-1 " style="background: #f5f6f7;height: 26px;"></span>
									<div class="m-item-msg flex-box ellipsis-1 " style="background: #f5f6f7;height: 15px;"></div>
								</div>
							</div>
							<ul class="m-item-feature clearfloat " style="background: #f5f6f7;"></ul>
							<ul class="m-item-photos flex-box clearfloat " style="background: #f5f6f7;">
								<li class="_li"><img class="_img" mode="widthFix" /></li>
								<li class="_li"><img class="_img" mode="widthFix" /></li>
								<li class="_li"><img class="_img" mode="widthFix" /></li>
							</ul>
							<div class="m-item-class flex-box" style="background: #f5f6f7;height: 20px;"></div>
						</navigator>
					</div>
				</div>
				<div class="m-list_index-list" v-show="showSkeleton" style="background: rgba(0, 0, 0, 0);">
					<navigator hover-class="none" class="_a m-list-item m-item-multi-pic">
						<div class="m-item-info flex-box">
							<div class="m-item-logo flex-box skeleton-radius" style="background: #f5f6f7;border: none;"><img class="_img" mode="widthFix" /></div>
							<div class="flex-1">
								<span class="_span m-item-title ellipsis-1 skeleton-rect" style="background: #f5f6f7;height: 26px;"></span>
								<div class="m-item-msg flex-box ellipsis-1 skeleton-rect" style="background: #f5f6f7;height: 15px;"></div>
							</div>
						</div>
						<ul class="m-item-feature clearfloat skeleton-rect" style="background: #f5f6f7;"></ul>
						<ul class="m-item-photos flex-box clearfloat skeleton-rect" style="background: #f5f6f7;">
							<li class="_li"><img class="_img" mode="widthFix" /></li>
							<li class="_li"><img class="_img" mode="widthFix" /></li>
							<li class="_li"><img class="_img" mode="widthFix" /></li>
						</ul>
						<div class="m-item-class flex-box skeleton-rect" style="background: #f5f6f7;height: 20px;"></div>
					</navigator>
				</div>
				<div class="m-list_index-list" v-show="showSkeleton" style="background: rgba(0, 0, 0, 0);">
					<navigator hover-class="none" class="_a m-list-item m-item-multi-pic">
						<div class="m-item-info flex-box">
							<div class="m-item-logo flex-box skeleton-radius" style="background: #f5f6f7;border: none;"><img class="_img" mode="widthFix" /></div>
							<div class="flex-1">
								<span class="_span m-item-title ellipsis-1 skeleton-rect" style="background: #f5f6f7;height: 26px;"></span>
								<div class="m-item-msg flex-box ellipsis-1 skeleton-rect" style="background: #f5f6f7;height: 15px;"></div>
							</div>
						</div>
						<ul class="m-item-feature clearfloat skeleton-rect" style="background: #f5f6f7;"></ul>
						<ul class="m-item-photos flex-box clearfloat skeleton-rect" style="background: #f5f6f7;">
							<li class="_li"><img class="_img" mode="widthFix" /></li>
							<li class="_li"><img class="_img" mode="widthFix" /></li>
							<li class="_li"><img class="_img" mode="widthFix" /></li>
						</ul>
						<div class="m-item-class flex-box skeleton-rect" style="background: #f5f6f7;height: 20px;"></div>
					</navigator>
				</div>
				<div class="m-list_index-list" v-show="showSkeleton" style="background: rgba(0, 0, 0, 0);">
					<navigator hover-class="none" class="_a m-list-item m-item-multi-pic">
						<div class="m-item-info flex-box">
							<div class="m-item-logo flex-box skeleton-radius" style="background: #f5f6f7;border: none;"><img class="_img" mode="widthFix" /></div>
							<div class="flex-1">
								<span class="_span m-item-title ellipsis-1 skeleton-rect" style="background: #f5f6f7;height: 26px;"></span>
								<div class="m-item-msg flex-box ellipsis-1 skeleton-rect" style="background: #f5f6f7;height: 15px;"></div>
							</div>
						</div>
						<ul class="m-item-feature clearfloat skeleton-rect" style="background: #f5f6f7;"></ul>
						<ul class="m-item-photos flex-box clearfloat skeleton-rect" style="background: #f5f6f7;">
							<li class="_li"><img class="_img" mode="widthFix" /></li>
							<li class="_li"><img class="_img" mode="widthFix" /></li>
							<li class="_li"><img class="_img" mode="widthFix" /></li>
						</ul>
						<div class="m-item-class flex-box skeleton-rect" style="background: #f5f6f7;height: 20px;"></div>
					</navigator>
				</div>
				<!-- 骨架屏结束 -->

				<div class="m-list_index-list" v-if="agencyList.length > 0" v-show="!showNewSkeleton">
					<!--
						模版
					-->
					<div class="m-list-item-out" v-for="(item, index) in agencyList" :key="index">
						<!-- 多图 -->
						<block v-if="item.photo_info == null || item.photo_info.length == 0 || item.photo_info.length >= 3">
							<navigator
								hover-class="none"
								class="_a m-list-item m-item-multi-pic"
								:url="'/pages/agencyindex/index?agency=' + item.comename"
								@click="clickItem"
								:id="index"
							>
								<div class="m-item-info flex-box">
									<div class="m-item-logo flex-box"><img class="_img" :src="'https:' + item.picurl" alt="" mode="widthFix" /></div>
									<div class="flex-1">
										<span class="_span m-item-title ellipsis-1 ">
											<span>{{ item.comname }}</span>
											<block v-if="item.activityIcon">
												<div class="active-tips">
													<block v-for="(actIcon,actIconindex) in item.activityIcon" :key="actIconindex">
														<span class="quan" v-if="actIcon == '012001001002'">券</span>
														<span class="zhe" v-if="actIcon == '012001001001'">折</span>
														<span class="zeng" v-if="actIcon == '012001002001'">赠</span>
														<span class="mian" v-if="actIcon == '012001002003'">免</span>
													</block>
												</div>
											</block>
										</span>
										<div class="m-item-msg flex-box ellipsis-1 ">
											<span class="_span m-item-msg-score">{{ item.star }}分</span>
											<span class="_span m-item-msg-zz flex-1 ellipsis-1">
												<i class="_i" v-if="item.num_pj">{{ item.num_pj }}条评价</i>
												<i class="_i" v-if="item.num_gz">{{ item.num_gz }}人咨询</i>
											</span>
											<span class="_span m-item-msg-distance" v-if="item.minlength > 0">{{ item.minlength }}km</span>
										</div>
									</div>
								</div>
								<block v-if="item.labelinfo">
									<block v-if="Object.prototype.toString.call(item.labelinfo) === '[object Array]'">
										<!-- 特色 -->
										<ul class="m-item-feature clearfloat skeleton-rect" v-if="item.labelinfo[0].labelname">
											<block v-for="(label, ii) in item.labelinfo" :key="ii">
												<li class="_li" v-if="ii < 5">{{ label.labelname }}</li>
											</block>
											<!-- <li class="_li" v-for="(label, ii) in item.labelinfo" :key="ii">{{ label.labelname }}</li> -->
											<li class="_li" v-if="item.labelinfo.length < 3">免费试听</li>
											<li class="_li" v-if="item.labelinfo.length == 1">可预约上门</li>
										</ul>
										<!-- 校区 -->
										<!-- <div class="m-item-school ellipsis-1" v-else> -->
										<div class="m-item-school ellipsis-1" v-else-if="item.labelinfo[0].pointname">
											<view v-if="item.labelinfo.length > 1">
												校区({{ item.labelinfo.length }})：
												<block v-for="(sitem, sidx) in item.labelinfo" :key="sidx">{{ sidx == 0 ? sitem.pointname : '、' + sitem.pointname }}</block>
											</view>
											<view v-else>
												校区：
												<block>{{ item.labelinfo[0].pointaddress }}</block>
											</view>
										</div>
									</block>
									<!-- 评价 -->
									<div class="m-item-evaluation flex-box" v-else>
										<img class="_img" src="https://static.jiaoyubao.cn/images/mobile/tag-yinhao.png" alt="" />
										<span class="_span flex-1 ellipsis-1">{{ item.labelinfo }}</span>
									</div>
								</block>

								<ul class="m-item-photos flex-box clearfloat" v-if="item.photo_info && item.photo_info.length > 0">
									<!-- <li class="_li swiper-slide-video" v-if="item.video_info && item.video_info.length > 0" v-for="(vid, eee) in item.photo_info" :key="iii">
										<img class="_img" :src="'https:' + vid.snapshoturl" />
										<i class="video-pause-btn"></i>
									</li> -->
									<li class="_li" v-for="(pic, iii) in item.photo_info" :key="iii"><img class="_img" :src="'https:' + pic.imageurl" alt="" mode="widthFix" /></li>
								</ul>
								<div class="m-item-class flex-box" v-if="item.course_info && item.course_info.length > 0">
									<i class="_i">课</i>
									<span class="_span flex-1 ellipsis-1">
										<block v-for="(citem, cidx) in item.course_info" :key="cidx">
											{{ cidx == 0 ? tools.UnicodeToAscii(citem.class_name) : '，' + tools.UnicodeToAscii(citem.class_name) }}
										</block>
									</span>
								</div>
								<div class="m-item-activity flex-box" v-if="item.active_info">
									<i class="_i">惠</i>
									<span class="_span flex-1 ellipsis-1">{{ item.active_info }}</span>
								</div>
								<ul :class="['m-active-box border-top-1',{'m-active-box-overflow':item.newhd}]" v-if="item.activity">
									<block v-for="(act,actindex) in item.activity" :key="actindex">
										<!-- 现金优惠 -->
										<li v-if="act.activitycode == '012001001002'">
											<span><text>{{act.saleprice}}</text>元</span>
											<p>{{act.activityname}}</p>
										</li>
										<!-- 限时折扣 -->
										<li v-else-if="act.activitycode == '012001001001'">
											<span><text>{{act.discount}}</text>折</span>
											<p>{{act.activityname}}</p>
										</li>
										<!-- 赠送活动 -->
										<li v-else-if="act.activitycode == '012001002001'">
											<span>赠送</span>
											<p>{{act.activityname}}</p>
										</li>
										<!-- 其他活动 -->
										<li v-else-if="act.activitycode == '012001002003'">
											<span>0元</span>
											<p>{{act.activityname}}</p>
										</li>
									</block>
								</ul>
							</navigator>
							<div class="upDown" @click="upDown(item,index)" v-if="item.activity.length > 3"><text :class="['m-common-icon',item.newhd?'icon_bottom_no_bg':'icon_up_no_bg']" ></text></div>
						</block>
						<!-- 单图 -->
						<block v-else>
							<navigator
								hover-class="none"
								:url="'/pages/agencyindex/index?agency=' + item.comename"
								class="_a m-list-item m-item-single-pic skeleton-rect"
							>
								<div class="m-item-single-top flex-box">
									<div class="m-item-single-left flex-1">
										<div class="m-item-info flex-box">
											<div class="m-item-logo flex-box"><img class="_img" :src="'https:' + item.picurl" alt="" mode="widthFix" /></div>
											<div class="flex-1">
												<span class="_span m-item-title ellipsis-1">
													<span>{{ item.comname }}</span>
													<block v-if="item.activityIcon">
														<div class="active-tips">
															<block v-for="(actIcon,actIconindex) in item.activityIcon" :key="actIconindex">
																<span class="quan" v-if="actIcon == '012001001002'">券</span>
																<span class="zhe" v-if="actIcon == '012001001001'">折</span>
																<span class="zeng" v-if="actIcon == '012001002001'">赠</span>
																<span class="mian" v-if="actIcon == '012001002003'">免</span>
															</block>
														</div>
													</block>
												</span>
												<div class="m-item-msg flex-box ellipsis-1">
													<span class="_span m-item-msg-score">{{ item.star }}分</span>
													<span class="_span m-item-msg-zz flex-1 ellipsis-1">
														<i class="_i" v-if="item.num_pj">{{ item.num_pj }}条评价</i>
														<i class="_i" v-if="item.num_gz">{{ item.num_gz }}人咨询</i>
													</span>
												</div>
											</div>
										</div>
										<div class="m-item-single-other flex-box" v-if="item.labelinfo">
											<block v-if="Object.prototype.toString.call(item.labelinfo) === '[object Array]'">
												<!-- 特色 -->
												<ul class="_ul m-item-feature clearfloat" v-if="item.labelinfo[0].labelname">
													<block v-for="(label, ii) in item.labelinfo" :key="ii">
														<li class="_li" v-if="ii < 5">{{ label.labelname }}</li>
													</block>
													<li class="_li" v-if="item.labelinfo.length < 3">免费试听</li>
													<li class="_li" v-if="item.labelinfo.length == 1">可预约上门</li>
												</ul>
												<!-- 校区 -->
												<!-- <div class="m-item-school flex-1 ellipsis-1" v-else> -->
												<div class="m-item-school flex-1 ellipsis-1" v-else-if="item.labelinfo[0].pointname">
													<view v-if="item.labelinfo.length > 1">
														校区({{ item.labelinfo.length }}):
														<block v-for="(sitem, sidx) in item.labelinfo" :key="sidx">{{ sidx == 0 ? sitem.pointname : '、' + sitem.pointname }}</block>
													</view>
													<view v-else>
														校区：
														<block>{{ item.labelinfo[0].pointaddress }}</block>
													</view>
												</div>
											</block>
											<!-- 评价 -->
											<div class="m-item-evaluation flex-1 ellipsis-1" v-else>{{ item.labelinfo }}</div>
										</div>
									</div>
									<div class="m-item-single-photo">
										<ul class="_ul m-item-photos flex-box clearfloat">
											<li class="_li"><img class="_img" :src="'https:' + item.photo_info[0].imageurl" alt="" mode="widthFix" /></li>
										</ul>
										<span class="_span m-item-msg-distance" v-if="item.minlength > 0">{{ item.minlength }}km</span>
									</div>
								</div>
								<div class="m-item-class flex-box" v-if="item.course_info && item.course_info.length > 0">
									<i class="_i">课</i>
									<span class="_span flex-1 ellipsis-1">
										<block v-for="(citem, cidx) in item.course_info" :key="cidx">
											{{ cidx == 0 ? tools.UnicodeToAscii(citem.class_name) : '，' + tools.UnicodeToAscii(citem.class_name) }}
										</block>
									</span>
								</div>
								<div class="m-item-activity flex-box" v-if="item.active_info">
									<i class="_i">惠</i>
									<span class="_span flex-1 ellipsis-1">{{ item.active_info }}</span>
								</div>
								<ul :class="['m-active-box border-top-1',{'m-active-box-overflow':item.newhd}]" v-if="item.activity">
									<block v-for="(act,actindex) in item.activity" :key="actindex">
										<!-- 现金优惠 -->
										<li v-if="act.activitycode == '012001001002'">
											<span><text>{{act.saleprice}}</text>元</span>
											<p>{{act.activityname}}</p>
										</li>
										<!-- 限时折扣 -->
										<li v-else-if="act.activitycode == '012001001001'">
											<span><text>{{act.discount}}</text>折</span>
											<p>{{act.activityname}}</p>
										</li>
										<!-- 赠送活动 -->
										<li v-else-if="act.activitycode == '012001002001'">
											<span>赠送</span>
											<p>{{act.activityname}}</p>
										</li>
										<!-- 其他活动 -->
										<li v-else-if="act.activitycode == '012001002003'">
											<span>0元</span>
											<p>{{act.activityname}}</p>
										</li>
									</block>
								</ul>
							</navigator>
							<div class="upDown" @click="upDown(item,index)" v-if="item.activity.length > 3"><text :class="['m-common-icon',item.newhd?'icon_bottom_no_bg':'icon_up_no_bg']" ></text></div>
						</block>
					</div>
				</div>

				<!-- pagination -->
				<div class="m-pagination flex-box" v-if="totalPage > 1">
					<text :class="['_a', pageidx == 1 ? 'disabled' : '']" @click="prePage">上一页</text>
					<span class="_span flex-1">{{ pageidx }}/{{ totalPage }}</span>
					<text :class="['_a', pageidx == totalPage ? 'disabled' : '']" @click="nextPage">下一页</text>
				</div>

				<!-- 404暂无数据 -->
				<block v-if="page404 && agencyList.length == 0">
					<div class="no-result-box">
						<div class="null-img-box "><img src="https://static.jiaoyubao.cn/images/uniapp/list-kzt-img@2x.png" /></div>
						<div class="null-con-box">
							<p class="null-content">
								<!-- 	在当前城市
								<span class="c333">{{ cityname }}站</span> -->
								没找到
								<span class="cFF2D55">“{{ classname == '类别' && searchword != '' ? searchword : classname + '培训' }}”</span>
								相关的机构/课程
							</p>
							<p class="null-text">让顾问帮您选课，找到相关课程及时告知您</p>
						</div>
						<div class="null-btn-box flex-box clearfloat">
							<!-- <navigator hover-class="none" url="/packageA/enter/index?enter=1" class="join-btn button ">机构入驻</navigator>
							<navigator hover-class="none" open-type="reLaunch" url="/pages/index/index" class="return-btn button">返回首页</navigator> -->
							<div @click="chooseClassPopShow" class="join-btn button">让顾问帮我选课</div>
						</div>
					</div>
				</block>

				<!-- footer -->
				<footer-ele></footer-ele>
			</main>
			<div class="m-common-mask" v-show="chooseClassPopIsShow" @click="handlerPopHide"></div>
			<div class="m-pop-choose-class" :animation="animationData">
				<div class="icon_down_thin_no_bg-out" @click="handlerPopHide"><span class="m-common-icon icon_bottom_no_bg"></span></div>
				<div class="xk-box">
					<h4>让顾问帮我选课</h4>
					<p>填写您的手机号，找到相关课程及时告知您</p>
					<view class="xk-class xk-input">
						<input type="text" v-model="recformClass" placeholder="请输入您的课程" placeholder-class="xk-placeholder"/>
					</view>
					<view class="xk-input">
						<input type="number" v-model="recformPhone" maxlength="11" placeholder="请输入您的手机号" placeholder-class="xk-placeholder"/>
					</view>
				</div>
				<view class="xk-btn-box">
					<view class="xk-btn" @click="recommendSubmit">免费帮我选课</view>
				</view>
			</div>
			<!-- menu-nav -->
			<menu-nav @menuPopHide="handlerMenuPopHide" v-if="menuPopShow"></menu-nav>
		</scroll-view>

		<online-talk></online-talk>
	</div>
</template>

<script>
import { recordTrackingMixin } from '../../common/js/mixins.js';
import areaBusiness from '../../component/area-business.vue';
import categorySort from '../../component/category-sort.vue';
import agencySift from '../../component/agency-sift.vue';
import dataArray from '../../common/data/data';
import quickSkeleton from '../../component/quick-skeleton.vue';
export default {
	mixins: [recordTrackingMixin],
	data() {
		return {
			// 位置相关
			cityename: '',
			cityname: '', // 城市中文
			lat: '',
			lng: '',
			areaename: '',
			areaname: '', // 行政区中文
			businessename: '',
			// businessname: '商圈', // 商圈中文
			businessname: '附近', // 商圈中文
			// 类别
			classename: '',
			classname: '类别', // 类别中文
			// 排序
			sortname: '智能排序',
			// 筛选
			siftname: '筛选',
			siftename: '',
			// 关键词
			searchword: '',
			isSearchPage: false,
			// 身边机构模块
			// address: '', // 详细地址
			isNearbyShow: true, // 附近模块是否显示
			// page
			pageidx: 1,
			// 机构列表数组
			companynum: 0,
			studentnum: 0,
			agencyListTDK: {
				title: '',
				keywords: '',
				description: ''
			}, // 页面TDK
			// 身边1km机构
			nearAgencyStr: '',
			nearlength: '3000m',
			totalPage: 0, // 分页总页数
			totalAgency: 0, // 机构总数
			agencyListCopy: [],
			agencyList: [],
			listSortType: 0,
			page404: false, // 是否有数据
			// sort pop
			sortShow: false,
			sortIdx: -1,
			// sift pop
			siftShow: false,
			selectsift: false,
			siftChooseList: [],
			siftList: [],
			siftListStr: '',
			siftAgencyList: [],
			// category-sort pop
			categorySortShow: false,
			categoryArr: [],
			categoryIdx: [0, 0, -1],
			categorySuccess: false,
			// area-business pop
			areaBusinessShow: false,

			cityArea: [],
			cityAreaIdx: 0,
			cityBusiness: [],
			businessToChild: [],
			cityBusinessIdx: -1,
			// show or hide
			menuPopShow: false,
			scrollTop108: false,
			showSkeleton: true,
			showNewSkeleton: false,
			localAgency: [],
			localDate: [],
			localClass: [],
			scanTime: 0,
			begainTime: '',
			endTime: '',
			thisClassItem: '',
			// 404帮选
			chooseClassPopIsShow: false,
			animationData: {},
			recformClass: '',
			recformPhone: '',
		};
	},
	components: {
		areaBusiness,
		categorySort,
		agencySift,
		quickSkeleton
	},

	onReady() {
		let _this = this;
		_this.$refs.skeleton.attachedAction();
		_this.$refs.skeleton.readyAction();
		_this.showSkeleton = true;
		_this.showNewSkeleton = false;
		setTimeout(function() {
			_this.showSkeleton = false;
		}, 3000);
		
		
	},
	onLoad(opts) {
		let _this = this;
		console.log(opts);
		if (opts && JSON.stringify(opts) != '{}') {
			_this.cityename = opts.city || '';
			_this.classename = opts.class || '';
			_this.searchword = opts.word ? decodeURIComponent(opts.word) : '';
			_this.isSearchPage = opts.word ? true : false;
			_this.businessname = '附近';
			dataArray.cityArr.map(item => {
				if (item.ename == _this.cityename) {
					_this.cityname = item.name;
				}
			});
		}
		_this.localClass = uni.getStorageSync('localClass') || [];

		_this.getQueryParam();
		_this.getSiftAbles();
		// 循环类别data,找到当前小类
		_this.categoryArr = dataArray.categoryGroup;
		_this.forEachCategory();
		_this.localDate = uni.getStorageSync('localDate') || [];
		_this.localAgency = uni.getStorageSync('localAgency') || [];

		_this.begainTime = new Date().getTime();
		_this.thisClassItem = {
			name: _this.classname,
			ename: _this.classename
		};
	},
	onShow() {
		let _this = this;
		let animation = uni.createAnimation({
			duration: 500,
			timingFunction: 'ease'
		});
		_this.animation = animation;
		// 微信分享到朋友圈功能
		// #ifdef MP-WEIXIN
		wx.showShareMenu({
			withShareTicket:true,
			menus:['shareAppMessage','shareTimeline']
		})
		// #endif
	},
	onUnload() {
		let _this = this;
		_this.stayTimer();
	},
	onHide() {},
	onShareAppMessage(res) {
		let _this = this;
		// console.log(res);
		// #ifdef MP-BAIDU
		let title,
			content = '';
		if (_this.classename == '' && _this.searchword != '') {
			title = `${_this.searchword}-教育宝搜索`;
		} else if (_this.businessename != '') {
			title = `【${_this.cityname}${_this.businessname}${_this.classname}培训|${_this.businessname}${_this.classname}培训机构】-教育宝手机站`;
			content = `教育宝为您查询到${_this.businessname}有${_this.totalAgency}家${_this.classname}培训机构，已成功帮助${_this.studentnum}位学员找到靠谱的${
				_this.classname
			}培训机构。${_this.businessname}${_this.classname}培训频道能够帮助您准确快速的找到满意的${_this.classname}培训机构，您也可以通过对比${
				_this.classname
			}培训学费价格，浏览${_this.classname}培训学员真实点评等手段选择优质可靠的${_this.businessname}${_this.classname}培训机构。`;
		} else {
			title = _this.agencyListTDK.title.replace(/{cityname}/gi, `${_this.cityname}`).replace(/{classshortname}/gi, `${_this.classname}`) + '手机站';
			content = _this.agencyListTDK.description
				.replace(/{cityname}/gi, `${_this.cityname}`)
				.replace(/{classshortname}/gi, `${_this.classname}`)
				.replace(/{companynum}/gi, `${_this.totalAgency}`)
				.replace(/{studentnum}/gi, `${_this.studentnum}`);
		}
		return {
			title: title,
			path: `/pages/agencylist/index?city=${_this.cityename}&class=${_this.classename}&word=${encodeURIComponent(_this.searchword)}`,
			imageUrl: 'https://static.jiaoyubao.cn/images/uniapp/share-logo.jpg',
			content: content
		};
		// #endif
	},
	created() {
		let _this = this;
	},
	methods: {
		upDown(item,index){
			let _this = this;
			item.newhd = !item.newhd;
			_this.$set(_this.agencyList, index, item);
		},
		agencyPageScroll: function(e) {
			let _this = this;
			if (e.detail.scrollTop > 54) {
				_this.scrollTop108 = true;
			} else {
				_this.scrollTop108 = false;
			}
		},
		clickSearch() {
			let _this = this;
			let pages = getCurrentPages(); // 获取页面栈
			let prevPage = pages.find(item => item.route == 'packageA/search/index');
			prevPage.$vm.searchText = _this.searchword;
			prevPage.$vm.isSearchListshow = true;
			uni.navigateBack({
				url: '/packageA/search/index'
			});
		},
		// 存储用户浏览的类别
		setLocalClassname() {
			let _this = this;
			let pages = getCurrentPages(); // 获取页面栈
			if (_this.localClass.length == 0) {
				_this.localClass.unshift(_this.thisClassItem);
			} else {
				let j = 0;
				// 判断是否是旧记录
				let isSameName = _this.localClass.find(item => item.name == _this.thisClassItem.name);
				if(!isSameName) {
					pages.map((item, index) => {
						if (item.route == 'pages/index/index') {
							item.$vm.isNewScan = true;
						}
					});
				}
				else {
					pages.map((item, index) => {
						if (item.route == 'pages/index/index') {
							item.$vm.isNewScan = false;
						}
					});
				}
				// 调整记录顺序，添加新记录
				while (j < _this.localClass.length) {
					if (_this.localClass[j].name == _this.thisClassItem.name) {
						_this.localClass.splice(j, 1);
						j++;
					} else {
						j++;
					}
				}
				_this.localClass.unshift(_this.thisClassItem);
				// 去掉“类别”
				_this.localClass.map((item, index) => {
					if (item.name == '类别') {
						_this.localClass.splice(index, 1);
					}
				});
			}
			// 最多显示5条
			if (_this.localClass.length > 5) {
				_this.localClass.splice(5);
			}
			// 传给首页
			uni.setStorageSync('localClass', _this.localClass);
			pages.map((item, index) => {
				if (item.route == 'pages/index/index') {
					item.$vm.localClass = uni.getStorageSync('localClass');
				}
			});
		},
		stayTimer() {
			let _this = this;
			_this.endTime = new Date().getTime();
			_this.scanTime = _this.endTime - _this.begainTime;
			if (_this.scanTime >= 30000) {
				_this.setLocalClassname();
			}
			// console.log('浏览时间：', _this.scanTime);
		},
		searchWordConfirm() {
			let _this = this;
			_this.showNewSkeleton = true;
			_this.getAgencyUnderCategory(true);
		},
		clearInput() {
			let _this = this;
			// console.log('clear');
			_this.searchword = '';
		},
		chooseClassPopShow() {
			let _this = this;
			_this.recformClass = _this.classname == '类别' && _this.searchword != '' ? _this.searchword + '课程' : _this.classname + '培训课程'
			_this.chooseClassPopIsShow = true;
			_this.animation.top('49vh').step();
			_this.animationData = _this.animation.export();
		},
		handlerPopHide() {
			let _this = this;
			_this.chooseClassPopIsShow = false;
			_this.animation.top('100vh').step();
			_this.animationData = _this.animation.export();
		},
		recommendSubmit() {
			let _this = this;
			if (!_this.recformClass) {
				_this.tools.toastShow('请输入课程名称');
				return;
			}
			else if (!_this.tools.checkPhoneNum(_this.recformPhone)) {
				_this.tools.toastShow('请正确输入手机号');
				return;
			}
			else {
				
			}
		},
		getQueryParam() {
			let _this = this;
			// 获取城市信息
			_this.location.getCurCityEname(_this, function(res) {
				console.log(res)
				if (_this.cityename !== res.data[0].cityename) {//不是当前城市
					_this.isNearbyShow = false;
					_this.businessname = _this.cityname;
					_this.nearlength = '';
					if(res.location){
						_this.lat = res.location.lat;
						_this.lng = res.location.lng;
					}
				}
				else if(!res.data[0]) {
					_this.nearlength = '';
					_this.tools.toastShow("请打开微信定位权限");
				}
				// 当前城市 
				else {
					if(res.location){ // 并且开启了定位
						_this.isNearbyShow = true;
						
						// Ray：[2020-07-06] 关键词搜索，去掉 3000m 限制
						if(_this.classename == '' && _this.searchword != ''){
							_this.businessname = `全${_this.cityname}` ;
							_this.nearlength = '';
						}else{
							_this.businessname = '附近';
							_this.nearlength = '3000m';
						}
						// 经纬度
						_this.lat = res.location.lat;
						_this.lng = res.location.lng;
					}else{  // 未开启定位
						_this.isNearbyShow = false;
						_this.businessname = res.data[0].cityname;
					}
				}
				_this.cityename = _this.cityename || res.data[0].cityename;
				_this.cityname = _this.cityname || res.data[0].cityname;
				

				_this.getAgencyUnderCategory(true); // list
				// _this.getCurAgencyNum();
				_this.getCityArea(); // 行政区
			});
		},
		// 设置智能排序/距离优先
		changeSortType(e) {
			let _this = this;
			console.log(e)
			if(e.currentTarget.dataset.type == 2 && !_this.isNearbyShow){
				uni.showModal({
				    title: '需要切换到当前城市？',
				    content: '定位服务将用于查询附近相关机构',
					cancelColor	:'#1a8cff',
					confirmText:'切换',
					confirmColor:'#1a8cff',
				    success: function (res) {
				        if (res.confirm) {
							_this.location.getGPSLocation(_this, function(res) {
								console.log(res);
								// // 当前城市
								_this.cityename = res.data[0].cityename;
								_this.cityname = res.data[0].cityname;
								_this.businessname = '附近';
								// // 经纬度
								_this.lat = res.location.lat;
								_this.lng = res.location.lng;
								//执行距离优先
								_this.listSortType = e.currentTarget.dataset.type;
								_this.sortname = e.currentTarget.dataset.name;
								_this.sortIdx = e.currentTarget.dataset.idx;
								_this.sortShow = false;
								_this.showNewSkeleton = true;
								// _this.getAgencyUnderCategory(true);
								_this.getQueryParam();
							});
				            
				        } else if (res.cancel) {
							if(_this.lat){
								//进入当前页面就开启授权了
							}else{
								//点击距离优先开启的定位
								_this.location.getGPSLocation(_this, function(res) {
									//经纬度
									_this.lat = res.location.lat;
									_this.lng = res.location.lng;
									//执行距离优先
									_this.listSortType = e.currentTarget.dataset.type;
									_this.sortname = e.currentTarget.dataset.name;
									_this.sortIdx = e.currentTarget.dataset.idx;
									_this.nearlength = '';//去掉3000m限制
									_this.sortShow = false;
									_this.showNewSkeleton = true;
									// _this.getAgencyUnderCategory(true);
									_this.getQueryParam();
								});
							}
						}
				    }
				});
			}else{
				_this.listSortType = e.currentTarget.dataset.type;
				_this.sortname = e.currentTarget.dataset.name;
				_this.sortIdx = e.currentTarget.dataset.idx;
				_this.sortShow = false;
				_this.showNewSkeleton = true;
				_this.getAgencyUnderCategory(true);
			}
			
		},
		//点击按钮跳到微信设置权限页面
		addressAgain(e){
			let _this = this;
			uni.openSetting({
			  success(res) {
			    console.log(res.authSetting)
				if (res.authSetting['scope.userLocation']) {
					//开启定位
					_this.changeSortType(e);
				}else{
					_this.sortShow = false;
					// 未开启定位
				}
			  }
			});
		},
		// 获取机构
		// getCurAgencyNum() {
		// 	let _this = this;
		// 	let ajaxUrl = _this.$api.GetCurStatistics.url + "&key={cityename:"+ _this.cityename +",classename:"+ _this.classename +"}";
		// 	_this.$ajax2(_this.$api.GetCurStatistics, ajaxUrl, '获取机构', function(res) {
		// 		_this.companynum = res.data.data[0].companynum;
		// 		_this.getCurCategoryOrder();
		// 	});
		// },
		// 获取订单
		getCurCategoryOrder() {
			let _this = this;
			// #ifdef MP-BAIDU
			// 是否来自搜索页
			if (_this.classename == '' && _this.searchword != '') {
				uni.setNavigationBarTitle({
					title: `${_this.searchword}-教育宝搜索`
				});
				return;
			}

			let ajaxUrl = _this.$api.GetCurCategoryOrder.url + '&key={cityename:' + _this.cityename + ',classename:' + _this.classename + '}';
			_this.$ajax2(_this.$api.GetCurCategoryOrder, ajaxUrl, '获取订单', function(res) {
				_this.studentnum = res.data.data[0].num_dd;
				_this.getAgencyListTDK(); // TDK
			});
			// #endif
		},
		// 获取TDK
		getAgencyListTDK() {
			let _this = this;
			let ajaxUrl = _this.$api.GetAgencyListTDK.url + '&key={cityid:100001010,classename:' + _this.classename + '}';
			_this.$ajax2(_this.$api.GetAgencyListTDK, ajaxUrl, '获取TDK', function(res) {
				if (res.data && res.data.data && res.data.data.length > 0) {
					_this.agencyListTDK = res.data.data[0];
					_this.setPageInfo();
				}
			});
		},
		// 设置页面基础信息
		setPageInfo() {
			let _this = this;
			let title, keywords, description;
			// 判断是否为商圈
			if (_this.businessename != '') {
				// 商圈下
				title = `【${_this.cityname}${_this.businessname}${_this.classname}培训|${_this.businessname}${_this.classname}培训机构】-教育宝手机站`;
				keywords = `${_this.cityname}${_this.businessname}${_this.classname}培训,${_this.businessname}${_this.classname}培训机构,${_this.businessname}${
					_this.classname
				}培训学校`;
				description = `教育宝为您查询到${_this.businessname}有${_this.totalAgency}家${_this.classname}培训机构，已成功帮助${_this.studentnum}位学员找到靠谱的${
					_this.classname
				}培训机构。${_this.businessname}${_this.classname}培训频道能够帮助您准确快速的找到满意的${_this.classname}培训机构，您也可以通过对比${
					_this.classname
				}培训学费价格，浏览${_this.classname}培训学员真实点评等手段选择优质可靠的${_this.businessname}${_this.classname}培训机构。`;
			} else {
				title = _this.agencyListTDK.title.replace(/{cityname}/gi, `${_this.cityname}`).replace(/{classshortname}/gi, `${_this.classname}`) + '手机站';
				keywords = _this.agencyListTDK.keywords.replace(/{cityname}/gi, `${_this.cityname}`).replace(/{classshortname}/gi, `${_this.classname}`);
				description = _this.agencyListTDK.description
					.replace(/{cityname}/gi, `${_this.cityname}`)
					.replace(/{classshortname}/gi, `${_this.classname}`)
					.replace(/{companynum}/gi, `${_this.totalAgency}`)
					.replace(/{studentnum}/gi, `${_this.studentnum}`);
			}

			// 设置当前页title
			uni.setNavigationBarTitle({
				title: title
			});

			// #ifdef MP-BAIDU
			swan.setPageInfo({
				title: title,
				keywords: keywords,
				description: description,
				image: ['https://static.jiaoyubao.cn/images/uniapp/banner.jpg'],
				success: function() {
					// console.log('setPageInfo success');
				},
				fail: function(err) {
					// console.log('setPageInfo fail', err);
				}
			});
			// #endif
		},
		setClassStrage(ename, name) {
			let _this = this;
			let classobj = {
				ename: ename,
				name: name
			};
			_this.tools.setStorage('classobj', classobj);
		},
		// category forEach
		forEachCategory() {
			let _this = this;
			let arri = _this.categoryArr;
			for (let i = 0, leni = arri.length; i < leni; i++) {
				let arrj = arri[i].child;
				for (let j = 0, lenj = arrj.length; j < lenj; j++) {
					let arrk = arrj[j].child;
					for (let k = 0, lenk = arrk.length; k < lenk; k++) {
						if (arrk[k].url == _this.classename) {
							_this.categoryIdx = [i, j, k];
							_this.classname = arrk[k].name == '全部' ? arrj[j].name : arrk[k].name;
							_this.setClassStrage(arrk[k].url, _this.classname);
							_this.categorySuccess = true;
							// console.log('完成');
							break;
						}
					}
					if (_this.categorySuccess) {
						break;
					}
				}
				if (_this.categorySuccess) {
					break;
				}
			}
		},
		// 商圈/类别/排序/筛选 点击
		clickTab(e) {
			let _this = this;
			let type = e.currentTarget.dataset.class;
			if (type == 'business') {
				_this.areaBusinessShow = !_this.areaBusinessShow;
				_this.categorySortShow = false;
				_this.sortShow = false;
				_this.siftShow = false;
			}
			if (type == 'category') {
				_this.categorySortShow = !_this.categorySortShow;
				_this.areaBusinessShow = false;
				_this.sortShow = false;
				_this.siftShow = false;
			}
			// if (type == 'sort' && _this.isNearbyShow) {
			// 	_this.sortShow = !_this.sortShow;
			// 	_this.areaBusinessShow = false;
			// 	_this.categorySortShow = false;
			// 	_this.siftShow = false;
			// }
			if (type == 'sort') {
				_this.sortShow = !_this.sortShow;
				_this.areaBusinessShow = false;
				_this.categorySortShow = false;
				_this.siftShow = false;
			}
			if (type == 'sift') {
				_this.siftShow = !_this.siftShow;
				_this.areaBusinessShow = false;
				_this.categorySortShow = false;
				_this.sortShow = false;
			}
		},
		// menu-nav
		handlerMenuPopHide() {
			let _this = this;
			_this.menuPopShow = false;
		},
		handlerMenuPopShow() {
			let _this = this;
			_this.menuPopShow = true;
		},
		// 筛选
		clearSiftItem(data) {
			let _this = this;
			_this.siftChooseList = [];
			_this.siftList.map((item, index) => {
				item.checked = false;
			});
			_this.siftShow = false;
			_this.selectsift = false;
			_this.siftListStr = '';
			_this.showNewSkeleton = true;
			_this.getAgencyUnderCategory(true);
		},
		chooseSiftItem(data) {
			let _this = this;
			_this.siftChooseList.length = 0;
			_this.siftChooseList = data;
			_this.siftShow = false;
			for (let i = 0; i < _this.siftList.length; i++) {
				_this.siftList[i].checked = false;
			}
			if (_this.siftChooseList.length == 0) {
				_this.selectsift = false;
			} else {
				_this.selectsift = true;
				_this.siftListStr = '';
				_this.siftChooseList.map((citem, cindex) => {
					_this.siftListStr += citem.emc + '|';
					_this.siftList.map((item, index) => {
						if (item.id == citem.id) {
							item.checked = citem.checked;
						}
					});
				});
			}
			_this.showNewSkeleton = true;
			_this.getAgencyUnderCategory(true);
		},
		// 获取筛选标签
		getSiftAbles() {
			let _this = this;
			_this.siftList = [];
			let ajaxUrl = _this.$api.GetClassAllLabels.url + '&key={cityename:' + _this.cityename + ',classename:' + _this.classename + '}';
			_this.$ajax2(_this.$api.GetClassAllLabels, ajaxUrl, '获取筛选标签', function(res) {
				for (let j = 0; j < res.data.data.length; j++) {
					if (res.data.data[j].comcount > 0) {
						_this.siftList.push(res.data.data[j]);
					}
				}
				for (let i = 0; i < _this.siftList.length; i++) {
					_this.siftList[i].checked = false;
				}
			});
		},
		// 类别选择
		chooseCategory(data) {
			let _this = this;
			switch (data.sort) {
				case '0':
					_this.$set(_this.categoryIdx, data.sort, data.idx);
					_this.$set(_this.categoryIdx, 1, 0);
					_this.$set(_this.categoryIdx, 2, -1);
					break;
				case '1':
					_this.$set(_this.categoryIdx, data.sort, data.idx);
					_this.$set(_this.categoryIdx, 2, -1);
					break;
				case '2':
					_this.$set(_this.categoryIdx, data.sort, data.idx);
					_this.classename = data.ename;
					_this.classname = data.name;
					_this.searchword = '';
					_this.setClassStrage(_this.classename, _this.classname);
					_this.getSiftAbles();
					_this.selectsift = false;
					_this.siftChooseList.length = 0;
					_this.siftListStr = '';
					_this.showNewSkeleton = true;
					_this.stayTimer();
					_this.scanTime = 0;
					_this.begainTime = 0;
					_this.endTime = 0;
					_this.getAgencyUnderCategory(true);
					_this.begainTime = new Date().getTime();
					// console.log(_this.begainTime);
					_this.categorySortShow = false;
					break;
				default:
					break;
			}
		},
		parChooseCategory(e) {
			let _this = this;
			_this.classename = e.currentTarget.dataset.ename;
			_this.classname = e.currentTarget.dataset.name;
			_this.setClassStrage(_this.classename, _this.classname);
			_this.showNewSkeleton = true;
			_this.getAgencyUnderCategory(true);
		},
		// 获取行政区
		getCityArea() {
			let _this = this;
			let ajaxUrl = _this.$api.GetCurArea.url + '&key={cityename:' + _this.cityename + ',classename:' + _this.classename + '}';
			_this.$ajax2(_this.$api.GetCurArea, ajaxUrl, '获取行政区', function(res) {
				if (res.data && res.data.data && res.data.data.length > 0) {
					_this.cityArea = res.data.data;
					_this.cityArea.unshift({
						name: '全部',
						ename: 'all'
					});
					if (_this.isNearbyShow) {
						_this.cityArea.unshift({
							name: '附近',
							ename: 'nearby'
						});
					}
					_this.areaename = res.data.data[0].ename;
					_this.getCityBusiness();
				}
			});
		},
		// 选择行政区
		chooseCityArea(data) {
			let _this = this;
			// console.log(data);
			_this.areaename = data.ename;
			_this.areaname = data.name;
			_this.cityAreaIdx = data.idx;
			// _this.cityBusiness = [];
			// _this.getCityBusiness();
			_this.cityBusinessIdx = -1;
			_this.getBusinessArr();
		},
		// 获取商圈
		getCityBusiness() {
			let _this = this;
			// let ajaxUrl = _this.$api.GetCurBusiness.url + "&key={cityename:"+ _this.cityename + ",areaename:" +  _this.areaename +",classename:"+ _this.classename +"}";
			let ajaxUrl = _this.$api.GetCurBusiness.url + '&key={cityename:' + _this.cityename + ',classename:' + _this.classename + '}';

			_this.$ajax2(_this.$api.GetCurBusiness, ajaxUrl, '获取商圈', function(res) {
				// console.log('商圈');
				// console.log(res);
				if (res.data && res.data.data) {
					if (res.data.data.length > 0) {
						_this.cityBusiness = res.data.data;
						_this.cityBusiness.unshift({
							name: '全部',
							ename: 'all'
						});
					} else {
						_this.cityBusiness.push({
							name: '全部',
							ename: 'all'
						});
					}
					_this.cityBusinessIdx = -1;
				}
				_this.getAreaUnderBusiness();
			});
		},
		// 获取行政区下的商圈信息
		getAreaUnderBusiness() {
			let _this = this;
			for (let i = _this.isNearbyShow ? 1 : 0, len = _this.cityArea.length; i < len; i++) {
				let items = _this.cityBusiness.filter(item => item.ename == 'all' || item.code.startsWith(_this.cityArea[i].code));
				_this.cityArea[i].child = items;
			}
			_this.getBusinessArr();
		},
		// 获取传递给子组件的商圈信息
		getBusinessArr() {
			let _this = this;
			if (_this.areaename == 'nearby') {
				_this.businessToChild = [
					{ name: '附近（智能范围）', ename: 'nearbychild' },
					{ name: '500米', ename: '500m' },
					{ name: '1000米', ename: '1000m' },
					{ name: '2000米', ename: '2000m' },
					{ name: '5000米', ename: '5000m' }
				];
			} else if (_this.areaename == 'all') {
				_this.businessToChild = _this.cityBusiness;
			} else {
				_this.businessToChild = _this.cityArea[_this.cityAreaIdx].child;
			}
		},
		// 选择商圈
		chooseCityBusiness(data) {
			let _this = this;
			// console.log(data);
			_this.cityBusinessIdx = data.idx;
			if (_this.areaename == 'all' && data.ename == 'all') {
				_this.nearlength = '';
				_this.businessename = '';
				_this.businessname = _this.cityname;
			} else if (data.ename == 'all') {
				_this.nearlength = '';
				_this.businessename = 'qu_' + _this.areaename;
				_this.businessname = _this.areaname;
			} else if (data.ename == 'nearbychild') {
				_this.nearlength = 3000;
				_this.businessname = '附近';
				_this.businessename = '';
				_this.cityBusinessIdx = -1;
			} else if (data.ename == '500m') {
				_this.nearlength = 500;
				_this.businessname = data.name;
				_this.businessename = '';
			} else if (data.ename == '1000m') {
				_this.nearlength = 1000;
				_this.businessname = data.name;
				_this.businessename = '';
			} else if (data.ename == '2000m') {
				_this.nearlength = 2000;
				_this.businessname = data.name;
				_this.businessename = '';
			} else if (data.ename == '5000m') {
				_this.nearlength = 5000;
				_this.businessname = data.name;
				_this.businessename = '';
			} else {
				_this.businessename = 'sq_' + data.ename;
				_this.businessname = data.name;
				_this.nearlength = '';
			}
			_this.areaBusinessShow = false;
			_this.showNewSkeleton = true;
			_this.getAgencyUnderCategory(true);
			// _this.getCurAgencyNum();
		},
		// 分页
		prePage() {
			let _this = this;
			// if (_this.pageidx == 1) {
			// 	return;
			// }
			_this.pageidx--;
			_this.showNewSkeleton = true;
			_this.getAgencyUnderCategory();
		},
		nextPage() {
			let _this = this;
			// if (_this.pageidx == _this.totalPage) {
			// 	return;
			// }
			_this.pageidx++;
			_this.showNewSkeleton = true;
			_this.getAgencyUnderCategory();
		},
		// 获取类别下的机构list
		// 20190823 先将列表展示，再请求详细列表，将页面控制的元素一并注释掉
		getAgencyUnderCategory(isReset) {
			// 20190910 需求去掉 先加载单列表
			// getAgencyListDetailUnderCategory() {
			let _this = this;
			let ajaxUrl;
			_this.page404 = false;

			if (isReset) {
				_this.pageidx = 1;
			}
			_this.nearAgencyStr = '';
			_this.agencyList = [];
			_this.totalPage = 0;
			// let orderType = _this.listSortType == 1 ? 1 : _this.listSortType == 2 ? 10 : '';
			// 20190814 接口处去掉coordinate(经纬度参数)[附近排序除外]，利于接口缓存处理
			// + ",coordinate:"+ _this.lat +"_"+ _this.lng
			// 20190814 将接口地址拆分组合
			// let commonUrl = '';
			// if (_this.siftChooseList.length > 0) {
			// 	commonUrl =
			// 		_this.$api.GetAgencyListUnderCategory.url +
			// 		'?key={cityename:' +
			// 		_this.cityename +
			// 		',page:' +
			// 		_this.pageidx +
			// 		',pagesize:10,featuredlabelename:' +
			// 		_this.siftListStr;
			// } else {
			let commonUrl = '';
			// }
			if(_this.nearlength != '') {
				commonUrl = _this.$api.GetAgencyListUnderCategory.url + '?key={cityename:' + _this.cityename + ',page:' + _this.pageidx + ',pagesize:10,coordinate:' + _this.lat + '_' + _this.lng + ',length:'+ _this.nearlength;
			}
			else {
				//  Ray：[2020-07-06] 不需要"附近"的概念时，去掉了 经纬度参数
				// commonUrl = _this.$api.GetAgencyListUnderCategory.url + '?key={cityename:' + _this.cityename + ',page:' + _this.pageidx + ',pagesize:10,coordinate:' + _this.lat + '_' + _this.lng;
				commonUrl = _this.$api.GetAgencyListUnderCategory.url + '?key={cityename:' + _this.cityename + ',page:' + _this.pageidx + ',pagesize:10';
			}
			
			if (_this.classename == '' && _this.searchword != '') {
				// 搜索关键词
				ajaxUrl = commonUrl + ',word:' + _this.searchword;
			} else {
				ajaxUrl = commonUrl + ',classename:' + _this.classename;
			}
			
			// 选择商圈状态
			if (_this.businessename !== '') {
				ajaxUrl += ',parameterename:' + _this.businessename;
			} 
			// else if (_this.nearlength !== '') {
			// 	ajaxUrl = ',coordinate:' + _this.lat + '_' + _this.lng + ',length:' + _this.nearlength;
			// }

			// 选择筛选
			if (_this.siftChooseList.length > 0) {
				ajaxUrl += ',featuredlabelename:' + _this.siftListStr;
			}
			// 选择距离优先
			if (_this.listSortType == 2) {
				ajaxUrl += ',order:1,coordinate:' + _this.lat + '_' + _this.lng + '}';
			} else {
				ajaxUrl += '}';
			}

			_this.$ajax2(
				_this.$api.GetAgencyListUnderCategory,
				ajaxUrl,
				'获取机构列表',
				function(res) {
					console.log(ajaxUrl);
					// console.log(_this.lat, _this.lng);
					_this.totalPage = res.data.maxpage;
					_this.totalAgency = res.data.rec;
					// #ifdef MP-BAIDU
					_this.getCurCategoryOrder();
					// #endif
					if (res.data && res.data.data && res.data.data.length > 0) {
						// 20190823 将数组赋值拿到数据求情成功之后
						// _this.agencyList = [];
						_this.agencyList = res.data.data;
						for (let i = 0; i < res.data.data.length; i++) {//遍历获取机构的活动
							// console.log(res.data.data[i].comid)
							_this.getAgencyActivities(res.data.data[i].comid);
							// _this.agencyList[i].newhd = true;
							_this.$set(_this.agencyList[i], 'newhd', true);
						}
						
						// console.log(_this.agencyList);
						// 筛选 labelinfo 字段，去掉系统预设 字符
						_this.agencyList.filter(item => {
							if (typeof item.labelinfo == 'string') {
								item.labelinfo = item.labelinfo.replace(/【.*?】/gi, '');
							}
							if (typeof item.comname == 'string') {
								item.comname = item.comname.replace(/&#183;/gi, '·');
							}
						});
						// _this.forEachAgencyList();

						// 未传经纬度参数时，计算距离
						if (_this.listSortType !== 2 && _this.isNearbyShow) {
							_this.getAgencyListDistance();
						}
						// 加入jyb统计
						_this.jybCodeStatistics();
					} else {
						// _this.tools.toastShow("暂无机构信息");
						// uni.redirectTo({
						// 	url: '/pages/404/index'
						// });
						_this.page404 = true;
					}
					if (_this.classname !== '类别') {
						_this.thisClassItem = {
							name: _this.classname,
							ename: _this.classename
						};
					}

					_this.showNewSkeleton = false;
				},
				true
			);
			// });
		},
		// 遍历机构list，获取距离信息
		getAgencyListDistance() {
			let _this = this;
			for (let i = 0, len = _this.agencyList.length; i < len; i++) {
				let ajaxUrl = _this.$api.getAgencyDistance.url + `&key={comename:${_this.agencyList[i].comename},coordinate:${_this.lat}_${_this.lng}}`;
				_this.$ajax2(_this.$api.getAgencyDistance, ajaxUrl, '获取机构距离', function(res) {
					// console.log(_this.agencyList[i].comname);
					if (res.data && res.data.data && res.data.data.length > 0) {
						let distanceNum = (res.data.data[0].minlength / 1000).toFixed(2);
						_this.$set(_this.agencyList[i], 'minlength', distanceNum);
					}
				});
			}
		},
		getAgencyActivities(comid) {
			let _this = this;
			let ajaxUrl = _this.$api.GetAgencyActivities.url + '&key={comid:' + comid + '}';
			_this.$ajax2(_this.$api.GetAgencyActivities, ajaxUrl, '获取机构活动', function(res) {
				// console.log(res.data.data)
				if(res.data.data.length>0){
					for (let i = 0; i < _this.agencyList.length; i++) {
						let activityClass = [];
						if(_this.agencyList[i].comid == res.data.data[0].comid){
							_this.agencyList[i].activity = res.data.data;
							for (let j = 0; j < res.data.data.length; j++) {
								if(activityClass.length > 0){
									let Oflag = true;
									for (let k = 0; k < activityClass.length; k++) {
										if(activityClass[k] == res.data.data[j].activitycode){
											Oflag = false;
										}
									}
									if(Oflag){
										activityClass.push(res.data.data[j].activitycode);
									}
								}else{
									activityClass.push(res.data.data[j].activitycode);
								}
							}
							_this.agencyList[i].activityIcon = activityClass;
						}
					}
				}
				// _this.activeList = res.data.data;
				// _this.activeListLength += _this.activeList.length;
				// _this.moreButtonshow = _this.activeListLength > 2 ? true : false;
				// _this.hideMoreActive = _this.activeListLength > 2 ? 'activity-maxheight m-popular-activity-list' : 'm-popular-activity-list';
			});
		},
		// jyb代码统计，日志收集
		jybCodeStatistics() {
			// console.log('================代码统计，日志收集====================');
			let _this = this;
			let nowDate = _this.tools.formatSecond(new Date());
			let urlStr, collections;
			if (_this.classename == '' && _this.searchword != '') {
				urlStr = 'pages/agencylist/index?word=' + _this.searchword;
			} else {
				urlStr = 'pages/agencylist/index?city=' + _this.cityename + '&class=' + _this.classename;
			}
			collections = _this.agencyList.map(item => 'jiaoyubaoxcx_show_jyb_' + item.comename);
			let param = {
				domain: 'xcx.jiaoyubao.cn',
				url: encodeURIComponent(urlStr),
				trackCollection: collections,
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
		// 存入足迹
		clickItem(e) {
			let _this = this;
			let agenindex = e.currentTarget.id;
			let viewsTimes = 1;
			// console.log(_this.agencyList[agenindex]);
			let comid = _this.agencyList[agenindex].comid;
			let day = new Date().getMonth() + 1 + '月' + new Date().getDate() + '日';
			let today = {
				day: new Date().getMonth() + 1 + '月' + new Date().getDate() + '日',
				selected: false
			};
			let thisItem = {
				logo: _this.agencyList[agenindex].picurl,
				comid: _this.agencyList[agenindex].comid,
				comname: _this.agencyList[agenindex].comname,
				comename: _this.agencyList[agenindex].comename,
				star: _this.agencyList[agenindex].star,
				views: viewsTimes,
				labelinfo: _this.agencyList[agenindex].labelinfo.slice(0, 3),
				date: today,
				cityename: _this.cityename,
				selected: false
			};
			if (_this.localDate.length == 0) {
				_this.localDate.unshift(today);
			} else {
				let j = 0;
				while (j < _this.localDate.length) {
					if (_this.localDate[j].day == day) {
						_this.localDate.splice(j, 1);
						j++;
					} else {
						j++;
					}
				}
				_this.localDate.unshift(today);
			}

			if (_this.localAgency.length == 0) {
				_this.localAgency.unshift(thisItem);
			} else {
				for (let i = 0; i < _this.localAgency.length; i++) {
					if (_this.localAgency[i].comid == comid) {
						_this.localAgency[i].views++;
						thisItem.views = _this.localAgency[i].views;
						if (_this.localAgency[i].date.day == day) {
							_this.localAgency.splice(i, 1);
						} else {
							thisItem.date = today;
						}
					}
				}
				_this.localAgency.unshift(thisItem);
			}
			// console.log(_this.localDate);
			// console.log(_this.localAgency);
			uni.setStorageSync('localDate', _this.localDate);
			uni.setStorageSync('localAgency', _this.localAgency);
		}
	}
};
</script>

<style lang="scss">
// 每个页面公共css
@import './index.scss';
.newskeleton {
	animation-duration: 2s;
	animation-name: skeletonLoad;
	animation-iteration-count: infinite;
}
@keyframes skeletonLoad {
	0% {
		opacity: 0.4;
	}
	50% {
		opacity: 1;
	}
	100% {
		opacity: 0.4;
	}
}
</style>
