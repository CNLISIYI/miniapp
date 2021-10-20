const HTMLDecode = str => { // HTML 标签反转义
	let temp = document.createElement( "div" );
	temp.innerHTML = str;
	let output = temp.innerText || temp.textContent;
	temp = null;
	return output;
}

const delHtmlTag = str => { // 去除字符串中的 HTML 标签
	let newStr = '';
	newStr = str.replace( /<[^>]+>/g, "" );
	newStr = newStr.replace( /&nbsp;/ig, "" );
	return newStr;
}

const escape2Html = str => { // HTML 标签反转义
	var arrEntities = {
		'lt': '<',
		'gt': '>',
		'nbsp': ' ',
		'amp': '&',
		'quot': '"',
		'apos': "'",
		'#39': "'",
		// &apos; 或 &#39;
	};
	return str.replace( /&(lt|gt|nbsp|amp|quot|apos|#39);/ig, function ( all, t ) {
		return arrEntities[ t ];
	} );
}

// 年/月/日 时:分:秒
const formatSecond = date => {
	var date = new Date( date )
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	return [ year, month, day ].map( formatNumber ).join( '/' ) + ' ' + [ hour, minute, second ].map( formatNumber ).join(
		':' )
}

// 年/月/日
const getDate = ( date, diff = 0 ) => {
	let dateStr = date.replace( /-/g, '/' );
	let newDate = new Date( dateStr )
	let year = newDate.getFullYear()
	let month = newDate.getMonth() + 1
	let day = newDate.getDate()

	if ( diff != 0 ) {
		let dayStamp = newDate.setDate( day + diff );
		year = new Date( dayStamp ).getFullYear();
		month = new Date( dayStamp ).getMonth() + 1;
		day = new Date( dayStamp ).getDate();
	}

	return [ year, month, day ].map( formatNumber ).join( '/' )
}

// date 0 补位
const formatNumber = n => {
	n = n.toString()
	return n[ 1 ] ? n : '0' + n
}

// 获取平台信息
const getPlatform = () => {
	let platform = uni.getSystemInfoSync().platform;
	return platform; // android、ios、devtools
}

// 提示
const toastShow = str => {
	setTimeout(function(){		
		uni.showToast({
			title: str,
			mask: true,
			icon: 'none',
			duration: 2000
		});
	},100)
}

// loading show
const loadingShow = ( str ) => {
	uni.showLoading( {
		title: str,
		mask: true
	} );
}

// loading hide
const loadingHide = () => {
	uni.hideLoading();
}

// storage
const setStorage = ( key, val ) => {
	uni.setStorage( {
		key: key,
		data: val,
		success: function () {
			// console.log( 'set success' );
		}
	} );
}
const getStorage = ( key, cb ) => {
	uni.getStorage( {
		key: key,
		success: function ( res ) {
			// console.log( 'get success' );
			cb( res );
		},
		fail: function ( res ) {
			// console.log( 'get fail' );
			cb( "error" );
		}
	} );
}

// 验证手机号
const checkPhoneNum = ( phone ) => {
	let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
	if ( !myreg.test( phone ) || phone == '' ) {
		return false;
	} else {
		return true;
	}
}


// ASCII 转换 Unicode
// AsciiToUnicode("·"); ==> &#183
const AsciiToUnicode = ( content ) => {
	let result = '';
	for ( var i = 0; i < content.length; i++ ) {
		result += '&#' + content.charCodeAt( i ) + ';';
	}
	return result;
}

// Unicode 转换 ASCII
// UnicodeToAscii("&#183;"); ==> ·
const UnicodeToAscii = ( content ) => {
	let contentCopy = content.replace(/&amp;/ig,'&');
	let code = contentCopy.match( /&#(\d+);/g ),
		result = '';
	if ( code && code.length > 0 ) {
		for ( var i = 0; i < code.length; i++ ) {
			let asciiStr = String.fromCharCode( code[ i ].replace( /[&#;]/g, '' ) );
			result = contentCopy.replace( new RegExp( code[ i ], 'g' ), asciiStr );
		}
		return result;
	} else {
		return contentCopy;
	}
}

// 图片预览
const imgPreview = (list, idx) => {
	// // console.log(list);
	// list：图片 url 数组
	if(list && list.length > 0){		
		uni.previewImage({
			current:list[idx],	//  传 Number H5端出现不兼容 
			// current:'0',
			urls: list
		});
	}
}

// 页面中转
const pageTransfer = (p1,p2) => {
	let pages = getCurrentPages();    //获取加载的页面
	let currentPage = pages[pages.length - 1];  //获取当前页面的对象
	let _url = currentPage.$page.fullPath;  //当前页面page路径
	// _url = _url.replace('/'+p1+'/', '../../'+p2+'/');
	_url = _url.replace(p1, '../../'+p2);
	uni.redirectTo({
		url: _url
	})
}


module.exports = {
	HTMLDecode,
	escape2Html,
	delHtmlTag,
	formatSecond,
	getDate,
	getPlatform,
	toastShow,
	loadingShow,
	loadingHide,
	setStorage,
	getStorage,
	checkPhoneNum,
	AsciiToUnicode,
	UnicodeToAscii,
	imgPreview,
	pageTransfer
}
