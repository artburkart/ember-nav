import Ember from 'ember';
var KinveyCrumbs = window.BreadCrumbs;

// I had to reopen the component and re-initialize it because
// reopening it in app/app.js doesn't allow me to override the template
// See https://github.com/chrisfarber/ember-breadcrumbs/issues/8
KinveyCrumbs.BreadCrumbsComponent.reopen({
  tagName: 'ol',
  classNames: 'breadcrumb',
  layout: null,
  layoutName: 'kinvey-crumbs',
  moduleNames: [
    'dashboard', 'push', 'business-logic', 'branding', 'data',
    'analytics', 'users', 'api-console', 'files'
  ],
  moduleHash: {
    dashboard: 'Dashboard',
    push: 'Push',
    'business-logic': 'Business Logic',
    branding: 'Branding',
    data: 'Data',
    analytics: 'Analytics',
    users: 'Users',
    'api-console': 'API Console',
    files: 'Files'
  },
  breadCrumbs: (function() {
    var self = this;
    var breadCrumbs, controllers, deepestCrumb, defaultPaths;
    controllers = this.get("controllers");
    defaultPaths = this.get("pathNames");
    breadCrumbs = [];
    controllers.forEach(function(controller, index) {
      var crumbName, crumbSiblings, curModel, defaultPath, moduleCrumb, preCrumbs, specifiedPath;
      crumbName = controller.get("breadCrumb");
      crumbSiblings = controller.get('crumbSiblings');
      moduleCrumb = controller.get('moduleCrumb');
      preCrumbs = controller.get('preCrumbs');
      curModel = controller.get('model');

      // Hack for adding pre-crumbs
      if (!Ember.isEmpty(preCrumbs)) {
        preCrumbs.forEach(function (pc) {
          breadCrumbs.addObject({
            path: pc.path,
            model: pc.model,
            name: pc.name,
            modelLink: true,
            isCurrent: false,
            siblings: pc.siblings
          });
        });
      }
      if (!Ember.isEmpty(crumbName)) {
        defaultPath = defaultPaths[index];
        specifiedPath = controller.get("breadCrumbPath");
        if (!Ember.isEmpty(moduleCrumb)) {
          return breadCrumbs.addObject({
            name: crumbName,
            path: moduleCrumb.path,
            linkable: specifiedPath !== false,
            isCurrent: false,
            siblings: self.get('moduleNames').filter(function (name) {
              return name !== moduleCrumb.path;
            }).map(function (name) {
              return {name: name, model: curModel, title: self.get('moduleHash')[name]};
            })
          });
        }
        return breadCrumbs.addObject({
          name: crumbName,
          path: specifiedPath || defaultPath,
          linkable: specifiedPath !== false,
          isCurrent: false,
          siblings: crumbSiblings
        });
      }
    });
    deepestCrumb = breadCrumbs.get("lastObject");
    if (deepestCrumb) {
      deepestCrumb.isCurrent = true;
    }
    return breadCrumbs;
  }).property(
    "controllers.@each.breadCrumb",
    "controllers.@each.preCrumbs.@each",
    "controllers.@each.crumbSiblings.@each",
    "controllers.@each.appSiblings.@each",
    "controllers.@each.envSiblings.@each",
    "controllers.@each.breadCrumbPath",
    "pathNames.[]")
});

export function initialize(container, app) {
  app.register("component:kinvey-crumbs", KinveyCrumbs.BreadCrumbsComponent);
  app.inject("component:kinvey-crumbs", "router", "router:main");
  return app.inject("component:kinvey-crumbs", "applicationController", "controller:application");
}

export default {
  name: 'kinvey-crumbs',
  initialize: initialize
};