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

  $('.js-show-more-images').click(function(e) {
    var additionalImages = $('.row--additional');
    additionalImages.toggleClass("is-shown");

    var hideText = language === 'swedish' ? 'Dölj bilder igen' : 'Hide images';
    var showText = language === 'swedish' ? 'Visa fler bilder' : 'Show more images';

    if (additionalImages.hasClass('is-shown')) {
      $(this).html(hideText);
    } else {
      $(this).html(showText);
    }
  });

  function initialize() {
    var map = new google.maps.Map(document.getElementById('google-maps'), {
      center: new google.maps.LatLng(55.720713, 13.365404),
      zoom: 11,
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
