var controllerModule = angular.module('blank.controllers', ['starter', 'ngStorage', 'ionic.contrib.ui.cards']);


controllerModule.controller("AppCtrl", function($scope){

          $scope.logout = function () {
              // OpenFB.logout();
              $state.go('app.login');
          };

});
