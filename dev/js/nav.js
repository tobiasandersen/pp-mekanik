function closeMenu() {
  $('.js-menu').removeClass('is-open');
  $('.js-open-menu-button').removeClass('is-active');
}

(function($) {
  $('.js-open-menu-button').click(function() {
    $(this).addClass('is-active');
    $('.js-menu').addClass('is-open');
  });

  $('.js-close-menu-button').click(function() {
    closeMenu();
  });

  $('.Menu-link').click(function(e) {
    e.preventDefault();
    closeMenu();

    $(".Menu-link").removeClass("current");
    $(this).addClass("current");

    var scrollToId = $(this).attr("href");

    if (scrollToId === "#header") {
      $('html, body').animate({
        scrollTop: 0
      }, 500);

    } else {
      var offset = $('.Header').height();

      $('html, body').animate({
        scrollTop: ($(scrollToId).offset().top - offset + 2)
      }, 500);
    }
  });

  $(window).on('scroll', function() {
    var isScrolled = false;
    var distance = document.documentElement.scrollTop || document.body.scrollTop;

    if (distance > 20 && !isScrolled) {
      $('.Header').addClass('is-scrolled');
      isScrolled = true;
    } else if (distance < 21) {
      $('.Header').removeClass('is-scrolled');
      isScrolled = false;
    }
  });

  var waypointsFromTop = $('.waypoint-section').waypoint({
    handler: function(direction) {
      if (direction === 'down')
        setActiveLink($(this)[0].element.id);
    },
    offset: $('.Header').height() + 20
  });

  var waypointsFromBottom = $('.waypoint-section').waypoint({
    handler: function(direction) {
      if (direction === 'up')
        setActiveLink($(this)[0].element.id);
    },
    offset: '-20%'
  });

  function setActiveLink(id) {
    $(".Menu-link").removeClass("current");
    $('#link-' + id).addClass("current");
  }

})(jQuery);
