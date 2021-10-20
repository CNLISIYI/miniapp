## 小程序-机构相关页面

```javascript
1. // 切换城市：接收参数，拿到切换后的城市的相关数据
			选择行政区或者商圈后的一些列操作(待定)
2. // 微信小程序页面title重置
3. // 搜索结构页：样式
4. // 机构列表头部去掉logo
5. // 验证码：首先通过图形验证码拦截，验证成功后，调发送短信接口
6. 骨架屏、在线聊天、
	// 导航滚动
	// 主页、课程、教师、真实评价、真实学费、校区、知识资料、资讯、关于我们
	// fee 查询是否存在
	// 无学费信息：真实学费(获取最低报价)
7. // 机构列表页：
		// 点击位置：右侧弹层(可选商圈、可定位)
		// 点击身边1km机构：同点击"附近"

7.
	// list 去掉主导航
	// 机构页 去掉返回主页
	// 机构里的页面去掉头部、
	// 机构里的页面修改tittle为机构简称
```


> 剩余页面：

### 请求代码
```javascript
// > 请求代码备份
getAgencyClasses(){
    let _this = this;
    let ajaxUrl = _this.$api.GetAgencyClasses.url + "&key={comename:" + _this.agencyEname + "}";
    _this.$ajax2(_this.$api.GetAgencyClasses, ajaxUrl, '获取课程列表', function(res) {
        if(res != 'error' && res.data.data && res.data.data.length > 0){ // 判断 res.data.XXX
            _this.classes = res.data.data;
        }else{
            _this.tools.toastShow("暂无数据");
        }
    }, true);
},
```

### 页面通用部分
```javascript
// 代码备份
> m-module-title
<navigator hover-class="none" :url="'/packageA/evaluation/index?city='+cityEname+'&agency='+agencyEname" class="_a m-module-title">学员评价(234)<img class="_img m-module-more fr" src="//static.jiaoyubao.cn/images/mobile/icon-rightarrow.svg" alt=""></navigator>

> mixins
<!-- header -->
<header-ele v-if="detailObj" :detailobj="detailObj" title="" :navtabitemshow="navTabItemShow"></header-ele>
<!-- header-nav -->
<header-nav :cityename="cityEname" :agencyename="agencyEname" rendertype="photo" :navtabitemshow="navTabItemShow"></header-nav>
<!-- header-tab -->
<header-tab rendertype="click-element" page="photo" :cityename="cityEname" :agencyename="agencyEname" total="''" :tabarr="photoSort" :active="sortId" @receiveFromChild="photoSortChange"></header-tab>

<!--
	底部模块
-->
<!-- 面包屑 -->
<bread-crumbs v-if="detailObj && classObj" :detailobj="detailObj" :classobj="classObj"></bread-crumbs>

<!-- 通用底部 -->
<view style="padding: 0 20px;">
	<footer-ele></footer-ele>
</view>

<!-- 拨打电话底部弹出层 -->
<tel-phone v-if="detailObj && telPhonePopShow" :detailobj="detailObj" @telPhonePopHide="telPhonePopHide"></tel-phone>

<!-- 预约/咨询 -->
<footer-agency @handlerTelPhone="makeTelPhone" :cityename="cityEname" :agencyename="agencyEname"></footer-agency>

import {footerMixin, navTabItemShowMixin} from '../../common/js/mixins.js'
mixins: [footerMixin, navTabItemShowMixin],

_this.getFooterMixin();
_this.getNavTabItemShowMixin();
```

### 其他
```javascript
// 经纬度备份
36.68278473_117.02496707
```

```javascript
// header-tab 组件 数据结构备份
_this.classesList.push({
	"id": "0000",
	"name": "其他",
	"count": otherItemArr.length,
	"children": otherItemArr,
})
```

### 搜索页面相关
```javascript
1.
搜索城市
	Request URL: https://m.jiaoyubao.cn/NationHandler.ashx?action=get_city&key=jinan&_=1571792302811
	Request Method: GET
	
选择城市 / 点击搜索,跳转页面：
	'/pages/index/index?city=jn'

2.
搜索机构和课程，联想
	Request URL: https://m.jiaoyubao.cn/NationHandler.ashx?action=getRelateWords&word=yingyu&cityname=jn
	Request Method: GET
热门搜索(数据是固定的)
	<ul>
	    <li>中小学辅导</li>
	    <li>少儿英语</li>
	    <li>雅思</li>
	    <li>托福</li>
	    <li>早教</li>
	    <li>会计证</li>
	    <li>建造师</li>
	    <li>化妆</li>
	    <li>韩语</li>
	    <li>日语</li>
	</ul>
历史搜索
	本地存储

点击联想列表 / 热门搜索 / 历史搜索 / 点击搜索，跳转页面：/pages/agencylist/index?city=jn&word=早教
```


