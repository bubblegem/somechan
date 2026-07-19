$(document).ready(function () {
	'use strict';

	if (window.Options && Options.get_tab('general') && window.jQuery) {
		Options.extend_tab(
			'general',
			'<label id="hide-blotter"><input type="checkbox">' + _('Always hide blotter') + '</label>'
		);

		const $blotter = $('#blotter, .blotter');
		const $cb = $('#hide-blotter > input');

		$cb.on('change', function () {
			if ($(this).prop('checked')) {
				localStorage.hide_blotter = 'true';
				$blotter.hide();
			} else {
				localStorage.hide_blotter = 'false';
				$blotter.show();
			}
		});

		// Checkbox not checked by default -> show blotter
		localStorage.hide_blotter = 'false';
		$cb.prop('checked', false);
		$blotter.show();
	}
});
