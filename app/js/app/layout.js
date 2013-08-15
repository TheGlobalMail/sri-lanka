define([
  'jquery',
  'events'
], function($, events) {

  var scaleToViewport = function() {
//    $('.article-header').height(window.innerHeight);
  };

  var init = function() {
    scaleToViewport();

    events.trigger('layout:complete');
  };

  return {
    init: init
  };
});