define([
  'jquery',
  'handlebars',
  'require'
], function(jquery, handlebars, require) {

  var templateRoot = '/templates/';

  var init = function() {
    $('[data-template-src]').each(function() {
      var element = $(this);
      var templatePath = 'text!' + templateRoot + element.data('template-src');

      require([templatePath], function(template) {
        element.replaceWith(template);
      });
    });
  };

  return {
    init: init
  };
});