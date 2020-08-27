var SI_DASHBOARD = SI_DASHBOARD || {};

SI_DASHBOARD.init = function(mainContainer) {
	SI_DASHBOARD.skeleton = '<div class="si-page-bg si-highlight"> <div class="si-header si-header-content"> </div><div class="si-bottombg"> <div class="si-drpwrpper si-dropdown-content"> <div class="si-drpDwn"> <label class="si-label si-sport-label">SPORT </label> <div class="si-drpDwn__value"> <select disabled="true"> <option>Cricket</option> </select> </div></div><div class="si-drpDwn"> <label class="si-label">SERIES </label> <div class="si-drpDwn__value"> <select disabled="true" id="si-series-label"> <option>Select</option> <option>Dropdown Value</option> </select> </div></div><div class="si-drpDwn"> <label class="si-label">Match </label> <div class="si-drpDwn__value"> <select id="match_options"> <option>Select</option> </select> </div></div></div><div class="si-tabwrp2 si-mobile-wrap" style="display:none"> <ul class="si-tab"> <li id="t1" class="highlight si-mobile-type-tabs active" data-tab="s3"> <a href="javscript:void(0)"><span>Highlight Events</span></a> </li><li id="t1" class="si-mobile-type-tabs" data-tab="s1"> <a href="javscript:void(0)"><span>On Field Events</span></a> </li><li id="t2" class="si-mobile-type-tabs" data-tab="s2"> <a href="javscript:void(0)"><span>Off Field Events</span></a> </li></ul> </div><div class="si-highlightwrp"> <div class="si-left si-left-highlight-cont" style="display:none"> <div class="tab"> <span>Highlight Events</span> </div><div class="si-inside-wrpper"> <div class="si-cover"> <label class="si-label">Type </label> <div class="si-drpDwn"> <div class="si-drpDwn__value"> <select id="highlightType"> <option value="">Highlight Type</option> <option value="1">Inning 1</option> <option value="2">Inning 2</option> <option value="3">Full Match</option> </select> </div></div></div><div class="si-cover"> <label class="si-label">Duration</label> <div class="si-drpDwn"> <div class="si-drpDwn__value"> <select id="highlightLength"> <option value="">Select</option> <option value="101">Optimal Clip</option> <option value="2">1-3 mins</option> <option value="4">3-5 mins</option> <option value="6">5-7 mins</option> <option value="8">7-9 mins</option> <option value="10">9-11 mins</option> <option value="12">11-13 mins</option> <option value="14">13-15 mins</option> <option value="16">15-17 mins</option> <option value="18">17-19 mins</option> <option value="20">19-21 mins</option> <option value="22">21-23 mins</option> <option value="24">23-25 mins</option> </select> </div></div></div></div><div class="si-tableContainer"> <div class="si-tbls"> <div class="si-tbls__head"> <div class="si-tbls__row"> <div class="si-tbls__cell si-eventname"> <span>Events</span> </div><div class="si-tbls__cell si-duration"> <span class="si-icon si-clock"></span> <span>Duration</span> </div></div></div><div class="si-tbls__body"> <div class="swiper-container swiper-contain3 "> <div class="swiper-wrapper si-swiper-tab3-content"> </div><div class="swiper-scrollbar swiper-scroll "> </div></div></div></div></div></div><div class="si-right si-right-highlight-cont"> <div class="si-maincover si-maincover-content"> </div></div></div></div></div>';
	SI_DASHBOARD.printSkeleton(mainContainer);
	SI_DASHBOARD.bindEvents(mainContainer);
	SI_DASHBOARD.loadHeaderContent(mainContainer);
	SI_DASHBOARD.loadMatches(mainContainer);
	SI_DASHBOARD.loadDataSkeleton(mainContainer);
	$('.si-maincover-content').hide();
};
SI_DASHBOARD.toSeconds = function (time_str) {
   if (time_str != null) {
       // Extract hours, minutes and seconds
       var parts = time_str.split(':');
       // compute  and return total seconds
       return parseInt(parts[0]) * 3600 + // an hour has 3600 seconds
           parseInt(parts[1]) * 60 + // a minute has 60 seconds
           +
           parseInt(parts[2]); // seconds
   }
   return 0;
};
SI_DASHBOARD.printSkeleton = function(mainContainer) {
	mainContainer.html(SI_DASHBOARD.skeleton);
};
SI_DASHBOARD.bindEvents = function(mainContainer) {
	mainContainer.on('click', '.si-event-tabs', function(e) {
		e.stopPropagation();
		mainContainer.find('.si-event-tabs').removeClass('active');
		$(this).addClass('active');
		var tabType = $(this).attr('data-tab');
		mainContainer.find('.si-tab-container-data').html('');
		if(tabType == 's1') {
			SI_DASHBOARD.loadTabHeader(mainContainer);
		} else if(tabType == 's3') {
			// SI_DASHBOARD.loadHighlightHeader(mainContainer);
		} else {
			SI_DASHBOARD.loadTab(mainContainer, tabType);
		}
	});
	mainContainer.on('click', '.si-mobile-type-tabs', function(e) {
		e.stopPropagation();
		if($(this).hasClass('active')) {
			return;
		} 
		$('.si-mobile-type-tabs').removeClass('active');
		$(this).addClass('active');
		$('.si-left-highlight-cont').hide();
		$('.si-right-highlight-cont').addClass('active');
		var tabType = $(this).attr('data-tab');
		// mainContainer.find('.si-tab-container-data').html('');
		if(tabType == 's1') {
			SI_DASHBOARD.loadTabHeader(mainContainer);
		} else if(tabType == 's3') {
			$('.si-left-highlight-cont').show();
			// SI_DASHBOARD.loadHighlightHeader(mainContainer);
		} else {
			SI_DASHBOARD.loadTab(mainContainer, tabType);
		}
	});
	mainContainer.on('change', '#match_options', function(e) {
		SI_DASHBOARD.mediaId = $( "#match_options option:selected" ).attr('data-mediaid');
		SI_DASHBOARD.matchmediaId = $( "#match_options option:selected" ).attr('data-matchmediaid');
		SI_DASHBOARD.matchglobalid = $( "#match_options option:selected" ).attr('data-matchglobalid');
		SI_DASHBOARD.seriesId = $( "#match_options option:selected" ).attr('data-series-id');
		$('.si-swiper-tab3-content').html('');
		if(SI_HGLT_DSBRD.isMobile) {
			$('.si-mobile-wrap').show();
		}
		if(SI_DASHBOARD.matchglobalid) {
			$('.si-maincover-content').show();
			$('.si-left-highlight-cont').show();
			$('#si-series-label').html('<option>'+SI_DASHBOARD.seriesId+'</option>');
			SI_DASHBOARD.loadHighlightHeader(mainContainer);
			mainContainer.find('.si-event-tabs[data-tab="s1"]').click();
			$('.si-left-highlight-cont').addClass('active');
		} else {
			$('.si-maincover-content').hide();
			$('.si-left-highlight-cont').hide();
		}
	});
	mainContainer.on('change', '#inningsSelect', function(e) {
		var inningsNumber = $( "#inningsSelect option:selected" ).val();
		SI_DASHBOARD.inningsNumber = inningsNumber;
		if(!SI_DASHBOARD.inningsNumber) {
			mainContainer.find('#overNumber').children().remove();
			mainContainer.find('#overNumber').html('<option>Select Over</option>');
			return;
		}
		var getOversUrl = SI_HGLT_DSBRD.feedBasePath + 'api/GetOvers/'+inningsNumber+'/'+ SI_DASHBOARD.matchmediaId;
		SI_HGLT_DSBRD.loadData(getOversUrl, function(data) {
			try {
				  	var overs = JSON.parse(data);
					var oversOptionsMkp = '<option>Select Option</option>'
					if(overs && overs.length) {
						for(var i = 0; i < overs.length; i++) {
							oversOptionsMkp += '<option value="'+overs[i].overnumber+'">Over '+overs[i].overnumber+'</option>'
						}
						mainContainer.find('#overNumber').html(oversOptionsMkp);
					}
				}
			catch(err) {
			  console.log(err);
			}
			
		});
	});
	mainContainer.on('change', '#overNumber', function(e) {
		var overNumber = $( "#overNumber option:selected" ).val();
		SI_DASHBOARD.overNumber = overNumber;
		SI_DASHBOARD.loadTab(mainContainer, 's1');
	});
	mainContainer.on('change', '#highlightType', function(e) {
		var highlightType = $( "#highlightType option:selected" ).val();
		SI_DASHBOARD.highlightType = highlightType;
		// SI_DASHBOARD.loadTab(mainContainer, 's1');
		if(SI_DASHBOARD.highlightType && SI_DASHBOARD.highlightLength){
			SI_DASHBOARD.loadTab(mainContainer, 's3');
		}
	});
	mainContainer.on('change', '#highlightLength', function(e) {
		var highlightLength = $( "#highlightLength option:selected" ).val();
		SI_DASHBOARD.highlightLength = highlightLength;
		// SI_DASHBOARD.loadTab(mainContainer, 's1');
		if(SI_DASHBOARD.highlightType && SI_DASHBOARD.highlightLength){
			SI_DASHBOARD.loadTab(mainContainer, 's3');
		}
	});

	mainContainer.on('click', '.si-plus.active', function(e) {
		$(this).removeClass('si-plus');
		$(this).addClass('si-minus');
		$(this).attr('data-ishighlight', 1);
	});
	mainContainer.on('click', '.si-close-message', function(e) {
		$('.si-saved-message').hide();
	});
	mainContainer.on('click', '.si-minus.active', function(e) {
		$(this).removeClass('si-minus');
		$(this).addClass('si-plus');
		$(this).attr('data-ishighlight', 0);
	});
	mainContainer.on('click', '.si-save', function(e) {
		SI_DASHBOARD.checkedEvents = [];
		var type = $(this).attr('data-savetabtype');
		var op_type = '';
		if(type == 's1') {
			op_type = 1;
		}
		if(type == 's2') {
			op_type = 2;
		}
		// [{"match_id":26526517,"s_id":"3358507","is_highlight" : 1,"op_type" : 1},{"match_id":26526517,"s_id":"3358508","is_highlight" : 1,"op_type" : 1}]
		console.log(type);
		console.log($('.si-plus.active').length);
		console.log($('.si-minus.active').length);
		if($('.si-plus.active').length) {
			$('.si-plus.active').each(function(i, obj) {
				var id = $(this).attr('id');
				var highlight = $(this).attr('data-ishighlight');

				var eventObj = {'match_id': SI_DASHBOARD.matchglobalid, 's_id': id, "is_highlight" : highlight,"op_type" : op_type}
				SI_DASHBOARD.checkedEvents.push(eventObj);

			});
		}
		if($('.si-minus.active').length) {
			$('.si-minus.active').each(function(i, obj) {
				var id = $(this).attr('id');
				var highlight = $(this).attr('data-ishighlight');

				var eventObj = {'match_id': SI_DASHBOARD.matchglobalid, 's_id': id, "is_highlight" : highlight,"op_type" : op_type}
				SI_DASHBOARD.checkedEvents.push(eventObj);

			});
		}
		
		var saveDataUrl = 'http://sade.sportz.io/services/DHDataService.svc/SaveIsHighlightsDashboard';
		// var saveDataUrl = 'http://192.168.101.1:8037/services/DHDataService.svc/SaveIsHighlightsDashboard';
		$.ajax({
			url: saveDataUrl,
			method: 'POST',
			contentType: 'text/plain',
			data: JSON.stringify(SI_DASHBOARD.checkedEvents),
			success: function(data){
				console.log(data);
				$('.si-saved-message').show();
				$('.si-message').text('Saved Successfully');
				setTimeout(function(){
				$('.si-saved-message').hide(); }, 2000);
			}
		});
		// SI_HGLT_DSBRD.loadPostData(saveDataUrl,SI_DASHBOARD.checkedEvents, function(data) {
			
			
		// });
		var totalHighlights = $('.si-rows-selected').length;
	});
	mainContainer.on('click', '.si-reset-selected', function(e) {
		if($('.si-minus.active').length) {
			$('.si-minus.active').each(function(i, obj) {
				$(this).removeClass('si-minus');
				$(this).addClass('si-plus');
				$(this).attr('data-ishighlight', 0);

			});

		}
	});
	mainContainer.on('click', '.si-logout', function(e) {
		document.cookie = "siHiglightsDashboardLoggedInUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		window.location.reload();
	});

};
SI_DASHBOARD.loadTabHeader = function(mainContainer) {
	var s1TabHeader = '';
	var inningsUrl = SI_HGLT_DSBRD.feedBasePath + 'api/FillInningsDropDown/'+ SI_DASHBOARD.matchmediaId;
	SI_HGLT_DSBRD.loadData(inningsUrl, function(data) {
		var innings = JSON.parse(data);
		SI_DASHBOARD.loadInningsOptions(mainContainer, innings);
	});
};
SI_DASHBOARD.loadHighlightHeader = function(mainContainer) {
	var highlightTabHeader = '<div id="tab3" class="" > <div class="si-inside-wrpper"> <div class="si-cover"> <label class="si-label">Type: </label> <div class="si-drpDwn"> <div class="si-drpDwn__value"> <select id="highlightType"> <option value="">Select Highlight Type</option> <option value="1">Inning 1</option> <option value="2">Inning 2</option> <option value="3">Full Match</option> </select> </div></div></div><div class="si-cover"> <label class="si-label">Duration: </label> <div class="si-drpDwn"> <div class="si-drpDwn__value"> <select id="highlightLength"> <option value="">Select</option> <option value="101">Optimal Clip</option> <option value="2">1-3 mins</option> <option value="4">3-5 mins</option> <option value="6">5-7 mins</option> <option value="8">7-9 mins</option> <option value="10">9-11 mins</option> <option value="12">11-13 mins</option> <option value="14">13-15 mins</option> <option value="16">15-17 mins</option> <option value="18">17-19 mins</option> <option value="20">19-21 mins</option> <option value="22">21-23 mins</option> <option value="24">23-25 mins</option> </select> </div></div></div></div><div class="si-wrapper"><div class="overlay si-loader">  <div class="loader"></div> </div> <div class="swiper-container swiper-contain3"> <div class="swiper-wrapper si-swiper-tab3-content"> </div><div class="swiper-scrollbar"></div></div></div></div>';
		mainContainer.find('.si-tab-container-data').html(highlightTabHeader);
		// mainContainer.find('#highlightType').val('3').change();
		mainContainer.find('#highlightType').val('3');
		SI_DASHBOARD.highlightType = 3;
		mainContainer.find('#highlightLength').val('101').change();
};

