controllerModule.controller("chat", function($scope, Chats, ChatService, $localStorage, $ionicLoading, $http, DataUser, $state){
    var idFb = localStorage.getItem("idFb");

    var matchCard = [];
    $scope.matchs = [];

   $scope.show = function() {
       $scope.loading = $ionicLoading.show({
           content: 'Loading...'
       });
   };
   $scope.hide = function(){
       $scope.loading.hide();
   };

   function loadFeed() {
     $scope.show();
     ChatService.getUserMatch(idFb).then(function(callback){
         $scope.matchs = callback.data.data ;
         console.log(JSON.stringify(callback));
         $scope.hide();
    },function(error){
         alert(JSON.stringify(error));
         $scope.hide();
    });
   }

   loadFeed();

  $scope.remove = function(match) {
      $scope.show();
    ChatService.unMatch(idFb, match.fbid).then(function(callback){
      $scope.matchs.splice($scope.matchs.indexOf(match), 1);
        $scope.hide();
   },function(error){
        alert(JSON.stringify(error));
        $scope.hide();
   });
  };
   $scope.matchs = matchCard ;

   $scope.toDetail = function(index){
    DataUser.setUser( $scope.matchs[index]);
    $state.go('app.chat-detail', {result: index});
   };

});

controllerModule.controller('ChatDetailCtrl', function($scope, $stateParams, Chats, $timeout, $ionicScrollDelegate, DataUser) {
  $scope.chat = DataUser.getUser();

});

controllerModule.controller('Messages', function($scope, $timeout, $ionicScrollDelegate) {
  $scope.hideTime = true;

 var alternate,
   isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

 $scope.sendMessage = function() {
   alternate = !alternate;

   var d = new Date();
   d = d.toLocaleTimeString().replace(/:\d+ /, ' ');

   $scope.messages.push({
     userId: alternate ? '12345' : '54321',
     text: $scope.data.message,
     time: d
   });

   delete $scope.data.message;
   $ionicScrollDelegate.scrollBottom(true);

 };


 $scope.inputUp = function() {
   if (isIOS) $scope.data.keyboardHeight = 216;
   $timeout(function() {
     $ionicScrollDelegate.scrollBottom(true);
   }, 300);

 };

 $scope.inputDown = function() {
   if (isIOS) $scope.data.keyboardHeight = 0;
   $ionicScrollDelegate.resize();
 };

 $scope.closeKeyboard = function() {
   // cordova.plugins.Keyboard.close();
 };


 $scope.data = {};
 $scope.myId = '12345';
 $scope.messages = [];
});