### 2019.10.15 功能拆分
排行榜页面：https://m.jiaoyubao.cn/top/jn-shaoerbiaoyan/
机构活动页面：https://m.jiaoyubao.cn/jn/edu/smcmgzs/activity_320.html

```javascript
// * 最近校区 (单条 ✔)
//   * nearest-campus

* 模块title (带箭头 / 不带箭头)
> * module-title

* class-item (左图右文 ✔) 、 (上图下标题)
//  * class-item
> * 上图下标题

// * teacher-item (左图右文 ✔) 、 (上图下文 ✔)
//   * teacher-item

// * school-item (校区列表 - 两行文字) ✔
//   * school-item

* 评价 (课程详情) 、 (swiper-list)
> * pj-detail-item
//   * pj-swiper-item ✔
  
// * agency-item (左图右文 ✔)
//   * agency-item

// * 相关XX / 接下来要XX (文字 swiper) ✔
//   * next-related

// * 面包屑 ✔
//   * bread-crumbs

* 地图 map
> * map
```

### 待解决：
```javascript
> // 机构列表-搜索结果页(样式需处理)
> 组件内获取相关数据 -- (首先拿到所需参数)
// > 面包屑 -- 类别与H5页面不一致 ✔
> 查看大图
> header-tab 当前项显示在中间, 页面滚动吸顶效果
> // header-右侧菜单的显示数量
> // 老师详情：介绍和课程的锚点跳转
> 城市和当前位置的存储问题：新增"切换城市功能"后，cityname、cityename、citycode 值的获取途径
	index、category、agencylist、agencyindex
> 小程序 map marker label不显示 iphone

> gps 坐标系，gcj02坐标系
	'https://api.map.baidu.com/ag/coord/convert?from=0&to=4&x=' + x + '&y=' + y;
	//2=Google转百度经纬度
		BMap.Convertor.translate(ggPoint, 2, translateCallback);
	//0=gps转百度经纬度
		BMap.Convertor.translate(gpsPoint, 0, translateCallback);
```

## 待处理问题汇总
### 2019.08.12 问题汇总
```javascript
> 待处理
	// > 引导添加收藏
	// https://m.jiaoyubao.cn/									小程序	缺少切换城市页
	// https://m.jiaoyubao.cn/bj/								城市首页(需带有城市参数，现在只适用定位于当前城市)
															选择位置--切换城市-定位当前地址-选择区域、商圈
	https://m.jiaoyubao.cn/jn/zaojiao/?k=qu_dagy			机构列表(包含商圈的情况)
	https://m.jiaoyubao.cn/s/?city=jn&k=qu_dagy&word=托福	搜索-机构列表(包含商圈的情况)

	客服
	省略号重叠
	获取用户手机号
```

### 需求列表
```javascript
> 通用
	// > H5页面 与 小程序间 的跳转
	距离
> 首页
	帮我选课 人数(动态数字)

	// - 点击右上角城市，to 位置页面 *后置*

> 机构列表
	切换商圈之后，机构显示距离的问题

> - // 点击身边1km机构中的详细地址，出现右侧边栏(定位、商圈) *后置*
	// 机构简介
	基础信息配置
	待处理

// > - 类别 --（完成）
// > - 评价页面 --（完成）
// > 机构主页
	// - 预约试听  暂定 拨打电话功能 *后置* ✔ (2019.10.22)
// > 真实学费 
	// > 智能排序/附近

```

## 已解决
### 现存问题 已解决
```javascript
// > 获取列表页面，请求时去掉经纬度参数-->利于作缓存
// 	> 评价（好评、中评、差评顺序）
// 	> 评价页的取消
// 	> 404（H5页面显示的是暂无机构）
// 	> 优化：返回、易聊通、无数据情况的列表页
```

