// 首页-大类
let categoryArr = [
	[{
			"name": "学前小学",
			"router": "/packageA/category/index?pid=0",
			"img": "https://static.jiaoyubao.cn/images/uniapp/assets/jg-hp-xqxx-icon.png"
		},
		{
			"name": "初中高中",
			"router": "/packageA/category/index?pid=1",
			"img": "https://static.jiaoyubao.cn/images/uniapp/assets/jg-hp-czgz-icon.png"
		},
		{
			"name": "语言/留学",
			"router": "/packageA/category/index?pid=2",
			"img": "https://static.jiaoyubao.cn/images/uniapp/assets/jg-hp-yylx-icon.png"
		},
		{
			"name": "资格考证",
			"router": "/packageA/category/index?pid=3",
			"img": "https://static.jiaoyubao.cn/images/uniapp/assets/jg-hp-jszg-icon.png",
		},
		{
			"name": "就业技能",
			"router": "/packageA/category/index?pid=4",
			"img": "https://static.jiaoyubao.cn/images/uniapp/assets/jg-hp-jyjn-icon.png"
		},
		{
			"name": "兴趣爱好",
			"router": "/packageA/category/index?pid=5",
			"img": "https://static.jiaoyubao.cn/images/uniapp/assets/jg-hp-xqah-icon.png"
		},
		{
			"name": "职场提升",
			"router": "/packageA/category/index?pid=6",
			"img": "https://static.jiaoyubao.cn/images/uniapp/assets/jg-hp-zgkz-icon.png",
		},
		{
			"name": "少儿英语",
			"router": "/pages/agencylist/index?class=shaoeryingyu",
			"img": "https://static.jiaoyubao.cn/images/uniapp/assets/jg-hp-seyy-icon.png"
		},
		{
			"name": "雅思",
			"router": "/pages/agencylist/index?class=yasi",
			"img": "https://static.jiaoyubao.cn/images/uniapp/assets/jg-hp-ys-icon.png"
		},
		{
			"name": "托福",
			"router": "/pages/agencylist/index?class=tuofu",
			"img": "https://static.jiaoyubao.cn/images/uniapp/assets/jg-hp-tf-icon.png"
		},
	],
	[{
			"name": "财经/会计",
			"router": "/pages/agencylist/index?class=kuaiji",
			"img": "https://static.jiaoyubao.cn/images/uniapp/assets/jg-hp-cjkj-icon.png"
		},
		{
			"name": "舞蹈",
			"router": "/pages/agencylist/index?class=wudaoxingti",
			"img": "https://static.jiaoyubao.cn/images/uniapp/assets/jg-hp-wd-icon.png"
		},
		{
			"name": "音乐/乐器",
			"router": "/pages/agencylist/index?class=yueqi",
			"img": "https://static.jiaoyubao.cn/images/uniapp/assets/jg-hp-yyyq-icon.png"
		},
		{
			"name": "小语种",
			"router": "/pages/agencylist/index?class=xiaoyuzhong",
			"img": "https://static.jiaoyubao.cn/images/uniapp/assets/jg-hp-xyz-icon.png"
		},
		{
			"name": "建筑工程",
			"router": "/pages/agencylist/index?class=jianzhu",
			"img": "https://static.jiaoyubao.cn/images/uniapp/assets/jg-hp-jzgc-icon.png"
		},
		{
			"name": "美妆/摄影",
			"router": "/pages/agencylist/index?class=huazhuangzaoxing",
			"img": "https://static.jiaoyubao.cn/images/uniapp/assets/jg-hp-mzsy-icon.png"
		},
		{
			"name": "设计",
			"router": "/pages/agencylist/index?class=sheji",
			"img": "https://static.jiaoyubao.cn/images/uniapp/assets/jg-hp-sjpx-icon.png"
		},
		{
			"name": "瑜伽",
			"router": "/pages/agencylist/index?class=yuga",
			"img": "https://static.jiaoyubao.cn/images/uniapp/assets/jg-hp-yjpx-icon.png"
		},
		{
			"name": "艺考专业课",
			"router": "/pages/agencylist/index?class=ykpx",
			"img": "https://static.jiaoyubao.cn/images/uniapp/assets/jg-hp-ykzy-icon.png"
		},
		// {
		// 	"name": "教师资格证",
		// 	"router": "/packageA/category/index?pid=3&cid=1",
		// 	"img": "https://static.jiaoyubao.cn/images/uniapp/assets/jg-hp-jszg-icon.png"
		// },
		{
			"name": "全部课程",
			"router": "/packageA/category/index?pid=0",
			"img": "https://static.jiaoyubao.cn/images/uniapp/assets/jg-hp-qbkc-icon.png"
		}
	]
]

