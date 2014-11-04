import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['apps'],
  breadCrumb: function () {
    return this.get('model.title');
  }.property('model.title'),
  crumbSiblings: function () {
    var self = this;
    return this.get('controllers.apps.model').filter(function (app) {
      return app.get('id') !== self.get('model.id');
    });
  }.property('controllers.apps.model.@each')
});
