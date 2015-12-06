import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function(transition){
      var applicationController = this.controllerFor("application");
      applicationController.set("viewingPDF", true);
  },
  actions: {
    willTransition: function(transition){
      var applicationController = this.controllerFor("application");
      applicationController.set("viewingPDF", false);
    }
  },
});