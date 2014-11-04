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
          this.resource('business-logic', function () {
            this.route('configure');
          });
          this.route('data');
          // this.resource('data', function () {
          //   this.route('configure');
          // });
          this.resource('branding', function () {
            this.route('configure');
          });
          this.resource('users', function () {});
          this.resource('files', function () {});
          this.resource('dashboard', function () {});
          this.resource('push', function () {});
          this.resource('analytics', function () {});
          this.resource('api-console', function () {});
        });
      });
    });
  });
  this.route('profile');
  this.route('billing');
});

export default Router;
