define([
  'events',
  './layout'
], function(events, layout) {
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
  };

  return {
    init: init
  };
});