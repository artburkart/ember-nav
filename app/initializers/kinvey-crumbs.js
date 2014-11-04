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
  breadCrumbs: (function() {
    var breadCrumbs, controllers, deepestCrumb, defaultPaths;
    controllers = this.get("controllers");
    defaultPaths = this.get("pathNames");
    breadCrumbs = [];
    controllers.forEach(function(controller, index) {
      var crumbName, crumbSiblings, defaultPath, specifiedPath;
      crumbName = controller.get("breadCrumb");
      if (!Ember.isEmpty(crumbName)) {
        defaultPath = defaultPaths[index];
        specifiedPath = controller.get("breadCrumbPath");
        return breadCrumbs.addObject({
          name: crumbName,
          path: specifiedPath || defaultPath,
          linkable: specifiedPath !== false,
          isCurrent: false,
          siblings: controller.get('crumbSiblings')
        });
      }
    });
    deepestCrumb = breadCrumbs.get("lastObject");
    if (deepestCrumb) {
      deepestCrumb.isCurrent = true;
    }
    return breadCrumbs;
  }).property("controllers.@each.breadCrumb", "controllers.@each.crumbSiblings.@each", "controllers.@each.breadCrumbPath", "pathNames.[]")
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