(function($) { 
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
