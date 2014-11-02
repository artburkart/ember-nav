import Ember from 'ember';

export default Ember.Controller.extend({
  breadCrumb: function () {
    return this.get('model.title');
  }.property('model.title'),
  modelCrumbs: function () {
    return [
      {
        path: 'app',
        name: this.get('model.app.title'),
        model: this.get('model.app')
      }
    ];
  }.property('model.app', 'model.app.title')
});