### 完成功能
```javascript
// > 通用
// 	> 定位
// 	> 底部导航-链接地址
// 	> 本地存储(city、cityename、类别、等)
// 	> loading 
// 	> 提示
// 	> 设置页面title
// 	> 分享--( 百度小程序 打开分享链接--进入分享的当前页面)
// > 首页
// 	> 图片懒加载
// 	> 历史记录限制 的问题 (返回pages/index/index时，页面全部出栈，只留下新的页面)
// 	> 搜索框
// 	> 点评奖金/投诉帮 链接地址 > 投诉帮 暂时链接到反馈页面
// 	> 基础信息配置
// 	> 帮我选课form -- 进行中
// > 类别
// 	> 输入框
// 	> 基础信息配置
// 	> 热门课程 图标
// > 机构列表
// 	> 输入框
// 	> logo
// 	> menu(教育宝平台功能直达)
// 	> 分页
// 	> /商圈/类别
// 	> 距离
// 	> 1km内的机构
// 	> 基础信息配置
// 	> 获取列表的接口
// > 机构主页
// 	> 最近校区
// 	> 校区模块(距离)
// 	> 输入框
// 	> index图标的指向地址
// 	> 面包屑
// 	> 基础信息配置
// 	> 评价(概括/等级)

// > 评价页面
// 	> 添加业务域名：https://ping.jiaoyubao.cn/m/
```

### 完成bug
```javascript
// >>> 页面细节(样式) bug
// > 通用
// 	> 颜色
// 	> 教育宝Logo 色值改为 新蓝色
// 	> 可点击元素 去掉 hover 效果
// 	> 去掉图片懒加载
// 	> 课程、相册、活动--小程序与H5显示不一致
// > 首页
// 	> 表单字体颜色、大小
// 	> 一对一选课弹层：动效、
// 	> 表单-选择城市：固定到当前城市
// > 类别页
// 	> 选中状态下：改为白色底儿
// 	> 热门推荐：改为固定值
// > 机构列表页
// 	> 类别导航：左右有白色边框
// 	> menu-nav 动画
// 	> 分页 报错404
// 	> 列表请求速度慢	
// > 机构主页
// 	> 课程模块显示增加判断条件 ( comtype == 0 的不显示 )
```

