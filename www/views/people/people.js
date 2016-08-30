controllerModule.controller('people', function ($scope) {

})

controllerModule.controller('CardsCtrl', function ($scope, $http, $state,$ionicLoading, $ionicSideMenuDelegate, TDCardDelegate, $localStorage, $ionicPopup, DataUser,  $cordovaGeolocation,$rootScope) {
  console.log('CARDS CTRL');

  var _configHeader = {
         headers: {
               'Authorization': localStorage.getItem("token_auth"),
               'Accept': 'application/json; charset=utf-8',
               'Content-Type': 'application/json; charset=utf-8'
             }
  };

  $ionicSideMenuDelegate.canDragContent(false);

  var cardTypes = [];
  var lat = -6.1766242 ;
  var long = 106.79148149999999 ;
  var rangeAge = 0-100;
  var idFb = localStorage.getItem("idFb");
  var idFb = localStorage.getItem("idFb");
  var nameFb = localStorage.getItem("nameFb");
  var pictureFb = localStorage.getItem("pictureFb");
  var birthdayFb = localStorage.getItem("birthdayFb");
  var genderFb = localStorage.getItem("genderFb");
  var religionme = localStorage.getItem("religionme");
  var religionpartner = localStorage.getItem("religionpartner");
  lat = localStorage.getItem("lat");
  long = localStorage.getItem("long");
  var oppositeGender = localStorage.getItem("oppositeGender");
  if(localStorage.getItem("yearsRange") !== null && localStorage.getItem("yearsRange") !== ""){
    rangeAge = localStorage.getItem("yearsRange");
  }


  $ionicLoading.show();

  try {
     getLocation ($scope, $cordovaGeolocation,$rootScope, $localStorage, $http, $ionicLoading);
  } catch (e) {
      console.log("Got an error!",e);
      throw e; // rethrow to not marked as handled
  }

//alert(base_api_url + 'api/v1/findmatch?fbid=' + idFb + '&pagination=' +10+ '&religion=' +religionpartner+'&gender=' +oppositeGender+'&age= '+rangeAge);
  $http.get(base_api_url + 'api/v1/findmatch?fbid=' + idFb + '&pagination=' +10+ '&religion=' +religionpartner+'&gender=' +oppositeGender+'&age= '+rangeAge, _configHeader).success(function (response) {
    angular.forEach(response.data, function (famous) {

       $scope.addCard(famous);
    });
    $ionicLoading.hide();
  }).error(function (err) {
    console.log(err);
    alert(JSON.stringify(err))
    $ionicLoading.hide();
  });

  $scope.cards = cardTypes;

  $scope.cardDestroyed = function(index) {
    if ($scope.cards.length === 0  ){
      $ionicLoading.show();
      $http.get(base_api_url + 'api/v1/findmatch?fbid=' + idFb + '&pagination=' +10+ '&religion=' +religionpartner+'&gender=' +oppositeGender+'&age= '+rangeAge, _configHeader).success(function (response) {
        angular.forEach(response.data, function (famous) {
           $scope.addCard(famous);
        });
        $ionicLoading.hide();
      }).error(function (err) {
        console.log(err);
        alert(err)
      });
    }
  };

  $scope.addCard = function(famous) {
    cardTypes.push(famous);
  }

  $scope.yesCard = function(index) {
    console.log('YES');
    LikeOpponent($scope, $localStorage, $http, cardTypes[index].fbid, $ionicPopup, cardTypes[index].name);
      if ($scope.cards.length === 1  ){
        $ionicLoading.show();
        $http.get(base_api_url + 'api/v1/findmatch?fbid=' + idFb + '&pagination=' +10+ '&religion=' +religionpartner+'&gender=' +oppositeGender+'&age= '+rangeAge, _configHeader).success(function (response) {
          //  alert(JSON.stringify(response.data))
          angular.forEach(response.data, function (famous) {
            //alert(JSON.stringify(famous))
             $scope.addCard(famous);
            //console.log(JSON.stringify(famous));
          });
          $ionicLoading.hide();
        }).error(function (err) {
          console.log(err);
          alert(err)
        });
      }


  };

  $scope.noCard = function(index) {
    console.log('NO');
     RejectOpponent($scope, $localStorage, $http, cardTypes[index].fbid);
    if ($scope.cards.length === 1  ){
      $ionicLoading.show();
      $http.get(base_api_url + 'api/v1/findmatch?fbid=' + idFb + '&pagination=' +10+ '&religion=' +religionpartner+'&gender=' +oppositeGender+'&age= '+rangeAge, _configHeader).success(function (response) {
        angular.forEach(response.data, function (famous) {
           $scope.addCard(famous);
        });
        $ionicLoading.hide();
      }).error(function (err) {
        console.log(err);
        alert(err)
      });
    }

  };

  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  $scope.cardSwipedLeft = function(index) {
    console.log('LEFT SWIPE');
     RejectOpponent($scope, $localStorage, $http, cardTypes[index].fbid);
  };
  $scope.cardSwipedRight = function(index) {
    console.log('RIGHT SWIPE');
    LikeOpponent($scope, $localStorage, $http, cardTypes[index].fbid, $ionicPopup, cardTypes[index].name);
  };

  $scope.toDetail = function(index){
   DataUser.setUser(cardTypes[index]);
   $state.go('app.detailpeople', {result: index});
  };

})


