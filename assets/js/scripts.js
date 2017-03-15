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



app.service('user', function() {
	var user = [{
    name: 'user',
    password: 'xxxxx',
    avatar: 'assets/img/test.jpg',
    online: true
  },
  {
	name: 'user1',
	password: 'xxxxx',
	avatar: 'assets/img/test.jpg',
    online: true
  },
  {
	name: 'user2',
	password: 'xxxxx',
	avatar: 'assets/img/test.jpg',
    online: true
  },
  {
	name: 'user3',
	password: 'xxxxx',
	avatar: 'assets/img/test.jpg',
    online: true
  }
  ];
} 