import Ember from 'ember';

export default Ember.Controller.extend({
  breadCrumb: 'Api Console',
  modelCrumbs: function () {
    return [
      {
        path: 'app',
        name: this.get('model.app.title'),
        model: this.get('model.app')
      },
      {
        path: 'environment',
        name: this.get('model.title'),
        model: this.get('model')
      }
    ];
  }.property('model.app', 'model.app.title')
});