## 接口
### 接口列表
* [http://api.data.jiaoyubao.cn/](http://api.data.jiaoyubao.cn/)
> 接口

100208

100174
100175

100171
100407

100110
100140
100220
100224
100131

100001
100005
100006
100007
100015
100100
100120
100130
100160
100161
100163
100164
100165
100200
100201
100204
100402
100403
200020

### 接口案例
```javascript
// > form
https://m.jiaoyubao.cn/edu/comHandler.ashx
POST
action: audition
mobile: 13221312131
url: https://m.jiaoyubao.cn/jn/edu/jnjgz/
comid: 46613
classId: p383867
classname: 舞动童年
campus: 工业北路校区

https://m.jiaoyubao.cn/NationHandler.ashx
GET
action: "mipoint", 
city: jn,
edu: zaojiaotese, 
name: encodeURIComponent(name), 
phone: phone, 
url: encodeURIComponent(url), 
cookieid: '', // P_Tongji_SessionID, 
rand: Math.random()

https://m.jiaoyubao.cn/NationHandler.ashx?action=mipoint&city=jn&edu=zaojiaotese&name=%25E6%25B5%258B%25E8%25AF%25951&phone=13222222222&url=https%253A%252F%252Fm.jiaoyubao.cn%252Fxiaomi%252F&cookieid=&rand=0.7540794205165842
action: mipoint
city: jn
edu: zaojiaotese
name: %E6%B5%8B%E8%AF%951
phone: 13222222222
url: https%3A%2F%2Fm.jiaoyubao.cn%2Fxiaomi%2F
cookieid: 
rand: 0.7540794205165842
```

## 代码
### 代码备份
```javascript
<script type="text/javascript" src="https://res.wx.qq.com/open/js/jweixin-1.4.0.js"></script>
<script type="text/javascript" src="https://b.bdstatic.com/searchbox/icms/searchbox/js/swan-1.7.0.js"></script>
<script type="text/javascript" src="https://js.cdn.aliyun.dcloud.net.cn/dev/uni-app/uni.webview.1.5.1.js"></script>
<script>
    document.addEventListener('UniAppJSBridgeReady', function() {
        uni.getEnv(function(res) {
            // console.log('当前环境：' + JSON.stringify(res));
			if(res.miniprogram || res.smartprogram){
				// 小程序环境--返回机构主页重定向--返回首页btn、周边机构
				$(document).on("click", ".m-header-nav-home, .m-header-nav-title, .m-swiper-nav .swiper-slide:first, .m-nav-dropdown-list li:first a, .m-other-watching-list li a", function(e){
					e.preventDefault();  
					var hrefStr = $(this).prop("href"),
						comEname = hrefStr.split("edu/")[1].replace(/\//g,''),
						cityEname = $.cookie("cityename");
					uni.reLaunch({
						url: '/pages/agencyindex/index?city='+cityEname+'&agency='+comEname
					});
				})
				// 小程序环境--隐藏返回键
				$(".m-header-nav-back").hide();
				// 小程序环境--home图标修改margin值
				$(".m-header-nav-home").css("margin-left", "4px");

				// 小程序环境--面包屑
				$(document).on("click", ".m-list-breadnav li:eq(0) a, .m-list-breadnav li:eq(1) a", function(e){ // index
					e.preventDefault();  
					uni.reLaunch({
						url: '/pages/index/index'
					});
				}).on("click", ".m-list-breadnav li:eq(2) a, .m-next-recommend-list li a", function(e){ // 接下来要看、 agencylist
					e.preventDefault();  
					var hrefStr = $(this).prop("href"),
						hrefArr = hrefStr.split("/"),
						comEname = hrefArr[hrefArr.length - 2];
					uni.reLaunch({
						url: '/pages/agencylist/index?class='+comEname
					});
				})
				// 小程序环境--底部导航
				$(document).on("click", ".m-bottom-nav .liUser:first a", function(e){ // 关于我们
					e.preventDefault();  
					uni.navigateTo({
						url: '/packageA/about/index'
					});
				}).on("click", ".m-bottom-nav .liUser:eq(1) a", function(e){ // 联系我们
					e.preventDefault();  
					uni.navigateTo({
						url: '/packageA/contact/index'
					});
				}).on("click", ".m-fee-form-cancel-btn", function(e){ // 学费页面，form表单-取消
					e.preventDefault();  
					uni.navigateBack({
					    delta: 1
					});
				})
				// 小程序环境--打电话
				if (res.smartprogram){ // 百度小程序单独处理
					if (browser.versions.iPhone) {							
						$(document).on("click", ".m-jyb-call-btn", function(e) {
							e.preventDefault();  
							var $this = $(this),
								$tel = $("[name='span_tel_400']").text() || $("[name='span_tel_line']").text() || "4000290997";
								$tel += "," + window.EDU_COMPANY.callcode;
							swan.makePhoneCall({
								phoneNumber: $tel
							});
							location.href = 'javascript:;';
						})
					}else{
						$(document).on("click", ".m-fixed-phone-call > a", function(e){
							e.preventDefault();  
							var $tel = $(this).prop("href").split(":")[1];
							swan.makePhoneCall({
								phoneNumber: $tel
							});
							location.href = 'javascript:;';
						})
					}
				}
			}
	    });
	});
</script>


<script type="text/javascript" src="https://res.wx.qq.com/open/js/jweixin-1.4.0.js"></script>
<script type="text/javascript" src="https://b.bdstatic.com/searchbox/icms/searchbox/js/swan-1.7.0.js"></script>
<script type="text/javascript" src="https://js.cdn.aliyun.dcloud.net.cn/dev/uni-app/uni.webview.1.5.1.js"></script>
<script>
	document.addEventListener('UniAppJSBridgeReady', function() {
        uni.getEnv(function(res) {
            // console.log('当前环境：' + JSON.stringify(res));
			if(res.miniprogram || res.smartprogram){
				$(".arrowleft img").hide();
				 //热门搜索
				$(document).on("click", ".searitem ul li", function(e) {
					e.preventDefault();
					var k = $(this).text();
					var city = $("#hdncity").val();
					// window.location.href = "/s/?city=" + city + "&word=" + k;
					uni.reLaunch({
						url: '/pages/agencylist/index?word=' + encodeURIComponent(k) + '&city=' + city
					});
					window.location.href = "javascript:;";
				});
				//搜索
				$(document).on("click", ".sotxt", function(e) {
					e.preventDefault();
					var k = $("#k").val();
					if ($.trim(k) == "") {
						return;
					}
					var city = $("#hdncity").val();
					uni.reLaunch({
						url: '/pages/agencylist/index?word=' + encodeURIComponent(k) + '&city=' + city
					});
					window.location.href = "javascript:;";
				});
				//点击搜索记录
				$(document).on("click", ".historycon ul li", function(e) {
					e.preventDefault();
					if ($(this).hasClass("clearcon")) {
						return;
					}
					var city = $(this).attr("data-city");
					var k = $(this).find("span").text();
					uni.reLaunch({
						url: '/pages/agencylist/index?word=' + encodeURIComponent(k) + '&city=' + city
					});
					window.location.href = "javascript:;";
				});
				//联想词选择
				$(document).on("click", ".s_result ul li", function(e) {
					e.preventDefault();
					var k = $(this).text();
					if ($.trim(k) == "") {
						return;
					}
					var city = $("#hdncity").val();
					uni.reLaunch({
						url: '/pages/agencylist/index?word=' + encodeURIComponent(k) + '&city=' + city
					});
					window.location.href = "javascript:;";
				});
			}
	    });
	});
</script>
```