define([
  'jquery',
  'scroll',
  'lodash'
], function($, scroll, _) {

  var articleTitleContainer;
  var articleNav;
  var main;
  var header;

  var fadeInNavBarText = function() {
    articleTitleContainer
      .addClass('visible');
  };

  var setBindings = function() {
    articleTitleContainer.on('click', function() {
      articleNav.toggleClass('visible');
      articleTitleContainer.toggleClass('child-nav-visible');
      main.one('click', function() {
        articleNav.removeClass('visible');
        articleTitleContainer.removeClass('child-nav-visible');
      })
    });

    scroll.observe(header, {
      exit: fadeInNavBarText,
      above: _.once(fadeInNavBarText)
    });
  };

  var init = function() {
    articleTitleContainer = $('.article-title-container');
    articleNav = $('.article-navs');
    main = $('#main');
    header = $('.header');
    setBindings();
  };

  return {
    init: init
  };
});