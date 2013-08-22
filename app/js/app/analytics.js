define([
  'jquery',
  'lodash',
  'events',
  'utils'
],function($, _, events, utils) {

  var articleName = location.pathname.split('/')[1] || 'introduction';

  var pointsToTrack = {};
  _.each(_.range(10, 101, 10), function(percentage) {
    pointsToTrack['Read to ' + percentage + '%'] = percentage;
  });


  var logScrollTracking = function() {
    var scrollPercentage = ((utils.getScrollY() + window.innerHeight) / document.height) * 100;
    _.each(pointsToTrack, function(percentage) {
      if (scrollPercentage >= percentage) {
        var eventName = 'Read to ' + percentage + '%';
        window._gaq && _gaq.push(['_trackEvent', 'Read to: ' + articleName, eventName]);
        delete pointsToTrack[eventName];
      }
    });
  };

  var setBindings = function() {
    events.on('loading:complete', function() {
      $(window).on('scroll', _.throttle(logScrollTracking, 50));
    })
  };

  var init = function() {
    // Log the page load
    window._gaq && _gaq.push(['_trackEvent', 'Page load']);
    setBindings();
  };

  return {
    init: init
  };
});