SI_DASHBOARD.loadInningsOptions = function(mainContainer, innings) {
	// if()
	var InningsOptionMkp = '<option value="">Select Inning</option>';
	for(var i = 0; i < innings.length; i++) {
		InningsOptionMkp += '<option value="'+innings[i]+'">Inning ' + innings[i]+'</option>'
	}
	var tabContentMkp = '<div id="tab1" class="" > <div class="si-inside-wrpper"> <div class="si-cover"> <label class="si-label">Innings: </label> <div class="si-drpDwn"> <div class="si-drpDwn__value"> <select id="inningsSelect"> '+InningsOptionMkp+' </select> </div></div></div><div class="si-cover"> <label class="si-label">Over No: </label> <div class="si-drpDwn"> <div class="si-drpDwn__value"> <select id="overNumber"> <option>Select Over</option> </select> </div></div></div></div><div class="si-wrapper"> <div class="overlay si-loader" style="display:none">  <div class="loader"></div> </div><div class="swiper-container swiper-contain1"> <div class="swiper-wrapper si-swiper-tab-content"> </div><div class="swiper-scrollbar"></div></div><!-- <div class="scrollbar" id="style-1"></div><div class="force-overflow"></div>--> </div></div>';
	mainContainer.find('.si-tab-container-data').html(tabContentMkp);
}