function RejectOpponent($scope, $localStorage, $http, partnerId){
          var idFb = localStorage.getItem("idFb");
          var  reject_api = base_api_url + 'api/v1/findmatch/reject?fbid=' + idFb + '&partnerId=' +partnerId ;

         $http.get(reject_api, _configHeader).then(function (res){
             $scope.response = res.data;
             $scope.cards.pop();
         }, function(error){
             alert (JSON.stringify(error));
         });
}

function LikeOpponent($scope, $localStorage, $http, partnerId, $ionicPopup, name){
          var idFb = localStorage.getItem("idFb");
          var  like_api = base_api_url + 'api/v1/findmatch/like?fbid=' + idFb + '&partnerId=' +partnerId;

         $http.get(like_api, _configHeader).then(function (res){
             $scope.response = res.data;
             $scope.cards.pop();
            if (res.data.match){
              showAlert();
            }
         }, function(error){
             alert (JSON.stringify(error));
         });
         var showAlert = function() {
            var alertPopup = $ionicPopup.alert({
               title: 'Match',
               template: 'you are match with ' + name,
            });
            alertPopup.then(function(res) {
               console.log('mantaf');
            });
         };
}

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
          //   alert (lat + ','+ long);
            // $ionicLoading.hide();
         }, function(error){
             console.log('error:', error);
              //$ionicLoading.hide();
         });
  postData($scope, $localStorage, $http);
  //$ionicLoading.hide();
};

};

function postData($scope, $localStorage, $http){
      //  alert('pos with auth' + localStorage.getItem("token_auth"));
        var _configHeader = {
               headers: {
                     'Authorization': localStorage.getItem("token_auth"),
                     'Accept': 'application/json; charset=utf-8',
                     'Content-Type': 'application/json; charset=utf-8'
                   }
        };

        if(localStorage.getItem("token") !== null && localStorage.getItem("token") !== ""){
          var lat = -6.1766242 ;
          var long = 106.79148149999999 ;
          var idFb = localStorage.getItem("idFb");
          var nameFb = localStorage.getItem("nameFb");
          var pictureFb = localStorage.getItem("pictureFb");
          var birthdayFb = localStorage.getItem("birthdayFb");
          var genderFb = localStorage.getItem("genderFb");
          var religionme = localStorage.getItem("religionme");
          if(localStorage.getItem("lat") !== null && localStorage.getItem("lat") !== ""){
            lat = localStorage.getItem("lat");
            long = localStorage.getItem("long");
          }

          var myloc = lat + "," + long;
          var data = {fbid : idFb, name : nameFb, url_photo : pictureFb, dob : birthdayFb, gender: genderFb, religion : religionme, loc:myloc};
        //  alert("post data : " + JSON.stringify(data));
          var  update_api = base_api_url + 'api/v1/update';
          $http.post(update_api, data, _configHeader).then(function (res){
             $scope.response = res.data;
        //   alert(JSON.stringify(res.data));
         }, function(error){
            alert ("response eror : " + JSON.stringify(error));
         });

        }
}
