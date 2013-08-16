define([
  'jquery'
], function($) {

  var articleNav = function() {
    $('.article-title').mouseenter(function() {
      $('.article-navs').show().animate({'height': '200px'});
    });
    $('.article-navs').mouseleave(function() {
      $('.article-navs').animate({'height': '0'}, function () {
        $(this).hide()
      });
    });
  };

  var init = function() {
    articleNav();
  };

  return {
    init: init
  };
});