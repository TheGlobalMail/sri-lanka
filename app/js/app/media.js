define([
  'jquery',
  'events'
], function($, events) {

  var articleHeader;
  var responsiveImages;

  var mediaLoaded = function() {
    events.trigger('media:loaded');
  };

  var onBGImageLoad = function(element, callback) {
    var elementSrc = element
      .css('background-image');
    if (!elementSrc || elementSrc === 'none') {
      callback();
    } else {
      elementSrc = elementSrc.replace('url(', '').slice(0, -1);
      var image = $('<img>')
        .attr('src', elementSrc);
      image.on('load', function() {
        callback(image[0]);
      });
    }
  };

  var detectHeaderImageLoaded = function() {
    var image = articleHeader.find('.image');
    onBGImageLoad(image, mediaLoaded);
  };

  var sizeResponsiveImages = function() {
    // Expand each element to fill a 4:3 ratio
    responsiveImages.each(function() {
      var element = $(this);
      onBGImageLoad(element, function(image) {
        var imageRatio = image.width / image.height;
        var height = element.width() / imageRatio;
        element.css('height', height);
      });
    })
  };

  var setBindings = function() {
    detectHeaderImageLoaded();
    $(window).on('resize', _.debounce(sizeResponsiveImages, 50));
  };

  var init = function() {
    articleHeader = $('.article-header');
    responsiveImages = $('.responsive-image-container');

    sizeResponsiveImages();
    setBindings();
  };

  return {
    init: init
  };
});
