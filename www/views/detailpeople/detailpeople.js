controllerModule.controller('PeopleDetailCtrl', function($scope, $state, $stateParams, DataUser) {
  // alert($stateParams.result);
   $scope.user = DataUser.getUser();
});