SI_DASHBOARD.loadTab = function(mainContainer, tabType) {
	var tabUrl = '';
	if(tabType == 's1') {
		tabUrl = SI_HGLT_DSBRD.feedBasePath + 'api/GetS1Tags';
		var data =  {
			"mediaId": SI_DASHBOARD.mediaId,
			"matchId": SI_DASHBOARD.matchglobalid ,
			"isMarker": 0,
			"clientId": 1,
			"filter1": SI_DASHBOARD.inningsNumber,
			"filter2": SI_DASHBOARD.overNumber
		}		
		// var requestData = JSON.stringify(data);
		var requestData = data;
		mainContainer.find('.si-loader').show();
		SI_HGLT_DSBRD.loadPostData(tabUrl,requestData, function(data) {
			mainContainer.find('.si-loader').hide();
			var tabData = JSON.parse(data);
			console.log(tabData);
			var tabDataMkp = '';
			console.log(tabData);



			if(tabData && tabData.length) {
				for (var i = 0 ; i < tabData.length; i ++) {
					/*calculate duration*/
					var difference = Math.abs(SI_DASHBOARD.toSeconds(tabData[i].markin_long) - SI_DASHBOARD.toSeconds(tabData[i].markout_long));
		           // format time differnece
		           var result = [
		               Math.floor(difference / 3600), // an hour has 3600 seconds
		               Math.floor((difference % 3600) / 60), // a minute has 60 seconds
		               difference % 60
		           ];
		           // 0 padding and concatation
		           result = result.map(function (v) {
		               return v < 10 ? '0' + v : v;
		           }).join(':');
					/*calculate duration*/
					var checked = "";
					var disabled = "";
					var activeCLass = "active";
					var siRemove = "si-plus";
					if(SI_HGLT_DSBRD.highlightsArray) {
						if (SI_HGLT_DSBRD.highlightsArray.indexOf(tabData[i].s_id.toString()) >	 -1 && tabData[i].is_highlight_moment == '0') {
							activeCLass = "";
						}
	                    if ((tabData[i].is_highlight_moment == '1' && SI_HGLT_DSBRD.highlightsArray.indexOf(tabData[i].s_id.toString()) > -1)) {
							siRemove = "si-minus";
						}
					} else {
						activeCLass = "";
					}
					
					// if ((tabData[i].is_highlight_moment == '1' && SI_HGLT_DSBRD.highlightsArray.indexOf(tabData[i].s_id.toString()) > -1)  || (tabData[i].is_highlight_moment == 'true' && SI_HGLT_DSBRD.highlightsArray.indexOf(tabData[i].s_id.toString()) > -1)) {
					// 	disabled='';
					// 	activeCLass='active';
					// 	siRemove = "si-minus";
					// }
					tabDataMkp += '<div class="si-clipitem swiper-slide '+activeCLass+'"> <div class="si-clipContent"> <div class="si-clipTop"> '+tabData[i].Description+' </div></div><span class="si-icon '+siRemove+' '+activeCLass+'" data-ishighlight="'+tabData[i].is_highlight_moment+'" id="'+tabData[i].s_id+'" data-savetabtype="s1"></span></div>';
				}
				mainContainer.find('.si-swiper-tab-content').html(tabDataMkp);
				if(!SI_HGLT_DSBRD.isMobile) {
					var swiper = new Swiper('.swiper-contain1', {
				        direction: 'vertical',
				        slidesPerView: 'auto',
				        freeMode: true,
				        scrollbar: {
				        el: '.swiper-scrollbar',
				        },
				        mousewheel: true,
					}); 
				}
				
				if($('.si-btn-wrapper').length) {
					$('.si-btn-wrapper').remove();
				}
				var bottomMkp = '<div class="si-btnwrapper si-btn-wrapper">  <div class="si-save" data-savetabtype="s1">Save</div>  <div class="si-reset si-reset-selected">Reset</div> </div>';
				mainContainer.find('.si-tab-container-data').append(bottomMkp);
			} else {
				tabDataMkp = '<div class="si-nodata">No Data Avaialable</div>';
				mainContainer.find('.si-swiper-tab-content').html(tabDataMkp);
			}
			
		});
	}
	if(tabType == 's3') {
		tabUrl = SI_HGLT_DSBRD.feedBasePath + 'api/GetAllMarkerTags';
		var data =  {"duration" :SI_DASHBOARD.highlightLength,"highlightType" :SI_DASHBOARD.highlightType,"matchId" :SI_DASHBOARD.matchglobalid,"sportId":1}	
		// var requestData = JSON.stringify(data);
		var requestData = data;
		console.log('nointerval', requestData)
		// mainContainer.find('.si-loader').show();
		clearInterval(SI_DASHBOARD.updateMarkersInterval);
		SI_HGLT_DSBRD.loadPostData(tabUrl,requestData, function(data) {
			mainContainer.find('.si-loader').hide();
			SI_HGLT_DSBRD.highlightsArray = []; 
			var tabData = JSON.parse(data);
			tabData = tabData.data;
			console.log(tabData);
			var tabDataMkp = '';
			if(tabData && tabData.length) {
				for (var i = 0 ; i < tabData.length; i ++) {
					/*calculate duration*/
					var difference = Math.abs(SI_DASHBOARD.toSeconds(tabData[i].markin_short) - SI_DASHBOARD.toSeconds(tabData[i].markout_short));
		           // format time differnece
		           var result = [
		               Math.floor(difference / 3600), // an hour has 3600 seconds
		               Math.floor((difference % 3600) / 60), // a minute has 60 seconds
		               difference % 60
		           ];
		           // 0 padding and concatation
		           result = result.map(function (v) {
		               return v < 10 ? '0' + v : v;
		           }).join(':');
					/*calculate duration*/
					SI_HGLT_DSBRD.highlightsArray.push(tabData[i].s_id)
					// tabDataMkp += '<div class="si-clipitem swiper-slide"> <div class="si-clipContent"> <div class="si-clipTop"><p class="si-clipDesc">'+tabData[i].Description+'</p></div><div class="si-clipBot"> <p class="clipDuration"><span class="meta-value si-meta-time si-icon">'+result+'</span></p></div></div><div class="form-group">  </div></div></div>';
					tabDataMkp += '<div class="si-tbls__row swiper-slide"> <div class="si-tbls__cell si-eventname"> <span>'+tabData[i].Description+'</span> </div><div class="si-tbls__cell si-duration"> <span>'+result+'</span> </div></div>';
				} 
				mainContainer.find('.si-loader').hide();
				mainContainer.find('.si-swiper-tab3-content').html(tabDataMkp);
				if(!SI_HGLT_DSBRD.isMobile) {
					// SI_DASHBOARD.s3swiper = new Swiper('.swiper-contain3', {
				 //        direction: 'vertical',
				 //        slidesPerView: 'auto',
				 //        freeMode: true,
				 //        scrollbar: {
				 //        el: '.swiper-scrollbar',
				 //        },
				 //        mousewheel: true,
					// }); 
				}
				// var bottomMkp = '<div class="si-btnwrapper">  <div class="si-save">Save</div>  <div class="si-reset">Reset</div> </div>';
				// mainContainer.find('.si-tab-container-data').append(bottomMkp);
			} else {
				tabDataMkp = '<div class="si-nodata">Data Not Avaialable</div>';
				mainContainer.find('.si-swiper-tab3-content').html(tabDataMkp);
			}
			

		});

		SI_DASHBOARD.updateMarkersInterval = setInterval(function(){
			if(!SI_DASHBOARD.s3swiper) {
				return;
			}
			console.log('interval', requestData)
		 	SI_HGLT_DSBRD.loadPostData(tabUrl,requestData, function(data) {	 
				try {
					mainContainer.find('.si-loader').hide();
					SI_HGLT_DSBRD.highlightsArray = [];
					var tabData = JSON.parse(data);
					tabData = tabData.data;
					console.log(tabData);
					var tabDataMkp = '';
					if(tabData && tabData.length) {
						for (var i = 0 ; i < tabData.length; i ++) {
							/*calculate duration*/
							var difference = Math.abs(SI_DASHBOARD.toSeconds(tabData[i].markin_short) - SI_DASHBOARD.toSeconds(tabData[i].markout_short));
				           // format time differnece
				           var result = [
				               Math.floor(difference / 3600), // an hour has 3600 seconds
				               Math.floor((difference % 3600) / 60), // a minute has 60 seconds
				               difference % 60
				           ];
				           // 0 padding and concatation
				           result = result.map(function (v) {
				               return v < 10 ? '0' + v : v;
				           }).join(':');
							/*calculate duration*/
							SI_HGLT_DSBRD.highlightsArray.push(tabData[i].s_id)
							tabDataMkp += '<div class="si-tbls__row swiper-slide"> <div class="si-tbls__cell si-eventname"> <span>'+tabData[i].Description+'</span> </div><div class="si-tbls__cell si-duration"> <span>'+result+'</span> </div></div>';
						} 
						mainContainer.find('.si-loader').hide();
						mainContainer.find('.si-swiper-tab3-content').html(tabDataMkp);
						if(!SI_HGLT_DSBRD.isMobile) {
							// SI_DASHBOARD.s3swiper.update();
						}
						// var bottomMkp = '<div class="si-btnwrapper">  <div class="si-save">Save</div>  <div class="si-reset">Reset</div> </div>';
						// mainContainer.find('.si-tab-container-data').append(bottomMkp);
					} else {
						tabDataMkp = '<div class="si-nodata">Data Not Avaialable</div>';
						mainContainer.find('.si-swiper-tab3-content').html(tabDataMkp);
					}
				} catch(err) {
					console.log(err)
				}
				

			});
		}, 15000);
	}
	if(tabType == 's2') {
		tabUrl = SI_HGLT_DSBRD.feedBasePath + 'api/GetAllS2Tags';
		var data =  {
			"mediaId": SI_DASHBOARD.mediaId,
			"matchId": SI_DASHBOARD.matchglobalid ,
			"sType": 2,
 			"clientId": 1
		}		
		// var requestData = JSON.stringify(data);
		var requestData = data;
		SI_HGLT_DSBRD.loadPostData(tabUrl,requestData, function(data) {
			var tabData = JSON.parse(data);
			console.log(tabData);
			var tabDataMkp = '';
			if(tabData && tabData.length) {
				for (var i = 0 ; i < tabData.length; i ++) {
					/*calculate duration*/
					var difference = Math.abs(SI_DASHBOARD.toSeconds(tabData[i].markin_short) - SI_DASHBOARD.toSeconds(tabData[i].markout_short));
		           // format time differnece
		           var result = [
		               Math.floor(difference / 3600), // an hour has 3600 seconds
		               Math.floor((difference % 3600) / 60), // a minute has 60 seconds
		               difference % 60
		           ];
		           // 0 padding and concatation
		           result = result.map(function (v) {
		               return v < 10 ? '0' + v : v;
		           }).join(':');
					/*calculate duration*/
					
					var checked = "";
					var disabled = "";
					var activeCLass = "active";
					var siRemove = "si-plus";
					if(SI_HGLT_DSBRD.highlightsArray) {
						if (SI_HGLT_DSBRD.highlightsArray.indexOf(tabData[i].s_id.toString()) >	 -1 && tabData[i].is_highlight_moment == '0') {
							activeCLass = "";
						}
	                    if ((tabData[i].is_highlight_moment == '1' && SI_HGLT_DSBRD.highlightsArray.indexOf(tabData[i].s_id.toString()) > -1) ) {
							siRemove = "si-minus";
						}
					} else {
						activeCLass = "";
					}

					tabDataMkp += '<div class="si-clipitem swiper-slide '+activeCLass+'"> <div class="si-clipContent"> <div class="si-clipTop"> <p class="si-clipDesc">'+tabData[i].description+'</p></div></div><span class="si-icon '+siRemove+' '+activeCLass+'" data-ishighlight="'+tabData[i].is_highlight_moment+'" id="'+tabData[i].s_id+'" data-savetabtype="s2"></span></div>';
				}
				var s2TabData = '<div id="tab2"> <div class="si-wrapper"> <div class="swiper-container swiper-contain2"> <div class="swiper-wrapper"> '+tabDataMkp+' </div><div class="swiper-scrollbar"></div></div></div></div>'
				mainContainer.find('.si-tab-container-data').html(s2TabData);
				if(!SI_HGLT_DSBRD.isMobile) {
					var swiper = new Swiper('.swiper-contain2', {
				        direction: 'vertical',
				        slidesPerView: 'auto',
				        freeMode: true,
				        scrollbar: {
				        el: '.swiper-scrollbar',
				        },
				        mousewheel: true,
					}); 
				}
				var bottomMkp = '<div class="si-btnwrapper si-btn-wrapper"> <div class="si-save" data-savetabtype="s2">Save</div><div class="si-reset si-reset-selected">Reset</div></div>';
				mainContainer.find('.si-tab-container-data').append(bottomMkp);
			}
		});
	}
};
SI_DASHBOARD.loadHeaderContent = function(mainContainer) {
	var logoImage = SI_HGLT_DSBRD.imagesPath + 'small-logo.png';
	SI_DASHBOARD.headerData = ' <div class="si-header__top"> <div class="si-header__topLeft"> <div class="si-header__logo"> <img src="'+logoImage+'"> </div><span class="main-heading">Highlights Dashboard</span> </div><div class="si-header__topRight"> <span class="si-usertext">Welcome '+SI_HGLT_DSBRD.loggedInUserData.display_name+' !</span> <span class="si-icon si-powerIcon si-logout"></span> </div></div>';
	mainContainer.find('.si-header-content').html(SI_DASHBOARD.headerData);
};

