import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['apps'],
  // Used for title of breadcrumb
  breadCrumb: function () {
    return this.get('model.title');
  }.property('model.title'),

  // Used to generate dropdown for breadcrumb
  crumbSiblings: function () {
    var self = this;
    return this.get('controllers.apps.model').filter(function (app) {
      return app.get('id') !== self.get('model.id');
    });
  }.property('controllers.apps.model.@each', 'model')
});
