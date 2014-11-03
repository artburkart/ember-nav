import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['apps'],
  moduleCrumb: function () {
    return {
      path: 'branding',
      model: this.get('model'),
      title: 'Branding',
      siblings: this.get('controllers.apps').getModuleSiblings('branding', this.get('model'))
    };
  }.property(),

  envSiblings: [],

  envSiblingsUpdate: function () {
    var self = this;
    this.get('controllers.apps').getEnvSiblings(this.get('model'), function (sibs) {
      self.set('envSiblings', sibs);
    });
  }.observes('model'),

  preCrumbs: function () {
    return [
      {
        path: 'app',
        title: this.get('model.app.title'),
        model: this.get('model.app'),
        siblings: this.get('controllers.apps').getSiblings(this.get('model.app'))
      }, {
        path: 'environment',
        title: this.get('model.title'),
        model: this.get('model'),
        siblings: this.get('envSiblings')
      }
    ];
  }.property('model.app', 'model.app.title', 'envSiblings.@each', 'appSiblings.@each'),
});
