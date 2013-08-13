define(function() {
  // Defaults
  var config = {
    // flags
    debug: false,
    debugEvents: false
  };

  if (location.search.indexOf('debug') != -1) {
    // Verbose logging
    config.debug = true;
  }

  if (location.search.indexOf('events') != -1 || config.debug) {
    // Log event bindings and triggers with stack traces
    config.debugEvents = true;
  }

  return config;
});
