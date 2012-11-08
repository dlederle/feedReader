var app = app || {};

(function() {
  'use strict';

  app.Feed = Backbone.Model.extend({
    defaults: {
      error: false,
      logo: false,
      title: '',
      url: '',        //URL for feed
      link: '',       //URL for site
      stories: []
      //Objects in this form:
      /*
      {
        title: '',
        link: '',
        text: '',
        read: false
      } */
    },

    populate: function() {
      $.ajax({
        url: "http://rosemary.umw.edu/~dlederle/cpsc448/feedReader/sweetproxy.php?url=" +
          escape(this.get("url")),
        type: "GET",
        dataType: "xml",
        context: this
      }).done(this.parseFeed).error(this.errorLog);
    },

    parseFeed: function(feed) {
      var stories = [];
      var logo = $(feed).find("rss > channel > image");

      if (logo) { 
          this.set('logo', { 
                      url:   logo.find('url').text(), 
                      title: logo.find('title').text() 
          }); 
      }
      this.set('title', $(feed).find("rss > channel > title").text());
      this.set('link',  $(feed).find("rss > channel > link").text());
      
      $(feed).find('rss > channel > item').each(function(index, val) {
          var x = $(val);
          stories.push({
            title: x.find('title').text(),
            link:  x.find('link').text(),
            text:  x.find('description').text(),
            read:  false
          });
      });
      this.set('stories', stories);
      this.save();
      if(this.get("error")) {
        app.Feeds.remove(this);
      } else {
        app.Feeds.trigger('render');
        app.Feeds.trigger('renderFeed', { feed: { model: this } });
      }
    },

    errorLog: function(e) {
      console.log("errr");
      console.log(e);
      this.error = true;
    },

    validate: function(attr) {
      var err = false;
      var that = this;
      if(attr.link) {
        app.Feeds.forEach(function(el, ind, arr) {
          if(el !== that && el.get('url') === attr.url) {
            err = true;
          }
        });
      }
      if(err) { 
        console.log("duplicate");
        this.set('error', true);
        return "Duplicate feed"; 
      };
    }
  });
}());
