var controllerModule = angular.module('blank.controllers', ['starter', 'ngStorage']);

controllerModule.controller("navigateLogin", function($scope,  $cordovaOauth, $http, $state, $localStorage, $location ){
  $scope.data = {};
  $scope.login = function() {
        $cordovaOauth.facebook("100235250427366", ["email", "public_profile" ]).then(function(result) {
         //displayData($http, result.access_token);
         $localStorage.accessToken = result.access_token;
           $location.path("/profile");
          $state.go('religion');
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

controllerModule.controller("navigateProfilController", function($scope, $http, $localStorage, $location){
  $scope.init = function() {
       if($localStorage.hasOwnProperty("accessToken") === true) {
           $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: $localStorage.accessToken, fields: "id,name,gender,location,website,picture,relationship_status", format: "json" }}).then(function(result) {
               $scope.profileData = result.data;
           }, function(error) {
               alert("There was a problem getting your profile.  Check the logs for details.");
               console.log(error);
           });
       } else {
           alert("Not signed in");
           $location.path("/login");
       }
   };

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
