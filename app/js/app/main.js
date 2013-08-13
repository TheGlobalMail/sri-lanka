define([
  './layout'
], function(layout) {
  'use strict';

  var init = function() {
    layout.init();
  };

  return {
    init: init
  };
});