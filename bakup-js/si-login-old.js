var SI_LOGIN = SI_LOGIN || {};

SI_LOGIN.init = function(mainContainer) {
	var logoImage = SI_HGLT_DSBRD.imagesPath + 'logoBig.png';
	SI_LOGIN.skeleton = '<div class="si-page-bg si-login__page"> <div class="si-main__container"> <div class="si-login__form"> <div class="si-login__left"></div><div class="si-login__Logo"> <img src="'+logoImage+'"> <span> <em class="si-text">Welcome To Highlights Dashboard</em></span> </div><div class="si-login__right"> <div class="si-login__head"> <span class="si-title">Login</span> <span class="si-subtitle">to your account</span> </div><div class="si-login__input"> <form action=""> <div class="si-username"> <input type="text" name="" id="username" placeholder="Username"> <div class="si-frm-errMsg"><span class="username-error" style="display:none">Please enter username.</span></div></div><div class="si-password"> <input  type="text" name="" id="password" placeholder="Password"> <div class="si-frm-errMsg"><span class="password-error" style="display:none">Please enter password</span></div></div><div class="si-forgetPass"> <a href="#">Forgotten Your Password ? </a> </div><div class="si-commonerror si-credential-error" style="display:none;"> <span>Invalid Credential </span> </div><div class="si-login__button"> <button type="button" class="si-btn2 si-login"> <span>Login</span> </button> </div></form> </div></div></div></div></div>';
	SI_LOGIN.printSkeleton(mainContainer)
	SI_LOGIN.bindEvents(mainContainer);
};
SI_LOGIN.printSkeleton = function(mainContainer) {
	mainContainer.html(SI_LOGIN.skeleton);
};
SI_LOGIN.bindEvents = function(mainContainer) {
	mainContainer.on('click', '.si-login', function(e) {
		e.stopPropagation();
		var username = $('#username').val();
		var password = $('#password').val();
		if(!username) {
			$('.username-error').show();
		} else {
			$('.username-error').hide();
		}
		if(!password) {
			$('.password-error').show();
		} else {
			$('.password-error').hide();
		}
		if(!username || !password) {
			return;
		}
		var loginUrl = SI_HGLT_DSBRD.feedBasePath + 'api/Login';
		var requestData = {
			 "userId": 0,
			 "userEmail": username,
			 "userPassword": password,
			 "newPassword": null,
			 "opType": 0
		}
		SI_HGLT_DSBRD.loadPostData(loginUrl,requestData, function(data) {
			var loginData = JSON.parse(data);
			if(loginData.ResponseStatus) {
				var userdata = loginData.ResponseData[0];
				document.cookie = 'siHiglightsDashboardLoggedInUser' + "=" + JSON.stringify(userdata) + ";" + '' + ";path=/";
				window.history.pushState("", "", "dashboard.html");
				$('.si-wrapper').removeClass('si-login-widget');
				$('.si-wrapper').addClass('si-highlight-widget');

				SI_HGLT_DSBRD_MAIN.init();
			} else {
				$('.si-credential-error').show();
			}
			console.log(loginData);

		});


		
	});

};