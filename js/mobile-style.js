/*
 * mobile-style.js - adds some responsiveness to Tinyboard
 * https://github.com/vichan-devel/Tinyboard/blob/master/js/mobile-style.js
 *
 * Released under the MIT license
 * Copyright (c) 2014 Marcin Åabanowski <marcin@6irc.net>
 *
 * Usage:
 *   $config['api']['enabled'] = true;
 *   $config['additional_javascript'][] = 'js/jquery.min.js';
 *   $config['additional_javascript'][] = 'js/mobile-style.js';
 */

/*if(navigator.userAgent.match(/iPhone|iPod|iPad|Android|Opera Mini|Blackberry|PlayBook|Windows Phone|Tablet PC|Windows CE|IEMobile/i)) {
	document.documentElement.classList.add("mobile-style");
	device_type = "mobile";
}
else {
	document.documentElement.classList.add("desktop-style");
	device_type = "desktop";
}*/
(function(){
	window.device_type = window.device_type || "unknown";

	function detectDevice() {
		var ua = navigator.userAgent || "";
		var isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
		var width = Math.max(window.screen.width || 0, window.innerWidth || 0);
		var height = Math.max(window.screen.height || 0, window.innerHeight || 0);
		var minSize = Math.min(width, height);

		// stronger desktop UA check first (to avoid mis-detecting touch-enabled desktops)
		var isDesktopUa = /\b(Windows NT|Macintosh|Linux x86_64|CrOS|X11)\b/i.test(ua);
		var isTabletUa = /\b(iPad|PlayBook|Tablet|Kindle|Silk|Nexus 7|Nexus 9|SM-T|GT-P|Xoom|SCH-I800)\b/i.test(ua);
		var isMobileUa = /\b(iPhone|iPod|Android.*Mobile|Windows Phone|IEMobile|Opera Mini|Blackberry)\b/i.test(ua);

		// heuristics: large touch devices -> tablet, small touch -> mobile
		var isTablet = isTabletUa || (isTouch && minSize >= 720 && !/Mobile/i.test(ua)); // raise threshold to reduce false positives
		var isMobile = isMobileUa || (isTouch && minSize < 720);

		var finalType;
		if (isDesktopUa && !isMobileUa && !isTabletUa) {
			finalType = "desktop";
		} else if (isTablet) {
			finalType = "tablet";
		} else if (isMobile) {
			finalType = "mobile";
		} else if (isDesktopUa) {
			finalType = "desktop";
		} else {
			// fallback: prefer desktop unless strong touch/mobile evidence
			finalType = (isTouch && minSize < 900) ? "mobile" : "desktop";
		}

		// update classes/attributes
		document.documentElement.classList.remove("mobile-style","tablet-style","desktop-style","touch","no-touch","portrait","landscape");
		document.documentElement.classList.add(finalType + "-style");
		document.documentElement.classList.add(isTouch ? "touch" : "no-touch");
		document.documentElement.classList.add((height >= width) ? "portrait" : "landscape");
		document.documentElement.setAttribute("data-device", finalType);
		document.documentElement.setAttribute("data-touch", isTouch ? "true" : "false");
		document.documentElement.setAttribute("data-orientation", (height >= width) ? "portrait" : "landscape");

		window.device_type = finalType;

		// debug: remove or comment out in production
		if (window.location.search.indexOf("devicedebug=1") !== -1) {
			/* eslint-disable no-console */
			console.info("Device detect:", {
				ua: ua,
				width: width,
				height: height,
				minSize: minSize,
				isTouch: isTouch,
				isDesktopUa: isDesktopUa,
				isTabletUa: isTabletUa,
				isMobileUa: isMobileUa,
				finalType: finalType
			});
		}
	}

	detectDevice();
	var resizeTimer;
	window.addEventListener("resize", function(){
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(detectDevice, 180);
	}, {passive:true});
	window.addEventListener("orientationchange", function(){
		setTimeout(detectDevice, 140);
	}, {passive:true});
})();

