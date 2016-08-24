var controllerModule = angular.module('blank.controllers', ['starter']);

var base_api_url = 'http://www.progading.me:8080/';
var server_fail_msg = "Fail to get data from server, please try to refresh your page.";
var _configHeader = {
       headers: {
             'Authorization': localStorage.getItem("token_auth"),
             'Accept': 'application/json; charset=utf-8',
             'Content-Type': 'application/json; charset=utf-8'
           }
};
var cards2 =[];
var isfromlike = false ;


controllerModule.controller("AppCtrl", function($scope, $state, $cordovaOauth, $localStorage, $ionicModal, $timeout){

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


          $scope.loginData = {};

          // Create the login modal that we will use later
          $ionicModal.fromTemplateUrl('views/about/about.html', {
            scope: $scope
          }).then(function(modal) {
            $scope.modal = modal;
          });

          // Triggered in the login modal to close it
          $scope.closeAbout = function() {
            $scope.modal.hide();
          };

          // Open the login modal
          $scope.about = function() {
            $scope.modal.show();
          };

          // Perform the login action when the user submits the login form
          $scope.doCloseAbout = function() {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
          //  $timeout(function() {
              $scope.closeAbout();
            //}, 1000);
          };

});
