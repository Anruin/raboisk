define([
	"angular",
	"./core/settings/settings",
	"./core/controllers/controllers",
	"./core/directives/directives",
    "./organization/module",
    "ui-bootstrap",
    "ui-route",
    'file-upload-shim',
    'file-upload',
    'truncate'
  ], function(angular, settings, controllers, directives) {
    var mod = angular.module('myModule', ['organizationModule','ui.router', 'ui.bootstrap', 'angularFileUpload', 'truncate']);

    mod.controller(controllers);

    mod.config(settings.config);

    mod.run(settings.run);

    mod.directive(directives);

    //mod.service("$dataService", dataService);

    //set module to DOM
    mod.init = function() {
    	angular.bootstrap(document, ["myModule"]);
    };

    return mod;
});
