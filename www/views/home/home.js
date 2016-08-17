controllerModule.controller("home", function($scope, $http, $ionicSwipeCardDelegate){

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
