var app = app || {};

$(function($) {
  'use strict';

  app.AppView = Backbone.View.extend({
    el: '.container',

    //template: _.template($('#main-template').html());

    events: {
      'click #add': 'addFeed'
    },

    initialize: function() {
      this.input = this.$('#feedIn');
      //app.Feeds.on('add', this.addFeed, this);
    },

    render: function() {
      return this;
    },

    addFeed: function(e) {
      console.log("here");
      var tmp = app.Feeds.create({url: this.input.val().trim()});
      tmp.populate();
    }
  });
});
