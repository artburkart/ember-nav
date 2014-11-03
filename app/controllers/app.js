import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['apps'],

  breadCrumb: function () {
    return this.get('model.title');
  }.property('model.title'),

  crumbSiblings: function () {
    return this.get('controllers.apps').getSiblings(this.get('model'));
  }.property('controllers.apps.model.@each', 'model')
});
