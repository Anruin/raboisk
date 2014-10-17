define(['ui-bootstrap'], function($) {
function OrganizationRegister ($scope, $http, $location, id) {
    $scope.curObj = {};
    $scope.curObj.vacancies_attributes = [];

    /*if (id) {
      $http.get('/ProjectTasks/Get/' + id).then(function (result) {
        $scope.curTask = result.data;
        $scope.selectStatus = $scope.statuses[$scope.curTask.Status];
      })
    }*/

    $scope.ok = function (invalid) {
      $scope.submitted = true;

      if (invalid)
        return;
      $scope.curObj.geo ={
        country: "Russia",
        coords: [25,56]
      };
      console.log('send object: ');
      console.log($scope.curObj);

      $http.post('/organizations', $scope.curObj ).then(function (result) {
        console.log('respond: ');
        console.log(result);
      })
    };

    $scope.cancel = function () {
      $location.url('search');
    };
  };

  OrganizationRegister.$inject = ["$scope", "$http", "$location"];

  return OrganizationRegister;
});
