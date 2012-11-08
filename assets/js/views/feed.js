var app = app || {};

$(function() {
  'use strict';


  app.FeedView = Backbone.View.extend({
    tagName: 'div',

    template: _.template( $("#item-template").html() ), 

    events: {
    /*
      'click .expand':    'expand',
      'hover .story':     'show'
      */
    },

    initialize: function() {
      this.model.on('render', this.render, this);
      this.model.on('destroy', this.remove, this);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.addClass('content currStory');
      return this;
    }, 

    clear: function() {
      this.model.destroy();
    }
  });
});
