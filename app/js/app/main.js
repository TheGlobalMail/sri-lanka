define([
  'lodash',
  'events',
  './layout',
  './timeline',
  './templates',
  './headerNav',
  'scroll'
], function(_, events, layout, timeline, templates, headerNav, scroll) {
  'use strict';

  var body;

  var removeLoadingState = function() {
    events.trigger('loading:complete');
    body.removeClass('loading');
  };

  var setBindings = function() {
    var loadingStateUntil = [
      'layout:complete'
    ];
    var loadingStageComplete = _.after(loadingStateUntil.length, removeLoadingState);
    _.each(loadingStateUntil, function(eventName) {
      events.on(eventName, loadingStageComplete);
    })
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
