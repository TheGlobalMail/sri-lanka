define([
  'jquery',
  'events'
], function($, events) {

  var articleHeader;

  var detectHeaderImageLoaded = function() {
    events.on('template:inserted:data', function() {
      var image = articleHeader.find('.image');
      var imageSrc = image.css('background-image').replace('url(', '').slice(0, -1);
      $('<img>')
        .attr('src', imageSrc)
        .load(function() {
          events.trigger('media:loaded');
        });
    });
  };

  var setBindings = function() {
    detectHeaderImageLoaded();
  };

  var init = function() {
    articleHeader = $('.article-header');

    setBindings();
  };

  return {
    init: init
  };
});