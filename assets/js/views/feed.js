var app = app || {};

$(function() {
  'use strict';


  app.FeedView = Backbone.View.extend({
    tagName: 'div',

    template: _.template( $("#item-template").html() ), 

    events: {

    },

    initialize: function() {
      this.model.on('change', this.render, this);
      this.model.on('destroy', this.remove, this);
      //this.model.on('visible', this.toggleVisible, this);

    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }, 

    clear: function() {
      this.model.destroy();
    }
  });
});
