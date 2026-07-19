<?php

/*
 *  Instance Configuration
 *  ----------------------
 *  Edit this file and not config.php for imageboard configuration.
 *
 *  You can copy values from config.php (defaults) and paste them here.
 */



	// Database stuff
	$config['db']['type']		= 'mysql';
	$config['db']['server']		= 'localhost';
	$config['db']['user']		= '';
	$config['db']['password']	= '';
	$config['db']['database']	= '';
		
	// load generated secrets/config (if not already loaded)
	if (file_exists(__DIR__ . '/secrets.php')) {
		require __DIR__ . '/secrets.php';
	}

	// ensure $config exists
	if (!isset($config) || !is_array($config)) {
		$config = [];
	}

	$config['flood_time'] = 1;
	$config['flood_time_ip'] = 1;
	$config['flood_time_same'] = 1;
	$config['max_body'] = 24000;
	$config['reply_limit'] = 999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999;
	$config['max_links'] = 20;
	$config['max_filesize'] = 10485760;
	$config['thumb_width'] = 255;
	$config['thumb_height'] = 255;
	$config['max_width'] = 10000;
	$config['max_height'] = 10000;
	$config['threads_per_page'] = 10;
	$config['max_pages'] = 41;
	$config['threads_preview'] = 5;
	$config['root'] = '/';
	
if (isset($config['filters']) && is_array($config['filters'])) {
    $config['filters'] = array_values(array_filter($config['filters'], function($f) {
        return !(is_array($f) && (($f['action'] ?? null) === 'throttle'));
    }));
} else {
    $config['filters'] = [];
}

// js
$config['additional_javascript'][] = 'js/jquery.min.js';
$config['additional_javascript'][] = 'js/jquery-ui.custom.min.js';
$config['additional_javascript'][] = 'js/jquery.mixitup.min.js';
$config['additional_javascript'][] = 'js/strftime.min.js';
$config['additional_javascript'][] = 'js/options.js';
$config['additional_javascript'][] = 'js/options/general.js';
$config['additional_javascript'][] = 'js/options/user-css.js';
$config['additional_javascript'][] = 'js/options/user-js.js';
$config['additional_javascript'][] = 'js/ajax.js';
$config['additional_javascript'][] = 'js/file-selector.js';
$config['additional_javascript'][] = 'js/multi-image.js';
$config['additional_javascript'][] = 'js/comment-toolbar.js';
$config['additional_javascript'][] = 'js/quick-reply.js';
$config['additional_javascript'][] = 'js/quote-selection.js';
$config['additional_javascript'][] = 'js/wPaint/8ch.js';
$config['additional_javascript'][] = 'js/wpaint.js';
$config['additional_javascript'][] = 'js/upload-selection.js';
$config['additional_javascript'][] = 'js/post-menu.js';
$config['additional_javascript'][] = 'js/quick-post-controls.js';
$config['additional_javascript'][] = 'js/ajax-post-controls.js';
$config['additional_javascript'][] = 'js/post-hover.js';
$config['additional_javascript'][] = 'js/show-backlinks.js';
$config['additional_javascript'][] = 'js/show-op.js';
$config['additional_javascript'][] = 'js/show-own-posts.js';
$config['additional_javascript'][] = 'js/expand.js';
$config['additional_javascript'][] = 'js/expand-filename.js';
$config['additional_javascript'][] = 'js/inline.js';
$config['additional_javascript'][] = 'js/inline-expanding.js';
$config['additional_javascript'][] = 'js/inline-expanding-filename.js';
$config['additional_javascript'][] = 'js/expand-all-images.js';
$config['additional_javascript'][] = 'js/image-hover.js';
$config['additional_javascript'][] = 'js/hide-images.js';
$config['additional_javascript'][] = 'js/toggle-images.js';
$config['additional_javascript'][] = 'js/download-original.js';
$config['additional_javascript'][] = 'js/thread-stats.js';
$config['additional_javascript'][] = 'js/threadscroll.js';
$config['additional_javascript'][] = 'js/treeview.js';
$config['additional_javascript'][] = 'js/hide-threads.js';
$config['additional_javascript'][] = 'js/toggle-locked-threads.js';
$config['additional_javascript'][] = 'js/auto-reload.js';
$config['additional_javascript'][] = 'js/auto-scroll.js';
$config['additional_javascript'][] = 'js/infinite-scroll.js';
$config['additional_javascript'][] = 'js/titlebar-notifications.js';
$config['additional_javascript'][] = 'js/catalog-search.js';
$config['additional_javascript'][] = 'js/compact-boardlist.js';
$config['additional_javascript'][] = 'js/mobile-style.js';
$config['additional_javascript'][] = 'js/style-select.js';
$config['additional_javascript'][] = 'js/local-time.js';
$config['additional_javascript'][] = 'js/id_colors.js';
$config['additional_javascript'][] = 'js/id_highlighter.js';
$config['additional_javascript'][] = 'js/forced-anon.js';
$config['additional_javascript'][] = 'js/save-user_flag.js';
$config['additional_javascript'][] = 'js/smartphone-spoiler.js';
$config['additional_javascript'][] = 'js/youtube.js';
$config['additional_javascript'][] = 'js/longtable/longtable.js';
$config['additional_javascript'][] = 'js/mod/ban-list.js';
$config['additional_javascript'][] = 'js/mod/mod_snippets.js';
$config['additional_javascript'][] = 'js/mod/recent-posts.js';
$config['additional_javascript'][] = 'js/multi-image.js';
$config['additional_javascript'][] = 'js/rotate-banners.js';
$config['additional_javascript'][] = 'js/archive-buttons.js';
$config['additional_javascript'][] = 'js/live-index.js';
$config['additional_javascript'][] = 'js/instance.settings.js';
$config['additional_javascript'][] = 'js/quote-reply-jump-lite.js';
$config['additional_javascript'][] = 'js/hide-blotter.js';
$config['additional_javascript'][] = 'js/fix-report-delete-submit.js';
//$config['additional_javascript'][] = 'js/hide-form.js';
//$config['additional_javascript'][] = 'js/captcha.js';
$config['additional_javascript'][] = 'js/strip-filenames.js';

	$config['resource_version'] = 16;

// boards
$config['boards'] = array(
    array(
        'home'      => '/',
		'bans'      => '/bans.php',
		'bgr'
    )
);

$config['boardlist_wrap_bracket'] = false;

?>

