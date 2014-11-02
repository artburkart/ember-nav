import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['apps'],

  breadCrumb: function () {
    return this.get('model.title');
  }.property('model.title'),

  crumbSiblings: [],

  appSiblings: function () {
    var self = this;
    return this.get('controllers.apps.model')
      .filter(function (app) { return app.id !== self.get('model.app.id'); })
      .map(function (app) {
        return {
          name: 'app',
          model: app,
          title: app.get('title')
        };
      });
  }.property('controllers.apps.model.@each', 'model.app.id'),

  preCrumbs: function () {
    return [
      {
        path: 'app',
        name: this.get('model.app.title'),
        model: this.get('model.app'),
        siblings: this.get('appSiblings')
      }
    ];
  }.property('model.id', 'model.app', 'model.app.title', 'appSiblings.@each'),

  siblingsUpdate: function () {
    var modelId;
    var self = this;
    self.get('model.app').then(function (app) {
      app.get('environments').then(function (envs) {
        modelId = self.get('model.id');
        envs = envs
          .filter(function (env) { return env.id !== modelId; })
          .map(function (env) {
            return {
              name: 'environment',
              model: env, title:
              env.get('title')};
          });
        self.set('crumbSiblings', envs);
      });
    });
  }.observes('model.app', 'model.id')
});
