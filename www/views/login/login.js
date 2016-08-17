controllerModule.controller("login", function($scope,  $cordovaOauth, $http, $state, $localStorage, $location ){
  $scope.data = {};
  $scope.login = function() {
        $cordovaOauth.facebook("100235250427366", ["email", "public_profile" ]).then(function(result) {
         //displayData($http, result.access_token);
         $localStorage.accessToken = result.access_token;
          $state.go('religion');
        }, function(error) {
          console.log(JSON.stringify(error));
             alert (result);
        });
}
});
