define(['jquery', 'timeago', 'ui-bootstrap'], function($) {

  function WorkSearcher($scope, $http, $filter, $modal) {

    $scope.filters = {};
    $scope.paging = {};

    $scope.vacancies = [];
    $http.get('/vacancies.json').success(function(data) {
      $scope.vacancies = data;
    });

    $scope.getData = function() {
      $scope.isLoad = true;
      $http.get('/vacancies.json', {
        params: {
          filters: $scope.filters,
          paging: $scope.paging
        }
      })
      .success(function(data) {
        $scope.vacancies = data;
        $scope.isLoad = false;
      });
    }
    $scope.timeago = $.timeago;

    $scope.vacancyDetails = function(vacancy) {
      $modal.open({
        templateUrl: "/assets/templates/modals/vacancyDetails.html",
        controller: ["$scope", "vacancy", function($scope, vacancy) {
          $scope.vacancy = vacancy;
          $scope.close = function() {
            $modalInstance.close();
          };
        }],
        resolve: {
          vacancy: function() {
            return vacancy;
          }
        },
        size: 'lg'
      });
    }
  }
  WorkSearcher.$inject = ["$scope", "$http", "$filter", "$modal"];
  return WorkSearcher;
});
