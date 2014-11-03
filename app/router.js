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
  this.route('business-logic', { path: 'app/env/:environment_id/business-logic' });
  this.route('data', { path: 'app/env/:environment_id/data' });
  this.route('data-configure', { path: 'app/env/:environment_id/data/configure'});
  this.route('users', { path: 'app/env/:environment_id/users' });
  this.route('files', { path: 'app/env/:environment_id/files' });
  this.route('dashboard', { path: 'app/env/:environment_id/dashboard' });
  this.route('push', { path: 'app/env/:environment_id/push' });
  this.route('push-send', { path: 'app/env/:environment_id/push/send' });
  this.route('push-configure', { path: 'app/env/:environment_id/push/configure' });
  this.route('branding', { path: 'app/env/:environment_id/branding' });
  this.route('branding-configure', { path: 'app/env/:environment_id/branding/configure'});
  this.route('analytics', { path: 'app/env/:environment_id/analytics' });
  this.route('api-console', { path: 'app/env/:environment_id/api-console' });
  this.route('profile');
  this.route('billing');
});

export default Router;
