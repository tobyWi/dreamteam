 var app = angular.module('app', ['ui.bootstrap', 'ui.router']);

app.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function($stateProvider, $locationProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/login");
	$stateProvider.state( {
		name: 'login',
		url: '/login',
		templateUrl: 'partials/login.html',
		controller: 'loginController',
		css: 'css/style.css'
	}).state( {
		name: 'register',
		url: '/register',
		templateUrl: 'partials/register.html',
		controller: 'registerController',
		css: 'css/style.css'
	}).state('chat', {
		url: '/chat',
		templateUrl: 'partials/chat.html',
		controller: 'chatController',
		css: 'css/style.css'
	}).state('chat.private', {
		url: '/private',
		templateUrl: 'partials/private.html',
		css: 'css/style.css'
	}).state('chat.public', {
		url: '/public',
		templateUrl: 'partials/public.html',
		css: 'css/style.css'
	});
}]);

app.controller('mainController', ['$scope', '$location', function($scope, $location){
	$scope.currentPath = $location.path();
}]);

app.controller('sidebarController', ['$scope', '$location', '$rootScope', function($scope, $location, $rootScope){
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
}]);

app.controller('chatController', ['$scope', '$location', '$rootScope', function($scope, $location, $rootScope){
	$scope.messages = [];
	$scope.sendMessage = function(){
		if ($scope.text) {
			$scope.messages.push({
				text: $scope.text,
				imgUser: 'assets/img/test.jpg',
				imgFriend: ''
			}); 
		$scope.text = '';
		}
	};

	$scope.out = function (credentials) {
		$location.path('/login');
	};
}]);

app.controller('loginController', ['$scope', '$location', '$rootScope', function($scope, $location, $rootScope){
	$scope.submit = function (credentials) {
		$scope.errorMessagePassword = false;
		$scope.errorMessageUsername = false;
		//Check rootscope users for a match, else, show error message where the match fails
		for ( var i = 0; i < $rootScope.users.length; i++ ) {
			if ( credentials.user === $rootScope.users[i].name ) {
				if ( credentials.password === $rootScope.users[i].password ) {
					$location.path('/chat/public');
					$scope.errorMessageUsername = false;	
					break;
				} else {
					$scope.errorMessageUsername = false;
					$scope.errorMessagePassword = true;
					break;
				}
			} else {
				$scope.errorMessageUsername = true;
			}
		}
	};
}]);

app.controller('registerController', ['$scope','$location', '$rootScope', '$timeout', function($scope, $location, $rootScope, $timeout){

	// Check if a username is already taken
	$scope.usernameIsTaken = false;
	$scope.$watch('userName', function(oldValue, newValue){
		for ( var i = 0; i < $rootScope.users.length; i++ ) {
			if ( oldValue == $rootScope.users[i].name ) {
				return $scope.usernameIsTaken = true;
			} else {
				$scope.usernameIsTaken = false;			
			}
		}
	});

	// Can't be able to log in if username is taken or is passwords don't match
	$scope.registerSubmit = function() {
		if (!$scope.usernameIsTaken  && $scope.password === $scope.confirmPassword) {
			$location.path('login');
			console.log('registered');
		}
	};
}]);

app.controller('chooseAvatar', function($scope) {

	// AVATAR

	$scope.showAvatarPhoto = function($scope) {
		document.getElementById("avatar").style.display = "block";
	}

	$scope.avatars = [
		{name: 'Avatar 01', avatar:'assets/img/av01.png'},
		{name: 'Avatar 02', avatar:'assets/img/av02.png'},
		{name: 'Avatar 03', avatar:'assets/img/av03.png'},
		{name: 'Avatar 04', avatar:'assets/img/av04.png'},
		{name: 'Avatar 05', avatar:'assets/img/av05.png'},
		{name: 'Avatar 06', avatar:'assets/img/av06.png'}
    ];
});

app.run(['$rootScope', function($rootScope){
	$rootScope.users = [
		{
			name: 'user0',
			password: 'banana',
			avatar: 'assets/img/test1.jpg',
			online: true
		},
		{
			name: 'user1',
			password: 'angular',
			avatar: 'assets/img/av01.png',
			online: true
		},
		{
			name: 'user2',
			password: 'test123',
			avatar: 'assets/img/av02.png',
			online: false
		},
		{
			name: 'user3',
			password: 'hejsan',
			avatar: 'assets/img/av03.png',
			online: false
		}
	];
}]);


