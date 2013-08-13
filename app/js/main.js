require.config({
  paths: {
    jquery: '../components/jquery/jquery',
    lodash: '../components/lodash/lodash',
    config: './config',
    events: './libs/events',
    fatcontroller: './libs/fatcontroller',
    scrollTo: '../components/jquery.scrollTo/jquery.scrollTo',
    easing: '../components/jquery-easing/jquery.easing'
  },
  shim: {
    scrollTo: {
      deps: ['jquery']
    }
  }
});

require([
  'jquery',
  'events',
  'config',
  './app/main'
],
function($, events, config, app) {
  if (config.debugEvents) {
    window.fc = events;
  }
  $(app.init);
});
