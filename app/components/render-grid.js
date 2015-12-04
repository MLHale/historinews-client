import Ember from 'ember';

export default Ember.Component.extend({
	actions: {

		test: function(){
			alert("hit test action");
			//var auth = this.get('authControllerChild');
			//console.log('in nav bar sending login to auth controller');
			//auth.send('logout');
		},
	},

	didInsertElement: function () {
		this._super();

		Ember.run.scheduleOnce('afterRender', this, function () {
			// some jQuery UI stuff
			console.log('afterRender ran');

			this.$('#list').click(function(event) {
				event.preventDefault();
				/* jshint ignore:start */
				$('#products .item').addClass('list-group-item');
				/* jshint ignore:end */
			});
			this.$('#grid').click(function(event) {
				event.preventDefault();
				/* jshint ignore:start */
				$('#products .item').removeClass('list-group-item');
				$('#products .item').addClass('grid-group-item');
				/* jshint ignore:end */
			});
			/* jshint ignore:start */
			if ($(window).width() < 768) {
				$( "#list" ).click();
            }
            /* jshint ignore:end */
			this.$(window).resize(function() {
				/* jshint ignore:start */
				if ($(window).width() < 768) {
					$( "#list" ).click();
                }
                else {
					$( "#grid" ).click();
                }
                /* jshint ignore:end */
            });
		});
	}
});