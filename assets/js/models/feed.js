var app = app || {};

(function() {
  'use strict';

  app.Feed = Backbone.Model.extend({
    defaults: {
      error: false,
      title: '',
      url: '',
      stories: [{
        title: '',
        text: '',
        read: false
      }]
    },

    populate: function() {
      $.ajax({
        url: "http://rosemary.umw.edu/~stephen/sweetproxy.php?url=" +
          escape(this.get("url")),
        type: "GET",
        dataType: "xml",
      }).done(this.parseFeed).error(this.errorLog);
    },

    parseFeed: function(feed) {
      console.log("parsing");
      console.log(feed);
    },

    errorLog: function(e) {
      console.log(e);
      this.error = true;
    }
  });
}());
