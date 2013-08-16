define([
  'events',
  './layout',
  './timeline',
  './templates',
  './headerNav',
  'scroll'
], function(events, layout, timeline, templates, headerNav, scroll) {
  'use strict';

  var body;

  var removeLoadingState = function() {
    body.removeClass('loading');
  };

  var setBindings = function() {
    events.on('layout:complete', removeLoadingState);
  };

  var init = function() {
    body = $('body');

    setBindings();

    layout.init();
    timeline.init();
    templates.init();
    headerNav.init();
    scroll.init();
  };

  return {
    init: init
  };
});