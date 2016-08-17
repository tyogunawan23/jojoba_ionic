controllerModule.controller("setting", function($scope){

    $scope.drag = function(value) {
        $scope.years = Math.floor(value / 12);
        $scope.months = value % 12;
    };

    $scope.rangeValue = 0;

});
