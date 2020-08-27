
var SI_HGLT_DSBRD = SI_HGLT_DSBRD || {};
window.fileVersion = 3.7;

(function () {
	var host=window.location.host;
	SI_HGLT_DSBRD.isLocal = ['sportz2:8079', '192.168.100.150:8079','192.168.100.150:9018'].indexOf(host) > -1;
	SI_HGLT_DSBRD.isMobile = (/iphone|ipod|android|nokia|blackberry|BB10|bada|tizen|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
	
	SI_HGLT_DSBRD.clientName = 'star';
	SI_HGLT_DSBRD.imagesPath = 'images/';
	SI_HGLT_DSBRD.isLive = ['star'].indexOf(host) > -1;
	SI_HGLT_DSBRD.feedBasePath = SI_HGLT_DSBRD.isLive ? '//':'//13.232.107.192:9003/';
	SI_HGLT_DSBRD.basePath = SI_HGLT_DSBRD.isLive ? '//assets-sixday.sportz.io/match-center/prod/v2':'';
	

	SI_HGLT_DSBRD.loadConfig = function(cb){
		var data="";
		var url=SI_HGLT_DSBRD.basePath+"json/config.json";
		var xobj = new XMLHttpRequest();
		xobj.overrideMimeType("application/json");
		xobj.open('GET', url, true); // Replace 'my_data' with the path to your file
		xobj.onreadystatechange = function () {
		//console.log("xobj.readyState--"+xobj.readyState)
		if (xobj.readyState == 4 && ([404, 200, 403].indexOf(xobj.status) > -1)) {
			if (xobj.status === 200) {
				data = JSON.parse(xobj.responseText);
				console.log(data);
			}
		}
	};
	xobj.send(null);

}
	SI_HGLT_DSBRD.loadConfig();
	
	SI_HGLT_DSBRD.loadData = function(dataUrl, callback) {
		$.ajax({
			url: dataUrl,
			method: 'GET',
			success: function(data){
				callback(data);
			}
		});
	}

	SI_HGLT_DSBRD.loadPostData = function(dataUrl, data, callback) {
		$.ajax({
			url: dataUrl,
			method: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(data),
			success: function(data){
				callback(data);
			}
		});
	}
	
	SI_HGLT_DSBRD.loadJsCssFiles = function (filesArr, loadCompleteCb) {
		loadCompleteCb = loadCompleteCb || function () { };
		SI_HGLT_DSBRD.loadJsCssFiles.fileList = SI_HGLT_DSBRD.loadJsCssFiles.fileList || {};
		if (!(filesArr && filesArr.length)) {
			loadCompleteCb();
			return;
		}
		var fileIndex = 0;

		function fnLoadFile() {
			var filePath = filesArr[fileIndex];
			if(!filePath)return
				var exts = filePath.split('.');
			exts = exts[exts.length - 1];
			exts = exts.split('?')[0];
			loadjscssfile(filePath, exts, function () {
				if (fileIndex == filesArr.length - 1) {
					loadCompleteCb();
					return;
				} else {
					fileIndex++;
					fnLoadFile();
				}
			});
		}
		function loadjscssfile(s, i, t) {
			if (s.indexOf('?') == -1) {
				s += '?v=' + window.fileVersion;
			}
			if (SI_HGLT_DSBRD.loadJsCssFiles.fileList[s]) {
				t();
				return;
			}
			if ("js" == i) {
				var a = window.document.createElement("script");
				a.onload = function () {
					SI_HGLT_DSBRD.loadJsCssFiles.fileList[s] = true;
					t();
				};
				a.onerror = function () {
					t();
				};
				a.src = s;
				window.document.getElementsByTagName("head")[0].appendChild(a);
			}
			if ("css" == i) {
				var e = window.document.createElement("link");
				e.setAttribute("rel", "stylesheet");
				e.setAttribute("type", "text/css");
				e.setAttribute("href", s);
				window.document.getElementsByTagName("head")[0].appendChild(e);
				SI_HGLT_DSBRD.loadJsCssFiles.fileList[s] = true;
				t();
			}
		}

		fnLoadFile();
	}; 	

	//SI_HGLT_DSBRD.loadConfig();
	

	var mainJsFile = 'js/main.js';
	var filesArr = [SI_HGLT_DSBRD.basePath+'css/main.css', SI_HGLT_DSBRD.basePath + 'scripts/jquery.min.js',SI_HGLT_DSBRD.basePath + 'scripts/swiper.min.js', SI_HGLT_DSBRD.basePath+mainJsFile
	];
	SI_HGLT_DSBRD.loadJsCssFiles(filesArr, function() {					
		SI_HGLT_DSBRD_MAIN.init();
	});

	SI_HGLT_DSBRD.SkeletonMkp = ""
})();

