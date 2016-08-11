var controllerModule = angular.module('blank.controllers', []);

controllerModule.controller("navigateLogin", function($scope, LoginService, $ionicPopup, $state){
  $scope.data = {};

    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $state.go('religion');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }

});

controllerModule.controller("navigateReligion", function($scope){

});

controllerModule.controller("navigateReligionPartner", function($scope){

});

controllerModule.controller("AppCtrl", function($scope){

});

controllerModule.controller("navigateHomeController", function($scope){

});

controllerModule.controller("navigateMatchController", function($scope){

});

controllerModule.controller("navigateChatController", function($scope, Chats){
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };

});

controllerModule.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
});

controllerModule.controller("navigateSettingController", function($scope){

});
