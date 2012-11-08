var app = app || {};

$(function() {
  'use strict';

  app.SidebarFeedView = Backbone.View.extend({
    tagName: 'li',

    template: _.template( $("#sidebar-template").html() ), 

    events: {
       'click .sidebar-item': 'renderFeed', 
       'hover .sidebar-item': 'highlight',
       'mouseout .sidebar-item': 'unhighlight'
    },

    initialize: function() {
      this.model.on('destroy', this.remove, this);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }, 

    renderFeed: function() {
      this.model.trigger('renderFeed', { feed: this }); 
    },

    clear: function() {
      this.model.destroy();
    },

    highlight: function() {
      this.$el.addClass('highlighted');
    },

    unhighlight: function() {
      this.$el.removeClass('highlighted');
    }

  });
});
