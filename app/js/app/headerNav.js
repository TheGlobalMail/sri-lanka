define([
  'jquery',
  'scroll',
  'lodash'
], function($, scroll, _) {

  var articleTitle;
  var seriesTitle;
  var articleNav;
  var main;
  var header;

  var fadeOutNavBarText = function() {
    articleTitle.addClass('fade-out');
  };

  var fadeInNavBarText = function() {
    articleTitle
      .removeClass('fade-out')
      .addClass('visible');
  };

  var setBindings = function() {
    articleTitle.add(seriesTitle)
      .on('mouseover', function() {
        articleNav.addClass('visible');
        main.one('mouseover', function() {
          articleNav.removeClass('visible');
        })
      });
    articleTitle.on('click', function() {
      articleNav.toggleClass('visible');
    });

    scroll.observe(header, {
      enter: fadeOutNavBarText,
      exit: fadeInNavBarText,
      above: _.once(fadeInNavBarText)
    });
  };

  var init = function() {
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