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
    text: '../components/requirejs-text/text',
    json: '../components/requirejs-plugins/src/json',
    scroll: './libs/scroll'
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
  './app/main'
],
function($, events, config, app) {
  if (config.debugEvents) {
    window.fc = events;
  }
  $(app.init);
});
