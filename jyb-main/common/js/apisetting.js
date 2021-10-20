// https://webapi.jiaoyubao.cn/api.php?op=getTransContent&action=100001&key={unionid:0}&timespan=1564641326
// const baseUrl = 'https://api14data.jiaoyubao.cn/';
const baseUrl = 'https://webapi.jiaoyubao.cn/api.php';
// const baseUrlApi14 = 'https://api14data.jiaoyubao.cn';
// const md5Str = '78881BF6-C3BF-4EF2-A4F6-D30351FB5103';
// const httpUrl = baseUrl + '?md5=' + md5Str + '&action=';
const httpUrl = baseUrl + '?action=';
// const httpUrl = 'http://api.data.jiaoyubao.cn/?action=';
const serviceModule = {
	// 获取省份信息
	GetProvinceList : {
		code: 100000,
		url:httpUrl + 100000,
		method: "GET"
	},
	
	// 获取城市列表
	// &key={}
	GetCityList : {
		code: 100001,
		url:httpUrl + 100001,
		method: "GET"
	},
	// 经纬度转换
	// ?from=0&to=4&x=' + x + '&y=' + y
	TranslatePoint : {
		url: "https://api.map.baidu.com/ag/coord/convert",
		method: "GET"
	},
	// 跟踪记录
	TrackRecord : {
		// url: "http://192.168.1.75:8090/useraccess/useraccess",
		url: "https://tongji.jiaoyubao.cn/useraccess/useraccess",
		method: "POST"
	},
	GetTel400 : {
		code: 100404,
		url:httpUrl + 100404,
		method: "GET"
	},
	// 根据经纬度 获取详情地址
	// &key={coordinate:' + y + '_' + x + '}
	GetDetailsLocation : {
		code: 200020,
		url:httpUrl + 200020,
		method: "GET"
	},
	// 获取行政区
	// key={cityename:jn,classename:xiaoxue}
	GetCurArea: {
	    code: 100006,
		url:httpUrl + 100006,
		method: "GET"
	},
	// 获取商圈
	// key={cityename:jn,areaename:shizhongqu,classename:xiaoxue}
	GetCurBusiness: {
	    code: 100007,
		url:httpUrl + 100007,
		method: "GET"
	},
	// 获取最新统计
	GetCurStatistics: {
        code: 100005,
		url:httpUrl + 100005,
		method: "GET"
    },
	// 获取热门课程
	GetHotCourse:{
		code: 100015,
		url:httpUrl + 100015,
		method: "GET"
	},
	// 获取类别下的机构
	// 加上参数 comename, 用于获取 "小伙伴都看了"
	// 加上参数 parameterename 查商圈下的机构 {cityename:jn,parameterename:sq_dagy,classename:xiaoxue}
	GetAgencyListUnderCategory:{
		code: 100100,
		// url:httpUrl + 100100,
		url:baseUrl,
		method: "GET"
	},
	GetAgencyUnderCategory:{
		code: 100100,
		url:httpUrl + 100100,
		method: "GET"
	},
	// 获取类别下的课程
	GetClassUnderCategory:{
		code: 100110,
		url:httpUrl + 100110,
		method: "GET"
	},
	// 获取类别下的特色标签
	GetClassAllLabels: {
		code: 100028,
		url:httpUrl + 100028,
		method: "GET"
	},
	// 获取机构相关行业信息 -- 相关推荐
	// 面包屑 comename -- 取级别为 2 的第一个值
	GetRelatedTuijian :{
		code: 100204,
		url:httpUrl + 100204,
		method: "GET"
	},
	// 获取机构详情信息 -- 获取主图
	GetAgencyDetail:{
		code: 100200,
		url:httpUrl + 100200,
		method: "GET"
	},
	// 根据机构ID获取机构英文名称
	GetAgencyEname:{
		code: 100203,
		url:httpUrl + 100203,
		method: "GET"
	},
	// 获取机构标签信息 -- 获取机构简介
	GetAgencyIntro:{
		code: 100201,
		url:httpUrl + 100201,
		method: "GET"
	},
	// 获取机构相册列表信息
	GetAgencyAlbum:{
		code: 100160,
		url:httpUrl + 100160,
		method: "GET"
	},
	// 获取机构课程列表信息
	GetAgencyClasses:{
		code: 100120,
		url:httpUrl + 100120,
		method: "GET"
	},
	// 获取机构的课程分组信息
	GetAgencyClassSort:{
		code: 100140,
		url:httpUrl + 100140,
		method: "GET"
	},
	// 获取机构课程详情信息
	GetAgencyClassDetail:{
		code: 100220,
		url:httpUrl + 100220,
		method: "GET"
	},
	// 获取机构科目/课程相关行业信息
	GetClassRelatedIndustry:{
		code: 100224,
		url:httpUrl + 100224,
		method: "GET"
	},
	// 获取机构老师列表信息
	GetAgencyTeachers:{
		code: 100161,
		url:httpUrl + 100161,
		method: "GET"
	},
	// 获取老师详情
	GetTeacherDetail:{
		code: 100171,
		url:httpUrl + 100171,
		method: "GET"
	},
	// 获取机构活动列表信息
	GetAgencyActivities:{
		code: 100163,
		url:httpUrl + 100163,
		method: "GET"
	},
	// 获取机构活动详情
	GetActivitiesDetail:{
		code: 100173,
		url:httpUrl + 100173,
		method: "GET"
	},
	// 获取机构资讯列表信息
	GetAgencyNews:{
		code: 100164,
		url:httpUrl + 100164,
		method: "GET"
	},
	// 获取机构资讯详情信息
	GetAgencyNewsDetail:{
		code: 100174,
		url:httpUrl + 100174,
		method: "GET"
	},
	// 获取机构资料列表信息
	GetAgencyDatas:{
		code: 100165,
		url:httpUrl + 100165,
		method: "GET"
	},
	// 获取机构资料详情信息
	GetAgencyDatasDetail:{
		code: 100175,
		url:httpUrl + 100175,
		method: "GET"
	},
	// 获取机构校区列表信息
	// 添加经纬度--返回距离信息
	// key={comename:jndzyy,coordinate:36.672758886901_117.08905532053}
	GetAgencySchools:{
		code: 100130,
		url:httpUrl + 100130,
		method: "GET"
	},
	// 获取机构距离
	getAgencyDistance : {
		code: 100131,
		url:httpUrl + 100131,
		method: "GET"
	},
	// 获取机构获取真实成交价信息 -- 学费
	GetAgencyFee:{
		code: 100403,
		url:httpUrl + 100403,
		method: "GET"
	},
	// 获取真实成交学费数据
	getTransactionData:{
		code: 100208,
		url:httpUrl + 100208,
		method: "GET"
	},
	// 获取真实评价列表
	GetAgencyEvaluation:{
		code: 100402,
		url:httpUrl + 100402,
		method: "GET"
	},
	// 获取评价分组
	GetEvaluationSort:{
		code: 100407,
		url:httpUrl + 100407,
		method: "GET"
	},
	// 获取城市-机构列表 TDK
	GetAgencyListTDK:{
		code: 100030,
		url:httpUrl + 100030,
		method: "GET"
	},
	// 获取城市类别的访问、咨询定单数据
	GetCurCategoryOrder:{
		code: 100019,
		url:httpUrl + 100019,
		method: "GET"
	},
	// 生成短信验证码并发送短信
	PostMessageCode:{
		code: 420050,
		url: httpUrl + 420050,
		method: "GET",
	},
	// 验证短信验证码
	GetCodeCheck: {
		code: 420051,
		url: httpUrl + 420051,
		method: "GET"
	},
	// 获取会员咨询订单
	GetUserOrder: {
		code: 101200,
		url: baseUrl + '?op=getTransContent&action=' + 101200,
		method: "GET"
	},
	// 获取/验证用户信息
	CheckUser: {
		code: 101001,
		url: baseUrl + '?op=getTransContent&action=' + 101001,
		method: "GET"
	},
	// 用户注册
	LogonUser: {
		code: 101005,
		url: baseUrl + '?op=getTransContent&action=' + 101005,
		method: "GET"
	},
	// 用户登陆
	SingupUser: {
		code: 101000,
		url: baseUrl + '?op=getTransContent&action=' + 101000,
		method: "GET"
	},
	// 添加计数
	SetActivity: {
		code: 400271,
		url: baseUrl + '?action=' + 400271,
		method: "GET"
	},
	//获取计数
	GETActivity: {
		code: 400272,
		url: baseUrl + '?action=' + 400272,
		method: "GET"
	},
}

const ApiSetting = { ...serviceModule }

export default ApiSetting