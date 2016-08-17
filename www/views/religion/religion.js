controllerModule.controller("navigateReligion", function($scope, $state){
    $scope.submitAnswer = function(religion){
    //  alert(religion.me);
     $state.go('religionpartner');
   }

});

controllerModule.controller("navigateReligionPartner", function($scope, $state){
  $scope.submitAnswer = function(religion){
  //  alert(religion.partner);
    $state.go('app.home');
  }
});
