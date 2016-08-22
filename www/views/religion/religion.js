controllerModule.controller("navigateReligion", function($scope, $state, $rootScope, $localStorage){
    $scope.submitAnswer = function(religion){
    //  alert(religion.me);
     $rootScope.religionme = religion.me;
      localStorage.setItem("religionme", $rootScope.religionme);
     $state.go('religionpartner');
   }

});

controllerModule.controller("navigateReligionPartner", function($scope, $state, $rootScope, $localStorage){
  $scope.submitAnswer = function(religion){
  //  alert(religion.partner);
   $rootScope.religionpartner = religion.partner;
    localStorage.setItem("religionpartner", $rootScope.religionpartner);
    $state.go('app.home');
  }
});
