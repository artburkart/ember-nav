import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function () {
    var self = this;
    // This guarantees the app Models will be accessible from any controller
    // when the application fires up
    self.store.find('app').then(function (apps) {
      self.controllerFor('apps').set('model', apps);
    });
    self.getModuleNames().forEach(function (name) {
      self.controllerFor(name).set('moduleNames', self.getModuleNames());
    });
    var modulesHash = self.getModulesHash();
    for (var key in modulesHash) {
      if (modulesHash.hasOwnProperty(key)) {
        self.controllerFor(key).set('modulesHash', modulesHash);
      }
    }
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