SI_DASHBOARD.loadMatches = function(mainContainer) {
	var matchUrl = SI_HGLT_DSBRD.feedBasePath + 'api/FillMatches/1/1/1';
	SI_HGLT_DSBRD.loadData(matchUrl, function(data) {
		var parsedMatches = JSON.parse(data);
		var matches = parsedMatches.Matches;
		var matchOptions = SI_DASHBOARD.selectOptions(matches);
		mainContainer.find('#match_options').html(matchOptions);
	});
};

SI_DASHBOARD.selectOptions = function(matches) {
	var options = '<option>Select Match</option>';
	for(var i = 0; i < matches.length; i++) {
		options += '<option data-series-id="'+matches[i].edition_name+'" data-mediaid="'+matches[i].media_id+'" data-matchmediaid="'+matches[i].match_media_id+'" data-matchglobalid="'+matches[i].game_global_id+'">'+matches[i].game_event_name+'</option>'
	}
	return options;
};

SI_DASHBOARD.loadDataSkeleton = function(mainContainer) {
	var mainTabs = '<div class="si-tabwrp"> <ul class="si-tab"> <li id="t1" class="si-event-tabs" data-tab="s1"><a href="javascript:void(0)"><span>On Field Events</span></a></li><li id="t2" class="si-event-tabs" data-tab="s2"><a href="javascript:void(0)"><span>Off Field Events</span></a></li></ul> </div><div class="si-tabcontainer si-tab-container-data"></div>';
	mainContainer.find('.si-maincover-content').html(mainTabs);
};