var controllerModule = angular.module('blank.controllers', ['ionic','blank.controllers', 'ngCordovaOauth']);

controllerModule.controller("navigateLogin", function($scope,  $cordovaOauth, $http){
  $scope.data = {};
  $scope.login = function() {
        $cordovaOauth.facebook("100235250427366", ["email", "public_profile" ]).then(function(result) {
          displayData($http, result.access_token);
        }, function(error) {
          console.log(JSON.stringify(error));
             alert (result);
        });
}

  $scope.getStatus = function() {

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


function facebookLogin($cordovaOauth, $http)
{
    $cordovaOauth.facebook("100235250427366", ["email", "public_profile"], {redirect_uri: "http://localhost/callback"}).then(function(result){
        displayData($http, result.access_token);
    },  function(error){
            alert("Error: " + error);
    });
}

function displayData($http, access_token)
 {
    $http.get("https://graph.facebook.com/v2.2/me", {params: {access_token: access_token, fields: "name,gender,location,picture", format: "json" }}).then(function(result) {
        var nama = result.data.name;
        var gen = result.data.gender;
        var pic = result.data.picture;

        alert("pic : "  + pic.data.url);
    }, function(error) {
        alert("Error: ");
    });
}
