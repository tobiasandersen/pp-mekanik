(function($) {

  var languages = [
    { language: 'sv', isActive: true },
    { language: 'en', isActive: false }
  ];

  function getActiveCountry() {
    return languages[0].isActive 
      ? languages[0].language 
      : languages[1].language;
  }

  function getInactiveCountry() {
    return languages[0].isActive 
      ? languages[1].language 
      : languages[0].language;
  }

  function setActiveCountry(language) {
    for (var i = 0; i < languages.length; i++) {
      languages[i].isActive = (language === languages[i].language)
    }

    $('body').attr('data-lang', language);
  }

  function changeLanguage() {
    newLanguage = getInactiveCountry();

    $.ajax({
      url: 'languages.xml',
      success: function(xml) {
        $(xml).find('translation').each(function() {
          var id = $(this).attr('id');
          var text = $(this).find(newLanguage).text();
          $("#" + id).html(text);
        })
      }
    });

    setActiveCountry(newLanguage);
  }

  $(".change-language-button").click(function() {
    changeLanguage();

    var swedish = '<span class="flag-icon flag-icon-se"></span>Svenska';
    var english = '<span class="flag-icon flag-icon-gb"></span>English';

    if (getActiveCountry() === 'sv')
      $(this).html(english);
    else 
      $(this).html(swedish);
  });

})(jQuery);
