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

  var watchElement = function(element, identifier) {
    var obj = {
      element: element,
      eventIdentifier: identifier
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

  var offsetInViewport = function(offset, resetScrollY) {
    if (resetScrollY) {
      scrollY = getScrollY();
    }
    return (
      (offset.top >= scrollY) && (offset.top <= scrollY + windowHeight) ||
      (offset.bottom >= scrollY) && (offset.bottom <= scrollY + windowHeight)
    );
  };

  var _checkElement = function(obj) {
    // Check if an element is within the viewport and trigger
    // events when an element enters or exits.
    var offset = obj.offset;
    var event = null;

    var inViewport = offsetInViewport(offset);

    var eventIdentifier = obj.eventIdentifier;

    if (inViewport && !obj.inViewport) {
      obj.inViewport = true;
      event = 'scroll:enter:' + eventIdentifier;
    } else if (!inViewport && obj.inViewport) {
      obj.inViewport = false;
      event = 'scroll:exit:' + eventIdentifier;
    }

    if (event) {
      events.trigger(event);
    }
  };

  var checkElements = function() {
    _.each(elementsToWatch, _checkElement);
  };

  var getScrollYWrapper = function() {
    return getScrollY() + fixedHeaderHeight;
  };

  var getWindowHeight = function() {
    return window.innerHeight - (fixedHeaderHeight);
  };

  var onScroll = function() {
    scrollY = getScrollYWrapper();
    checkElements();
  };

  var onResize = function() {
    windowHeight = getWindowHeight();
    reinitialiseElements();
  };

//  var forceRecheck = function() {
//    // reset all inViewport attributes
//    for (var i = 0; i < elementsToWatch.length; i++) {
//      elementsToWatch[i].inViewport = false;
//    }
//    // trigger on scroll
//    onScroll();
//  };

  var setBindings = function() {
    $(window).on('scroll', _.throttle(onScroll, 75));
    $(window).on('resize', _.debounce(onResize, 75));
  };

  var init = function() {
    fixedHeaderHeight = $('.navbar').outerHeight();

    scrollY = getScrollYWrapper();
    windowHeight = getWindowHeight();
    setBindings();
  };

  return {
    init: init,
//    forceRecheck: forceRecheck,
    watchElement: watchElement
  };
});