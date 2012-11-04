var app = app || {};

(function() {
  'use strict';

  var FeedList = Backbone.Collection.extend({
    model: app.Feed,
    comparator: function(feed) {
      return feed.get('order');
    }
  });
  app.Feeds = new FeedList();
}());
