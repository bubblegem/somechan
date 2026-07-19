/*
 * toggle-move-banner.js - it's almost like toggle-banner.js, but it moves the banner down to the board/title header.
 *
 * Usage:
 * 	$config['additional_javascript'][] = 'js/move-banner-toggle.js';
 */
$(function(){
	'use strict';
	if (!(window.Options && Options.get_tab && Options.extend_tab && window.jQuery)) return;

	Options.extend_tab('general', '<label id="move-banner"><input type="checkbox">Move banner below header (above attention bar)</label>');

	// Selectors
	var bannerSel = 'img.board_image, img.banner, .board_banner, #banner'; // targets actual banner images/elements
	var attentionSel = 'div.banner'; // the posting-mode/attention bar
	var headerSel = 'header';

	// store original parent/index so we can restore
	var original = new WeakMap();
	function recordOriginal(el) {
		if (original.has(el)) return;
		var $el = $(el);
		original.set(el, { parent: $el.parent()[0], index: $el.index() });
	}
	function restore($banners) {
		$banners.each(function(){
			var info = original.get(this);
			if (info && info.parent && $(info.parent).length) {
				var $p = $(info.parent);
				if (info.index <= 0 || info.index >= $p.children().length) $p.append(this);
				else $p.children().eq(info.index).before(this);
			} else {
				$('body').prepend(this);
			}
			$(this).removeClass('moved-banner moved-banner-index moved-banner-thread').css('margin-bottom','');
		});
	}

	// determine active page: 'index', 'thread', or 'other'
	function getActivePage() {
		// common vichan body classes
		var $body = $('body');
		if ($body.hasClass('index') || location.pathname.match(/\/(index\.html)?$/) || location.pathname.match(/\/board\/?$/)) return 'index';
		if ($body.hasClass('thread') || location.pathname.match(/\/res\//) || location.pathname.match(/\/thread\//)) return 'thread';
		// fallback: if there's a thread OP/post form id presence detection
		if ($('form[name="post"]').length && $('#postform').length) {
			// presence of reply form on index pages still possible; prefer URL checks above
			return 'index';
		}
		return 'other';
	}

	function placeBetweenHeaderAndAttention() {
		var $header = $(headerSel).first();
		var $attention = $(attentionSel).first();
		var $banners = $(bannerSel).filter(function(){ return !$(this).is('div.banner'); });
		if (!$header.length || !$banners.length) return false;

		var active = getActivePage();

		$banners.each(function(){
			recordOriginal(this);
			var $this = $(this);
			// reset any previous helper classes/styles then move
			$this.removeClass('moved-banner moved-banner-index moved-banner-thread').css('margin-bottom','');

			// on index pages we add a small extra bottom margin to avoid crowding the post form
			if (active === 'index') {
				$this.addClass('moved-banner moved-banner-index');
				if ($attention.length) $this.insertBefore($attention);
				else $this.insertAfter($header);
				$this.css('margin-bottom','12px');
			} else if (active === 'thread') {
				$this.addClass('moved-banner moved-banner-thread');
				if ($attention.length) $this.insertBefore($attention);
				else $this.insertAfter($header);
				// thread pages generally have enough spacing; no extra margin required
			} else {
				// default behavior
				$this.addClass('moved-banner');
				if ($attention.length) $this.insertBefore($attention);
				else $this.insertAfter($header);
			}
		});
		return true;
	}

	$('#move-banner>input').on('change', function(){
		var enabled = $(this).prop('checked');
		localStorage.move_banner_between_header_attention = enabled ? 'true' : 'false';

		if (enabled) {
			if (!placeBetweenHeaderAndAttention()) {
				var tries = 0, t = setInterval(function(){
					tries++;
					if (placeBetweenHeaderAndAttention() || tries > 40) clearInterval(t);
				}, 150);
			}
		} else {
			restore($(bannerSel).filter(function(){ return !$(this).is('div.banner'); }));
		}
	});

	// init from storage
	var stored = localStorage.move_banner_between_header_attention === 'true';
	$('#move-banner>input').prop('checked', stored);
	if (stored) {
		var attempts = 0, rt = setInterval(function(){
			attempts++;
			if (placeBetweenHeaderAndAttention() || attempts > 40) clearInterval(rt);
		}, 150);
	}
});
