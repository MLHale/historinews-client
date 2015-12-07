import Ember from 'ember';

export default Ember.Component.extend({
  actions: {

  },

  didInsertElement: function () {
    this._super();

    Ember.run.scheduleOnce('afterRender', this, function () {
      // some jQuery UI stuff
      console.log('afterRender sidebar!');


      console.log(Ember.$("#endDate"));
      debugger;
    });
  }
});