import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],

  // This is required because of ember-breadcrumbs
  breadCrumb: function () {
    return this.get('model.title');
  }.property('model.title'),

  // Updates crumb siblings
  crumbSiblingsUpdate: function () {
    var self = this;
    this.get('model.app').then(function (app) {
      app.get('environments').then(function (envs) {
        self.set('crumbSiblings', envs.filter(function (env) {
          return env.get('id') !== self.get('model.id');
        }));
      });
    });
  }.observes('model'),

  // Updates subsequent crumbs
  postCrumbsUpdate: function () {
    var curModule, modules, subModules;
    var self = this;
    var env = this.get('model');
    var moduleIndex = 4;
    var moduleHash = this.get('controllers.application.moduleHash');
    var postCrumbs = [];
    var currentPath = this.get('controllers.application.currentPath');
    currentPath = currentPath ? currentPath.split('.') : null;
    currentPath = currentPath ? currentPath[moduleIndex] : null;

    // Set the first succeeding crumb if it is the only one, otherwise set the chain of crumbs
    if (currentPath && moduleHash[currentPath]) {
      modules = this.getModulesWithModel(env);
      postCrumbs.push(this.buildModuleCrumb(moduleHash[currentPath], currentPath, env, modules));
    } else if (currentPath && currentPath.split('_').length > 1) {
      subModules = currentPath.split('_');
      modules = this.getModulesWithModel(env);
      postCrumbs.push(this.buildModuleCrumb(moduleHash[subModules[0]], subModules[0], env, modules));

      // This isn't ideal, but once I better understand the needs of the application vs the needs of the navigation,
      // it can be generalized to meet more cases
      // Essentially you need to include underscores in the submodule routes (refer to routes) to achieve hierarchy
      curModule = subModules[0];
      subModules.forEach(function (subModule, index) {
        if (index === 0) { return; }
        curModule += '_' + subModule;
        postCrumbs.push(self.buildModuleCrumb(subModule, curModule, env, []));
      });
    }
    this.set('postCrumbs', postCrumbs);
  }.observes('model', 'controllers.application.currentPath'),

  // Gets all the modules with the model set
  getModulesWithModel: function (model) {
    return this.get('controllers.application.modules').map(function (module) {
      return {
        typeKey: module.typeKey,
        title: module.title,
        model: model
      };
    });
  },

  // Builds a module-level crumb with given parameters
  buildModuleCrumb: function (name, path, model, siblings) {
    return {
      name: name,
      path: 'environment.' + path,
      linkable: true,
      isCurrent: false,
      model: model,
      siblings: siblings,
      modules: true
    };
  },
});
