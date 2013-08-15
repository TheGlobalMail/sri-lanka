require.config({
  paths: {
    jquery: '../components/jquery/jquery',
    lodash: '../components/lodash/lodash',
    config: './config',
    events: './libs/events',
    fatcontroller: './libs/fatcontroller',
    scrollTo: '../components/jquery.scrollTo/jquery.scrollTo',
    easing: '../components/jquery-easing/jquery.easing',
    timelinejs: '../components/timelinejs/compiled/js/storyjs-embed',
    handlebars: '../components/handlebars/handlebars',
    text: '../components/requirejs-text/text'
  },
  shim: {
    scrollTo: {
      deps: ['jquery']
    },
    timelinejs: {
      deps: ['jquery']
    },
    handlebars: {
      exports: 'Handlebars'
    }
  }
});

require([
  'jquery',
  'events',
  'config',
  './app/main',
  'timelinejs'
],
function($, events, config, app, timelinejs) {
  if (config.debugEvents) {
    window.fc = events;
  }
  $(app.init);
});