// 首页-小类
let subclassArr = [{
		"maincategory": "艺术兴趣",
		"idx" : 5,
		"router": "/packageA/category/index?pid=5",
		"color": "red",
		"subclass": [{
				"name": "乐器",
				"url": "yueqi",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/ysxq-yq-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/ysxq-yq-icon-b.png",
			},
			{
				"name": "舞蹈",
				"url": "wudaoxingti",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/ysxq-wd-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/ysxq-wd-icon-b.png",
			},
			{
				"name": "表演",
				"url": "biaoyan",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/ysxq-by-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/ysxq-by-icon-b.png",
			},
			{
				"name": "围棋",
				"url": "weiqi",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/ysxq-wq-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/ysxq-wq-icon-b.png",
			},
			{
				"name": "少儿编程",
				"url": "sebiancheng",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/ysxq-sebc-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/ysxq-sebc-icon-b.png",
			},
			{
				"name": "机器人",
				"url": "jiqiren",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/ysxq-jqr-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/ysxq-jqr-icon-b.png",
			},
			{
				"name": "少儿美术",
				"url": "semspx",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/ysxq-sems-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/ysxq-sems-icon-b.png",
			},
			{
				"name": "书法",
				"url": "shufameishu",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/ysxq-sf-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/ysxq-sf-icon-b.png",
			},
			{
				"name": "篮球",
				"url": "lanqiu",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/ysxq-lq-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/ysxq-lq-icon-b.png",
			},
			{
				"name": "跆拳道",
				"url": "taiquandao",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/ysxq-tqd-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/ysxq-tqd-icon-b.png",
			},
			{
				"name": "武术",
				"url": "wushu",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/ysxq-ws-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/ysxq-ws-icon-b.png",
			},
			{
				"name": "瑜伽",
				"url": "yuga",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/ysxq-yj-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/ysxq-yj-icon-b.png",
			},
		]
	},
	{
		"maincategory": "学前小学",
		"idx" : 0,
		"router": "/packageA/category/index?pid=0",
		"color": "green",
		"subclass": [{
				"name": "早教",
				"url": "zaojiao",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/xqxx-zj-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/xqxx-zj-icon-b.png",
			},
			{
				"name": "右脑开发",
				"url": "zhilikaifa",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/xqxx-ynkf-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/xqxx-ynkf-icon-b.png",
			},
			{
				"name": "感统训练",
				"url": "gantong",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/xqxx-gtxl-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/xqxx-gtxl-icon-b.png",
			},
			{
				"name": "婴儿游泳",
				"url": "yingeryou",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/xqxx-yeyy-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/xqxx-yeyy-icon-b.png",
			},
			{
				"name": "少儿英语",
				"url": "shaoeryingyu",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/xqxx-seyy-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/xqxx-seyy-icon-b.png",
			},
			{
				"name": "学前教育",
				"url": "youxiaoxianjie",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/xqxx-xqjy-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/xqxx-xqjy-icon-b.png",
			},
			{
				"name": "小学辅导",
				"url": "xiaoxue",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/xqxx-xxfd-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/xqxx-xxfd-icon-b.png",
			},
			{
				"name": "冬/夏令营",
				"url": "xialing",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/xqxx-xly-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/xqxx-xly-icon-b.png",
			}
		]
	},
	{
		"maincategory": "初中高中",
		"idx" : 1,
		"router": "/packageA/category/index?pid=1",
		"color": "blue",
		"subclass": [{
				"name": "初中辅导",
				"url": "chuzhong",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/czgz-czfd-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/czgz-czfd-icon-b.png",
			},
			{
				"name": "中考辅导",
				"url": "zhongkao",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/czgz-zkfd-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/czgz-zkfd-icon-b.png",
			},
			{
				"name": "高中辅导",
				"url": "gaozhong",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/czgz-gzfd-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/czgz-gzfd-icon-b.png",
			},
			{
				"name": "高考辅导",
				"url": "gaokao",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/czgz-gkfd-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/czgz-gkfd-icon-b.png",
			},
			{
				"name": "艺考美术",
				"url": "meishupeixun",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/czgz-ykms-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/czgz-ykms-icon-b.png",
			},
			{
				"name": "播音主持",
				"url": "boyinzhuchi",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/czgz-byzc-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/czgz-byzc-icon-b.png",
			},
			{
				"name": "艺考表演",
				"url": "biaoyan",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/czgz-ykby-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/czgz-ykby-icon-b.png",
			},
			{
				"name": "更多艺考",
				"url": "ykpx",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/czgz-gdyk-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/czgz-gdyk-icon-b.png",
			}
		]
	},
	{
		"maincategory": "语言留学",
		"idx" : 2,
		"router": "/packageA/category/index?pid=2",
		"color": "purple",
		"subclass": [{
				"name": "雅思",
				"url": "yasi",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/yylx-ys-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/yylx-ys-icon-b.png",
			},
			{
				"name": "托福",
				"url": "tuofu",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/yylx-tf-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/yylx-tf-icon-b.png",
			},
			{
				"name": "GRE",
				"url": "gre",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/yylx-gre-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/yylx-gre-icon-b.png",
			},
			{
				"name": "SAT",
				"url": "sat",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/yylx-sat-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/yylx-sat-icon-b.png",
			},
			{
				"name": "日语",
				"url": "riyu",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/yylx-ry-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/yylx-ry-icon-b.png",
			},
			{
				"name": "韩语",
				"url": "hanyu",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/yylx-hy-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/yylx-hy-icon-b.png",
			},
			{
				"name": "法语",
				"url": "fayu",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/yylx-fy-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/yylx-fy-icon-b.png",
			},
			{
				"name": "德语",
				"url": "deyu",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/yylx-dy-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/yylx-dy-icon-b.png",
			},
			{
				"name": "留学",
				"url": "liuxue",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/yylx-lx-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/yylx-lx-icon-b.png",
			},
			{
				"name": "移民",
				"url": "liuxue",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/yylx-ym-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/yylx-ym-icon-b.png",
			},
			{
				"name": "国际学校",
				"url": "guojijiaoyu",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/yylx-gjxx-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/yylx-gjxx-icon-b.png",
			},
			{
				"name": "作品集",
				"url": "yishuzuopin",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/yylx-zpj-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/yylx-zpj-icon-b.png",
			}
		]
	},
	{
		"maincategory": "资格考证",
		"idx" : 3,
		"router": "/packageA/category/index?pid=3",
		"color": "yellow",
		"subclass": [{
				"name": "会计职称",
				"url": "kuaijizhi",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/zgkz-kjzc-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/zgkz-kjzc-icon-b.png",
			},
			{
				"name": "注会",
				"url": "zhuce",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/zgkz-zk-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/zgkz-zk-icon-b.png",
			},
			{
				"name": "教师资格证",
				"url": "jiaoshi",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/zgkz-jszg-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/zgkz-jszg-icon-b.png",
			},
			{
				"name": "人力资源师",
				"url": "renliziyuan",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/zgkz-rlzy-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/zgkz-rlzy-icon-b.png",
			},
			{
				"name": "建造师",
				"url": "jianzao",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/zgkz-jzs-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/zgkz-jzs-icon-b.png",
			},
			{
				"name": "造价师",
				"url": "zaojiashi",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/zgkz-zjs-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/zgkz-zjs-icon-b.png",
			},
			{
				"name": "消防工程师",
				"url": "xfgcs",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/zgkz-xfgc-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/zgkz-xfgc-icon-b.png",
			},
			{
				"name": "监理工程师",
				"url": "jianli",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/zgkz-jlgc-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/zgkz-jlgc-icon-b.png",
			}
		]
	},
	{
		"maincategory": "就业技能",
		"idx" : 4,
		"router": "/packageA/category/index?pid=4",
		"color": "red",
		"subclass": [{
				"name": "化妆培训",
				"url": "huazhuangzaoxing",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/jyjn-hzpx-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/jyjn-hzpx-icon-b.png",
			},
			{
				"name": "美容美发",
				"url": "meirongmeifa",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/jyjn-mrmf-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/jyjn-mrmf-icon-b.png",
			},
			{
				"name": "纹绣美甲",
				"url": "wenxiumeijia",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/jyjn-wxmj-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/jyjn-wxmj-icon-b.png",
			},
			{
				"name": "摄影培训",
				"url": "sheying",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/jyjn-sypx-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/jyjn-sypx-icon-b.png",
			},
			{
				"name": "设计培训",
				"url": "sheji",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/jyjn-sjpx-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/jyjn-sjpx-icon-b.png",
			},
			{
				"name": "IT工程师",
				"url": "diannao",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/jyjn-itgcx-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/jyjn-itgcx-icon-b.png",
			},
			{
				"name": "餐饮小吃",
				"url": "canyin",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/jyjn-cyxc-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/jyjn-cyxc-icon-b.png",
			},
			{
				"name": "汽车维修",
				"url": "qicheweixiu",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/jyjn-qcwx-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/jyjn-qcwx-icon-b.png",
			},
			{
				"name": "月嫂",
				"url": "yspx",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/jyjn-ys-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/jyjn-ys-icon-b.png",
			},
			{
				"name": "育婴师",
				"url": "yys",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/jyjn-yys-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/jyjn-yys-icon-b.png",
			},
			{
				"name": "婚庆司仪",
				"url": "siyi",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/jyjn-hqsj-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/jyjn-hqsj-icon-b.png",
			},
			{
				"name": "中医技能",
				"url": "zhongyiji",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/jyjn-zyjn-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/jyjn-zyjn-icon-b.png",
			}
		]
	},
	{
		"maincategory": "职场其他",
		"idx" : 6,
		"router": "/packageA/category/index?pid=6",
		"color": "purple",
		"subclass": [{
				"name": "成人高考",
				"url": "chengrengaokao",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/zcqt-crgk-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/zcqt-crgk-icon-b.png",
			},
			{
				"name": "网络教育",
				"url": "yuanchengjiaoyu",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/zcqt-wljy-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/zcqt-wljy-icon-b.png",
			},
			{
				"name": "自学考试",
				"url": "zixuekaoshi",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/zcqt-zxks-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/zcqt-zxks-icon-b.png",
			},
			{
				"name": "考研培训",
				"url": "kaoyan",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/zcqt-kypx-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/zcqt-kypx-icon-b.png",
			},
			{
				"name": "拓展训练",
				"url": "tuozhan",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/zcqt-tzxl-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/zcqt-tzxl-icon-b.png",
			},
			{
				"name": "企业内训",
				"url": "qynx",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/zcqt-qynx-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/zcqt-qynx-icon-b.png",
			},
			{
				"name": "演讲口才",
				"url": "koucai",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/zcqt-yjkc-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/zcqt-yjkc-icon-b.png",
			},
			{
				"name": "更多类别",
				"url": "xueli",
				"img": "https://static.jiaoyubao.cn/images/uniapp/subclass/zcqt-gdlb-icon.png",
				"hotImg": "https://static.jiaoyubao.cn/images/uniapp/subclass-blue/zcqt-gdlb-icon-b.png",
			}
		]
	},
]

