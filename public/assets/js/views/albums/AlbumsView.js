define([
  'jquery',
  'underscore',
  'backbone',
  'models/albums/AlbumsModel',
  'collections/albums/AlbumsCollection',
  'views/albums/AlbumsListView',
  'text!templates/albums/albumsTemplate.html'
], function($, _, Backbone, AlbumsModel, AlbumsCollection, AlbumsListView, albumsTemplate){

  var AlbumsView = Backbone.View.extend({
    el: $("#page"),

    events: {
      'click #submit_album': 'sendAlbum'
    },

    sendAlbum : function (e){
      var album = new AlbumsModel({user_id: window.user_id});
      $title = $("#submit_album").parent().find("input:text").val();
      album.set({session_id: window.session_id, title: $title});
      album.save({}, {
        success: function(model, resp){
          console.log(resp);
          alert('added');
        },
        error: function(model, resp){
          console.log(resp);
          alert('failed')
        }
      });
    },
    render: function(){

      //This stuff is required for some reason
      $('.menu li').removeClass('active');
      $('.menu li a[href="'+window.location.hash+'"]').parent().addClass('active');
      this.$el.hide();
      this.$el.html(albumsTemplate).fadeIn();

      var aC = new AlbumsCollection();
      aC.put("user_id",window.user_id);
      aC.put("session_id",window.session_id); 
      aC.fetch({data: {session_id: window.session_id}, type: 'GET'}); 
      window.ac = aC;
      
      var albumListView = new AlbumsListView({ collection: aC}); 
      
      albumListView.render(); 


    },

  });

  return AlbumsView;
});
