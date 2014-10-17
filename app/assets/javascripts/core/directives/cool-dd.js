//http://plnkr.co/edit/AkaMlV7Ow7PNGdejWbKf?p=preview
define(["angular", "underscore"], function(angular, _) {
  function directive($timeout) {
    return {
      restrict: 'E',
      scope: {
        assignedArray: '=ngArray',
        name: '@ngName',
        value: '=ngValue',
        isForAdd: '@ngForadd',
        returnObj: '=ngReturn',
        subid: '=ngSubid',
        dbCtrl: '@dbCtrl',
        ngChange : "&"
      },
      link: function ($scope, $element) {

        var notselectStr = '[Значение не выбрано!]';

        $scope.object = {};

        var textbox = $element.find('input[type="text"]');

        $scope.loadArr = _.debounce(function(isAll) {

          if ($scope.array && $scope.array.length == 1)
            $scope.filtredArr = [];
            $scope.filtredArr = [];

          $scope.notFound = false;
          $http.get('/' + $scope.dbCtrl + '/Get' + $scope.dbCtrl + 'Names/', {
            params: {
              search: isAll ? "" : $scope.query,
              ids: [$scope.value],
              count: 50
            }
          }).then(function(result) {
            $scope.array = result.data;

            if (!result.data.length)
              $scope.notFound = true;

            $scope.filterBySubid();

            if ($scope.value && !isAll)
              $scope.selectById($scope.value);
          })
        }, 400);

        if ($scope.dbCtrl)
          $scope.loadArr();
        else
          $scope.array = $scope.assignedArray;

        $scope.filterBySubid = _.debounce(function(array) {
          array = array ? array : $scope.array;

          if (!array)
            return;

          array = angular.copy(array);

          if ($scope.subid) {
            array = array.filter(function(obj) {
              return obj.subid == $scope.subid;
            });
          }

          $scope.filtredArr = array;

          $scope.$apply();
        }, 100);

        $scope.filterBySubid();

        $scope.$watch('query', function(value) {
          if ($scope.dbCtrl) {
            $scope.loadArr();
          }
          if ((!$scope.query || $scope.query == notselectStr) && $scope.object.id) {
            $scope.filtredArr = $scope.array;
            $scope.setObject({});
            return;
          }

          if ($scope.filtredArr) {
            $scope.filtredArr = $scope.array.filter(function(obj) {
              if (obj.id == 0)
                return false;
              if (value)
                return obj.name.toLowerCase().indexOf(value.toLowerCase()) > -1;
              else return false;
            });

            if (!$scope.filtredArr.length && $scope.isForAdd)
              $scope.setObject({
                id: value,
                name: value
              });
          }
        });
        $scope.$watch('assignedArray', function(value) {
          $scope.array = value;

          $scope.filterBySubid();

          if ($scope.value)
            $scope.selectById($scope.value);
        });
        $scope.$watch('subid', function(value) {
          $scope.filterBySubid($scope.filtredArr);
        });
        $scope.$watch('value', function(value) {
          if (value && value != $scope.object.id)
            $scope.selectById(value);

          if ($scope.dbCtrl)
            $scope.loadArr();
        });

        $scope.selectById = function(id) {
          var found = $scope.array.filter(function(obj) {
            return obj.id == id;
          })[0];

          if (found)
            $scope.select(found);
          else if ($scope.isForAdd)
            $scope.select({
              id: id,
              name: id
            });
        };

        $scope.select = function(obj) {
          if (obj.id == -1)
            $scope.setObject({
              id: undefined,
              name: ""
            }, true);
          else
            $scope.setObject(obj, true)

          $scope.isopen = false;
        };

        $scope.setObject = function(obj, isSetQuery) {
          angular.extend($scope.object, obj);

          if (!$scope.returnObj)
            $scope.returnObj = {};

          angular.extend($scope.returnObj, obj);

          if (isSetQuery)
            $scope.query = obj.name;
          $scope.value = $scope.object.id;

      //setTimeout($scope.ngChange, 0);
      $timeout($scope.ngChange, 0);
    }

    //on-blur
    textbox.blur(function() {
      $scope.exit();
    });
    //on-enter or tab
    textbox.keydown(function(event) {
      if (event.keyCode == 13 || event.keyCode == 9) {
        $scope.isopen = false;
        $scope.exit();
      }
      if (event.keyCode == 13) {
        $scope.stop(event);
      }
    });
    $scope.exit = function() {
      setTimeout(function() {
        if ($scope.isopen)
          return;

        var id = $scope.object.id;

        if (!$scope.object.name || $scope.object.name.toLowerCase() != $scope.query.toLowerCase()) {
          if ($scope.isForAdd) {
            id = $scope.query;
          } else {
            if ($scope.filtredArr.length == 1) {
              $scope.select($scope.filtredArr[0]);
              id = $scope.filtredArr[0].id;
            } else {
              $scope.query = notselectStr;
              id = undefined;
            }
          }
        }
        $scope.setObject({
          id: id,
          name: $scope.query
        });
        $scope.$apply();
      }, 200)
    }
    $scope.isNotExist = function() {
      if (!$scope.query) {
        return false;
      }

      if (!$scope.filtredArr.length) {
        return true;
      }

      return result = !$scope.array.some(function(obj) {
        return obj.name.toLowerCase() == $scope.query.toLowerCase();
      });
    };

    $scope.isopen = false;

    $scope.stop = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
    };
    $scope.toggle = function() {
      $scope.isopen = !$scope.isopen;
    };
    $scope.show = function() {
      $scope.isopen = true;
      textbox.triggerHandler('blur');
    };
    $scope.focus = function(open) {
      if (open) {
        textbox.focus();

        if ($scope.dbCtrl)
          $scope.loadArr(true);
        else
          $scope.filterBySubid();
      }

      if ($scope.query == notselectStr)
        $scope.query = '';
    };
  },
  templateUrl: 'assets/core/directives/cool-dd.html'
};
}

return ["$timeout",directive];
});