// 类别-所有数据
let categoryGroup = [{
	"name": "学前小学",
	"code": 500008,
	"child": [{
		"name": "早教/感统",
		"child": [{
			"name": "全部",
			"url": "zaojiao"
		}, {
			"name": "早教课程",
			"url": "03sui"
		}, {
			"name": "亲子乐园",
			"url": "qinzileyuan"
		}, {
			"name": "特色课",
			"url": "zaojiaotese"
		}, {
			"name": "右脑/智力开发",
			"url": "zhilikaifa"
		}, {
			"name": "感统训练",
			"url": "gantong"
		}, {
			"name": "胎教/孕育",
			"url": "taijiao"
		}, {
			"name": "半托/全托班",
			"url": "bantuoban"
		}, {
			"name": "特殊儿童教育",
			"url": "teshuzaojiao"
		}, {
			"name": "蒙氏教育",
			"url": "mengshijiao"
		}, {
			"name": "幼儿园",
			"url": "zaojiao"
		}, {
			"name": "婴儿游泳",
			"url": "yingeryou"
		}]
	}, {
		"name": "小学辅导",
		"child": [{
			"name": "小学辅导",
			"url": "xiaoxue"
		}]
	}, {
		"name": "少儿英语",
		"child": [{
			"name": "少儿英语",
			"url": "shaoeryingyu"
		}]
	}, {
		"name": "冬/夏令营",
		"child": [{
			"name": "全部",
			"url": "xialing"
		}, {
			"name": "英语夏令营",
			"url": "shuqi"
		}, {
			"name": "科技夏令营",
			"url": "kejiying"
		}, {
			"name": "素质夏令营",
			"url": "suzhiying"
		}, {
			"name": "冬令营",
			"url": "donglingying"
		}, {
			"name": "军事夏令营",
			"url": "xialingying"
		}, {
			"name": "国际游学营",
			"url": "youxue"
		}, {
			"name": "篮球夏令营",
			"url": "lqxly"
		}]
	}, {
		"name": "学前教育",
		"child": [{
			"name": "学前教育",
			"url": "youxiaoxianjie"
		}]
	}]
}, {
	"name": "初中高中",
	"code": 500009,
	"child": [{
		"name": "初中阶段",
		"child": [{
			"name": "初中辅导",
			"url": "chuzhong"
		}, {
			"name": "中考辅导",
			"url": "zhongkao"
		}]
	}, {
		"name": "高中阶段",
		"child": [{
			"name": "高中辅导",
			"url": "gaozhong"
		}, {
			"name": "高考辅导",
			"url": "gaokao"
		}, {
			"name": "高考复读",
			"url": "fudu"
		}]
	}, {
		"name": "春季高考",
		"child": [{
			"name": "春季高考",
			"url": "cjgk"
		}]
	}, {
		"name": "军考艺考",
		"child": [{
			"name": "全部",
			"url": "ykpx"
		}, {
			"name": "军考辅导",
			"url": "junkao"
		}, {
			"name": "艺考生文化课",
			"url": "yishu"
		}, {
			"name": "美术",
			"url": "meishupeixun"
		}, {
			"name": "播音主持",
			"url": "boyinzhuchi"
		}, {
			"name": "表演",
			"url": "biaoyan"
		}, {
			"name": "文管",
			"url": "wenguan"
		}, {
			"name": "影视戏剧",
			"url": "yingshixiju"
		}, {
			"name": "编导",
			"url": "biandao"
		}, {
			"name": "摄影",
			"url": "yingxiang"
		}, {
			"name": "艺考音乐",
			"url": "yinyue"
		}, {
			"name": "空乘",
			"url": "kongcheng"
		}, {
			"name": "体育舞蹈",
			"url": "tiyuwudao"
		}, {
			"name": "艺考舞蹈",
			"url": "wudaoyikao"
		}, {
			"name": "学前教育",
			"url": "xueqian"
		}, {
			"name": "艺考书法",
			"url": "yksf"
		}, {
			"name": "其他专业",
			"url": "qtzy"
		}]
	}, {
		"name": "自主招生考试",
		"child": [{
			"name": "自主招生辅导",
			"url": "zizhuzhao"
		}]
	}, {
		"name": "更多",
		"child": [{
			"name": "寒假辅导",
			"url": "hanjiafudao"
		}, {
			"name": "暑假辅导",
			"url": "xianjie"
		}, {
			"name": "特色辅导",
			"url": "tese"
		}, {
			"name": "托管班",
			"url": "tuoguan"
		}]
	}]
}, {
	"name": "语言/留学",
	"code": 500001,
	"child": [{
		"name": "英语",
		"child": [{
			"name": "全部",
			"url": "yingyu"
		}, {
			"name": "雅思",
			"url": "yasi"
		}, {
			"name": "托福",
			"url": "tuofu"
		}, {
			"name": "成人英语",
			"url": "chengrenyingyu"
		}, {
			"name": "少儿英语",
			"url": "shaoeryingyu"
		}, {
			"name": "青少英语",
			"url": "qingshao"
		}, {
			"name": "考研英语",
			"url": "kaoyanyingyu"
		}, {
			"name": "AP",
			"url": "apkao"
		}, {
			"name": "口语听力",
			"url": "kouyutingli"
		}, {
			"name": "四级六级",
			"url": "sijiliuji"
		}, {
			"name": "商务英语",
			"url": "bec"
		}, {
			"name": "一对一英语",
			"url": "vip"
		}, {
			"name": "专四专八",
			"url": "zhuansizhuanba"
		}, {
			"name": "新概念英语",
			"url": "xingainian"
		}, {
			"name": "ACT",
			"url": "act"
		}, {
			"name": "公共英语(PETS)",
			"url": "gonggongyingyu"
		}, {
			"name": "GRE",
			"url": "gre"
		}, {
			"name": "SAT",
			"url": "sat"
		}, {
			"name": "剑桥英语",
			"url": "jianqiaoyingyu"
		}, {
			"name": "自考英语",
			"url": "zikaoyingyu"
		}, {
			"name": "面试英语",
			"url": "bosimianshi"
		}, {
			"name": "英语口译笔译",
			"url": "kouyibiyi"
		}, {
			"name": "出国前口语",
			"url": "yiminyingyu"
		}, {
			"name": "词汇语法",
			"url": "cihuiyufa"
		}, {
			"name": "托业考试(TOEIC)",
			"url": "toeic"
		}, {
			"name": "企业团训",
			"url": "yingyutuanxun"
		}, {
			"name": "朗文英语",
			"url": "langwen"
		}, {
			"name": "三一口语",
			"url": "sanyikouyu"
		}, {
			"name": "A-Level",
			"url": "alevel"
		}, {
			"name": "实用英语",
			"url": "syyy"
		}, {
			"name": "寒暑假英语",
			"url": "hanjia"
		}, {
			"name": "学位英语",
			"url": "xwyy"
		}, {
			"name": "GMAT",
			"url": "gmat"
		}, {
			"name": "职场英语",
			"url": "zhichangyy"
		}, {
			"name": "SSAT",
			"url": "ssat"
		}, {
			"name": "小托福",
			"url": "xiaotoefl"
		}, {
			"name": "全外教英语",
			"url": "shaoerwj"
		}, {
			"name": "IB课程",
			"url": "ib"
		}, {
			"name": "IGCSE",
			"url": "igcse"
		}, {
			"name": "LSAT",
			"url": "lsat"
		}, {
			"name": "幼儿英语",
			"url": "youer"
		}, {
			"name": "职称英语",
			"url": "zhichenyingyu"
		}, {
			"name": "成人外教口语",
			"url": "waijiaokouyu"
		}, {
			"name": "ESL",
			"url": "esl"
		}, {
			"name": "AEAS",
			"url": "aeas"
		}, {
			"name": "AEIS",
			"url": "aeis"
		}, {
			"name": "GCSE",
			"url": "gcse"
		}, {
			"name": "AST",
			"url": "ast"
		}, {
			"name": "CATTI",
			"url": "catti"
		}, {
			"name": "CELTA",
			"url": "celta"
		}, {
			"name": "iTEP",
			"url": "itep"
		}, {
			"name": "SLEP",
			"url": "slep"
		}, {
			"name": "TESOL",
			"url": "tesol"
		}, {
			"name": "上门外教",
			"url": "shangmenwaijiao"
		}, {
			"name": "其它",
			"url": "yingyuqita"
		}]
	}, {
		"name": "小语种",
		"child": [{
			"name": "全部",
			"url": "xiaoyuzhong"
		}, {
			"name": "日语",
			"url": "riyu"
		}, {
			"name": "韩语",
			"url": "hanyu"
		}, {
			"name": "法语",
			"url": "fayu"
		}, {
			"name": "德语",
			"url": "deyu"
		}, {
			"name": "意大利语",
			"url": "yidaliyu"
		}, {
			"name": "阿拉伯语",
			"url": "alaboyu"
		}, {
			"name": "葡萄牙语",
			"url": "putaoyayu"
		}, {
			"name": "汉语",
			"url": "hanyupx"
		}, {
			"name": "荷兰语",
			"url": "helanyu"
		}, {
			"name": "俄语",
			"url": "eyu"
		}, {
			"name": "瑞典语",
			"url": "ruidianyu"
		}, {
			"name": "西班牙语",
			"url": "xibanyayu"
		}, {
			"name": "粤语",
			"url": "yueyu"
		}, {
			"name": "泰语",
			"url": "taiyu"
		}, {
			"name": "波斯语",
			"url": "bosiyu"
		}, {
			"name": "越南语",
			"url": "yuenanyu"
		}, {
			"name": "印尼语",
			"url": "yinniyu"
		}, {
			"name": "匈牙利语",
			"url": "xiongyaliyu"
		}, {
			"name": "希腊语",
			"url": "xilayu"
		}, {
			"name": "希伯来语",
			"url": "xibolaiyu"
		}, {
			"name": "维吾尔语",
			"url": "weiwueryu"
		}, {
			"name": "土耳其语",
			"url": "tuerqiyu"
		}, {
			"name": "挪威语",
			"url": "nuoweiyu"
		}, {
			"name": "缅甸语",
			"url": "miandianyu"
		}, {
			"name": "马来语",
			"url": "malaiyu"
		}, {
			"name": "罗马尼亚语",
			"url": "luomaniyayu"
		}, {
			"name": "老挝语",
			"url": "laowoyu"
		}, {
			"name": "拉脱维亚语",
			"url": "Lettish"
		}, {
			"name": "拉丁语",
			"url": "ladingyu"
		}, {
			"name": "捷克语",
			"url": "jiekeyu"
		}, {
			"name": "柬埔寨语",
			"url": "jianpuzhaiyu"
		}, {
			"name": "芬兰语",
			"url": "fenlanyu"
		}, {
			"name": "丹麦语",
			"url": "danmaiyu"
		}, {
			"name": "朝鲜语",
			"url": "chaoxianyu"
		}, {
			"name": "波兰语",
			"url": "bolanyu"
		}, {
			"name": "冰岛语",
			"url": "bingdaoyu"
		}, {
			"name": "保加利亚语",
			"url": "Bulgarian"
		}, {
			"name": "其它",
			"url": "xyqt"
		}]
	}, {
		"name": "留学移民",
		"child": [{
			"name": "全部",
			"url": "liuxue"
		}, {
			"name": "美国留学",
			"url": "liuxuemeiguo"
		}, {
			"name": "澳大利亚留学",
			"url": "liuxue"
		}, {
			"name": "韩国留学",
			"url": "liuxuehanguo"
		}, {
			"name": "日本留学",
			"url": "liuxueriben"
		}, {
			"name": "新西兰留学",
			"url": "liuxuexinxilan"
		}, {
			"name": "德国留学",
			"url": "liuxuedeguo"
		}, {
			"name": "俄罗斯留学",
			"url": "liuxueeluosi"
		}, {
			"name": "加拿大留学",
			"url": "liuxuejianada"
		}, {
			"name": "法国留学",
			"url": "liuxuefaguo"
		}, {
			"name": "爱尔兰留学",
			"url": "liuxueaierlan"
		}, {
			"name": "新加坡留学",
			"url": "liuxuexinjiapo"
		}, {
			"name": "意大利留学",
			"url": "liuxueyidali"
		}, {
			"name": "英国留学",
			"url": "liuxueyingguo"
		}, {
			"name": "马来西亚留学",
			"url": "liuxuemalaixiya"
		}, {
			"name": "荷兰留学",
			"url": "liuxuehelan"
		}, {
			"name": "西班牙留学",
			"url": "liuxuexibanya"
		}, {
			"name": "留学预科",
			"url": "yuke"
		}, {
			"name": "阿根廷留学",
			"url": "liuxueagenting"
		}, {
			"name": "中国香港留学",
			"url": "xianggang"
		}, {
			"name": "带薪实习",
			"url": "guojishixi"
		}, {
			"name": "瑞士留学",
			"url": "liuxueruishi"
		}, {
			"name": "瑞典留学",
			"url": "liuxueruidian"
		}, {
			"name": "移民公司",
			"url": "yimin"
		}, {
			"name": "泰国留学",
			"url": "tglx"
		}, {
			"name": "出国劳务",
			"url": "chuguolaowu"
		}, {
			"name": "代办签证",
			"url": "daibanqianzheng"
		}, {
			"name": "其它国家留学",
			"url": "qitaguojia"
		}]
	}, {
		"name": "国际课程",
		"child": [{
			"name": "全部",
			"url": "yingyu"
		}, {
			"name": "ACT",
			"url": "act"
		}, {
			"name": "GRE",
			"url": "gre"
		}, {
			"name": "SAT",
			"url": "sat"
		}, {
			"name": "AP",
			"url": "apkao"
		}, {
			"name": "A-Level",
			"url": "alevel"
		}, {
			"name": "GMAT",
			"url": "gmat"
		}, {
			"name": "SSAT",
			"url": "ssat"
		}, {
			"name": "IB课程",
			"url": "ib"
		}, {
			"name": "IGCSE",
			"url": "igcse"
		}, {
			"name": "LSAT",
			"url": "lsat"
		}, {
			"name": "ESL",
			"url": "esl"
		}, {
			"name": "AEAS",
			"url": "aeas"
		}, {
			"name": "AEIS",
			"url": "aeis"
		}, {
			"name": "GCSE",
			"url": "gcse"
		}, {
			"name": "AST",
			"url": "ast"
		}, {
			"name": "CATTI",
			"url": "catti"
		}, {
			"name": "CELTA",
			"url": "celta"
		}, {
			"name": "iTEP",
			"url": "itep"
		}, {
			"name": "SLEP",
			"url": "slep"
		}, {
			"name": "TESOL",
			"url": "tesol"
		}, {
			"name": "IB国际文凭证书课程",
			"url": "ibkc"
		}, {
			"name": "艺术预科",
			"url": "preart"
		}]
	}, {
		"name": "国际学校",
		"child": [{
			"name": "全部",
			"url": "guojijiaoyu"
		}, {
			"name": "国际小学",
			"url": "guojixiaoxue"
		}, {
			"name": "国际初中",
			"url": "guojichuzhong"
		}, {
			"name": "国际高中",
			"url": "guojigaozhong"
		}, {
			"name": "留学预科",
			"url": "liuxueyuke"
		}]
	}, {
		"name": "艺术作品展",
		"child": [{
			"name": "艺术作品集",
			"url": "yishuzuopin"
		}]
	}]
}, {
	"name": "资格考证",
	"code": 500011,
	"child": [{
		"name": "财经/会计",
		"child": [{
			"name": "全部",
			"url": "kuaiji"
		}, {
			"name": "会计从业资格(会计证)",
			"url": "kuaijizige"
		}, {
			"name": "会计职称",
			"url": "kuaijizhi"
		}, {
			"name": "会计电算化",
			"url": "diansuanhua"
		}, {
			"name": "注册会计师",
			"url": "zhuce"
		}, {
			"name": "经济师",
			"url": "jingjishi"
		}, {
			"name": "统计师",
			"url": "tongjishi"
		}, {
			"name": "会计实操",
			"url": "kuaijizhang"
		}, {
			"name": "注册税务师",
			"url": "chouhua"
		}, {
			"name": "国际注册会计师(ACCA)",
			"url": "guokuai"
		}, {
			"name": "会计全科",
			"url": "kuaijiquan"
		}, {
			"name": "出口退税",
			"url": "tuishui"
		}, {
			"name": "证券从业考试",
			"url": "zhengquan"
		}, {
			"name": "银行职业资格考试",
			"url": "yhcyks"
		}, {
			"name": "期货从业考试",
			"url": "qhcy"
		}, {
			"name": "审计师",
			"url": "sjs"
		}, {
			"name": "资产评估师",
			"url": "zcpgs"
		}, {
			"name": "价格鉴证师",
			"url": "jgjds"
		}, {
			"name": "企业财务管理",
			"url": "qycwgl"
		}, {
			"name": "特许金融分析师(CFA)",
			"url": "cfa"
		}, {
			"name": "美国注册管理会计师(CMA)",
			"url": "cma"
		}, {
			"name": "金融风险管理师(FRM)",
			"url": "frm"
		}, {
			"name": "美国注册会计师(USCPA)",
			"url": "uscpa"
		}, {
			"name": "统计从业资格证",
			"url": "tjcyzgz"
		}, {
			"name": "报检员",
			"url": "bjypx"
		}, {
			"name": "单证员",
			"url": "dzypx"
		}, {
			"name": "跟单员",
			"url": "gdypx"
		}, {
			"name": "报关员",
			"url": "baoguan"
		}, {
			"name": "会计就业班",
			"url": "kjjyb"
		}, {
			"name": "基金从业考试",
			"url": "jjcy"
		}, {
			"name": "国际财务管理师(IFM)",
			"url": "ifm"
		}, {
			"name": "注册财务策划师(RFP)",
			"url": "rfp"
		}, {
			"name": "金融理财师",
			"url": "afp"
		}, {
			"name": "国际金融理财师",
			"url": "cfp"
		}, {
			"name": "黄金投资分析师",
			"url": "huangjintz"
		}, {
			"name": "继续教育",
			"url": "kuaijixu"
		}, {
			"name": "其他",
			"url": "qtpx"
		}]
	}, {
		"name": "教师资格证",
		"child": [{
			"name": "教师资格证",
			"url": "jiaoshi"
		}, {
			"name": "小学教师资格证",
			"url": "xxjszgz"
		}, {
			"name": "中学教师资格证",
			"url": "zxjszgz"
		}, {
			"name": "幼儿园教师资格证",
			"url": "yeyjszgz"
		}]
	}, {
		"name": "人力资源管理师",
		"child": [{
			"name": "人力资源管理师",
			"url": "renliziyuan"
		}, {
			"name": "一级人力资源管理师",
			"url": "yjrlzygls"
		}, {
			"name": "二级人力资源管理师",
			"url": "ejrlzygls"
		}, {
			"name": "三级人力资源管理师",
			"url": "sjrlzygls"
		}]
	}, {
		"name": "建筑工程",
		"child": [{
			"name": "全部",
			"url": "jianzhu"
		}, {
			"name": "消防工程师",
			"url": "xfgcs"
		}, {
			"name": "建造师",
			"url": "jianzao"
		}, {
			"name": "安全工程师",
			"url": "aqgcs"
		}, {
			"name": "造价工程师",
			"url": "zaojiashi"
		}, {
			"name": "房地产估价师",
			"url": "gujiashi"
		}, {
			"name": "招标师",
			"url": "zhaobiaoshi"
		}, {
			"name": "环境影响评价师",
			"url": "hjyxpjs"
		}, {
			"name": "房地产经纪人",
			"url": "jingjiren"
		}, {
			"name": "造价员",
			"url": "zaojia"
		}, {
			"name": "监理工程师",
			"url": "jianli"
		}, {
			"name": "物业管理师",
			"url": "wuye"
		}, {
			"name": "电气工程师",
			"url": "dianqi"
		}, {
			"name": "资料员",
			"url": "ziliaoyuan"
		}, {
			"name": "预算员",
			"url": "yusuan"
		}, {
			"name": "咨询工程师",
			"url": "zxgcs"
		}, {
			"name": "投资项目管理师",
			"url": "tzxmgls"
		}, {
			"name": "注册测绘师",
			"url": "zcchs"
		}, {
			"name": "质量工程师",
			"url": "zlgcs"
		}, {
			"name": "注册建筑师",
			"url": "zcjzs"
		}, {
			"name": "结构工程师",
			"url": "jiegoushi"
		}, {
			"name": "岩土工程师",
			"url": "yantushi"
		}, {
			"name": "安全评价师",
			"url": "aqpjs"
		}, {
			"name": "土地估价师",
			"url": "tdgjs"
		}, {
			"name": "公路造价师",
			"url": "glzjs"
		}, {
			"name": "环保工程师",
			"url": "hbgcs"
		}, {
			"name": "化工工程师",
			"url": "hggcs"
		}, {
			"name": "城市规划师",
			"url": "csghs"
		}, {
			"name": "材料员",
			"url": "clypx"
		}, {
			"name": "设备监理师",
			"url": "sbjls"
		}, {
			"name": "公路监理师",
			"url": "gljls"
		}, {
			"name": "施工员",
			"url": "shigongyuan"
		}, {
			"name": "质检员",
			"url": "zhijianyuan"
		}, {
			"name": "监理员",
			"url": "jianliyuan"
		}, {
			"name": "安全员",
			"url": "aqypx"
		}, {
			"name": "建筑八大员",
			"url": "jzbdy"
		}, {
			"name": "质量员",
			"url": "zhiliang"
		}, {
			"name": "机械员",
			"url": "jixie"
		}, {
			"name": "标准员",
			"url": "biaozhun"
		}, {
			"name": "劳务员",
			"url": "laowu"
		}, {
			"name": "合同员",
			"url": "htypx"
		}, {
			"name": "实验员",
			"url": "syypx"
		}, {
			"name": "试验员",
			"url": "shiyanyuan"
		}, {
			"name": "BIM",
			"url": "bim"
		}, {
			"name": "房屋查验咨询师",
			"url": "fwcyzxs"
		}, {
			"name": "测量员",
			"url": "celiang"
		}, {
			"name": "档案管理员",
			"url": "dangan"
		}, {
			"name": "工程合同管理师",
			"url": "gchtgls"
		}, {
			"name": "验房师",
			"url": "yanfang"
		}, {
			"name": "给排水工程师",
			"url": "jipaishui"
		}, {
			"name": "注册计量师",
			"url": "jiliangshi"
		}, {
			"name": "暖通工程师",
			"url": "nuantong"
		}, {
			"name": "注册土木工程师",
			"url": "zctmgcs"
		}, {
			"name": "勘察设计注册工程师",
			"url": "kanchasj"
		}, {
			"name": "土建中级职称",
			"url": "tjzjzc"
		}, {
			"name": "特种作业操作证",
			"url": "tzzyczz"
		}, {
			"name": "建设厅技工证书",
			"url": "jstjgzs"
		}, {
			"name": "其它",
			"url": "jzqita"
		}]
	}, {
		"name": "医疗卫生",
		"child": [{
			"name": "全部",
			"url": "yiwei"
		}, {
			"name": "卫生高级职称",
			"url": "yxgjzc"
		}, {
			"name": "执业医师",
			"url": "yishi"
		}, {
			"name": "医学三基",
			"url": "yixuesanji"
		}, {
			"name": "卫生初中级职称",
			"url": "yxczjzc"
		}, {
			"name": "执业护士",
			"url": "zyhs"
		}, {
			"name": "执业药师",
			"url": "zhiyeyaoshi"
		}]
	}, {
		"name": "心理咨询师",
		"child": [{
			"name": "心理咨询师",
			"url": "xinlizixun"
		}, {
			"name": "二级心理咨询师",
			"url": "ejxlzxs"
		}, {
			"name": "三级心理咨询师",
			"url": "sjxlzxs"
		}]
	}, {
		"name": "公务员",
		"child": [{
			"name": "全部",
			"url": "gongwuyuan"
		}, {
			"name": "国考公务员",
			"url": "guokao"
		}, {
			"name": "地方公务员",
			"url": "shengkao"
		}, {
			"name": "事业单位",
			"url": "shiyedanwei"
		}, {
			"name": "教师招聘",
			"url": "jiaoshizhaopin"
		}, {
			"name": "农信社",
			"url": "nongxinshe"
		}, {
			"name": "银行招聘",
			"url": "yinhang"
		}, {
			"name": "政法干警",
			"url": "zfgj"
		}, {
			"name": "招警",
			"url": "zhaojing"
		}, {
			"name": "选调生",
			"url": "xuandiaosheng"
		}, {
			"name": "村官",
			"url": "cunguan"
		}, {
			"name": "三支一扶",
			"url": "szyf"
		}, {
			"name": "遴选考试",
			"url": "lxks"
		}, {
			"name": "乡镇公务员",
			"url": "xzgwy"
		}, {
			"name": "军转干",
			"url": "junzhuangan"
		}, {
			"name": "特岗教师",
			"url": "tgjs"
		}]
	}, {
		"name": "更多考证",
		"child": [{
			"name": "全部",
			"url": "zhiye"
		}, {
			"name": "公共营养师",
			"url": "yingyangshi"
		}, {
			"name": "中医养生师",
			"url": "yangshengshi"
		}, {
			"name": "采购师",
			"url": "caigoushi"
		}, {
			"name": "房地产策划师",
			"url": "fangdichan"
		}, {
			"name": "营销师",
			"url": "yingxiaoshi"
		}, {
			"name": "婚姻家庭咨询师",
			"url": "hunyin"
		}, {
			"name": "信用管理师",
			"url": "xinyong"
		}, {
			"name": "电子商务师",
			"url": "dianzishangwushi"
		}, {
			"name": "理财规划师",
			"url": "licai"
		}, {
			"name": "内审员",
			"url": "neishenyuan"
		}, {
			"name": "秘书资格",
			"url": "mishu"
		}, {
			"name": "营养师",
			"url": "yingyang"
		}, {
			"name": "健康管理师",
			"url": "jkgls"
		}, {
			"name": "智能楼宇管理师",
			"url": "znly"
		}, {
			"name": "国际风险管理师",
			"url": "fengxian"
		}, {
			"name": "速录师",
			"url": "sulushi"
		}, {
			"name": "司法考试",
			"url": "sifa"
		}, {
			"name": "国际汉语教师",
			"url": "ipa"
		}, {
			"name": "企业法律顾问",
			"url": "falvguwen"
		}, {
			"name": "导游证",
			"url": "daoyou"
		}, {
			"name": "社会工作师",
			"url": "shegong"
		}, {
			"name": "企业师",
			"url": "peixunshi"
		}, {
			"name": "普通话水平测试",
			"url": "pthspcs"
		}, {
			"name": "育婴师认证",
			"url": "yuyingshi"
		}, {
			"name": "物流师",
			"url": "wuliushi"
		}, {
			"name": "二手车鉴定评估师",
			"url": "ershouchepg"
		}, {
			"name": "项目管理师",
			"url": "cpmp"
		}, {
			"name": "职业指导师",
			"url": "zhiyezhidao"
		}, {
			"name": "游泳救生员",
			"url": "youyongjsy"
		}, {
			"name": "儿童情商指导师",
			"url": "etqingshang"
		}]
	}]
}, {
	"name": "就业技能",
	"code": 500014,
	"child": [{
		"name": "美妆/摄影",
		"child": [
		// 	{
		// 	"name": "全部",
		// 	"url": "jineng"
		// }, 
		{
			"name": "化妆",
			"url": "huazhuangzaoxing"
		}, {
			"name": "美容美发",
			"url": "meirongmeifa"
		}, {
			"name": "纹绣美甲",
			"url": "wenxiumeijia"
		}, {
			"name": "摄影",
			"url": "sheying"
		}]
	}, {
		"name": "设计",
		"child": [{
			"name": "全部",
			"url": "sheji"
		}, {
			"name": "平面设计",
			"url": "pingmian"
		}, {
			"name": "影视",
			"url": "yingshipeixun"
		}, {
			"name": "图形设计",
			"url": "tuxing"
		}, {
			"name": "广告设计",
			"url": "guanggao"
		}, {
			"name": "网页设计",
			"url": "wangyesheji"
		}, {
			"name": "建筑设计",
			"url": "jianzhusheji"
		}, {
			"name": "装饰/室内设计",
			"url": "shineiwai"
		}, {
			"name": "服装设计",
			"url": "fuzhuang"
		}, {
			"name": "模具设计",
			"url": "moju"
		}, {
			"name": "其它设计",
			"url": "qitasheji"
		}, {
			"name": "3DMAX",
			"url": "3dmax"
		}, {
			"name": "Maya",
			"url": "maya"
		}, {
			"name": "三维动画",
			"url": "sanweidonghua"
		}, {
			"name": "电视栏目包装",
			"url": "dianshilanmu"
		}, {
			"name": "影视后期制作",
			"url": "yingshijianji"
		}, {
			"name": "UI设计",
			"url": "ui"
		}, {
			"name": "游戏动漫设计",
			"url": "youxidongman"
		}, {
			"name": "淘宝美工",
			"url": "taobao"
		}, {
			"name": "手绘",
			"url": "shouhui"
		}]
	}, {
		"name": "IT技术",
		"child": [{
			"name": "全部",
			"url": "diannao"
		}, {
			"name": "计算机等级考试",
			"url": "dengjikaoshi"
		}, {
			"name": "电脑维修",
			"url": "diannaoweixiu"
		}, {
			"name": "网络工程师",
			"url": "wangluo"
		}, {
			"name": "软件工程师",
			"url": "ruanjian"
		}, {
			"name": "数据库",
			"url": "shujuku"
		}, {
			"name": "动漫游戏开发",
			"url": "dongmanyouxi"
		}, {
			"name": "网站建设",
			"url": "wangzhan"
		}, {
			"name": "计算机职称考试",
			"url": "jsjzc"
		}, {
			"name": "微软认证",
			"url": "wrrzpx"
		}, {
			"name": "Linux认证",
			"url": "linux"
		}, {
			"name": "JAVA认证",
			"url": "java"
		}, {
			"name": "思科认证",
			"url": "cisco"
		}, {
			"name": "Oracle认证",
			"url": "oracle"
		}, {
			"name": "华为认证",
			"url": "huawei"
		}, {
			"name": "网络营销",
			"url": "wlyx"
		}, {
			"name": "物联网工程师",
			"url": "wulianwang"
		}, {
			"name": "电商",
			"url": "dspx"
		}, {
			"name": "微信运营师",
			"url": "weixinyunying"
		}, {
			"name": "VR/AR",
			"url": "vrar"
		}]
	}, {
		"name": "办公软件",
		"child": [{
			"name": "办公软件",
			"url": "office"
		}]
	}, {
		"name": "餐饮",
		"child": [{
			"name": "全部",
			"url": "canyin"
		}, {
			"name": "小吃",
			"url": "canyin"
		}, {
			"name": "中式烹饪",
			"url": "zspengren"
		}, {
			"name": "西餐料理",
			"url": "xcliaoli"
		}, {
			"name": "面点",
			"url": "zxmiandian"
		}, {
			"name": "餐饮管理",
			"url": "cyguanli"
		}, {
			"name": "厨师",
			"url": "chushi"
		}, {
			"name": "调酒师",
			"url": "tiaojiu"
		}, {
			"name": "糕点",
			"url": "dangao"
		}, {
			"name": "咖啡",
			"url": "kafeipeixun"
		}, {
			"name": "西点",
			"url": "xidianpx"
		}, {
			"name": "冷饮",
			"url": "lypx"
		}]
	}, {
		"name": "技工/维修",
		"child": [{
			"name": "汽车维修/美容",
			"url": "qicheweixiu"
		}, {
			"name": "手机维修",
			"url": "sjwx"
		}, {
			"name": "机电技工",
			"url": "jigong"
		}, {
			"name": "工程机械",
			"url": "gongchengjixie"
		}, {
			"name": "PLC",
			"url": "plc"
		}, {
			"name": "数控",
			"url": "shukong"
		}, {
			"name": "电梯",
			"url": "dtpx"
		}, {
			"name": "驾校",
			"url": "jiaxiao"
		}]
	}, {
		"name": "母婴护理",
		"child": [{
			"name": "全部",
			"url": "yuesao"
		}, {
			"name": "催乳师",
			"url": "crspx"
		}, {
			"name": "月嫂",
			"url": "yspx"
		}, {
			"name": "育婴师",
			"url": "yys"
		}]
	}, {
		"name": "中医技能",
		"child": [{
			"name": "全部",
			"url": "zhongyiji"
		}, {
			"name": "小儿推拿",
			"url": "xetn"
		}, {
			"name": "推拿按摩",
			"url": "tnam"
		}, {
			"name": "针灸",
			"url": "zjpx"
		}, {
			"name": "正骨",
			"url": "zgpx"
		}, {
			"name": "中医保健",
			"url": "zybjpx"
		}, {
			"name": "足疗",
			"url": "zlpx"
		}]
	}, {
		"name": "更多技能",
		"child": [{
			"name": "全部",
			"url": "jineng"
		}, {
			"name": "安全员",
			"url": "anquanyuan"
		}, {
			"name": "钢琴调律师",
			"url": "tiaolvshi"
		}, {
			"name": "司仪",
			"url": "siyi"
		}, {
			"name": "幼师",
			"url": "youshipeixun"
		}, {
			"name": "服装设计",
			"url": "fuzhangsheji"
		}, {
			"name": "宠物美容师",
			"url": "cwmrspx"
		}, {
			"name": "婚礼策划师",
			"url": "hunlicehua"
		}, {
			"name": "婚礼督导师",
			"url": "hunlidudao"
		}, {
			"name": "销售",
			"url": "xiaoshou"
		}, {
			"name": "就业",
			"url": "jypx"
		}]
	}]
}, {
	"name": "艺术兴趣",
	"code": 500004,
	"child": [{
		"name": "舞蹈",
		"child": [{
			"name": "全部",
			"url": "wudaoxingti"
		}, {
			"name": "爵士舞",
			"url": "jueshiwu"
		}, {
			"name": "DS领舞",
			"url": "dslingwu"
		}, {
			"name": "街舞",
			"url": "jiewu"
		}, {
			"name": "芭蕾舞",
			"url": "baleiwu"
		}, {
			"name": "肚皮舞",
			"url": "dupiwu"
		}, {
			"name": "钢管舞",
			"url": "gangguanwu"
		}, {
			"name": "拉丁舞",
			"url": "ladingwu"
		}, {
			"name": "民族舞蹈",
			"url": "minzuwu"
		}, {
			"name": "健美操",
			"url": "jianmeicao"
		}, {
			"name": "成品舞",
			"url": "chengpinwu"
		}, {
			"name": "摩登舞",
			"url": "modeng"
		}, {
			"name": "现代舞",
			"url": "xiandaiwu"
		}, {
			"name": "古典舞",
			"url": "gudianwu"
		}, {
			"name": "交谊舞",
			"url": "jiaoyiwu"
		}]
	}, {
		"name": "瑜伽",
		"child": [{
			"name": "瑜伽",
			"url": "yuga"
		}]
	}, {
		"name": "乐器",
		"child": [{
			"name": "全部",
			"url": "yueqi"
		}, {
			"name": "古筝",
			"url": "guzheng"
		}, {
			"name": "钢琴",
			"url": "gangqin"
		}, {
			"name": "吉他贝司",
			"url": "jita"
		}, {
			"name": "小提琴",
			"url": "xiaotiqin"
		}, {
			"name": "二胡",
			"url": "erhu"
		}, {
			"name": "萨克斯",
			"url": "sakesi"
		}, {
			"name": "笛子",
			"url": "dizi"
		}, {
			"name": "电子琴",
			"url": "dianziqin"
		}, {
			"name": "古琴",
			"url": "guqin"
		}, {
			"name": "架子鼓",
			"url": "jiazigu"
		}, {
			"name": "电子鼓",
			"url": "dianzigu"
		}, {
			"name": "琵琶",
			"url": "pipa"
		}, {
			"name": "葫芦丝",
			"url": "hulusi"
		}, {
			"name": "扬琴",
			"url": "yangqin"
		}, {
			"name": "小号",
			"url": "xiaohao"
		}, {
			"name": "双排键",
			"url": "shuangpaijian"
		}, {
			"name": "快板",
			"url": "kuaiban"
		}, {
			"name": "口琴",
			"url": "kouqin"
		}, {
			"name": "单簧管",
			"url": "danhuangguan"
		}, {
			"name": "大提琴",
			"url": "datiqin"
		}, {
			"name": "手风琴",
			"url": "shoufengqin"
		}, {
			"name": "尤克里里",
			"url": "youke"
		}, {
			"name": "非洲鼓",
			"url": "feizhougu"
		}, {
			"name": "其它乐器",
			"url": "qitayueqi"
		}]
	}, {
		"name": "书法绘画",
		"child": [{
			"name": "全部",
			"url": "mspx"
		}, {
			"name": "少儿美术",
			"url": "semspx"
		}, {
			"name": "青少年美术",
			"url": "qsnmspx"
		}, {
			"name": "成人美术",
			"url": "crmspx"
		}, {
			"name": "书法",
			"url": "shufameishu"
		}]
	}, {
		"name": "体育竞技",
		"child": [{
			"name": "全部",
			"url": "caiyi"
		}, {
			"name": "竞技健身",
			"url": "jingjijianshen"
		}, {
			"name": "竞技/武术",
			"url": "jingjiwushu"
		}, {
			"name": "网球",
			"url": "wangqiu"
		}, {
			"name": "台球",
			"url": "taiqiu"
		}, {
			"name": "田径",
			"url": "tianjing"
		}, {
			"name": "篮球",
			"url": "lanqiu"
		}, {
			"name": "泰拳",
			"url": "taiquan"
		}, {
			"name": "跆拳道",
			"url": "taiquandao"
		}, {
			"name": "武术",
			"url": "wushu"
		}, {
			"name": "健身俱乐部",
			"url": "jianshenjulebu"
		}, {
			"name": "休闲体育",
			"url": "xiuxiantiyu"
		}, {
			"name": "户外活动",
			"url": "huwaihuodong"
		}, {
			"name": "拳击",
			"url": "quanji"
		}, {
			"name": "轮滑",
			"url": "lunhua"
		}, {
			"name": "游泳",
			"url": "youyong"
		}, {
			"name": "乒乓球",
			"url": "pingpangqiu"
		}, {
			"name": "球类",
			"url": "qiulei"
		}]
	}, {
		"name": "兴趣爱好",
		"child": [{
			"name": "全部",
			"url": "caiyi"
		}, {
			"name": "围棋",
			"url": "weiqi"
		}, {
			"name": "象棋",
			"url": "xiangqi"
		}, {
			"name": "国际象棋",
			"url": "guojixiangqi"
		}, {
			"name": "国际跳棋",
			"url": "guojitiaoqi"
		}, {
			"name": "模特",
			"url": "motepeixun"
		}, {
			"name": "礼仪",
			"url": "liyyipeixun"
		}, {
			"name": "潜能开发",
			"url": "qiannengkaifa"
		}, {
			"name": "DJ",
			"url": "djpeixun"
		}, {
			"name": "手工",
			"url": "shougong"
		}, {
			"name": "兴趣班",
			"url": "xingqu"
		}, {
			"name": "口才",
			"url": "koucai"
		}, {
			"name": "国学经典",
			"url": "guoxue"
		}, {
			"name": "花艺",
			"url": "huayipeixun"
		}, {
			"name": "茶艺",
			"url": "chayi"
		}, {
			"name": "飞行员",
			"url": "feixingyuan"
		}, {
			"name": "声乐/唱歌",
			"url": "shengyue"
		}]
	}, {
		"name": "科技",
		"child": [{
			"name": "无人机",
			"url": "wurenji"
		}, {
			"name": "少儿编程",
			"url": "sebiancheng"
		}, {
			"name": "3D打印",
			"url": "3ddayinpx"
		}, {
			"name": "机器人",
			"url": "jiqiren"
		}]
	}]
}, {
	"name": "职场提升",
	"code": 500003,
	"child": [{
		"name": "学历教育",
		"child": [{
			"name": "全部",
			"url": "xueli"
		}, {
			"name": "远程教育",
			"url": "yuanchengjiaoyu"
		}, {
			"name": "学历认证",
			"url": "xueliren"
		}, {
			"name": "成人高考",
			"url": "chengrengaokao"
		}, {
			"name": "考研",
			"url": "kaoyan"
		}, {
			"name": "在职研究生",
			"url": "yanjiusheng"
		}, {
			"name": "普通专升本",
			"url": "puzhuansheng"
		}, {
			"name": "自学考试",
			"url": "zixuekaoshi"
		}, {
			"name": "MBA",
			"url": "mbakaoshi"
		}]
	}, {
		"name": "企业管理",
		"child": [{
			"name": "企业团训",
			"url": "yingyutuanxun"
		}, {
			"name": "企业法律顾问",
			"url": "falvguwen"
		}, {
			"name": "企业师",
			"url": "peixunshi"
		}, {
			"name": "企业财务管理",
			"url": "qycwgl"
		}, {
			"name": "企业内训",
			"url": "qynx"
		}]
	}, {
		"name": "拓展训练",
		"child": [{
			"name": "拓展训练",
			"url": "tuozhan"
		}]
	}]
}]

