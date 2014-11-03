import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['apps'],

  breadCrumb: function () {
    return this.get('model.title');
  }.property('model.title'),

  crumbSiblings: [],

  preCrumbs: function () {
    return [
      {
        path: 'app',
        title: this.get('model.app.title'),
        model: this.get('model.app'),
        siblings: this.get('controllers.apps').getSiblings(this.get('model.app'))
      }
    ];
  }.property('model.id', 'model.app', 'model.app.title', 'controllers.apps.model.@each'),

  crumbSiblingsUpdate: function () {
    var self = this;
    this.get('controllers.apps').getEnvSiblings(this.get('model'), function (siblings) {
      self.set('crumbSiblings', siblings);
    });
  }.observes('model')
});
