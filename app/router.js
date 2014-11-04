import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('apps', function() {
    this.resource('app', { path: ':app_id' }, function() {
      this.resource('environments', function() {
        this.resource('environment', { path: ':environment_id' }, function() {
          // Modules
          this.route('analytics');
          this.route('api-console');
          this.route('branding');
          this.route('business-logic');
          this.route('dashboard');
          this.route('data');
          this.route('files');
          this.route('push');
          this.route('users');

          // Submodules
          this.route('analytics_configure', {path: 'analytics/configure'});
          this.route('api-console_configure', {path: 'api-console/configure'});
          this.route('branding_configure', {path: 'branding/configure'});
          this.route('business-logic_configure', {path: 'business-logic/configure'});
          this.route('dashboard_configure', {path: 'dashboard/configure'});
          this.route('data_configure', {path: 'data/configure'});
          this.route('files_configure', {path: 'files/configure'});
          this.route('push_configure', {path: 'push/configure'});
          this.route('users_configure', {path: 'users/configure'});
        });
      });
    });
  });
  this.route('profile');
  this.route('billing');
});

export default Router;
