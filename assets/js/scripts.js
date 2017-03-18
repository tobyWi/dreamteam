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

app.controller('sidebarController', ['$scope', '$location', function($scope, $location){
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
	$scope.users = [
		{
			name: 'user',
			password: 'xxxxx',
			avatar: 'assets/img/test1.jpg',
			online: true
		},
		{
			name: 'user1',
			password: 'xxxxx',
			avatar: 'assets/img/av01.png',
			online: true
		},
		{
			name: 'user2',
			password: 'xxxxx',
			avatar: 'assets/img/av02.png',
			online: false
		},
		{
			name: 'user3',
			password: 'xxxxx',
			avatar: 'assets/img/av03.png',
			online: false
		}
	];		
}]);

app.controller('chatController', ['$scope', '$location', function($scope, $location){
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
}]);

app.controller('loginController', ['$scope', '$location', function($scope, $location){
	$scope.submit = function (credentials) {
		$scope.errorMessage = false;
		if (credentials.user === 'user2' && credentials.password === 'test123') {
			$location.path('/chat/public');
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
			if ( $scope.password === $scope.confirmPassword ) {
				$scope.message = "Submitted " + $scope.userName;
				$location.path('/login');
			} 
			else {
				$scope.message = "There are still invalid fields below";
			}
		};
	};
}]);

app.controller ('chooseAvatar', function($scope) {
	$scope.choose = function() {
		alert();
	};
});
