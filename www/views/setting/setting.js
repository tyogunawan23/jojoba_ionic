'use strict';

/**
 * @ngInject
 */
function MultiRangeDirective ($compile) {
    var directive = {
        restrict: 'E',
        scope: {
            ngModelMin: '=',
            ngModelMax: '=',
            ngMin: '=',
            ngMax: '=',
            ngStep: '=',
            ngChangeMin: '&',
            ngChangeMax: '&'
        },
        link: link
    };

    return directive;


    function link ($scope, $element, $attrs) {
        var min, max, step, $inputMin = angular.element('<input type="range">'), $inputMax;
        $scope.ngChangeMin = $scope.ngChangeMin || angular.noop;
        $scope.ngChangeMax = $scope.ngChangeMax || angular.noop;

        if (typeof $scope.ngMin == 'undefined') {
            min = 0;
        } else {
            min = $scope.ngMin;
            $inputMin.attr('min', min);
        }
        if (typeof $scope.ngMax == 'undefined') {
            max = 0;
        } else {
            max = $scope.ngMax;
            $inputMin.attr('max', max);
        }
        if (typeof $scope.ngStep == 'undefined') {
            step = 0;
        } else {
            step = $scope.ngStep;
            $inputMin.attr('step', step);
        }
        $inputMax = $inputMin.clone();
        $inputMin.attr('ng-model', 'ngModelMin');
        $inputMax.attr('ng-model', 'ngModelMax');
        $compile($inputMin)($scope);
        $compile($inputMax)($scope);
        $element.append($inputMin).append($inputMax);
        $scope.ngModelMin = $scope.ngModelMin || min;
        $scope.ngModelMax = $scope.ngModelMax || max;

        $scope.$watch('ngModelMin', function (newVal, oldVal) {
            if (newVal > $scope.ngModelMax) {
                $scope.ngModelMin = oldVal;
            } else {
                $scope.ngChangeMin();
            }
        });

        $scope.$watch('ngModelMax', function (newVal, oldVal) {
            if (newVal < $scope.ngModelMin) {
                $scope.ngModelMax = oldVal;
            } else {
                $scope.ngChangeMax();
            }
        });
    }
}


controllerModule.controller("setting", function($scope, $localStorage){
   $scope.gender =  localStorage.getItem("oppositeGender") ;
   $scope.newValue = function(gender) {
     localStorage.setItem("oppositeGender", gender);
   }

});

controllerModule.directive('uiMultiRange', MultiRangeDirective).controller("MyCtrl", function($scope, $timeout, $localStorage){
      $scope.satuan = ' km';
      $scope.ageMin = 17;
      $scope.ageMax = 60;
      $scope.range = {
        from: localStorage.getItem("rangeFrom"),
        to: localStorage.getItem("rangeTo")
      };

     $scope.somethingHasChanged = function () {
       console.log('change!', $scope.range.from);

       localStorage.setItem("rangeFrom", $scope.range.from);
       localStorage.setItem("rangeTo", $scope.range.to);
       localStorage.setItem("yearsRange", $scope.range.from + '-' + $scope.range.to);

     };

    $scope.printRange = function () {
      $timeout(function () {
      console.log('range =', $scope.range.from);
    }, 2000)
    }

    $scope.data = {
       levelvalue:  localStorage.getItem("distancevalue"),
       level1wordDescription: "INTERMEDIATE+",
       testvariable: "dummy"
    }

    $scope.setLevelText= function() {
        // $scope.years = Math.floor(value / 12);
        // $scope.months = value % 12;
          console.log('range value has changed to :'+$scope.data.levelvalue);
          if ($scope.data.levelvalue == 100){
              $scope.satuan = '+ km';
          } else {
              $scope.satuan = ' km';
          }
          localStorage.setItem("distancevalue", $scope.data.levelvalue);
    };

  //  $scope.rangeValue = 100;

});