// 省份
let provinceArr = [{
		"id": 913,
		"code": "100011",
		"ename": "beijing",
		"name": "北京",
		"xu": 266
	},
	{
		"id": 914,
		"code": "100012",
		"ename": "tianjin",
		"name": "天津",
		"xu": 265
	},
	{
		"id": 915,
		"code": "100013",
		"ename": "hebei",
		"name": "河北",
		"xu": 264
	},
	{
		"id": 916,
		"code": "100014",
		"ename": "shanxi",
		"name": "山西",
		"xu": 263
	},
	{
		"id": 917,
		"code": "100015",
		"ename": "namengguzizhi",
		"name": "内蒙古",
		"xu": 262
	},
	{
		"id": 918,
		"code": "100021",
		"ename": "liaoning",
		"name": "辽宁",
		"xu": 261
	},
	{
		"id": 919,
		"code": "100022",
		"ename": "jilin",
		"name": "吉林",
		"xu": 260
	},
	{
		"id": 920,
		"code": "100023",
		"ename": "heilongjiang",
		"name": "黑龙江",
		"xu": 259
	},
	{
		"id": 927,
		"code": "100024",
		"ename": "shandong",
		"name": "山东",
		"xu": 258
	},
	{
		"id": 921,
		"code": "100031",
		"ename": "shanghai",
		"name": "上海",
		"xu": 257
	},
	{
		"id": 922,
		"code": "100032",
		"ename": "jiangsu",
		"name": "江苏",
		"xu": 256
	},
	{
		"id": 923,
		"code": "100033",
		"ename": "zhejiang",
		"name": "浙江",
		"xu": 255
	},
	{
		"id": 924,
		"code": "100034",
		"ename": "anhui",
		"name": "安徽",
		"xu": 254
	},
	{
		"id": 925,
		"code": "100035",
		"ename": "fujian",
		"name": "福建",
		"xu": 253
	},
	{
		"id": 926,
		"code": "100036",
		"ename": "jiangxi",
		"name": "江西",
		"xu": 252
	},
	{
		"id": 928,
		"code": "100041",
		"ename": "henan",
		"name": "河南",
		"xu": 251
	},
	{
		"id": 929,
		"code": "100042",
		"ename": "hubei",
		"name": "湖北",
		"xu": 250
	},
	{
		"id": 930,
		"code": "100043",
		"ename": "hunan",
		"name": "湖南",
		"xu": 249
	},
	{
		"id": 931,
		"code": "100044",
		"ename": "guangdong",
		"name": "广东",
		"xu": 248
	},
	{
		"id": 932,
		"code": "100045",
		"ename": "guangxizhuangzuzizhi",
		"name": "广西",
		"xu": 247
	},
	{
		"id": 933,
		"code": "100046",
		"ename": "hainan",
		"name": "海南",
		"xu": 246
	},
	{
		"id": 934,
		"code": "100050",
		"ename": "chongqing",
		"name": "重庆",
		"xu": 245
	},
	{
		"id": 935,
		"code": "100051",
		"ename": "sichuan",
		"name": "四川",
		"xu": 244
	},
	{
		"id": 936,
		"code": "100052",
		"ename": "guizhou",
		"name": "贵州",
		"xu": 243
	},
	{
		"id": 937,
		"code": "100053",
		"ename": "yunnan",
		"name": "云南",
		"xu": 242
	},
	{
		"id": 939,
		"code": "100061",
		"ename": "shanxi",
		"name": "陕西",
		"xu": 240
	},
	{
		"id": 940,
		"code": "100062",
		"ename": "gansu",
		"name": "甘肃",
		"xu": 239
	},
	{
		"id": 941,
		"code": "100063",
		"ename": "qinghai",
		"name": "青海",
		"xu": 238
	},
	{
		"id": 942,
		"code": "100064",
		"ename": "ningxiahuizuzizhi",
		"name": "宁夏",
		"xu": 237
	},
	{
		"id": 943,
		"code": "100065",
		"ename": "xinjiangweiwuerzizhi",
		"name": "新疆",
		"xu": 236
	}
]

