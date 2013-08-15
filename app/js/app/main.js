define([
  'events',
  './layout',
  './timeline'
], function(events, layout, timeline) {
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
  };

  return {
    init: init
  };
});