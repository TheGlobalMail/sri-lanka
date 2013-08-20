define([
  'lodash',
  'events',
  './layout',
  './timeline',
  './templates',
  './headerNav',
  './media',
  'scroll'
], function(_, events, layout, timeline, templates, headerNav, media, scroll) {
  'use strict';

  var body;

  var removeLoadingState = function() {
    events.trigger('loading:complete');
    body.removeClass('loading');
  };

  var setBindings = function() {
    var loadingStateUntil = [
      'layout:complete',
      'template:inserted:data',
      'template:inserted:content',
      'template:inserted:next-chapter',
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
    templates.init();
    headerNav.init();
    scroll.init();
  };

  return {
    init: init
  };
});