define([
  'jquery'
], function($) {

  var articleTitle;
  var articleNav;
  var main;

  var setBindings = function() {
    articleTitle.on('mouseover', function() {
      articleNav.addClass('visible');
      main.one('mouseover', function() {
        articleNav.removeClass('visible');
      })
    });
    articleTitle.on('click', function() {
      articleNav.toggleClass('visible');
    });
  };

  var init = function() {
    articleTitle = $('.article-title');
    articleNav = $('.article-navs');
    main = $('#main');
    setBindings();
  };

  return {
    init: init
  };
});