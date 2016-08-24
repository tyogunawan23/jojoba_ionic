controllerModule.controller("home", function($scope, $http, $ionicSwipeCardDelegate, $cordovaGeolocation, $ionicHistory,  $cordovaGeolocation,$rootScope, $localStorage, $ionicLoading){

  var countTotal = 10 ;

  var idFb = localStorage.getItem("idFb");
  var nameFb = localStorage.getItem("nameFb");
  var pictureFb = localStorage.getItem("pictureFb");
  var birthdayFb = localStorage.getItem("birthdayFb");
  var genderFb = localStorage.getItem("genderFb");
  var religionme = localStorage.getItem("religionme");
  var religionpartner = localStorage.getItem("religionpartner");
  var lat = localStorage.getItem("lat");
  var long = localStorage.getItem("long");
  var rangeAge = "";


  var urlParams = {
    'fbid': idFb,
    'pagination': countTotal,
    'age': rangeAge,
    'nearRadius': 500,
    'gender': genderFb,
    'religion': religionpartner
};

  $scope.cards = [];



   $scope.addCard = function(id, img, name) {
       var newCard = {id: id, image: img, title: name};
      //  newCard.id = Math.random();
       $scope.cards.push(newCard);
       cards2.push(newCard);
   };

   $scope.addCards = function(count) {
    var urlGet = base_api_url + 'api/v1/findmatch?fbid=' + idFb + '&pagination=' +countTotal ;
     $http.get(urlGet, _configHeader).then(function(value) {
    //  alert(JSON.stringify(value.data.data))
        $scope.cards.splice(0, $scope.cards.length);
         cards2.splice(0, cards2.length);
       angular.forEach(value.data.data, function (v) {
         $scope.addCard(v.fbid, v.url_photo, v.name);
       });
       $scope.showCards = true;
       isfromlike = false;
     }, function(error){
        alert (JSON.stringify(error));
     });
   };

   $scope.addCards(countTotal);

   $scope.cardSwiped = function(index) {
    // $scope.addCards(countTotal);


   };

   $scope.cardDestroyed = function(index) {
     $scope.cards.pop();
     //var card = $scope.cards[index];
        if (isfromlike){
        //   alert('isfromlike true ya');
        } else {
             RejectOpponent($scope, $localStorage, $http, cards2[index].id);
        }

      if ($scope.cards.length === 0  ){
         $scope.addCards(countTotal);
      }

   };


  $scope.cardSwipedLeft = function(index) {
    console.log('LEFT SWIPE');
//    $scope.addCard(1);
  };
  $scope.cardSwipedRight = function(index) {
    console.log('RIGHT SWIPE');
  //  $scope.addCard(1);
  };



 $scope.$on('$ionicView.enter', function() {
    // Code you want executed every time view is opened
    console.log('Opened!')
    $ionicLoading.show({
          template: 'Loading...',
          noBackdrop: true
        });

     getLocation ($scope, $cordovaGeolocation,$rootScope, $localStorage, $http, $ionicLoading);
//    $ionicLoading.hide();

 });


});


controllerModule.controller('CardCtrl', function($scope, $ionicSwipeCardDelegate,  $cordovaDialogs, $localStorage, $http) {

  $scope.doReject = function() {
    isfromlike = false;
    var card = $ionicSwipeCardDelegate.getSwipeableCard($scope);
    card.swipe();

  };

  $scope.doLike = function(index) {
   isfromlike = true;
   LikeOpponent($scope, $localStorage, $http, cards2[index].id);
   var card = $ionicSwipeCardDelegate.getSwipeableCard($scope);
   card.swipe();
  //  alert(cards2[index].id);
  };

});

function getLocation ($scope, $cordovaGeolocation,$rootScope, $localStorage, $http, $ionicLoading){
 var enablelocation;
 var posOptions = {timeout: 11000, enableHighAccuracy: false};
 if (enablelocation = true){
   $cordovaGeolocation.getCurrentPosition(posOptions)
         .then(function(position){
             var lat  = position.coords.latitude
             var long = position.coords.longitude
             localStorage.setItem("lat", lat);
             localStorage.setItem("long", long);
             console.log('lat', lat);
             console.log('long', long);
          //   alert (lat);
              $ionicLoading.hide();
         }, function(error){
             console.log('error:', error);
            //   $ionicLoading.hide();
          //   alert (JSON.stringify(error));
              $ionicLoading.hide();
         });
  postData($scope, $localStorage, $http);
  $ionicLoading.hide();
};

};

function postData($scope, $localStorage, $http){
      //  alert('pos with auth' + localStorage.getItem("token_auth"));
        if(localStorage.getItem("token") !== null && localStorage.getItem("token") !== ""){
          var idFb = localStorage.getItem("idFb");
          var nameFb = localStorage.getItem("nameFb");
          var pictureFb = localStorage.getItem("pictureFb");
          var birthdayFb = localStorage.getItem("birthdayFb");
          var genderFb = localStorage.getItem("genderFb");
          var religionme = localStorage.getItem("religionme");
          var lat = localStorage.getItem("lat");
          var long = localStorage.getItem("long");
          var myloc = lat + "," + long;
          var data = {fbid : idFb, name : nameFb, url_photo : pictureFb, dob : birthdayFb, gender: genderFb, religion : religionme, loc:myloc};
        //  alert(JSON.stringify(data));
          var  update_api = base_api_url + 'api/v1/update';
          $http.post(update_api, data, _configHeader).then(function (res){
             $scope.response = res.data;
        //    alert(JSON.stringify(res.data));
         }, function(error){
           alert (JSON.stringify(error));
         });

        }
}

function RejectOpponent($scope, $localStorage, $http, partnerId){
      //  if(localStorage.getItem("token") !== null && localStorage.getItem("token") !== ""){
          var idFb = localStorage.getItem("idFb");
          var  reject_api = base_api_url + 'api/v1/findmatch/reject?fbid=' + idFb + '&partnerId=' +partnerId ;

         $http.get(reject_api, _configHeader).then(function (res){
             $scope.response = res.data;
        //     alert(JSON.stringify(res.data));
         }, function(error){
             alert (JSON.stringify(error));
         });
  //      }
}

function LikeOpponent($scope, $localStorage, $http, partnerId){
    //    if(localStorage.getItem("token") !== null && localStorage.getItem("token") !== ""){
          var idFb = localStorage.getItem("idFb");
          var  like_api = base_api_url + 'api/v1/findmatch/like?fbid=' + idFb + '&partnerId=' +partnerId ;

         $http.get(like_api, _configHeader).then(function (res){
             $scope.response = res.data;
            alert(JSON.stringify(res.data));
         }, function(error){
             alert (JSON.stringify(error));
         });
      //  }
}
