

controllerModule.controller("chat", function($scope, Chats, ChatService, $localStorage, $ionicLoading, $http){
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
    //
    //      angular.forEach(callback.data.data, function (data) {
    //        //alert(JSON.stringify(famous))
    // //       matchCard.splice(0,matchCard.length);
    //       //  while (matchCard.length) { matchCard.pop(); }
    //   //     matchCard.push(data);
    //   matchCard = data;
    //        //console.log(JSON.stringify(famous));
    //      });

         $scope.matchs = callback.data.data ;
         console.log(JSON.stringify(callback));
         $scope.hide();
      // $scope.$broadcast('scroll.refreshComplete');
    },function(error){
         alert(JSON.stringify(error));
         $scope.hide();
    });
   }

//   $scope.doRefresh = loadFeed;

   loadFeed();

  $scope.remove = function(match) {
      $scope.show();
    ChatService.unMatch(idFb, match.fbid).then(function(callback){
  //    matchCard.splice(0,matchCard.length);
      $scope.matchs.splice($scope.matchs.indexOf(match), 1);
    //    loadFeed();
        $scope.hide();
   },function(error){
        alert(JSON.stringify(error));
        $scope.hide();
   });

  };

   $scope.matchs = matchCard ;

});

controllerModule.controller('ChatDetailCtrl', function($scope, $stateParams, Chats, $timeout, $ionicScrollDelegate) {
  $scope.chat = Chats.get($stateParams.chatId);

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