// 市
let cityArr = [{
		"id": 947,
		"code": "100011001",
		"ename": "bj",
		"pinyin": "beijing",
		"name": "北京",
		"hot": "True",
		"xu": 1
	},
	{
		"id": 1021,
		"code": "100031001",
		"ename": "sh",
		"pinyin": "shanghai",
		"name": "上海",
		"hot": "True",
		"xu": 2
	},
	{
		"id": 1146,
		"code": "100044001",
		"ename": "gz",
		"pinyin": "guangzhou",
		"name": "广州",
		"hot": "True",
		"xu": 3
	},
	{
		"id": 949,
		"code": "100012001",
		"ename": "tj",
		"pinyin": "tianjin",
		"name": "天津",
		"hot": "True",
		"xu": 4
	},
	{
		"id": 1184,
		"code": "100050001",
		"ename": "cq",
		"pinyin": "chongqing",
		"name": "重庆",
		"hot": "True",
		"xu": 6
	},
	{
		"id": 322,
		"code": "100024001",
		"ename": "jn",
		"pinyin": "jinan",
		"name": "济南",
		"hot": "True",
		"xu": 10
	},
	{
		"id": 1036,
		"code": "100033001",
		"ename": "hz",
		"pinyin": "hangzhou",
		"name": "杭州",
		"hot": "True",
		"xu": 15
	},
	{
		"id": 1085,
		"code": "100024002",
		"ename": "qd",
		"pinyin": "qingdao",
		"name": "青岛",
		"hot": "True",
		"xu": 20
	},
	{
		"id": 1101,
		"code": "100041001",
		"ename": "zz",
		"pinyin": "zhengzhou",
		"name": "郑州",
		"hot": "True",
		"xu": 50
	},
	{
		"id": 951,
		"code": "100013001",
		"ename": "sjz",
		"pinyin": "shijiazhuang",
		"name": "石家庄",
		"hot": "True",
		"xu": 60
	},
	{
		"id": 1240,
		"code": "100061001",
		"ename": "xa",
		"pinyin": "xian",
		"name": "西安",
		"hot": "True",
		"xu": 70
	},
	{
		"id": 1027,
		"code": "100032005",
		"ename": "su",
		"pinyin": "suzhou",
		"name": "苏州",
		"hot": "True",
		"xu": 80
	},
	{
		"id": 985,
		"code": "100021001",
		"ename": "sy",
		"pinyin": "shenyang",
		"name": "沈阳",
		"hot": "True",
		"xu": 1000
	},
	{
		"id": 986,
		"code": "100021002",
		"ename": "dl",
		"pinyin": "dalian",
		"name": "大连",
		"hot": "True",
		"xu": 1000
	},
	{
		"id": 1023,
		"code": "100032001",
		"ename": "nj",
		"pinyin": "nanjing",
		"name": "南京",
		"hot": "True",
		"xu": 1000
	},
	{
		"id": 1187,
		"code": "100051001",
		"ename": "cd",
		"pinyin": "chengdou",
		"name": "成都",
		"hot": "True",
		"xu": 1000
	},
	{
		"id": 1118,
		"code": "100042001",
		"ename": "wh",
		"pinyin": "wuhan",
		"name": "武汉",
		"hot": "True",
		"xu": 1000
	},
	{
		"id": 1089,
		"code": "100024006",
		"ename": "yt",
		"pinyin": "yantai",
		"name": "烟台",
		"hot": "False",
		"xu": 2300
	},
	{
		"id": 1090,
		"code": "100024007",
		"ename": "wf",
		"pinyin": "weifang",
		"name": "潍坊",
		"hot": "False",
		"xu": 2400
	},
	{
		"id": 1024,
		"code": "100032002",
		"ename": "wux",
		"pinyin": "wuxi",
		"name": "无锡",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 987,
		"code": "100021003",
		"ename": "as",
		"pinyin": "anshan",
		"name": "鞍山",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 988,
		"code": "100021004",
		"ename": "fus",
		"pinyin": "fushun",
		"name": "抚顺",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 962,
		"code": "100014001",
		"ename": "ty",
		"pinyin": "taiyuan",
		"name": "太原",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 973,
		"code": "100015001",
		"ename": "hhht",
		"pinyin": "huhehaote",
		"name": "呼和浩特",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 999,
		"code": "100022001",
		"ename": "cc",
		"pinyin": "changchun",
		"name": "长春",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 1008,
		"code": "100023001",
		"ename": "hrb",
		"pinyin": "haerbin",
		"name": "哈尔滨",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 1013,
		"code": "100023006",
		"ename": "dq",
		"pinyin": "daqing",
		"name": "大庆",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 952,
		"code": "100013002",
		"ename": "ts",
		"pinyin": "tangshan",
		"name": "唐山",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 956,
		"code": "100013006",
		"ename": "bd",
		"pinyin": "baoding",
		"name": "保定",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 960,
		"code": "100013010",
		"ename": "lf",
		"pinyin": "langfang",
		"name": "廊坊",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 1028,
		"code": "100032006",
		"ename": "nt",
		"pinyin": "nantong",
		"name": "南通",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 1031,
		"code": "100032009",
		"ename": "yancheng",
		"pinyin": "yancheng",
		"name": "盐城",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 1033,
		"code": "100032011",
		"ename": "zj",
		"pinyin": "zhenjiang",
		"name": "镇江",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 1034,
		"code": "100032012",
		"ename": "taizhou",
		"pinyin": "taizhou",
		"name": "泰州",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 1037,
		"code": "100033002",
		"ename": "nb",
		"pinyin": "ningbo",
		"name": "宁波",
		"hot": "True",
		"xu": 6000
	},
	{
		"id": 1038,
		"code": "100033003",
		"ename": "wz",
		"pinyin": "wenzhou",
		"name": "温州",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 1088,
		"code": "100024005",
		"ename": "dy",
		"pinyin": "dongying",
		"name": "东营",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 1026,
		"code": "100032004",
		"ename": "cz",
		"pinyin": "changzhou",
		"name": "常州",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 1041,
		"code": "100033006",
		"ename": "sx",
		"pinyin": "shaoxing",
		"name": "绍兴",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 1042,
		"code": "100033007",
		"ename": "jh",
		"pinyin": "jinhua",
		"name": "金华",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 1051,
		"code": "100034005",
		"ename": "mas",
		"pinyin": "maanshan",
		"name": "马鞍山",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 1054,
		"code": "100034008",
		"ename": "anqing",
		"pinyin": "anqing",
		"name": "安庆",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 1045,
		"code": "100033010",
		"ename": "tz",
		"pinyin": "taizhou",
		"name": "台州",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 1047,
		"code": "100034001",
		"ename": "hf",
		"pinyin": "hefei",
		"name": "合肥",
		"hot": "True",
		"xu": 6000
	},
	{
		"id": 1048,
		"code": "100034002",
		"ename": "wuhu",
		"pinyin": "wuhu",
		"name": "芜湖",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 1049,
		"code": "100034003",
		"ename": "bengbu",
		"pinyin": "bangbu",
		"name": "蚌埠",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 1064,
		"code": "100035001",
		"ename": "fz",
		"pinyin": "fuzhou",
		"name": "福州",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 1065,
		"code": "100035002",
		"ename": "xm",
		"pinyin": "xiamen",
		"name": "厦门",
		"hot": "True",
		"xu": 6000
	},
	{
		"id": 1121,
		"code": "100042005",
		"ename": "yc",
		"pinyin": "yichang",
		"name": "宜昌",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 1122,
		"code": "100042006",
		"ename": "xiangyang",
		"pinyin": "xiangfan",
		"name": "襄阳",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 1132,
		"code": "100043001",
		"ename": "cs",
		"pinyin": "changsha",
		"name": "长沙",
		"hot": "True",
		"xu": 6000
	},
	{
		"id": 1133,
		"code": "100043002",
		"ename": "zhuzhou",
		"pinyin": "zhuzhou",
		"name": "株洲",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 1135,
		"code": "100043004",
		"ename": "hy",
		"pinyin": "hengyang",
		"name": "衡阳",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 1137,
		"code": "100043006",
		"ename": "yy",
		"pinyin": "yueyang",
		"name": "岳阳",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 1103,
		"code": "100041003",
		"ename": "luoyang",
		"pinyin": "luoyang",
		"name": "洛阳",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 1073,
		"code": "100036001",
		"ename": "nc",
		"pinyin": "nanchang",
		"name": "南昌",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 1076,
		"code": "100036004",
		"ename": "jj",
		"pinyin": "jiujiang",
		"name": "九江",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 1079,
		"code": "100036007",
		"ename": "ganzhou",
		"pinyin": "ganzhou",
		"name": "赣州",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 1148,
		"code": "100044003",
		"ename": "sz",
		"pinyin": "shenzhen",
		"name": "深圳",
		"hot": "True",
		"xu": 6000
	},
	{
		"id": 1149,
		"code": "100044004",
		"ename": "zh",
		"pinyin": "zhuhai",
		"name": "珠海",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 1151,
		"code": "100044006",
		"ename": "fs",
		"pinyin": "foshan",
		"name": "佛山",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 1156,
		"code": "100044013",
		"ename": "hzh",
		"pinyin": "huizhou",
		"name": "惠州",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 1162,
		"code": "100044019",
		"ename": "dg",
		"pinyin": "dongwan",
		"name": "东莞",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 1192,
		"code": "100051007",
		"ename": "mianyang",
		"pinyin": "mianyang",
		"name": "绵阳",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 1208,
		"code": "100052001",
		"ename": "gy",
		"pinyin": "guiyang",
		"name": "贵阳",
		"hot": "True",
		"xu": 6000
	},
	{
		"id": 1217,
		"code": "100053001",
		"ename": "km",
		"pinyin": "kunming",
		"name": "昆明",
		"hot": "True",
		"xu": 6000
	},
	{
		"id": 1167,
		"code": "100045001",
		"ename": "nn",
		"pinyin": "nanning",
		"name": "南宁",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 1247,
		"code": "100061008",
		"ename": "yl",
		"pinyin": "yulin",
		"name": "榆林",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 1250,
		"code": "100062001",
		"ename": "lz",
		"pinyin": "lanzhou",
		"name": "兰州",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 1264,
		"code": "100063001",
		"ename": "xn",
		"pinyin": "xining",
		"name": "西宁",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 1272,
		"code": "100064001",
		"ename": "yinchuan",
		"pinyin": "yinchuan",
		"name": "银川",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 13636,
		"code": "100032019",
		"ename": "kunshan",
		"pinyin": "ks",
		"name": "昆山",
		"hot": "False",
		"xu": 6000
	},
	{
		"id": 1277,
		"code": "100065001",
		"ename": "xj",
		"pinyin": "wulumuqi",
		"name": "乌鲁木齐",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1168,
		"code": "100045002",
		"ename": "liuzhou",
		"pinyin": "liuzhou",
		"name": "柳州",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1169,
		"code": "100045003",
		"ename": "gl",
		"pinyin": "guilin",
		"name": "桂林",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1181,
		"code": "100046001",
		"ename": "haikou",
		"pinyin": "haikou",
		"name": "海口",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1163,
		"code": "100044020",
		"ename": "zs",
		"pinyin": "zhongshan",
		"name": "中山",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1165,
		"code": "100044052",
		"ename": "jy",
		"pinyin": "jieyang",
		"name": "揭阳",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1157,
		"code": "100044014",
		"ename": "mz",
		"pinyin": "meizhou",
		"name": "梅州",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1161,
		"code": "100044018",
		"ename": "qingyuan",
		"pinyin": "qingyuan",
		"name": "清远",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1152,
		"code": "100044007",
		"ename": "jm",
		"pinyin": "jiangmen",
		"name": "江门",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1153,
		"code": "100044008",
		"ename": "zhanjiang",
		"pinyin": "zhanjiang",
		"name": "湛江",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1154,
		"code": "100044009",
		"ename": "mm",
		"pinyin": "maoming",
		"name": "茂名",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1155,
		"code": "100044012",
		"ename": "zq",
		"pinyin": "zhaoqing",
		"name": "肇庆",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1150,
		"code": "100044005",
		"ename": "st",
		"pinyin": "shantou",
		"name": "汕头",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1147,
		"code": "100044002",
		"ename": "sg",
		"pinyin": "shaoguan",
		"name": "韶关",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1102,
		"code": "100041002",
		"ename": "kaifeng",
		"pinyin": "kaifeng",
		"name": "开封",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1104,
		"code": "100041004",
		"ename": "pds",
		"pinyin": "pingdingshan",
		"name": "平顶山",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1105,
		"code": "100041005",
		"ename": "ay",
		"pinyin": "anyang",
		"name": "安阳",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1106,
		"code": "100041006",
		"ename": "hb",
		"pinyin": "hebi",
		"name": "鹤壁",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1107,
		"code": "100041007",
		"ename": "xx",
		"pinyin": "xinxiang",
		"name": "新乡",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1108,
		"code": "100041008",
		"ename": "jiaozuo",
		"pinyin": "jiaozuo",
		"name": "焦作",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1109,
		"code": "100041009",
		"ename": "puyang",
		"pinyin": "puyang",
		"name": "濮阳",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1110,
		"code": "100041010",
		"ename": "xc",
		"pinyin": "xuchang",
		"name": "许昌",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1111,
		"code": "100041011",
		"ename": "luohe",
		"pinyin": "luohe",
		"name": "漯河",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1112,
		"code": "100041012",
		"ename": "smx",
		"pinyin": "sanmenxia",
		"name": "三门峡",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1113,
		"code": "100041013",
		"ename": "ny",
		"pinyin": "nanyang",
		"name": "南阳",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1114,
		"code": "100041014",
		"ename": "sq",
		"pinyin": "shangqiu",
		"name": "商丘",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1115,
		"code": "100041015",
		"ename": "xy",
		"pinyin": "xinyang",
		"name": "信阳",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1116,
		"code": "100041016",
		"ename": "zk",
		"pinyin": "zhoukou",
		"name": "周口",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1117,
		"code": "100041017",
		"ename": "zmd",
		"pinyin": "zhumadian",
		"name": "驻马店",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1138,
		"code": "100043007",
		"ename": "changde",
		"pinyin": "changde",
		"name": "常德",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1141,
		"code": "100043010",
		"ename": "chenzhou",
		"pinyin": "chenzhou",
		"name": "郴州",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1066,
		"code": "100035003",
		"ename": "pt",
		"pinyin": "putian",
		"name": "莆田",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1068,
		"code": "100035005",
		"ename": "qz",
		"pinyin": "quanzhou",
		"name": "泉州",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1069,
		"code": "100035006",
		"ename": "zhangzhou",
		"pinyin": "zhangzhou",
		"name": "漳州",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1071,
		"code": "100035008",
		"ename": "ly",
		"pinyin": "longyan",
		"name": "龙岩",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1050,
		"code": "100034004",
		"ename": "hn",
		"pinyin": "huainan",
		"name": "淮南",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1055,
		"code": "100034010",
		"ename": "huangshan",
		"pinyin": "huangshan",
		"name": "黄山",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1056,
		"code": "100034011",
		"ename": "chuzhou",
		"pinyin": "chuzhou",
		"name": "滁州",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1057,
		"code": "100034012",
		"ename": "fy",
		"pinyin": "fuyang",
		"name": "阜阳",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1058,
		"code": "100034013",
		"ename": "suzhou",
		"pinyin": "suzhou",
		"name": "宿州",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1060,
		"code": "100034015",
		"ename": "la",
		"pinyin": "liuan",
		"name": "六安",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1063,
		"code": "100034018",
		"ename": "xuancheng",
		"pinyin": "xuancheng",
		"name": "宣城",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1043,
		"code": "100033008",
		"ename": "quzhou",
		"pinyin": "quzhou",
		"name": "衢州",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1039,
		"code": "100033004",
		"ename": "jx",
		"pinyin": "jiaxing",
		"name": "嘉兴",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1040,
		"code": "100033005",
		"ename": "huzhou",
		"pinyin": "huzhou",
		"name": "湖州",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1035,
		"code": "100032013",
		"ename": "suqian",
		"pinyin": "suqian",
		"name": "宿迁",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1029,
		"code": "100032007",
		"ename": "lyg",
		"pinyin": "lianyungang",
		"name": "连云港",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1030,
		"code": "100032008",
		"ename": "ha",
		"pinyin": "huaian",
		"name": "淮安",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 961,
		"code": "100013011",
		"ename": "hs",
		"pinyin": "hengshui",
		"name": "衡水",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 957,
		"code": "100013007",
		"ename": "zjk",
		"pinyin": "zhangjiakou",
		"name": "张家口",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 958,
		"code": "100013008",
		"ename": "chengde",
		"pinyin": "chengde",
		"name": "承德",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 953,
		"code": "100013003",
		"ename": "qhd",
		"pinyin": "qinhuangdao",
		"name": "秦皇岛",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 954,
		"code": "100013004",
		"ename": "hd",
		"pinyin": "handan",
		"name": "邯郸",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 955,
		"code": "100013005",
		"ename": "xt",
		"pinyin": "xingtai",
		"name": "邢台",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 978,
		"code": "100015006",
		"ename": "erds",
		"pinyin": "eerduosi",
		"name": "鄂尔多斯",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 991,
		"code": "100021007",
		"ename": "jinzhou",
		"pinyin": "jinzhou",
		"name": "锦州",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 992,
		"code": "100021008",
		"ename": "yk",
		"pinyin": "yingkou",
		"name": "营口",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 995,
		"code": "100021011",
		"ename": "pj",
		"pinyin": "panjin",
		"name": "盘锦",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1025,
		"code": "100032003",
		"ename": "xz",
		"pinyin": "xuzhou",
		"name": "徐州",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1086,
		"code": "100024003",
		"ename": "zb",
		"pinyin": "zibo",
		"name": "淄博",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1087,
		"code": "100024004",
		"ename": "zaozhuang",
		"pinyin": "zaozhuang",
		"name": "枣庄",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1091,
		"code": "100024008",
		"ename": "jining",
		"pinyin": "jining",
		"name": "济宁",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1092,
		"code": "100024009",
		"ename": "ta",
		"pinyin": "taian",
		"name": "泰安",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1093,
		"code": "100024010",
		"ename": "weihai",
		"pinyin": "weihai",
		"name": "威海",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1094,
		"code": "100024011",
		"ename": "rizhao",
		"pinyin": "rizhao",
		"name": "日照",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1095,
		"code": "100024012",
		"ename": "lw",
		"pinyin": "laiwu",
		"name": "莱芜",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1096,
		"code": "100024013",
		"ename": "linyi",
		"pinyin": "linyi",
		"name": "临沂",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1097,
		"code": "100024014",
		"ename": "dz",
		"pinyin": "dezhou",
		"name": "德州",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1098,
		"code": "100024015",
		"ename": "lc",
		"pinyin": "liaocheng",
		"name": "聊城",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1099,
		"code": "100024016",
		"ename": "bz",
		"pinyin": "binzhou",
		"name": "滨州",
		"hot": "False",
		"xu": 7000
	},
	{
		"id": 1100,
		"code": "100024017",
		"ename": "heze",
		"pinyin": "heze",
		"name": "菏泽",
		"hot": "False",
		"xu": 7000
	}
]

module.exports = {
	categoryArr,
	subclassArr,
	categoryGroup,
	provinceArr,
	cityArr,
}
