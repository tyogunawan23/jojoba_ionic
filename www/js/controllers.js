var controllerModule = angular.module('blank.controllers', ['starter', 'ngStorage']);

controllerModule.controller("navigateLogin", function($scope,  $cordovaOauth, $http, $state, $localStorage, $location ){
  $scope.data = {};
  $scope.login = function() {
        $cordovaOauth.facebook("100235250427366", ["email", "public_profile" ]).then(function(result) {
         //displayData($http, result.access_token);
         $localStorage.accessToken = result.access_token;
          $state.go('religion');
        }, function(error) {
          console.log(JSON.stringify(error));
             alert (result);
        });
}
});

controllerModule.controller("navigateReligion", function($scope, $state){
    $scope.submitAnswer = function(religion){
      alert(religion.me);
     $state.go('religionpartner');
   }

});

controllerModule.controller("navigateReligionPartner", function($scope, $state){
  $scope.submitAnswer = function(religion){
    alert(religion.partner);
    $state.go('app.home');
  }
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

    $scope.drag = function(value) {
        $scope.years = Math.floor(value / 12);
        $scope.months = value % 12;
    };

    $scope.rangeValue = 0;
    
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
