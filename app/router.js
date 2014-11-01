import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('apps', { path: '/app' }, function () {});
  this.resource('app', { path: '/app/:app_id' }, function () {});
  this.resource('environments', { path: 'app/env/' }, function () {});
  this.resource('environment', { path: 'app/env/:environment_id' }, function () {});
});

export default Router;
