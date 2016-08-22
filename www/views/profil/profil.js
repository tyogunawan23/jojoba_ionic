controllerModule.controller("profil", function($scope, $http, $localStorage, $location){
  $scope.init = function() {
       if($localStorage.hasOwnProperty("accessToken") === true) {
           $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: localStorage.getItem("token"), fields: "id,name,gender,birthday,location,website,picture,relationship_status", format: "json" }}).then(function(result) {
               $scope.profileData = result.data;
               alert(JSON.stringify(result.data));
           }, function(error) {
               alert("There was a problem getting your profile.  Check the logs for details.");
               console.log(error);
           });
       } else {
           alert("Not signed in");
           $location.path("/login");
       }
   };
});
