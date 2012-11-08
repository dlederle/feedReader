var app = app || {};

$(function($) {
  'use strict';

  app.AppView = Backbone.View.extend({
    el: '.container-fluid',

    events: {
      'click #add': 'addFeed'
    },

    initialize: function() {
      this.input = this.$('#feedIn');

      app.Feeds.on('render', this.showFeedsList, this);
      app.Feeds.on('renderFeed', this.renderFeed, this);
    },

    render: function() {
      return this;
    },

    addFeed: function(e) {
      var tmp = app.Feeds.create({url: this.input.val().trim()});
      tmp.populate();
    },

    renderFeed: function(options) {
      var view = new app.FeedView({ model: options.feed.model });
      $('.currStory').replaceWith(view.render().el);
    },

    showFeedsList: function() {
      $('#feeds-container > p').remove();
      $('#feeds').children().remove();
      var view;
      app.Feeds.forEach(function(el, ind, arr) { 
        view = new app.SidebarFeedView({ model: el });
        $('#feeds').append(view.render().el);
      });
    }

  });
});
