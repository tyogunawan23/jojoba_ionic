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
   };

   $scope.addCards = function(count) {
    // alert(base_api_url + api/v1/findmatch);
    alert('add with pagination ' + countTotal);
    var urlGet = base_api_url + 'api/v1/findmatch?fbid=' + idFb + '&pagination=' +countTotal ;
    // alert(JSON.stringify(urlParams));
    // alert(urlGet);
     $http.get(urlGet, _configHeader).then(function(value) {
    //  alert(JSON.stringify(value.data.data))
        $scope.cards.splice(0, $scope.cards.length);
       angular.forEach(value.data.data, function (v) {
         $scope.addCard(v.fbid, v.url_photo, v.name);
       });
       $scope.showCards = true;
     }, function(error){
        // alert (JSON.stringify(error));
    //     alert (error);
     });
   };

   $scope.addCards(countTotal);

   $scope.cardSwiped = function(index) {
    // $scope.addCards(countTotal);
  //  countTotal+=20;
    //alert(countTotal);

   };

   $scope.cardDestroyed = function(index) {
     $scope.cards.pop();
//     alert('hai' + $scope.cards.length);
    //  countTotal+=20;
      if ($scope.cards.length === 1 ){
        //  alert('cek this');
          countTotal+=10;
          //alert('hai' + countTotal);
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


controllerModule.controller('CardCtrl', function($scope, $ionicSwipeCardDelegate,  $cordovaDialogs) {
  $scope.doAnything = function() {
    var card = $ionicSwipeCardDelegate.getSwipeableCard($scope);
    card.swipe();
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
        //  alert(update_api);

         $http.post(update_api, data, _configHeader).then(function (res){
             $scope.response = res.data;
            alert(JSON.stringify(res.data));
         }, function(error){
          alert (JSON.stringify(error));
         });

        }
}
