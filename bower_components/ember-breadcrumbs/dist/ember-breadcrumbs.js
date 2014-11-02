(function() {
  window.BreadCrumbs = Ember.Namespace.create();

  Ember.onLoad("Ember.Application", function(App) {
    return App.initializer({
      name: "ember-breadcrumbs",
      initialize: function(container, app) {
        app.register("component:bread-crumbs", BreadCrumbs.BreadCrumbsComponent);
        app.inject("component:bread-crumbs", "router", "router:main");
        return app.inject("component:bread-crumbs", "applicationController", "controller:application");
      }
    });
  });

}).call(this);

(function() {
  var defaultTemplate;

  defaultTemplate = "{{#each crumb in breadCrumbs}}\n<li {{bind-attr class=\"crumb.isCurrent:current:\"}}>\n  {{#if crumb.modelLink}} {{#link-to crumb.path crumb.model}} {{crumb.model.title}} {{/link-to}} {{/if}} {{#if crumb.linkable}}\n    {{#link-to crumb.path}}\n      {{crumb.name}}\n    {{/link-to}}\n  {{/if}}\n</li>\n{{/each}}";

  BreadCrumbs.BreadCrumbsComponent = Ember.Component.extend({
    tagName: "ul",
    classNames: ["breadcrumbs"],
    layout: Ember.Handlebars.compile(defaultTemplate),
    router: null,
    applicationController: null,
    handlerInfos: (function() {
      var handlerInfos;
      return handlerInfos = this.get("router").router.currentHandlerInfos;
    }).property("applicationController.currentPath"),
    pathNames: (function() {
      return this.get("handlerInfos").map(function(handlerInfo) {
        return handlerInfo.name;
      });
    }).property("handlerInfos.[]"),
    controllers: (function() {
      return this.get("handlerInfos").map(function(handlerInfo) {
        return handlerInfo.handler.controller;
      });
    }).property("handlerInfos.[]"),
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

}).call(this);