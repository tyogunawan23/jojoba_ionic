var controllerModule = angular.module('blank.controllers', ['starter', 'ngStorage', 'ionic.contrib.ui.cards']);

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
    //  alert(religion.me);
     $state.go('religionpartner');
   }

});

controllerModule.controller("navigateReligionPartner", function($scope, $state){
  $scope.submitAnswer = function(religion){
  //  alert(religion.partner);
    $state.go('app.home');
  }
});

controllerModule.controller("AppCtrl", function($scope){

});

controllerModule.controller("navigateHomeController", function($scope, $http, $ionicSwipeCardDelegate){

  $scope.cards = [];


   $scope.addCard = function(img, name) {
       var newCard = {image: img, title: name};
       newCard.id = Math.random();
       $scope.cards.unshift(angular.extend({}, newCard));
   };

   $scope.addCards = function(count) {
     $http.get('http://api.randomuser.me/?results=' + count).then(function(value) {
       angular.forEach(value.data.results, function (v) {
         $scope.addCard(v.picture.medium, v.name.first);
       });
       $scope.showCards = true;
     });
   };

   $scope.addCards(1);

   $scope.cardSwiped = function(index) {
     $scope.addCards(1);
   };

   $scope.cardDestroyed = function(index) {
     $scope.cards.splice(index, 1);
   };


  $scope.cardSwipedLeft = function(index) {
    console.log('LEFT SWIPE');
    $scope.addCard(1);
  };
  $scope.cardSwipedRight = function(index) {
    console.log('RIGHT SWIPE');
    $scope.addCard(1);
  };


});


controllerModule.controller('CardCtrl', function($scope, $ionicSwipeCardDelegate) {
  $scope.doAnything = function() {
    var card = $ionicSwipeCardDelegate.getSwipeableCard($scope);
    card.swipe();
    //  alert("tes");
  };
})

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
