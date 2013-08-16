define([
  'jquery',
  'lodash',
  'events'
], function ($, _, events) {

  var elementsToWatch = [];

  // Cached globals values
  var scrollY;
  var windowHeight;
  var fixedHeaderHeight;

  var getScrollY = function() {
    return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  };

  var observe = function(element, bindings) {
    var obj = {
      element: element,
      bindings: bindings
    };
    obj = _initElement(obj);
    elementsToWatch.push(obj);
    return obj;
  };

  var _initElement = function(obj) {
    // Calculate the position of an element and cache
    // as many values as possible

    var element = obj.element;
    var offset = element.offset();
    offset.bottom = offset.top + element.outerHeight();
    return _.extend(obj, {
      element: element,
      offset: offset,
      inViewport: false
    });
  };

  var reinitialiseElements = function() {
    _.map(elementsToWatch, _initElement);
  };

  var offsetFromViewport = function(offset) {
    var position = {
      in: false,
      out: false,
      above: false,
      below: false
    };

    var windowTop = scrollY;
    var windowBottom = scrollY + windowHeight;
    var elementTop = offset.top;
    var elementBottom = offset.bottom;

    var aboveTop = elementBottom <= windowTop;
    var belowTop = elementBottom >= windowTop;

    var aboveBottom = elementTop <= windowBottom;
    var belowBottom = elementTop >= windowBottom;

    if (belowTop && aboveBottom) {
      position.in = true;
    } else {
      position.out = true;
      position.above = aboveTop;
      position.below = belowBottom;
    }

    return position;
  };

  var _checkElement = function(obj) {
    // Check if an element is within the viewport and trigger
    // events when an element enters or exits.
    var offset = obj.offset;
    var bindings = obj.bindings;
    var position = offsetFromViewport(offset);

    // Enter
    if (position.in && !obj.inViewport) {
      obj.inViewport = true;
      if (bindings.enter) {
        bindings.enter()
      }
    // Exit
    } else if (position.out && obj.inViewport) {
      obj.inViewport = false;
      if (bindings.exit) {
        bindings.exit()
      }
    }
    // Above
    if (position.above && bindings.above) {
      bindings.above();
    // Below
    } else if (position.below && bindings.below) {
      bindings.below();
    }
  };

  var checkElements = function() {
    _.each(elementsToWatch, _checkElement);
  };

  var getWindowHeight = function() {
    return window.innerHeight - (fixedHeaderHeight);
  };

  var onScroll = function() {
    scrollY = getScrollY();
    checkElements();
  };

  var onResize = function() {
    windowHeight = getWindowHeight();
    reinitialiseElements();
  };

  var setBindings = function() {
    $(window).on('scroll', _.throttle(onScroll, 75));
    $(window).on('resize', _.debounce(onResize, 75));
  };

  var init = function() {
    fixedHeaderHeight = $('.navbar').outerHeight();

    scrollY = getScrollY();
    windowHeight = getWindowHeight();
    setBindings();
  };

  return {
    init: init,
    checkElements: checkElements,
    observe: observe
  };
});