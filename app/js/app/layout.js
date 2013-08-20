define([
  'jquery',
  'events'
], function($, events) {

  var articleNav;
  var content;

  var footerNav = function() {
    var footerNav = articleNav.clone();
    footerNav
      .removeClass('fixed')
      .addClass('footer');
    content.append(footerNav);
  };

  var scaleToViewport = function() {
//    $('.article-header').height(window.innerHeight);
  };

  var init = function() {
    scaleToViewport();

    events.trigger('layout:complete');

    articleNav = $('.article-nav-container');
    content = $('.main-article');

    footerNav();
  };

  return {
    init: init
  };
});