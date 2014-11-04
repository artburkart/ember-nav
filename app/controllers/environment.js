import Ember from 'ember';

export default Ember.Controller.extend({
  breadCrumb: function () {
    return this.get('model.title');
  }.property('model.title'),
  crumbSiblingsUpdate: function () {
    var self = this;
    this.get('model.app').then(function (app) {
      app.get('environments').then(function (envs) {
        self.set('crumbSiblings', envs.filter(function (env) {
          return env.get('id') !== self.get('model.id');
        }));
      });
    });
  }.observes('model'),
  postCrumbUpdate: function () {
    var curModule = window.location.pathname.split('/')[5];

  }.observes('model')
});
