
var SI_HGLT_DSBRD_MAIN = SI_HGLT_DSBRD_MAIN || {};

SI_HGLT_DSBRD_MAIN.init = function() {
	var checkIfLoggedIn = (document.cookie.match(/^(?:.*;)?\s*siHiglightsDashboardLoggedInUser\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1];
	if(window.location.href.indexOf('dashboard.html') > -1) {
		if(!checkIfLoggedIn) {
			window.history.pushState("", "", "login.html");
			$('.si-wrapper').removeClass('si-highlight-widget');
			$('.si-wrapper').addClass('si-login-widget');
			SI_HGLT_DSBRD_MAIN.init();
		} else {
			SI_HGLT_DSBRD.loggedInUser = (document.cookie.match(/^(?:.*;)?\s*siHiglightsDashboardLoggedInUser\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1];
			SI_HGLT_DSBRD.loggedInUserData = JSON.parse(SI_HGLT_DSBRD.loggedInUser);
			var filesArr = [SI_HGLT_DSBRD.basePath+'js/si-dashboard.js'];
			SI_HGLT_DSBRD.loadJsCssFiles(filesArr, function() {					
				SI_DASHBOARD.init($('.si-highlight-widget'));
			});
		}
	}
	if(window.location.href.indexOf('login.html') > -1) {
		if(checkIfLoggedIn) {
			window.history.pushState("", "", "dashboard.html");
			$('.si-wrapper').removeClass('si-login-widget');
			$('.si-wrapper').addClass('si-highlight-widget');
			SI_HGLT_DSBRD_MAIN.init();
		} else {
			var filesArr = [SI_HGLT_DSBRD.basePath+'js/si-login.js'];
			SI_HGLT_DSBRD.loadJsCssFiles(filesArr, function() {					
				SI_LOGIN.init($('.si-login-widget'));
			});
		}
		
	}
}

