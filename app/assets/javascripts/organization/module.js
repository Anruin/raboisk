define([
 "angular",
 "./register",
 "./settings",
 "ui-bootstrap",
 "ui-route",
 'file-upload-shim',
 'file-upload'
 ], function(angular, RegisterController, SettingsController, directives) {
  var mod = angular.module('organizationModule', ['ui.router', 'ui.bootstrap', 'angularFileUpload']);

  mod.controller({'OrganizationRegisterController' : RegisterController,
    'OrganizationSettingsController' : SettingsController});

  mod.config(function ($stateProvider, $urlRouterProvider) {
    var organizationDir = "assets/organization/";

    $urlRouterProvider.when('/organization/settings', '/organization/settings/general');

    $stateProvider
    .state('organization-register', {
      abstract: true,
      url: '/organization/register',
      templateUrl: organizationDir + 'register.html',
      controller: 'OrganizationRegisterController'
    }).state('organization-register.content', {
      url: '',
      views : {
        'content': {templateUrl: organizationDir + 'form.html'}
      }
    }).state('organization-settings', {
      abstract: true,
      url: '/organization/settings',
      templateUrl: organizationDir + 'settings.html',
      controller: 'OrganizationSettingsController'
    }).state('organization-settings.general', {
      url: '/general',
      views : {
        'content': {templateUrl: organizationDir + 'form.html'}
      }
    }).state('organization-settings.employees', {
      url: '/employees',
      views : {
        'content': {
          templateUrl: organizationDir + 'employees.html',
          controller: ['$scope', function ($scope) {
            $scope.employees = [
            {name:"Иванов Иван", post:"Программист"},
            {name:"Петров Петр", post:"Инженер"}];
          }]
        }
      }
    })
  });
return mod;
});
