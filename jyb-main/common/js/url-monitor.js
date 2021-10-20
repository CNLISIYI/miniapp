import $ajax2 from "./http2";
import $api from "./apisetting.js";

// 老师详情页 获取 cityEname agencyEname
const getAgencyParam = async function(type, city, agency, id){
	let agencyId = await queryById(type, city, agency, id);
	let agencyObj = await getEnameByAgencyId(agencyId);
	return new Promise(resolve => {
        resolve({
			city: agencyObj.cityename,
			agency: agencyObj.comename
		});
    });
}

// 根据 机构ID 获取 机构英文名称
const getEnameByAgencyId = async function(id){
	return new Promise(resolve => {
        let ajaxUrl = $api.GetAgencyEname.url + "&key={comid:" + id + "}";
        $ajax2($api.GetAgencyEname, ajaxUrl, '获取机构英文名', function(res) {
        	if (res != 'error' && res.data.data && res.data.data.length > 0) {
				let obj = res.data.data[0];
					
				resolve(obj);
				return;
        	}
			uni.redirectTo({
				url: '/packageA/404/index'
			});
        }, false);
    });
}

// 根据 agency，查 city
const queryByAgency = async function(city, agency){
	console.log(city, agency);
	return new Promise(resolve => {
        let ajaxUrl = $api.GetAgencyDetail.url + "&key={comename:" + agency + "}";
        $ajax2($api.GetAgencyDetail, ajaxUrl, '获取机构详情', function(res) {
        	if (res != 'error' && res.data.data && res.data.data.length > 0) {
				let obj = res.data.data[0];
					
				resolve(obj.cityename);
				return;
        	}
			uni.redirectTo({
				url: '/packageA/404/index'
			});
        }, false);
    });
}

// 根据 id 查 agency
const queryById = async function(type, city, agency, id){
	let ajaxObj = {}, agencyId;
	switch (type){
		case "classDetail":
			ajaxObj = {
				ajaxApi: $api.GetAgencyClassDetail,
				ajaxUrl: $api.GetAgencyClassDetail.url + "&key={productid:" + id + "}"
			}
			break;
		case "teacherDetail":
			ajaxObj = {
				ajaxApi: $api.GetTeacherDetail,
				ajaxUrl: $api.GetTeacherDetail.url + "&key={teacherid:" + id + "}"
			}
			break;
		case "datasDetail":
			ajaxObj = {
				ajaxApi: $api.GetAgencyDatasDetail,
				ajaxUrl: $api.GetAgencyDatasDetail.url + "&key={knowledgeid:" + id + "}"
			}
			break;
		default:
			break;
	}
	
	return new Promise(resolve => {
        $ajax2(ajaxObj.ajaxApi, ajaxObj.ajaxUrl, '', function(res) {
			// 老师详情
			if(type == "teacherDetail"){
				if(res != 'error' && res.data.body){					
					let tObj = res.data.body;
					resolve(tObj.comid);
				}
				return;
			}
			// 课程详情
			if(type == "classDetail"){				
				if (res != 'error' && res.data.data && res.data.data.length > 0) {
					let cObj = res.data.data[0];
					resolve({
						city: cObj.cityename,
						agency: cObj.cp_ename
					});
					return;
				}
			}
			// 资料详情
			if(type == "datasDetail"){				
				if (res != 'error' && res.data.body) {
					let dObj = res.data.body;
					console.log(dObj);
					resolve({
						city: dObj.cominfo.cityename,
						agency: dObj.cominfo.ename
					});
					return;
				}
			}
			uni.redirectTo({
				url: '/packageA/404/index'
			});
        }, false);
    });
}

module.exports = {
	queryByAgency,
	queryById,
	getAgencyParam
}