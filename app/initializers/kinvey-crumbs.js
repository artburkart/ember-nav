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
    var breadCrumbs, controllers, deepestCrumb, defaultPaths;
    controllers = this.get("controllers");
    defaultPaths = this.get("pathNames");
    breadCrumbs = [];
    controllers.forEach(function(controller, index) {
      var crumbName, crumbSiblings, defaultPath, moduleCrumb, preCrumbs, specifiedPath;
      crumbName = controller.get("breadCrumb");
      crumbSiblings = controller.get('crumbSiblings');
      moduleCrumb = controller.get('moduleCrumb');
      preCrumbs = controller.get('preCrumbs');

      // Hack for adding pre-crumbs
      if (!Ember.isEmpty(preCrumbs)) {
        preCrumbs.forEach(function (pc) {
          breadCrumbs.addObject({
            path: pc.path,
            model: pc.model,
            title: pc.title,
            modelLink: true,
            isCurrent: false,
            siblings: pc.siblings
          });
        });
      }
      defaultPath = defaultPaths[index];
      specifiedPath = controller.get('breadCrumbPath');
      if (!Ember.isEmpty(moduleCrumb)) {
        return breadCrumbs.addObject({
          path: moduleCrumb.path,
          model: moduleCrumb.model,
          title: moduleCrumb.title,
          modelLink: true,
          isCurrent: false,
          siblings: moduleCrumb.siblings
        });
      }
      if (!Ember.isEmpty(crumbName)) {
        return breadCrumbs.addObject({
          title: crumbName,
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
    "controllers.@each.breadCrumbPath",
    'controllers.@each.moduleCrumb',
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