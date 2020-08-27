/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'dashboard\'">' + entity + '</span>' + html;
	}
	var icons = {
		'dashboard-export': '&#xe90d;',
		'dashboard-positive': '&#xe908;',
		'dashboard-negative': '&#xe909;',
		'dashboard-logout': '&#xe90a;',
		'dashboard-arrow': '&#xe90b;',
		'dashboard-time': '&#xe90c;',
		'dashboard-iconfinder_user_3936855': '&#xe907;',
		'dashboard-iconfinder_icons_exit2_1564506-2': '&#xe903;',
		'dashboard-iconfinder_jee-74_2180663': '&#xe904;',
		'dashboard-iconfinder_key_115724': '&#xe906;',
		'dashboard-iconfinder_outlined_tick_4280485': '&#xe902;',
		'dashboard-iconfinder_square-check_226561': '&#xe900;',
		'dashboard-iconfinder_electronic_16_4657497': '&#xe901;',
		'dashboard-arrowDown': '&#xe905;',
		'dashboard-key': '&#xe914;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/dashboard-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
