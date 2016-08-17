controllerModule.controller("chat", function($scope, Chats){
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };

});

controllerModule.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
});


controllerModule.controller('CardCtrl', function($scope, $ionicSwipeCardDelegate) {
  $scope.doAnything = function() {
    var card = $ionicSwipeCardDelegate.getSwipeableCard($scope);
    card.swipe();
    //  alert("tes");
  };
})
