controllerModule.controller("login", function($scope,  $cordovaOauth, $http, $state, $localStorage, $location, $rootScope, $filter){
  $scope.data = {};
  $scope.login = function() {
        $cordovaOauth.facebook("100235250427366", ["email", "public_profile", "user_birthday"  ]).then(function(result) {
         //displayData($http, result.access_token);
         $localStorage.accessToken = result.access_token;
         $scope.token = result.access_token;
         localStorage.setItem("token", $scope.token);
         saveDataFacebook($http, result.access_token, $rootScope, $filter,  $localStorage,  $state);

        //alert(localStorage.getItem("token"));
        }, function(error) {
          console.log(JSON.stringify(error));
             alert (result);
        });
      }
});



function saveDataFacebook($http, access_token, $rootScope, $filter,  $localStorage,  $state)
{
  $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: localStorage.getItem("token"), fields: "id,name,gender,birthday,location,website,picture,relationship_status", format: "json" }}).then(function(result) {
    //  $scope.profileData = result.data;
      var picture = result.data.picture;
      var birthday = result.data.birthday;

       var idFb = result.data.id;
       var nameFb = result.data.name;
       var genderFb = result.data.gender;
       var pictureFb= picture.data.url;
       var religionmeFb = "";
       var birthdayFb = $filter('date')(new Date(birthday), "yyyy-MM-dd");

       localStorage.setItem("idFb", idFb);
       localStorage.setItem("nameFb",  nameFb);
       localStorage.setItem("genderFb", genderFb);
       localStorage.setItem("pictureFb",  pictureFb);
       localStorage.setItem("birthdayFb", birthdayFb);
       //alert(JSON.stringify(result.data));
       //var datalogin = {fbid : idFb, name : nameFb, url_photo : pictureFb, dob : birthdayFb, gender: genderFb, religion : religionmeFb, lat :latFb,long : longFb};

       var datalogin2 = {fbid : idFb, name : nameFb, url_photo : pictureFb, dob : birthdayFb, gender: genderFb, religion : religionmeFb};
       alert(JSON.stringify(datalogin2));
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
     alert(JSON.stringify(res.data));
     $state.go('religion');
   }, function(error){
       alert (JSON.stringify(error));
       alert (error);
   });
}
