define([
  'jquery',
  'timelinejs',
  'events'
], function($, timelinejs, events) {

  var timelineConfig = function() {
    createStoryJS({
      type:       'timeline',
      width:      '100%',
      height:     '800',
      source:     './data/timeline.json',
      embed_id:   'timeline',
      font:       './styles/timeline/MetaFont.css',
      css:        './styles/timeline/timeline.css',
      js:         './components/timelinejs/compiled/js/timeline-min.js'
    });
  };

  var init = function() {
    events.on('template:loaded', function () {
      if ($('#timeline').length) {
        timelineConfig();
      }
    });
  };

  return {
    init: init
  };
});