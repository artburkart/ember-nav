import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function () {
    var self = this;
    // This guarantees the app Models will be accessible from any controller
    // when the application fires up
    self.store.find('app').then(function (apps) {
      self.controllerFor('apps').set('model', apps);
    });
  },

  getModuleNames: function () {
    return [
      'dashboard', 'push', 'business-logic', 'branding', 'data',
      'analytics', 'users', 'api-console', 'files'
    ];
  },

  getModulesHash: function () {
    return {
      dashboard: 'Dashboard',
      push: 'Push',
      'business-logic': 'Business Logic',
      branding: 'Branding',
      data: 'Data',
      analytics: 'Analytics',
      users: 'Users',
      'api-console': 'API Console',
      files: 'Files'
    };
  }
});
