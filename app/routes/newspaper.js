import Ember from 'ember';

export default Ember.Route.extend({
  afterModel: function(model, transition) {
      var applicationController = this.controllerFor("application");
      applicationController.set('breadCrumbNewspaperTitle', model.get('newspaperTitle'));
      applicationController.set("viewingPDF", true);
  },
  actions: {
    willTransition: function(transition){
      var applicationController = this.controllerFor("application");
      applicationController.set("viewingPDF", false);
    }
  },
});