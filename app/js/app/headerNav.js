define([
  'jquery',
  'scroll',
  'events'
], function($, scroll, events) {

  var articleTitle;
  var seriesTitle;
  var articleNav;
  var main;
  var header;

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

    scroll.watchElement(header, 'article-title');
    events.on('scroll:exit:article-title', function() {
      articleTitle.add(seriesTitle)
        .addClass('visible');
    });
    events.on('scroll:enter:article-title', function() {
      articleTitle.add(seriesTitle)
        .removeClass('visible');
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