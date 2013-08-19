define([
  'jquery',
  'scroll',
  'lodash'
], function($, scroll, _) {

  var articleTitle;
  var articleTitleContainer;
  var seriesTitle;
  var articleNav;
  var main;
  var header;

//  var fadeOutNavBarText = function() {
//    articleTitleContainer.addClass('fade-out');
//  };

  var fadeInNavBarText = function() {
    articleTitleContainer
      .removeClass('fade-out')
      .addClass('visible');
  };

  var setBindings = function() {
//    articleTitleContainer.add(seriesTitle)
//      .on('mouseover', function() {
//        articleNav.addClass('visible');
//        main.one('mouseover', function() {
//          articleNav.removeClass('visible');
//        })
//      });
    articleTitleContainer.on('click', function() {
      articleNav.toggleClass('visible');
    });

    scroll.observe(header, {
//      enter: fadeOutNavBarText,
      exit: fadeInNavBarText,
      above: _.once(fadeInNavBarText)
    });
  };

  var init = function() {
    articleTitleContainer = $('.article-title-container');
    articleTitle = $('.article-title');
    seriesTitle = $('.series-title');
    articleNav = $('.article-navs');
    main = $('#main');
    header = $('.header');
    setBindings();
  };

  return {
    init: init
  };
});