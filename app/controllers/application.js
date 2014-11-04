import Ember from 'ember';

export default Ember.Controller.extend({
  breadCrumb: 'Kinvey',
  modules: [{
    typeKey: 'dashboard',
    title: 'Dashboard',
    model: null
  }, {
    typeKey: 'push',
    title: 'Push',
    model: null
  }, {
    typeKey: 'business-logic',
    title: 'Business Logic',
    model: null
  }, {
    typeKey: 'branding',
    title: 'Branding',
    model: null
  }, {
    typeKey: 'data',
    title: 'Data',
    model: null
  }, {
    typeKey: 'analytics',
    title: 'Analytics',
    model: null
  }, {
    typeKey: 'users',
    title: 'Users',
    model: null
  }, {
    typeKey: 'api-console',
    title: 'API Console',
    model: null
  }, {
    typeKey: 'files',
    title: 'Files',
    model: null
  }]
});
