<?php
	// Additional Javascript files to include on board index and thread pages. See js/ for available scripts.
	$config['additional_javascript'][] = 'js/jquery.min.js';
	$config['additional_javascript'][] = 'js/jquery-ui.custom.min.js';
	$config['additional_javascript'][] = 'js/jquery.mixitup.min.js';
	$config['additional_javascript'][] = 'js/strftime.min.js';
	$config['additional_javascript'][] = 'js/options.js';
	$config['additional_javascript'][] = 'js/options/general.js';
	$config['additional_javascript'][] = 'js/options/user-css.js';
	$config['additional_javascript'][] = 'js/options/user-js.js';
	$config['additional_javascript'][] = 'js/options/post-password.js';
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
	$config['additional_javascript'][] = 'js/catalog.js';
	$config['additional_javascript'][] = 'js/catalog-search.js';
	$config['additional_javascript'][] = 'js/compact-boardlist.js';
	$config['api']['enabled'] = true;
	$config['additional_javascript'][] = 'js/mobile-style.js'; // mobile-style.js is needed so your boardlist will be set to desktop mode if you are on desktop
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
	$config['additional_javascript'][] = 'js/post-filter.js';

	// Where these script files are located on the web. Defaults to $config['root'].
	// $config['additional_javascript_url'] = 'http://static.example.org/vichan-javascript-stuff/';

	// Compile all additional scripts into one file ($config['file_script']) instead of including them seperately.
	$config['additional_javascript_compile'] = false;

	// Minify Javascript using http://code.google.com/p/minify/.
	$config['minify_js'] = false;

	// Dispatch thumbnail loading and image configuration with JavaScript. It will need a certain javascript
	// code to work.
	$config['javascript_image_dispatch'] = false;
?>