/*
 * catalog-search.js
 *   - Search and filters threads when on catalog view
 *   - Optional shortcuts 's' and 'esc' to open and close the search.
 * 
 * Usage:
 *   $config['additional_javascript'][] = 'js/jquery.min.js';
 *   $config['additional_javascript'][] = 'js/comment-toolbar.js';
 */
if (active_page == 'catalog') {
	onready(function () {
		'use strict';

		var useKeybinds = true;
		var delay = 400;
		var timeoutHandle;

		function filter(search_term) {
			$('.replies').each(function () {
				var subject = $(this).children('.intro').text().toLowerCase();
				var comment = $(this).clone().children().remove(':lt(2)').end().text().trim().toLowerCase();
				search_term = search_term.toLowerCase();

				if (subject.indexOf(search_term) == -1 && comment.indexOf(search_term) == -1) {
					$(this).parents('div[id="Grid"]>.mix').css('display', 'none');
				} else {
					$(this).parents('div[id="Grid"]>.mix').css('display', 'inline-block');
				}
			});
		}

		function getBoard() {
			if (typeof board !== 'undefined' && board) return board;
			if (typeof BOARD !== 'undefined' && BOARD) return BOARD;
			var parts = window.location.pathname.split('/').filter(function (p) { return p.length > 0; });
			if (parts.length > 0) return parts[0];
			return '';
		}

		function searchToggle() {
			var $input = $('.catalog_search').find('#search_field');

			if ($input.length === 0) {
				$('.catalog_search').append(' <input id="search_field" style="border: inset 1px;">');
				$('#search_field').focus();
			} else {
				$input.remove();
				$('.catalog_search').children('button#catalog_search_go').remove();
				$('div[id="Grid"]>.mix').each(function () { $(this).css('display', 'inline-block'); });
			}
		}

		$('.threads').before('<span class="catalog_search"></span>');
		$('.catalog_search').append(' <input id="search_field" style="border: inset 1px;">');
		$('.catalog_search').append(' <button id="catalog_search_go" type="button" style="cursor: pointer;">Search</button>');
		// removed automatic focus so the input isn't always selected on load

		// clicking the Search button navigates to /search.php?search=...&board=...
		$('.catalog_search').on('click', '#catalog_search_go', function () {
			var q = $('#search_field').val() || '';
			var b = getBoard() || '';
			var url = '/search.php?search=' + encodeURIComponent(q) + '&board=' + encodeURIComponent(b);
			// Or use full absolute URL:
			// var url = window.location.origin + '/search.php?search=' + encodeURIComponent(q) + '&board=' + encodeURIComponent(b);
			window.location.href = url;
		});

		// pressing Enter triggers the same navigation
		$('.catalog_search').on('keydown', 'input#search_field', function (e) {
			if (e.which === 13 && !(e.ctrlKey || e.altKey || e.shiftKey)) {
				e.preventDefault();
				$('#catalog_search_go').trigger('click');
			}
		});

		$('.catalog_search').on('keyup', 'input#search_field', function (e) {
			window.clearTimeout(timeoutHandle);
			timeoutHandle = window.setTimeout(filter, delay, e.target.value);
		});

		if (useKeybinds) {
			$('body').on('keydown', function (e) {
				if (e.which === 83 && e.target.tagName === 'BODY' && !(e.ctrlKey || e.altKey || e.shiftKey)) {
					e.preventDefault();
					if ($('#search_field').length !== 0) {
						$('#search_field').focus();
					} else {
						searchToggle();
					}
				}
			});
			$('.catalog_search').on('keydown', 'input#search_field', function (e) {
				if (e.which === 27 && !(e.ctrlKey || e.altKey || e.shiftKey)) {
					window.clearTimeout(timeoutHandle);
					searchToggle();
				}
			});
		}
	});
}
