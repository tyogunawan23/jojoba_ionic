controllerModule.controller("home", function($scope, $http, $ionicSwipeCardDelegate, $cordovaGeolocation, $ionicHistory,  $cordovaGeolocation,$rootScope, $localStorage, $ionicLoading){

  var countTotal = 1 ;

  $scope.cards = [];


   $scope.addCard = function(img, name) {
       var newCard = {image: img, title: name};
       newCard.id = Math.random();
       $scope.cards.unshift(angular.extend({}, newCard));
   };

   $scope.addCards = function(count) {
     alert('http://api.randomuser.me/?results=' + count);
     $http.get('http://api.randomuser.me/?results=' + count).then(function(value) {
       angular.forEach(value.data.results, function (v) {
         $scope.addCard(v.picture.medium, v.name.first);
       });
       $scope.showCards = true;
     });
   };

   $scope.addCards(countTotal);

   $scope.cardSwiped = function(index) {
     $scope.addCards(countTotal);

   };

   $scope.cardDestroyed = function(index) {
     $scope.cards.splice(index, countTotal);

   };


  $scope.cardSwipedLeft = function(index) {
    console.log('LEFT SWIPE');
    $scope.addCard(1);
  };
  $scope.cardSwipedRight = function(index) {
    console.log('RIGHT SWIPE');
    $scope.addCard(1);
  };



 $scope.$on('$ionicView.enter', function() {
    // Code you want executed every time view is opened
    console.log('Opened!')
    $ionicLoading.show({
          template: 'Loading...',
          noBackdrop: true
        });

     getLocation ($scope, $cordovaGeolocation,$rootScope, $localStorage, $http, $ionicLoading);
    $ionicLoading.hide();


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
             alert (lat);
              $ionicLoading.hide();
         }, function(error){
             console.log('error:', error);
               $ionicLoading.hide();
             alert (error);
              $ionicLoading.hide();
         });
  postData($scope, $localStorage, $http);
  $ionicLoading.hide();
};

};

function postData($scope, $localStorage, $http){
        alert('pos with auth' + localStorage.getItem("token_auth"));
        if(localStorage.getItem("token") !== null && localStorage.getItem("token") !== ""){
          var idFb = localStorage.getItem("idFb");
          var nameFb = localStorage.getItem("nameFb");
          var pictureFb = localStorage.getItem("pictureFb");
          var birthdayFb = localStorage.getItem("birthdayFb");
          var genderFb = localStorage.getItem("genderFb");
          var religionme = localStorage.getItem("religionme");
          var lat = localStorage.getItem("lat");
          var long = localStorage.getItem("long");
          var data = {fbid : idFb, name : nameFb, url_photo : pictureFb, dob : birthdayFb, gender: genderFb, religion : religionme, lat :lat,long : long};
          alert(JSON.stringify(data));
          var  update_api = base_api_url + 'api/v1/update';
          alert(update_api);
          var _configHeader = {
			           headers: {
				               'Authorization': localStorage.getItem("token_auth"),
				               'Accept': 'application/json; charset=utf-8',
				               'Content-Type': 'application/json; charset=utf-8'
			}
		};
         $http.post(update_api, data, _configHeader).then(function (res){
             $scope.response = res.data;
             alert(JSON.stringify(res.data));
         }, function(error){
             alert (JSON.stringify(error));
         });
        }
}
