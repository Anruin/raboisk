define(['angular'], function(angular) {
 function OrganizationSettings ($scope, $http, $state, id) {
  console.log($state);
  $scope.settingItems = [
  {name : "Основные настройки", location : "/organization/settings/general"},
  {name : "Сотрудники", location : "/organization/settings/employees"},
  {name : "Вакансии", location : "/organization/settings/vacancies"},
  {name : "Дополнительно", location : "/organization/settings/extra"}];
  $scope.currentItem = $scope.settingItems.filter(function(item) {
      return item.location == $state.$current.url.source;
  })[0];
  $scope.setItem = function (item) {
    $scope.currentItem = item;
    $scope.$apply();
  }
 }
  OrganizationSettings.$inject = ["$scope", "$http", "$state"];

  return OrganizationSettings;
});
