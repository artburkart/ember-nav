import Ember from 'ember';

export default Ember.Controller.extend({
  // Generates title for breadcrumb
  breadCrumb: 'Kinvey',

  // Module hash and list of modules for dropdown menu generation
  moduleHash: {
    'dashboard': 'Dashboard',
    'push': 'Push',
    'business-logic': 'Business Logic',
    'branding': 'Branding',
    'data': 'Data',
    'analytics': 'Analytics',
    'users': 'Users',
    'api-console': 'API Console',
    'files': 'Files'
  },
  modules: [{
    typeKey: 'environment.api-console',
    title: 'API Console',
    model: null
  }, {
    typeKey: 'environment.analytics',
    title: 'Analytics',
    model: null
  }, {
    typeKey: 'environment.business-logic',
    title: 'Business Logic',
    model: null
  }, {
    typeKey: 'environment.branding',
    title: 'Branding',
    model: null
  }, {
    typeKey: 'environment.dashboard',
    title: 'Dashboard',
    model: null
  }, {
    typeKey: 'environment.data',
    title: 'Data',
    model: null
  }, {
    typeKey: 'environment.files',
    title: 'Files',
    model: null
  }, {
    typeKey: 'environment.push',
    title: 'Push',
    model: null
  }, {
    typeKey: 'environment.users',
    title: 'Users',
    model: null
  }]
});
