controllerModule.controller("login", function($scope,  $cordovaOauth, $http, $state, $localStorage, $location, $rootScope, $filter){
  $scope.data = {};

//   var config = {
//      apiKey: "AIzaSyBwrDJL9gNkExRb80BTgVVnGwRkvHXb-qg",
//      authDomain: "jojoba-ee503.firebaseapp.com",
//      databaseURL: "https://jojoba-ee503.firebaseio.com",
//      storageBucket: "jojoba-ee503.appspot.com",
//    };
//    firebase.initializeApp(config);
//
//
// var rootRef = firebase.database().ref();


  $scope.login = function() {
        $cordovaOauth.facebook("100235250427366", ["email", "public_profile", "user_birthday" ]).then(function(result) {
         $localStorage.accessToken = result.access_token;
         $scope.token = result.access_token;

      //  alert(JSON.stringify(result));
      //   Need to convert expiresIn format from FB to date
        //   var expiration_date = new Date();
        //   expiration_date.setSeconds(expiration_date.getSeconds() + result.expiresIn);
        //   expiration_date = expiration_date.toISOString();
         //
        //   var facebookAuthData = {
        //           "id": result.userID,
        //           "access_token": result.accessToken,
        //           "expiration_date": expiration_date
        //  };
         //
        //   alert(JSON.stringify(facebookAuthData));


      // rootRef.authWithOAuthToken("facebook", result.access_token, function(error, authData) {
      //   if (error) {
      //     console.log('Firebase login failed!', error);
      //   } else {
      //     console.log('Authenticated successfully with payload:', authData);
      //   }
      // });


         localStorage.setItem("token", $scope.token);
         saveDataFacebook($http, result.access_token, $rootScope, $filter,  $localStorage,  $state);
        }, function(error) {
          console.log(JSON.stringify(error));
             alert (result);
        });
      }
});



function saveDataFacebook($http, access_token, $rootScope, $filter,  $localStorage,  $state)
{
  $http.get("https://graph.facebook.com/v2.7/me", { params: { access_token: localStorage.getItem("token"), fields: "id,name,gender,birthday,location,website,picture,relationship_status", format: "json" }}).then(function(result) {

       var picture = result.data.picture;
       var birthday = result.data.birthday;
       var oppositeGender = 'female';
       var idFb = result.data.id;
       var nameFb = result.data.name;
       var genderFb = result.data.gender;
       var pictureFb = 'https://graph.facebook.com/' + idFb + '/picture?width=400&height=400';
       var religionmeFb = "";
       var birthdayFb = $filter('date')(new Date(birthday), "yyyy-MM-dd");

       localStorage.setItem("idFb", idFb);
       localStorage.setItem("nameFb",  nameFb);
       localStorage.setItem("genderFb", genderFb);
       localStorage.setItem("pictureFb",  pictureFb);
       localStorage.setItem("birthdayFb", birthdayFb);

       if (genderFb == 'female') {
         oppositeGender = 'male';
       } else {
          oppositeGender = 'female'
       }

       localStorage.setItem("oppositeGender", oppositeGender);

       var datalogin2 = {fbid : idFb, name : nameFb, url_photo : pictureFb, dob : birthdayFb, gender: genderFb, religion : religionmeFb};
       login(datalogin2, $http, access_token, $rootScope, $filter,  $localStorage,  $state);
  }, function(error) {
      alert("There was a problem getting your profile.  Check the logs for details.");
      console.log(error);
  });
}

function login (datalogin2, $http, access_token, $rootScope, $filter,  $localStorage,  $state) {
//  alert('pos');
   var login_api = base_api_url + 'api/v1/login';
     $http.post(login_api, datalogin2).then(function (res){
     localStorage.setItem("token_auth", res.data.token);
  //   alert(JSON.stringify(res.data));
     $state.go('religion');
   }, function(error){
       alert (JSON.stringify(error));
       alert (error);
   });
}
