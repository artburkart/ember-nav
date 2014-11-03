import Ember from 'ember';

export default Ember.ArrayController.extend({
  getSiblings: function (model) {
    return this.get('model').filter(function (item) {
      return item.get('id') !== model.get('id');
    }).map(function (item) {
      return {
        path: item.get('typeKey'),
        model: item,
        title: item.get('title')};
    });
  },
  getEnvSiblings: function (model, callback) {
    model.get('app').then(function (app) {
      app.get('environments').then(function (envs) {
        return callback(
          envs.filter(function (env) { return env.id !== model.get('id'); })
          .map(function (env) {
            return {
              path: env.get('typeKey'),
              model: env,
              title: env.get('title')
            };
          }));
      });
    });
  },
  getModuleSiblings: function (moduleName, curModel) {
    var self = this;
    return self.get('moduleNames').filter(function (name) {
      return name !== moduleName;
    }).map(function (name) {
      return {
        path: name,
        model: curModel,
        title: self.get('moduleHash')[name]
      };
    });
  },
  moduleNames: [
    'dashboard', 'push', 'business-logic', 'branding', 'data',
    'analytics', 'users', 'api-console', 'files'
  ],
  moduleHash: {
    dashboard: 'Dashboard',
    push: 'Push',
    'business-logic': 'Business Logic',
    branding: 'Branding',
    data: 'Data',
    analytics: 'Analytics',
    users: 'Users',
    'api-console': 'API Console',
    files: 'Files'
  },
});
