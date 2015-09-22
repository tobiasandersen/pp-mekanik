(function($) {
	var language = 'swedish';

	function changeLanguage() {
		language = language === 'swedish' ? 'english' : 'swedish';
     
		$.ajax({
			url: 'languages.xml',
			success: function(xml) {
				$(xml).find('translation').each(function() {
					var id = $(this).attr('id');
					var text = $(this).find(language).text();
					$("#" + id).html(text);
				})
			}
		});
	}

	$(".change-language-button").click(function() {
		changeLanguage();

		var swedish = '<span class="flag-icon flag-icon-se"></span>Swedish';
		var english = '<span class="flag-icon flag-icon-gb"></span>English';
		
		if (language === 'swedish')
			$(this).html(english);
		else 
			$(this).html(swedish);
	});

    $(window).on("scroll", function() {
        var isScrolled = false;
        var distance = document.body.scrollTop;

        if (distance > 20 && !isScrolled) {
            $('.header').addClass('is-scrolled');
            isScrolled = true;
        } else if (distance < 21) {
            $('.header').removeClass('is-scrolled');
            isScrolled = false;
        }
    });

	$(".page-link").click(function(e) {
		e.preventDefault();
		var elementID = $(this).attr("href");

		$(".page-link").removeClass("current");
		$(this).addClass("current");

		if (elementID === "#header") {
			$('html, body').animate({
				scrollTop: 0
			}, 500);

		} else {
			$('html, body').animate({
				scrollTop: ($(elementID).offset().top - 130)
			}, 500);
		}

	});

	$('.js-show-more-images').click(function(e) {
		var additionalImages = $('.row--additional');
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

})(jQuery);
