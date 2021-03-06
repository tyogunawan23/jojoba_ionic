controllerModule.controller("login", function($scope,  $cordovaOauth, $http, $state, $localStorage, $location, $rootScope, $filter, $ionicLoading){
  $scope.data = {};
  $scope.login = function() {
        $cordovaOauth.facebook("100235250427366", ["email", "public_profile", "user_birthday" ]).then(function(result) {
         $localStorage.accessToken = result.access_token;
         $scope.token = result.access_token;

         localStorage.setItem("token", $scope.token);
         saveDataFacebook($http, result.access_token, $rootScope, $filter,  $localStorage,  $state, $ionicLoading);
        }, function(error) {
          console.log(JSON.stringify(error));
             alert (result);
        });
      }
});



function saveDataFacebook($http, access_token, $rootScope, $filter,  $localStorage,  $state, $ionicLoading)
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
       login(datalogin2, $http, access_token, $rootScope, $filter,  $localStorage,  $state, $ionicLoading);
  }, function(error) {
      alert("There was a problem getting your profile.  Check the logs for details.");
      console.log(error);
  });
}

function login (datalogin2, $http, access_token, $rootScope, $filter,  $localStorage,  $state, $ionicLoading) {
  $ionicLoading.show();
   var login_api = base_api_url + 'api/v1/login';
     $http.post(login_api, datalogin2).then(function (res){
     localStorage.setItem("token_auth", res.data.token);
  //   alert(JSON.stringify(res.data));
     $ionicLoading.hide();
     $state.go('religion');
   }, function(error){
      $ionicLoading.hide();
       alert (JSON.stringify(error));
   });
}
