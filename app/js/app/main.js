define([
  'lodash',
  'events',
  './layout',
  './timeline',
  './headerNav',
  './media',
  './analytics',
  'scroll'
], function(_, events, layout, timeline, templates, headerNav, media, analytics, scroll) {
  'use strict';

  var body;

  var removeLoadingState = function() {
    events.trigger('loading:complete');
    body.removeClass('loading');
  };

  var setBindings = function() {
    var loadingStateUntil = [
      'layout:complete',
      'media:loaded'
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
    media.init();
    headerNav.init();
    scroll.init();
    analytics.init();
  };

  return {
    init: init
  };
});
