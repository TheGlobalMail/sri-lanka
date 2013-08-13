define(function() {

  var init = function() {
    // Log the page load
    window._gaq && _gaq.push(['_trackEvent', 'Page load']);
  };

  return {
    init: init
  };
});