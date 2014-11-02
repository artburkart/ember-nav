var KinveyCrumbs = window.BreadCrumbs;
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
      var crumbName, defaultPath, modelCrumbs, specifiedPath;
      crumbName = controller.get("breadCrumb");
      modelCrumbs = controller.get('modelCrumbs');
      // Hack for adding model-crumbs
      if (!Ember.isEmpty(modelCrumbs)) {
        modelCrumbs.forEach(function (pc) {
          breadCrumbs.addObject({
            path: pc.path,
            model: pc.model,
            name: pc.name,
            modelLink: true,
            isCurrent: false
          });
        });
      }
      if (!Ember.isEmpty(crumbName)) {
        defaultPath = defaultPaths[index];
        specifiedPath = controller.get("breadCrumbPath");
        return breadCrumbs.addObject({
          name: crumbName,
          path: specifiedPath || defaultPath,
          linkable: specifiedPath !== false,
          isCurrent: false
        });
      }
    });
    deepestCrumb = breadCrumbs.get("lastObject");
    if (deepestCrumb) {
      deepestCrumb.isCurrent = true;
    }
    return breadCrumbs;
  }).property("controllers.@each.breadCrumb", "controllers.@each.breadCrumbPath", "pathNames.[]")
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