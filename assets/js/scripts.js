var app = angular.module('app', ['ui.bootstrap', 'ui.router']);

app.config(function ($stateProvider, $locationProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/login");

	$stateProvider.state( {
		name: 'login',
		url: '/login',
		templateUrl: 'partials/login.html',
		controller: 'loginController'
		
	});

	$stateProvider.state( {
		name: 'register',
		url: '/register',
		templateUrl: 'partials/register.html',
		controller: 'registerController'
	})

    // Nesting

    $stateProvider
        .state('chat', {
            url: '/chat',
            templateUrl: 'partials/chat.html',
            controller: 'chatController'
        })
        .state('chat.private', {
            url: '/private',
            templateUrl: 'partials/private.html'
        })
        .state('chat.public', {
            url: '/public',
            templateUrl: 'partials/public.html'
        })

  });


app.controller('mainController', ['$scope', '$location', function($scope, $location){
	$scope.currentPath = $location.path();
	console.log($scope.currentPath);
	
}]);

app.controller('sidebarController', ['$scope', '$location', function($scope, $location){

	console.log($scope.currentPath);

	$scope.username = 'Somebody';
	$scope.tab = 1;
	$scope.online = 'green';
	$scope.offline = 'red';

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

app.controller('chatController', ['$scope', '$location', function($scope, $location){

  $scope.messages = [];
  $scope.sendMessage = function(){
    $scope.messages.push({
      text: $scope.text,
      imgUser: 'assets/img/test.jpg',
      imgFriend: ''
    }); 
    $scope.text = '';
	console.log($scope.messages);
  }
  
}]);

app.controller('loginController', ['$scope', '$location', function($scope, $location){
	$scope.submit = function (credentials) {
		if (credentials.user === 'user2' && 
			credentials.password === 'test123') {
			$location.path('/chat');
		} else {
			alert('Vi hittar inget användarnamn. Registrera dig hos oss, det är helt gratis!!');
		}
	};
	
}]);

app.controller('registerController', ['$scope', function($scope){
 
	$scope.RegistrationController = function($scope, $location) {
		var model = this;

		$scope.message = "";

		$scope.user = {
			username: "",
			password: "",
			confirmPassword: ""
		};

		$scope.registerSubmit = function() {
			// console.log("h");
			if ( $scope.password == $scope.confirmPassword ) {
				$scope.message = "Submitted " + $scope.userName;
				$location.path('/login');
			} 
			else {
				$scope.message = "There are still invalid fields below";
			}
		}
	}

}]);

app.controller ('chooseAvatar', function($scope) {
	$scope.choose = function() {
		alert();
	}
})
