import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('newspaper', {
    path: ':newspaper_id'
  });
});

export default Router;
