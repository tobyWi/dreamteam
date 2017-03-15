var app = angular.module('app', ['ui.bootstrap', 'ui.router']);

app.controller('sidebarController', ['$scope', function($scope){
	$scope.username = 'Somebody';
	$scope.tab = 1;
	
    $scope.setTab = function(newTab){
      $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum){
      return $scope.tab === tabNum;
    };

}]);
