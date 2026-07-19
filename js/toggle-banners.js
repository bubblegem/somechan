/*
 * banner-toggle.js - basically a script that could let you disable banners, or keep them on. Turned on by default.
 *
 * Usage:
 *    $config['additional_javascript'][] = 'js/toggle-password.js';
 */

$(document).ready(function(){
	'use strict';

	if (window.Options && Options.get_tab('general') && window.jQuery) {
		Options.extend_tab('general', '<label id="show-banners"><input type="checkbox">' + _('Disable banners') + '</label>');

		$('#show-banners>input').on('change', function() {
			if (localStorage.show_banners !== 'false') {
				localStorage.show_banners = 'false';
				$('img.board_image, img.banner').hide();
			} else {
				localStorage.show_banners = 'true';
				$('img.board_image, img.banner').show();
			}
		});

		if (localStorage.show_banners !== 'false') {
			$('#show-banners>input').attr('checked','checked');
		} else {
			$('img.board_image, img.banner').hide();
		}
	}
});
