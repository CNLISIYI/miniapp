import tools from "./util.js";
const httpServer = (opts, data, tips, httpCb, loading) => {
	// op=getTransContent&timespan=' + Date.parse(new Date())/1000 + '&
	// let timeStamp = Date.parse(new Date())/1000;
	let opType = tips == "获取机构列表" ? "getComList" :  "getTransContent";
	// if(loading){
	// 	tools.loadingShow(tips+'...');
	// }
	uni.request({
		// url: opts.url + "&op="+ opType +"&timespan=" + timeStamp,
		url: opts.url + "&op="+ opType,
		data: {
			key: JSON.stringify(data)
		},
		method : opts.method,
		success: (res) => {
			// console.log(tips);
			// console.log(res.data);
			if(res && res.data){
				httpCb(res);	
			}else{
				tools.toastShow(tips+"失败");
				httpCb("error");
			}
		},
		fail : (res) => {
			// console.log("fail===" + JSON.stringify(res));
			tools.toastShow(tips+"失败");
			httpCb("error");
		},
		complete : () => {
			if(loading){
				tools.loadingHide();
			}
		}
	});
}

export default httpServer