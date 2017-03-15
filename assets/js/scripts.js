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

    $scope.x = false;
    $scope.toggle = function() {
        $scope.x = !$scope.x;
    };

    $scope.users = [{
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
	    online: false
	  },
	  {
		name: 'user3',
		password: 'xxxxx',
		avatar: 'assets/img/test.jpg',
	    online: false
	  }
  ];

}]);

<<<<<<< HEAD
=======


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
>>>>>>> 01532484e990723bea2b062e226a5c2d061aa7fa
