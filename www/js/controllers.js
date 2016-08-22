var controllerModule = angular.module('blank.controllers', ['starter']);

var base_api_url = 'http://www.progading.me:8080/';
var server_fail_msg = "Fail to get data from server, please try to refresh your page.";


controllerModule.controller("AppCtrl", function($scope, $state, $cordovaOauth, $localStorage){

          $scope.logout = function () {
              // OpenFB.logout();

              // $cordovaOauth.logout
              // .then(function(success) {
              //       // success
              // }, function (error) {
              //     // error
              // });


              localStorage.setItem("token", "");
              alert(localStorage.getItem("token"));
              $state.go('login');
              //localStorage.removeItem("accessToken");
          };

});
