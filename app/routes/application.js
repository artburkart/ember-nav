import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function () {
    var self = this;
    // Guarantee app Models are accessible from any controller
    self.store.find('app').then(function (apps) {
      self.controllerFor('apps').set('model', apps);
    });
  },
});
