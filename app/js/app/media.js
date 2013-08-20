define([
  'jquery',
  'events'
], function($, events) {

  var articleHeader;

  var detectHeaderImageLoaded = function() {
    var image = articleHeader.find('.image');
    var imageSrc;
    if (image.length){
      imageSrc = image.data('src');
      $('<img>')
        .attr('src', imageSrc)
        .on('load', function() {
          events.trigger('media:loaded');
        });

    }else{
      events.trigger('media:loaded');
    }
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
