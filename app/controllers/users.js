import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['apps'],
  moduleCrumb: function () {
    return {
      path: 'users',
      model: this.get('model'),
      title: 'Users',
      siblings: this.get('controllers.apps').getModuleSiblings('users', this.get('model'))
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

  rows: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  user: {
    id: '23904283942',
    username: 'artburkart',
    email: 'arthur@kinvey.com',
    _acl: '{creator: "5....',
    _kmd: '{lmt: "2014-...'
  }
});
