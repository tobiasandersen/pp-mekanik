(function($) {

  function createImageEl(fileName) {
    return $(
      '<div class="image-item">' +
        '<section class="image-container">' + 
          '<a href="img/full/' + fileName + '.jpg" data-lightbox="bilder">' +
            '<img src="img/thumbnails/' + fileName + '.jpg">' + 
          '</a>' + 
        '</section>' + 
      '</div>'
    );
  }

  $(window).on("load", function() {
    var rows = [];

    for (var i = 5; i <= 20; i = (i + 2)) {
      $row = $('<div class="row"></div>');

      for (var j = i; j <= (i + 1); j++) {
        $row.append(createImageEl(j));
      }

      rows.push($row);
    }

    $('#additional-images-container').append(rows);
  });

  $('.js-show-more-images').click(function(e) {
    var additionalImages = $('#additional-images-container');
    additionalImages.toggleClass("is-shown");

    var currentLanguage = $('body').attr('data-lang');

    var hideText = currentLanguage === 'sv' 
      ? 'Dölj bilder igen' 
      : 'Hide images';

    var showText = currentLanguage === 'sv' 
      ? 'Visa fler bilder' 
      : 'Show more images';

    if (additionalImages.hasClass('is-shown')) {
      $(this).html(hideText);
    } else {
      $(this).html(showText);
    }
  });

}(jQuery))
