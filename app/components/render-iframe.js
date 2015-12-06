import Ember from 'ember';

export default Ember.Component.extend({
	actions: {

	},

	didInsertElement: function () {
		this._super();

		Ember.run.scheduleOnce('afterRender', this, function () {
			// some jQuery UI stuff
			console.log('afterRender ran');

			this.$(window).resize(function() {
				console.log("pdf resized");
				Ember.$("#pdf-iframe")[0].contentDocument.location.reload(true);
            });
		});
	}
});