define([
  'jquery',
  'handlebars',
  'require',
  'events'
], function(jquery, handlebars, require, events) {

  var templateDir = location.pathname.split('/')[1];

  if (!templateDir) {
    // Extract templateDir from hashbang
    templateDir = location.hash.substring(2).replace(/\//g, '');
    // Update url to be nice if pushstate is available
    if (history && history.pushState) {
      history.pushState({}, templateDir, templateDir);
    }
  }

  if (templateDir === '') {
    templateDir = 'introduction';
  }

  var header;
  var stickyHeader;
  var byline;
  var author;
  var image;
  var article;
  var content;
  var body;
  var nextChapter;

  var _getTemplatePath = function(file) {
    return '/templates/' + templateDir + '/' + file;
  };

  var getJSONFile = function(file) {
    return 'json!' + _getTemplatePath(file);
  };

  var getTextFile = function(file) {
    return 'text!' + _getTemplatePath(file);
  };

  var insertIdentifier = function() {
    article.add(body)
      .addClass(templateDir);
  };

  var insertData = function() {
    require([getJSONFile('data.json')], function(data) {
      header.html(data.header);
      stickyHeader.html(data.header);
      byline.html(data.byline);
      author.html(data.author);
      image.css({
        'background-image': 'url(/images/' + data.image + ')'
      });
      events.trigger('template:inserted:data');
    });
  };

  var insertContent = function() {
    require([getTextFile('content.html')], function(text) {
      content.append(text);
      events.trigger('template:inserted:content');
    });
  };

  var insertNextChapter = function() {
    require([getTextFile('next-chapter.html')], function(text) {
      nextChapter.append(text);
      events.trigger('template:inserted:next-chapter');
    });
  };

  var init = function() {
    stickyHeader = $('.navbar .article-title');

    var articleHeader = $('.article-header');
    header = articleHeader.find('.header');
    byline = articleHeader.find('.byline');
    author = articleHeader.find('.author');
    image = articleHeader.find('.image');

    article = $('article');
    content = article.find('.content');
    body = $('body');
    nextChapter = $('.next-chapter');

    insertIdentifier();
    insertData();
    insertContent();
    insertNextChapter();
  };

  return {
    init: init
  };
});
