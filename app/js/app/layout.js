define([
  'jquery'
], function($) {

  var scaleToViewport = function() {
    $('.article-header').height(window.innerHeight);
  };

  var init = function() {
    scaleToViewport();
  };

  return {
    init: init
  };
});