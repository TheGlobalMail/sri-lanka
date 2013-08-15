define([
  'events',
  './layout',
  './timeline',
  './templates'
], function(events, layout, timeline, templates) {
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
  };

  return {
    init: init
  };
});