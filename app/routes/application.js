import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    return this.store.find('article');
  },
  setupController: function (controller, model){
    // Get first instance of live ctf
    controller.set('articles', model);
  },
});
