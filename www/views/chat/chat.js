controllerModule.controller("chat", function($scope, Chats, ChatService, $localStorage, $ionicLoading, $http, DataUser, $state, $firebase){
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
        // alert(JSON.stringify(callback));
         $scope.hide();
    },function(error){
    //     alert(JSON.stringify(error));
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
      //  alert(JSON.stringify(error));
        $scope.hide();
   });
  };
   $scope.matchs = matchCard ;

   $scope.toDetail = function(index){
    DataUser.setUser( $scope.matchs[index]);
    $state.go('app.chat-detail', {result: index});
   };

});

controllerModule.controller('ChatDetailCtrl', function($scope, $stateParams, Chats, $timeout, $ionicScrollDelegate, DataUser,ChatService, $ionicLoading) {
  $scope.chat = DataUser.getUser();
//  alert("pullMessage" + $scope.chat.roomchat)
// $ionicLoading.show();
//   ChatService.pullMessage($scope.chat.roomchat).then(function(callback){
//   //  alert(JSON.stringify(callback.data.data));
//     $scope.dataMessage = callback.data.data;
//     $scope.messages = $scope.dataMessage
//   alert(JSON.stringify($scope.messages));
//   $ionicLoading.hide();
//   //  return
//   },function(error){
//    alert(JSON.stringify(error));
//    $ionicLoading.hide();
//   //    return
//   });
//alert($scope.chat.roomchat);
  //
  // var ref = new Firebase("https://vivid-heat-824.firebaseio.com/chat");
  //       $scope.messages = $firebase(ref);
  //      $scope.addMessage = function(e) {
  //         $scope.sendMsg = function() {
  //
  //                $scope.messages.$add({from: $scope.name, body: $scope.msg});
  //                $scope.msg = "";
  //
  //              }
  //      }
  //      $scope.clear = function(){
  //        $scope.name = "";
  //      }
});


controllerModule.controller('Messages', function($scope, $timeout, $ionicScrollDelegate, $firebase,  $ionicPopup, ChatService, $localStorage, $ionicLoading, $rootScope) {
  $scope.hideTime = true;

  $rootScope.$on('$cordovaPushV5:notificationReceived', function(event, data){
//    $ionicLoading.show();
      ChatService.pullMessage($scope.chat.roomchat).then(function(callback){
      //  alert(JSON.stringify(callback.data.data));
        $scope.dataMessage = callback.data.data;
        $scope.messages = $scope.dataMessage
         $ionicScrollDelegate.scrollBottom(true);
  //    alert(JSON.stringify($scope.messages));
  //    $ionicLoading.hide();
      //  return
      },function(error){
  //     alert(JSON.stringify(error));
  //     $ionicLoading.hide();
      //    return
      });
  });

//  alert("pullMessage" + $scope.chat.roomchat)

  $ionicLoading.show();
    ChatService.pullMessage($scope.chat.roomchat).then(function(callback){
    //  alert(JSON.stringify(callback.data.data));
      $scope.dataMessage = callback.data.data;
      $scope.messages = $scope.dataMessage
       $ionicScrollDelegate.scrollBottom(true);
//    alert(JSON.stringify($scope.messages));
    $ionicLoading.hide();
    //  return
    },function(error){
//     alert(JSON.stringify(error));
     $ionicLoading.hide();
    //    return
    });

 var alternate,
   isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

// $scope.messages = {};
 $scope.sendMessage = function() {

// alert(JSON.stringify($scope.dataMessage));

   if ($scope.data.message == "" || $scope.data.message == null){
       alert('message cannot be null')
       return
   }

var roomid = $scope.chat.roomchat;
var fbid =  localStorage.getItem("idFb");
var partnerId = $scope.chat.fbid;
var messagecontent = $scope.data.message;


 var dataMessage = {roomid : roomid, fbid : fbid, partnerid : partnerId, message : messagecontent};
 console.log(dataMessage)
 ChatService.sendMsg(dataMessage).then(function(callback){
  // alert(JSON.stringify(callback));
  // return
  // $ionicLoading.show();
    ChatService.pullMessage($scope.chat.roomchat).then(function(callback){
    //  alert(JSON.stringify(callback.data.data));
      $scope.dataMessage = callback.data.data;
      $scope.messages = $scope.dataMessage
//    alert(JSON.stringify($scope.messages));
//    $ionicLoading.hide();
    //  return
    },function(error){
//     alert(JSON.stringify(error));
//     $ionicLoading.hide();
    //    return
    });

},function(error){
  alert(JSON.stringify(error));
  //   return
});


 //alert(JSON.stringify(dataMessage));
//  ChatService.se

   alternate = !alternate;

   var d = new Date();
   d = d.toLocaleTimeString().replace(/:\d+ /, ' ');


   $scope.messages.push({

    //  {
    //   "senderFbid": "1357087757652584",
    //   "senderName": "Tyo Gunawan",
    //   "senderPhoto": "https://graph.facebook.com/1357087757652584/picture?width=400&height=400",
    //   "bodyMessage": "Hh",
    //   "bodyTimeStamp": "2016-09-08T08:29:17.789Z"
    // }
     senderFbid: fbid,
     bodyMessage: messagecontent,
     bodyTimeStamp: d
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
 $scope.myId = localStorage.getItem("idFb");
 //$scope.messages = [];

//  alert(JSON.stringify($scope.dataMessage));
//  $scope.messages = $scope.dataMessage
  // alert("cek here");
  // alert(JSON.stringify($scope.messages));

});
