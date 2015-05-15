/*
	Twenty by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {
	$(".page-link").click(function(e) {
		e.preventDefault();
		var elementID = $(this).attr("href");

		if (elementID === "#header") {
			$('html, body').animate({
				scrollTop: 0
			}, 500);

		} else {
			$('html, body').animate({
				scrollTop: ($(elementID).offset().top - 50)
			}, 500);
		}

	});

	$('.js-show-more-images').click(function(e) {
		var additionalImages = $('.additional-images-container');
		additionalImages.toggleClass("is-shown");

		if (additionalImages.hasClass('is-shown')) {
			$(this).html("Dölj bilder igen");
		} else {
			$(this).html("Visa fler bilder");
		}
	});

	function initialize() {
		var map = new google.maps.Map(document.getElementById('google-maps'), {
			center: new google.maps.LatLng(55.720713, 13.365404),
			zoom: 11,                        // set the zoom level manually
			scrollwheel: false,
			disableDoubleClickZoom: true,
		});

		var request = {
			placeId: 'ChIJA03UMRORU0YReKGIzVQZ5IM'
		};

		var infowindow = new google.maps.InfoWindow();
		var service = new google.maps.places.PlacesService(map);

		service.getDetails(request, function(place, status) {
			if (status == google.maps.places.PlacesServiceStatus.OK) {
			var marker = new google.maps.Marker({
				map: map,
				position: place.geometry.location
			});
			google.maps.event.addListener(marker, 'click', function() {
				infowindow.setContent(place.name);
				infowindow.open(map, this);
			});
			}
		});
	}
		
	
	google.maps.event.addDomListener(window, 'load', initialize);

	skel.init({
		reset: 'full',
		breakpoints: {
			global:		{ range: '*', href: 'css/style.css', containers: 1400, grid: { gutters: 50 } },
			wide:		{ range: '-1680', href: 'css/style-wide.css', containers: 1200, grid: { gutters: 40 } },
			normal:		{ range: '-1280', href: 'css/style-normal.css', containers: 960, viewport: { scalable: false } },
			narrow:		{ range: '-980', href: 'css/style-narrow.css', containers: '95%', grid: { gutters: 30 } },
			narrower:	{ range: '-840', href: 'css/style-narrower.css', containers: '95%!' },
			mobile:		{ range: '-736', href: 'css/style-mobile.css', containers: '100%!' }
		},
		plugins: {
			layers: {
				config: {
					mode: function() { return (skel.vars.isMobile ? 'transform' : 'position'); }
				},
			}
		}
	});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$header = $('#header'),
			$banner = $('#banner');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				$body.removeClass('is-loading');
			});

		// CSS polyfills (IE<9).
			if (skel.vars.IEVersion < 9)
				$(':last-child').addClass('last-child');

		// Forms (IE<10).
			var $form = $('form');
			if ($form.length > 0) {

				if (skel.vars.IEVersion < 10) {
					$.fn.n33_formerize=function(){var _fakes=new Array(),_form = $(this);_form.find('input[type=text],textarea').each(function() { var e = $(this); if (e.val() == '' || e.val() == e.attr('placeholder')) { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).blur(function() { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).focus(function() { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); _form.find('input[type=password]').each(function() { var e = $(this); var x = $($('<div>').append(e.clone()).remove().html().replace(/type="password"/i, 'type="text"').replace(/type=password/i, 'type=text')); if (e.attr('id') != '') x.attr('id', e.attr('id') + '_fakeformerizefield'); if (e.attr('name') != '') x.attr('name', e.attr('name') + '_fakeformerizefield'); x.addClass('formerize-placeholder').val(x.attr('placeholder')).insertAfter(e); if (e.val() == '') e.hide(); else x.hide(); e.blur(function(event) { event.preventDefault(); var e = $(this); var x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } }); x.focus(function(event) { event.preventDefault(); var x = $(this); var e = x.parent().find('input[name=' + x.attr('name').replace('_fakeformerizefield', '') + ']'); x.hide(); e.show().focus(); }); x.keypress(function(event) { event.preventDefault(); x.val(''); }); });  _form.submit(function() { $(this).find('input[type=text],input[type=password],textarea').each(function(event) { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) e.attr('name', ''); if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); }).bind("reset", function(event) { event.preventDefault(); $(this).find('select').val($('option:first').val()); $(this).find('input,textarea').each(function() { var e = $(this); var x; e.removeClass('formerize-placeholder'); switch (this.type) { case 'submit': case 'reset': break; case 'password': e.val(e.attr('defaultValue')); x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } else { e.show(); x.hide(); } break; case 'checkbox': case 'radio': e.attr('checked', e.attr('defaultValue')); break; case 'text': case 'textarea': e.val(e.attr('defaultValue')); if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } break; default: e.val(e.attr('defaultValue')); break; } }); window.setTimeout(function() { for (x in _fakes) _fakes[x].trigger('formerize_sync'); }, 10); }); return _form; };
					$form.n33_formerize();
				}

			}


		// Header.
		// If the header is using "alt" styling and #banner is present, use scrollwatch
		// to revert it back to normal styling once the user scrolls past the banner.
		// Note: This is disabled on mobile devices.
			if (!skel.vars.isMobile
			&&	$header.hasClass('alt')
			&&	$banner.length > 0) {

				$window.on('load', function() {

					$banner.scrollwatch({
						delay:		0,
						range:		1,
						anchor:		'top',
						on:			function() { $header.addClass('alt reveal'); },
						off:		function() { $header.removeClass('alt'); }
					});

				});

			}

	});

})(jQuery);
