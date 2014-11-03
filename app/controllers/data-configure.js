import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['apps'],
  breadCrumb: 'Configure',

  appSiblings: function () {
    var self = this;
    return this.get('controllers.apps.model').filter(function (app) {
      return app.id !== self.get('model.app.id');
    }).map(function (app) {
      return {
        name: 'app',
        model: app,
        title: app.get('title')
      };
    });
  }.property('controllers.apps.model.@each', 'model.app.id'),

  envSiblings: [],

  envSiblingsUpdate: function () {
    var self = this;
    var modelId = this.get('model.id');
    self.get('model.app').then(function (app) {
      app.get('environments').then(function (envs) {
        envs = envs
          .filter(function (env) { return env.id !== modelId; })
          .map(function (env) {
            return {
              name: 'environment',
              model: env,
              title: env.get('title')
            };
          });
        self.set('envSiblings', envs);
      });
    });
  }.observes('model.app', 'model.id'),

  preCrumbs: function () {
    return [
      {
        path: 'app',
        name: this.get('model.app.title'),
        model: this.get('model.app'),
        siblings: this.get('appSiblings')
      },
      {
        path: 'environment',
        name: this.get('model.title'),
        model: this.get('model'),
        siblings: this.get('envSiblings')
      },
      {
        path: 'data',
        name: 'Data',
        model: this.get('model'),
        moduleCrumb: true
      }
    ];
  }.property('model.app', 'model.app.title', 'envSiblings.@each', 'appSiblings.@each'),
});
