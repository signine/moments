define([
  'jquery',
  'underscore',
  'backbone',
  'models/albums/AlbumsModel'
], function($, _, Backbone, AlbumsModel){
  var AlbumsCollection = Backbone.Collection.extend({
    model: AlbumsModel,
    
    initialize: function(){ 
      this._meta = {};
    },
    put: function(prop, value){
      this._meta[prop] = value;
    },
    parse: function(response){
      window.rr = response;
      return response.albums;
    },
    url: function(){
      return '/user/'+this._meta['user_id']+'/albumz';
    }

  });
 
  return AlbumsCollection;
});
